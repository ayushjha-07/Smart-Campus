// Master mock data for Department Dashboard (Step 12)
// Scoped to Maintenance Department (Staff: Rohit Sharma, EMP-MNT-024)

export const DEPARTMENT_STAFF_PROFILE = {
  name: 'Rohit Sharma',
  role: 'Department Staff',
  department: 'Maintenance',
  employeeId: 'EMP-MNT-024',
  email: 'rohit.sharma@campus.edu',
  avatarInitials: 'RS',
};

export const DEPARTMENT_STATS = [
  {
    id: 'assigned',
    title: 'Assigned Complaints',
    value: '42',
    label: 'Total assigned',
    iconName: 'ClipboardList',
    color: '#D4A84F',
    bgColor: 'rgba(212, 168, 79, 0.12)',
    borderAccent: '#D4A84F',
  },
  {
    id: 'pending',
    title: 'Pending Review',
    value: '8',
    label: 'Need attention',
    iconName: 'Clock',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderAccent: '#F59E0B',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    value: '12',
    label: 'Currently active',
    iconName: 'LoaderCircle',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    borderAccent: '#3B82F6',
  },
  {
    id: 'resolved',
    title: 'Resolved',
    value: '22',
    label: 'This month',
    iconName: 'CheckCircle2',
    color: '#315C3A',
    bgColor: 'rgba(49, 92, 58, 0.18)',
    borderAccent: '#315C3A',
  },
  {
    id: 'avg-time',
    title: 'Avg. Resolution Time',
    value: '16.8 hrs',
    label: 'Department average',
    iconName: 'Timer',
    color: '#71844A',
    bgColor: 'rgba(113, 132, 74, 0.15)',
    borderAccent: '#71844A',
  },
];

export const WORKLOAD_DONUT_DATA = [
  { name: 'Pending', value: 8, color: '#F59E0B' },
  { name: 'Under Review', value: 6, color: '#A855F7' },
  { name: 'Assigned', value: 4, color: '#06B6D4' },
  { name: 'In Progress', value: 12, color: '#3B82F6' },
  { name: 'Resolved', value: 22, color: '#315C3A' },
];

export const COMPLAINT_ACTIVITY_DATA = [
  { day: 'Mon', assigned: 7, resolved: 4 },
  { day: 'Tue', assigned: 9, resolved: 6 },
  { day: 'Wed', assigned: 5, resolved: 7 },
  { day: 'Thu', assigned: 8, resolved: 5 },
  { day: 'Fri', assigned: 10, resolved: 8 },
  { day: 'Sat', assigned: 4, resolved: 6 },
  { day: 'Sun', assigned: 3, resolved: 5 },
];

