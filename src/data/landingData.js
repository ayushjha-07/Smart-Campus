export const quickStats = [
  {
    id: 'stat-1',
    value: '24/7',
    label: 'Complaint Access',
    description: 'Round-the-clock digital submission portal',
    badge: 'Always Online'
  },
  {
    id: 'stat-2',
    value: 'AI-Powered',
    label: 'Priority Detection',
    description: 'NLP-based severity classification',
    badge: 'Smart Triage'
  },
  {
    id: 'stat-3',
    value: 'Real-Time',
    label: 'Tracking',
    description: 'Transparent stage-by-stage progression',
    badge: 'Live Status'
  },
  {
    id: 'stat-4',
    value: 'Data-Driven',
    label: 'Insights',
    description: 'Actionable campus resolution metrics',
    badge: 'Analytics'
  }
];

export const problemPoints = [
  {
    id: 'prob-1',
    iconName: 'FileText',
    title: 'Manual Reporting',
    description: 'Forms, emails and office visits make complaint submission inconvenient, time-consuming, and prone to administrative loss.',
    tag: 'Friction'
  },
  {
    id: 'prob-2',
    iconName: 'EyeOff',
    title: 'Poor Visibility',
    description: 'Students often lack clear information about complaint progress, leaving them wondering if their concerns were even acknowledged.',
    tag: 'Lack of Transparency'
  },
  {
    id: 'prob-3',
    iconName: 'Clock',
    title: 'Delayed Resolution',
    description: 'Without centralized prioritization, important complaints may take longer to reach the right department and get resolved.',
    tag: 'Bottleneck'
  }
];

export const workflowSteps = [
  {
    step: 1,
    title: 'Student',
    subtitle: 'Campus Member',
    description: 'Identifies an issue in hostel, lab, academic hall, or campus facilities.',
    iconName: 'UserCheck',
  },
  {
    step: 2,
    title: 'Submit Complaint',
    subtitle: 'Unified Portal',
    description: 'Fills a structured digital form with descriptions and optional attachments.',
    iconName: 'Send',
  },
  {
    step: 3,
    title: 'AI Analysis',
    subtitle: 'NLP Engine',
    description: 'Language model parses intent, extracts location, and detects category tags.',
    iconName: 'Cpu',
  },
  {
    step: 4,
    title: 'Priority Detection',
    subtitle: 'Impact Scorer',
    description: 'Evaluates urgency to flag critical hazards or emergency service requests.',
    iconName: 'AlertTriangle',
  },
  {
    step: 5,
    title: 'Department Routing',
    subtitle: 'Auto Assignment',
    description: 'Automatically routes to designated maintenance or administrative teams.',
    iconName: 'GitMerge',
  },
  {
    step: 6,
    title: 'Resolution',
    subtitle: 'Field Action',
    description: 'Staff addresses the issue on-site and updates proof of resolution.',
    iconName: 'CheckCircle2',
  },
  {
    step: 7,
    title: 'Student Notification',
    subtitle: 'Loop Closed',
    description: 'Real-time alert sent to the student with resolution summary and feedback prompt.',
    iconName: 'BellRing',
  }
];

