import uuid
from datetime import datetime, timezone
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Text, Float, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid, GUID
from app.models.enums import ComplaintPriority, ComplaintStatus

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.department import Department
    from app.models.complaint_update import ComplaintUpdate
    from app.models.attachment import Attachment
    from app.models.notification import Notification


class Complaint(Base, TimestampMixin):
    """Core complaint entity tracking campus infrastructure and operational issues."""
    __tablename__ = "complaints"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=generate_uuid,
        index=True
    )
    complaint_number: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        nullable=False,
        index=True
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    
    priority: Mapped[ComplaintPriority] = mapped_column(
        SQLEnum(ComplaintPriority, native_enum=False),
        default=ComplaintPriority.MEDIUM,
        nullable=False,
        index=True
    )
    status: Mapped[ComplaintStatus] = mapped_column(
        SQLEnum(ComplaintStatus, native_enum=False),
        default=ComplaintStatus.PENDING,
        nullable=False,
        index=True
    )
    location: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)

    student_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    department_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID(),
        ForeignKey("departments.id", ondelete="SET NULL"),
        nullable=True,
        index=True
    )

    # Demo rule-based AI Triage metadata
    ai_category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    ai_priority: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    ai_confidence: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    resolved_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    student: Mapped["User"] = relationship(
        "User",
        foreign_keys=[student_id],
        back_populates="complaints"
    )
    department: Mapped[Optional["Department"]] = relationship(
        "Department",
        foreign_keys=[department_id],
        back_populates="complaints"
    )
    updates: Mapped[List["ComplaintUpdate"]] = relationship(
        "ComplaintUpdate",
        foreign_keys="ComplaintUpdate.complaint_id",
        back_populates="complaint",
        cascade="all, delete-orphan",
        order_by="ComplaintUpdate.created_at"
    )
    attachments: Mapped[List["Attachment"]] = relationship(
        "Attachment",
        foreign_keys="Attachment.complaint_id",
        back_populates="complaint",
        cascade="all, delete-orphan"
    )
    notifications: Mapped[List["Notification"]] = relationship(
        "Notification",
        foreign_keys="Notification.complaint_id",
        back_populates="complaint"
    )
