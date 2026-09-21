import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import generate_uuid, GUID

if TYPE_CHECKING:
    from app.models.complaint import Complaint
    from app.models.user import User


class Attachment(Base):
    """File attachment uploaded as photo or document evidence for a complaint."""
    __tablename__ = "attachments"

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
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    file_type: Mapped[str] = mapped_column(String(100), nullable=False)
    file_size: Mapped[int] = mapped_column(Integer, nullable=False)
    
    uploaded_by: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    # Relationships
    complaint: Mapped["Complaint"] = relationship(
        "Complaint",
        foreign_keys=[complaint_id],
        back_populates="attachments"
    )
    uploader: Mapped["User"] = relationship(
        "User",
        foreign_keys=[uploaded_by]
    )
