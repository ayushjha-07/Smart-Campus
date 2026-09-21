// Mock data for Smart Campus Admin Dashboard (Step 10)
// Frontend-only demo dataset

export const ADMIN_STATS = [
  {
    id: 'total',
    title: 'Total Complaints',
    value: '248',
    change: '+12.5%',
    changeLabel: 'vs last month',
    changeType: 'positive',
    iconName: 'FileText',
    color: '#D4A84F',
    bgColor: 'rgba(212, 168, 79, 0.1)',
  },
  {
    id: 'pending',
    title: 'Pending',
    value: '42',
    change: '8 require attention',
    changeLabel: '',
    changeType: 'warning',
    iconName: 'Clock',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    value: '67',
    change: '27 assigned today',
    changeLabel: '',
    changeType: 'neutral',
    iconName: 'LoaderCircle',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: 'resolved',
    title: 'Resolved',
    value: '139',
    change: '56% of total',
    changeLabel: '',
    changeType: 'positive',
    iconName: 'CheckCircle2',
    color: '#315C3A',
    bgColor: 'rgba(49, 92, 58, 0.15)',
  },
  {
    id: 'critical',
    title: 'Critical Complaints',
    value: '8',
    change: '3 unresolved',
    changeLabel: '',
    changeType: 'negative',
    iconName: 'AlertTriangle',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
  },
  {
    id: 'avg-time',
    title: 'Avg. Resolution Time',
    value: '18.4 hrs',
    change: '↓ 12% this month',
    changeLabel: '',
    changeType: 'positive',
    iconName: 'Timer',
    color: '#71844A',
    bgColor: 'rgba(113, 132, 74, 0.12)',
  }
];

export const COMPLAINT_OVERVIEW_DATA = [
  { day: 'Mon', submitted: 38, resolved: 28 },
  { day: 'Tue', submitted: 45, resolved: 34 },
  { day: 'Wed', submitted: 42, resolved: 39 },
  { day: 'Thu', submitted: 51, resolved: 44 },
  { day: 'Fri', submitted: 49, resolved: 41 },
  { day: 'Sat', submitted: 26, resolved: 32 },
  { day: 'Sun', submitted: 22, resolved: 25 },
];

export const PRIORITY_DISTRIBUTION_DATA = [
  { name: 'Low', value: 72, color: '#71844A', badgeBg: 'rgba(113, 132, 74, 0.15)', text: '#A7C481' },
  { name: 'Medium', value: 103, color: '#D4A84F', badgeBg: 'rgba(212, 168, 79, 0.15)', text: '#E5BF6E' },
  { name: 'High', value: 65, color: '#F97316', badgeBg: 'rgba(249, 115, 22, 0.15)', text: '#FDBA74' },
  { name: 'Critical', value: 8, color: '#EF4444', badgeBg: 'rgba(239, 68, 68, 0.15)', text: '#FCA5A5' },
];

export const COMPLAINT_STATUS_DATA = [
  { name: 'Pending', value: 42, color: '#F59E0B' },
  { name: 'Under Review', value: 18, color: '#8B5CF6' },
  { name: 'Assigned', value: 24, color: '#06B6D4' },
  { name: 'In Progress', value: 67, color: '#3B82F6' },
  { name: 'Resolved', value: 139, color: '#315C3A' },
];

