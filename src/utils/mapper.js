/**
 * Smart Campus API Response Mapper Utilities
 * Normalizes backend response models to keep frontend components stable, consistent, and backward compatible.
 */
import { formatDate, formatRelativeTime, formatDateTime } from './date';

/**
 * Normalizes status string into title case for frontend UI display.
 * e.g. "IN_PROGRESS" -> "In Progress", "UNDER_REVIEW" -> "Under Review", "RESOLVED" -> "Resolved"
 */
export function normalizeStatus(status) {
  if (!status) return 'Submitted';
  const s = String(status).toUpperCase();
  switch (s) {
    case 'PENDING':
      return 'Submitted';
    case 'UNDER_REVIEW':
      return 'Under Review';
    case 'ASSIGNED':
      return 'Assigned';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'RESOLVED':
      return 'Resolved';
    case 'CLOSED':
      return 'Closed';
    case 'REJECTED':
      return 'Rejected';
    default:
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
}

/**
 * Maps frontend display status back to backend enum uppercase string.
 * e.g. "In Progress" -> "IN_PROGRESS"
 */
export function denormalizeStatus(status) {
  if (!status) return 'PENDING';
  const s = String(status).trim();
  switch (s.toLowerCase()) {
    case 'submitted':
    case 'pending':
      return 'PENDING';
    case 'under review':
    case 'under_review':
      return 'UNDER_REVIEW';
    case 'assigned':
      return 'ASSIGNED';
    case 'in progress':
    case 'in_progress':
      return 'IN_PROGRESS';
    case 'resolved':
      return 'RESOLVED';
    case 'closed':
      return 'CLOSED';
    case 'rejected':
      return 'REJECTED';
    default:
      return s.toUpperCase().replace(/\s+/g, '_');
  }
}

/**
 * Maps raw backend complaint entity to frontend component model.
 */
export function mapComplaint(item) {
  if (!item) return null;

  const rawId = item.id;
  const complaintNumber = item.complaint_number || item.id;
  const statusFormatted = normalizeStatus(item.status);
  const priorityFormatted = (item.priority || 'MEDIUM').toUpperCase();

  // Normalize attachments
  const attachments = (item.attachments || []).map((a) => {
    let fileUrl = a.file_path || '';
    if (fileUrl && !fileUrl.startsWith('http') && !fileUrl.startsWith('blob:')) {
      fileUrl = fileUrl.startsWith('/') ? `http://localhost:8000${fileUrl}` : `http://localhost:8000/${fileUrl}`;
    }
    return {
      id: a.id,
      fileName: a.file_name,
      name: a.file_name,
      filePath: fileUrl,
      url: fileUrl,
      fileType: a.file_type,
      fileSize: a.file_size,
      size: a.file_size ? `${Math.round(a.file_size / 1024)} KB` : '1 MB',
      createdAt: a.created_at,
      hasImage: Boolean(a.file_type && a.file_type.startsWith('image/'))
    };
  });

  const firstAttachment = attachments.length > 0 ? attachments[0] : null;

  // Compute resolution progress based on status
  let resolutionProgress = 20;
  const sUpper = (item.status || 'PENDING').toUpperCase();
  if (sUpper === 'PENDING') resolutionProgress = 20;
  else if (sUpper === 'UNDER_REVIEW') resolutionProgress = 40;
  else if (sUpper === 'ASSIGNED') resolutionProgress = 60;
  else if (sUpper === 'IN_PROGRESS') resolutionProgress = 80;
  else if (sUpper === 'RESOLVED' || sUpper === 'CLOSED') resolutionProgress = 100;
  else if (sUpper === 'REJECTED') resolutionProgress = 100;

  // Build 5-stage complaint timeline
  const stageOrder = ['PENDING', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
  const currentStageIndex = stageOrder.indexOf(sUpper) !== -1 ? stageOrder.indexOf(sUpper) : 1;

  const stageTitles = [
    { step: '01', title: 'Submitted', desc: 'Complaint submitted successfully.' },
    { step: '02', title: 'Under Review', desc: 'Complaint reviewed by campus authorities.' },
    { step: '03', title: 'Assigned', desc: `Assigned to ${item.department_name || 'Maintenance Department'}.` },
    { step: '04', title: 'In Progress', desc: 'Work order dispatched and resolution actively in progress.' },
    { step: '05', title: 'Resolved', desc: 'Issue resolved and verified by department supervisor.' }
  ];

  const fullTimeline = stageTitles.map((stg, idx) => {
    let stageStatus = 'pending';
    if (idx < currentStageIndex) {
      stageStatus = 'completed';
    } else if (idx === currentStageIndex) {
      stageStatus = sUpper === 'RESOLVED' || sUpper === 'CLOSED' ? 'completed' : 'current';
    } else {
      stageStatus = 'pending';
    }

    return {
      step: stg.step,
      title: stg.title,
      date: idx <= currentStageIndex ? formatDate(item.submitted_at) : 'Pending',
      time: idx <= currentStageIndex ? '' : '',
      description: stg.desc,
      status: stageStatus
    };
  });

  // Chronological status history
  const statusHistory = (item.updates || []).map((u) => ({
    id: u.id,
    dateTime: formatDateTime(u.created_at),
    status: normalizeStatus(u.status),
    updatedBy: u.updated_by_name || 'Department Staff',
    remarks: u.message || '',
    isInternal: Boolean(u.is_internal)
  }));

  if (statusHistory.length === 0) {
    statusHistory.push({
      id: 'init',
      dateTime: formatDateTime(item.submitted_at),
      status: 'Submitted',
      updatedBy: item.student_name || 'Complainant Student',
      remarks: 'Initial complaint ticket created.'
    });
  }

  // Latest verified update
  const nonInternalUpdates = (item.updates || []).filter(u => !u.is_internal);
  const lastUpdate = nonInternalUpdates.length > 0 
    ? nonInternalUpdates[nonInternalUpdates.length - 1]
    : (item.updates && item.updates.length > 0 ? item.updates[item.updates.length - 1] : null);

  const latestUpdateObj = lastUpdate ? {
    text: lastUpdate.message,
    updatedAt: formatRelativeTime(lastUpdate.created_at),
    staffName: lastUpdate.updated_by_name || item.assigned_staff_name || 'Campus Operations',
    staffAvatar: (lastUpdate.updated_by_name || 'CO').slice(0, 2).toUpperCase(),
    role: 'Department Staff'
  } : {
    text: `Ticket assigned to ${item.department_name || 'campus authorities'} for review and resolution.`,
    updatedAt: formatRelativeTime(item.submitted_at),
    staffName: item.assigned_staff_name || 'Campus Support',
    staffAvatar: 'CS',
    role: 'Support Desk'
  };

  return {
    ...item,
    id: complaintNumber,
    rawId: rawId,
    complaintNumber: complaintNumber,
    title: item.title || 'Untitled Issue',
    description: item.description || '',
    category: item.category || 'General',
    priority: priorityFormatted,
    status: statusFormatted,
    location: item.location || 'Campus Main Block',
    department: item.department_name || 'Administration',
    assignedDepartment: item.department_name || 'Administration',
    assignedStaff: item.assigned_staff_name || 'Unassigned',
    assignedTo: item.department_name || 'Maintenance',
    studentName: item.student_name || 'Anonymous Student',
    student: item.student_name || 'Anonymous Student',
    studentId: item.student_id || 'STU-1042',
    studentEmail: item.student_email || '',
    submittedDate: formatDate(item.submitted_at),
    submittedAt: item.submitted_at,
    submittedRelative: formatRelativeTime(item.submitted_at),
    lastUpdated: formatRelativeTime(item.updated_at || item.submitted_at),
    resolvedAt: item.resolved_at,
    resolutionProgress: resolutionProgress,
    attachment: firstAttachment,
    statusHistory: statusHistory,
    latestUpdate: latestUpdateObj,
    staffRole: 'Support Specialist',
    departmentEmail: `${(item.department_name || 'support').toLowerCase().replace(/[^a-z0-9]/g, '')}@smartcampus.edu`,
    departmentPhone: '+91 (080) 2854-9100',
    departmentOffice: `${item.department_name || 'Campus'} Operations Center`,
    relatedComplaints: [],
    aiAnalysis: {
      category: item.ai_category || item.category || 'General',
      priority: (item.ai_priority || item.priority || 'MEDIUM').toUpperCase(),
      confidence: Math.round((item.ai_confidence || 0.85) * 100),
      urgency: (item.ai_priority || item.priority || 'MEDIUM').toUpperCase(),
      suggestedDepartment: item.department_name || 'Maintenance',
      keywords: [item.category, item.location].filter(Boolean),
      reason: 'AI classification model analyzed ticket content and historical departmental performance.'
    },
    timeline: fullTimeline,
    attachments: attachments
  };
}

/**
 * Maps raw backend user entity to frontend UI model.
 */
export function mapUser(user) {
  if (!user) return null;

  return {
    ...user,
    id: user.id,
    name: user.full_name || 'User',
    fullName: user.full_name,
    email: user.email,
    phone: user.phone || 'Not provided',
    role: user.role,
    status: user.status,
    department: user.department_name || 'Unassigned',
    departmentId: user.department_id,
    studentId: user.student_id || 'N/A',
    employeeId: user.employee_id || 'N/A',
    course: user.course || 'N/A',
    branch: user.branch || 'N/A',
    year: user.year ? `${user.year} Year` : 'N/A',
    designation: user.designation || 'Staff Member',
    joinedDate: formatDate(user.created_at),
    lastActive: formatRelativeTime(user.last_active_at || user.updated_at)
  };
}

/**
 * Maps raw backend department entity to frontend UI model.
 */
export function mapDepartment(dept) {
  if (!dept) return null;

  return {
    ...dept,
    id: dept.id,
    name: dept.name,
    code: dept.department_code,
    departmentCode: dept.department_code,
    description: dept.description || '',
    headName: dept.department_head_name || 'Pending Appointment',
    headId: dept.department_head_id,
    status: dept.status,
    staffCount: dept.staff_count || 0,
    activeComplaints: dept.active_complaints_count || 0,
    resolvedComplaints: dept.resolved_complaints_count || 0,
    createdAt: formatDate(dept.created_at)
  };
}

/**
 * Maps raw backend notification entity to frontend UI model.
 */
export function mapNotification(notif) {
  if (!notif) return null;

  return {
    ...notif,
    id: notif.id,
    title: notif.title,
    desc: notif.message,
    description: notif.message,
    category: notif.category || (notif.complaint_id ? 'Complaint Updates' : 'System'),
    priority: notif.priority || 'Normal',
    read: Boolean(notif.is_read),
    unread: !notif.is_read,
    isRead: Boolean(notif.is_read),
    complaintId: notif.complaint_id,
    timestamp: formatRelativeTime(notif.created_at),
    time: formatRelativeTime(notif.created_at),
    date: formatDate(notif.created_at),
    type: notif.notification_type || 'complaint_status',
    department: 'Campus Operations',
    createdAt: notif.created_at
  };
}
