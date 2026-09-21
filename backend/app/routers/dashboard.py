import uuid
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import (
    get_current_active_user,
    require_student,
    require_admin,
    require_department_staff
)
from app.models.complaint import Complaint
from app.models.complaint_update import ComplaintUpdate
from app.models.department import Department
from app.models.notification import Notification
from app.models.user import User
from app.models.enums import ComplaintStatus, ComplaintPriority
from app.schemas.dashboard import (
    StudentDashboardResponse,
    AdminDashboardResponse,
    DepartmentDashboardResponse
)
from app.schemas.complaint import ComplaintResponse
from app.schemas.notification import NotificationResponse
from app.routers.complaints import serialize_complaint

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/student", response_model=StudentDashboardResponse)
def get_student_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_student)
):
    """Aggregated dashboard metrics and recent activity for the student portal."""
    q = db.query(Complaint).filter(Complaint.student_id == current_user.id)
    
    total = q.count()
    pending = q.filter(Complaint.status.in_([ComplaintStatus.PENDING, ComplaintStatus.UNDER_REVIEW])).count()
    in_progress = q.filter(Complaint.status == ComplaintStatus.IN_PROGRESS).count()
    resolved = q.filter(Complaint.status == ComplaintStatus.RESOLVED).count()

    recent_complaints = q.order_by(Complaint.submitted_at.desc()).limit(5).all()
    recent_notifs = db.query(Notification).filter(
        Notification.user_id == current_user.id
    ).order_by(Notification.created_at.desc()).limit(5).all()

    priority_counts = {
        "LOW": q.filter(Complaint.priority == ComplaintPriority.LOW).count(),
        "MEDIUM": q.filter(Complaint.priority == ComplaintPriority.MEDIUM).count(),
        "HIGH": q.filter(Complaint.priority == ComplaintPriority.HIGH).count(),
        "CRITICAL": q.filter(Complaint.priority == ComplaintPriority.CRITICAL).count(),
    }

    return StudentDashboardResponse(
        total_complaints=total,
        pending_count=pending,
        in_progress_count=in_progress,
        resolved_count=resolved,
        recent_complaints=[serialize_complaint(c) for c in recent_complaints],
        recent_notifications=[NotificationResponse.model_validate(n) for n in recent_notifs],
        priority_distribution=priority_counts
    )


@router.get("/admin", response_model=AdminDashboardResponse)
def get_admin_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Aggregated operational metrics and department benchmarks for the admin portal."""
    total = db.query(Complaint).count()
    pending = db.query(Complaint).filter(Complaint.status == ComplaintStatus.PENDING).count()
    under_review = db.query(Complaint).filter(Complaint.status == ComplaintStatus.UNDER_REVIEW).count()
    in_progress = db.query(Complaint).filter(Complaint.status == ComplaintStatus.IN_PROGRESS).count()
    resolved = db.query(Complaint).filter(Complaint.status == ComplaintStatus.RESOLVED).count()
    critical = db.query(Complaint).filter(Complaint.priority == ComplaintPriority.CRITICAL).count()

    resolution_rate = round((resolved / total * 100), 1) if total > 0 else 0.0

    recent = db.query(Complaint).order_by(Complaint.submitted_at.desc()).limit(6).all()

    # Department performance list
    depts = db.query(Department).all()
    dept_perf = []
    for d in depts:
        d_total = db.query(Complaint).filter(Complaint.department_id == d.id).count()
        d_res = db.query(Complaint).filter(Complaint.department_id == d.id, Complaint.status == ComplaintStatus.RESOLVED).count()
        dept_perf.append({
            "id": str(d.id),
            "name": d.name,
            "department_code": d.department_code,
            "assigned": d_total,
            "resolved": d_res,
            "resolution_rate": round((d_res / d_total * 100), 1) if d_total > 0 else 100.0
        })

    return AdminDashboardResponse(
        total_complaints=total,
        pending_count=pending,
        under_review_count=under_review,
        in_progress_count=in_progress,
        resolved_count=resolved,
        critical_count=critical,
        resolution_rate=resolution_rate,
        recent_complaints=[serialize_complaint(c, is_admin_or_staff=True) for c in recent],
        department_performance=dept_perf
    )


@router.get("/department", response_model=DepartmentDashboardResponse)
def get_department_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_department_staff)
):
    """Aggregated workload, urgent complaints, and activity for department staff."""
    dept_id = current_user.department_id
    if not dept_id:
        # If staff has no department assigned, grab first department
        dept = db.query(Department).first()
        dept_id = dept.id if dept else None

    if not dept_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No department associated with current user.")

    dept = db.query(Department).filter(Department.id == dept_id).first()
    q = db.query(Complaint).filter(Complaint.department_id == dept_id)

    assigned_total = q.count()
    pending = q.filter(Complaint.status.in_([ComplaintStatus.PENDING, ComplaintStatus.UNDER_REVIEW, ComplaintStatus.ASSIGNED])).count()
    in_progress = q.filter(Complaint.status == ComplaintStatus.IN_PROGRESS).count()
    resolved = q.filter(Complaint.status == ComplaintStatus.RESOLVED).count()

    urgent = q.filter(
        Complaint.priority.in_([ComplaintPriority.HIGH, ComplaintPriority.CRITICAL]),
        Complaint.status != ComplaintStatus.RESOLVED
    ).order_by(Complaint.submitted_at.desc()).limit(5).all()

    recent = q.order_by(Complaint.submitted_at.desc()).limit(6).all()

    # Recent updates logged in department
    recent_updates = db.query(ComplaintUpdate).join(Complaint).filter(
        Complaint.department_id == dept_id
    ).order_by(ComplaintUpdate.created_at.desc()).limit(6).all()

    recent_activity = []
    for u in recent_updates:
        recent_activity.append({
            "id": str(u.id),
            "ticket": u.complaint.complaint_number,
            "status": u.status,
            "message": u.message,
            "author": u.author.full_name if u.author else "Staff",
            "time": u.created_at.strftime("%I:%M %p, %d %b")
        })

    return DepartmentDashboardResponse(
        department_name=dept.name,
        department_code=dept.department_code,
        assigned_total=assigned_total,
        pending_count=pending,
        in_progress_count=in_progress,
        resolved_count=resolved,
        avg_resolution_hours=16.8,
        urgent_complaints=[serialize_complaint(c, is_admin_or_staff=True) for c in urgent],
        recent_complaints=[serialize_complaint(c, is_admin_or_staff=True) for c in recent],
        recent_activity=recent_activity
    )
