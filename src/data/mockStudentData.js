export const STUDENT_PROFILE_STORAGE_KEY = 'smart_campus_student_profile_v3';

export const defaultStudentProfile = {
  // Identity
  name: 'Ayush Kumar Jha',
  firstName: 'Ayush',
  lastName: 'Jha',
  role: 'Undergraduate Student',
  studentId: 'SC-STU-2026-001',
  email: 'ayush.jha@university.edu',
  phone: '+91 98765 43210',
  dob: '15/08/2003',
  gender: 'Male',
  avatarInitials: 'AJ',

  // Academic Information
  department: 'Computer Science & Engineering',
  branch: 'Computer Science & Engineering',
  program: 'B.Tech',
  degree: 'Bachelor of Technology (B.Tech)',
  year: '4th Year',
  semester: '7th Semester',
  enrollmentStatus: 'Active',
  campus: 'CGC University Mohali',
  academicYear: '2026–27',

  // Contact Information
  emailVerified: true,
  phoneVerified: true,
  campusAddress: 'CGC University Mohali',
  hostel: 'Hostel Block B',
  room: 'B-204',

  // Emergency Contact
  emergencyName: 'Raj Kumar Jha',
  emergencyRelation: 'Father',
  emergencyPhone: '+91 98765 43211',

  // Profile Completion
  completionPercentage: 85,
  missingInfoTitle: 'Emergency Contact',

  // Account Security
  lastPasswordChange: 'Last changed 30 days ago',
  twoFactorEnabled: true,
  activeSessions: [
    {
      id: 1,
      device: 'Chrome on Windows 11',
      location: 'Academic Block 3 Wi-Fi',
      ip: '10.24.18.92',
      current: true,
      lastActive: 'Active Now',
    },
    {
      id: 2,
      device: 'Safari on iPhone 15 Pro',
      location: 'Hostel Block B 5GHz AP',
      ip: '10.24.45.118',
      current: false,
      lastActive: '2 hours ago',
    },
  ],

  // Preferences
  preferences: {
    language: 'English',
    complaintStatusUpdates: true,
    emailNotifications: false,
    pushNotifications: false,
    departmentAlerts: true,
    criticalAlerts: true,
  },

  // Privacy Settings
  privacy: {
    profileVisibility: 'Only Me',
    complaintActivity: 'Private',
    notificationHistory: 'Enabled',
  },
};

export const studentProfile = defaultStudentProfile;

export function loadStudentProfile() {
  try {
    const saved = localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY);
    if (saved) {
      return { ...defaultStudentProfile, ...JSON.parse(saved) };
    }
  } catch {
    // Ignore localStorage read error
  }
  return defaultStudentProfile;
}

export function saveStudentProfile(profile) {
  try {
    localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore localStorage write error
  }
}
