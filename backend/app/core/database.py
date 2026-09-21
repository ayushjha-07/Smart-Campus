from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Session
from app.core.config import settings

# Base Declarative Class for all SQLAlchemy models in 2.x style
class Base(DeclarativeBase):
    pass

# Engine initialization
is_sqlite = settings.DATABASE_URL.startswith("sqlite")

connect_args = {}
if is_sqlite:
    connect_args["check_same_thread"] = False

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    echo=False
)

# Session factory
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False
)

def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that yields a database session and guarantees closure.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
