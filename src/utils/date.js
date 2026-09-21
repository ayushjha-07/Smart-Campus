/**
 * Smart Campus Date & Time Formatting Utilities
 * Standardizes display of UTC backend timestamps in user-friendly local formats.
 */

/**
 * Formats date into "20 Sep 2026"
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export function formatDate(dateVal) {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return String(dateVal);

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Formats date & time into "20 Sep 2026, 10:32 AM"
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export function formatDateTime(dateVal) {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return String(dateVal);

  const formattedDate = formatDate(date);
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return `${formattedDate}, ${formattedTime}`;
}

/**
 * Formats relative timestamp into "10 min ago", "2 hours ago", "Yesterday", etc.
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export function formatRelativeTime(dateVal) {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return String(dateVal);

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  return formatDate(date);
}

/**
 * Alias for formatRelativeTime for convenient notification timestamps
 */
export const formatTimeAgo = formatRelativeTime;

