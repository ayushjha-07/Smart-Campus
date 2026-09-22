/**
 * Mock data for Smart Campus Admin Dashboard
 * Strictly adhering to CGC University Mohali metrics and administrative requirements.
 */

export const ADMIN_KPI_STATS = [
  {
    id: 'total',
    title: 'Total Complaints',
    value: '1,248',
    rawValue: 1248,
    change: '+12.5% this month',
    changeType: 'positive',
    iconName: 'FileText',
    color: '#008F63',
    bgColor: 'rgba(0, 143, 99, 0.1)',
  },
  {
    id: 'pending',
    title: 'Pending',
    value: '186',
    rawValue: 186,
    change: '-4.2% from last week',
    changeType: 'positive', // decreased pending is good
    iconName: 'Clock',
    color: '#D4A84F',
    bgColor: 'rgba(212, 168, 79, 0.1)',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    value: '324',
    rawValue: 324,
    change: '+8.7% this month',
    changeType: 'neutral',
    iconName: 'Loader',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: 'resolved',
    title: 'Resolved',
    value: '738',
    rawValue: 738,
    change: '+15.3% this month',
    changeType: 'positive',
    iconName: 'CheckCircle',
    color: '#315C3A',
    bgColor: 'rgba(49, 92, 58, 0.15)',
  },
  {
    id: 'critical',
    title: 'Critical Complaints',
    value: '24',
    rawValue: 24,
    change: 'Requires attention',
    changeType: 'negative',
    iconName: 'AlertTriangle',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
  }
];

// 30 Days time-series data for Complaint Trends
export const COMPLAINT_TRENDS_30_DAYS = [
  { date: '24 Aug', submitted: 32, resolved: 24 },
  { date: '26 Aug', submitted: 38, resolved: 29 },
  { date: '28 Aug', submitted: 42, resolved: 33 },
  { date: '30 Aug', submitted: 35, resolved: 36 },
  { date: '01 Sep', submitted: 48, resolved: 38 },
  { date: '03 Sep', submitted: 44, resolved: 40 },
  { date: '05 Sep', submitted: 51, resolved: 42 },
  { date: '07 Sep', submitted: 47, resolved: 45 },
  { date: '09 Sep', submitted: 53, resolved: 48 },
  { date: '11 Sep', submitted: 49, resolved: 46 },
  { date: '13 Sep', submitted: 40, resolved: 41 },
  { date: '15 Sep', submitted: 56, resolved: 50 },
  { date: '17 Sep', submitted: 52, resolved: 49 },
  { date: '19 Sep', submitted: 58, resolved: 53 },
  { date: '21 Sep', submitted: 61, resolved: 55 },
  { date: '22 Sep', submitted: 46, resolved: 48 }
];

export const COMPLAINT_TRENDS_7_DAYS = [
  { date: '16 Sep', submitted: 45, resolved: 38 },
  { date: '17 Sep', submitted: 52, resolved: 49 },
  { date: '18 Sep', submitted: 48, resolved: 44 },
  { date: '19 Sep', submitted: 58, resolved: 53 },
  { date: '20 Sep', submitted: 39, resolved: 42 },
  { date: '21 Sep', submitted: 61, resolved: 55 },
  { date: '22 Sep', submitted: 46, resolved: 48 }
];

export const COMPLAINT_TRENDS_3_MONTHS = [
  { date: 'Jul W1', submitted: 260, resolved: 230 },
  { date: 'Jul W2', submitted: 280, resolved: 245 },
  { date: 'Jul W3', submitted: 295, resolved: 270 },
  { date: 'Jul W4', submitted: 310, resolved: 290 },
  { date: 'Aug W1', submitted: 330, resolved: 300 },
  { date: 'Aug W2', submitted: 345, resolved: 315 },
  { date: 'Aug W3', submitted: 320, resolved: 310 },
  { date: 'Aug W4', submitted: 350, resolved: 330 },
  { date: 'Sep W1', submitted: 370, resolved: 345 },
  { date: 'Sep W2', submitted: 390, resolved: 360 },
  { date: 'Sep W3', submitted: 360, resolved: 350 }
];

