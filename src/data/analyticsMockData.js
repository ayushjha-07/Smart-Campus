/**
 * Smart Campus Complaint & Analytics System
 * Analytics Dashboard Demo Mock Data
 *
 * NOTE: This dataset contains simulated demo data for frontend visualization
 * and does not represent a real academic institution.
 */

export const METRIC_CARDS_DATA = [
  {
    id: 'total',
    title: 'Total Complaints',
    value: '248',
    change: '+12.5%',
    trend: 'up',
    subtitle: 'Campus-wide demo data',
    color: '#315C3A'
  },
  {
    id: 'resolved',
    title: 'Resolved Complaints',
    value: '139',
    change: '56%',
    trend: 'neutral',
    subtitle: '56% of total',
    color: '#10B981'
  },
  {
    id: 'rate',
    title: 'Resolution Rate',
    value: '56%',
    change: '+8.4%',
    trend: 'up',
    subtitle: 'Institutional efficiency',
    color: '#D4A84F'
  },
  {
    id: 'avg_time',
    title: 'Average Resolution Time',
    value: '18.4 hrs',
    change: '-12%',
    trend: 'down',
    subtitle: 'Faster turnaround',
    color: '#71844A'
  },
  {
    id: 'high_priority',
    title: 'High Priority',
    value: '65',
    change: '26%',
    trend: 'neutral',
    subtitle: '26% of total',
    color: '#F97316'
  },
  {
    id: 'critical',
    title: 'Critical',
    value: '8',
    change: '3.2%',
    trend: 'neutral',
    subtitle: '3.2% of total',
    color: '#EF4444'
  }
];

export const COMPLAINT_TREND_DATA = [
  { date: 'Sep 14', Submitted: 28, Resolved: 19, Active: 62 },
  { date: 'Sep 15', Submitted: 34, Resolved: 24, Active: 68 },
  { date: 'Sep 16', Submitted: 31, Resolved: 22, Active: 71 },
  { date: 'Sep 17', Submitted: 39, Resolved: 27, Active: 78 },
  { date: 'Sep 18', Submitted: 36, Resolved: 31, Active: 76 },
  { date: 'Sep 19', Submitted: 42, Resolved: 35, Active: 73 },
  { date: 'Sep 20', Submitted: 38, Resolved: 41, Active: 70 }
];

export const CATEGORY_DATA = [
  { category: 'Infrastructure', count: 48, percentage: 19.4, color: '#315C3A' },
  { category: 'IT / Wi-Fi', count: 41, percentage: 16.5, color: '#3B82F6' },
  { category: 'Water Supply', count: 36, percentage: 14.5, color: '#06B6D4' },
  { category: 'Cleanliness', count: 31, percentage: 12.5, color: '#71844A' },
  { category: 'Hostel', count: 27, percentage: 10.9, color: '#D4A84F' },
  { category: 'Electricity', count: 24, percentage: 9.7, color: '#F59E0B' },
  { category: 'Academic', count: 18, percentage: 7.3, color: '#8B5CF6' },
  { category: 'Transport', count: 12, percentage: 4.8, color: '#EC4899' },
  { category: 'Security', count: 7, percentage: 2.8, color: '#EF4444' },
  { category: 'Other', count: 4, percentage: 1.6, color: '#A8B3B0' }
];

export const PRIORITY_DATA = [
  { name: 'Low', count: 72, color: '#71844A', percentage: 29.0 },
  { name: 'Medium', count: 103, color: '#D4A84F', percentage: 41.5 },
  { name: 'High', count: 65, color: '#F97316', percentage: 26.2 },
  { name: 'Critical', count: 8, color: '#EF4444', percentage: 3.2 }
];

export const STATUS_DATA = [
  { name: 'Pending', count: 42, color: '#F59E0B', percentage: 16.9 },
  { name: 'Under Review', count: 18, color: '#3B82F6', percentage: 7.3 },
  { name: 'Assigned', count: 24, color: '#8B5CF6', percentage: 9.7 },
  { name: 'In Progress', count: 67, color: '#4ADE80', percentage: 27.0 },
  { name: 'Resolved', count: 97, color: '#10B981', percentage: 39.1 }
];

