/**
 * Smart Campus Real-Time Notification WebSocket Client
 * 
 * Manages authenticated WebSocket connection to FastAPI backend,
 * automatic reconnect with exponential backoff, keepalive heartbeats,
 * and pub-sub listener dispatching.
 */

class NotificationSocket {
  constructor() {
    this.ws = null;
    this.token = null;
    this.listeners = new Set();
    this.statusListeners = new Set();
    this.reconnectAttempts = 0;
    this.maxReconnectDelay = 15000;
    this.reconnectTimeout = null;
    this.pingInterval = null;
    this.isConnected = false;
  }

  /**
   * Constructs target WebSocket URL based on configured API base.
   */
  getSocketUrl(token) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const wsBase = apiUrl.replace(/^http/, 'ws');
    return `${wsBase}/ws/notifications?token=${encodeURIComponent(token)}`;
  }

  /**
   * Connects to WebSocket server using active JWT.
   */
  connect(token) {
    if (!token) {
      this.disconnect();
      return;
    }

    if (this.token === token && this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.token = token;
    this.closeExistingSocket();
    this.initiateConnection();
  }

  initiateConnection() {
    if (!this.token) return;

    try {
      const url = this.getSocketUrl(this.token);
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.notifyStatusChange(true);
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyListeners(data);
        } catch (err) {
          console.warn('[NotificationSocket] Failed to parse frame:', err);
        }
      };

      this.ws.onerror = (error) => {
        console.warn('[NotificationSocket] Socket connection error:', error);
      };

      this.ws.onclose = (event) => {
        this.isConnected = false;
        this.stopHeartbeat();
        this.notifyStatusChange(false);

        // Code 1008 = Policy Violation (invalid/expired JWT) -> Do not reconnect in loop
        if (event.code === 1008 || event.code === 4001) {
          console.warn('[NotificationSocket] Authentication rejected. Halting reconnect.');
          this.token = null;
          return;
        }

        this.scheduleReconnect();
      };
    } catch (err) {
      console.error('[NotificationSocket] Failed to create WebSocket:', err);
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (!this.token) return;
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
    this.reconnectAttempts++;

    this.reconnectTimeout = setTimeout(() => {
      this.initiateConnection();
    }, delay);
  }

  startHeartbeat() {
    this.stopHeartbeat();
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'PING', timestamp: Date.now() }));
      }
    }, 25000);
  }

  stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  closeExistingSocket() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    this.stopHeartbeat();

    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      try {
        this.ws.close();
      } catch (_) {}
      this.ws = null;
    }
    this.isConnected = false;
  }

  disconnect() {
    this.token = null;
    this.closeExistingSocket();
    this.notifyStatusChange(false);
  }

  /**
   * Subscribes a listener callback to incoming WebSocket messages.
   * Returns unsubscribe function.
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Subscribes a callback to connection status updates (boolean).
   */
  onStatusChange(callback) {
    this.statusListeners.add(callback);
    callback(this.isConnected);
    return () => this.statusListeners.delete(callback);
  }

  notifyListeners(data) {
    for (const listener of this.listeners) {
      try {
        listener(data);
      } catch (err) {
        console.error('[NotificationSocket] Error in listener callback:', err);
      }
    }
  }

  notifyStatusChange(status) {
    for (const listener of this.statusListeners) {
      try {
        listener(status);
      } catch (err) {
        console.error('[NotificationSocket] Error in status callback:', err);
      }
    }
  }
}

export const notificationSocket = new NotificationSocket();
export default notificationSocket;
