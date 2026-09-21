import uuid
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Text, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid, GUID
from app.models.enums import DepartmentStatus

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.complaint import Complaint


class Department(Base, TimestampMixin):
    """Institutional Department managing campus complaints (Maintenance, IT, Hostel, etc.)."""
    __tablename__ = "departments"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID(),
        primary_key=True,
        default=generate_uuid,
        index=True
    )
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    department_code: Mapped[str] = mapped_column(String(20), unique=True, nullable=False, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    department_head_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID(),
        ForeignKey("users.id", ondelete="SET NULL", use_alter=True),
        nullable=True
    )
    status: Mapped[DepartmentStatus] = mapped_column(
        SQLEnum(DepartmentStatus, native_enum=False),
        default=DepartmentStatus.ACTIVE,
        nullable=False,
        index=True
    )

    # Relationships
    head: Mapped[Optional["User"]] = relationship(
        "User",
        foreign_keys=[department_head_id]
    )
    staff: Mapped[List["User"]] = relationship(
        "User",
        foreign_keys="User.department_id",
        back_populates="department"
    )
    complaints: Mapped[List["Complaint"]] = relationship(
        "Complaint",
        foreign_keys="Complaint.department_id",
        back_populates="department"
    )
