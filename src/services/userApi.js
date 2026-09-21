/**
 * Smart Campus User Management & Profile API Module
 */
import { request } from './apiClient';

export const userApi = {
  /**
   * Retrieves profile of current active user.
   */
  getMe: async () => {
    return await request('/users/me');
  },

  /**
   * Updates personal profile information for current user.
   */
  updateMe: async (profileData) => {
    return await request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Queries users list with optional search, role, status, and pagination (Admin only).
   */
  getUsers: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.role && params.role !== 'ALL') query.append('role', params.role);
    if (params.department_id && params.department_id !== 'ALL') query.append('department_id', params.department_id);
    if (params.status && params.status !== 'ALL') query.append('status', params.status);
    if (params.page) query.append('page', params.page);
    if (params.page_size) query.append('page_size', params.page_size);

    const queryString = query.toString();
    return await request(`/users${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Retrieves a single user by ID.
   */
  getUserById: async (userId) => {
    return await request(`/users/${userId}`);
  },

  /**
   * Updates user fields including role and department (Admin only).
   */
  updateUser: async (userId, data) => {
    return await request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Transitions user status (ACTIVE, SUSPENDED, PENDING_VERIFICATION) (Admin only).
   */
  updateUserStatus: async (userId, status) => {
    return await request(`/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

export default userApi;
