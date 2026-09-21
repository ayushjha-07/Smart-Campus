from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_department_staff
from app.schemas.analytics import (
    AnalyticsOverview,
    TrendDataPoint,
    CategoryDataPoint,
    PriorityDataPoint,
    StatusDataPoint,
    DepartmentWorkloadPoint,
    ResolutionTimePoint
)
from app.services.analytics_service import (
    get_analytics_overview,
    get_analytics_trends,
    get_category_distribution,
    get_priority_distribution,
    get_status_distribution,
    get_department_workload,
    get_resolution_time_by_category
)

router = APIRouter(prefix="/analytics", tags=["Analytics"], dependencies=[Depends(require_department_staff)])


@router.get("/overview", response_model=AnalyticsOverview)
def analytics_overview(
    department_id: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Provides high-level complaint counts, resolution percentages, and SLA metrics."""
    return get_analytics_overview(db, department_id, category)


@router.get("/trends", response_model=List[TrendDataPoint])
def analytics_trends(
    days: int = Query(7, ge=3, le=90),
    db: Session = Depends(get_db)
):
    """Returns day-by-day complaint submission and resolution velocity."""
    return get_analytics_trends(db, days)


@router.get("/categories", response_model=List[CategoryDataPoint])
def analytics_categories(db: Session = Depends(get_db)):
    """Breakdown of complaints across campus service categories."""
    return get_category_distribution(db)


@router.get("/priorities", response_model=List[PriorityDataPoint])
def analytics_priorities(db: Session = Depends(get_db)):
    """Breakdown of complaints by urgency tier (Critical, High, Medium, Low)."""
    return get_priority_distribution(db)


@router.get("/status", response_model=List[StatusDataPoint])
def analytics_status(db: Session = Depends(get_db)):
    """Breakdown of complaints by lifecycle stage."""
    return get_status_distribution(db)


@router.get("/departments", response_model=List[DepartmentWorkloadPoint])
def analytics_departments(db: Session = Depends(get_db)):
    """Workload volume and resolution performance by department."""
    return get_department_workload(db)


@router.get("/resolution-time", response_model=List[ResolutionTimePoint])
def analytics_resolution_time(db: Session = Depends(get_db)):
    """Average resolution turnaround times grouped by category."""
    return get_resolution_time_by_category(db)