export const COMPLAINT_TRENDS_1_YEAR = [
  { date: 'Oct 25', submitted: 1040, resolved: 920 },
  { date: 'Dec 25', submitted: 1120, resolved: 1010 },
  { date: 'Feb 26', submitted: 980, resolved: 940 },
  { date: 'Apr 26', submitted: 1250, resolved: 1180 },
  { date: 'Jun 26', submitted: 1080, resolved: 1060 },
  { date: 'Aug 26', submitted: 1340, resolved: 1280 },
  { date: 'Sep 26', submitted: 1248, resolved: 738 }
];

// Exact values for Priority Distribution
export const PRIORITY_DISTRIBUTION_DATA = [
  { name: 'Low', value: 420, color: '#71844A', percentage: '33.7%' },
  { name: 'Medium', value: 510, color: '#D4A84F', percentage: '40.9%' },
  { name: 'High', value: 294, color: '#F97316', percentage: '23.5%' },
  { name: 'Critical', value: 24, color: '#EF4444', percentage: '1.9%' },
];

export const TOTAL_PRIORITY_COUNT = 1248;

// Exact values for Department-wise Complaints
export const DEPARTMENT_COMPLAINTS_DATA = [
  { department: 'Maintenance', count: 214, fill: '#008F63' },
  { department: 'Hostel', count: 186, fill: '#315C3A' },
  { department: 'IT Support', count: 172, fill: '#00A875' },
  { department: 'Academics', count: 148, fill: '#71844A' },
  { department: 'Security', count: 96, fill: '#D4A84F' },
  { department: 'Transport', count: 88, fill: '#8CA45C' },
  { department: 'Library', count: 74, fill: '#3B82F6' },
  { department: 'Cafeteria', count: 62, fill: '#F59E0B' },
  { department: 'Administration', count: 54, fill: '#9FB1BC' },
];

// Exact Recent Complaints matching requirements
export const RECENT_COMPLAINTS_DATA = [
  {
    id: 'SC-2026-1847',
    title: 'Water supply issue in Hostel Block B',
    category: 'Water Supply',
    student: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@cgc.edu.in',
    department: 'Hostel',
    priority: 'High',
    status: 'In Progress',
    date: '22 Sep 2026',
    location: 'Hostel Block B, 3rd Floor',
    description: 'Intermittent water pressure and complete outage during morning peak hours.',
  },
  {
    id: 'SC-2026-1846',
    title: 'Wi-Fi connectivity issue',
    category: 'IT / Wi-Fi',
    student: 'Prachi Priya',
    studentEmail: 'prachi.priya@cgc.edu.in',
    department: 'IT Support',
    priority: 'Medium',
    status: 'Under Review',
    date: '22 Sep 2026',
    location: 'Academic Block 3, Lab 402',
    description: 'High latency and frequent disconnects on the CGC-Secure campus Wi-Fi network.',
  },
  {
    id: 'SC-2026-1845',
    title: 'Library AC not working',
    category: 'Infrastructure',
    student: 'Aman Verma',
    studentEmail: 'aman.verma@cgc.edu.in',
    department: 'Maintenance',
    priority: 'High',
    status: 'Resolved',
    date: '21 Sep 2026',
    location: 'Central Library, Reading Hall A',
    description: 'HVAC unit blowing warm air causing discomfort in the main quiet study zone.',
  },
  {
    id: 'SC-2026-1844',
    title: 'Cafeteria cleanliness issue',
    category: 'Cleanliness',
    student: 'Neha Singh',
    studentEmail: 'neha.singh@cgc.edu.in',
    department: 'Cafeteria',
    priority: 'Low',
    status: 'Pending',
    date: '21 Sep 2026',
    location: 'Student Center Food Court',
    description: 'Food tray return area overflowing during peak lunch hours.',
  },
  {
    id: 'SC-2026-1843',
    title: 'Projector lamp failure in Lecture Hall 12',
    category: 'Equipment',
    student: 'Karan Malhotra',
    studentEmail: 'karan.m@cgc.edu.in',
    department: 'Academics',
    priority: 'Medium',
    status: 'In Progress',
    date: '20 Sep 2026',
    location: 'Block 2, Lecture Hall 12',
    description: 'Projector turning off intermittently during scheduled computer science lectures.',
  },
  {
    id: 'SC-2026-1842',
    title: 'Campus shuttle delay on Route 4',
    category: 'Transport',
    student: 'Simran Kaur',
    studentEmail: 'simran.k@cgc.edu.in',
    department: 'Transport',
    priority: 'Medium',
    status: 'Resolved',
    date: '20 Sep 2026',
    location: 'Campus South Gate Terminal',
    description: 'Shuttle bus delayed by 30 minutes with no dispatch notification.',
  }
];

