/**
 * Smart Campus Authentication API Module
 * Supports both FastAPI backend calls and automatic mock session fallbacks
 * when the backend server is offline or in mock mode.
 */
import { request, setStoredToken, clearAuthStorage, USER_STORAGE_KEY } from './apiClient';

const isMockMode = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

/**
 * Builds mock user metadata based on email address and role hint
 */
function buildMockAuthData(email, roleHint) {
  const cleanEmail = (email || '').trim().toLowerCase();

  // 1. Administrator
  if (cleanEmail.includes('admin') || roleHint === 'admin') {
    return {
      access_token: 'mock-jwt-admin-' + Date.now(),
      token_type: 'bearer',
      user: {
        id: 'USR-ADMIN-01',
        full_name: 'Dr. Gurpreet Singh',
        email: cleanEmail || 'admin@smartcampus.edu',
        role: 'ADMINISTRATOR',
        department: 'Campus Administration',
        department_name: 'Administration',
        status: 'ACTIVE',
      },
    };
  }

  // 2. Department Staff / Maintenance
  if (cleanEmail.includes('staff') || cleanEmail.includes('maintenance') || roleHint === 'staff') {
    return {
      access_token: 'mock-jwt-staff-' + Date.now(),
      token_type: 'bearer',
      user: {
        id: 'USR-STAFF-01',
        full_name: 'Rajesh Kumar (MNT)',
        email: cleanEmail || 'maintenance@smartcampus.edu',
        role: 'DEPARTMENT_STAFF',
        department: 'Maintenance',
        department_name: 'Facilities Maintenance',
        status: 'ACTIVE',
      },
    };
  }

  // 3. Student (Default)
  return {
    access_token: 'mock-jwt-student-' + Date.now(),
    token_type: 'bearer',
    user: {
      id: 'USR-STU-01',
      full_name: 'Ayush Kumar Jha',
      email: cleanEmail || 'student@smartcampus.edu',
      role: 'STUDENT',
      student_id: '2024CSB1042',
      branch: 'Computer Science & Engineering',
      course: 'Bachelor of Technology (B.Tech)',
      department_name: 'School of Computing & Data Sciences',
      year: 3,
      semester: 5,
      status: 'ACTIVE',
    },
  };
}

export const authApi = {
  /**
   * Submits credentials to obtain JWT access token and user metadata.
   * Transparently falls back to local simulation if the backend server is unreachable.
   */
  login: async (email, password, roleHint) => {
    // If mock mode is explicitly forced
    if (isMockMode) {
      const mockData = buildMockAuthData(email, roleHint);
      setStoredToken(mockData.access_token);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockData.user));
      } catch {
        // Ignore storage error
      }
      return mockData;
    }

    try {
      const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: (email || '').trim(), password }),
      });
      if (data?.access_token) {
        setStoredToken(data.access_token);
      }
      return data;
    } catch (err) {
      // If network failure / server offline, transparently fall back to mock auth
      if (err.isNetworkError || err.status === 0 || err.message?.toLowerCase().includes('connect') || err.message?.toLowerCase().includes('fetch')) {
        console.warn('[Smart Campus Auth] Server unreachable, using local session fallback');
        const mockData = buildMockAuthData(email, roleHint);
        setStoredToken(mockData.access_token);
        try {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockData.user));
        } catch {
          // Ignore storage error
        }
        return mockData;
      }
      throw err;
    }
  },

  /**
   * Registers a new student or department staff account.
   */
  register: async (userData) => {
    if (isMockMode) {
      return {
        message: 'Registration successful',
        user: {
          id: 'USR-' + Date.now(),
          full_name: userData.full_name,
          email: userData.email,
          role: userData.role || 'STUDENT',
          status: 'ACTIVE',
        },
      };
    }

    try {
      return await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (err) {
      if (err.isNetworkError || err.status === 0) {
        return {
          message: 'Registration successful (offline simulation)',
          user: {
            id: 'USR-' + Date.now(),
            full_name: userData.full_name,
            email: userData.email,
            role: userData.role || 'STUDENT',
            status: 'ACTIVE',
          },
        };
      }
      throw err;
    }
  },

  /**
   * Introspects currently authenticated user account.
   */
  getMe: async () => {
    if (isMockMode) {
      try {
        const saved = localStorage.getItem(USER_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Ignore storage error
      }
      return buildMockAuthData('student@smartcampus.edu', 'student').user;
    }

    try {
      return await request('/auth/me', {
        method: 'GET',
      });
    } catch {
      // In offline mode, load cached user from localStorage
      try {
        const saved = localStorage.getItem(USER_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Ignore storage error
      }
      return null;
    }
  },

  /**
   * Logs out user and clears client credentials.
   */
  logout: () => {
    clearAuthStorage();
  },
};

export default authApi;
