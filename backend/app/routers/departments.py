import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_active_user, require_admin
from app.models.department import Department
from app.models.complaint import Complaint
from app.models.user import User
from app.models.enums import UserRole, ComplaintStatus
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentStatusUpdate,
    DepartmentResponse,
    DepartmentListResponse
)
from app.schemas.complaint import ComplaintResponse

router = APIRouter(prefix="/departments", tags=["Departments"])


def build_department_response(dept: Department, db: Session) -> DepartmentResponse:
    staff_count = len(dept.staff)
    active_count = db.query(Complaint).filter(
        Complaint.department_id == dept.id,
        Complaint.status.in_([ComplaintStatus.PENDING, ComplaintStatus.UNDER_REVIEW, ComplaintStatus.ASSIGNED, ComplaintStatus.IN_PROGRESS])
    ).count()
    resolved_count = db.query(Complaint).filter(
        Complaint.department_id == dept.id,
        Complaint.status == ComplaintStatus.RESOLVED
    ).count()

    head_name = dept.head.full_name if dept.head else None

    return DepartmentResponse(
        id=dept.id,
        name=dept.name,
        department_code=dept.department_code,
        description=dept.description,
        department_head_id=dept.department_head_id,
        department_head_name=head_name,
        status=dept.status,
        staff_count=staff_count,
        active_complaints_count=active_count,
        resolved_complaints_count=resolved_count,
        created_at=dept.created_at
    )


@router.get("", response_model=DepartmentListResponse)
def list_departments(db: Session = Depends(get_db)):
    """Public/authorized list of all campus departments with activity metrics."""
    depts = db.query(Department).order_by(Department.name.asc()).all()
    items = [build_department_response(d, db) for d in depts]
    return DepartmentListResponse(items=items, total=len(items))


@router.get("/{department_id}", response_model=DepartmentResponse)
def get_department(department_id: uuid.UUID, db: Session = Depends(get_db)):
    """Fetch single department details."""
    dept = db.query(Department).filter(Department.id == department_id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found.")
    return build_department_response(dept, db)


@router.post("", response_model=DepartmentResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
def create_department(payload: DepartmentCreate, db: Session = Depends(get_db)):
    """Creates a new campus department (Admin only)."""
    existing = db.query(Department).filter(
        (Department.name == payload.name) | (Department.department_code == payload.department_code)
    ).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Department name or code already exists.")

    new_dept = Department(
        name=payload.name,
        department_code=payload.department_code.upper().strip(),
        description=payload.description,
        department_head_id=payload.department_head_id,
        status=payload.status
    )
    db.add(new_dept)
    db.commit()
    db.refresh(new_dept)
    return build_department_response(new_dept, db)


@router.put("/{department_id}", response_model=DepartmentResponse, dependencies=[Depends(require_admin)])
def update_department(
    department_id: uuid.UUID,
    payload: DepartmentUpdate,
    db: Session = Depends(get_db)
):
    """Update department info (Admin only)."""
    dept = db.query(Department).filter(Department.id == department_id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found.")

    for field, val in payload.model_dump(exclude_unset=True).items():
        setattr(dept, field, val)

    db.commit()
    db.refresh(dept)
    return build_department_response(dept, db)


@router.patch("/{department_id}/status", response_model=DepartmentResponse, dependencies=[Depends(require_admin)])
def update_department_status(
    department_id: uuid.UUID,
    payload: DepartmentStatusUpdate,
    db: Session = Depends(get_db)
):
    """Deactivate or activate department (Admin only)."""
    dept = db.query(Department).filter(Department.id == department_id).first()
    if not dept:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found.")

    dept.status = payload.status
    db.commit()
    db.refresh(dept)
    return build_department_response(dept, db)


@router.get("/{department_id}/complaints", response_model=List[ComplaintResponse])
def get_department_complaints(
    department_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Returns complaints routed to the department (Admin or staff of that department)."""
    if current_user.role != UserRole.ADMINISTRATOR:
        if current_user.department_id != department_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access restricted to staff assigned to this department or administrators."
            )

    complaints = db.query(Complaint).filter(Complaint.department_id == department_id).order_by(Complaint.submitted_at.desc()).all()
    
    results = []
    for c in complaints:
        res = ComplaintResponse.model_validate(c)
        res.student_name = c.student.full_name if c.student else None
        res.student_email = c.student.email if c.student else None
        res.department_name = c.department.name if c.department else None
        results.append(res)
    return results