// Exact Recent Activity items matching requirements
export const RECENT_ACTIVITY_DATA = [
  {
    id: 'act-1',
    actor: 'Admin',
    action: 'assigned SC-2026-1847 to Hostel Department',
    time: '5 minutes ago',
    type: 'assignment',
    iconName: 'UserCheck',
    color: '#008F63'
  },
  {
    id: 'act-2',
    actor: 'Maintenance',
    action: 'updated SC-2026-1845',
    time: '18 minutes ago',
    type: 'status_update',
    iconName: 'RefreshCw',
    color: '#3B82F6'
  },
  {
    id: 'act-3',
    actor: 'System Alert',
    action: 'New critical complaint received',
    time: '32 minutes ago',
    type: 'critical_alert',
    iconName: 'AlertTriangle',
    color: '#EF4444'
  },
  {
    id: 'act-4',
    actor: 'Support Desk',
    action: 'Complaint SC-2026-1839 marked resolved',
    time: '1 hour ago',
    type: 'resolution',
    iconName: 'CheckCircle',
    color: '#315C3A'
  },
  {
    id: 'act-5',
    actor: 'System Admin',
    action: 'Department staff account approved',
    time: '2 hours ago',
    type: 'user_approval',
    iconName: 'ShieldCheck',
    color: '#D4A84F'
  }
];

// Quick actions configuration
export const QUICK_ACTIONS_CONFIG = [
  {
    id: 'manage-complaints',
    title: 'Manage Complaints',
    subtitle: 'Review & route campus tickets',
    iconName: 'FilePlus',
    route: '/admin/complaints',
    color: '#008F63',
    badge: '186 Pending'
  },
  {
    id: 'manage-users',
    title: 'Manage Users',
    subtitle: 'Staff, faculty & students',
    iconName: 'Users',
    route: '/admin/users',
    color: '#3B82F6',
    badge: 'Active'
  },
  {
    id: 'manage-departments',
    title: 'Manage Departments',
    subtitle: 'SLA & staff allocation',
    iconName: 'Building2',
    route: '/admin/departments',
    color: '#D4A84F',
    badge: '9 Units'
  },
  {
    id: 'view-analytics',
    title: 'View Analytics',
    subtitle: 'Institutional resolution metrics',
    iconName: 'BarChart3',
    route: '/admin/analytics',
    color: '#71844A',
    badge: 'Live'
  }
];

// System status services
export const SYSTEM_STATUS_DATA = [
  {
    id: 'complaint-sys',
    name: 'Complaint System',
    status: 'Operational',
    uptime: '99.98%',
    active: true
  },
  {
    id: 'notification-svc',
    name: 'Notification Service',
    status: 'Operational',
    uptime: '100%',
    active: true
  },
  {
    id: 'ai-priority',
    name: 'AI Priority Engine',
    status: 'Operational',
    uptime: '99.94%',
    active: true
  },
  {
    id: 'database',
    name: 'Database',
    status: 'Operational',
    uptime: '100%',
    active: true
  }
];

// AI insight
export const AI_INSIGHT_DATA = {
  title: 'AI Insight',
  badge: 'Demo Model',
  message: 'Hostel and Maintenance complaints have increased this week. Consider reviewing unresolved high-priority issues in these departments.',
  linkText: 'View Analytics →',
  linkRoute: '/admin/analytics'
};

// Filter dropdown values
export const FILTER_DEPARTMENTS = [
  'All Departments',
  'Maintenance',
  'Hostel',
  'IT Support',
  'Academics',
  'Security',
  'Transport',
  'Library',
  'Cafeteria',
  'Administration'
];

export const FILTER_PRIORITIES = [
  'All Priorities',
  'Low',
  'Medium',
  'High',
  'Critical'
];

export const FILTER_STATUSES = [
  'All Statuses',
  'Pending',
  'Under Review',
  'In Progress',
  'Resolved'
];
