import os
import uuid
import shutil
from typing import Optional, List
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.security import get_current_active_user, require_admin, require_department_staff
from app.models.complaint import Complaint
from app.models.complaint_update import ComplaintUpdate
from app.models.attachment import Attachment
from app.models.department import Department
from app.models.user import User
from app.models.enums import UserRole, ComplaintStatus, ComplaintPriority
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdateRequest,
    ComplaintStatusUpdate,
    ComplaintPriorityUpdate,
    ComplaintDepartmentUpdate,
    ComplaintAddUpdate,
    ComplaintResolve,
    ComplaintResponse,
    ComplaintListResponse,
    ComplaintTimelineResponse,
    TimelineStep,
    AttachmentResponse,
    ComplaintUpdateResponse
)
from app.services.complaint_service import create_new_complaint, transition_complaint_status
from app.services.notification_service import (
    create_notification,
    notify_priority_change,
    notify_department_reassigned,
    notify_complaint_update_added
)


router = APIRouter(prefix="/complaints", tags=["Complaints"])

ALLOWED_MIME_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "application/pdf": ".pdf"
}


def serialize_complaint(c: Complaint, is_admin_or_staff: bool = False) -> ComplaintResponse:
    """Serializes a complaint model, filtering internal notes if viewing as student."""
    updates_res = []
    for u in c.updates:
        if u.is_internal and not is_admin_or_staff:
            continue
        updates_res.append(
            ComplaintUpdateResponse(
                id=u.id,
                complaint_id=u.complaint_id,
                updated_by=u.updated_by,
                updated_by_name=u.author.full_name if u.author else "System",
                status=u.status,
                message=u.message,
                is_internal=u.is_internal,
                created_at=u.created_at
            )
        )

    attachments_res = [
        AttachmentResponse(
            id=a.id,
            complaint_id=a.complaint_id,
            file_name=a.file_name,
            file_path=a.file_path,
            file_type=a.file_type,
            file_size=a.file_size,
            created_at=a.created_at
        ) for a in c.attachments
    ]

    return ComplaintResponse(
        id=c.id,
        complaint_number=c.complaint_number,
        title=c.title,
        description=c.description,
        category=c.category,
        priority=c.priority,
        status=c.status,
        location=c.location,
        student_id=c.student_id,
        student_name=c.student.full_name if c.student else None,
        student_email=c.student.email if c.student else None,
        department_id=c.department_id,
        department_name=c.department.name if c.department else None,
        ai_category=c.ai_category,
        ai_priority=c.ai_priority,
        ai_confidence=c.ai_confidence,
        submitted_at=c.submitted_at,
        updated_at=c.updated_at,
        resolved_at=c.resolved_at,
        updates=updates_res,
        attachments=attachments_res
    )


def resolve_complaint_record(db: Session, complaint_id_or_number: str) -> Complaint:
    """Finds complaint by either UUID or complaint_number string (e.g. SC-2026-1848)."""
    try:
        val_uuid = uuid.UUID(complaint_id_or_number)
        c = db.query(Complaint).filter(Complaint.id == val_uuid).first()
        if c:
            return c
    except ValueError:
        pass

    c = db.query(Complaint).filter(Complaint.complaint_number.ilike(complaint_id_or_number.strip())).first()
    if not c:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Complaint not found.")
    return c


