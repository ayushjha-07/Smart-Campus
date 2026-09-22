import { USER_STORAGE_KEY } from '../services/apiClient.js';

/**
 * Computes isolated, user-specific profile photo storage key in localStorage
 * e.g. smartCampusProfilePhoto_2024CSB1042 or smartCampusProfilePhoto_2024CSB1098
 */
export function getUserPhotoStorageKey(user) {
  let targetUser = user;
  if (!targetUser) {
    try {
      const saved = typeof localStorage !== 'undefined' ? (localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem('smart_campus_user')) : null;
      if (saved) targetUser = JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  const id = targetUser?.studentId || targetUser?.student_id || targetUser?.email || targetUser?.id || targetUser?.name || 'guest';
  return `smartCampusProfilePhoto_${id}`;
}

/**
 * Retrieves stored profile photo from localStorage across candidate keys
 */
export function getStoredProfilePhoto(user) {
  if (typeof localStorage === 'undefined') return null;
  try {
    const primaryKey = getUserPhotoStorageKey(user);
    const photo = localStorage.getItem(primaryKey);
    if (photo) return photo;

    // Check lowercase key variation
    const lowerKey = primaryKey.toLowerCase();
    if (lowerKey !== primaryKey) {
      const lowerPhoto = localStorage.getItem(lowerKey);
      if (lowerPhoto) return lowerPhoto;
    }

    // Check sanitized key variation
    let targetUser = user;
    if (!targetUser) {
      try {
        const saved = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem('smart_campus_user');
        if (saved) targetUser = JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    const id = targetUser?.studentId || targetUser?.student_id || targetUser?.email || targetUser?.id || targetUser?.name || 'guest';
    const cleanId = String(id).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const sanitizedKey = `smartCampusProfilePhoto_${cleanId}`;
    if (sanitizedKey !== primaryKey && sanitizedKey !== lowerKey) {
      const sanitizedPhoto = localStorage.getItem(sanitizedKey);
      if (sanitizedPhoto) return sanitizedPhoto;
    }
  } catch {
    // ignore
  }
  return null;
}
