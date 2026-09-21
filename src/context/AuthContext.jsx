import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/authApi';
import { getStoredToken, setStoredToken, clearAuthStorage, USER_STORAGE_KEY } from '../services/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(accessToken && currentUser);

  // Sync user state to localStorage
  const saveUserToStorage = useCallback((user) => {
    setCurrentUser(user);
    if (user) {
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } catch {
        // Ignore quota error
      }
    } else {
      try {
        localStorage.removeItem(USER_STORAGE_KEY);
      } catch {
        // Ignore error
      }
    }
  }, []);

  /**
   * Refreshes user profile against /auth/me
   */
  const refreshUser = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      saveUserToStorage(null);
      setAccessToken(null);
      setLoading(false);
      return null;
    }

    try {
      const user = await authApi.getMe();
      saveUserToStorage(user);
      setAccessToken(token);
      return user;
    } catch (err) {
      if (err?.status === 401) {
        clearAuthStorage();
        saveUserToStorage(null);
        setAccessToken(null);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [saveUserToStorage]);

  // Initial authentication check on application boot
  useEffect(() => {
    refreshUser();

    // Listen for unauthorized events dispatched by apiClient
    const handleUnauthorizedEvent = () => {
      saveUserToStorage(null);
      setAccessToken(null);
    };

    window.addEventListener('smart_campus:unauthorized', handleUnauthorizedEvent);
    return () => window.removeEventListener('smart_campus:unauthorized', handleUnauthorizedEvent);
  }, [refreshUser, saveUserToStorage]);

  /**
   * Authenticates user, saves JWT, and updates AuthContext
   */
  const login = useCallback(async (email, password, roleHint) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password, roleHint);
      setAccessToken(data.access_token);
      setStoredToken(data.access_token);
      saveUserToStorage(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }, [saveUserToStorage]);

  /**
   * Self-registration for student or department staff
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      return await authApi.register(userData);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Ends current session and clears storage
   */
  const logout = useCallback(() => {
    authApi.logout();
    setAccessToken(null);
    saveUserToStorage(null);
  }, [saveUserToStorage]);

  const value = {
    currentUser,
    accessToken,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
