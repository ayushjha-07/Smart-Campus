import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict, Field

from app.models.enums import NotificationPriority, UserRole


class NotificationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    title: str
    message: str
    notification_type: str
    priority: str = NotificationPriority.INFO.value
    is_read: bool
    read_at: Optional[datetime] = None
    complaint_id: Optional[uuid.UUID] = None
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_model(cls, model: Any) -> "NotificationResponse":
        """Helper to map notification_metadata attribute to metadata property."""
        return cls(
            id=model.id,
            user_id=model.user_id,
            title=model.title,
            message=model.message,
            notification_type=model.notification_type,
            priority=model.priority,
            is_read=model.is_read,
            read_at=model.read_at,
            complaint_id=model.complaint_id,
            metadata=getattr(model, "notification_metadata", None),
            created_at=model.created_at
        )


class NotificationListResponse(BaseModel):
    items: List[NotificationResponse]
    total: int
    page: int = 1
    page_size: int = 20
    total_pages: int = 1
    unread_count: int


class UnreadCountResponse(BaseModel):
    unread_count: int


class NotificationPreferenceResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    email_enabled: bool = False
    in_app_enabled: bool = True
    push_enabled: bool = False
    sound_enabled: bool = False
    complaint_updates: bool = True
    department_alerts: bool = True
    system_announcements: bool = True
    critical_alerts_only: bool = False
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class NotificationPreferenceUpdate(BaseModel):
    email_enabled: Optional[bool] = None
    in_app_enabled: Optional[bool] = None
    push_enabled: Optional[bool] = None
    sound_enabled: Optional[bool] = None
    complaint_updates: Optional[bool] = None
    department_alerts: Optional[bool] = None
    system_announcements: Optional[bool] = None
    critical_alerts_only: Optional[bool] = None


class AnnouncementRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=5)
    priority: NotificationPriority = NotificationPriority.INFO
    target_role: Optional[UserRole] = None
    metadata: Optional[Dict[str, Any]] = None
