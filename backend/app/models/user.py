import uuid
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Integer, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid, GUID
from app.models.enums import UserRole, UserStatus

if TYPE_CHECKING:
    from app.models.department import Department
    from app.models.complaint import Complaint
    from app.models.complaint_update import ComplaintUpdate
    from app.models.notification import Notification
    from app.models.notification_preference import NotificationPreference


class User(Base, TimestampMixin):
    """User account entity covering Students, Department Staff, and Administrators."""
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=generate_uuid,
        index=True
    )
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(25), nullable=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    
    role: Mapped[UserRole] = mapped_column(
        SQLEnum(UserRole, native_enum=False),
        default=UserRole.STUDENT,
        nullable=False,
        index=True
    )
    status: Mapped[UserStatus] = mapped_column(
        SQLEnum(UserStatus, native_enum=False),
        default=UserStatus.ACTIVE,
        nullable=False,
        index=True
    )
    
    # Student specific metadata
    student_id: Mapped[Optional[str]] = mapped_column(String(50), unique=True, index=True, nullable=True)
    course: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    branch: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    # Department staff / Administrator specific metadata
    employee_id: Mapped[Optional[str]] = mapped_column(String(50), unique=True, index=True, nullable=True)
    designation: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    department_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID(),
        ForeignKey("departments.id", ondelete="SET NULL"),
        nullable=True,
        index=True
    )

    last_active_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    department: Mapped[Optional["Department"]] = relationship(
        "Department",
        foreign_keys=[department_id],
        back_populates="staff"
    )
    complaints: Mapped[List["Complaint"]] = relationship(
        "Complaint",
        foreign_keys="Complaint.student_id",
        back_populates="student",
        cascade="all, delete-orphan"
    )
    notifications: Mapped[List["Notification"]] = relationship(
        "Notification",
        foreign_keys="Notification.user_id",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    complaint_updates: Mapped[List["ComplaintUpdate"]] = relationship(
        "ComplaintUpdate",
        foreign_keys="ComplaintUpdate.updated_by",
        back_populates="author"
    )
    notification_preference: Mapped[Optional["NotificationPreference"]] = relationship(
        "NotificationPreference",
        foreign_keys="NotificationPreference.user_id",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )
