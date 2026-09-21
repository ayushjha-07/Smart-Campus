/**
 * Smart Campus Assistant Knowledge Base & Natural Language Response Engine
 * Provides context-aware answers, complaint lookups, priority explanations,
 * department routing, and functional navigation actions.
 */

export const QUICK_ACTION_PROMPTS = [
  { id: 'submit', label: 'Submit a Complaint', icon: 'PlusCircle' },
  { id: 'track', label: 'Track My Complaint', icon: 'Clock' },
  { id: 'notifications', label: 'Check Notifications', icon: 'Bell' },
  { id: 'faqs', label: 'Complaint FAQs', icon: 'HelpCircle' },
  { id: 'support', label: 'Contact Support', icon: 'PhoneCall' }
];

export const PRIORITY_DEFINITIONS = {
  CRITICAL: {
    name: 'Critical Priority',
    sla: '2–4 hours',
    desc: 'Immediate hazards, campus-wide power outages, severe water leaks, or security issues that halt campus operations.',
    color: '#EF4444'
  },
  HIGH: {
    name: 'High Priority',
    sla: '12–24 hours',
    desc: 'Issues that significantly affect students or campus operations, such as hostel water supply, block-wide Wi-Fi outages, or broken lab equipment.',
    color: '#F97316'
  },
  MEDIUM: {
    name: 'Medium Priority',
    sla: '24–48 hours',
    desc: 'Standard maintenance items like classroom projector glitches, broken furniture, or minor facility repairs.',
    color: '#EAB308'
  },
  LOW: {
    name: 'Low Priority',
    sla: '3–5 days',
    desc: 'Minor cosmetic repairs, routine suggestions, or non-urgent maintenance requests.',
    color: '#10B981'
  }
};

/**
 * Generate assistant responses based on student input and live application context
 */