export const DEPARTMENT_PERFORMANCE_DATA = [
  {
    department: 'Maintenance',
    total: 58,
    pending: 12,
    inProgress: 15,
    resolved: 31,
    resolutionRate: 53,
    avgResolutionHours: 19.2,
    avgResolutionDays: 0.8
  },
  {
    department: 'IT Support',
    total: 41,
    pending: 7,
    inProgress: 9,
    resolved: 25,
    resolutionRate: 61,
    avgResolutionHours: 16.4,
    avgResolutionDays: 0.7
  },
  {
    department: 'Housekeeping',
    total: 36,
    pending: 5,
    inProgress: 8,
    resolved: 23,
    resolutionRate: 64,
    avgResolutionHours: 14.8,
    avgResolutionDays: 0.6
  },
  {
    department: 'Academics',
    total: 29,
    pending: 4,
    inProgress: 7,
    resolved: 18,
    resolutionRate: 62,
    avgResolutionHours: 17.1,
    avgResolutionDays: 0.7
  },
  {
    department: 'Security',
    total: 24,
    pending: 3,
    inProgress: 5,
    resolved: 16,
    resolutionRate: 67,
    avgResolutionHours: 13.6,
    avgResolutionDays: 0.6
  },
  {
    department: 'Transport',
    total: 21,
    pending: 4,
    inProgress: 6,
    resolved: 11,
    resolutionRate: 52,
    avgResolutionHours: 20.2,
    avgResolutionDays: 0.8
  },
  {
    department: 'Library',
    total: 18,
    pending: 3,
    inProgress: 4,
    resolved: 11,
    resolutionRate: 61,
    avgResolutionHours: 15.9,
    avgResolutionDays: 0.7
  },
  {
    department: 'Hostel',
    total: 21,
    pending: 4,
    inProgress: 8,
    resolved: 9,
    resolutionRate: 43,
    avgResolutionHours: 22.5,
    avgResolutionDays: 0.9
  }
];

export const RESOLUTION_TIME_DATA = [
  { department: 'Maintenance', hours: 19.2, days: 0.8 },
  { department: 'IT Support', hours: 16.4, days: 0.7 },
  { department: 'Housekeeping', hours: 14.8, days: 0.6 },
  { department: 'Academics', hours: 17.1, days: 0.7 },
  { department: 'Security', hours: 13.6, days: 0.6 },
  { department: 'Transport', hours: 20.2, days: 0.8 },
  { department: 'Library', hours: 15.9, days: 0.7 },
  { department: 'Hostel', hours: 22.5, days: 0.9 }
];

