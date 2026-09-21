/**
 * Smart Campus Notifications API Module
 */
import { request } from './apiClient';

export const notificationApi = {
  /**
   * Retrieves paginated notifications dispatched to the current user with optional filters.
   */
  getNotifications: async (page = 1, pageSize = 20, filters = {}) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('page_size', pageSize);

    if (filters.is_read !== undefined && filters.is_read !== null && filters.is_read !== 'all') {
      params.set('is_read', filters.is_read);
    }
    if (filters.type && filters.type !== 'all') {
      params.set('type', filters.type);
    }
    if (filters.priority && filters.priority !== 'all' && filters.priority !== 'All') {
      params.set('priority', filters.priority.toUpperCase());
    }
    if (filters.search) {
      params.set('search', filters.search);
    }

    return await request(`/notifications?${params.toString()}`);
  },

  /**
   * Retrieves count of unread notifications for badge indicators.
   */
  getUnreadCount: async () => {
    return await request('/notifications/unread-count');
  },

  /**
   * Marks a specific notification as read.
   */
  markRead: async (notificationId) => {
    return await request(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  },

  /**
   * Marks a specific notification as unread.
   */
  markUnread: async (notificationId) => {
    return await request(`/notifications/${notificationId}/unread`, {
      method: 'PATCH',
    });
  },

  /**
   * Marks all unread notifications for the user as read.
   */
  markAllRead: async () => {
    return await request('/notifications/read-all', {
      method: 'PATCH',
    });
  },

  /**
   * Deletes a notification from user's notification feed.
   */
  deleteNotification: async (notificationId) => {
    return await request(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Retrieves current user notification preferences.
   */
  getPreferences: async () => {
    return await request('/notifications/preferences');
  },

  /**
   * Updates user notification preferences.
   */
  updatePreferences: async (payload) => {
    return await request('/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Broadcasts campus announcement (Administrator only).
   */
  createAnnouncement: async (payload) => {
    return await request('/notifications/announcements', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export default notificationApi;
