// ============================================================================
// Smart Campus System - Admin Analytics & Insights Data
// CGC University Mohali - Institutional Telemetry & Mock Benchmarks
// ============================================================================

export const ANALYTICS_KPIS = [
  {
    id: 'total',
    title: 'Total Complaints',
    value: '1,248',
    rawValue: 1248,
    change: '+12.4%',
    trend: 'up',
    label: 'vs previous period',
    description: 'Total complaints registered across all 8 campus departments',
    color: '#008F63',
    darkColor: '#00A875',
  },
  {
    id: 'resolved',
    title: 'Resolved Complaints',
    value: '738',
    rawValue: 738,
    change: '+18.2%',
    trend: 'up',
    label: 'vs previous period',
    description: 'Complaints successfully inspected and closed by assigned teams',
    color: '#315C3A',
    darkColor: '#43784F',
  },
  {
    id: 'pending',
    title: 'Pending Complaints',
    value: '186',
    rawValue: 186,
    change: '-6.8%',
    trend: 'down',
    label: 'vs previous period',
    description: 'Tickets currently awaiting initial review or department triage',
    color: '#71844A',
    darkColor: '#8CA45C',
  },
  {
    id: 'resolution_time',
    title: 'Average Resolution Time',
    value: '2.8 Days',
    rawValue: 2.8,
    change: '-14.5%',
    trend: 'down',
    label: 'vs previous period',
    description: 'Average turnaround duration from intake to sign-off',
    color: '#D4A84F',
    darkColor: '#E5BF6E',
  },
  {
    id: 'critical',
    title: 'Critical Complaints',
    value: '24',
    rawValue: 24,
    change: '+3.2%',
    trend: 'up',
    label: 'vs previous period',
    description: 'Urgent issues flagged requiring immediate administrative attention',
    color: '#EF4444',
    darkColor: '#F87171',
  },
];

// Weekly Complaint Trend Data (Weeks 1 to 8)
export const WEEKLY_TREND_DATA = [
  { week: 'Week 1', received: 82, resolved: 61, active: 45 },
  { week: 'Week 2', received: 96, resolved: 74, active: 52 },
  { week: 'Week 3', received: 108, resolved: 81, active: 64 },
  { week: 'Week 4', received: 91, resolved: 88, active: 55 },
  { week: 'Week 5', received: 124, resolved: 97, active: 71 },
  { week: 'Week 6', received: 116, resolved: 105, active: 68 },
  { week: 'Week 7', received: 132, resolved: 111, active: 79 },
  { week: 'Week 8', received: 118, resolved: 121, active: 62 },
];

// Status Distribution Data
// Total = 1,248: Resolved (498), In Progress (324), Pending (186), Under Review (142), Assigned (98)
export const STATUS_DISTRIBUTION_DATA = [
  { name: 'Resolved', value: 498, percentage: '39.9%', color: '#008F63', darkColor: '#00A875' },
  { name: 'In Progress', value: 324, percentage: '26.0%', color: '#315C3A', darkColor: '#43784F' },
  { name: 'Pending', value: 186, percentage: '14.9%', color: '#D4A84F', darkColor: '#E5BF6E' },
  { name: 'Under Review', value: 142, percentage: '11.4%', color: '#71844A', darkColor: '#8CA45C' },
  { name: 'Assigned', value: 98, percentage: '7.8%', color: '#60717A', darkColor: '#9FB1BC' },
];

