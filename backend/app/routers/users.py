import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_active_user, require_admin
from app.models.user import User
from app.models.department import Department
from app.models.enums import UserRole, UserStatus
from app.schemas.user import (
    UserResponse,
    UserListResponse,
    UserUpdate,
    UserStatusUpdate
)

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_user_me(current_user: User = Depends(get_current_active_user)):
    """Fetches profile for currently logged-in user."""
    return current_user


@router.put("/me", response_model=UserResponse)
def update_user_me(
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Allows current user to update their personal contact details."""
    if payload.full_name is not None:
        current_user.full_name = payload.full_name
    if payload.phone is not None:
        current_user.phone = payload.phone
    if payload.course is not None:
        current_user.course = payload.course
    if payload.branch is not None:
        current_user.branch = payload.branch
    if payload.year is not None:
        current_user.year = payload.year

    db.commit()
    db.refresh(current_user)
    return current_user


@router.get("", response_model=UserListResponse, dependencies=[Depends(require_admin)])
def list_users(
    search: Optional[str] = None,
    role: Optional[UserRole] = None,
    department_id: Optional[uuid.UUID] = None,
    user_status: Optional[UserStatus] = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Administrative user directory listing with filtering and pagination."""
    query = db.query(User)

    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            or_(
                User.full_name.ilike(s),
                User.email.ilike(s),
                User.student_id.ilike(s),
                User.employee_id.ilike(s)
            )
        )
    if role:
        query = query.filter(User.role == role)
    if department_id:
        query = query.filter(User.department_id == department_id)
    if user_status:
        query = query.filter(User.status == user_status)

    total = query.count()
    users = query.order_by(User.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()

    items = []
    for u in users:
        dept_name = u.department.name if u.department else None
        res = UserResponse.model_validate(u)
        res.department_name = dept_name
        items.append(res)

    return UserListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(
    user_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve single user details (Admin or account owner only)."""
    if current_user.role != UserRole.ADMINISTRATOR and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to view this account profile."
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    
    res = UserResponse.model_validate(user)
    res.department_name = user.department.name if user.department else None
    return res


@router.put("/{user_id}", response_model=UserResponse, dependencies=[Depends(require_admin)])
def update_user_by_admin(
    user_id: uuid.UUID,
    payload: UserUpdate,
    db: Session = Depends(get_db)
):
    """Admin endpoint to update user fields including department assignment."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    for field, val in payload.model_dump(exclude_unset=True).items():
        setattr(user, field, val)

    db.commit()
    db.refresh(user)
    
    res = UserResponse.model_validate(user)
    res.department_name = user.department.name if user.department else None
    return res


@router.patch("/{user_id}/status", response_model=UserResponse, dependencies=[Depends(require_admin)])
def update_user_status(
    user_id: uuid.UUID,
    payload: UserStatusUpdate,
    db: Session = Depends(get_db)
):
    """Administrative status transition (Activate, Suspend, Verify)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    user.status = payload.status
    db.commit()
    db.refresh(user)

    res = UserResponse.model_validate(user)
    res.department_name = user.department.name if user.department else None
    return res
