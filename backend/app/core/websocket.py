import asyncio
import logging
from collections import defaultdict
from typing import Dict, Optional, Set
from fastapi import WebSocket

logger = logging.getLogger("smartcampus.websocket")


class ConnectionManager:
    """
    In-memory WebSocket manager supporting multi-tab connections per authenticated user,
    heartbeats, safe disconnections, and real-time JSON alert dispatches.
    """
    def __init__(self):
        # Key: user_id string, Value: set of open WebSocket connections
        self.active_connections: Dict[str, Set[WebSocket]] = defaultdict(set)
        self.loop: Optional[asyncio.AbstractEventLoop] = None

    def set_loop(self, loop: asyncio.AbstractEventLoop) -> None:
        """Stores reference to the main event loop."""
        self.loop = loop

    async def connect(self, user_id: str, websocket: WebSocket) -> None:
        """Accepts the WebSocket connection and registers under user ID."""
        try:
            self.loop = asyncio.get_running_loop()
        except RuntimeError:
            pass

        await websocket.accept()
        self.active_connections[str(user_id)].add(websocket)
        logger.info(
            "WebSocket connected for user %s. Active tabs: %d",
            user_id,
            len(self.active_connections[str(user_id)])
        )

    def disconnect(self, user_id: str, websocket: WebSocket) -> None:
        """Safely removes a disconnected socket from user's active set."""
        key = str(user_id)
        if key in self.active_connections:
            self.active_connections[key].discard(websocket)
            if not self.active_connections[key]:
                del self.active_connections[key]
        logger.info("WebSocket disconnected for user %s.", user_id)

    async def send_personal_notification(self, user_id: str, payload: dict) -> None:
        """Transmits JSON notification payload to all active client tabs for a user."""
        key = str(user_id)
        if key not in self.active_connections:
            return

        dead_sockets = set()
        for ws in list(self.active_connections[key]):
            try:
                await ws.send_json(payload)
            except Exception as exc:
                logger.warning("Failed to send WebSocket payload to user %s: %s", key, exc)
                dead_sockets.add(ws)

        for dead in dead_sockets:
            self.disconnect(key, dead)

    async def broadcast(self, payload: dict) -> None:
        """Transmits JSON notification payload to every currently connected user socket."""
        for user_key in list(self.active_connections.keys()):
            await self.send_personal_notification(user_key, payload)

    def is_user_connected(self, user_id: str) -> bool:
        """Checks if a given user currently has at least one active WebSocket connection."""
        return str(user_id) in self.active_connections and len(self.active_connections[str(user_id)]) > 0


manager = ConnectionManager()


def dispatch_ws_notification(user_id: str, payload: dict) -> None:
    """
    Non-blocking helper to schedule WebSocket delivery from synchronous service methods.
    Dispatches safely across threads, worker pools, or the current event loop.
    """
    try:
        if manager.loop and manager.loop.is_running():
            asyncio.run_coroutine_threadsafe(
                manager.send_personal_notification(str(user_id), payload),
                manager.loop
            )
            return

        # Fallback to thread-local loop if available
        loop = asyncio.get_running_loop()
        loop.create_task(manager.send_personal_notification(str(user_id), payload))
    except RuntimeError:
        pass
    except Exception as exc:
        logger.warning("Could not dispatch WebSocket notification: %s", exc)


def dispatch_ws_broadcast(payload: dict) -> None:
    """Non-blocking helper to broadcast notification across all connected users."""
    try:
        if manager.loop and manager.loop.is_running():
            asyncio.run_coroutine_threadsafe(
                manager.broadcast(payload),
                manager.loop
            )
            return

        loop = asyncio.get_running_loop()
        loop.create_task(manager.broadcast(payload))
    except RuntimeError:
        pass
    except Exception as exc:
        logger.warning("Could not dispatch WebSocket broadcast: %s", exc)
