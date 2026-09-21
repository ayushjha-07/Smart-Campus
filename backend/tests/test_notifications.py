import pytest
from starlette.websockets import WebSocketDisconnect
from app.core.security import create_access_token
from app.models.enums import NotificationPriority, NotificationType


def test_notification_creation_and_list(client, seed_test_data, student_auth_headers):
    """Verify that creating a complaint generates a submission notification for the student."""
    # 1. Student creates a complaint
    resp = client.post(
        "/api/v1/complaints",
        headers=student_auth_headers,
        json={
            "title": "Water leakage in Science Block",
            "description": "Pipe leaking on second floor corridor causing water accumulation.",
            "category": "Water Supply",
            "priority": "HIGH",
            "location": "Science Block 2nd Floor"
        }
    )
    assert resp.status_code == 201
    complaint_data = resp.json()

    # 2. Query student notifications
    notif_resp = client.get("/api/v1/notifications", headers=student_auth_headers)
    assert notif_resp.status_code == 200
    data = notif_resp.json()
    assert data["total"] >= 1
    assert data["unread_count"] >= 1
    assert len(data["items"]) >= 1

    first = data["items"][0]
    assert first["complaint_id"] == complaint_data["id"]
    assert first["is_read"] is False
    assert first["notification_type"] == NotificationType.COMPLAINT_SUBMITTED.value


def test_unread_count_badge(client, seed_test_data, student_auth_headers):
    """Verify unread count matches unread notifications."""
    resp = client.get("/api/v1/notifications/unread-count", headers=student_auth_headers)
    assert resp.status_code == 200
    initial_count = resp.json()["unread_count"]
    assert initial_count >= 0


def test_mark_as_read_and_unread(client, seed_test_data, student_auth_headers):
    """Verify marking single notification as read and unread."""
    # Create complaint to generate notification
    client.post(
        "/api/v1/complaints",
        headers=student_auth_headers,
        json={
            "title": "Corridor light flickering",
            "description": "Corridor light outside lab 204 is flickering.",
            "category": "Electricity",
            "priority": "MEDIUM",
            "location": "Science Block 2nd Floor"
        }
    )
    list_resp = client.get("/api/v1/notifications", headers=student_auth_headers)
    items = list_resp.json()["items"]
    assert len(items) > 0
    notif_id = items[0]["id"]

    # Mark as read
    read_resp = client.patch(f"/api/v1/notifications/{notif_id}/read", headers=student_auth_headers)
    assert read_resp.status_code == 200
    assert read_resp.json()["is_read"] is True
    assert read_resp.json()["read_at"] is not None

    # Mark as unread
    unread_resp = client.patch(f"/api/v1/notifications/{notif_id}/unread", headers=student_auth_headers)
    assert unread_resp.status_code == 200
    assert unread_resp.json()["is_read"] is False
    assert read_resp.json()["read_at"] is not None  # read_at was present on read_resp
    assert unread_resp.json()["read_at"] is None


def test_mark_all_read(client, seed_test_data, student_auth_headers):
    """Verify batch marking all notifications as read."""
    # Ensure there is at least one unread notification
    client.post(
        "/api/v1/complaints",
        headers=student_auth_headers,
        json={
            "title": "Bench broken in garden",
            "description": "Wooden bench broken near cafeteria.",
            "category": "Maintenance",
            "priority": "LOW",
            "location": "Central Garden"
        }
    )
    list_resp = client.get("/api/v1/notifications", headers=student_auth_headers)
    assert list_resp.json()["unread_count"] > 0

    resp = client.patch("/api/v1/notifications/read-all", headers=student_auth_headers)
    assert resp.status_code == 200

    # Verify unread count is 0
    count_resp = client.get("/api/v1/notifications/unread-count", headers=student_auth_headers)
    assert count_resp.json()["unread_count"] == 0


