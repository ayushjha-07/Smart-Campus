/**
 * Smart Campus Analytics & Governance API Module
 */
import { request } from './apiClient';

export const analyticsApi = {
  /**
   * Retrieves high-level KPI overview (total, active, resolved, SLA compliance, resolution rate).
   */
  getOverview: async (filters = {}) => {
    const query = new URLSearchParams();
    if (filters.department_id && filters.department_id !== 'ALL') query.append('department_id', filters.department_id);
    if (filters.category && filters.category !== 'ALL') query.append('category', filters.category);

    const queryString = query.toString();
    return await request(`/analytics/overview${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Retrieves day-by-day velocity trends for charts.
   */
  getTrends: async (days = 7) => {
    return await request(`/analytics/trends?days=${days}`);
  },

  /**
   * Retrieves volume distribution by category.
   */
  getCategories: async () => {
    return await request('/analytics/categories');
  },

  /**
   * Retrieves volume distribution by priority tier.
   */
  getPriorities: async () => {
    return await request('/analytics/priorities');
  },

  /**
   * Retrieves volume distribution across lifecycle statuses.
   */
  getStatus: async () => {
    return await request('/analytics/status');
  },

  /**
   * Retrieves department workload benchmarks.
   */
  getDepartments: async () => {
    return await request('/analytics/departments');
  },

  /**
   * Retrieves average resolution turnaround hours grouped by category.
   */
  getResolutionTime: async () => {
    return await request('/analytics/resolution-time');
  },
};

export default analyticsApi;
