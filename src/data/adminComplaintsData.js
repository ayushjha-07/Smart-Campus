/**
 * Admin Complaint Management Master Dataset
 * CGC University Mohali - Smart Campus Complaint & Analytics Portal
 */

export const COMPLAINT_CATEGORIES = [
  'Hostel',
  'Infrastructure',
  'Electricity',
  'Water Supply',
  'Cleanliness',
  'Academic',
  'Transport',
  'Security',
  'IT / Wi-Fi',
  'Library',
  'Cafeteria'
];

export const COMPLAINT_DEPARTMENTS = [
  'Administration',
  'Maintenance',
  'Hostel',
  'IT Support',
  'Academics',
  'Security',
  'Transport',
  'Library',
  'Cafeteria'
];

export const COMPLAINT_STATUSES = [
  'Pending',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved',
  'Rejected'
];

export const COMPLAINT_PRIORITIES = [
  'Low',
  'Medium',
  'High',
  'Critical'
];

export const DEPARTMENT_STAFF_MAP = {
  'Hostel': ['Rohit Kumar', 'Sunita Rao', 'Devendra Singh'],
  'IT Support': ['Aman Singh', 'Rajesh Mehta', 'Priyanka Sen'],
  'Maintenance': ['Neeraj Sharma', 'Vikas Kumar', 'Rakesh Yadav'],
  'Cafeteria': ['Anita Roy', 'Chef Harish', 'Suresh Pal'],
  'Academics': ['Dr. K.S. Brar', 'Prof. N. Walia', 'Dr. Reena Kaur'],
  'Security': ['Inspector Baljit Singh', 'Gurpreet Singh', 'Harvinder Singh'],
  'Administration': ['Registrar Office', 'S. Kapoor', 'Anil Sood'],
  'Transport': ['Manjit Singh', 'Harnek Singh', 'Gurmail Singh'],
  'Library': ['Archana Devi', 'P.K. Sharma', 'Meenakshi Joshi']
};

export const QUICK_INSIGHTS = {
  mostReported: { title: 'Most Reported', value: 'Hostel', metric: '32% of total' },
  highestPriority: { title: 'Highest Priority', value: 'Maintenance', metric: '18 critical' },
  fastestResolution: { title: 'Fastest Resolution', value: 'IT Support', metric: 'Avg 4.2 hrs' },
  needsAttention: { title: 'Needs Attention', value: 'Hostel', metric: '48 pending' }
};

export const SUMMARY_STATS = {
  total: 1248,
  pending: 186,
  inProgress: 324,
  resolved: 738,
  critical: 24
};

