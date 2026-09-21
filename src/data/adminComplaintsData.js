// Master dataset for Admin Complaint Management (Step 11)
// Includes realistic university complaints, metadata, AI triage insights, and localStorage persistence

export const COMPLAINT_CATEGORIES = [
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
  'Other',
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
  'Cafeteria',
  'Housekeeping',
];

export const COMPLAINT_STATUSES = [
  'Pending',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved',
];

export const COMPLAINT_PRIORITIES = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL',
];

export const INITIAL_ADMIN_COMPLAINTS = [
  {
    id: 'SC-2026-1848',
    title: 'Water supply issue in Hostel Block B',
    student: 'Rahul Sharma',
    studentId: 'SC-STU-2026-014',
    studentEmail: 'rahul.sharma@campus.edu',
    category: 'Water Supply',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'In Progress',
    location: 'Hostel Block B, 2nd Floor',
    description: 'Water supply has been interrupted in Hostel Block B since this morning. Several rooms are currently affected.',
    submittedAt: '20 Sep 2026, 10:32 AM',
    submittedTimestamp: 1789842720000,
    submittedRelative: '10 min ago',
    updatedAt: '10 min ago',
    aiCategory: 'Water Supply',
    aiPriority: 'High',
    aiConfidence: 92,
    keywords: ['water', 'supply', 'hostel', 'interruption'],
    timeline: [
      { time: '10:32 AM', title: 'Submitted', desc: 'Complaint registered by Rahul Sharma.' },
      { time: '10:40 AM', title: 'Under Review', desc: 'System validated hostel block assignment.' },
      { time: '11:05 AM', title: 'Assigned to Maintenance', desc: 'Dispatched to plumbing maintenance team lead.' },
      { time: '12:45 PM', title: 'In Progress', desc: 'Technician on-site inspecting the primary distribution valve.' },
      { time: 'Pending', title: 'Expected Resolution', desc: 'Target restoration by 02:00 PM.' }
    ],
    latestUpdate: 'Maintenance team has been notified and is inspecting the water supply line.',
    attachments: [
      { id: 'att-1', name: 'pipe_pressure_gauge.jpg', size: '1.4 MB', type: 'image' }
    ],
    internalNotes: [
      { id: 'n-1', author: 'Campus Admin', date: '20 Sep, 10:45 AM', text: 'Main pump station line B had pressure drops earlier today.' }
    ]
  },
  {
    id: 'SC-2026-1847',
    title: 'Wi-Fi connectivity issue in Central Library',
    student: 'Priya Singh',
    studentId: 'SC-STU-2026-089',
    studentEmail: 'priya.singh@campus.edu',
    category: 'IT / Wi-Fi',
    department: 'IT Support',
    priority: 'MEDIUM',
    status: 'Under Review',
    location: 'Central Library, 2nd Floor Reading Hall',
    description: 'Wi-Fi access point frequent disconnects causing issues during research journal downloads.',
    submittedAt: '20 Sep 2026, 10:18 AM',
    submittedTimestamp: 1789841880000,
    submittedRelative: '25 min ago',
    updatedAt: '25 min ago',
    aiCategory: 'IT / Wi-Fi',
    aiPriority: 'Medium',
    aiConfidence: 89,
    keywords: ['wifi', 'network', 'disconnect', 'library'],
    timeline: [
      { time: '10:18 AM', title: 'Submitted', desc: 'Reported by Priya Singh.' },
      { time: '10:22 AM', title: 'Under Review', desc: 'NOC initiated diagnostic ping on AP-LIB-04.' }
    ],
    latestUpdate: 'Network operations center pinging access point cluster AP-LIB-04.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1846',
    title: 'Street light not working near hostel',
    student: 'Aman Verma',
    studentId: 'SC-STU-2026-112',
    studentEmail: 'aman.verma@campus.edu',
    category: 'Electricity',
    department: 'Maintenance',
    priority: 'MEDIUM',
    status: 'Assigned',
    location: 'North Walkway between Hostel C and Dining Hall',
    description: 'Two consecutive solar path lights are completely dark, causing safety hazards for students walking back late.',
    submittedAt: '20 Sep 2026, 09:54 AM',
    submittedTimestamp: 1789840440000,
    submittedRelative: '42 min ago',
    updatedAt: '42 min ago',
    aiCategory: 'Electricity',
    aiPriority: 'Medium',
    aiConfidence: 87,
    keywords: ['lighting', 'walkway', 'safety', 'electrical'],
    timeline: [
      { time: '09:54 AM', title: 'Submitted', desc: 'Complaint logged.' },
      { time: '10:05 AM', title: 'Assigned', desc: 'Routed to campus electrical department.' }
    ],
    latestUpdate: 'Assigned to evening electrical inspection crew.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1845',
    title: 'Library AC not working',
    student: 'Neha Gupta',
    studentId: 'SC-STU-2026-055',
    studentEmail: 'neha.gupta@campus.edu',
    category: 'Infrastructure',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'Resolved',
    location: 'Main Library, Digital Lab 1',
    description: 'AC unit in digital lab is making heavy rattling noise and blowing warm air.',
    submittedAt: '20 Sep 2026, 09:31 AM',
    submittedTimestamp: 1789839060000,
    submittedRelative: '1 hr ago',
    updatedAt: '15 min ago',
    aiCategory: 'Infrastructure',
    aiPriority: 'High',
    aiConfidence: 94,
    keywords: ['ac', 'cooling', 'hvac', 'temperature'],
    timeline: [
      { time: '09:31 AM', title: 'Submitted', desc: 'Complaint registered.' },
      { time: '09:40 AM', title: 'In Progress', desc: 'HVAC technician dispatched.' },
      { time: '10:15 AM', title: 'Resolved', desc: 'Compressor belt adjusted and filter replaced.' }
    ],
    latestUpdate: 'HVAC repair verified by Library Supervisor. Unit operational at 22°C.',
    attachments: [],
    internalNotes: [
      { id: 'n-2', author: 'Er. Suresh', date: '20 Sep, 10:16 AM', text: 'Cleaned intake filter and re-pressurized coolant.' }
    ]
  },
  {
    id: 'SC-2026-1844',
    title: 'Cafeteria cleanliness issue',
    student: 'Arjun Kumar',
    studentId: 'SC-STU-2026-031',
    studentEmail: 'arjun.kumar@campus.edu',
    category: 'Cleanliness',
    department: 'Housekeeping',
    priority: 'LOW',
    status: 'Resolved',
    location: 'Central Cafeteria, Counter 3',
    description: 'Spilled beverages and overflowing waste bins near the beverage counter during breakfast hour.',
    submittedAt: '20 Sep 2026, 09:10 AM',
    submittedTimestamp: 1789837800000,
    submittedRelative: '2 hrs ago',
    updatedAt: '1 hr ago',
    aiCategory: 'Cleanliness',
    aiPriority: 'Low',
    aiConfidence: 95,
    keywords: ['cafeteria', 'waste', 'trash', 'hygiene'],
    timeline: [
      { time: '09:10 AM', title: 'Submitted', desc: 'Report logged.' },
      { time: '09:20 AM', title: 'In Progress', desc: 'Housekeeping shift lead alerted.' },
      { time: '09:45 AM', title: 'Resolved', desc: 'Sanitized area and deployed secondary bin.' }
    ],
    latestUpdate: 'Housekeeping supervisor verified sanitation of Dining Hall B.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1843',
    title: 'Bus timing issue on Route 4',
    student: 'Riya Mehta',
    studentId: 'SC-STU-2026-210',
    studentEmail: 'riya.mehta@campus.edu',
    category: 'Transport',
    department: 'Transport',
    priority: 'LOW',
    status: 'Resolved',
    location: 'East Campus Bus Terminal',
    description: 'Route 4 shuttle arrived 35 minutes late without prior dispatch notification.',
    submittedAt: '20 Sep 2026, 08:45 AM',
    submittedTimestamp: 1789836300000,
    submittedRelative: '3 hrs ago',
    updatedAt: '2 hrs ago',
    aiCategory: 'Transport',
    aiPriority: 'Low',
    aiConfidence: 88,
    keywords: ['bus', 'shuttle', 'schedule', 'delay'],
    timeline: [
      { time: '08:45 AM', title: 'Submitted', desc: 'Complaint registered.' },
      { time: '09:00 AM', title: 'Under Review', desc: 'Transport manager checked GPS logs.' },
      { time: '09:30 AM', title: 'Resolved', desc: 'Route 4 backup shuttle scheduled.' }
    ],
    latestUpdate: 'GPS logs confirmed minor tyre inspection delay; backup shuttle assigned.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1842',
    title: 'Power outage in Computer Lab 2',
    student: 'Karan Singh',
    studentId: 'SC-STU-2026-077',
    studentEmail: 'karan.singh@campus.edu',
    category: 'Electricity',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'Under Review',
    location: 'Academic Block 1, Room 204',
    description: 'Sub-circuit breaker tripped during lecture practicals, cutting power to 25 workstations.',
    submittedAt: '20 Sep 2026, 08:21 AM',
    submittedTimestamp: 1789834860000,
    submittedRelative: '3 hrs ago',
    updatedAt: '3 hrs ago',
    aiCategory: 'Electricity',
    aiPriority: 'High',
    aiConfidence: 93,
    keywords: ['power', 'outage', 'lab', 'breaker'],
    timeline: [
      { time: '08:21 AM', title: 'Submitted', desc: 'Report logged by lab student assistant.' },
      { time: '08:30 AM', title: 'Under Review', desc: 'Electrician dispatched to check primary MCB.' }
    ],
    latestUpdate: 'Electrician inspecting distribution board on floor 2.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1841',
    title: 'Security concern near north gate',
    student: 'Vivek Kumar',
    studentId: 'SC-STU-2026-145',
    studentEmail: 'vivek.kumar@campus.edu',
    category: 'Security',
    department: 'Security',
    priority: 'CRITICAL',
    status: 'Assigned',
    location: 'North Gate Perimeter & Bike Stand',
    description: 'Unauthorized persons gathering near perimeter fence; camera unit 6 appears offline.',
    submittedAt: '20 Sep 2026, 08:02 AM',
    submittedTimestamp: 1789833720000,
    submittedRelative: '4 hrs ago',
    updatedAt: '4 hrs ago',
    aiCategory: 'Security',
    aiPriority: 'Critical',
    aiConfidence: 96,
    keywords: ['security', 'perimeter', 'gate', 'camera'],
    timeline: [
      { time: '08:02 AM', title: 'Submitted', desc: 'Emergency flag logged.' },
      { time: '08:05 AM', title: 'Assigned to Security', desc: 'Chief Security Officer notified.' }
    ],
    latestUpdate: 'Patrol dispatched to north boundary; CCTV feed repair initiated.',
    attachments: [],
    internalNotes: [
      { id: 'n-3', author: 'Security Chief', date: '20 Sep, 08:10 AM', text: 'Stationed 2 security guards at North post.' }
    ]
  },
  {
    id: 'SC-2026-1840',
    title: 'Hostel room maintenance request',
    student: 'Simran Kaur',
    studentId: 'SC-STU-2026-092',
    studentEmail: 'simran.kaur@campus.edu',
    category: 'Hostel',
    department: 'Hostel',
    priority: 'MEDIUM',
    status: 'Pending',
    location: 'Hostel Block A, Room 312',
    description: 'Door lock cylinder stuck and window latch broken in room 312.',
    submittedAt: '19 Sep 2026, 06:40 PM',
    submittedTimestamp: 1789785600000,
    submittedRelative: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Hostel',
    aiPriority: 'Medium',
    aiConfidence: 86,
    keywords: ['lock', 'door', 'latch', 'hostel'],
    timeline: [
      { time: '06:40 PM', title: 'Submitted', desc: 'Complaint queued in student hostel portal.' }
    ],
    latestUpdate: 'Awaiting shift carpentry allocation.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1839',
    title: 'Unable to access student portal',
    student: 'Anjali Sharma',
    studentId: 'SC-STU-2026-063',
    studentEmail: 'anjali.sharma@campus.edu',
    category: 'IT / Wi-Fi',
    department: 'IT Support',
    priority: 'MEDIUM',
    status: 'Resolved',
    location: 'Online / ERP Gateway',
    description: 'SSO login loop when attempting to download course registration receipt.',
    submittedAt: '19 Sep 2026, 05:22 PM',
    submittedTimestamp: 1789780920000,
    submittedRelative: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'IT / Wi-Fi',
    aiPriority: 'Medium',
    aiConfidence: 91,
    keywords: ['portal', 'login', 'sso', 'registration'],
    timeline: [
      { time: '05:22 PM', title: 'Submitted', desc: 'Report submitted.' },
      { time: '05:40 PM', title: 'Resolved', desc: 'Account token cache purged by IT administrator.' }
    ],
    latestUpdate: 'SSO session cleared; student confirmed successful portal access.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1838',
    title: 'Water leakage near electrical panel in basement',
    student: 'Vikram Mehta',
    studentId: 'SC-STU-2026-118',
    studentEmail: 'vikram.mehta@campus.edu',
    category: 'Water Supply',
    department: 'Maintenance',
    priority: 'CRITICAL',
    status: 'Pending',
    location: 'Hostel Block B, Basement Electrical Room',
    description: 'Pipe seepage running near the main 415V distribution board. Urgent hazard.',
    submittedAt: '19 Sep 2026, 04:15 PM',
    submittedTimestamp: 1789776900000,
    submittedRelative: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Water Supply',
    aiPriority: 'Critical',
    aiConfidence: 97,
    keywords: ['leakage', 'hazard', 'electrical', 'seepage'],
    timeline: [
      { time: '04:15 PM', title: 'Submitted', desc: 'Urgent ticket flagged.' }
    ],
    latestUpdate: 'Electrical supervisor notified for precautionary power isolation.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1837',
    title: 'Classroom projector bulb blown in LH-2',
    student: 'Divya Nambiar',
    studentId: 'SC-STU-2026-154',
    studentEmail: 'divya.nambiar@campus.edu',
    category: 'Academic',
    department: 'Academics',
    priority: 'MEDIUM',
    status: 'Assigned',
    location: 'Lecture Hall Complex, Hall 2',
    description: 'Epson ceiling projector lamp failure prevents lecture slides from being presented.',
    submittedAt: '19 Sep 2026, 02:10 PM',
    submittedTimestamp: 1789769400000,
    submittedRelative: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Academic',
    aiPriority: 'Medium',
    aiConfidence: 89,
    keywords: ['projector', 'classroom', 'av', 'lamp'],
    timeline: [
      { time: '02:10 PM', title: 'Submitted', desc: 'Complaint registered.' },
      { time: '02:30 PM', title: 'Assigned', desc: 'AV technician scheduled.' }
    ],
    latestUpdate: 'Replacement lamp requisitioned from AV equipment store.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1836',
    title: 'Broken chair and desk in Room 102',
    student: 'Harsh Vardhan',
    studentId: 'SC-STU-2026-072',
    studentEmail: 'harsh.vardhan@campus.edu',
    category: 'Infrastructure',
    department: 'Maintenance',
    priority: 'LOW',
    status: 'In Progress',
    location: 'Science Block, Room 102',
    description: 'Desk armrest broken with sharp wood splinter.',
    submittedAt: '19 Sep 2026, 11:30 AM',
    submittedTimestamp: 1789759800000,
    submittedRelative: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Infrastructure',
    aiPriority: 'Low',
    aiConfidence: 84,
    keywords: ['furniture', 'desk', 'chair', 'broken'],
    timeline: [
      { time: '11:30 AM', title: 'Submitted', desc: 'Report received.' },
      { time: '01:00 PM', title: 'In Progress', desc: 'Carpentry unit scheduled desk swap.' }
    ],
    latestUpdate: 'Replacement student desk queued for delivery.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1835',
    title: 'Drinking water dispenser water filter change required',
    student: 'Shreya Patel',
    studentId: 'SC-STU-2026-188',
    studentEmail: 'shreya.patel@campus.edu',
    category: 'Water Supply',
    department: 'Maintenance',
    priority: 'MEDIUM',
    status: 'Pending',
    location: 'Central Library, 1st Floor Cooler',
    description: 'Filter indicator light is flashing red and water flow rate has slowed down significantly.',
    submittedAt: '19 Sep 2026, 09:40 AM',
    submittedTimestamp: 1789753200000,
    submittedRelative: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Water Supply',
    aiPriority: 'Medium',
    aiConfidence: 90,
    keywords: ['filter', 'drinking', 'water', 'dispenser'],
    timeline: [
      { time: '09:40 AM', title: 'Submitted', desc: 'Complaint registered.' }
    ],
    latestUpdate: 'Awaiting consumable parts issue from maintenance stock.',
    attachments: [],
    internalNotes: []
  },
  {
    id: 'SC-2026-1834',
    title: 'Food quality and temperature in South Mess',
    student: 'Tanmay Joshi',
    studentId: 'SC-STU-2026-202',
    studentEmail: 'tanmay.joshi@campus.edu',
    category: 'Food / Cafeteria',
    department: 'Cafeteria',
    priority: 'HIGH',
    status: 'In Progress',
    location: 'South Campus Dining Mess',
    description: 'Evening dinner served cold with multiple student grievances regarding food hygiene.',
    submittedAt: '18 Sep 2026, 08:50 PM',
    submittedTimestamp: 1789707000000,
    submittedRelative: '2 days ago',
    updatedAt: '1 day ago',
    aiCategory: 'Food / Cafeteria',
    aiPriority: 'High',
    aiConfidence: 94,
    keywords: ['mess', 'food', 'hygiene', 'cafeteria'],
    timeline: [
      { time: '08:50 PM', title: 'Submitted', desc: 'Complaint logged.' },
      { time: '09:15 AM', title: 'In Progress', desc: 'Mess committee inspection conducted.' }
    ],
    latestUpdate: 'Catering manager issued warning notice; warming trays replaced.',
    attachments: [],
    internalNotes: [
      { id: 'n-4', author: 'Dean Student Welfare', date: '19 Sep, 10:00 AM', text: 'Mess committee to perform random audit on 22nd Sep.' }
    ]
  },
  {
    id: 'SC-2026-1833',
    title: 'RFID Turnstile malfunction at Main Entrance',
    student: 'Rohan Deshmukh',
    studentId: 'SC-STU-2026-133',
    studentEmail: 'rohan.deshmukh@campus.edu',
    category: 'Security',
    department: 'Security',
    priority: 'MEDIUM',
    status: 'Resolved',
    location: 'Main Gate Pedestrian Access',
    description: 'Gate 2 card reader failing on student smart cards causing heavy morning queue.',
    submittedAt: '18 Sep 2026, 08:15 AM',
    submittedTimestamp: 1789661700000,
    submittedRelative: '2 days ago',
    updatedAt: '2 days ago',
    aiCategory: 'Security',
    aiPriority: 'Medium',
    aiConfidence: 91,
    keywords: ['rfid', 'turnstile', 'access', 'gate'],
    timeline: [
      { time: '08:15 AM', title: 'Submitted', desc: 'Report logged.' },
      { time: '09:00 AM', title: 'Resolved', desc: 'Optical sensor cleaned and controller rebooted.' }
    ],
    latestUpdate: 'Turnstile reader re-calibrated; traffic flow restored.',
    attachments: [],
    internalNotes: []
  }
];

