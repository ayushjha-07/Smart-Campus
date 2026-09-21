import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional, Any
import bcrypt
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against a salted bcrypt hash."""
    if not plain_password or not hashed_password:
        return False
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8")
        )
    except Exception:
        return False


def get_password_hash(password: str) -> str:
    """Hashes a password with a generated bcrypt salt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def create_access_token(subject: Any, expires_delta: Optional[timedelta] = None) -> str:
    """Generates an encrypted JWT access token for authentication."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "sub": str(subject),
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """Decodes and verifies signature and expiration of a JWT access token."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session token has expired. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except (jwt.InvalidTokenError, Exception):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate authentication credentials.",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    """Dependency that resolves the authenticated user from the Bearer token."""
    # Delayed model import to avoid circular dependencies
    from app.models.user import User

    payload = decode_access_token(token)
    user_id: Optional[str] = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token payload.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        user_uuid = uuid.UUID(str(user_id))
    except (ValueError, TypeError):
        user_uuid = user_id

    user = db.query(User).filter(User.id == user_uuid).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Authenticated user account not found."
        )
    return user


def get_current_active_user(current_user = Depends(get_current_user)):
    """Validates that the resolved user account is in ACTIVE status."""
    from app.models.enums import UserStatus
    if current_user.status != UserStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Account access is restricted. Current status: {current_user.status.value}"
        )
    return current_user


def require_student(current_user = Depends(get_current_active_user)):
    """RBAC dependency: requires STUDENT role."""
    from app.models.enums import UserRole
    if current_user.role != UserRole.STUDENT and current_user.role != UserRole.ADMINISTRATOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to students or campus administrators."
        )
    return current_user


def require_department_staff(current_user = Depends(get_current_active_user)):
    """RBAC dependency: requires DEPARTMENT_STAFF role or ADMINISTRATOR."""
    from app.models.enums import UserRole
    if current_user.role != UserRole.DEPARTMENT_STAFF and current_user.role != UserRole.ADMINISTRATOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to department staff or campus administrators."
        )
    return current_user


def require_admin(current_user = Depends(get_current_active_user)):
    """RBAC dependency: requires ADMINISTRATOR role strictly."""
    from app.models.enums import UserRole
    if current_user.role != UserRole.ADMINISTRATOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrative privileges required to access this resource."
        )
    return current_user
