import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Megaphone, 
  Laptop, 
  Bell, 
  Tag,
  Wrench,
  Info
} from 'lucide-react';
import NotificationActions from './NotificationActions';

export default function NotificationItem({
  notification,
  onItemClick,
  onToggleRead,
  onViewDetails,
  onDeleteRequest,
}) {
  const isUnread = !notification.read;
  const isCritical = notification.priority === 'Critical';
  const isImportant = notification.priority === 'Important';

  // Choose appropriate icon according to notification type and priority
  const getIcon = () => {
    if (isCritical) return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />;
    if (notification.type === 'complaint_resolved') {
      return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />;
    }
    if (notification.category === 'Announcements') {
      return <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />;
    }
    if (notification.category === 'System') {
      return <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />;
    }
    if (notification.category === 'Department Updates') {
      return <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#078A5A] dark:text-[#00B87A]" />;
    }
    if (notification.type === 'action_required' || notification.type === 'complaint_assigned') {
      return <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-[#D8A93E]" />;
    }
    return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#078A5A] dark:text-[#00B87A]" />;
  };

  const getIconContainerStyle = () => {
    if (isCritical) {
      return 'bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/50';
    }
    if (notification.type === 'complaint_resolved') {
      return 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-500/20';
    }
    if (notification.category === 'Announcements') {
      return 'bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-500/20';
    }
    if (notification.category === 'System') {
      return 'bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-500/20';
    }
    return 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-500/20';
  };

  return (
    <div
      onClick={() => onItemClick(notification)}
      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isCritical
          ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 hover:border-rose-400 shadow-2xs dark:shadow-xl'
          : isUnread
          ? 'bg-white dark:bg-[#0B2027] border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A]/40 dark:hover:border-[#00B87A]/40 shadow-2xs dark:shadow-xl'
          : 'bg-white dark:bg-[#0B2027]/70 border-[#DCE7E3] dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 opacity-90 hover:opacity-100 shadow-2xs'
      }`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        {/* Left: Icon & Notification Info */}
        <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
          {/* Notification Icon Box */}
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${getIconContainerStyle()}`}
          >
            {getIcon()}
          </div>

          {/* Details & Badges */}
          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
              {/* Category Badge */}
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[#687A91] dark:text-[#91A7A5] border border-slate-200 dark:border-white/10 font-medium">
                {notification.category}
              </span>

              {/* Unread NEW indicator */}
              {isUnread && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-[#078A5A] dark:text-[#00B87A] font-bold tracking-wide border border-emerald-200 dark:border-emerald-500/30">
                  NEW
                </span>
              )}

              {/* Priority Indicator */}
              {isCritical && (
                <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-bold tracking-wide border border-rose-200 dark:border-rose-500/30">
                  CRITICAL
                </span>
              )}
              {isImportant && !isCritical && (
                <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold tracking-wide border border-amber-200 dark:border-amber-500/30">
                  IMPORTANT
                </span>
              )}

              {/* Related Complaint ID Pill */}
              {notification.complaintId && (
                <Link
                  to={`/student/complaints/${notification.complaintId}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono text-[#078A5A] dark:text-[#00B87A] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <Tag className="w-3 h-3 text-[#078A5A] dark:text-[#00B87A]" />
                  <span>#{notification.complaintId}</span>
                </Link>
              )}
            </div>

            {/* Title */}
            <h4
              className={`text-sm sm:text-base leading-snug transition-colors ${
                isUnread
                  ? 'font-bold text-[#10213A] dark:text-[#F5F7F5] group-hover:text-[#078A5A] dark:group-hover:text-[#00B87A]'
                  : 'font-semibold text-[#10213A]/90 dark:text-[#F5F7F5]/90'
              }`}
            >
              {notification.title}
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-[#687A91] dark:text-[#91A7A5] leading-relaxed line-clamp-2 sm:line-clamp-none">
              {notification.description}
            </p>

            {/* Timestamp & Department Footer */}
            <div className="flex items-center gap-2 pt-1 text-[11px] sm:text-xs text-[#687A91] dark:text-[#91A7A5]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                <span>{notification.timestamp}</span>
              </span>
              {notification.department && (
                <span className="inline-flex items-center gap-2">
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span>{notification.department}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Unread Dot Indicator & 3-Dot Actions */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          {isUnread && (
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#078A5A] dark:bg-[#00B87A] ring-4 ring-emerald-100 dark:ring-emerald-950/40 shrink-0"
              title="Unread notification"
            />
          )}

          <NotificationActions
            notification={notification}
            onToggleRead={onToggleRead}
            onViewDetails={onViewDetails}
            onDeleteRequest={onDeleteRequest}
          />
        </div>
      </div>
    </div>
  );
}