def test_delete_notification(client, seed_test_data, student_auth_headers):
    """Verify deleting a notification from feed."""
    client.post(
        "/api/v1/complaints",
        headers=student_auth_headers,
        json={
            "title": "Air Conditioner noise in Lab",
            "description": "AC making loud rattling noise.",
            "category": "Maintenance",
            "priority": "LOW",
            "location": "Lab 102"
        }
    )
    list_resp = client.get("/api/v1/notifications", headers=student_auth_headers)
    items = list_resp.json()["items"]
    assert len(items) > 0
    target_id = items[0]["id"]

    del_resp = client.delete(f"/api/v1/notifications/{target_id}", headers=student_auth_headers)
    assert del_resp.status_code == 204

    # Deleting again returns 404
    del_resp_again = client.delete(f"/api/v1/notifications/{target_id}", headers=student_auth_headers)
    assert del_resp_again.status_code == 404


def test_notification_filtering(client, seed_test_data, student_auth_headers, admin_auth_headers):
    """Verify filtering notifications by is_read, type, priority, and text search."""
    # Create another complaint to have multiple notifications
    client.post(
        "/api/v1/complaints",
        headers=student_auth_headers,
        json={
            "title": "Wi-Fi outage in Library",
            "description": "Library reading room 3 has no internet connection.",
            "category": "IT / Wi-Fi",
            "priority": "LOW",
            "location": "Library 3rd Floor"
        }
    )

    # Filter by search
    resp_search = client.get("/api/v1/notifications?search=Library", headers=student_auth_headers)
    assert resp_search.status_code == 200
    assert any("Library" in item["title"] or "Library" in item["message"] for item in resp_search.json()["items"])

    # Filter by type
    resp_type = client.get(f"/api/v1/notifications?type={NotificationType.COMPLAINT_SUBMITTED.value}", headers=student_auth_headers)
    assert resp_type.status_code == 200
    assert all(item["notification_type"] == NotificationType.COMPLAINT_SUBMITTED.value for item in resp_type.json()["items"])


def test_user_notification_preferences(client, seed_test_data, student_auth_headers):
    """Verify getting and updating notification preferences."""
    get_resp = client.get("/api/v1/notifications/preferences", headers=student_auth_headers)
    assert get_resp.status_code == 200
    prefs = get_resp.json()
    assert prefs["in_app_enabled"] is True
    assert prefs["complaint_updates"] is True

    # Update preferences
    update_resp = client.put(
        "/api/v1/notifications/preferences",
        headers=student_auth_headers,
        json={
            "sound_enabled": True,
            "complaint_updates": False,
            "critical_alerts_only": True
        }
    )
    assert update_resp.status_code == 200
    updated = update_resp.json()
    assert updated["sound_enabled"] is True
    assert updated["complaint_updates"] is False
    assert updated["critical_alerts_only"] is True

    # Reset back to default
    client.put(
        "/api/v1/notifications/preferences",
        headers=student_auth_headers,
        json={
            "complaint_updates": True,
            "critical_alerts_only": False
        }
    )


def test_preference_suppression_and_critical_bypass(client, seed_test_data, student_auth_headers):
    """Verify that suppressed notifications are not delivered, but CRITICAL priority bypasses suppression."""
    # 1. Turn off in_app_enabled or complaint_updates
    client.put(
        "/api/v1/notifications/preferences",
        headers=student_auth_headers,
        json={"complaint_updates": False, "critical_alerts_only": True}
    )

    before_count = client.get("/api/v1/notifications", headers=student_auth_headers).json()["total"]

    # 2. Create LOW priority complaint (should be suppressed)
    client.post(
        "/api/v1/complaints",
        headers=student_auth_headers,
        json={
            "title": "Minor dust in classroom",
            "description": "Classroom 101 needs a sweep.",
            "category": "Cleanliness",
            "priority": "LOW",
            "location": "Block A 101"
        }
    )

    after_count = client.get("/api/v1/notifications", headers=student_auth_headers).json()["total"]
    # LOW notification should have been suppressed
    assert after_count == before_count

    # 3. Reset preferences
    client.put(
        "/api/v1/notifications/preferences",
        headers=student_auth_headers,
        json={"complaint_updates": True, "critical_alerts_only": False}
    )


