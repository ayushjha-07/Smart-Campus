import os
from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings using Pydantic Settings v2."""
    
    PROJECT_NAME: str = "Smart Campus API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database Configuration
    DATABASE_URL: str = Field(
        default="postgresql+psycopg://smartcampus:smartcampus@localhost:5432/smartcampus",
        description="SQLAlchemy database connection URI."
    )
    
    # Security / JWT Configuration
    SECRET_KEY: str = Field(
        default="smartcampus-dev-secret-key-change-in-production-2026",
        description="Cryptographic secret key for signing JWT tokens."
    )
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(
        default=60,
        description="Expiration time in minutes for access tokens."
    )
    ALGORITHM: str = Field(
        default="HS256",
        description="JWT signing algorithm."
    )
    
    # Upload and File Storage Configuration
    UPLOAD_DIR: str = Field(
        default="uploads",
        description="Directory on filesystem to store complaint attachments."
    )
    MAX_FILE_SIZE_BYTES: int = Field(
        default=10 * 1024 * 1024,  # 10 MB
        description="Maximum allowed file upload size."
    )
    
    # Frontend Integration & CORS Configuration
    FRONTEND_URL: str = Field(
        default="http://localhost:5173",
        description="Primary frontend URL."
    )
    CORS_ORIGINS: Union[str, List[str]] = Field(
        default=[
            "http://localhost:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174"
        ],
        description="Allowed CORS origin domains."
    )
    
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: Union[str, List[str]]) -> List[str]:
        if isinstance(value, str):
            if value.strip() == "*":
                return ["*"]
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
