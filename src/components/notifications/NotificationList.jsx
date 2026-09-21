import React from 'react';
import NotificationItem from './NotificationItem';
import EmptyNotifications from './EmptyNotifications';

export default function NotificationList({
  notifications,
  isFiltered,
  onClearFilters,
  onItemClick,
  onToggleRead,
  onViewDetails,
  onDeleteRequest,
}) {
  if (!notifications || notifications.length === 0) {
    return (
      <EmptyNotifications
        isFiltered={isFiltered}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notif) => (
        <NotificationItem
          key={notif.id}
          notification={notif}
          onItemClick={onItemClick}
          onToggleRead={onToggleRead}
          onViewDetails={onViewDetails}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}
