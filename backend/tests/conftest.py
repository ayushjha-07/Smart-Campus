import os
import sys
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Ensure backend root is on path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.database import Base, get_db
from app.core.security import get_password_hash, create_access_token
from app.main import app
from app.models.enums import UserRole, UserStatus, DepartmentStatus
from app.models.department import Department
from app.models.user import User

# In-memory SQLite engine for tests
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """Initializes tables for test session."""
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def db():
    """Provides a clean transactional test database session."""
    connection = test_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db):
    """FastAPI TestClient with overridden get_db dependency."""
    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def seed_test_data(db):
    """Seeds baseline departments and users for role testing."""
    # 1. Departments
    dept_mnt = Department(
        name="Maintenance",
        department_code="MNT",
        description="Facilities & repairs",
        status=DepartmentStatus.ACTIVE
    )
    dept_it = Department(
        name="IT Support",
        department_code="IT",
        description="Computing & Wi-Fi",
        status=DepartmentStatus.ACTIVE
    )
    db.add(dept_mnt)
    db.add(dept_it)
    db.flush()

    # 2. Users
    student = User(
        full_name="Test Student",
        email="test_student@campus.edu",
        password_hash=get_password_hash("Password@123"),
        role=UserRole.STUDENT,
        status=UserStatus.ACTIVE,
        student_id="SC-STU-TEST-01"
    )
    staff_mnt = User(
        full_name="Test Maintenance Staff",
        email="test_staff_mnt@campus.edu",
        password_hash=get_password_hash("Password@123"),
        role=UserRole.DEPARTMENT_STAFF,
        status=UserStatus.ACTIVE,
        employee_id="EMP-MNT-TEST",
        department_id=dept_mnt.id
    )
    staff_it = User(
        full_name="Test IT Staff",
        email="test_staff_it@campus.edu",
        password_hash=get_password_hash("Password@123"),
        role=UserRole.DEPARTMENT_STAFF,
        status=UserStatus.ACTIVE,
        employee_id="EMP-IT-TEST",
        department_id=dept_it.id
    )
    admin = User(
        full_name="Test Administrator",
        email="test_admin@campus.edu",
        password_hash=get_password_hash("Password@123"),
        role=UserRole.ADMINISTRATOR,
        status=UserStatus.ACTIVE,
        employee_id="ADM-TEST"
    )
    db.add_all([student, staff_mnt, staff_it, admin])
    db.commit()

    return {
        "dept_mnt": dept_mnt,
        "dept_it": dept_it,
        "student": student,
        "staff_mnt": staff_mnt,
        "staff_it": staff_it,
        "admin": admin
    }


@pytest.fixture
def student_auth_headers(seed_test_data):
    token = create_access_token(subject=str(seed_test_data["student"].id))
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def staff_mnt_auth_headers(seed_test_data):
    token = create_access_token(subject=str(seed_test_data["staff_mnt"].id))
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def staff_it_auth_headers(seed_test_data):
    token = create_access_token(subject=str(seed_test_data["staff_it"].id))
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def admin_auth_headers(seed_test_data):
    token = create_access_token(subject=str(seed_test_data["admin"].id))
    return {"Authorization": f"Bearer {token}"}