export const CAMPUS_HOTSPOTS_DATA = [
  {
    id: 'hostel-b',
    name: 'Hostel Block B',
    complaints: 36,
    intensity: 'high',
    primaryCategory: 'Water Supply',
    x: 28, // svg percentage coordinate
    y: 35,
    details: '36 complaints recorded; 68% related to overhead pipeline & water pressure.'
  },
  {
    id: 'academic-block',
    name: 'Academic Block',
    complaints: 29,
    intensity: 'high',
    primaryCategory: 'Wi-Fi / Electricity',
    x: 62,
    y: 32,
    details: '29 complaints; primarily lecture hall projector cabling and AP saturation.'
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    complaints: 21,
    intensity: 'medium',
    primaryCategory: 'Cleanliness',
    x: 48,
    y: 65,
    details: '21 complaints; peak during afternoon rush regarding hygiene and bin emptying.'
  },
  {
    id: 'computer-lab',
    name: 'Computer Lab',
    complaints: 18,
    intensity: 'medium',
    primaryCategory: 'IT / Power',
    x: 75,
    y: 52,
    details: '18 complaints; Lab 2 circuit trips and workstation ethernet drops.'
  },
  {
    id: 'hostel-a',
    name: 'Hostel Block A',
    complaints: 16,
    intensity: 'medium',
    primaryCategory: 'Maintenance',
    x: 18,
    y: 45,
    details: '16 complaints; room window latches and corridor fluorescent lights.'
  },
  {
    id: 'library',
    name: 'Central Library',
    complaints: 14,
    intensity: 'low',
    primaryCategory: 'HVAC / Wi-Fi',
    x: 45,
    y: 22,
    details: '14 complaints; 3rd-floor reading room AC chillers and quiet zone study desks.'
  },
  {
    id: 'main-gate',
    name: 'Main Gate',
    complaints: 11,
    intensity: 'low',
    primaryCategory: 'Security / Transport',
    x: 52,
    y: 88,
    details: '11 complaints; evening RFID barrier delays and Route 4 bus queues.'
  },
  {
    id: 'parking',
    name: 'Parking Area',
    complaints: 9,
    intensity: 'low',
    primaryCategory: 'Lighting / Security',
    x: 82,
    y: 78,
    details: '9 complaints; perimeter solar lamp flicker and visitor zone demarcation.'
  }
];

export const AI_INSIGHTS_DATA = [
  {
    id: 1,
    category: 'Issue Concentration',
    categoryColor: '#06B6D4',
    title: 'Water supply complaints show a higher concentration in hostel-related locations.',
    description: 'Hostel Block B accounts for 68% of all plumbing tickets. Analysis indicates potential pressure drops during peak morning hours.',
    confidence: '94% Match',
    actionableTip: 'Schedule preventive pump maintenance before 6:30 AM.'
  },
  {
    id: 2,
    category: 'Department Trend',
    categoryColor: '#315C3A',
    title: 'Maintenance currently handles the largest complaint workload.',
    description: 'With 58 assigned tickets (23.4% of campus total), Maintenance has the highest queue density but maintains a 19.2 hr average SLA.',
    confidence: '91% Match',
    actionableTip: 'Consider cross-allocating 2 field assistants from Facilities.'
  },
  {
    id: 3,
    category: 'Priority Analysis',
    categoryColor: '#EF4444',
    title: 'Critical complaints represent a small portion of total complaints but require immediate attention.',
    description: '8 active critical issues (3.2%) are currently flagged. 100% of critical items involve electricity or safety hazards.',
    confidence: '96% Match',
    actionableTip: 'Ensure immediate escalation within 30 minutes.'
  },
  {
    id: 4,
    category: 'Trend Detection',
    categoryColor: '#D4A84F',
    title: 'Hostel complaints have increased compared with the previous period.',
    description: 'An uptick of +18% over the past 14 days correlates with the seasonal weather transition and water line usage.',
    confidence: '88% Match',
    actionableTip: 'Hostel wardens should run a joint inspection cycle.'
  },
  {
    id: 5,
    category: 'Resolution Trend',
    categoryColor: '#10B981',
    title: 'Resolution activity has increased during the current reporting period.',
    description: 'Resolved count reached 41 on Sep 20, exceeding the incoming submission velocity of 38, driving active queue count down to 70.',
    confidence: '92% Match',
    actionableTip: 'Queue velocity is positive; continue current operational rhythm.'
  }
];

export const RECURRING_ISSUES_DATA = [
  {
    id: 'issue-1',
    title: 'Water Supply',
    complaints: 36,
    primaryLocation: 'Hostel Block B',
    category: 'Water Supply',
    trend: '+14%',
    severity: 'High',
    status: 'Investigation Open'
  },
  {
    id: 'issue-2',
    title: 'Wi-Fi Connectivity',
    complaints: 29,
    primaryLocation: 'Academic Block',
    category: 'IT / Wi-Fi',
    trend: '+6%',
    severity: 'Medium',
    status: 'Router Upgrades Scheduled'
  },
  {
    id: 'issue-3',
    title: 'Cleanliness',
    complaints: 24,
    primaryLocation: 'Hostel Area',
    category: 'Cleanliness',
    trend: '-4%',
    severity: 'Medium',
    status: 'Housekeeping Route Adjusted'
  },
  {
    id: 'issue-4',
    title: 'Electrical Problems',
    complaints: 21,
    primaryLocation: 'Academic Block',
    category: 'Electricity',
    trend: '+8%',
    severity: 'High',
    status: 'Transformer Checked'
  }
];