export const SUMMARY_STATS = {
  total: 248,
  pending: 42,
  underReview: 18,
  inProgress: 67,
  resolved: 139,
};

const STORAGE_KEY = 'smart_campus_admin_complaints';

export function loadAdminComplaints() {
  try {
    const saved = localStorage.getItem('smart_campus_shared_complaints') || localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading admin complaints from localStorage:', err);
  }
  return INITIAL_ADMIN_COMPLAINTS;
}

export function saveAdminComplaints(complaints) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    localStorage.setItem('smart_campus_shared_complaints', JSON.stringify(complaints));
    localStorage.setItem('smart_campus_user_complaints', JSON.stringify(complaints));
    localStorage.setItem('smart_campus_department_complaints', JSON.stringify(complaints));
  } catch (err) {
    console.error('Error saving admin complaints to localStorage:', err);
  }
}

export function resetAdminComplaints() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting admin complaints:', err);
  }
  return INITIAL_ADMIN_COMPLAINTS;
}

export function downloadCSV(data, filename = 'smart_campus_complaints.csv') {
  if (!data || data.length === 0) {
    alert('No complaint data to export.');
    return;
  }

  const headers = [
    'Complaint ID',
    'Title',
    'Student Name',
    'Student ID',
    'Category',
    'Department',
    'Priority',
    'Status',
    'Location',
    'Submitted At',
    'Updated At',
    'Latest Update'
  ];

  const rows = data.map((item) => [
    `"${item.id}"`,
    `"${(item.title || '').replace(/"/g, '""')}"`,
    `"${(item.student || '').replace(/"/g, '""')}"`,
    `"${item.studentId || ''}"`,
    `"${item.category || ''}"`,
    `"${item.department || ''}"`,
    `"${item.priority || ''}"`,
    `"${item.status || ''}"`,
    `"${(item.location || '').replace(/"/g, '""')}"`,
    `"${item.submittedAt || ''}"`,
    `"${item.updatedAt || ''}"`,
    `"${(item.latestUpdate || '').replace(/"/g, '""')}"`
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
}
