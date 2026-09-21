/**
 * Smart Campus Complaint & Analytics System
 * Shared Cross-Role LocalStorage & State Management
 */

import { INITIAL_ADMIN_COMPLAINTS } from '../data/adminComplaintsData';

const THEME_KEY = 'smartCampusTheme';
const COMPLAINTS_KEY = 'smart_campus_shared_complaints';
const NOTIFICATIONS_KEY = 'smart_campus_shared_notifications';

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Complaint SC-2026-1848 In Progress',
    desc: 'Maintenance technician dispatched to Hostel Block B water supply.',
    time: '15 min ago',
    unread: true,
    role: 'all',
    type: 'status',
    complaintId: 'SC-2026-1848'
  },
  {
    id: 'notif-2',
    title: 'Complaint SC-2026-1845 Resolved',
    desc: 'Library AC chiller repair confirmed by facilities department.',
    time: '1 hr ago',
    unread: true,
    role: 'all',
    type: 'resolved',
    complaintId: 'SC-2026-1845'
  },
  {
    id: 'notif-3',
    title: 'Critical Alert: Lab Power Fluctuation',
    desc: 'Power outage in Computer Lab 2 assigned high priority triage.',
    time: '2 hrs ago',
    unread: true,
    role: 'admin',
    type: 'urgent',
    complaintId: 'SC-2026-1842'
  },
  {
    id: 'notif-4',
    title: 'Weekly Maintenance Summary Ready',
    desc: 'Campus performance benchmarks consolidated for administrative review.',
    time: '4 hrs ago',
    unread: false,
    role: 'admin',
    type: 'report'
  }
];

export function getStoredTheme() {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'light' || theme === 'dark') return theme;
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

export function getStoredComplaints() {
  try {
    const raw = localStorage.getItem(COMPLAINTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return INITIAL_ADMIN_COMPLAINTS;
}

export function setStoredComplaints(complaints) {
  try {
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
    // Also sync with legacy keys for backwards compatibility
    localStorage.setItem('smart_campus_admin_complaints', JSON.stringify(complaints));
    localStorage.setItem('smart_campus_user_complaints', JSON.stringify(complaints));
    localStorage.setItem('smart_campus_department_complaints', JSON.stringify(complaints));
  } catch {
    // ignore
  }
}

export function getStoredNotifications() {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return INITIAL_NOTIFICATIONS;
}

export function setStoredNotifications(notifs) {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
  } catch {
    // ignore
  }
}
