/**
 * Smart Campus Department Management API Module
 */
import { request } from './apiClient';

export const departmentApi = {
  /**
   * Retrieves active campus departments with operational workloads.
   */
  getDepartments: async () => {
    return await request('/departments');
  },

  /**
   * Retrieves a single department details.
   */
  getDepartment: async (departmentId) => {
    return await request(`/departments/${departmentId}`);
  },

  /**
   * Creates a new institutional department (Admin only).
   */
  createDepartment: async (payload) => {
    return await request('/departments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Updates department information (Admin only).
   */
  updateDepartment: async (departmentId, payload) => {
    return await request(`/departments/${departmentId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Activates or deactivates an institutional department (Admin only).
   */
  updateDepartmentStatus: async (departmentId, status) => {
    return await request(`/departments/${departmentId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Retrieves complaints assigned to a specific department.
   */
  getDepartmentComplaints: async (departmentId) => {
    return await request(`/departments/${departmentId}/complaints`);
  },
};

export default departmentApi;
