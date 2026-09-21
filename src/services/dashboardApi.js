/**
 * Smart Campus Dashboard Aggregation API Module
 */
import { request } from './apiClient';

export const dashboardApi = {
  /**
   * Aggregated counts, recent complaints, and notifications for Student Dashboard.
   */
  getStudentDashboard: async () => {
    return await request('/dashboard/student');
  },

  /**
   * Operational KPIs, critical counts, and department benchmarks for Admin Dashboard.
   */
  getAdminDashboard: async () => {
    return await request('/dashboard/admin');
  },

  /**
   * Workload counters, urgent tickets, and activity logs for Department Dashboard.
   */
  getDepartmentDashboard: async () => {
    return await request('/dashboard/department');
  },
};

export default dashboardApi;
