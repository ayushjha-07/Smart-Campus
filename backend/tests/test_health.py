def test_health_check(client):
    """Test basic service health probe."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "smart-campus-api"


def test_database_health_check(client):
    """Test database connectivity probe."""
    response = client.get("/api/v1/health/database")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"
