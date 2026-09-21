import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field
from app.models.enums import ComplaintPriority, ComplaintStatus


class ComplaintCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    description: str = Field(min_length=5)
    category: Optional[str] = None
    location: Optional[str] = None
    priority: Optional[ComplaintPriority] = None


class ComplaintUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None


class ComplaintStatusUpdate(BaseModel):
    status: ComplaintStatus
    note: Optional[str] = None
    is_internal: bool = False


class ComplaintPriorityUpdate(BaseModel):
    priority: ComplaintPriority
    note: Optional[str] = None


class ComplaintDepartmentUpdate(BaseModel):
    department_id: uuid.UUID
    note: Optional[str] = None


class ComplaintAddUpdate(BaseModel):
    status: Optional[str] = None
    message: str = Field(min_length=2)
    is_internal: bool = False


class ComplaintResolve(BaseModel):
    resolution_note: str = Field(min_length=3)


class ComplaintUpdateResponse(BaseModel):
    id: uuid.UUID
    complaint_id: uuid.UUID
    updated_by: uuid.UUID
    updated_by_name: Optional[str] = None
    status: str
    message: str
    is_internal: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AttachmentResponse(BaseModel):
    id: uuid.UUID
    complaint_id: uuid.UUID
    file_name: str
    file_path: str
    file_type: str
    file_size: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ComplaintResponse(BaseModel):
    id: uuid.UUID
    complaint_number: str
    title: str
    description: str
    category: str
    priority: ComplaintPriority
    status: ComplaintStatus
    location: Optional[str] = None
    
    student_id: uuid.UUID
    student_name: Optional[str] = None
    student_email: Optional[str] = None
    
    department_id: Optional[uuid.UUID] = None
    department_name: Optional[str] = None
    
    ai_category: Optional[str] = None
    ai_priority: Optional[str] = None
    ai_confidence: Optional[float] = None
    
    submitted_at: datetime
    updated_at: datetime
    resolved_at: Optional[datetime] = None

    updates: List[ComplaintUpdateResponse] = []
    attachments: List[AttachmentResponse] = []

    model_config = ConfigDict(from_attributes=True)


class ComplaintListResponse(BaseModel):
    items: List[ComplaintResponse]
    total: int
    page: int
    page_size: int


class TimelineStep(BaseModel):
    step: str
    title: str
    date: str
    time: str
    description: str
    status: str  # 'completed' | 'current' | 'pending'
    author: Optional[str] = None


class ComplaintTimelineResponse(BaseModel):
    complaint_id: uuid.UUID
    complaint_number: str
    status: ComplaintStatus
    steps: List[TimelineStep]
