from typing import List, Any, Dict
from pydantic import BaseModel
from app.schemas.complaint import ComplaintResponse
from app.schemas.notification import NotificationResponse


class StudentDashboardResponse(BaseModel):
    total_complaints: int
    pending_count: int
    in_progress_count: int
    resolved_count: int
    recent_complaints: List[ComplaintResponse]
    recent_notifications: List[NotificationResponse]
    priority_distribution: Dict[str, int] = {}


class AdminDashboardResponse(BaseModel):
    total_complaints: int
    pending_count: int
    under_review_count: int
    in_progress_count: int
    resolved_count: int
    critical_count: int
    resolution_rate: float
    recent_complaints: List[ComplaintResponse]
    department_performance: List[Dict[str, Any]]


class DepartmentDashboardResponse(BaseModel):
    department_name: str
    department_code: str
    assigned_total: int
    pending_count: int
    in_progress_count: int
    resolved_count: int
    avg_resolution_hours: float
    urgent_complaints: List[ComplaintResponse]
    recent_complaints: List[ComplaintResponse]
    recent_activity: List[Dict[str, Any]]
