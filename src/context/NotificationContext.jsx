import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useApp } from './useApp';
import notificationSocket from '../services/notificationSocket';
import notificationApi from '../services/notificationApi';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user, token } = useAuth();
  const { showToast } = useApp();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [preferences, setPreferences] = useState({
    in_app_enabled: true,
    email_enabled: false,
    push_enabled: false,
    sound_enabled: false,
    complaint_updates: true,
    department_alerts: true,
    system_announcements: true,
    critical_alerts_only: false,
  });

  // Play subtle sound if enabled
  const playNotificationSound = useCallback(() => {
    if (!preferences.sound_enabled) return;
    try {
      // Gentle web audio oscillator chime (safe without external audio assets)
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (_) {
      // Ignored if browser restricts autoplay before user gesture
    }
  }, [preferences.sound_enabled]);

  // Load initial notifications & count from API
  const refreshUnreadCount = useCallback(async () => {
    if (!token) return;
    try {
      const res = await notificationApi.getUnreadCount();
      if (res && typeof res.unread_count === 'number') {
        setUnreadCount(res.unread_count);
      }
    } catch (err) {
      console.warn('[NotificationContext] Failed to fetch unread count:', err);
    }
  }, [token]);

  const refreshRecentNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await notificationApi.getNotifications(1, 10);
      if (res && Array.isArray(res.items)) {
        setNotifications(res.items);
        if (typeof res.unread_count === 'number') {
          setUnreadCount(res.unread_count);
        }
      }
    } catch (err) {
      console.warn('[NotificationContext] Failed to fetch notifications:', err);
    }
  }, [token]);

  const loadPreferences = useCallback(async () => {
    if (!token) return;
    try {
      const prefs = await notificationApi.getPreferences();
      if (prefs) setPreferences(prefs);
    } catch (err) {
      console.warn('[NotificationContext] Failed to fetch preferences:', err);
    }
  }, [token]);

  // Manage WebSocket connection lifecycle
  useEffect(() => {
    if (!user || !token) {
      notificationSocket.disconnect();
      setNotifications([]);
      setUnreadCount(0);
      setIsConnected(false);
      return;
    }

    // Connect socket
    notificationSocket.connect(token);
    refreshRecentNotifications();
    loadPreferences();

    const unsubStatus = notificationSocket.onStatusChange((status) => {
      setIsConnected(status);
    });

    // Listen to real-time incoming notification frames
    const unsubMessages = notificationSocket.subscribe((msg) => {
      if (!msg || typeof msg !== 'object') return;

      if (msg.type === 'CONNECTION_ESTABLISHED') {
        if (typeof msg.unread_count === 'number') {
          setUnreadCount(msg.unread_count);
        }
      } else if (msg.type === 'NOTIFICATION_RECEIVED' && msg.notification) {
        const notif = msg.notification;

        // Prepend to notifications list
        setNotifications((prev) => {
          const exists = prev.some((n) => n.id === notif.id);
          if (exists) return prev;
          return [notif, ...prev];
        });

        // Increment unread count
        setUnreadCount((count) => count + 1);

        // Visual alert feedback
        playNotificationSound();

        const toastType =
          notif.priority === 'CRITICAL'
            ? 'error'
            : notif.priority === 'WARNING'
            ? 'warning'
            : 'info';

        showToast(`${notif.title}: ${notif.message}`, toastType);
      }
    });

    return () => {
      unsubStatus();
      unsubMessages();
    };
  }, [user, token, refreshRecentNotifications, loadPreferences, playNotificationSound, showToast]);

  // Actions
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationApi.markRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error('[NotificationContext] Failed to mark notification as read:', err);
    }
  }, []);

  const markAsUnread = useCallback(async (notificationId) => {
    try {
      await notificationApi.markUnread(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: false } : n))
      );
      setUnreadCount((c) => c + 1);
    } catch (err) {
      console.error('[NotificationContext] Failed to mark notification as unread:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationApi.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
      showToast('All notifications marked as read.', 'success');
    } catch (err) {
      console.error('[NotificationContext] Failed to mark all read:', err);
    }
  }, [showToast]);

  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationApi.deleteNotification(notificationId);
      setNotifications((prev) => {
        const target = prev.find((n) => n.id === notificationId);
        if (target && !target.is_read) {
          setUnreadCount((c) => Math.max(0, c - 1));
        }
        return prev.filter((n) => n.id !== notificationId);
      });
      showToast('Notification removed.', 'info');
    } catch (err) {
      console.error('[NotificationContext] Failed to delete notification:', err);
    }
  }, [showToast]);

  const updatePreferences = useCallback(async (newPrefs) => {
    try {
      const updated = await notificationApi.updatePreferences(newPrefs);
      setPreferences(updated);
      showToast('Notification preferences updated.', 'success');
      return updated;
    } catch (err) {
      console.error('[NotificationContext] Failed to update preferences:', err);
      showToast('Failed to update preferences.', 'error');
      throw err;
    }
  }, [showToast]);

  const value = {
    notifications,
    unreadCount,
    isConnected,
    preferences,
    refreshUnreadCount,
    refreshRecentNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    updatePreferences,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return ctx;
}
