import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, ConfigDict, Field
from app.models.enums import UserRole, UserStatus


class UserBase(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = None
    role: UserRole = UserRole.STUDENT
    status: UserStatus = UserStatus.ACTIVE


class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=100)
    student_id: Optional[str] = None
    employee_id: Optional[str] = None
    course: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None
    designation: Optional[str] = None
    department_id: Optional[uuid.UUID] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    course: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None
    designation: Optional[str] = None
    department_id: Optional[uuid.UUID] = None


class UserStatusUpdate(BaseModel):
    status: UserStatus


class UserRoleUpdate(BaseModel):
    role: UserRole


class UserResponse(BaseModel):
    id: uuid.UUID
    full_name: str
    email: str
    phone: Optional[str] = None
    role: UserRole
    status: UserStatus
    student_id: Optional[str] = None
    employee_id: Optional[str] = None
    course: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None
    designation: Optional[str] = None
    department_id: Optional[uuid.UUID] = None
    department_name: Optional[str] = None
    created_at: datetime
    last_active_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class UserListResponse(BaseModel):
    items: List[UserResponse]
    total: int
    page: int
    page_size: int
