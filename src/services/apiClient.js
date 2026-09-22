/**
 * Smart Campus Core API Client
 * Centralized HTTP request utility configured with automatic Bearer token injection,
 * JSON serialization, 401 session expiration handling, and developer logging.
 */

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:8000/api/v1';
export const TOKEN_STORAGE_KEY = 'smart_campus_auth_token';
export const USER_STORAGE_KEY = 'smart_campus_auth_user';

/**
 * Retrieves the stored JWT token.
 */
export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Persists or clears the active session token.
 */
export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Clears authentication artifacts from client storage.
 */
export function clearAuthStorage() {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Dispatches session expired event and safely redirects to /login.
 */
function handleUnauthorized() {
  clearAuthStorage();
  window.dispatchEvent(new CustomEvent('smart_campus:unauthorized'));

  // Avoid redirect loops if already on login or public landing page
  const path = window.location.pathname;
  if (path !== '/login' && path !== '/' && path !== '/register') {
    window.location.href = '/login?expired=true';
  }
}

/**
 * Core request helper with HTTP error normalization and development logging.
 */
export async function request(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  const token = getStoredToken();

  const headers = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  // Do not set Content-Type header if sending FormData (browser generates multipart boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const method = (options.method || 'GET').toUpperCase();

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 204) {
      if (import.meta.env.DEV) {
        console.log(`[Smart Campus API] ${method} ${cleanEndpoint} Status: 204 No Content`);
      }
      return null;
    }

    const data = await response.json().catch(() => null);

    if (import.meta.env.DEV) {
      console.log(`[Smart Campus API] ${method} ${cleanEndpoint} Status: ${response.status}`);
    }

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorized();
      }

      const errorMessage = data?.detail || `HTTP Error ${response.status}: ${response.statusText}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
      if (import.meta.env.DEV) {
        console.warn(`[Smart Campus API] ${method} ${cleanEndpoint} Connection Failure`);
      }
      const netError = new Error('Unable to connect to Smart Campus server.');
      netError.isNetworkError = true;
      netError.status = 0;
      throw netError;
    }
    throw err;
  }
}

export default {
  request,
  getStoredToken,
  setStoredToken,
  clearAuthStorage,
};
