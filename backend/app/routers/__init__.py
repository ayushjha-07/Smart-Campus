from app.routers.health import router as health_router
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.departments import router as departments_router
from app.routers.complaints import router as complaints_router
from app.routers.notifications import router as notifications_router
from app.routers.analytics import router as analytics_router
from app.routers.dashboard import router as dashboard_router
from app.routers.websocket import router as websocket_router

__all__ = [
    "health_router",
    "auth_router",
    "users_router",
    "departments_router",
    "complaints_router",
    "notifications_router",
    "analytics_router",
    "dashboard_router",
    "websocket_router",
]