export const keyFeatures = [
  {
    id: 'feat-1',
    iconName: 'FileEdit',
    title: 'Digital Complaint Submission',
    description: 'A clean, frictionless interface to report issues from anywhere on campus across hostels, classrooms, laboratories, and grounds.',
    category: 'Student Experience',
    accentColor: '#315C3A'
  },
  {
    id: 'feat-2',
    iconName: 'Sparkles',
    title: 'AI Priority Detection',
    description: 'Intelligent natural language processing analyzes complaint urgency, automatically elevating high-impact problems for immediate intervention.',
    category: 'Intelligence',
    accentColor: '#D4A84F'
  },
  {
    id: 'feat-3',
    iconName: 'Network',
    title: 'Automatic Department Routing',
    description: 'Eliminates administrative bottlenecks by routing grievances directly to the appropriate campus department and officer-in-charge.',
    category: 'Operations',
    accentColor: '#71844A'
  },
  {
    id: 'feat-4',
    iconName: 'Compass',
    title: 'Real-Time Tracking',
    description: 'Complete visibility into ticket progress with milestone indicators, technician assignments, and clear estimated resolution timelines.',
    category: 'Transparency',
    accentColor: '#315C3A'
  },
  {
    id: 'feat-5',
    iconName: 'Bell',
    title: 'Smart Notifications',
    description: 'Stay informed every step of the way with instantaneous automated alerts when your complaint is reviewed, dispatched, or resolved.',
    category: 'Communication',
    accentColor: '#D4A84F'
  },
  {
    id: 'feat-6',
    iconName: 'BarChart3',
    title: 'Analytics & Insights',
    description: 'Comprehensive reporting enables university leadership to identify recurring infrastructure bottlenecks and improve campus life systematically.',
    category: 'Administration',
    accentColor: '#71844A'
  }
];

export const aiDemoData = {
  complaintText: "Water supply has stopped in Hostel Block B and students are facing serious difficulty.",
  analysis: {
    category: "Hostel / Infrastructure",
    subCategory: "Plumbing & Water Utilities",
    priority: "HIGH",
    confidence: "91%",
    urgencyScore: 8.8,
    keywords: ["water supply", "hostel", "urgent issue", "Block B", "amenities", "health & sanitation"],
    suggestedRouting: "Department of Campus Works & Civil Maintenance",
    slaTarget: "< 4 Hours"
  }
};

export const trackingDemoData = {
  ticketId: "SC-2026-1847",
  title: "Water Supply Disruption - Hostel Block B",
  category: "Hostel / Infrastructure",
  department: "Campus Facilities & Maintenance",
  assignedOfficer: "Rajesh Sharma (Senior Facilities Engineer)",
  submittedTime: "Today at 09:14 AM",
  lastUpdated: "12 mins ago",
  estimatedResolution: "Today by 01:30 PM",
  steps: [
    { name: 'Submitted', status: 'completed', time: '09:14 AM', note: 'Ticket registered via digital portal' },
    { name: 'Under Review', status: 'completed', time: '09:16 AM', note: 'AI classified as High Priority (91% confidence)' },
    { name: 'Assigned', status: 'completed', time: '09:25 AM', note: 'Dispatched to Campus Facilities & Maintenance' },
    { name: 'In Progress', status: 'active', time: '09:40 AM', note: 'Technicians deployed to pump station valve line' },
    { name: 'Resolved', status: 'pending', time: 'Pending', note: 'Awaiting inspection sign-off and student verification' }
  ]
};

export const benefitsData = {
  students: [
    {
      title: 'Easy Complaint Submission',
      desc: 'Intuitive interface allowing instant ticket creation on mobile or desktop without paperwork or physical office visits.'
    },
    {
      title: 'Real-Time Status Tracking',
      desc: 'Transparent live updates from initial review to completion with direct tracking codes and milestone notifications.'
    },
    {
      title: 'Direct Notifications',
      desc: 'Never wonder about your grievance again with automatic notifications triggered at every administrative step.'
    },
    {
      title: 'Transparent Resolution',
      desc: 'Detailed closeout notes with technician reports and resolution confirmation to ensure issues are genuinely solved.'
    }
  ],
  administrators: [
    {
      title: 'Centralized Complaint Management',
      desc: 'A unified single-pane-of-glass overview across all faculties, residence blocks, utility lines, and academic departments.'
    },
    {
      title: 'Priority-Based Workflow',
      desc: 'Algorithmic urgency sorting ensures critical emergencies and health hazards receive immediate department attention.'
    },
    {
      title: 'Seamless Department Assignment',
      desc: 'Automated ticket hand-offs eliminate bureaucratic ping-pong and establish clear personnel accountability.'
    },
    {
      title: 'Actionable Analytics and Insights',
      desc: 'Historical pattern discovery highlights frequent breakdown hotspots, informing future campus maintenance budgeting.'
    }
  ]
};