export const INITIAL_DEPARTMENT_COMPLAINTS = [
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
    submittedAt: '20 September 2026, 10:32 AM',
    assignedAt: '10 min ago',
    updatedAt: '10 min ago',
    aiCategory: 'Water Supply',
    aiPriority: 'High',
    aiConfidence: 92,
    keywords: ['water', 'supply', 'hostel', 'interruption'],
    timeline: [
      { time: '10:32 AM', title: 'Submitted', desc: 'Complaint registered by student.' },
      { time: '10:40 AM', title: 'Under Review', desc: 'Auto-triaged by system.' },
      { time: '11:05 AM', title: 'Assigned to Maintenance', desc: 'Assigned to Shift Lead Er. Rohit Sharma.' },
      { time: '12:45 PM', title: 'In Progress', desc: 'Maintenance team dispatched to inspect valve.' },
      { time: 'Pending', title: 'Resolution', desc: 'Work underway.' }
    ],
    latestUpdate: 'Maintenance team has been notified and is inspecting the water supply line.',
    internalNotes: [
      { id: 'n-1', author: 'Rohit Sharma', date: '20 Sep, 11:15 AM', text: 'Main pump house valve checked; pressure regulator needs seal replacement.' }
    ]
  },
  {
    id: 'SC-2026-1842',
    title: 'Power outage in Computer Lab',
    student: 'Karan Singh',
    studentId: 'SC-STU-2026-077',
    studentEmail: 'karan.singh@campus.edu',
    category: 'Electricity',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'Under Review',
    location: 'Computer Lab, Academic Block 1',
    description: 'Sub-circuit breaker tripped during lecture practicals, cutting power to 25 workstations.',
    submittedAt: '20 September 2026, 08:21 AM',
    assignedAt: '3 hrs ago',
    updatedAt: '3 hrs ago',
    aiCategory: 'Electricity',
    aiPriority: 'High',
    aiConfidence: 93,
    keywords: ['power', 'outage', 'lab', 'breaker'],
    timeline: [
      { time: '08:21 AM', title: 'Submitted', desc: 'Reported by lab assistant.' },
      { time: '08:35 AM', title: 'Under Review', desc: 'Maintenance electrician triaging circuit load.' }
    ],
    latestUpdate: 'Electrician inspecting distribution board on floor 2.',
    internalNotes: []
  },
  {
    id: 'SC-2026-1831',
    title: 'Water leakage near Academic Block',
    student: 'Amitabh Sen',
    studentId: 'SC-STU-2026-049',
    studentEmail: 'amitabh.sen@campus.edu',
    category: 'Water Supply',
    department: 'Maintenance',
    priority: 'CRITICAL',
    status: 'Pending',
    location: 'Academic Block, Ground Floor Corridors',
    description: 'Overhead seepage leaking onto terrazzo walkway causing slippery hazard near lecture hall 4.',
    submittedAt: '19 September 2026, 04:50 PM',
    assignedAt: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Water Supply',
    aiPriority: 'Critical',
    aiConfidence: 96,
    keywords: ['leakage', 'academic', 'hazard', 'seepage'],
    timeline: [
      { time: 'Yesterday', title: 'Submitted', desc: 'Urgent ticket logged.' },
      { time: 'Yesterday', title: 'Assigned to Maintenance', desc: 'Shift technician queued.' }
    ],
    latestUpdate: 'Awaiting specialized joint sealant delivery.',
    internalNotes: []
  },
  {
    id: 'SC-2026-1826',
    title: 'Broken classroom fan in Block A Room 201',
    student: 'Pooja Nair',
    studentId: 'SC-STU-2026-104',
    studentEmail: 'pooja.nair@campus.edu',
    category: 'Infrastructure',
    department: 'Maintenance',
    priority: 'MEDIUM',
    status: 'Assigned',
    location: 'Block A, Room 201',
    description: 'Ceiling fan regulator sparking and blade wobble during lectures.',
    submittedAt: '19 September 2026, 02:15 PM',
    assignedAt: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Infrastructure',
    aiPriority: 'Medium',
    aiConfidence: 87,
    keywords: ['fan', 'classroom', 'electrical', 'regulator'],
    timeline: [
      { time: 'Yesterday', title: 'Submitted', desc: 'Report received.' },
      { time: 'Yesterday', title: 'Assigned to Maintenance', desc: 'Routed to electrician roster.' }
    ],
    latestUpdate: 'Assigned to technician Manoj Kumar for afternoon shift.',
    internalNotes: []
  },
  {
    id: 'SC-2026-1819',
    title: 'Damaged washroom tap in Hostel Block A',
    student: 'Gaurav Das',
    studentId: 'SC-STU-2026-081',
    studentEmail: 'gaurav.das@campus.edu',
    category: 'Water Supply',
    department: 'Maintenance',
    priority: 'LOW',
    status: 'Resolved',
    location: 'Hostel Block A, 1st Floor Washroom',
    description: 'Washbasin faucet broken at threaded neck, causing slow continuous drip.',
    submittedAt: '18 September 2026, 09:30 AM',
    assignedAt: '2 days ago',
    updatedAt: '2 days ago',
    aiCategory: 'Water Supply',
    aiPriority: 'Low',
    aiConfidence: 89,
    keywords: ['tap', 'faucet', 'washroom', 'plumbing'],
    timeline: [
      { time: '2 days ago', title: 'Submitted', desc: 'Complaint registered.' },
      { time: '2 days ago', title: 'Assigned to Maintenance', desc: 'Plumber dispatched.' },
      { time: '2 days ago', title: 'In Progress', desc: 'Replaced brass bibcock.' },
      { time: '2 days ago', title: 'Resolved', desc: 'Verified by hostel caretaker.' }
    ],
    latestUpdate: 'New chrome faucet installed; zero leakage verified.',
    internalNotes: [
      { id: 'n-2', author: 'Rohit Sharma', date: '18 Sep, 02:30 PM', text: 'Replaced with heavy-duty quarter-turn tap from inventory.' }
    ]
  },
  {
    id: 'SC-2026-1845',
    title: 'Library AC not working and leaking water',
    student: 'Neha Gupta',
    studentId: 'SC-STU-2026-055',
    studentEmail: 'neha.gupta@campus.edu',
    category: 'Infrastructure',
    department: 'Maintenance',
    priority: 'HIGH',
    status: 'Resolved',
    location: 'Main Library, 1st Floor Digital Lab',
    description: 'AC unit making heavy noise and condensation overflowing onto desk.',
    submittedAt: '20 September 2026, 09:31 AM',
    assignedAt: '3 hrs ago',
    updatedAt: '1 hr ago',
    aiCategory: 'Infrastructure',
    aiPriority: 'High',
    aiConfidence: 94,
    keywords: ['ac', 'cooling', 'hvac', 'drainage'],
    timeline: [
      { time: '09:31 AM', title: 'Submitted', desc: 'Complaint logged.' },
      { time: '09:40 AM', title: 'Assigned to Maintenance', desc: 'HVAC crew deployed.' },
      { time: '10:15 AM', title: 'Resolved', desc: 'Drain pipe cleared and filter replaced.' }
    ],
    latestUpdate: 'Drain pipe cleared; digital lab ambient temperature 22°C.',
    internalNotes: []
  },
  {
    id: 'SC-2026-1835',
    title: 'Water dispenser filter replacement required',
    student: 'Shreya Patel',
    studentId: 'SC-STU-2026-188',
    studentEmail: 'shreya.patel@campus.edu',
    category: 'Water Supply',
    department: 'Maintenance',
    priority: 'MEDIUM',
    status: 'Resolved',
    location: 'Central Library, 1st Floor Cooler',
    description: 'Red filter warning light blinking and low output flow.',
    submittedAt: '19 September 2026, 09:40 AM',
    assignedAt: 'Yesterday',
    updatedAt: 'Yesterday',
    aiCategory: 'Water Supply',
    aiPriority: 'Medium',
    aiConfidence: 90,
    keywords: ['filter', 'drinking', 'water', 'dispenser'],
    timeline: [
      { time: 'Yesterday', title: 'Submitted', desc: 'Report logged.' },
      { time: 'Yesterday', title: 'Resolved', desc: 'RO membrane and sediment filter replaced.' }
    ],
    latestUpdate: 'Filter cartridge changed and TDS water purity tested at 78 ppm.',
    internalNotes: []
  }
];

