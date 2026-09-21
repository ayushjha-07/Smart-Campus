def test_user_registration(client):
    """Test self-service student registration."""
    payload = {
        "full_name": "New Registration",
        "email": "new_student@campus.edu",
        "password": "SecurePassword123",
        "phone": "+91 99999 11111",
        "role": "STUDENT",
        "student_id": "SC-STU-NEW-01",
        "course": "B.Tech",
        "branch": "CSE",
        "year": 1
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "new_student@campus.edu"
    assert "password_hash" not in data["user"]


def test_user_registration_duplicate_email(client, seed_test_data):
    """Prevent duplicate email registrations."""
    payload = {
        "full_name": "Duplicate Student",
        "email": seed_test_data["student"].email,
        "password": "Password123",
        "role": "STUDENT"
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"]


def test_user_login_success(client, seed_test_data):
    """Verify login with valid credentials yields JWT token."""
    response = client.post("/api/v1/auth/login", json={
        "email": seed_test_data["student"].email,
        "password": "Password@123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == seed_test_data["student"].email


def test_user_login_invalid_credentials(client):
    """Verify rejection of incorrect password."""
    response = client.post("/api/v1/auth/login", json={
        "email": "nonexistent@campus.edu",
        "password": "WrongPassword"
    })
    assert response.status_code == 401


def test_get_current_user_me(client, student_auth_headers, seed_test_data):
    """Verify /auth/me returns caller's profile."""
    response = client.get("/api/v1/auth/me", headers=student_auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == seed_test_data["student"].email
    assert data["role"] == "STUDENT"
