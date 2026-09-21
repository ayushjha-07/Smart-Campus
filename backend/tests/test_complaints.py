def test_create_complaint_with_ai_routing(client, student_auth_headers, seed_test_data):
    """Test complaint creation triggers AI categorization and Maintenance routing."""
    payload = {
        "title": "Water supply outage in Hostel Block B",
        "description": "Heavy water leakage from broken pipe on the second floor corridor. Tap dry.",
        "location": "Hostel B, 2nd Floor"
    }
    response = client.post("/api/v1/complaints", json=payload, headers=student_auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["complaint_number"].startswith("SC-")
    assert data["category"] == "Water Supply"
    assert data["department_name"] == "Maintenance"
    assert data["priority"] in ["HIGH", "CRITICAL"]
    assert data["status"] == "ASSIGNED"
    assert len(data["updates"]) >= 1


def test_complaint_status_transition_workflow(client, student_auth_headers, staff_mnt_auth_headers):
    """Test valid lifecycle flow: ASSIGNED -> IN_PROGRESS -> RESOLVED."""
    # 1. Student creates ticket
    create_res = client.post("/api/v1/complaints", json={
        "title": "Broken classroom bench",
        "description": "Wooden bench broken in lecture hall 102.",
        "category": "Infrastructure",
        "location": "Hall 102"
    }, headers=student_auth_headers)
    assert create_res.status_code == 201
    complaint_id = create_res.json()["id"]

    # 2. Staff updates status to IN_PROGRESS
    status_res = client.patch(f"/api/v1/complaints/{complaint_id}/status", json={
        "status": "IN_PROGRESS",
        "note": "Carpenter dispatched to Hall 102."
    }, headers=staff_mnt_auth_headers)
    assert status_res.status_code == 200
    assert status_res.json()["status"] == "IN_PROGRESS"

    # 3. Staff resolves complaint
    resolve_res = client.post(f"/api/v1/complaints/{complaint_id}/resolve", json={
        "resolution_note": "Replaced wooden slats and reinforced bracket."
    }, headers=staff_mnt_auth_headers)
    assert resolve_res.status_code == 200
    assert resolve_res.json()["status"] == "RESOLVED"
    assert resolve_res.json()["resolved_at"] is not None


def test_complaint_timeline(client, student_auth_headers):
    """Verify complaint timeline returns formatted tracking stages."""
    create_res = client.post("/api/v1/complaints", json={
        "title": "Air conditioning unit leaking water",
        "description": "AC leaking water in lab.",
        "category": "Infrastructure"
    }, headers=student_auth_headers)
    complaint_id = create_res.json()["id"]

    timeline_res = client.get(f"/api/v1/complaints/{complaint_id}/timeline", headers=student_auth_headers)
    assert timeline_res.status_code == 200
    data = timeline_res.json()
    assert len(data["steps"]) == 5
    assert data["steps"][0]["title"] == "Submitted"
    assert data["steps"][0]["status"] in ["completed", "current"]