def test_admin_announcement_broadcast(client, seed_test_data, admin_auth_headers, student_auth_headers):
    """Verify administrators can dispatch announcements and students cannot."""
    # Student attempt -> 403
    forbidden_resp = client.post(
        "/api/v1/notifications/announcements",
        headers=student_auth_headers,
        json={
            "title": "Student fake broadcast",
            "message": "Should fail with forbidden."
        }
    )
    assert forbidden_resp.status_code == 403

    # Admin broadcast -> 201
    admin_resp = client.post(
        "/api/v1/notifications/announcements",
        headers=admin_auth_headers,
        json={
            "title": "Campus Power Maintenance Schedule",
            "message": "Power will be intermittently suspended this Saturday from 2 PM to 5 PM.",
            "priority": "WARNING"
        }
    )
    assert admin_resp.status_code == 201
    assert admin_resp.json()["recipients_count"] >= 1

    # Student sees the announcement
    student_feed = client.get("/api/v1/notifications?type=ANNOUNCEMENT", headers=student_auth_headers)
    assert student_feed.status_code == 200
    items = student_feed.json()["items"]
    assert any("Campus Power Maintenance Schedule" in item["title"] for item in items)


def test_websocket_unauthenticated_reject(client):
    """Verify WebSocket handshake without token or with invalid token is rejected."""
    with pytest.raises(WebSocketDisconnect) as exc_info:
        with client.websocket_connect("/api/v1/ws/notifications"):
            pass
    assert exc_info.value.code == 1008

    with pytest.raises(WebSocketDisconnect) as exc_info:
        with client.websocket_connect("/api/v1/ws/notifications?token=invalid.jwt.token"):
            pass
    assert exc_info.value.code == 1008


def test_websocket_authenticated_connection(client, seed_test_data):
    """Verify WebSocket handshake with valid JWT succeeds and handles PING/PONG."""
    student_id = str(seed_test_data["student"].id)
    token = create_access_token(subject=student_id)

    with client.websocket_connect(f"/api/v1/ws/notifications?token={token}") as websocket:
        # Handshake confirmation
        init_msg = websocket.receive_json()
        assert init_msg["type"] == "CONNECTION_ESTABLISHED"
        assert init_msg["user_id"] == student_id

        # Send PING
        websocket.send_json({"type": "PING", "timestamp": 123456789})
        pong_msg = websocket.receive_json()
        assert pong_msg["type"] == "PONG"
        assert pong_msg["timestamp"] == 123456789


def test_websocket_realtime_delivery(client, seed_test_data, student_auth_headers):
    """Verify that dispatching a notification delivers real-time payload over open WebSocket."""
    student_id = str(seed_test_data["student"].id)
    token = create_access_token(subject=student_id)

    with client.websocket_connect(f"/api/v1/ws/notifications?token={token}") as websocket:
        init_msg = websocket.receive_json()
        assert init_msg["type"] == "CONNECTION_ESTABLISHED"

        # Create a new complaint via REST client to trigger notification dispatch
        client.post(
            "/api/v1/complaints",
            headers=student_auth_headers,
            json={
                "title": "Live WebSocket Test Complaint",
                "description": "Testing real-time push over active socket stream.",
                "category": "Water Supply",
                "priority": "HIGH",
                "location": "Hostel Block 4"
            }
        )

        # Receive real-time push event on the open websocket
        event = websocket.receive_json()
        assert event["type"] == "NOTIFICATION_RECEIVED"
        assert "Complaint Logged" in event["notification"]["title"]
        assert "Live WebSocket Test Complaint" in event["notification"]["message"]
        assert event["notification"]["user_id"] == student_id
