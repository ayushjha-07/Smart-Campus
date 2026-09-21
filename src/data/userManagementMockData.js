/**
 * Smart Campus Complaint & Analytics System
 * User & Department Management Mock Data
 *
 * NOTE: Frontend mock dataset for demonstration and simulation purposes.
 */

export const USER_SUMMARY_STATS = [
  { id: 'total', title: 'Total Users', value: '1,248', subtitle: 'Registered platform accounts', color: '#315C3A' },
  { id: 'students', title: 'Students', value: '1,084', subtitle: 'Active student enrolments', color: '#3B82F6' },
  { id: 'staff', title: 'Department Staff', value: '148', subtitle: 'Operational resolution officers', color: '#D4A84F' },
  { id: 'admins', title: 'Administrators', value: '16', subtitle: 'Campus administrative council', color: '#8B5CF6' },
  { id: 'active', title: 'Active Users', value: '1,196', subtitle: '95.8% active status rate', color: '#10B981' }
];

export const DEPARTMENT_SUMMARY_STATS = [
  { id: 'total_depts', title: 'Total Departments', value: '10', subtitle: 'Campus service divisions', color: '#315C3A' },
  { id: 'active_depts', title: 'Active Departments', value: '9', subtitle: '1 scheduled under review', color: '#10B981' },
  { id: 'staff_members', title: 'Staff Members', value: '148', subtitle: 'Across all functional units', color: '#D4A84F' },
  { id: 'open_complaints', title: 'Open Complaints', value: '110', subtitle: 'Currently being handled', color: '#F97316' }
];

export const ROLES = ['Student', 'Department Staff', 'Administrator'];

export const DEPARTMENTS_LIST = [
  'Administration',
  'Maintenance',
  'Hostel',
  'IT Support',
  'Academics',
  'Security',
  'Transport',
  'Library',
  'Cafeteria',
  'Housekeeping'
];

export const STATUSES = ['Active', 'Pending Verification', 'Suspended', 'Inactive'];

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const ALL_COMPLAINT_CATEGORIES = [
  'Infrastructure',
  'Water Supply',
  'Electricity',
  'IT / Wi-Fi',
  'Cleanliness',
  'Academic',
  'Transport',
  'Security',
  'Hostel',
  'Library',
  'Food / Cafeteria',
  'Other'
];

