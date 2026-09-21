import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.complaint import Complaint
from app.models.complaint_update import ComplaintUpdate
from app.models.department import Department
from app.models.user import User
from app.models.enums import ComplaintStatus, ComplaintPriority, UserRole
from app.schemas.complaint import ComplaintCreate
from app.services.ai_service import analyze_complaint
from app.services.notification_service import notify_complaint_submitted, notify_status_change

# Valid state machine transitions
ALLOWED_TRANSITIONS = {
    ComplaintStatus.PENDING: [ComplaintStatus.UNDER_REVIEW, ComplaintStatus.ASSIGNED],
    ComplaintStatus.UNDER_REVIEW: [ComplaintStatus.ASSIGNED, ComplaintStatus.IN_PROGRESS],
    ComplaintStatus.ASSIGNED: [ComplaintStatus.IN_PROGRESS, ComplaintStatus.UNDER_REVIEW],
    ComplaintStatus.IN_PROGRESS: [ComplaintStatus.RESOLVED, ComplaintStatus.UNDER_REVIEW],
    ComplaintStatus.RESOLVED: [ComplaintStatus.IN_PROGRESS]  # Allow re-opening if needed
}

DEPARTMENT_ROUTING = {
    "Water Supply": "Maintenance",
    "Electricity": "Maintenance",
    "Infrastructure": "Maintenance",
    "IT / Wi-Fi": "IT Support",
    "Cleanliness": "Housekeeping",
    "Academic": "Academics",
    "Transport": "Transport",
    "Security": "Security",
    "Hostel": "Hostel",
    "Library": "Library",
    "Food / Cafeteria": "Cafeteria",
    "Other": "Administration"
}


def generate_complaint_number(db: Session) -> str:
    """
    Generates an official complaint sequence number formatted as SC-2026-XXXX.
    Thread-safe and persistent across transactions.
    """
    current_year = datetime.now().year
    prefix = f"SC-{current_year}-"
    
    # Count existing complaints for this prefix
    count = db.query(func.count(Complaint.id)).filter(
        Complaint.complaint_number.like(f"{prefix}%")
    ).scalar() or 0
    
    next_num = count + 1
    return f"{prefix}{next_num:04d}"


def resolve_department_by_category(db: Session, category: str) -> Optional[Department]:
    """Finds or matches the responsible department based on the complaint category."""
    dept_name = DEPARTMENT_ROUTING.get(category, "Administration")
    dept = db.query(Department).filter(Department.name.ilike(f"%{dept_name}%")).first()
    if not dept:
        # Fallback to any active department or first available
        dept = db.query(Department).first()
    return dept


def validate_status_transition(current_status: ComplaintStatus, new_status: ComplaintStatus, user_role: UserRole) -> None:
    """Validates that a status change complies with the workflow state machine."""
    if current_status == new_status:
        return
    
    # Administrators are allowed override privileges
    if user_role == UserRole.ADMINISTRATOR:
        return
        
    allowed = ALLOWED_TRANSITIONS.get(current_status, [])
    if new_status not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status transition from '{current_status.value}' to '{new_status.value}'."
        )


def create_new_complaint(db: Session, student: User, payload: ComplaintCreate) -> Complaint:
    """Executes the full complaint creation workflow with AI classification and auto-routing."""
    # 1. Run AI analysis
    ai_result = analyze_complaint(payload.title, payload.description)
    
    category = payload.category or ai_result["category"]
    priority = payload.priority or ai_result["priority"]
    
    # 2. Match department
    dept = resolve_department_by_category(db, category)
    
    # 3. Generate sequential tracking number
    complaint_no = generate_complaint_number(db)
    
    # 4. Instantiate Complaint
    new_complaint = Complaint(
        complaint_number=complaint_no,
        title=payload.title,
        description=payload.description,
        category=category,
        priority=priority,
        status=ComplaintStatus.PENDING if not dept else ComplaintStatus.ASSIGNED,
        location=payload.location,
        student_id=student.id,
        department_id=dept.id if dept else None,
        ai_category=ai_result["category"],
        ai_priority=ai_result["priority"].value,
        ai_confidence=ai_result["confidence"],
        submitted_at=datetime.now(timezone.utc)
    )
    db.add(new_complaint)
    db.flush()  # Flush to generate new_complaint.id
    
    # 5. Create initial ComplaintUpdate
    initial_update = ComplaintUpdate(
        complaint_id=new_complaint.id,
        updated_by=student.id,
        status=new_complaint.status.value,
        message=f"Complaint registered and auto-triaged to {dept.name if dept else 'Administration'}.",
        is_internal=False
    )
    db.add(initial_update)
    
    # 6. Dispatch notifications
    notify_complaint_submitted(db, new_complaint)
    
    db.commit()
    db.refresh(new_complaint)
    return new_complaint


def transition_complaint_status(
    db: Session,
    complaint: Complaint,
    new_status: ComplaintStatus,
    actor: User,
    note: Optional[str] = None,
    is_internal: bool = False
) -> Complaint:
    """Applies a validated status transition, logs the update, and triggers alerts."""
    old_status = complaint.status.value
    validate_status_transition(complaint.status, new_status, actor.role)
    
    complaint.status = new_status
    complaint.updated_at = datetime.now(timezone.utc)
    
    if new_status == ComplaintStatus.RESOLVED:
        complaint.resolved_at = datetime.now(timezone.utc)
    else:
        complaint.resolved_at = None

    # Add timeline log
    log_message = note or f"Status transitioned to {new_status.value} by {actor.full_name}."
    update_log = ComplaintUpdate(
        complaint_id=complaint.id,
        updated_by=actor.id,
        status=new_status.value,
        message=log_message,
        is_internal=is_internal
    )
    db.add(update_log)
    
    # Trigger notifications
    notify_status_change(db, complaint, old_status, new_status.value, note)
    
    db.commit()
    db.refresh(complaint)
    return complaint
