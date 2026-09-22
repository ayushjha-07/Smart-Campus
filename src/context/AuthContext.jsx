import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/authApi';
import { getStoredToken, setStoredToken, clearAuthStorage, USER_STORAGE_KEY } from '../services/apiClient';
import { getUserPhotoStorageKey, getStoredProfilePhoto } from '../utils/profilePhoto';

export { getUserPhotoStorageKey, getStoredProfilePhoto };

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

  // Active user's profile photo Data URL (or null if none)
  const [profilePhoto, setProfilePhoto] = useState(() => {
    return getStoredProfilePhoto(currentUser);
  });

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

  // Sync profile photo whenever currentUser changes (e.g. login, switch user, logout)
  useEffect(() => {
    setProfilePhoto(getStoredProfilePhoto(currentUser));
  }, [currentUser]);

  // Synchronize cross-tab or cross-component profile photo updates
  useEffect(() => {
    const handlePhotoUpdated = () => {
      setProfilePhoto(getStoredProfilePhoto(currentUser));
    };

    window.addEventListener('smart_campus:profile_photo_updated', handlePhotoUpdated);
    return () => window.removeEventListener('smart_campus:profile_photo_updated', handlePhotoUpdated);
  }, [currentUser]);

  /**
   * Updates or saves profile photo Data URL to user-specific localStorage key
   */
  const updateProfilePhoto = useCallback((photoDataUrl) => {
    const key = getUserPhotoStorageKey(currentUser);
    const lowerKey = key.toLowerCase();
    const id = currentUser?.studentId || currentUser?.student_id || currentUser?.email || currentUser?.id || currentUser?.name || 'guest';
    const cleanId = String(id).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const sanitizedKey = `smartCampusProfilePhoto_${cleanId}`;

    if (photoDataUrl) {
      try {
        localStorage.setItem(key, photoDataUrl);
        if (lowerKey !== key) {
          localStorage.setItem(lowerKey, photoDataUrl);
        }
        if (sanitizedKey !== key && sanitizedKey !== lowerKey) {
          localStorage.setItem(sanitizedKey, photoDataUrl);
        }
      } catch (err) {
        console.error('Storage quota exceeded or error saving profile photo', err);
      }
      setProfilePhoto(photoDataUrl);
    } else {
      try {
        localStorage.removeItem(key);
        if (lowerKey !== key) {
          localStorage.removeItem(lowerKey);
        }
        if (sanitizedKey !== key && sanitizedKey !== lowerKey) {
          localStorage.removeItem(sanitizedKey);
        }
      } catch {
        // ignore
      }
      setProfilePhoto(null);
    }
    window.dispatchEvent(new CustomEvent('smart_campus:profile_photo_updated', { detail: { photo: photoDataUrl } }));
  }, [currentUser]);

  /**
   * Removes active profile photo and restores default avatar
   */
  const removeProfilePhoto = useCallback(() => {
    updateProfilePhoto(null);
  }, [updateProfilePhoto]);

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
        setProfilePhoto(null);
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
      setProfilePhoto(null);
    };

    window.addEventListener('smart_campus:unauthorized', handleUnauthorizedEvent);
    return () => window.removeEventListener('smart_campus:unauthorized', handleUnauthorizedEvent);
  }, [refreshUser, saveUserToStorage]);

  /**
   * Authenticates user, saves JWT, updates AuthContext and loads user's profile photo
   */
  const login = useCallback(async (email, password, roleHint) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password, roleHint);
      setAccessToken(data.access_token);
      setStoredToken(data.access_token);
      saveUserToStorage(data.user);

      // Load user-specific profile photo
      const key = getUserPhotoStorageKey(data.user);
      const userPhoto = localStorage.getItem(key) || null;
      setProfilePhoto(userPhoto);
      window.dispatchEvent(new CustomEvent('smart_campus:profile_photo_updated', { detail: { photo: userPhoto } }));

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
   * Ends current session and clears credentials
   */
  const logout = useCallback(() => {
    authApi.logout();
    setAccessToken(null);
    saveUserToStorage(null);
    setProfilePhoto(null);
    window.dispatchEvent(new CustomEvent('smart_campus:profile_photo_updated', { detail: { photo: null } }));
  }, [saveUserToStorage]);

  const value = {
    currentUser,
    profilePhoto,
    updateProfilePhoto,
    removeProfilePhoto,
    getUserPhotoStorageKey,
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