export const INITIAL_USERS = [
  {
    id: 'USR-001',
    name: 'Ayush Kumar Jha',
    code: 'SC-STU-2026-001',
    role: 'Student',
    department: 'Computer Science & Engineering',
    email: 'ayush@example.edu',
    phone: '+91 98765 43210',
    status: 'Active',
    lastActive: '5 min ago',
    registeredAt: 'Aug 14, 2025',
    course: 'B.Tech',
    branch: 'Computer Science & Engineering',
    year: '3rd Year',
    designation: null,
    complaintStats: { total: 8, resolved: 6, pending: 2 },
    activity: [
      { id: 1, action: 'Logged in', time: '5 min ago' },
      { id: 2, action: 'Submitted complaint SC-2026-1848', time: 'Yesterday' },
      { id: 3, action: 'Updated student profile phone number', time: '3 days ago' },
      { id: 4, action: 'Resolved complaint confirmed', time: '1 week ago' }
    ]
  },
  {
    id: 'USR-002',
    name: 'Rahul Sharma',
    code: 'SC-STU-2026-014',
    role: 'Student',
    department: 'Computer Science & Engineering',
    email: 'rahul@example.edu',
    phone: '+91 98111 22334',
    status: 'Active',
    lastActive: '18 min ago',
    registeredAt: 'Jul 22, 2025',
    course: 'B.Tech',
    branch: 'Computer Science & Engineering',
    year: '2nd Year',
    designation: null,
    complaintStats: { total: 5, resolved: 4, pending: 1 },
    activity: [
      { id: 1, action: 'Logged in', time: '18 min ago' },
      { id: 2, action: 'Checked ticket status SC-2026-1840', time: '2 hrs ago' },
      { id: 3, action: 'Submitted complaint SC-2026-1840', time: 'Sep 17, 2026' }
    ]
  },
  {
    id: 'USR-003',
    name: 'Priya Singh',
    code: 'SC-STU-2026-021',
    role: 'Student',
    department: 'Electronics',
    email: 'priya@example.edu',
    phone: '+91 94555 66778',
    status: 'Active',
    lastActive: '32 min ago',
    registeredAt: 'Aug 02, 2025',
    course: 'B.Tech',
    branch: 'Electronics & Communication',
    year: '4th Year',
    designation: null,
    complaintStats: { total: 11, resolved: 9, pending: 2 },
    activity: [
      { id: 1, action: 'Logged in', time: '32 min ago' },
      { id: 2, action: 'Submitted feedback on SC-2026-1847', time: 'Yesterday' },
      { id: 3, action: 'Changed password', time: '2 weeks ago' }
    ]
  },
  {
    id: 'USR-004',
    name: 'Rohit Sharma',
    code: 'EMP-MNT-024',
    role: 'Department Staff',
    department: 'Maintenance',
    email: 'rohit@example.edu',
    phone: '+91 97788 11223',
    status: 'Active',
    lastActive: '10 min ago',
    registeredAt: 'Jan 10, 2024',
    course: null,
    branch: null,
    year: null,
    designation: 'Senior Maintenance Technician',
    complaintStats: { total: 42, resolved: 22, pending: 8 },
    activity: [
      { id: 1, action: 'Logged in', time: '10 min ago' },
      { id: 2, action: 'Resolved complaint SC-2026-1845', time: '1 hr ago' },
      { id: 3, action: 'Posted timeline update on SC-2026-1848', time: '3 hrs ago' },
      { id: 4, action: 'Assigned inspection team to Hostel Block B', time: 'Yesterday' }
    ]
  },
  {
    id: 'USR-005',
    name: 'Neha Gupta',
    code: 'EMP-IT-018',
    role: 'Department Staff',
    department: 'IT Support',
    email: 'neha@example.edu',
    phone: '+91 91234 56789',
    status: 'Active',
    lastActive: '1 hr ago',
    registeredAt: 'Mar 15, 2024',
    course: null,
    branch: null,
    year: null,
    designation: 'Network Operations Specialist',
    complaintStats: { total: 29, resolved: 21, pending: 4 },
    activity: [
      { id: 1, action: 'Logged in', time: '1 hr ago' },
      { id: 2, action: 'Resolved Wi-Fi router AP reset ticket', time: 'Yesterday' },
      { id: 3, action: 'Added internal note on SC-2026-1839', time: '2 days ago' }
    ]
  },
  {
    id: 'USR-006',
    name: 'Arjun Mehta',
    code: 'EMP-HST-031',
    role: 'Department Staff',
    department: 'Hostel',
    email: 'arjun@example.edu',
    phone: '+91 93456 78901',
    status: 'Pending Verification',
    lastActive: '2 hrs ago',
    registeredAt: 'Sep 18, 2026',
    course: null,
    branch: null,
    year: null,
    designation: 'Assistant Warden (Block B)',
    complaintStats: { total: 6, resolved: 2, pending: 4 },
    activity: [
      { id: 1, action: 'Account created and documents uploaded', time: '2 hrs ago' },
      { id: 2, action: 'Awaiting Administrator ID confirmation', time: '2 hrs ago' }
    ]
  },
  {
    id: 'USR-007',
    name: 'Karan Verma',
    code: 'EMP-SEC-011',
    role: 'Department Staff',
    department: 'Security',
    email: 'karan@example.edu',
    phone: '+91 98222 33445',
    status: 'Active',
    lastActive: 'Yesterday',
    registeredAt: 'Nov 05, 2023',
    course: null,
    branch: null,
    year: null,
    designation: 'Security Supervisor (North Campus)',
    complaintStats: { total: 18, resolved: 14, pending: 3 },
    activity: [
      { id: 1, action: 'Patrol log verified at Main Gate', time: 'Yesterday' },
      { id: 2, action: 'Closed security perimeter inspection ticket', time: '2 days ago' }
    ]
  },
  {
    id: 'USR-008',
    name: 'Campus Administrator',
    code: 'ADM-001',
    role: 'Administrator',
    department: 'Administration',
    email: 'admin@smartcampus.edu',
    phone: '+91 99000 11223',
    status: 'Active',
    lastActive: 'Just now',
    registeredAt: 'Jan 01, 2023',
    course: null,
    branch: null,
    year: null,
    designation: 'Chief Administrative Officer',
    complaintStats: { total: 248, resolved: 139, pending: 42 },
    activity: [
      { id: 1, action: 'Viewed Analytics & Insights Dashboard', time: 'Just now' },
      { id: 2, action: 'Generated Monthly Campus Audit Report', time: '2 hrs ago' },
      { id: 3, action: 'Assigned Department Staff permissions', time: 'Yesterday' }
    ]
  },
  {
    id: 'USR-009',
    name: 'Simran Kaur',
    code: 'SC-STU-2026-035',
    role: 'Student',
    department: 'Mechanical',
    email: 'simran@example.edu',
    phone: '+91 98333 44556',
    status: 'Active',
    lastActive: '3 hrs ago',
    registeredAt: 'Aug 19, 2025',
    course: 'B.Tech',
    branch: 'Mechanical Engineering',
    year: '1st Year',
    designation: null,
    complaintStats: { total: 3, resolved: 2, pending: 1 },
    activity: [
      { id: 1, action: 'Submitted workshop tooling complaint', time: '3 hrs ago' }
    ]
  },
  {
    id: 'USR-010',
    name: 'Vikram Malhotra',
    code: 'EMP-HSE-009',
    role: 'Department Staff',
    department: 'Housekeeping',
    email: 'vikram@example.edu',
    phone: '+91 91444 55667',
    status: 'Active',
    lastActive: '4 hrs ago',
    registeredAt: 'Feb 12, 2024',
    course: null,
    branch: null,
    year: null,
    designation: 'Sanitation Lead',
    complaintStats: { total: 27, resolved: 20, pending: 4 },
    activity: [
      { id: 1, action: 'Marked Cafeteria hygiene ticket resolved', time: '4 hrs ago' }
    ]
  },
  {
    id: 'USR-011',
    name: 'Anjali Nair',
    code: 'SC-STU-2026-042',
    role: 'Student',
    department: 'Civil',
    email: 'anjali@example.edu',
    phone: '+91 92555 66778',
    status: 'Suspended',
    lastActive: '2 days ago',
    registeredAt: 'Sep 01, 2025',
    course: 'B.Tech',
    branch: 'Civil Engineering',
    year: '3rd Year',
    designation: null,
    complaintStats: { total: 7, resolved: 3, pending: 2 },
    activity: [
      { id: 1, action: 'Account suspended pending administrative review', time: '2 days ago' }
    ]
  },
  {
    id: 'USR-012',
    name: 'Rajesh Patel',
    code: 'EMP-TRN-005',
    role: 'Department Staff',
    department: 'Transport',
    email: 'rajesh@example.edu',
    phone: '+91 93666 77889',
    status: 'Active',
    lastActive: '5 hrs ago',
    registeredAt: 'Jun 20, 2023',
    course: null,
    branch: null,
    year: null,
    designation: 'Fleet Coordinator',
    complaintStats: { total: 19, resolved: 11, pending: 4 },
    activity: [
      { id: 1, action: 'Updated Route 4 bus schedule in response to student feedback', time: '5 hrs ago' }
    ]
  },
  {
    id: 'USR-013',
    name: 'Devika Sen',
    code: 'SC-STU-2026-058',
    role: 'Student',
    department: 'Biotechnology',
    email: 'devika@example.edu',
    phone: '+91 94777 88990',
    status: 'Inactive',
    lastActive: '1 week ago',
    registeredAt: 'Aug 10, 2024',
    course: 'B.Tech',
    branch: 'Biotechnology',
    year: '4th Year',
    designation: null,
    complaintStats: { total: 2, resolved: 2, pending: 0 },
    activity: [
      { id: 1, action: 'Graduation clearance initiated', time: '1 week ago' }
    ]
  },
  {
    id: 'USR-014',
    name: 'Sunil Joshi',
    code: 'EMP-LIB-014',
    role: 'Department Staff',
    department: 'Library',
    email: 'sunil@example.edu',
    phone: '+91 95888 99001',
    status: 'Active',
    lastActive: '6 hrs ago',
    registeredAt: 'Sep 12, 2023',
    course: null,
    branch: null,
    year: null,
    designation: 'Senior Librarian',
    complaintStats: { total: 15, resolved: 11, pending: 3 },
    activity: [
      { id: 1, action: 'Catalogued quiet zone HVAC issue', time: '6 hrs ago' }
    ]
  },
  {
    id: 'USR-015',
    name: 'Meera Rao',
    code: 'SC-STU-2026-067',
    role: 'Student',
    department: 'Computer Science & Engineering',
    email: 'meera@example.edu',
    phone: '+91 96999 00112',
    status: 'Active',
    lastActive: '12 min ago',
    registeredAt: 'Aug 25, 2025',
    course: 'B.Tech',
    branch: 'Computer Science & Engineering',
    year: '1st Year',
    designation: null,
    complaintStats: { total: 4, resolved: 3, pending: 1 },
    activity: [
      { id: 1, action: 'Logged in from student hostel Wi-Fi', time: '12 min ago' }
    ]
  },
  {
    id: 'USR-016',
    name: 'Farhan Khan',
    code: 'EMP-CAF-003',
    role: 'Department Staff',
    department: 'Cafeteria',
    email: 'farhan@example.edu',
    phone: '+91 97000 11223',
    status: 'Active',
    lastActive: '1 day ago',
    registeredAt: 'Nov 18, 2024',
    course: null,
    branch: null,
    year: null,
    designation: 'Catering Operations Officer',
    complaintStats: { total: 16, resolved: 12, pending: 3 },
    activity: [
      { id: 1, action: 'Inspected South Quad dining hall water dispenser', time: '1 day ago' }
    ]
  }
];

