import React, { useState, useEffect, useCallback } from 'react';
import { AppContext } from './AppContextInstance';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredComplaints,
  setStoredComplaints,
  getStoredNotifications,
  setStoredNotifications
} from '../utils/storage';

export function AppProvider({ children }) {
  // Theme State
  const [theme, setTheme] = useState(() => getStoredTheme());

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Shared Complaints State
  const [complaints, setComplaintsState] = useState(() => getStoredComplaints());

  const setComplaints = useCallback((updater) => {
    setComplaintsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setStoredComplaints(next);
      return next;
    });
  }, []);

  // Shared Notifications State
  const [notifications, setNotificationsState] = useState(() => getStoredNotifications());

  const setNotifications = useCallback((updater) => {
    setNotificationsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setStoredNotifications(next);
      return next;
    });
  }, []);

  const unreadNotificationCount = notifications.filter((n) => n.unread).length;

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, [setNotifications]);

  const addNotification = useCallback((notif) => {
    const newEntry = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      unread: true,
      ...notif
    };
    setNotifications((prev) => [newEntry, ...prev]);
  }, [setNotifications]);

  // Global Toast System
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  // Command Palette (Ctrl + K) Search Dialog State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cross-Role Workflow Actions
  const addComplaint = useCallback((newRecord) => {
    setComplaints((prev) => [newRecord, ...prev]);
    addNotification({
      title: `Complaint ${newRecord.id} Submitted`,
      desc: `${newRecord.title} (${newRecord.category}) logged for triage.`,
      complaintId: newRecord.id,
      role: 'all',
      type: 'status'
    });
    showToast(`Complaint ${newRecord.id} submitted successfully.`);
  }, [setComplaints, addNotification, showToast]);

  const updateComplaintStatus = useCallback((id, newStatus, reason = '') => {
    setComplaints((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const timeline = item.timeline ? [...item.timeline] : [];
          timeline.push({
            status: newStatus,
            time: `Today, ${nowTime}`,
            note: reason || `Status transitioned to ${newStatus} by administration.`,
            completed: true
          });
          return {
            ...item,
            status: newStatus,
            timeline,
            lastUpdated: 'Just now'
          };
        }
        return item;
      })
    );

    addNotification({
      title: `Complaint ${id} Updated`,
      desc: `Status moved to "${newStatus}" by administrative staff.`,
      complaintId: id,
      role: 'all',
      type: 'status'
    });
    showToast(`Status of ${id} updated to ${newStatus}.`);
  }, [setComplaints, addNotification, showToast]);

  const resolveComplaint = useCallback((id, resolutionNote = '') => {
    setComplaints((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const timeline = item.timeline ? [...item.timeline] : [];
          timeline.push({
            status: 'Resolved',
            time: `Today, ${nowTime}`,
            note: resolutionNote || 'Complaint verified and resolved by department.',
            completed: true
          });
          return {
            ...item,
            status: 'Resolved',
            resolutionNote: resolutionNote || 'Field resolution completed and verified.',
            timeline,
            lastUpdated: 'Just now'
          };
        }
        return item;
      })
    );

    addNotification({
      title: `Complaint ${id} Resolved`,
      desc: resolutionNote || 'Resolution verified by operational unit.',
      complaintId: id,
      role: 'all',
      type: 'resolved'
    });
    showToast(`Complaint ${id} has been marked as Resolved!`);
  }, [setComplaints, addNotification, showToast]);

  const value = {
    theme,
    toggleTheme,
    complaints,
    setComplaints,
    addComplaint,
    updateComplaintStatus,
    resolveComplaint,
    notifications,
    unreadNotificationCount,
    markAllNotificationsRead,
    addNotification,
    toasts,
    showToast,
    removeToast,
    isSearchOpen,
    openSearch,
    closeSearch
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
