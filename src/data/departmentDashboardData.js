// Master dataset for Department Dashboard (/department/dashboard)
// Default staff context: Hostel Department (Staff: Rohit Kumar)

export const DEFAULT_DEPARTMENT_STAFF = {
  name: 'Rohit Kumar',
  role: 'Department Staff',
  department: 'Hostel Department',
  email: 'rohit.kumar@campus.edu',
  employeeId: 'EMP-HST-104',
  avatarInitials: 'RK'
};

// 5 Primary KPI Cards Data
export const DEPARTMENT_KPI_BENCHMARKS = {
  assigned: {
    label: 'Assigned Complaints',
    value: 42,
    trend: '+8.2%',
    trendType: 'up',
    trendPeriod: 'this week',
    accentColor: '#008F63'
  },
  pending: {
    label: 'Pending',
    value: 12,
    trend: '-2.4%',
    trendType: 'down',
    trendPeriod: 'from yesterday',
    accentColor: '#D4A84F'
  },
  underReview: {
    label: 'Under Review',
    value: 8,
    trend: 'Needs triage',
    trendType: 'neutral',
    trendPeriod: 'in queue',
    accentColor: '#3B82F6'
  },
  inProgress: {
    label: 'In Progress',
    value: 15,
    trend: '+12.5%',
    trendType: 'up',
    trendPeriod: 'active maintenance',
    accentColor: '#71844A'
  },
  resolved: {
    label: 'Resolved',
    value: 7,
    trend: '+16.7%',
    trendType: 'up',
    trendPeriod: 'this cycle',
    accentColor: '#315C3A'
  }
};

// Priority Overview (4 Cards)
export const PRIORITY_OVERVIEW_DATA = [
  {
    priority: 'Low',
    count: 14,
    color: '#71844A',
    borderColor: '#71844A',
    bgColorLight: 'bg-[#71844A]/10',
    bgColorDark: 'dark:bg-[#71844A]/15',
    label: 'Standard SLA (72 hrs)'
  },
  {
    priority: 'Medium',
    count: 18,
    color: '#D4A84F',
    borderColor: '#D4A84F',
    bgColorLight: 'bg-[#D4A84F]/10',
    bgColorDark: 'dark:bg-[#D4A84F]/15',
    label: 'Moderate SLA (48 hrs)'
  },
  {
    priority: 'High',
    count: 8,
    color: '#F97316',
    borderColor: '#F97316',
    bgColorLight: 'bg-[#F97316]/10',
    bgColorDark: 'dark:bg-[#F97316]/15',
    label: 'Urgent SLA (24 hrs)'
  },
  {
    priority: 'Critical',
    count: 2,
    color: '#EF4444',
    borderColor: '#EF4444',
    bgColorLight: 'bg-red-500/10',
    bgColorDark: 'dark:bg-red-500/20',
    label: 'Immediate Attention (6 hrs)',
    isWarning: true
  }
];

// Recharts Donut Data: Complaint Status
export const STATUS_DONUT_DATA = [
  { name: 'Pending', value: 12, percentage: '28.6%', color: '#D4A84F' },
  { name: 'Under Review', value: 8, percentage: '19.0%', color: '#3B82F6' },
  { name: 'In Progress', value: 15, percentage: '35.7%', color: '#008F63' },
  { name: 'Resolved', value: 7, percentage: '16.7%', color: '#315C3A' }
];

// Recharts Line/Area Data: Weekly Complaint Activity
export const WEEKLY_ACTIVITY_DATA = [
  { day: 'Mon', submitted: 6, resolved: 2 },
  { day: 'Tue', submitted: 9, resolved: 5 },
  { day: 'Wed', submitted: 5, resolved: 7 },
  { day: 'Thu', submitted: 8, resolved: 4 },
  { day: 'Fri', submitted: 11, resolved: 8 },
  { day: 'Sat', submitted: 4, resolved: 6 },
  { day: 'Sun', submitted: 3, resolved: 5 }
];

// Recent Department Activity Timeline
export const RECENT_DEPARTMENT_ACTIVITY = [
  {
    id: 'act-1',
    ticketId: 'SC-2026-1847',
    title: 'SC-2026-1847 status updated to In Progress',
    time: '10 minutes ago',
    type: 'status_update',
    iconName: 'RefreshCw'
  },
  {
    id: 'act-2',
    ticketId: 'SC-2026-1841',
    title: 'SC-2026-1841 assigned to you',
    time: '25 minutes ago',
    type: 'assignment',
    iconName: 'UserCheck'
  },
  {
    id: 'act-3',
    ticketId: 'SC-2026-1837',
    title: 'SC-2026-1837 priority changed to High',
    time: '1 hour ago',
    type: 'priority_change',
    iconName: 'AlertTriangle'
  },
  {
    id: 'act-4',
    ticketId: 'SC-2026-1829',
    title: 'SC-2026-1829 marked as urgent',
    time: '2 hours ago',
    type: 'urgent',
    iconName: 'Flame'
  }
];

