import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MoreVertical, 
  Check, 
  Mail, 
  ExternalLink, 
  Trash2, 
  FileText 
} from 'lucide-react';

export default function NotificationActions({
  notification,
  onToggleRead,
  onViewDetails,
  onDeleteRequest,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="p-1.5 sm:p-2 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white transition-colors cursor-pointer"
        aria-label="Notification actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />

          {/* Popover Menu */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-white dark:bg-[#0B2027] border border-[#DDE7E2] dark:border-white/10 shadow-xl p-1.5 z-40 animate-fadeIn text-xs text-left"
          >
            {/* Mark as Read / Unread */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onToggleRead(notification.id);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#10213A] dark:text-[#F5F7F5] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              {notification.read ? (
                <>
                  <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Mark as unread</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
                  <span>Mark as read</span>
                </>
              )}
            </button>

            {/* View Full Details */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onViewDetails(notification);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#10213A] dark:text-[#F5F7F5] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#078A5A] dark:text-[#00B87A]" />
              <span>View details</span>
            </button>

            {/* Related Complaint Link */}
            {notification.complaintId && (
              <Link
                to={`/student/complaints/${notification.complaintId}`}
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#10213A] dark:text-[#F5F7F5] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Go to complaint</span>
              </Link>
            )}

            {/* Delete Option */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDeleteRequest(notification);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left border-t border-[#DCE7E3] dark:border-white/10 mt-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete notification</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
