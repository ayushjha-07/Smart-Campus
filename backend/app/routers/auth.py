from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token, get_current_active_user
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserResponse
from app.services.auth_service import authenticate_user, register_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    """Registers a new user and returns an initial JWT authentication token."""
    user = register_user(db, payload)
    access_token = create_access_token(subject=str(user.id))
    
    user_data = UserResponse.model_validate(user).model_dump(mode="json")
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_data
    )


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """Authenticates an institutional user and issues a Bearer JWT token."""
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=str(user.id))
    user_data = UserResponse.model_validate(user).model_dump(mode="json")
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_data
    )


@router.get("/me", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_me(current_user: User = Depends(get_current_active_user)):
    """Returns profile metadata for the authenticated user session."""
    return current_user
