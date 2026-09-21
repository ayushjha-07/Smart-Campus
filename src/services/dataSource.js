/**
 * Smart Campus Data Source Abstraction
 * Allows seamless switching between real FastAPI backend calls and mock local fallback.
 */
import authApi from './authApi';
import userApi from './userApi';
import complaintApi from './complaintApi';
import departmentApi from './departmentApi';
import notificationApi from './notificationApi';
import analyticsApi from './analyticsApi';
import dashboardApi from './dashboardApi';

// Determine whether mock data mode is active (default to true for standalone frontend deployment)
export const isMockMode = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

// Callable function so dataSource.isMockMode() works seamlessly everywhere
const mockModeFn = () => isMockMode;
mockModeFn.valueOf = () => isMockMode;
mockModeFn.toString = () => String(isMockMode);

export const dataSource = {
  isMockMode: mockModeFn,
  get auth() { return authApi; },
  get users() { return userApi; },
  get complaints() { return complaintApi; },
  get departments() { return departmentApi; },
  get notifications() { return notificationApi; },
  get analytics() { return analyticsApi; },
  get dashboard() { return dashboardApi; },
};

export default dataSource;