@router.post("", response_model=ComplaintResponse, status_code=status.HTTP_201_CREATED)
def create_complaint(
    payload: ComplaintCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Creates a new complaint, initiates AI triage, and auto-routes to responsible department."""
    complaint = create_new_complaint(db, current_user, payload)
    return serialize_complaint(complaint, is_admin_or_staff=True)


@router.get("", response_model=ComplaintListResponse)
def list_complaints(
    search: Optional[str] = None,
    complaint_status: Optional[ComplaintStatus] = Query(None, alias="status"),
    priority: Optional[ComplaintPriority] = None,
    department_id: Optional[uuid.UUID] = None,
    category: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Lists complaints scoped to current role (Student: own; Staff: assigned department; Admin: all)."""
    query = db.query(Complaint)

    if current_user.role == UserRole.STUDENT:
        query = query.filter(Complaint.student_id == current_user.id)
    elif current_user.role == UserRole.DEPARTMENT_STAFF:
        if current_user.department_id:
            query = query.filter(Complaint.department_id == current_user.department_id)
        else:
            query = query.filter(Complaint.id == uuid.uuid4())  # empty set if staff has no department assigned

    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Complaint.complaint_number.ilike(s),
                Complaint.title.ilike(s),
                Complaint.description.ilike(s),
                Complaint.location.ilike(s)
            )
        )
    if complaint_status:
        query = query.filter(Complaint.status == complaint_status)
    if priority:
        query = query.filter(Complaint.priority == priority)
    if department_id:
        query = query.filter(Complaint.department_id == department_id)
    if category:
        query = query.filter(Complaint.category == category)

    total = query.count()
    complaints = query.order_by(Complaint.submitted_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    is_elevated = current_user.role in [UserRole.ADMINISTRATOR, UserRole.DEPARTMENT_STAFF]
    items = [serialize_complaint(c, is_admin_or_staff=is_elevated) for c in complaints]

    return ComplaintListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_complaint(
    complaint_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Retrieves full complaint metadata, verification progress, and updates."""
    complaint = resolve_complaint_record(db, complaint_id)

    # Permission check
    if current_user.role == UserRole.STUDENT and complaint.student_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to this complaint.")
    if current_user.role == UserRole.DEPARTMENT_STAFF and complaint.department_id != current_user.department_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to complaint assigned to another department.")

    is_elevated = current_user.role in [UserRole.ADMINISTRATOR, UserRole.DEPARTMENT_STAFF]
    return serialize_complaint(complaint, is_admin_or_staff=is_elevated)


@router.put("/{complaint_id}", response_model=ComplaintResponse)
def update_complaint(
    complaint_id: str,
    payload: ComplaintUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Updates complaint details (Allowed for reporting student while PENDING, or Administrator)."""
    complaint = resolve_complaint_record(db, complaint_id)

    if current_user.role == UserRole.STUDENT:
        if complaint.student_id != current_user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized.")
        if complaint.status != ComplaintStatus.PENDING:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot edit complaint once triage has commenced.")
    elif current_user.role != UserRole.ADMINISTRATOR:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Administrative permission required.")

    if payload.title is not None:
        complaint.title = payload.title
    if payload.description is not None:
        complaint.description = payload.description
    if payload.location is not None:
        complaint.location = payload.location

    complaint.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(complaint)
    return serialize_complaint(complaint, is_admin_or_staff=True)


@router.patch("/{complaint_id}/status", response_model=ComplaintResponse)
def update_status(
    complaint_id: str,
    payload: ComplaintStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Transitions complaint status through the validation state machine."""
    complaint = resolve_complaint_record(db, complaint_id)

    if current_user.role == UserRole.STUDENT:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Students cannot modify complaint status.")
    if current_user.role == UserRole.DEPARTMENT_STAFF and complaint.department_id != current_user.department_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Staff cannot update complaints belonging to another department.")

    updated = transition_complaint_status(
        db=db,
        complaint=complaint,
        new_status=payload.status,
        actor=current_user,
        note=payload.note,
        is_internal=payload.is_internal
    )
    return serialize_complaint(updated, is_admin_or_staff=True)


@router.patch("/{complaint_id}/priority", response_model=ComplaintResponse, dependencies=[Depends(require_admin)])
def update_priority(
    complaint_id: str,
    payload: ComplaintPriorityUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Updates complaint priority (Admin only)."""
    complaint = resolve_complaint_record(db, complaint_id)
    old_priority = complaint.priority.value if hasattr(complaint.priority, "value") else str(complaint.priority)
    new_priority = payload.priority.value if hasattr(payload.priority, "value") else str(payload.priority)

    complaint.priority = payload.priority
    complaint.updated_at = datetime.now(timezone.utc)

    # Log internal update
    note_msg = payload.note or f"Priority adjusted to {new_priority} by {current_user.full_name}."
    update_log = ComplaintUpdate(
        complaint_id=complaint.id,
        updated_by=current_user.id,
        status=complaint.status.value,
        message=note_msg,
        is_internal=True
    )
    db.add(update_log)
    
    # Dispatch priority change notification
    notify_priority_change(db, complaint, old_priority, new_priority, payload.note)

    db.commit()
    db.refresh(complaint)
    return serialize_complaint(complaint, is_admin_or_staff=True)


@router.patch("/{complaint_id}/department", response_model=ComplaintResponse, dependencies=[Depends(require_admin)])
def reassign_department(
    complaint_id: str,
    payload: ComplaintDepartmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Reassigns complaint to a different campus department (Admin only)."""
    complaint = resolve_complaint_record(db, complaint_id)
    dept = db.query(Department).filter(Department.id == payload.department_id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Target department not found.")

    complaint.department_id = dept.id
    complaint.status = ComplaintStatus.ASSIGNED
    complaint.updated_at = datetime.now(timezone.utc)

    msg = payload.note or f"Ticket reassigned to {dept.name} department by administration."
    update_log = ComplaintUpdate(
        complaint_id=complaint.id,
        updated_by=current_user.id,
        status="ASSIGNED",
        message=msg,
        is_internal=False
    )
    db.add(update_log)

    # Dispatch department reassignment notifications
    notify_department_reassigned(db, complaint, dept.name, payload.note)

    db.commit()
    db.refresh(complaint)
    return serialize_complaint(complaint, is_admin_or_staff=True)


@router.post("/{complaint_id}/updates", response_model=ComplaintResponse)
def add_complaint_update(
    complaint_id: str,
    payload: ComplaintAddUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Appends an internal note or public timeline remark to a complaint."""
    complaint = resolve_complaint_record(db, complaint_id)

    if current_user.role == UserRole.STUDENT and complaint.student_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")

    # Students cannot post internal notes
    is_internal = payload.is_internal if current_user.role != UserRole.STUDENT else False

    update_log = ComplaintUpdate(
        complaint_id=complaint.id,
        updated_by=current_user.id,
        status=payload.status or complaint.status.value,
        message=payload.message,
        is_internal=is_internal
    )
    db.add(update_log)
    complaint.updated_at = datetime.now(timezone.utc)

    # Dispatch remark notification if public
    notify_complaint_update_added(db, complaint, current_user, payload.message, is_internal=is_internal)

    db.commit()
    db.refresh(complaint)
    
    is_elevated = current_user.role in [UserRole.ADMINISTRATOR, UserRole.DEPARTMENT_STAFF]
    return serialize_complaint(complaint, is_admin_or_staff=is_elevated)



@router.post("/{complaint_id}/resolve", response_model=ComplaintResponse)
def resolve_complaint(
    complaint_id: str,
    payload: ComplaintResolve,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Marks complaint as resolved with completion notes."""
    complaint = resolve_complaint_record(db, complaint_id)

    if current_user.role == UserRole.STUDENT:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Students cannot resolve complaints.")
    if current_user.role == UserRole.DEPARTMENT_STAFF and complaint.department_id != current_user.department_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Staff cannot resolve complaints assigned to another department.")

    resolved = transition_complaint_status(
        db=db,
        complaint=complaint,
        new_status=ComplaintStatus.RESOLVED,
        actor=current_user,
        note=payload.resolution_note
    )
    return serialize_complaint(resolved, is_admin_or_staff=True)


@router.get("/{complaint_id}/timeline", response_model=ComplaintTimelineResponse)
def get_complaint_timeline(
    complaint_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Returns sequential timeline data tailored for tracking cards."""
    complaint = resolve_complaint_record(db, complaint_id)

    standard_stages = [
        ("01", "Submitted", ComplaintStatus.PENDING),
        ("02", "Under Review", ComplaintStatus.UNDER_REVIEW),
        ("03", "Assigned", ComplaintStatus.ASSIGNED),
        ("04", "In Progress", ComplaintStatus.IN_PROGRESS),
        ("05", "Resolved", ComplaintStatus.RESOLVED)
    ]

    status_order = [
        ComplaintStatus.PENDING,
        ComplaintStatus.UNDER_REVIEW,
        ComplaintStatus.ASSIGNED,
        ComplaintStatus.IN_PROGRESS,
        ComplaintStatus.RESOLVED
    ]

    current_idx = status_order.index(complaint.status) if complaint.status in status_order else 0

    steps: List[TimelineStep] = []
    for idx, (step_num, title, stage_status) in enumerate(standard_stages):
        matching_update = next((u for u in complaint.updates if u.status == stage_status.value), None)
        
        if idx < current_idx:
            step_state = "completed"
        elif idx == current_idx:
            step_state = "current"
        else:
            step_state = "pending"

        date_str = matching_update.created_at.strftime("%d %b") if matching_update else ""
        time_str = matching_update.created_at.strftime("%I:%M %p") if matching_update else ""
        desc = matching_update.message if matching_update else f"Awaiting {title.lower()} stage."
        author = matching_update.author.full_name if matching_update and matching_update.author else None

        steps.append(TimelineStep(
            step=step_num,
            title=title,
            date=date_str,
            time=time_str,
            description=desc,
            status=step_state,
            author=author
        ))

    return ComplaintTimelineResponse(
        complaint_id=complaint.id,
        complaint_number=complaint.complaint_number,
        status=complaint.status,
        steps=steps
    )


@router.post("/{complaint_id}/attachments", response_model=AttachmentResponse, status_code=status.HTTP_201_CREATED)
async def upload_attachment(
    complaint_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Uploads and associates evidence files (images/PDFs) to a complaint."""
    complaint = resolve_complaint_record(db, complaint_id)

    if current_user.role == UserRole.STUDENT and complaint.student_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")

    # Validate MIME type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{file.content_type}'. Allowed: JPG, PNG, WEBP, PDF."
        )

    # Ensure upload directory exists
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

    # Generate safe unique filename
    ext = ALLOWED_MIME_TYPES[file.content_type]
    unique_name = f"{uuid.uuid4()}{ext}"
    dest_path = os.path.join(settings.UPLOAD_DIR, unique_name)

    # Stream file to disk and validate size
    size = 0
    with open(dest_path, "wb") as buffer:
        while chunk := await file.read(1024 * 1024):  # 1MB chunks
            size += len(chunk)
            if size > settings.MAX_FILE_SIZE_BYTES:
                buffer.close()
                os.remove(dest_path)
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"File exceeds maximum size limit of {settings.MAX_FILE_SIZE_BYTES // (1024 * 1024)}MB."
                )
            buffer.write(chunk)

    attachment = Attachment(
        complaint_id=complaint.id,
        file_name=file.filename or unique_name,
        file_path=dest_path,
        file_type=file.content_type,
        file_size=size,
        uploaded_by=current_user.id
    )
    db.add(attachment)
    db.commit()
    db.refresh(attachment)

    return AttachmentResponse(
        id=attachment.id,
        complaint_id=attachment.complaint_id,
        file_name=attachment.file_name,
        file_path=attachment.file_path,
        file_type=attachment.file_type,
        file_size=attachment.file_size,
        created_at=attachment.created_at
    )