export const INITIAL_DEPARTMENTS = [
  {
    id: 'DEPT-001',
    name: 'Maintenance',
    code: 'DEPT-001',
    description: 'Physical campus infrastructure, plumbing, carpentry, and building structural repairs.',
    head: 'Dr. Alok Verma',
    staffCount: 24,
    openComplaints: 18,
    resolvedThisMonth: 31,
    resolvedComplaints: 31,
    resolutionRate: 53,
    averageResolutionTime: '19.2 hrs',
    status: 'Active',
    categories: ['Infrastructure', 'Water Supply', 'Cleanliness', 'Maintenance'],
    staff: [
      { name: 'Rohit Sharma', id: 'EMP-MNT-024', role: 'Senior Technician', status: 'Active' },
      { name: 'Manish Tiwari', id: 'EMP-MNT-012', role: 'Plumbing Specialist', status: 'Active' },
      { name: 'Sanjay Rawat', id: 'EMP-MNT-008', role: 'Carpentry Lead', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-002',
    name: 'IT Support',
    code: 'DEPT-002',
    description: 'Campus network infrastructure, student portal accounts, classroom AV, and server administration.',
    head: 'Prof. Sunita Rao',
    staffCount: 18,
    openComplaints: 12,
    resolvedThisMonth: 25,
    resolvedComplaints: 25,
    resolutionRate: 61,
    averageResolutionTime: '16.4 hrs',
    status: 'Active',
    categories: ['IT / Wi-Fi', 'Electricity'],
    staff: [
      { name: 'Neha Gupta', id: 'EMP-IT-018', role: 'Network Specialist', status: 'Active' },
      { name: 'Kunal Sen', id: 'EMP-IT-022', role: 'Systems Admin', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-003',
    name: 'Hostel',
    code: 'DEPT-003',
    description: 'Hostel residential blocks accommodation, room fixtures, warden oversight, and mess facilities.',
    head: 'Col. R. K. Nair',
    staffCount: 21,
    openComplaints: 16,
    resolvedThisMonth: 22,
    resolvedComplaints: 22,
    resolutionRate: 43,
    averageResolutionTime: '22.5 hrs',
    status: 'Active',
    categories: ['Hostel', 'Cleanliness', 'Water Supply'],
    staff: [
      { name: 'Arjun Mehta', id: 'EMP-HST-031', role: 'Assistant Warden', status: 'Pending Verification' },
      { name: 'Geeta Kumari', id: 'EMP-HST-019', role: 'Girls Hostel Warden', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-004',
    name: 'Academics',
    code: 'DEPT-004',
    description: 'Classroom scheduling, lecture hall equipment, academic grievance mediation, and examination facilities.',
    head: 'Dr. Meenakshi Sundaram',
    staffCount: 17,
    openComplaints: 11,
    resolvedThisMonth: 18,
    resolvedComplaints: 18,
    resolutionRate: 62,
    averageResolutionTime: '17.1 hrs',
    status: 'Active',
    categories: ['Academic'],
    staff: [
      { name: 'Ritu Kapoor', id: 'EMP-ACD-005', role: 'Academic Coordinator', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-005',
    name: 'Security',
    code: 'DEPT-005',
    description: 'Campus perimeter security, entry gates surveillance, emergency response, and ID access control.',
    head: 'Capt. Harish Chandra',
    staffCount: 15,
    openComplaints: 8,
    resolvedThisMonth: 16,
    resolvedComplaints: 16,
    resolutionRate: 67,
    averageResolutionTime: '13.6 hrs',
    status: 'Active',
    categories: ['Security'],
    staff: [
      { name: 'Karan Verma', id: 'EMP-SEC-011', role: 'Security Supervisor', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-006',
    name: 'Transport',
    code: 'DEPT-006',
    description: 'Campus shuttle fleet, student transit routes, schedule adherence, and vehicle maintenance.',
    head: 'Mr. Pradeep Mishra',
    staffCount: 12,
    openComplaints: 9,
    resolvedThisMonth: 11,
    resolvedComplaints: 11,
    resolutionRate: 52,
    averageResolutionTime: '20.2 hrs',
    status: 'Active',
    categories: ['Transport'],
    staff: [
      { name: 'Rajesh Patel', id: 'EMP-TRN-005', role: 'Fleet Coordinator', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-007',
    name: 'Library',
    code: 'DEPT-007',
    description: 'Central library reading halls, book reservations, digital databases, and quiet study zones.',
    head: 'Dr. Pratibha Das',
    staffCount: 10,
    openComplaints: 6,
    resolvedThisMonth: 14,
    resolvedComplaints: 14,
    resolutionRate: 61,
    averageResolutionTime: '15.9 hrs',
    status: 'Active',
    categories: ['Library', 'IT / Wi-Fi'],
    staff: [
      { name: 'Sunil Joshi', id: 'EMP-LIB-014', role: 'Senior Librarian', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-008',
    name: 'Cafeteria',
    code: 'DEPT-008',
    description: 'Campus food court, dining hygiene inspection, water dispenser sanitation, and menu standards.',
    head: 'Mr. Arvind Saxena',
    staffCount: 14,
    openComplaints: 10,
    resolvedThisMonth: 17,
    resolvedComplaints: 17,
    resolutionRate: 58,
    averageResolutionTime: '18.0 hrs',
    status: 'Active',
    categories: ['Food / Cafeteria', 'Cleanliness'],
    staff: [
      { name: 'Farhan Khan', id: 'EMP-CAF-003', role: 'Catering Officer', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-009',
    name: 'Housekeeping',
    code: 'DEPT-009',
    description: 'Campus cleanliness, waste disposal, washroom hygiene, and communal area sanitation.',
    head: 'Mrs. Shobha Devi',
    staffCount: 17,
    openComplaints: 13,
    resolvedThisMonth: 23,
    resolvedComplaints: 23,
    resolutionRate: 64,
    averageResolutionTime: '14.8 hrs',
    status: 'Active',
    categories: ['Cleanliness'],
    staff: [
      { name: 'Vikram Malhotra', id: 'EMP-HSE-009', role: 'Sanitation Lead', status: 'Active' }
    ]
  },
  {
    id: 'DEPT-010',
    name: 'Administration',
    code: 'DEPT-010',
    description: 'Central campus management, student affairs leadership, inter-departmental routing, and executive oversight.',
    head: 'Registrar Office',
    staffCount: 10,
    openComplaints: 7,
    resolvedThisMonth: 12,
    resolvedComplaints: 12,
    resolutionRate: 70,
    averageResolutionTime: '12.5 hrs',
    status: 'Active',
    categories: ['Other', 'Academic'],
    staff: [
      { name: 'Campus Administrator', id: 'ADM-001', role: 'Chief Admin Officer', status: 'Active' }
    ]
  }
];

export const DEPARTMENT_PERFORMANCE_TABLE = [
  { department: 'Maintenance', staff: 24, openComplaints: 18, resolved: 31, resolutionRate: 53, avgResolution: '19.2 hrs' },
  { department: 'IT Support', staff: 18, openComplaints: 12, resolved: 25, resolutionRate: 61, avgResolution: '16.4 hrs' },
  { department: 'Housekeeping', staff: 17, openComplaints: 13, resolved: 23, resolutionRate: 64, avgResolution: '14.8 hrs' },
  { department: 'Academics', staff: 17, openComplaints: 11, resolved: 18, resolutionRate: 62, avgResolution: '17.1 hrs' },
  { department: 'Security', staff: 15, openComplaints: 8, resolved: 16, resolutionRate: 67, avgResolution: '13.6 hrs' },
  { department: 'Transport', staff: 12, openComplaints: 9, resolved: 11, resolutionRate: 52, avgResolution: '20.2 hrs' },
  { department: 'Library', staff: 10, openComplaints: 6, resolved: 14, resolutionRate: 61, avgResolution: '15.9 hrs' },
  { department: 'Hostel', staff: 21, openComplaints: 16, resolved: 22, resolutionRate: 43, avgResolution: '22.5 hrs' },
  { department: 'Cafeteria', staff: 14, openComplaints: 10, resolved: 17, resolutionRate: 58, avgResolution: '18.0 hrs' },
  { department: 'Administration', staff: 10, openComplaints: 7, resolved: 12, resolutionRate: 70, avgResolution: '12.5 hrs' }
];

const STORAGE_USERS_KEY = 'smart_campus_users';
const STORAGE_DEPTS_KEY = 'smart_campus_departments';

export function loadUsersFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Fallback
  }
  return INITIAL_USERS;
}

export function saveUsersToStorage(users) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage issues
  }
}

export function loadDepartmentsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_DEPTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Fallback
  }
  return INITIAL_DEPARTMENTS;
}

export function saveDepartmentsToStorage(departments) {
  try {
    localStorage.setItem(STORAGE_DEPTS_KEY, JSON.stringify(departments));
  } catch {
    // Ignore storage issues
  }
}

export function exportUsersCSV(users = []) {
  const headers = ['User ID', 'Name', 'Role', 'Department', 'Email', 'Phone', 'Status', 'Last Active'];
  const rows = users.map(u => [
    `"${u.code || u.id}"`,
    `"${u.name}"`,
    `"${u.role}"`,
    `"${u.department || 'N/A'}"`,
    `"${u.email}"`,
    `"${u.phone || 'N/A'}"`,
    `"${u.status}"`,
    `"${u.lastActive}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `smart_campus_users_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
