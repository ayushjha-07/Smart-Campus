import uuid
from datetime import datetime, timezone
from typing import Optional, TYPE_CHECKING
from sqlalchemy import String, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import generate_uuid, GUID
from app.models.enums import NotificationPriority

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.complaint import Complaint


class Notification(Base):
    """In-app alerts dispatched to users across role lifecycles."""
    __tablename__ = "notifications"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=generate_uuid,
        index=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    notification_type: Mapped[str] = mapped_column(String(50), nullable=False, default="COMPLAINT_STATUS_UPDATED", index=True)
    priority: Mapped[str] = mapped_column(String(20), nullable=False, default=NotificationPriority.INFO.value, index=True)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)
    read_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    
    complaint_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID(),
        ForeignKey("complaints.id", ondelete="SET NULL"),
        nullable=True,
        index=True
    )
    notification_metadata: Mapped[Optional[dict]] = mapped_column("metadata", JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    # Relationships
    user: Mapped["User"] = relationship(
        "User",
        foreign_keys=[user_id],
        back_populates="notifications"
    )
    complaint: Mapped[Optional["Complaint"]] = relationship(
        "Complaint",
        foreign_keys=[complaint_id],
        back_populates="notifications"
    )
