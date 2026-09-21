import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field
from app.models.enums import DepartmentStatus


class DepartmentBase(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    department_code: str = Field(min_length=2, max_length=20)
    description: Optional[str] = None
    status: DepartmentStatus = DepartmentStatus.ACTIVE


class DepartmentCreate(DepartmentBase):
    department_head_id: Optional[uuid.UUID] = None


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    department_code: Optional[str] = None
    description: Optional[str] = None
    department_head_id: Optional[uuid.UUID] = None
    status: Optional[DepartmentStatus] = None


class DepartmentStatusUpdate(BaseModel):
    status: DepartmentStatus


class DepartmentResponse(DepartmentBase):
    id: uuid.UUID
    department_head_id: Optional[uuid.UUID] = None
    department_head_name: Optional[str] = None
    staff_count: int = 0
    active_complaints_count: int = 0
    resolved_complaints_count: int = 0
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DepartmentListResponse(BaseModel):
    items: List[DepartmentResponse]
    total: int