export function generateChatbotResponse(userText, context = {}) {
  const query = userText.trim().toLowerCase();
  const { complaints = [], notifications = [] } = context;

  // 1. How do I submit a complaint?
  if (
    query.includes('how do i submit') ||
    query.includes('how to submit') ||
    query.includes('file a complaint') ||
    query.includes('report an issue') ||
    query.includes('new complaint') ||
    query === 'submit a complaint'
  ) {
    return {
      text: 'You can submit a complaint from the Submit Complaint section. Choose the category, describe the issue, add the location, and submit it for review.',
      actions: [
        { label: '+ Submit Complaint', route: '/student/complaints/new', primary: true },
        { label: 'View My Complaints', route: '/student/complaints' }
      ]
    };
  }

  // 2. Where is my complaint? / Track my complaint / Status of complaint
  if (
    query.includes('where is my complaint') ||
    query.includes('track my complaint') ||
    query.includes('track complaint') ||
    query.includes('complaint status') ||
    query.includes('my complaints') ||
    query.includes('recent complaints') ||
    query === 'track my complaint'
  ) {
    // Provide sample or user's top recent complaints
    const sampleComplaints = complaints.length > 0 ? complaints.slice(0, 3) : [
      {
        id: 'SC-2026-1848',
        title: 'Water supply issue in Hostel Block B',
        category: 'Water Supply',
        status: 'In Progress',
        priority: 'HIGH',
        department: 'Maintenance'
      },
      {
        id: 'SC-2026-1839',
        title: 'Wi-Fi connectivity issue in Central Library',
        category: 'IT / Wi-Fi',
        status: 'Under Review',
        priority: 'HIGH',
        department: 'IT Support'
      },
      {
        id: 'SC-2026-1845',
        title: 'Classroom 302 projector flickering',
        category: 'Infrastructure',
        status: 'Resolved',
        priority: 'MEDIUM',
        department: 'Maintenance'
      }
    ];

    return {
      text: 'Sure! I can help you track your complaints. Here are your active and recent filings:',
      complaints: sampleComplaints,
      actions: [
        { label: 'View All My Complaints', route: '/student/complaints', primary: true },
        { label: '+ File Another Complaint', route: '/student/complaints/new' }
      ]
    };
  }

  // 3. Specific Complaint ID Lookup (e.g. SC-2026-1848 or 1848)
  const idMatch = query.match(/(?:sc-)?(?:2026-)?(\d{4})/i);
  if (idMatch && (query.includes('sc-') || query.includes('status') || query.includes('complaint'))) {
    const searchId = idMatch[1];
    const found = complaints.find(c => c.id && c.id.includes(searchId));
    if (found) {
      return {
        text: `Here are the live tracking details for complaint **${found.id}**:`,
        complaints: [found],
        actions: [
          { label: 'Open Complaint Details', route: `/student/complaints/${found.id}`, primary: true },
          { label: 'View All Complaints', route: '/student/complaints' }
        ]
      };
    }
  }

  // 4. Priority questions (What does High priority mean?)
  if (
    query.includes('priority') ||
    query.includes('high priority') ||
    query.includes('critical priority') ||
    query.includes('sla')
  ) {
    if (query.includes('critical')) {
      return {
        text: `**Critical Priority** indicates an immediate emergency or safety hazard (such as total power failure or flood). It carries the fastest resolution target of **${PRIORITY_DEFINITIONS.CRITICAL.sla}**.`,
        actions: [{ label: 'Contact Emergency Support', route: '/student/help-support', primary: true }]
      };
    }
    return {
      text: 'High priority indicates an issue that may significantly affect students or campus operations and should receive faster attention.\n\nHere is a quick overview of priority levels:\n• **CRITICAL**: Urgent safety or infrastructure failure (SLA: 2–4 hrs)\n• **HIGH**: Substantial disruption to hostels, Wi-Fi, or classes (SLA: 12–24 hrs)\n• **MEDIUM**: Standard facility repair or equipment issue (SLA: 24–48 hrs)\n• **LOW**: Minor cosmetic or non-urgent request (SLA: 3–5 days)',
      actions: [
        { label: 'Submit High Priority Complaint', route: '/student/complaints/new', primary: true },
        { label: 'Read All FAQs', route: '/student/help-support' }
      ]
    };
  }

  // 5. Notifications
  if (
    query.includes('notification') ||
    query.includes('alert') ||
    query.includes('updates') ||
    query === 'check notifications'
  ) {
    const unreadList = notifications.filter(n => n.unread);
    const count = unreadList.length;
    return {
      text: count > 0 
        ? `You have **${count} unread notification${count > 1 ? 's' : ''}** regarding your complaint updates and campus maintenance alerts.`
        : 'You are all caught up! There are no unread notifications right now.',
      actions: [
        { label: 'Open Notifications', route: '/student/notifications', primary: true },
        { label: 'Go to Dashboard', route: '/student/dashboard' }
      ]
    };
  }

  // 6. FAQs
  if (
    query.includes('faq') ||
    query.includes('frequently asked') ||
    query.includes('questions') ||
    query === 'complaint faqs'
  ) {
    return {
      text: 'Here are answers to the most common Smart Campus questions:\n\n• **How long does resolution take?**\nStandard complaints are reviewed within 24 hours and addressed within 24–48 hours.\n\n• **Can I add updates to my complaint?**\nYes! Navigate to Complaint Details to post notes and view real-time department history.\n\n• **Who assigns the department?**\nOur automated AI triage routes each filing to the appropriate campus office (Maintenance, IT, Hostel, etc.).',
      actions: [
        { label: 'Visit Help & Support Hub', route: '/student/help-support', primary: true },
        { label: 'Submit a Complaint', route: '/student/complaints/new' }
      ]
    };
  }

  // 7. Profile / Account
  if (
    query.includes('profile') ||
    query.includes('account') ||
    query.includes('student id') ||
    query.includes('change password') ||
    query.includes('my details')
  ) {
    return {
      text: 'You can review and update your personal info, academic details (B.Tech CSE, Year 4), emergency contacts, and account security preferences in your Student Profile.',
      actions: [
        { label: 'Open Student Profile', route: '/student/profile', primary: true },
        { label: 'Dashboard', route: '/student/dashboard' }
      ]
    };
  }

  // 8. Contact Support / Help
  if (
    query.includes('contact') ||
    query.includes('support') ||
    query.includes('help desk') ||
    query.includes('phone') ||
    query.includes('call') ||
    query === 'contact support'
  ) {
    return {
      text: 'The campus support team is available 24/7. Key contacts:\n\n• **Campus Control Room**: +91 172 5070 000 (Ext. 101)\n• **Hostel Warden Office**: +91 172 5070 112 (Ext. 204)\n• **IT Helpdesk**: itsupport@cgc.edu.in\n• **Medical Emergency**: +91 172 5070 108',
      actions: [
        { label: 'Open Help & Support Page', route: '/student/help-support', primary: true },
        { label: 'Report Incident', route: '/student/complaints/new' }
      ]
    };
  }

  // 9. Dashboard navigation
  if (query.includes('dashboard') || query.includes('home page') || query === 'dashboard') {
    return {
      text: 'You can view your active grievances, quick stats, complaint metrics, and recent activity from your Student Dashboard.',
      actions: [
        { label: 'Go to Student Dashboard', route: '/student/dashboard', primary: true }
      ]
    };
  }

  // 10. Specific Category Queries (Wi-Fi, Water, Electricity, Hostel, Mess, Library)
  if (query.includes('wifi') || query.includes('wi-fi') || query.includes('internet')) {
    return {
      text: 'Wi-Fi issues are routed directly to the **IT Support Team**. If you are experiencing outages in hostels or labs, please submit a complaint with your exact block and floor number.',
      actions: [
        { label: 'Report Wi-Fi Issue', route: '/student/complaints/new', primary: true },
        { label: 'View IT Support FAQ', route: '/student/help-support' }
      ]
    };
  }

  if (query.includes('water') || query.includes('leak') || query.includes('tap') || query.includes('plumbing')) {
    return {
      text: 'Water supply and plumbing complaints are managed by **Campus Maintenance**. For emergency hostel overflows, contact the control room or submit a high-priority ticket.',
      actions: [
        { label: 'Report Water Issue', route: '/student/complaints/new', primary: true },
        { label: 'Emergency Contacts', route: '/student/help-support' }
      ]
    };
  }

  if (query.includes('electricity') || query.includes('power') || query.includes('light') || query.includes('fan')) {
    return {
      text: 'Electrical issues are dispatched to the **Electrical & Maintenance Department**. Power outages are treated with expedited priority.',
      actions: [
        { label: 'Report Electrical Issue', route: '/student/complaints/new', primary: true }
      ]
    };
  }

  if (query.includes('hostel') || query.includes('room') || query.includes('mess') || query.includes('food')) {
    return {
      text: 'Hostel and cafeteria grievances are triaged to the **Hostel Administration & Food Safety Committee**. Please specify your hostel block and room number for rapid response.',
      actions: [
        { label: 'Submit Hostel Complaint', route: '/student/complaints/new', primary: true },
        { label: 'Contact Warden', route: '/student/help-support' }
      ]
    };
  }

  // 11. Polite greetings
  if (query === 'hi' || query === 'hello' || query === 'hey' || query.startsWith('good morning') || query.startsWith('good afternoon')) {
    return {
      text: 'Hello Ayush! How can I assist you with your Smart Campus experience today? You can ask me about complaints, tracking, priorities, notifications, or portal navigation.',
      actions: [
        { label: 'Submit a Complaint', route: '/student/complaints/new', primary: true },
        { label: 'Track My Complaints', route: '/student/complaints' }
      ]
    };
  }

  // 12. Fallback response as required by user prompt
  return {
    text: 'I’m not able to answer that yet. You can contact Campus Support for assistance.',
    actions: [
      { label: 'Contact Support', route: '/student/help-support', primary: true },
      { label: 'Submit a Complaint', route: '/student/complaints/new' },
      { label: 'Complaint FAQs', route: '/student/help-support' }
    ]
  };
}