export const INITIAL_ADMIN_COMPLAINTS = [
  {
    id: 'SC-2026-1847',
    title: 'Water supply issue in Hostel Block B',
    student: 'Rahul Sharma',
    studentId: 'SC-STU-2026-014',
    studentEmail: 'rahul.sharma@campus.cgc.edu.in',
    category: 'Water Supply',
    department: 'Hostel',
    priority: 'HIGH',
    status: 'In Progress',
    submittedAt: '22 Sep 2026, 10:32 AM',
    submittedDate: '22 Sep 2026',
    submittedTimestamp: 1790100720000,
    assignedTo: 'Rohit Kumar',
    location: 'Hostel Block B',
    description: 'Water supply has been unavailable in Hostel Block B since morning. Several students are affected.',
    attachments: [
      { id: 'att-1', name: 'pipeline_pressure_gauge.jpg', size: '1.2 MB', type: 'image' }
    ],
    aiAnalysis: {
      category: 'Water Supply',
      priority: 'High',
      confidence: '94%',
      keywords: ['water', 'hostel', 'unavailable', 'students'],
      suggestedDepartment: 'Hostel / Maintenance',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '22 Sep 2026 — 10:32 AM', title: 'Submitted', desc: 'Complaint registered by Rahul Sharma.' },
      { time: '22 Sep 2026 — 10:40 AM', title: 'Under Review', desc: 'System validated hostel block assignment.' },
      { time: '22 Sep 2026 — 11:05 AM', title: 'Assigned to Hostel Department', desc: 'Routed to Hostel operational desk.' },
      { time: '22 Sep 2026 — 11:15 AM', title: 'Assigned to Rohit Kumar', desc: 'Staff member assigned for resolution.' },
      { time: '22 Sep 2026 — 12:45 PM', title: 'In Progress', desc: 'Rohit Kumar inspecting the main distribution valve.' }
    ],
    internalNotes: [
      { id: 'n-1', author: 'Administrator', date: '22 Sep 2026, 11:20 AM', text: 'Main pump station line B had pressure drops earlier today.' }
    ]
  },
  {
    id: 'SC-2026-1846',
    title: 'Wi-Fi connectivity issue',
    student: 'Prachi Priya',
    studentId: '2024CSB1098',
    studentEmail: 'prachi.priya@campus.cgc.edu.in',
    category: 'IT / Wi-Fi',
    department: 'IT Support',
    priority: 'MEDIUM',
    status: 'Under Review',
    submittedAt: '22 Sep 2026, 09:15 AM',
    submittedDate: '22 Sep 2026',
    submittedTimestamp: 1790096100000,
    assignedTo: 'Aman Singh',
    location: 'Computer Science Lab 3',
    description: 'High latency and frequent disconnects on Campus_Secure SSID in CS Lab 3 during practical exam sessions.',
    attachments: [
      { id: 'att-2', name: 'ping_test_report.png', size: '540 KB', type: 'image' }
    ],
    aiAnalysis: {
      category: 'IT / Wi-Fi',
      priority: 'Medium',
      confidence: '91%',
      keywords: ['wifi', 'connection', 'latency', 'cs lab'],
      suggestedDepartment: 'IT Support',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '22 Sep 2026 — 09:15 AM', title: 'Submitted', desc: 'Complaint registered by Prachi Priya.' },
      { time: '22 Sep 2026 — 09:40 AM', title: 'Under Review', desc: 'NOC engineers analyzing access point telemetry.' },
      { time: '22 Sep 2026 — 10:00 AM', title: 'Assigned to Aman Singh', desc: 'Assigned to network engineer for physical access point reboot.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1845',
    title: 'Library AC not working',
    student: 'Aman Verma',
    studentId: 'SC-STU-2026-031',
    studentEmail: 'aman.verma@campus.cgc.edu.in',
    category: 'Infrastructure',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'Resolved',
    submittedAt: '21 Sep 2026, 02:20 PM',
    submittedDate: '21 Sep 2026',
    submittedTimestamp: 1790028000000,
    assignedTo: 'Neeraj Sharma',
    location: 'Central Library, 2nd Floor',
    description: 'Central air conditioning in the 2nd-floor silent research wing has stopped functioning, leading to high humidity.',
    attachments: [],
    aiAnalysis: {
      category: 'Infrastructure',
      priority: 'High',
      confidence: '95%',
      keywords: ['ac', 'cooling', 'library', 'temperature'],
      suggestedDepartment: 'Maintenance',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '21 Sep 2026 — 02:20 PM', title: 'Submitted', desc: 'Complaint registered by Aman Verma.' },
      { time: '21 Sep 2026 — 02:45 PM', title: 'Assigned to Neeraj Sharma', desc: 'HVAC maintenance dispatched.' },
      { time: '21 Sep 2026 — 03:30 PM', title: 'In Progress', desc: 'Compressor capacitor replaced and coolant topped up.' },
      { time: '21 Sep 2026 — 05:15 PM', title: 'Resolved', desc: 'Chiller operating at nominal 21°C.' }
    ],
    internalNotes: [
      { id: 'n-2', author: 'Administrator', date: '21 Sep 2026, 05:20 PM', text: 'Verified with Chief Librarian Archana Devi.' }
    ]
  },
  {
    id: 'SC-2026-1844',
    title: 'Cafeteria cleanliness issue',
    student: 'Neha Singh',
    studentId: 'SC-STU-2026-077',
    studentEmail: 'neha.singh@campus.cgc.edu.in',
    category: 'Cleanliness',
    department: 'Cafeteria',
    priority: 'LOW',
    status: 'Pending',
    submittedAt: '21 Sep 2026, 01:10 PM',
    submittedDate: '21 Sep 2026',
    submittedTimestamp: 1790023800000,
    assignedTo: 'Unassigned',
    location: 'Main Campus Food Court',
    description: 'Dining tables and tray collection points in Zone B are uncleaned and overflowing after the lunch crowd.',
    attachments: [],
    aiAnalysis: {
      category: 'Cleanliness',
      priority: 'Low',
      confidence: '88%',
      keywords: ['cleanliness', 'cafeteria', 'tables', 'food court'],
      suggestedDepartment: 'Cafeteria',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '21 Sep 2026 — 01:10 PM', title: 'Submitted', desc: 'Complaint registered by Neha Singh.' },
      { time: '21 Sep 2026 — 01:25 PM', title: 'Pending', desc: 'Awaiting floor manager assignment.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1843',
    title: 'Street light not working near hostel',
    student: 'Riya Sharma',
    studentId: 'SC-STU-2026-092',
    studentEmail: 'riya.sharma@campus.cgc.edu.in',
    category: 'Electricity',
    department: 'Maintenance',
    priority: 'MEDIUM',
    status: 'Assigned',
    submittedAt: '21 Sep 2026, 08:30 PM',
    submittedDate: '21 Sep 2026',
    submittedTimestamp: 1790050200000,
    assignedTo: 'Vikas Kumar',
    location: 'Pathway near Girls Hostel 2 and Gate 3',
    description: 'Two consecutive pole lamps on the central walkway near Girls Hostel 2 are flickering and going completely dark.',
    attachments: [],
    aiAnalysis: {
      category: 'Electricity',
      priority: 'Medium',
      confidence: '92%',
      keywords: ['street light', 'electricity', 'dark', 'hostel pathway'],
      suggestedDepartment: 'Maintenance',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '21 Sep 2026 — 08:30 PM', title: 'Submitted', desc: 'Complaint registered by Riya Sharma.' },
      { time: '21 Sep 2026 — 09:00 PM', title: 'Assigned to Vikas Kumar', desc: 'Assigned to night electrical emergency staff.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1842',
    title: 'Campus shuttle delay on Route 4',
    student: 'Simran Kaur',
    studentId: 'SC-STU-2026-054',
    studentEmail: 'simran.kaur@campus.cgc.edu.in',
    category: 'Transport',
    department: 'Transport',
    priority: 'MEDIUM',
    status: 'Resolved',
    submittedAt: '20 Sep 2026, 08:45 AM',
    submittedDate: '20 Sep 2026',
    submittedTimestamp: 1789921500000,
    assignedTo: 'Manjit Singh',
    location: 'Campus Gate 1 Bus Bay',
    description: 'Morning shuttle bus on Sector 70 - Landran route arrived 40 minutes behind schedule.',
    attachments: [],
    aiAnalysis: {
      category: 'Transport',
      priority: 'Medium',
      confidence: '89%',
      keywords: ['bus', 'shuttle', 'route 4', 'delay'],
      suggestedDepartment: 'Transport',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '20 Sep 2026 — 08:45 AM', title: 'Submitted', desc: 'Complaint registered by Simran Kaur.' },
      { time: '20 Sep 2026 — 09:10 AM', title: 'Assigned to Manjit Singh', desc: 'Fleet supervisor dispatched backup bus.' },
      { time: '20 Sep 2026 — 11:30 AM', title: 'Resolved', desc: 'Route restored and GPS tracker recalibrated.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1841',
    title: 'Lab equipment calibration error',
    student: 'Karan Malhotra',
    studentId: 'SC-STU-2026-118',
    studentEmail: 'karan.malhotra@campus.cgc.edu.in',
    category: 'Academic',
    department: 'Academics',
    priority: 'HIGH',
    status: 'In Progress',
    submittedAt: '20 Sep 2026, 03:15 PM',
    submittedDate: '20 Sep 2026',
    submittedTimestamp: 1789944900000,
    assignedTo: 'Dr. K.S. Brar',
    location: 'Physics Research Center Lab 4',
    description: 'Digital spectrometer showing fluctuating baseline values during laser spectroscopy lab trials.',
    attachments: [],
    aiAnalysis: {
      category: 'Academic',
      priority: 'High',
      confidence: '93%',
      keywords: ['spectrometer', 'calibration', 'laser', 'physics lab'],
      suggestedDepartment: 'Academics',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '20 Sep 2026 — 03:15 PM', title: 'Submitted', desc: 'Complaint registered by Karan Malhotra.' },
      { time: '20 Sep 2026 — 04:00 PM', title: 'Assigned to Dr. K.S. Brar', desc: 'Lab in-charge notified.' },
      { time: '21 Sep 2026 — 10:00 AM', title: 'In Progress', desc: 'OEM service technician on-site.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1840',
    title: 'Broken window latch in Lecture Hall 204',
    student: 'Tanvi Kapoor',
    studentId: 'SC-STU-2026-062',
    studentEmail: 'tanvi.kapoor@campus.cgc.edu.in',
    category: 'Infrastructure',
    department: 'Maintenance',
    priority: 'LOW',
    status: 'Pending',
    submittedAt: '20 Sep 2026, 11:30 AM',
    submittedDate: '20 Sep 2026',
    submittedTimestamp: 1789931400000,
    assignedTo: 'Unassigned',
    location: 'Academic Block 3, Room 204',
    description: 'Window sash latch on north side is loose and bangs during windy afternoons.',
    attachments: [],
    aiAnalysis: {
      category: 'Infrastructure',
      priority: 'Low',
      confidence: '87%',
      keywords: ['window', 'latch', 'lecture hall', 'noise'],
      suggestedDepartment: 'Maintenance',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '20 Sep 2026 — 11:30 AM', title: 'Submitted', desc: 'Complaint registered by Tanvi Kapoor.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1839',
    title: 'Main server room temperature spike',
    student: 'System Telemetry',
    studentId: 'SC-SYS-NOC-01',
    studentEmail: 'noc.admin@campus.cgc.edu.in',
    category: 'IT / Wi-Fi',
    department: 'IT Support',
    priority: 'CRITICAL',
    status: 'In Progress',
    submittedAt: '22 Sep 2026, 07:05 AM',
    submittedDate: '22 Sep 2026',
    submittedTimestamp: 1790088300000,
    assignedTo: 'Rajesh Mehta',
    location: 'Data Center B2, Administrative Block',
    description: 'Automated thermal threshold exceeded: Rack 4 ambient temp reached 28.4°C. Requires immediate HVAC check.',
    attachments: [],
    aiAnalysis: {
      category: 'IT / Wi-Fi',
      priority: 'Critical',
      confidence: '99%',
      keywords: ['server room', 'thermal', 'hvac', 'critical'],
      suggestedDepartment: 'IT Support / Maintenance',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '22 Sep 2026 — 07:05 AM', title: 'Submitted', desc: 'Automated NOC alert raised.' },
      { time: '22 Sep 2026 — 07:15 AM', title: 'Assigned to Rajesh Mehta', desc: 'Senior systems engineer dispatched.' },
      { time: '22 Sep 2026 — 07:30 AM', title: 'In Progress', desc: 'Auxiliary split air conditioning activated.' }
    ],
    internalNotes: [
      { id: 'n-3', author: 'Administrator', date: '22 Sep 2026, 07:20 AM', text: 'Critical cooling failover confirmed.' }
    ]
  },
  {
    id: 'SC-2026-1838',
    title: 'Missing fire extinguisher inspection seal',
    student: 'Harsh Vardhan',
    studentId: 'SC-STU-2026-140',
    studentEmail: 'harsh.vardhan@campus.cgc.edu.in',
    category: 'Security',
    department: 'Security',
    priority: 'CRITICAL',
    status: 'Under Review',
    submittedAt: '19 Sep 2026, 04:45 PM',
    submittedDate: '19 Sep 2026',
    submittedTimestamp: 1789863900000,
    assignedTo: 'Inspector Baljit Singh',
    location: 'Boys Hostel 1, Stairwell C',
    description: 'Dry powder extinguisher tag shows last audit in 2024 and plastic safety seal is missing.',
    attachments: [],
    aiAnalysis: {
      category: 'Security',
      priority: 'Critical',
      confidence: '96%',
      keywords: ['fire safety', 'extinguisher', 'seal', 'hostel'],
      suggestedDepartment: 'Security',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '19 Sep 2026 — 04:45 PM', title: 'Submitted', desc: 'Complaint registered by Harsh Vardhan.' },
      { time: '19 Sep 2026 — 05:00 PM', title: 'Under Review', desc: 'Safety audit officer reviewing hostel zone.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1837',
    title: 'Duplicate course fee debit in ERP portal',
    student: 'Pooja Chawla',
    studentId: 'SC-STU-2026-088',
    studentEmail: 'pooja.chawla@campus.cgc.edu.in',
    category: 'Academic',
    department: 'Administration',
    priority: 'HIGH',
    status: 'In Progress',
    submittedAt: '19 Sep 2026, 11:10 AM',
    submittedDate: '19 Sep 2026',
    submittedTimestamp: 1789851000000,
    assignedTo: 'Registrar Office',
    location: 'Accounts & Finance Wing',
    description: 'Exam registration fee of Rs. 2,500 was deducted twice from HDFC gateway with two distinct transaction reference numbers.',
    attachments: [],
    aiAnalysis: {
      category: 'Academic',
      priority: 'High',
      confidence: '94%',
      keywords: ['fee', 'duplicate debit', 'erp', 'gateway'],
      suggestedDepartment: 'Administration',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '19 Sep 2026 — 11:10 AM', title: 'Submitted', desc: 'Complaint registered by Pooja Chawla.' },
      { time: '19 Sep 2026 — 12:00 PM', title: 'Assigned to Registrar Office', desc: 'Finance reconciliation queue.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1836',
    title: 'Overdue textbook fine calculation error',
    student: 'Akash Deep',
    studentId: 'SC-STU-2026-112',
    studentEmail: 'akash.deep@campus.cgc.edu.in',
    category: 'Library',
    department: 'Library',
    priority: 'LOW',
    status: 'Resolved',
    submittedAt: '18 Sep 2026, 01:30 PM',
    submittedDate: '18 Sep 2026',
    submittedTimestamp: 1789773000000,
    assignedTo: 'Archana Devi',
    location: 'Central Library Circulation Desk',
    description: 'Automated RFID return kiosk did not mark book as returned on Friday before public holiday.',
    attachments: [],
    aiAnalysis: {
      category: 'Library',
      priority: 'Low',
      confidence: '90%',
      keywords: ['library', 'fine', 'book return', 'rfid'],
      suggestedDepartment: 'Library',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '18 Sep 2026 — 01:30 PM', title: 'Submitted', desc: 'Complaint registered by Akash Deep.' },
      { time: '18 Sep 2026 — 03:00 PM', title: 'Resolved', desc: 'Fine reversed manually after system log verification.' }
    ],
    internalNotes: []
  },
  {
    id: 'SC-2026-1835',
    title: 'Request to repaint badminton court markings',
    student: 'Vivek Oberoi',
    studentId: 'SC-STU-2026-173',
    studentEmail: 'vivek.o@campus.cgc.edu.in',
    category: 'Infrastructure',
    department: 'Maintenance',
    priority: 'LOW',
    status: 'Rejected',
    submittedAt: '17 Sep 2026, 10:15 AM',
    submittedDate: '17 Sep 2026',
    submittedTimestamp: 1789674900000,
    assignedTo: 'Neeraj Sharma',
    location: 'Sports Complex Indoor Court 2',
    description: 'Badminton court lines are fading near the double sidelines.',
    attachments: [],
    aiAnalysis: {
      category: 'Infrastructure',
      priority: 'Low',
      confidence: '82%',
      keywords: ['sports', 'court', 'painting'],
      suggestedDepartment: 'Maintenance',
      label: 'Demo AI Analysis'
    },
    timeline: [
      { time: '17 Sep 2026 — 10:15 AM', title: 'Submitted', desc: 'Complaint registered.' },
      { time: '17 Sep 2026 — 02:00 PM', title: 'Rejected', desc: 'Annual sports complex floor recoating already scheduled for December.' }
    ],
    internalNotes: []
  }
];

const LOCAL_STORAGE_KEY = 'smart_campus_admin_complaints_v2';

export function loadAdminComplaints() {
  if (typeof window === 'undefined') return INITIAL_ADMIN_COMPLAINTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_ADMIN_COMPLAINTS));
      return INITIAL_ADMIN_COMPLAINTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_ADMIN_COMPLAINTS;
  } catch (err) {
    console.error('Failed to load admin complaints from storage:', err);
    return INITIAL_ADMIN_COMPLAINTS;
  }
}

export function saveAdminComplaints(complaints) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(complaints));
  } catch (err) {
    console.error('Failed to save admin complaints to storage:', err);
  }
}

export function downloadCSV(data = [], filename = 'smart_campus_complaints.csv') {
  if (!data || data.length === 0) return false;

  const headers = [
    'Complaint ID',
    'Title',
    'Student',
    'Student ID',
    'Category',
    'Department',
    'Priority',
    'Status',
    'Submitted Date',
    'Assigned To',
    'Location'
  ];

  const rows = data.map((c) => [
    `"${c.id || ''}"`,
    `"${(c.title || '').replace(/"/g, '""')}"`,
    `"${(c.student || '').replace(/"/g, '""')}"`,
    `"${c.studentId || ''}"`,
    `"${c.category || ''}"`,
    `"${c.department || ''}"`,
    `"${c.priority || ''}"`,
    `"${c.status || ''}"`,
    `"${c.submittedDate || c.submittedAt || ''}"`,
    `"${c.assignedTo || 'Unassigned'}"`,
    `"${(c.location || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
