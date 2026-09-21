import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from sqlalchemy import String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import generate_uuid, GUID

if TYPE_CHECKING:
    from app.models.complaint import Complaint
    from app.models.user import User


class ComplaintUpdate(Base):
    """Event log and timeline progression for a campus complaint."""
    __tablename__ = "complaint_updates"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=generate_uuid,
        index=True
    )
    complaint_id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("complaints.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    updated_by: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    status: Mapped[str] = mapped_column(String(50), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    is_internal: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    # Relationships
    complaint: Mapped["Complaint"] = relationship(
        "Complaint",
        foreign_keys=[complaint_id],
        back_populates="updates"
    )
    author: Mapped["User"] = relationship(
        "User",
        foreign_keys=[updated_by],
        back_populates="complaint_updates"
    )
