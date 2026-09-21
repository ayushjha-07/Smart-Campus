import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.routers import (
    health_router,
    auth_router,
    users_router,
    departments_router,
    complaints_router,
    notifications_router,
    analytics_router,
    dashboard_router,
    websocket_router
)


# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("smartcampus.api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle event handling for startup and shutdown."""
    logger.info("Initializing Smart Campus Complaint & Analytics API v%s...", settings.VERSION)
    logger.info("Database URL configured: %s", settings.DATABASE_URL.split("@")[-1] if "@" in settings.DATABASE_URL else settings.DATABASE_URL)
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    yield
    logger.info("Smart Campus API shut down cleanly.")


app = FastAPI(
    title="Smart Campus API",
    version="1.0.0",
    description="Backend REST API for Smart Campus Complaint & Analytics System (\"Report. Track. Resolve. Improve.\")",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/api/v1/openapi.json"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded attachments
if not os.path.exists(settings.UPLOAD_DIR):
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Mount API Routers
api_v1 = settings.API_V1_STR
app.include_router(health_router, prefix=api_v1)
app.include_router(auth_router, prefix=api_v1)
app.include_router(users_router, prefix=api_v1)
app.include_router(departments_router, prefix=api_v1)
app.include_router(complaints_router, prefix=api_v1)
app.include_router(notifications_router, prefix=api_v1)
app.include_router(analytics_router, prefix=api_v1)
app.include_router(dashboard_router, prefix=api_v1)
app.include_router(websocket_router, prefix=api_v1)



@app.get("/", tags=["Root"])
def root_status():
    """Root entrypoint linking to interactive documentation."""
    return {
        "project": "Smart Campus Complaint & Analytics System",
        "tagline": "Report. Track. Resolve. Improve.",
        "api_docs": "/docs",
        "redoc": "/redoc",
        "version": settings.VERSION,
        "status": "operational"
    }


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Prevents stack trace leaks to client and records structured error."""
    logger.error("Unhandled Exception at %s %s: %s", request.method, request.url.path, str(exc))
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please contact the administrator."}
    )
