import uuid
from datetime import datetime, timezone
from sqlalchemy import DateTime, TypeDecorator, CHAR
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import mapped_column, Mapped


class GUID(TypeDecorator):
    """
    Platform-independent GUID type.
    Uses PostgreSQL's native UUID type, otherwise uses CHAR(36) in SQLite.
    Safely coerces string inputs to UUIDs or stringified UUIDs.
    """
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_UUID(as_uuid=True))
        else:
            return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        if not isinstance(value, uuid.UUID):
            try:
                value = uuid.UUID(str(value))
            except (ValueError, TypeError):
                return str(value)
        if dialect.name == "postgresql":
            return value
        else:
            return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        if not isinstance(value, uuid.UUID):
            try:
                return uuid.UUID(str(value))
            except (ValueError, TypeError):
                return value
        return value


class TimestampMixin:
    """Reusable mixin providing created_at and updated_at UTC timestamps."""
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )


def generate_uuid() -> uuid.UUID:
    """Generate a standard UUID4."""
    return uuid.uuid4()
