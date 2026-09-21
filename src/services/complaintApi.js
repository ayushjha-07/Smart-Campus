/**
 * Smart Campus Complaint Management API Module
 */
import { request } from './apiClient';
import { denormalizeStatus } from '../utils/mapper';

export const complaintApi = {
  /**
   * Retrieves complaints matching filters and pagination parameters.
   * Auto-filtered by backend RBAC (Student: own; Staff: assigned department; Admin: all).
   */
  getComplaints: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status && params.status !== 'All' && params.status !== 'ALL') {
      query.append('status', denormalizeStatus(params.status));
    }
    if (params.priority && params.priority !== 'All' && params.priority !== 'ALL') {
      query.append('priority', params.priority.toUpperCase());
    }
    if (params.category && params.category !== 'All' && params.category !== 'ALL') {
      query.append('category', params.category);
    }
    if (params.department_id && params.department_id !== 'ALL') {
      query.append('department_id', params.department_id);
    }
    if (params.page) query.append('page', params.page);
    if (params.page_size) query.append('page_size', params.page_size);

    const queryString = query.toString();
    return await request(`/complaints${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Retrieves detailed complaint record by UUID or sequential code (SC-2026-XXXX).
   */
  getComplaint: async (complaintId) => {
    return await request(`/complaints/${complaintId}`);
  },

  /**
   * Submits a new student complaint with AI automated triage & department routing.
   */
  createComplaint: async (payload) => {
    return await request('/complaints', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Updates complaint editable fields.
   */
  updateComplaint: async (complaintId, payload) => {
    return await request(`/complaints/${complaintId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Transitions complaint status with validation state machine.
   */
  updateStatus: async (complaintId, { status, note, is_internal = false }) => {
    return await request(`/complaints/${complaintId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: denormalizeStatus(status),
        note,
        is_internal,
      }),
    });
  },

  /**
   * Updates urgency tier priority (Admin only).
   */
  updatePriority: async (complaintId, { priority, note }) => {
    return await request(`/complaints/${complaintId}/priority`, {
      method: 'PATCH',
      body: JSON.stringify({
        priority: priority.toUpperCase(),
        note,
      }),
    });
  },

  /**
   * Reassigns complaint to a different campus department (Admin only).
   */
  updateDepartment: async (complaintId, { department_id, note }) => {
    return await request(`/complaints/${complaintId}/department`, {
      method: 'PATCH',
      body: JSON.stringify({
        department_id,
        note,
      }),
    });
  },

  /**
   * Marks complaint resolved with closing remarks.
   */
  resolveComplaint: async (complaintId, { resolution_note }) => {
    return await request(`/complaints/${complaintId}/resolve`, {
      method: 'POST',
      body: JSON.stringify({
        resolution_note: resolution_note || 'Complaint resolved and verified.',
      }),
    });
  },

  /**
   * Retrieves chronological audit timeline for visual stepper.
   */
  getTimeline: async (complaintId) => {
    return await request(`/complaints/${complaintId}/timeline`);
  },

  /**
   * Appends an internal staff note or public timeline remark.
   */
  addUpdate: async (complaintId, { message, status, is_internal = false }) => {
    return await request(`/complaints/${complaintId}/updates`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        status: status ? denormalizeStatus(status) : undefined,
        is_internal,
      }),
    });
  },

  /**
   * Uploads file attachment (image or PDF, max 10MB) associated with complaint.
   */
  uploadAttachment: async (complaintId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return await request(`/complaints/${complaintId}/attachments`, {
      method: 'POST',
      body: formData,
    });
  },
};

export default complaintApi;
