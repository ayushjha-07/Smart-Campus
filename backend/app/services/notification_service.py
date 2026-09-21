import uuid
import logging
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.models.notification_preference import NotificationPreference
from app.models.user import User
from app.models.enums import UserRole, ComplaintPriority, NotificationType, NotificationPriority
from app.core.websocket import dispatch_ws_notification

logger = logging.getLogger("smartcampus.notifications")


def get_or_create_user_preferences(db: Session, user_id: uuid.UUID) -> NotificationPreference:
    """Fetches user notification preferences or creates a default record if absent."""
    prefs = db.query(NotificationPreference).filter(
        NotificationPreference.user_id == user_id
    ).first()

    if not prefs:
        prefs = NotificationPreference(
            user_id=user_id,
            email_enabled=False,
            in_app_enabled=True,
            push_enabled=False,
            sound_enabled=False,
            complaint_updates=True,
            department_alerts=True,
            system_announcements=True,
            critical_alerts_only=False
        )
        db.add(prefs)
        db.flush()

    return prefs


def should_send_notification(
    preferences: NotificationPreference,
    notification_type: str,
    priority: str
) -> bool:
    """
    Evaluates delivery preferences.
    CRITICAL safety and security alerts ALWAYS bypass suppression preferences.
    """
    if priority == NotificationPriority.CRITICAL.value:
        return True

    if not preferences.in_app_enabled:
        return False

    if preferences.critical_alerts_only:
        return priority == NotificationPriority.CRITICAL.value

    # Granular category checks
    complaint_event_types = [
        NotificationType.COMPLAINT_SUBMITTED.value,
        NotificationType.COMPLAINT_ASSIGNED.value,
        NotificationType.COMPLAINT_STATUS_UPDATED.value,
        NotificationType.COMPLAINT_PRIORITY_UPDATED.value,
        NotificationType.COMPLAINT_RESOLVED.value,
        NotificationType.COMPLAINT_UPDATE_ADDED.value,
    ]
    if notification_type in complaint_event_types:
        return preferences.complaint_updates

    if notification_type in [NotificationType.DEPARTMENT_ASSIGNMENT.value]:
        return preferences.department_alerts

    if notification_type in [NotificationType.ANNOUNCEMENT.value, NotificationType.SYSTEM_UPDATE.value]:
        return preferences.system_announcements

    return True


def create_notification(
    db: Session,
    user_id: uuid.UUID,
    title: str,
    message: str,
    notification_type: str = NotificationType.COMPLAINT_STATUS_UPDATED.value,
    priority: str = NotificationPriority.INFO.value,
    complaint_id: Optional[uuid.UUID] = None,
    metadata: Optional[Dict[str, Any]] = None
) -> Optional[Notification]:
    """
    Persists notification to database after checking user preferences,
    and dispatches live payload to any active WebSockets for that user.
    """
    prefs = get_or_create_user_preferences(db, user_id)
    if not should_send_notification(prefs, notification_type, priority):
        logger.info(
            "Notification of type '%s' suppressed for user %s by delivery preferences.",
            notification_type,
            user_id
        )
        return None

    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        notification_type=notification_type,
        priority=priority,
        complaint_id=complaint_id,
        notification_metadata=metadata or {},
        is_read=False,
        created_at=datetime.now(timezone.utc)
    )
    db.add(notification)
    db.flush()

    # Schedule WebSocket delivery
    ws_payload = {
        "type": "NOTIFICATION_RECEIVED",
        "notification": {
            "id": str(notification.id),
            "user_id": str(notification.user_id),
            "title": notification.title,
            "message": notification.message,
            "notification_type": notification.notification_type,
            "priority": notification.priority,
            "is_read": notification.is_read,
            "complaint_id": str(notification.complaint_id) if notification.complaint_id else None,
            "metadata": metadata or {},
            "created_at": notification.created_at.isoformat()
        }
    }
    dispatch_ws_notification(str(user_id), ws_payload)
    return notification