export const DEPARTMENT_PERFORMANCE_METRICS = {
  resolutionRate: 52,
  averageResolution: '16.8 hrs',
  activeComplaints: 20,
  resolvedThisMonth: 22,
};

export const DEPARTMENT_INSIGHTS = [
  {
    id: 'ins-1',
    title: 'Water supply complaints represent the highest workload this week.',
    category: 'Workload Concentration',
    severity: 'warning',
  },
  {
    id: 'ins-2',
    title: 'Average resolution time has improved compared with the previous period.',
    category: 'Resolution Velocity',
    severity: 'positive',
  },
  {
    id: 'ins-3',
    title: '3 high-priority complaints are currently active.',
    category: 'Urgent Action Alert',
    severity: 'critical',
  },
];

export const DEPARTMENT_RECENT_ACTIVITY = [
  {
    id: 'act-1',
    time: '10:32 AM',
    text: 'SC-2026-1848 moved to In Progress',
    type: 'progress',
  },
  {
    id: 'act-2',
    time: '09:45 AM',
    text: 'SC-2026-1842 assigned to Maintenance',
    type: 'assignment',
  },
  {
    id: 'act-3',
    time: '09:12 AM',
    text: 'SC-2026-1835 marked as Resolved',
    type: 'resolved',
  },
  {
    id: 'act-4',
    time: 'Yesterday',
    text: 'Progress update added to SC-2026-1831',
    type: 'update',
  },
  {
    id: 'act-5',
    time: 'Yesterday',
    text: 'New complaint assigned to Maintenance',
    type: 'assignment',
  },
];