export const RECENT_COMPLAINTS_DATA = [
  {
    id: 'SC-2026-1848',
    title: 'Water supply issue in Hostel Block B',
    student: 'Rahul Sharma',
    studentEmail: 'rahul.s@campus.edu',
    studentRoll: '2024-CS-042',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'In Progress',
    submitted: '10 min ago',
    submittedDate: '20 Sep 2026, 10:22 AM',
    location: 'Hostel Block B, 2nd Floor',
    description: 'Water pressure in the 2nd-floor washrooms has been completely disrupted since early morning. Multiple rooms are affected.',
    aiCategory: 'Plumbing & Utilities',
    aiPriority: 'HIGH',
    latestUpdate: 'Maintenance team dispatched to check main reservoir valve.',
    timeline: [
      { time: '10:22 AM', title: 'Complaint Logged', desc: 'Registered by Rahul Sharma with photo attachment.' },
      { time: '10:26 AM', title: 'AI Triage & Categorization', desc: 'Priority auto-flagged as High due to block-level impact.' },
      { time: '10:32 AM', title: 'Assigned to Maintenance', desc: 'Assigned to Shift Lead Er. Ramesh Verma.' },
      { time: '10:35 AM', title: 'Status: In Progress', desc: 'Field technician dispatched to reservoir pump house.' }
    ]
  },
  {
    id: 'SC-2026-1847',
    title: 'Wi-Fi connectivity issue in Central Library',
    student: 'Priya Singh',
    studentEmail: 'priya.s@campus.edu',
    studentRoll: '2023-IT-108',
    department: 'IT Support',
    priority: 'MEDIUM',
    status: 'Under Review',
    submitted: '25 min ago',
    submittedDate: '20 Sep 2026, 10:07 AM',
    location: 'Central Library, Reading Hall 2',
    description: 'Frequent DNS disconnects and packet loss on AP-LIB-04. Students are unable to access research journals.',
    aiCategory: 'Network Infrastructure',
    aiPriority: 'MEDIUM',
    latestUpdate: 'Network operations center pinging access point AP-LIB-04.',
    timeline: [
      { time: '10:07 AM', title: 'Complaint Logged', desc: 'Reported by Priya Singh.' },
      { time: '10:12 AM', title: 'Under Review', desc: 'System automated diagnostic initiated on AP cluster.' }
    ]
  },
  {
    id: 'SC-2026-1846',
    title: 'Street light not working on North Pathway',
    student: 'Aman Verma',
    studentEmail: 'aman.v@campus.edu',
    studentRoll: '2025-EE-019',
    department: 'Electrical',
    priority: 'MEDIUM',
    status: 'Assigned',
    submitted: '42 min ago',
    submittedDate: '20 Sep 2026, 09:50 AM',
    location: 'Pathway between North Gate & Admin Block',
    description: 'Three consecutive solar street lights are completely dark, creating safety concerns during night hours.',
    aiCategory: 'Campus Safety & Lighting',
    aiPriority: 'MEDIUM',
    latestUpdate: 'Assigned to evening electrical inspection crew.',
    timeline: [
      { time: '09:50 AM', title: 'Complaint Logged', desc: 'Reported by Aman Verma.' },
      { time: '10:02 AM', title: 'Assigned to Electrical', desc: 'Forwarded to campus electrical division.' }
    ]
  },
  {
    id: 'SC-2026-1845',
    title: 'Library AC not working and leaking water',
    student: 'Neha Gupta',
    studentEmail: 'neha.g@campus.edu',
    studentRoll: '2023-ME-055',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'Resolved',
    submitted: '1 hr ago',
    submittedDate: '20 Sep 2026, 09:30 AM',
    location: 'Main Library, 1st Floor Digital Lab',
    description: 'AC unit in digital lab is making heavy rattling noise and dripping condensation onto computer table #4.',
    aiCategory: 'HVAC & Maintenance',
    aiPriority: 'HIGH',
    latestUpdate: 'Filter replaced, drainage pipe cleared, and refrigerant pressure tested.',
    timeline: [
      { time: '09:30 AM', title: 'Complaint Logged', desc: 'Reported by Neha Gupta.' },
      { time: '09:36 AM', title: 'Assigned to HVAC', desc: 'Technician team reached digital lab.' },
      { time: '10:15 AM', title: 'Resolved', desc: 'Drainage unclogged and temperature stabilized at 22°C.' }
    ]
  },
  {
    id: 'SC-2026-1844',
    title: 'Cafeteria cleanliness and waste disposal issue',
    student: 'Arjun Kumar',
    studentEmail: 'arjun.k@campus.edu',
    studentRoll: '2024-BT-031',
    department: 'Housekeeping',
    priority: 'LOW',
    status: 'Resolved',
    submitted: '2 hrs ago',
    submittedDate: '20 Sep 2026, 08:30 AM',
    location: 'Central Cafeteria, Dining Hall B',
    description: 'Beverage spills near counter 3 and overflowing organic waste bin during morning breakfast rush.',
    aiCategory: 'Sanitation & Housekeeping',
    aiPriority: 'LOW',
    latestUpdate: 'Housekeeping supervisor deployed additional waste bins and sanitized tables.',
    timeline: [
      { time: '08:30 AM', title: 'Complaint Logged', desc: 'Reported by Arjun Kumar.' },
      { time: '08:45 AM', title: 'Housekeeping Notified', desc: 'Shift staff dispatched with sanitation equipment.' },
      { time: '09:15 AM', title: 'Resolved', desc: 'Hall B sanitized and replacement bins installed.' }
    ]
  },
  {
    id: 'SC-2026-1838',
    title: 'Water leakage near Hostel Block B electrical duct',
    student: 'Vikram Mehta',
    studentEmail: 'vikram.m@campus.edu',
    studentRoll: '2023-CE-012',
    department: 'Maintenance',
    priority: 'CRITICAL',
    status: 'Pending',
    submitted: '35 min ago',
    submittedDate: '20 Sep 2026, 09:57 AM',
    location: 'Hostel Block B, Basement Electrical Riser',
    description: 'Overhead seepage dripping directly adjacent to main electrical distribution panel. High risk of short circuit.',
    aiCategory: 'Electrical Hazard & Seepage',
    aiPriority: 'CRITICAL',
    latestUpdate: 'Urgent notification triggered to Head of Maintenance and Electrical Safety Officer.',
    timeline: [
      { time: '09:57 AM', title: 'Complaint Logged', desc: 'Emergency alert logged by hostel prefect.' },
      { time: '09:58 AM', title: 'AI Critical Alert Triggered', desc: 'Safety hazard protocol activated automatically.' }
    ]
  },
  {
    id: 'SC-2026-1829',
    title: 'Power outage in Computer Lab 3',
    student: 'Kavita Reddy',
    studentEmail: 'kavita.r@campus.edu',
    studentRoll: '2024-CS-089',
    department: 'Electrical',
    priority: 'HIGH',
    status: 'Under Review',
    submitted: '1 hr ago',
    submittedDate: '20 Sep 2026, 09:32 AM',
    location: 'Academic Block 2, Room 304 (Lab 3)',
    description: 'Lab 3 tripped during practical examination. 40 machines rebooted and backup UPS failed to engage.',
    aiCategory: 'Power Backup & Electrical',
    aiPriority: 'HIGH',
    latestUpdate: 'Electrical supervisor checking main lab MCB and sub-station breaker.',
    timeline: [
      { time: '09:32 AM', title: 'Complaint Logged', desc: 'Logged by Lab Assistant / Student Kavita.' },
      { time: '09:40 AM', title: 'Triage In Progress', desc: 'UPS technician investigating battery bank fault.' }
    ]
  },
  {
    id: 'SC-2026-1824',
    title: 'Security concern near north gate during evening',
    student: 'Aditya Sen',
    studentEmail: 'aditya.s@campus.edu',
    studentRoll: '2023-EC-047',
    department: 'Security',
    priority: 'HIGH',
    status: 'Assigned',
    submitted: '2 hrs ago',
    submittedDate: '20 Sep 2026, 08:30 AM',
    location: 'North Gate Perimeter & Bike Stand',
    description: 'Unauthorized vehicles parking along boundary wall; non-functional CCTV unit on pole #7.',
    aiCategory: 'Perimeter Security',
    aiPriority: 'HIGH',
    latestUpdate: 'Chief Security Officer assigned guard patrol and flagged camera repair request.',
    timeline: [
      { time: '08:30 AM', title: 'Complaint Logged', desc: 'Reported by Aditya Sen.' },
      { time: '09:00 AM', title: 'Assigned to Security Staff', desc: 'Mobile patrol patrol car scheduled for North perimeter.' }
    ]
  }
];

