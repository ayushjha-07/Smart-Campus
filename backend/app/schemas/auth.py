import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from app.models.enums import UserRole


class LoginRequest(BaseModel):
    """User login credential payload."""
    email: EmailStr
    password: str = Field(min_length=6)


class RegisterRequest(BaseModel):
    """New user self-registration payload."""
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=100)
    phone: Optional[str] = None
    role: UserRole = UserRole.STUDENT
    
    # Department assignment
    department_id: Optional[uuid.UUID] = None

    # Student metadata
    student_id: Optional[str] = None
    course: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[int] = None

    # Staff metadata
    employee_id: Optional[str] = None
    designation: Optional[str] = None


class TokenResponse(BaseModel):
    """Successful authentication response with JWT access token."""
    access_token: str
    token_type: str = "bearer"
    user: dict