export const DEPARTMENT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New high-priority complaint assigned',
    ticketId: 'SC-2026-1848',
    time: '10 min ago',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Complaint requires status update',
    ticketId: 'SC-2026-1842',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Student added additional information',
    ticketId: 'SC-2026-1831',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 'notif-4',
    title: 'Complaint resolved successfully',
    ticketId: 'SC-2026-1835',
    time: 'Yesterday',
    unread: false,
  },
];

const STORAGE_KEY = 'smart_campus_department_complaints';

export function loadDepartmentComplaints() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const shared = localStorage.getItem('smart_campus_shared_complaints');
    
    let baseList = INITIAL_DEPARTMENT_COMPLAINTS;
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        baseList = parsed;
      }
    }
    
    if (shared) {
      const parsedShared = JSON.parse(shared);
      if (Array.isArray(parsedShared) && parsedShared.length > 0) {
        // Find newly added items not yet in baseList
        const existingIds = new Set(baseList.map((item) => item.id));
        const newForDept = parsedShared
          .filter(
            (item) =>
              !existingIds.has(item.id) &&
              (!item.department ||
                item.department === 'Maintenance' ||
                item.category === 'Water Supply' ||
                item.category === 'Electricity' ||
                item.category === 'Infrastructure')
          )
          .map((item) => ({
            ...item,
            student: item.student || 'Student Reporter',
            department: item.department || 'Maintenance',
            timeline: item.timeline || [
              { time: 'Just now', title: 'Submitted', desc: 'Complaint registered by student.' }
            ],
            internalNotes: item.internalNotes || []
          }));
        
        if (newForDept.length > 0) {
          return [...newForDept, ...baseList];
        }
      }
    }
    return baseList;
  } catch (err) {
    console.error('Error loading department complaints from storage:', err);
  }
  return INITIAL_DEPARTMENT_COMPLAINTS;
}

export function saveDepartmentComplaints(complaints) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    const sharedRaw = localStorage.getItem('smart_campus_shared_complaints');
    if (sharedRaw) {
      const sharedList = JSON.parse(sharedRaw);
      const updatedMap = new Map(complaints.map((c) => [c.id, c]));
      const nextShared = sharedList.map((item) => {
        if (updatedMap.has(item.id)) {
          const deptVer = updatedMap.get(item.id);
          return {
            ...item,
            status: deptVer.status || item.status,
            priority: deptVer.priority || item.priority,
            latestUpdate: deptVer.latestUpdate || item.latestUpdate,
            resolutionNote: deptVer.resolutionNote || item.resolutionNote
          };
        }
        return item;
      });
      localStorage.setItem('smart_campus_shared_complaints', JSON.stringify(nextShared));
      localStorage.setItem('smart_campus_admin_complaints', JSON.stringify(nextShared));
      localStorage.setItem('smart_campus_user_complaints', JSON.stringify(nextShared));
    }
  } catch (err) {
    console.error('Error saving department complaints to storage:', err);
  }
}