export const DEPARTMENT_PERFORMANCE_DATA = [
  { department: 'Maintenance', total: 58, pending: 12, resolved: 39, rate: 67 },
  { department: 'IT Support', total: 41, pending: 7, resolved: 29, rate: 71 },
  { department: 'Housekeeping', total: 36, pending: 5, resolved: 27, rate: 75 },
  { department: 'Academics', total: 29, pending: 4, resolved: 22, rate: 76 },
  { department: 'Security', total: 24, pending: 3, resolved: 19, rate: 79 },
  { department: 'Transport', total: 21, pending: 4, resolved: 15, rate: 71 },
  { department: 'Library', total: 18, pending: 3, resolved: 14, rate: 78 },
  { department: 'Hostel', total: 21, pending: 4, resolved: 13, rate: 62 },
];

export const AI_INSIGHTS_DATA = [
  {
    id: 'trend-1',
    category: 'Trend Detection',
    title: 'Hostel complaints increased by 28% this week',
    description: 'Spike primarily driven by recurring plumbing and water heating issues in Blocks B and C.',
    severity: 'warning',
    iconName: 'TrendingUp',
    metric: '+28% Week-over-Week',
  },
  {
    id: 'concentration-2',
    category: 'Issue Concentration',
    title: 'Water supply complaints concentrated in Hostel Block B',
    description: '7 of the last 10 plumbing reports originate from Block B riser system, indicating a localized line fault.',
    severity: 'alert',
    iconName: 'MapPin',
    metric: '7 of 10 Reports',
  },
  {
    id: 'department-3',
    category: 'Department Analysis',
    title: 'Maintenance department handles 23.4% of total volume',
    description: 'Maintenance resolution time averaged 16.2 hrs with 67% on-time resolution, matching semester benchmarks.',
    severity: 'info',
    iconName: 'Activity',
    metric: '58 Active Tickets',
  },
  {
    id: 'priority-4',
    category: 'Priority Alert',
    title: '3 Critical complaints require immediate triage',
    description: 'Water seepage near electrical ducts and computer lab outages exceed the 30-minute triage target.',
    severity: 'critical',
    iconName: 'AlertOctagon',
    metric: '3 High-Priority Overdue',
  },
];