def notify_complaint_submitted(db: Session, complaint) -> None:
    """Dispatches submission notifications to the reporting student, department staff, and admins."""
    dept_name = complaint.department.name if complaint.department else "Administration"
    meta = {
        "complaint_number": complaint.complaint_number,
        "category": complaint.category,
        "priority": complaint.priority.value if hasattr(complaint.priority, "value") else str(complaint.priority),
        "action_url": f"/student/complaints/{complaint.id}"
    }

    # 1. Notify reporting student
    create_notification(
        db=db,
        user_id=complaint.student_id,
        title=f"Complaint Logged: {complaint.complaint_number}",
        message=f"Your complaint '{complaint.title}' has been registered and assigned to {dept_name}.",
        notification_type=NotificationType.COMPLAINT_SUBMITTED.value,
        priority=NotificationPriority.INFO.value,
        complaint_id=complaint.id,
        metadata=meta
    )

    # 2. Notify staff in assigned department
    if complaint.department_id:
        dept_staff = db.query(User).filter(
            User.department_id == complaint.department_id,
            User.role == UserRole.DEPARTMENT_STAFF,
            User.status == "ACTIVE"
        ).all()

        staff_priority = (
            NotificationPriority.CRITICAL.value
            if complaint.priority == ComplaintPriority.CRITICAL
            else NotificationPriority.WARNING.value
            if complaint.priority == ComplaintPriority.HIGH
            else NotificationPriority.INFO.value
        )

        for staff_member in dept_staff:
            create_notification(
                db=db,
                user_id=staff_member.id,
                title=f"New Assignment: {complaint.complaint_number}",
                message=f"New ticket '{complaint.title}' ({complaint.priority.value} priority) routed to your department.",
                notification_type=NotificationType.COMPLAINT_ASSIGNED.value,
                priority=staff_priority,
                complaint_id=complaint.id,
                metadata={**meta, "action_url": f"/department/complaints"}
            )

    # 3. Notify administrators if CRITICAL
    if complaint.priority == ComplaintPriority.CRITICAL:
        admins = db.query(User).filter(
            User.role == UserRole.ADMINISTRATOR,
            User.status == "ACTIVE"
        ).all()
        for admin in admins:
            create_notification(
                db=db,
                user_id=admin.id,
                title=f"CRITICAL HAZARD ALERT: {complaint.complaint_number}",
                message=f"Immediate triage required: '{complaint.title}' reported at {complaint.location or 'Campus'}.",
                notification_type=NotificationType.CRITICAL_COMPLAINT.value,
                priority=NotificationPriority.CRITICAL.value,
                complaint_id=complaint.id,
                metadata={**meta, "action_url": f"/admin/complaints"}
            )


def notify_status_change(
    db: Session,
    complaint,
    old_status: str,
    new_status: str,
    note: Optional[str] = None
) -> None:
    """Notifies student and department team upon state machine status progression."""
    is_resolved = new_status == "RESOLVED"
    notif_type = NotificationType.COMPLAINT_RESOLVED.value if is_resolved else NotificationType.COMPLAINT_STATUS_UPDATED.value
    priority = NotificationPriority.SUCCESS.value if is_resolved else NotificationPriority.INFO.value

    msg = f"Complaint {complaint.complaint_number} status updated to {new_status}."
    if note:
        msg += f" Note: {note}"

    meta = {
        "complaint_number": complaint.complaint_number,
        "old_status": old_status,
        "new_status": new_status,
        "action_url": f"/student/complaints/{complaint.id}"
    }

    # Notify student
    create_notification(
        db=db,
        user_id=complaint.student_id,
        title=f"Complaint {'Resolved' if is_resolved else 'Status Update'}: {complaint.complaint_number}",
        message=msg,
        notification_type=notif_type,
        priority=priority,
        complaint_id=complaint.id,
        metadata=meta
    )

    # If department staff exists, notify them if status updated by an administrator
    if complaint.department_id:
        dept_staff = db.query(User).filter(
            User.department_id == complaint.department_id,
            User.role == UserRole.DEPARTMENT_STAFF,
            User.status == "ACTIVE"
        ).all()
        for staff in dept_staff:
            create_notification(
                db=db,
                user_id=staff.id,
                title=f"Ticket {complaint.complaint_number}: {new_status}",
                message=f"Status changed from {old_status} to {new_status}.",
                notification_type=notif_type,
                priority=priority,
                complaint_id=complaint.id,
                metadata=meta
            )


def notify_priority_change(
    db: Session,
    complaint,
    old_priority: str,
    new_priority: str,
    note: Optional[str] = None
) -> None:
    """Dispatches alerts when ticket priority is escalated or de-escalated."""
    is_critical = new_priority == ComplaintPriority.CRITICAL.value
    priority_level = (
        NotificationPriority.CRITICAL.value
        if is_critical
        else NotificationPriority.WARNING.value
        if new_priority == ComplaintPriority.HIGH.value
        else NotificationPriority.INFO.value
    )

    meta = {
        "complaint_number": complaint.complaint_number,
        "old_priority": old_priority,
        "new_priority": new_priority,
        "action_url": f"/student/complaints/{complaint.id}"
    }

    msg = f"Priority for ticket {complaint.complaint_number} updated from {old_priority} to {new_priority}."
    if note:
        msg += f" Details: {note}"

    # Notify student
    create_notification(
        db=db,
        user_id=complaint.student_id,
        title=f"Priority Adjusted: {complaint.complaint_number}",
        message=msg,
        notification_type=NotificationType.COMPLAINT_PRIORITY_UPDATED.value,
        priority=priority_level,
        complaint_id=complaint.id,
        metadata=meta
    )

    # Notify assigned department staff
    if complaint.department_id:
        dept_staff = db.query(User).filter(
            User.department_id == complaint.department_id,
            User.role == UserRole.DEPARTMENT_STAFF,
            User.status == "ACTIVE"
        ).all()
        for staff in dept_staff:
            create_notification(
                db=db,
                user_id=staff.id,
                title=f"Priority Update: {complaint.complaint_number} is now {new_priority}",
                message=msg,
                notification_type=NotificationType.COMPLAINT_PRIORITY_UPDATED.value,
                priority=priority_level,
                complaint_id=complaint.id,
                metadata=meta
            )


