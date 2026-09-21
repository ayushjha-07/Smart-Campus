/**
 * Smart Campus Unified API Service Entry
 * Re-exports modular API services for backward compatibility and unified access.
 */
export { default as apiClient, request, getStoredToken, setStoredToken, clearAuthStorage } from './apiClient';
export { default as authApi } from './authApi';
export { default as userApi } from './userApi';
export { default as complaintApi } from './complaintApi';
export { default as departmentApi } from './departmentApi';
export { default as notificationApi } from './notificationApi';
export { default as analyticsApi } from './analyticsApi';
export { default as dashboardApi } from './dashboardApi';
export { default as dataSource, isMockMode } from './dataSource';