export const URGENT_ATTENTION_DATA = [
  {
    id: 'SC-2026-1838',
    title: 'Water leakage near Hostel Block B',
    priority: 'CRITICAL',
    status: 'Pending',
    submitted: 'Submitted 35 minutes ago',
    location: 'Hostel Block B Basement',
    department: 'Maintenance',
  },
  {
    id: 'SC-2026-1829',
    title: 'Power outage in Computer Lab',
    priority: 'HIGH',
    status: 'Under Review',
    submitted: 'Submitted 1 hour ago',
    location: 'Academic Block 2, Lab 3',
    department: 'Electrical',
  },
  {
    id: 'SC-2026-1824',
    title: 'Security concern near north gate',
    priority: 'HIGH',
    status: 'Assigned',
    submitted: 'Submitted 2 hours ago',
    location: 'North Gate Perimeter',
    department: 'Security',
  },
];

export const RECENT_ACTIVITY_DATA = [
  {
    id: 'act-1',
    time: '10:32',
    action: 'Admin assigned SC-2026-1848 to Maintenance',
    type: 'assignment',
    icon: 'UserCheck',
  },
  {
    id: 'act-2',
    time: '10:18',
    action: 'IT Support resolved SC-2026-1839',
    type: 'resolved',
    icon: 'CheckCircle2',
  },
  {
    id: 'act-3',
    time: '09:54',
    action: 'Priority changed from Medium to High on SC-2026-1841',
    type: 'priority',
    icon: 'AlertTriangle',
  },
  {
    id: 'act-4',
    time: '09:31',
    action: 'New complaint submitted: SC-2026-1845 (Library AC)',
    type: 'created',
    icon: 'FilePlus',
  },
  {
    id: 'act-5',
    time: '08:47',
    action: 'Maintenance department updated complaint status to In Progress',
    type: 'update',
    icon: 'Clock',
  },
];

export const CAMPUS_DEPARTMENTS = [
  'Administration',
  'Maintenance',
  'Hostel',
  'IT Support',
  'Academics',
  'Security',
  'Transport',
  'Library',
  'Cafeteria',
  'Housekeeping',
  'Electrical',
];

export const STATUS_OPTIONS = [
  'Pending',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved',
];

export const PRIORITY_OPTIONS = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL',
];
