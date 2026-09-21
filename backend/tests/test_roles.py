def test_student_forbidden_from_admin_endpoints(client, student_auth_headers):
    """Verify students cannot access executive endpoints."""
    # Cannot view user directory
    res1 = client.get("/api/v1/users", headers=student_auth_headers)
    assert res1.status_code == 403

    # Cannot view executive analytics
    res2 = client.get("/api/v1/analytics/overview", headers=student_auth_headers)
    assert res2.status_code == 403


def test_staff_cross_department_restriction(client, student_auth_headers, staff_it_auth_headers, seed_test_data):
    """Staff of IT Support cannot modify complaints routed to Maintenance department."""
    # 1. Student creates Maintenance complaint
    res = client.post("/api/v1/complaints", json={
        "title": "Water leakage in cafeteria",
        "description": "Pipe leaking water near kitchen.",
        "category": "Water Supply"
    }, headers=student_auth_headers)
    assert res.status_code == 201
    complaint_id = res.json()["id"]

    # 2. IT Staff tries to update status of Maintenance ticket -> 403 Forbidden
    update_res = client.patch(f"/api/v1/complaints/{complaint_id}/status", json={
        "status": "IN_PROGRESS"
    }, headers=staff_it_auth_headers)
    assert update_res.status_code == 403


def test_student_cannot_modify_status(client, student_auth_headers):
    """Students are not authorized to update ticket status."""
    res = client.post("/api/v1/complaints", json={
        "title": "Library chair wobbling",
        "description": "Chair in 2nd floor library.",
        "category": "Infrastructure"
    }, headers=student_auth_headers)
    complaint_id = res.json()["id"]

    status_res = client.patch(f"/api/v1/complaints/{complaint_id}/status", json={
        "status": "RESOLVED"
    }, headers=student_auth_headers)
    assert status_res.status_code == 403


def test_admin_can_access_all(client, admin_auth_headers, student_auth_headers):
    """Administrators have full visibility and control."""
    # 1. Create a ticket as student
    create_res = client.post("/api/v1/complaints", json={
        "title": "Corridor light flickering",
        "description": "Hallway light blinking continuously.",
        "category": "Electricity"
    }, headers=student_auth_headers)
    complaint_id = create_res.json()["id"]

    # 2. Admin can view users
    users_res = client.get("/api/v1/users", headers=admin_auth_headers)
    assert users_res.status_code == 200

    # 3. Admin can view analytics
    analytics_res = client.get("/api/v1/analytics/overview", headers=admin_auth_headers)
    assert analytics_res.status_code == 200

    # 4. Admin can adjust priority
    prio_res = client.patch(f"/api/v1/complaints/{complaint_id}/priority", json={
        "priority": "CRITICAL",
        "note": "Electrical hazard."
    }, headers=admin_auth_headers)
    assert prio_res.status_code == 200
    assert prio_res.json()["priority"] == "CRITICAL"
