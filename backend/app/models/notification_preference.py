import uuid
from typing import TYPE_CHECKING
from sqlalchemy import Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid, GUID

if TYPE_CHECKING:
    from app.models.user import User


class NotificationPreference(Base, TimestampMixin):
    """User delivery preferences and granular alert toggles."""
    __tablename__ = "notification_preferences"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=generate_uuid,
        index=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True
    )
    
    # Channels
    email_enabled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    in_app_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    push_enabled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    sound_enabled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    # Event Toggles
    complaint_updates: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    department_alerts: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    system_announcements: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    critical_alerts_only: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(
        "User",
        foreign_keys=[user_id],
        back_populates="notification_preference"
    )
