from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("", status_code=status.HTTP_200_OK)
def check_health():
    """Basic service health probe."""
    return {
        "status": "ok",
        "service": "smart-campus-api"
    }


@router.get("/database", status_code=status.HTTP_200_OK)
def check_database_health(db: Session = Depends(get_db)):
    """Validates real-time database connectivity."""
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "ok",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "error",
            "database": "disconnected",
            "detail": str(e)
        }
