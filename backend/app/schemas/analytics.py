from typing import List, Dict, Any
from pydantic import BaseModel


class AnalyticsOverview(BaseModel):
    total_complaints: int
    resolved_count: int
    in_progress_count: int
    pending_count: int
    critical_count: int
    resolution_rate: float
    avg_resolution_hours: float
    sla_compliance_rate: float


class TrendDataPoint(BaseModel):
    label: str
    complaints: int
    resolved: int


class CategoryDataPoint(BaseModel):
    category: str
    count: int
    percentage: float


class PriorityDataPoint(BaseModel):
    priority: str
    count: int
    percentage: float


class StatusDataPoint(BaseModel):
    status: str
    count: int
    percentage: float


class DepartmentWorkloadPoint(BaseModel):
    department: str
    department_code: str
    assigned: int
    in_progress: int
    resolved: int
    resolution_rate: float


class ResolutionTimePoint(BaseModel):
    category: str
    avg_hours: float
