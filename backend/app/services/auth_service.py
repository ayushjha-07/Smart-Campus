from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.user import User
from app.models.enums import UserStatus, UserRole
from app.schemas.auth import RegisterRequest
from app.core.security import verify_password, get_password_hash


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticates a user by email and plain password."""
    user = db.query(User).filter(User.email == email.lower().strip()).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


def register_user(db: Session, payload: RegisterRequest) -> User:
    """Validates uniqueness and creates a new user account."""
    if payload.role == UserRole.ADMINISTRATOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Public administrator registration is not permitted."
        )

    existing = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists."
        )

    if payload.student_id:
        existing_sid = db.query(User).filter(User.student_id == payload.student_id.strip()).first()
        if existing_sid:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this Student ID already exists."
            )

    if payload.employee_id:
        existing_eid = db.query(User).filter(User.employee_id == payload.employee_id.strip()).first()
        if existing_eid:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this Employee ID already exists."
            )

    hashed_pw = get_password_hash(payload.password)
    new_user = User(
        full_name=payload.full_name.strip(),
        email=payload.email.lower().strip(),
        phone=payload.phone,
        password_hash=hashed_pw,
        role=payload.role,
        status=UserStatus.ACTIVE,
        department_id=payload.department_id,
        student_id=payload.student_id,
        course=payload.course,
        branch=payload.branch,
        year=payload.year,
        employee_id=payload.employee_id,
        designation=payload.designation
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