// Priority Distribution Data
// Total = 1,248: Medium (496), Low (382), High (346), Critical (24)
export const PRIORITY_DISTRIBUTION_DATA = [
  { name: 'Medium', value: 496, percentage: '39.7%', color: '#D4A84F', darkColor: '#E5BF6E', badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  { name: 'Low', value: 382, percentage: '30.6%', color: '#71844A', darkColor: '#8CA45C', badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
  { name: 'High', value: 346, percentage: '27.7%', color: '#F97316', darkColor: '#FB923C', badgeClass: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20' },
  { name: 'Critical', value: 24, percentage: '1.9%', color: '#EF4444', darkColor: '#F87171', badgeClass: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20' },
];

// Department-wise Analytics (8 Departments)
export const DEPARTMENT_ANALYTICS_DATA = [
  { department: 'Hostel', total: 245, resolved: 154, pending: 42, inProgress: 49, rate: 62.9, avgDays: 3.4 },
  { department: 'Maintenance', total: 218, resolved: 143, pending: 35, inProgress: 40, rate: 65.6, avgDays: 2.9 },
  { department: 'IT Support', total: 176, resolved: 112, pending: 28, inProgress: 36, rate: 63.6, avgDays: 2.2 },
  { department: 'Academics', total: 164, resolved: 101, pending: 26, inProgress: 37, rate: 61.6, avgDays: 2.6 },
  { department: 'Security', total: 132, resolved: 89, pending: 18, inProgress: 25, rate: 67.4, avgDays: 1.8 },
  { department: 'Transport', total: 118, resolved: 76, pending: 17, inProgress: 25, rate: 64.4, avgDays: 2.5 },
  { department: 'Library', total: 105, resolved: 72, pending: 14, inProgress: 19, rate: 68.6, avgDays: 2.1 },
  { department: 'Cafeteria', total: 90, resolved: 58, pending: 12, inProgress: 20, rate: 64.4, avgDays: 2.7 },
];

// Category Analytics (10 Categories)
export const CATEGORY_ANALYTICS_DATA = [
  { category: 'Infrastructure', count: 214, share: '17.1%', color: '#008F63' },
  { category: 'Water Supply', count: 189, share: '15.1%', color: '#315C3A' },
  { category: 'Electricity', count: 167, share: '13.4%', color: '#71844A' },
  { category: 'Cleanliness', count: 145, share: '11.6%', color: '#D4A84F' },
  { category: 'IT / Wi-Fi', count: 138, share: '11.1%', color: '#0284C7' },
  { category: 'Transport', count: 102, share: '8.2%', color: '#8B5CF6' },
  { category: 'Security', count: 94, share: '7.5%', color: '#10B981' },
  { category: 'Academic', count: 88, share: '7.1%', color: '#F59E0B' },
  { category: 'Hostel', count: 72, share: '5.8%', color: '#EC4899' },
  { category: 'Food', count: 40, share: '3.2%', color: '#64748B' },
];

// Resolution Time Breakdown (Overall + 8 Departments)
export const RESOLUTION_TIME_BREAKDOWN = {
  overall: '2.8 Days',
  departments: [
    { department: 'Security', days: 1.8, benchmark: 'Target: ≤ 2.0d', status: 'optimal', color: '#008F63' },
    { department: 'Library', days: 2.1, benchmark: 'Target: ≤ 2.5d', status: 'optimal', color: '#008F63' },
    { department: 'IT Support', days: 2.2, benchmark: 'Target: ≤ 2.5d', status: 'optimal', color: '#008F63' },
    { department: 'Transport', days: 2.5, benchmark: 'Target: ≤ 3.0d', status: 'good', color: '#71844A' },
    { department: 'Academics', days: 2.6, benchmark: 'Target: ≤ 3.0d', status: 'good', color: '#71844A' },
    { department: 'Cafeteria', days: 2.7, benchmark: 'Target: ≤ 3.0d', status: 'good', color: '#71844A' },
    { department: 'Maintenance', days: 2.9, benchmark: 'Target: ≤ 3.0d', status: 'warning', color: '#D4A84F' },
    { department: 'Hostel', days: 3.4, benchmark: 'Target: ≤ 3.0d', status: 'attention', color: '#F97316' },
  ],
};

// Monthly Performance (Jan to Jun)
export const MONTHLY_PERFORMANCE_DATA = [
  { month: 'January', received: 142, resolved: 118, rate: 83 },
  { month: 'February', received: 158, resolved: 136, rate: 86 },
  { month: 'March', received: 171, resolved: 149, rate: 87 },
  { month: 'April', received: 165, resolved: 142, rate: 86 },
  { month: 'May', received: 182, resolved: 159, rate: 87 },
  { month: 'June', received: 194, resolved: 170, rate: 88 },
];

// AI-Powered Automated Insights
export const AI_INSIGHTS_DATA = [
  {
    id: '01',
    code: 'Insight 01',
    title: 'Water Supply & Hostel Surge',
    description: 'Water supply and hostel-related complaints show increased activity in the selected period.',
    category: 'Pattern Recognition',
    confidence: '94% Confidence',
    priority: 'High',
    impact: '+28% intake cluster',
    actionText: 'Inspect Sector 4 Hostel water pumps and schedule preventative line flush.',
    type: 'warning',
  },
  {
    id: '02',
    code: 'Insight 02',
    title: 'IT / Wi-Fi Connectivity Demands',
    description: 'IT / Wi-Fi complaints represent a significant portion of technical support requests.',
    category: 'Infrastructure',
    confidence: '91% Confidence',
    priority: 'Medium',
    impact: '138 logged incidents',
    actionText: 'Examine central library router firmware and upgrade Block 3 access points.',
    type: 'info',
  },
  {
    id: '03',
    code: 'Insight 03',
    title: 'Priority Distribution Concentration',
    description: 'Most complaints are currently concentrated in Low and Medium priority categories.',
    category: 'Triage Balance',
    confidence: '96% Confidence',
    priority: 'Low',
    impact: '70.3% non-critical volume',
    actionText: 'Routine dispatch protocols are keeping operational SLA queues well within thresholds.',
    type: 'neutral',
  },
  {
    id: '04',
    code: 'Insight 04',
    title: 'Resolution Velocity Improvement',
    description: 'Average resolution time has improved compared with the previous period.',
    category: 'SLA Performance',
    confidence: '93% Confidence',
    priority: 'Positive',
    impact: '-14.5% turnaround reduction',
    actionText: 'Cross-departmental triaging initiatives have shortened average closure by 0.5 days.',
    type: 'success',
  },
];

// Critical Complaints Records
export const CRITICAL_COMPLAINTS_DATA = [
  {
    id: 'SC-2026-1842',
    issue: 'Hostel water leakage',
    department: 'Maintenance',
    category: 'Water Supply',
    priority: 'Critical',
    status: 'In Progress',
    age: '1 day',
    student: 'Amanpreet Singh',
    location: 'Hostel Block B, Room 204',
    assignedStaff: 'Vikram Joshi',
  },
  {
    id: 'SC-2026-1834',
    issue: 'Electrical safety issue',
    department: 'Electricity',
    category: 'Electricity',
    priority: 'Critical',
    status: 'Under Review',
    age: '4 hours',
    student: 'Neha Verma',
    location: 'Engineering Lab 3, 1st Floor',
    assignedStaff: 'Pending Assignment',
  },
  {
    id: 'SC-2026-1821',
    issue: 'Campus security concern',
    department: 'Security',
    category: 'Security',
    priority: 'Critical',
    status: 'Assigned',
    age: '7 hours',
    student: 'Harshdeep Kaur',
    location: 'Main Gate 2 Corridor',
    assignedStaff: 'Sukhdev Singh',
  },
];

// Campus Insights Summary Cards
export const CAMPUS_INSIGHTS_DATA = [
  {
    label: 'Most Reported Category',
    value: 'Hostel',
    subtitle: '72 direct + 189 water/infrastructure tickets',
    badge: 'Category Focus',
    color: '#315C3A',
  },
  {
    label: 'Highest Complaint Volume',
    value: 'Hostel Department',
    subtitle: '245 registered campus complaints (19.6%)',
    badge: 'Highest Queue',
    color: '#D4A84F',
  },
  {
    label: 'Fastest Resolution',
    value: 'Security',
    subtitle: '1.8 Days average resolution turnaround',
    badge: 'Best SLA',
    color: '#008F63',
  },
  {
    label: 'Most Active Priority',
    value: 'Medium',
    subtitle: '496 registered complaints (39.7%)',
    badge: '39.7% of Total',
    color: '#71844A',
  },
  {
    label: 'Most Common Status',
    value: 'Resolved',
    subtitle: '498 officially closed tickets (39.9%)',
    badge: '39.9% Closed',
    color: '#008F63',
  },
];

// CSV Export Helper
export function downloadAnalyticsCSV(activeFilters = {}) {
  const headers = [
    'Metric / Section',
    'Category / Department',
    'Total Value',
    'Resolved / Sub-Value',
    'Rate / Percentage',
    'Benchmark / Note',
  ];

  const rows = [
    ['KPI', 'Total Complaints', '1248', '738', '+12.4%', 'vs previous period'],
    ['KPI', 'Resolved Complaints', '738', '738', '+18.2%', '59.1% overall rate'],
    ['KPI', 'Pending Complaints', '186', '0', '-6.8%', 'Awaiting triage'],
    ['KPI', 'Average Resolution Time', '2.8 Days', '-', '-14.5%', 'Campus benchmark'],
    ['KPI', 'Critical Complaints', '24', '11', '+3.2%', '1.9% of total volume'],
    ...DEPARTMENT_ANALYTICS_DATA.map((d) => [
      'Department Performance',
      d.department,
      d.total,
      d.resolved,
      `${d.rate}%`,
      `Avg: ${d.avgDays} days`,
    ]),
    ...CATEGORY_ANALYTICS_DATA.map((c) => [
      'Category Distribution',
      c.category,
      c.count,
      '-',
      c.share,
      'Campus ticket volume',
    ]),
    ...MONTHLY_PERFORMANCE_DATA.map((m) => [
      'Monthly Trend',
      m.month,
      m.received,
      m.resolved,
      `${m.rate}%`,
      'Resolution rate',
    ]),
    ...CRITICAL_COMPLAINTS_DATA.map((c) => [
      'Critical Ticket',
      c.id,
      c.issue,
      c.department,
      c.status,
      `Age: ${c.age}`,
    ]),
  ];

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.map((cell) => `"${cell}"`).join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `smart_campus_analytics_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