export const TOP_ISSUE_DATA = {
  badge: 'Most Reported Issue',
  issue: 'Water Supply',
  count: 36,
  location: 'Hostel Block B',
  observation: 'Hostel Block B appears as the most frequently associated location in the demo dataset.'
};

export const ANALYTICS_ACTIVITY_DATA = [
  {
    id: 'act-1',
    time: 'Today, 11:45 AM',
    title: 'Analytics filters updated',
    desc: 'Administrator customized views for Maintenance & Hostel divisions.',
    actor: 'Administrator',
    tag: 'Configuration'
  },
  {
    id: 'act-2',
    time: 'Today, 08:30 AM',
    title: 'Monthly complaint report generated',
    desc: 'Consolidated campus performance audit exported to CSV format.',
    actor: 'System Scheduler',
    tag: 'Report'
  },
  {
    id: 'act-3',
    time: 'Yesterday, 04:15 PM',
    title: 'Department performance reviewed',
    desc: 'Resolution benchmarks evaluated with Facilities & IT leadership.',
    actor: 'Dean of Operations',
    tag: 'Review'
  },
  {
    id: 'act-4',
    time: 'Yesterday, 01:20 PM',
    title: 'Critical complaint trend identified',
    desc: 'Automated clustering flagged 3 lab power fluctuations.',
    actor: 'AI Pattern Monitor',
    tag: 'AI Insight'
  },
  {
    id: 'act-5',
    time: '2 days ago, 10:00 AM',
    title: 'Complaint category analysis updated',
    desc: 'Re-indexed 248 total complaints across 10 campus departments.',
    actor: 'Operations Lead',
    tag: 'Data Sync'
  }
];

export const FILTER_OPTIONS = {
  dateRanges: [
    'Today',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'This Year',
    'Custom Range'
  ],
  departments: [
    'All Departments',
    'Maintenance',
    'IT Support',
    'Hostel',
    'Academics',
    'Security',
    'Transport',
    'Library',
    'Cafeteria',
    'Housekeeping'
  ],
  categories: [
    'All Categories',
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
  ],
  priorities: [
    'All',
    'Low',
    'Medium',
    'High',
    'Critical'
  ]
};

/**
 * Browser Blob CSV Exporter for Analytics Data
 */
export function exportAnalyticsCSV(activeFilter = {}) {
  const headers = [
    'Department',
    'Total Complaints',
    'Pending',
    'In Progress',
    'Resolved',
    'Resolution Rate (%)',
    'Avg Resolution Time (hrs)'
  ];

  const rows = DEPARTMENT_PERFORMANCE_DATA.map((d) => [
    `"${d.department}"`,
    d.total,
    d.pending,
    d.inProgress,
    d.resolved,
    `${d.resolutionRate}%`,
    `${d.avgResolutionHours} hrs`
  ]);

  // Add Summary metadata rows
  const meta = [
    ['Smart Campus Complaint & Analytics System - Analytics Audit'],
    [`Generated: ${new Date().toLocaleString()}`],
    [`Date Range: ${activeFilter.dateRange || 'Last 7 Days'}`],
    [`Department Filter: ${activeFilter.department || 'All Departments'}`],
    [`Category Filter: ${activeFilter.category || 'All Categories'}`],
    [`Priority Filter: ${activeFilter.priority || 'All'}`],
    ['---'],
    headers
  ];

  const csvContent = meta.map(r => r.join(',')).join('\n') + '\n' + rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `smart_campus_analytics_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
