// Master mock data for Smart Campus Notifications

export const NOTIFICATIONS_STORAGE_KEY = 'smart_campus_notifications_v4';
export const NOTIF_PREFERENCES_KEY = 'smart_campus_notif_preferences_v2';

export const initialMockNotifications = [
  {
    id: 'NOTIF-1001',
    title: 'Critical Complaint Alert',
    description: 'A critical campus issue has been reported and forwarded to the Security Department.',
    category: 'Complaint Updates',
    priority: 'Critical',
    read: false,
    timestamp: '3 minutes ago',
    complaintId: 'SC-2026-1801',
    type: 'critical_alert',
    department: 'Campus Safety & Security',
    date: '20 Sep 2026',
  },
  {
    id: 'NOTIF-1002',
    title: 'Complaint Status Updated',
    description: 'Your complaint SC-2026-1839 is now under review.',
    category: 'Complaint Updates',
    priority: 'Normal',
    read: false,
    timestamp: '1 hour ago',
    complaintId: 'SC-2026-1839',
    type: 'complaint_status',
    department: 'Campus IT Operations',
    date: '20 Sep 2026',
  },
  {
    id: 'NOTIF-1003',
    title: 'Campus Maintenance Notice',
    description: 'Scheduled maintenance work will take place in Hostel Block B.',
    category: 'Announcements',
    priority: 'Normal',
    read: true,
    timestamp: 'Yesterday',
    complaintId: null,
    type: 'announcement',
    department: 'Campus Administration',
    date: '19 Sep 2026',
  },
  {
    id: 'NOTIF-1004',
    title: 'Complaint Resolved',
    description: 'Your complaint SC-2026-1828 has been successfully resolved.',
    category: 'Complaint Updates',
    priority: 'Normal',
    read: true,
    timestamp: 'Yesterday',
    complaintId: 'SC-2026-1828',
    type: 'complaint_resolved',
    department: 'HVAC Services Team',
    date: '19 Sep 2026',
  },
  {
    id: 'NOTIF-1005',
    title: 'System Update',
    description: 'Smart Campus has been updated with improved complaint tracking.',
    category: 'System',
    priority: 'Normal',
    read: true,
    timestamp: '2 days ago',
    complaintId: null,
    type: 'system',
    department: 'Campus Digital Systems',
    date: '18 Sep 2026',
  },
  {
    id: 'NOTIF-1006',
    title: 'Library Extended Hours',
    description: 'Central Library 1st & 2nd floor quiet study rooms will remain open 24/7 during mid-semester exams.',
    category: 'Announcements',
    priority: 'Normal',
    read: true,
    timestamp: '3 days ago',
    complaintId: null,
    type: 'announcement',
    department: 'University Library Committee',
    date: '17 Sep 2026',
  },
  {
    id: 'NOTIF-1007',
    title: 'Action Required',
    description: 'Additional information is required for complaint SC-2026-1847 to expedite technician dispatch.',
    category: 'Complaint Updates',
    priority: 'Important',
    read: false,
    timestamp: '4 days ago',
    complaintId: 'SC-2026-1847',
    type: 'action_required',
    department: 'Civil Glazing Section',
    date: '16 Sep 2026',
  },
  {
    id: 'NOTIF-1008',
    title: 'Security Firewall & Core Patch',
    description: 'Routine server maintenance and SSL security handshake protocols scheduled tonight at 02:00 AM.',
    category: 'System',
    priority: 'Important',
    read: false,
    timestamp: '5 days ago',
    complaintId: null,
    type: 'system',
    department: 'Campus Digital Systems',
    date: '15 Sep 2026',
  },
  {
    id: 'NOTIF-1009',
    title: 'Complaint Assigned',
    description: 'Complaint SC-2026-1815 has been assigned to the Maintenance Department supervisor.',
    category: 'Complaint Updates',
    priority: 'Normal',
    read: true,
    timestamp: '6 days ago',
    complaintId: 'SC-2026-1815',
    type: 'complaint_assigned',
    department: 'Maintenance Department',
    date: '14 Sep 2026',
  },
  {
    id: 'NOTIF-1010',
    title: 'Elevator Servicing Completed',
    description: 'Lift Cab #2 in Administrative Complex has been overhauled and recertified for full passenger service.',
    category: 'Complaint Updates',
    priority: 'Normal',
    read: true,
    timestamp: '1 week ago',
    complaintId: 'SC-2026-1751',
    type: 'complaint_resolved',
    department: 'Electrical Infrastructure',
    date: '13 Sep 2026',
  },
  {
    id: 'NOTIF-1011',
    title: 'Campus Transit Route Update',
    description: 'Additional electric shuttle buses deployed along Hostel-Library-Lab corridor during evening study hours.',
    category: 'Announcements',
    priority: 'Normal',
    read: true,
    timestamp: '1 week ago',
    complaintId: null,
    type: 'announcement',
    department: 'Campus Transport Services',
    date: '12 Sep 2026',
  },
  {
    id: 'NOTIF-1012',
    title: 'Wi-Fi Bandwidth Optimization',
    description: 'High-speed fiber network upgrades completed across Academic Block 3 seminar halls.',
    category: 'Department Updates',
    priority: 'Normal',
    read: true,
    timestamp: '2 weeks ago',
    complaintId: null,
    type: 'department',
    department: 'IT Network Infrastructure',
    date: '06 Sep 2026',
  },
];

// Helper to load notifications from localStorage or fallback
export function loadStoredNotifications() {
  try {
    const saved = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage read errors
  }
  return initialMockNotifications;
}

// Helper to persist notifications
export function saveStoredNotifications(notifications) {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  } catch {
    // Ignore localStorage write errors
  }
}

// Default notification preferences
export const defaultNotifPreferences = {
  emailNotifications: true,
  pushNotifications: false,
  complaintUpdates: true,
  criticalAlerts: true,
};

// Helper to load preferences
export function loadNotifPreferences() {
  try {
    const saved = localStorage.getItem(NOTIF_PREFERENCES_KEY);
    if (saved) {
      return { ...defaultNotifPreferences, ...JSON.parse(saved) };
    }
  } catch {
    // Ignore localStorage read errors
  }
  return defaultNotifPreferences;
}

// Helper to save preferences
export function saveNotifPreferences(preferences) {
  try {
    localStorage.setItem(NOTIF_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch {
    // Ignore localStorage write errors
  }
}