// Initial Assigned Complaints Dataset
export const INITIAL_ASSIGNED_COMPLAINTS = [
  {
    id: 'SC-2026-1847',
    title: 'Water supply issue in Hostel Block B',
    student: 'Rahul Sharma',
    studentId: 'SC-STU-2026-014',
    studentEmail: 'rahul.sharma@campus.edu',
    category: 'Water Supply',
    department: 'Hostel Department',
    priority: 'High',
    status: 'In Progress',
    submitted: '22 Sep',
    submittedFull: '22 Sep 2026, 10:32 AM',
    due: 'Today',
    dueDate: '2026-09-23',
    location: 'Hostel Block B, 2nd Floor',
    description: 'Water supply has been unavailable in Hostel Block B since morning. Several student rooms on the 2nd and 3rd floors are affected.',
    attachments: [
      { name: 'pipeline_pressure_gauge.jpg', size: '1.2 MB', type: 'image' }
    ],
    aiAnalysis: {
      priority: 'High',
      confidence: 94,
      suggestedAction: 'Review water supply infrastructure and test main inlet valve.',
      summary: 'Automated classification detected domestic water outage in residential quarters.',
      keywords: ['water', 'hostel', 'pressure', 'block b']
    },
    timeline: [
      { time: '22 Sep 2026 — 10:32 AM', title: 'Submitted', desc: 'Complaint registered by Rahul Sharma.' },
      { time: '22 Sep 2026 — 10:45 AM', title: 'Under Review', desc: 'Assigned to Hostel Department dispatch queue.' },
      { time: '22 Sep 2026 — 11:15 AM', title: 'In Progress', desc: 'Assigned to Rohit Kumar. Maintenance team deployed.' }
    ],
    progressUpdates: [
      {
        id: 'pu-1',
        time: '22 Sep 2026 — 11:30 AM',
        author: 'Rohit Kumar',
        text: 'Maintenance team inspected the water pipeline and verified inlet pump status.'
      }
    ],
    studentNotifications: []
  },
  {
    id: 'SC-2026-1841',
    title: 'Room cleanliness issue',
    student: 'Neha Singh',
    studentId: 'SC-STU-2026-077',
    studentEmail: 'neha.singh@campus.edu',
    category: 'Cleanliness',
    department: 'Hostel Department',
    priority: 'Medium',
    status: 'Pending',
    submitted: '21 Sep',
    submittedFull: '21 Sep 2026, 03:15 PM',
    due: 'Tomorrow',
    dueDate: '2026-09-24',
    location: 'Hostel Block A, Room 304',
    description: 'Sanitation and waste clearing has not been completed for common washrooms and corridor areas in Wing A.',
    attachments: [],
    aiAnalysis: {
      priority: 'Medium',
      confidence: 91,
      suggestedAction: 'Dispatch custodial housekeeping team for sanitation sweep.',
      summary: 'Cleanliness escalation in student accommodation corridor.',
      keywords: ['cleanliness', 'hostel block a', 'washroom', 'sanitation']
    },
    timeline: [
      { time: '21 Sep 2026 — 03:15 PM', title: 'Submitted', desc: 'Complaint logged by Neha Singh.' },
      { time: '21 Sep 2026 — 04:00 PM', title: 'Queued', desc: 'Scheduled for morning custodial rotation.' }
    ],
    progressUpdates: [],
    studentNotifications: []
  },
  {
    id: 'SC-2026-1837',
    title: 'Hostel corridor light issue',
    student: 'Riya Sharma',
    studentId: 'SC-STU-2026-092',
    studentEmail: 'riya.sharma@campus.edu',
    category: 'Electricity',
    department: 'Hostel Department',
    priority: 'High',
    status: 'Under Review',
    submitted: '20 Sep',
    submittedFull: '20 Sep 2026, 08:40 PM',
    due: 'Today',
    dueDate: '2026-09-23',
    location: 'Hostel Block C, 1st Floor Corridor',
    description: 'Multiple overhead fluorescent LED fixtures are flickering and two are completely dead, causing safety hazard at night.',
    attachments: [
      { name: 'corridor_lighting_fault.png', size: '850 KB', type: 'image' }
    ],
    aiAnalysis: {
      priority: 'High',
      confidence: 93,
      suggestedAction: 'Replace corridor fixtures and check circuit breaker panel.',
      summary: 'Lighting defect in high-traffic hallway.',
      keywords: ['lighting', 'corridor', 'electrical', 'safety']
    },
    timeline: [
      { time: '20 Sep 2026 — 08:40 PM', title: 'Submitted', desc: 'Complaint logged by Riya Sharma.' },
      { time: '21 Sep 2026 — 09:10 AM', title: 'Under Review', desc: 'Electrical technician scheduled for lamp replacement.' }
    ],
    progressUpdates: [],
    studentNotifications: []
  },
  {
    id: 'SC-2026-1829',
    title: 'Water cooler not working',
    student: 'Aman Verma',
    studentId: 'SC-STU-2026-031',
    studentEmail: 'aman.verma@campus.edu',
    category: 'Infrastructure',
    department: 'Hostel Department',
    priority: 'Critical',
    status: 'Pending',
    submitted: '19 Sep',
    submittedFull: '19 Sep 2026, 01:20 PM',
    due: 'Overdue',
    dueDate: '2026-09-21',
    location: 'Hostel Block B, Ground Floor Mess Hall',
    description: 'Primary RO drinking water chiller compressor failed. No chilled or filtered water available for 120+ residents.',
    attachments: [
      { name: 'chiller_compressor_leak.jpg', size: '2.1 MB', type: 'image' }
    ],
    aiAnalysis: {
      priority: 'Critical',
      confidence: 96,
      suggestedAction: 'Emergency chiller compressor replacement or temporary bottled dispenser provision.',
      summary: 'Severe hydration and potable water disruption in dining hall.',
      keywords: ['drinking water', 'cooler', 'chiller', 'mess hall', 'emergency']
    },
    timeline: [
      { time: '19 Sep 2026 — 01:20 PM', title: 'Submitted', desc: 'Complaint logged by Aman Verma.' },
      { time: '20 Sep 2026 — 10:00 AM', title: 'Escalated', desc: 'Flagged overdue: SLA exceeded 24 hours.' }
    ],
    progressUpdates: [],
    studentNotifications: []
  },
  {
    id: 'SC-2026-1825',
    title: 'Broken ceiling fan regulator',
    student: 'Simran Kaur',
    studentId: 'SC-STU-2026-054',
    studentEmail: 'simran.kaur@campus.edu',
    category: 'Electricity',
    department: 'Hostel Department',
    priority: 'Low',
    status: 'In Progress',
    submitted: '18 Sep',
    submittedFull: '18 Sep 2026, 11:10 AM',
    due: 'In 2 days',
    dueDate: '2026-09-25',
    location: 'Hostel Block D, Room 102',
    description: 'Rotary wall knob for the ceiling fan has stripped off its spindle, keeping fan stuck at maximum speed.',
    attachments: [],
    aiAnalysis: {
      priority: 'Low',
      confidence: 88,
      suggestedAction: 'Replace standard 5-step rotary regulator unit.',
      summary: 'Minor appliance speed control component failure.',
      keywords: ['fan', 'regulator', 'electricity', 'room 102']
    },
    timeline: [
      { time: '18 Sep 2026 — 11:10 AM', title: 'Submitted', desc: 'Complaint logged by Simran Kaur.' },
      { time: '19 Sep 2026 — 02:00 PM', title: 'In Progress', desc: 'Replacement regulator parts requisitioned.' }
    ],
    progressUpdates: [],
    studentNotifications: []
  },
  {
    id: 'SC-2026-1822',
    title: 'Wi-Fi router power adapter burnt',
    student: 'Karan Malhotra',
    studentId: 'SC-STU-2026-118',
    studentEmail: 'karan.malhotra@campus.edu',
    category: 'IT / Wi-Fi',
    department: 'Hostel Department',
    priority: 'Critical',
    status: 'Under Review',
    submitted: '18 Sep',
    submittedFull: '18 Sep 2026, 04:45 PM',
    due: 'Today',
    dueDate: '2026-09-23',
    location: 'Hostel Block A, 2nd Floor Access Point',
    description: 'Access Point power injector suffered electrical surge and emitted smoke. Entire 2nd floor is without campus Wi-Fi.',
    attachments: [
      { name: 'router_power_surge.jpg', size: '1.4 MB', type: 'image' }
    ],
    aiAnalysis: {
      priority: 'Critical',
      confidence: 95,
      suggestedAction: 'Coordinate with campus IT for PoE injector replacement and socket surge check.',
      summary: 'Network hardware electrical fault affecting whole floor connectivity.',
      keywords: ['wifi', 'access point', 'poe adapter', 'power surge']
    },
    timeline: [
      { time: '18 Sep 2026 — 04:45 PM', title: 'Submitted', desc: 'Complaint logged by Karan Malhotra.' },
      { time: '19 Sep 2026 — 09:30 AM', title: 'Under Review', desc: 'Shared with IT Support & Hostel electrical team.' }
    ],
    progressUpdates: [],
    studentNotifications: []
  },
  {
    id: 'SC-2026-1819',
    title: 'Bathroom door latch damaged',
    student: 'Tanvi Kapoor',
    studentId: 'SC-STU-2026-062',
    studentEmail: 'tanvi.kapoor@campus.edu',
    category: 'Maintenance',
    department: 'Hostel Department',
    priority: 'Low',
    status: 'Resolved',
    submitted: '16 Sep',
    submittedFull: '16 Sep 2026, 09:15 AM',
    due: 'Completed',
    dueDate: '2026-09-18',
    location: 'Hostel Block C, Room 218',
    description: 'Internal latch on washroom door does not engage cleanly into frame plate.',
    attachments: [],
    aiAnalysis: {
      priority: 'Low',
      confidence: 90,
      suggestedAction: 'Realign strike plate and tighten screws.',
      summary: 'Minor carpentry maintenance in residential room.',
      keywords: ['door latch', 'bathroom', 'carpentry']
    },
    timeline: [
      { time: '16 Sep 2026 — 09:15 AM', title: 'Submitted', desc: 'Complaint logged by Tanvi Kapoor.' },
      { time: '17 Sep 2026 — 11:30 AM', title: 'In Progress', desc: 'Carpenter dispatched.' },
      { time: '18 Sep 2026 — 04:00 PM', title: 'Resolved', desc: 'Strike plate realigned and tested by staff.' }
    ],
    progressUpdates: [
      {
        id: 'pu-2',
        time: '18 Sep 2026 — 04:00 PM',
        author: 'Rohit Kumar',
        text: 'Door latch replaced with heavy duty stainless steel latch. Resolved.'
      }
    ],
    studentNotifications: []
  },
  {
    id: 'SC-2026-1815',
    title: 'Window mesh torn - insect issue',
    student: 'Harsh Vardhan',
    studentId: 'SC-STU-2026-140',
    studentEmail: 'harsh.vardhan@campus.edu',
    category: 'Cleanliness',
    department: 'Hostel Department',
    priority: 'Medium',
    status: 'Resolved',
    submitted: '15 Sep',
    submittedFull: '15 Sep 2026, 02:20 PM',
    due: 'Completed',
    dueDate: '2026-09-17',
    location: 'Hostel Block B, Room 412',
    description: 'Mosquito mesh net has a large rip allowing insects inside during evenings.',
    attachments: [],
    aiAnalysis: {
      priority: 'Medium',
      confidence: 89,
      suggestedAction: 'Replace fiberglass mosquito net on sliding window channel.',
      summary: 'Preventive sanitation maintenance in residential quarters.',
      keywords: ['window mesh', 'mosquito', 'hostel block b']
    },
    timeline: [
      { time: '15 Sep 2026 — 02:20 PM', title: 'Submitted', desc: 'Complaint logged by Harsh Vardhan.' },
      { time: '16 Sep 2026 — 10:00 AM', title: 'In Progress', desc: 'Maintenance team fitted new mesh.' },
      { time: '17 Sep 2026 — 01:00 PM', title: 'Resolved', desc: 'Window net replacement verified.' }
    ],
    progressUpdates: [],
    studentNotifications: []
  }
];

// Storage Keys
const DEPT_DASHBOARD_STORAGE_KEY = 'smart_campus_dept_dashboard_complaints_v1';

export function loadDepartmentDashboardComplaints() {
  try {
    const raw = localStorage.getItem(DEPT_DASHBOARD_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading department complaints from localStorage:', err);
  }
  return INITIAL_ASSIGNED_COMPLAINTS;
}

export function saveDepartmentDashboardComplaints(complaints) {
  try {
    localStorage.setItem(DEPT_DASHBOARD_STORAGE_KEY, JSON.stringify(complaints));
  } catch (err) {
    console.warn('Error saving department complaints to localStorage:', err);
  }
}

export function resetDepartmentDashboardComplaints() {
  try {
    localStorage.removeItem(DEPT_DASHBOARD_STORAGE_KEY);
  } catch (err) {
    console.warn('Error resetting department complaints:', err);
  }
  return INITIAL_ASSIGNED_COMPLAINTS;
}
