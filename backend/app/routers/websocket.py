import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import decode_access_token
from app.core.websocket import manager
from app.models.user import User
from app.models.notification import Notification

logger = logging.getLogger("smartcampus.websocket")
router = APIRouter(tags=["WebSocket"])


@router.websocket("/ws/notifications")
async def websocket_notifications(
    websocket: WebSocket,
    token: str = Query(None),
    db: Session = Depends(get_db)
):
    """
    Authenticated WebSocket endpoint for real-time notification push.
    Handshake authenticates JWT via query parameter (?token=<JWT>).
    """
    if not token:
        logger.warning("WebSocket connection rejected: missing authentication token.")
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    # Authenticate token and verify user state
    try:

        payload = decode_access_token(token)
        user_id_str = payload.get("sub")
        if not user_id_str:
            logger.warning("WebSocket connection rejected: missing subject in JWT.")
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return

        user = db.query(User).filter(User.id == user_id_str).first()
        if not user or user.status.value != "ACTIVE":
            logger.warning("WebSocket connection rejected: user %s not found or inactive.", user_id_str)
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return

        unread_count = db.query(Notification).filter(
            Notification.user_id == user.id,
            Notification.is_read == False
        ).count()
        user_id = str(user.id)
    except Exception as exc:
        logger.warning("WebSocket authentication failed: %s", exc)
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    # Register connection in ConnectionManager
    await manager.connect(user_id, websocket)

    try:
        # Send handshake confirmation
        await websocket.send_json({
            "type": "CONNECTION_ESTABLISHED",
            "user_id": user_id,
            "unread_count": unread_count,
            "message": "Connected to Smart Campus real-time notification stream."
        })

        # Keepalive / message listening loop
        while True:
            data = await websocket.receive_json()
            if isinstance(data, dict):
                msg_type = data.get("type", "").upper()
                if msg_type == "PING":
                    await websocket.send_json({
                        "type": "PONG",
                        "timestamp": data.get("timestamp")
                    })
    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)
    except Exception as exc:
        logger.error("WebSocket connection error for user %s: %s", user_id, exc)
        manager.disconnect(user_id, websocket)