def notify_department_reassigned(
    db: Session,
    complaint,
    new_department_name: str,
    note: Optional[str] = None
) -> None:
    """Notifies staff of newly assigned department and informs student."""
    meta = {
        "complaint_number": complaint.complaint_number,
        "department_name": new_department_name,
        "action_url": f"/student/complaints/{complaint.id}"
    }

    msg = f"Complaint {complaint.complaint_number} has been transferred to {new_department_name}."
    if note:
        msg += f" Reason: {note}"

    # Notify student
    create_notification(
        db=db,
        user_id=complaint.student_id,
        title=f"Transferred to {new_department_name}: {complaint.complaint_number}",
        message=msg,
        notification_type=NotificationType.DEPARTMENT_ASSIGNMENT.value,
        priority=NotificationPriority.INFO.value,
        complaint_id=complaint.id,
        metadata=meta
    )

    # Notify staff of the new department
    if complaint.department_id:
        staff_list = db.query(User).filter(
            User.department_id == complaint.department_id,
            User.role == UserRole.DEPARTMENT_STAFF,
            User.status == "ACTIVE"
        ).all()
        for staff in staff_list:
            create_notification(
                db=db,
                user_id=staff.id,
                title=f"Ticket Transferred to Your Department: {complaint.complaint_number}",
                message=f"Ticket '{complaint.title}' reassigned to {new_department_name}.",
                notification_type=NotificationType.DEPARTMENT_ASSIGNMENT.value,
                priority=NotificationPriority.WARNING.value if complaint.priority == ComplaintPriority.CRITICAL else NotificationPriority.INFO.value,
                complaint_id=complaint.id,
                metadata=meta
            )


def notify_complaint_update_added(
    db: Session,
    complaint,
    author: User,
    message: str,
    is_internal: bool = False
) -> None:
    """Dispatches notification when a remark or update is added to a complaint."""
    if is_internal:
        # Internal notes are not exposed to students
        return

    meta = {
        "complaint_number": complaint.complaint_number,
        "author_name": author.full_name,
        "action_url": f"/student/complaints/{complaint.id}"
    }

    if author.id != complaint.student_id:
        # Notify student that staff/admin added a public note
        create_notification(
            db=db,
            user_id=complaint.student_id,
            title=f"New Remark on {complaint.complaint_number}",
            message=f"{author.full_name} added an update: \"{message[:120]}{'...' if len(message) > 120 else ''}\"",
            notification_type=NotificationType.COMPLAINT_UPDATE_ADDED.value,
            priority=NotificationPriority.INFO.value,
            complaint_id=complaint.id,
            metadata=meta
        )
    else:
        # Student added an update; notify assigned department staff
        if complaint.department_id:
            dept_staff = db.query(User).filter(
                User.department_id == complaint.department_id,
                User.role == UserRole.DEPARTMENT_STAFF,
                User.status == "ACTIVE"
            ).all()
            for staff in dept_staff:
                create_notification(
                    db=db,
                    user_id=staff.id,
                    title=f"Student Follow-up: {complaint.complaint_number}",
                    message=f"Student {author.full_name} remarked: \"{message[:120]}{'...' if len(message) > 120 else ''}\"",
                    notification_type=NotificationType.COMPLAINT_UPDATE_ADDED.value,
                    priority=NotificationPriority.INFO.value,
                    complaint_id=complaint.id,
                    metadata=meta
                )


def broadcast_announcement(
    db: Session,
    title: str,
    message: str,
    priority: NotificationPriority = NotificationPriority.INFO,
    target_role: Optional[UserRole] = None,
    metadata: Optional[Dict[str, Any]] = None
) -> int:
    """Dispatches an announcement across all active users or scoped to a specific role."""
    query = db.query(User).filter(User.status == "ACTIVE")
    if target_role:
        query = query.filter(User.role == target_role)

    users = query.all()
    count = 0
    for user in users:
        notif = create_notification(
            db=db,
            user_id=user.id,
            title=title,
            message=message,
            notification_type=NotificationType.ANNOUNCEMENT.value,
            priority=priority.value,
            metadata=metadata
        )
        if notif:
            count += 1

    return count
