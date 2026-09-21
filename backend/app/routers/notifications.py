import math
import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_active_user, require_admin
from app.models.notification import Notification
from app.models.notification_preference import NotificationPreference
from app.models.user import User
from app.schemas.notification import (
    NotificationResponse,
    NotificationListResponse,
    UnreadCountResponse,
    NotificationPreferenceResponse,
    NotificationPreferenceUpdate,
    AnnouncementRequest
)
from app.services.notification_service import (
    get_or_create_user_preferences,
    broadcast_announcement
)

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("", response_model=NotificationListResponse)
def get_user_notifications(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    is_read: Optional[bool] = None,
    notification_type: Optional[str] = Query(None, alias="type"),
    priority: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Retrieves paginated notifications targeted to the authenticated user with filters."""
    query = db.query(Notification).filter(Notification.user_id == current_user.id)

    # Calculate unread count for current user inbox
    unread = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).count()

    if is_read is not None:
        query = query.filter(Notification.is_read == is_read)
    if notification_type:
        query = query.filter(Notification.notification_type == notification_type.strip())
    if priority:
        query = query.filter(Notification.priority == priority.strip().upper())
    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Notification.title.ilike(s),
                Notification.message.ilike(s)
            )
        )

    total = query.count()
    total_pages = math.ceil(total / page_size) if total > 0 else 1

    items = query.order_by(Notification.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    return NotificationListResponse(
        items=[NotificationResponse.from_model(n) for n in items],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        unread_count=unread
    )


@router.get("/unread-count", response_model=UnreadCountResponse)
def get_unread_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Returns number of unread notifications for badge indicators."""
    count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).count()
    return UnreadCountResponse(unread_count=count)


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
def mark_notification_read(
    notification_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Marks an individual notification as read."""
    notif = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    if not notif:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found.")

    notif.is_read = True
    notif.read_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(notif)
    return NotificationResponse.from_model(notif)


@router.patch("/{notification_id}/unread", response_model=NotificationResponse)
def mark_notification_unread(
    notification_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Marks an individual notification as unread."""
    notif = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    if not notif:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found.")

    notif.is_read = False
    notif.read_at = None
    db.commit()
    db.refresh(notif)
    return NotificationResponse.from_model(notif)


@router.patch("/read-all", status_code=status.HTTP_200_OK)
def mark_all_notifications_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Marks all unread notifications for current user as read."""
    now = datetime.now(timezone.utc)
    db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).update({"is_read": True, "read_at": now}, synchronize_session=False)
    db.commit()
    return {"message": "All notifications marked as read."}


@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_notification(
    notification_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Deletes a notification from user's inbox."""
    notif = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    if not notif:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found.")

    db.delete(notif)
    db.commit()
    return None


@router.get("/preferences", response_model=NotificationPreferenceResponse)
def get_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Fetches user notification preferences."""
    prefs = get_or_create_user_preferences(db, current_user.id)
    return prefs


@router.put("/preferences", response_model=NotificationPreferenceResponse)
def update_preferences(
    payload: NotificationPreferenceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Updates user notification delivery preferences."""
    prefs = get_or_create_user_preferences(db, current_user.id)

    if payload.email_enabled is not None:
        prefs.email_enabled = payload.email_enabled
    if payload.in_app_enabled is not None:
        prefs.in_app_enabled = payload.in_app_enabled
    if payload.push_enabled is not None:
        prefs.push_enabled = payload.push_enabled
    if payload.sound_enabled is not None:
        prefs.sound_enabled = payload.sound_enabled
    if payload.complaint_updates is not None:
        prefs.complaint_updates = payload.complaint_updates
    if payload.department_alerts is not None:
        prefs.department_alerts = payload.department_alerts
    if payload.system_announcements is not None:
        prefs.system_announcements = payload.system_announcements
    if payload.critical_alerts_only is not None:
        prefs.critical_alerts_only = payload.critical_alerts_only

    prefs.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(prefs)
    return prefs


@router.post("/announcements", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
def post_announcement(
    payload: AnnouncementRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Dispatches a campus-wide or role-specific announcement (Administrator only)."""
    meta = {
        "author_id": str(current_user.id),
        "author_name": current_user.full_name,
        **(payload.metadata or {})
    }

    count = broadcast_announcement(
        db=db,
        title=payload.title,
        message=payload.message,
        priority=payload.priority,
        target_role=payload.target_role,
        metadata=meta
    )
    db.commit()
    return {
        "message": "Announcement broadcast successfully.",
        "recipients_count": count
    }
