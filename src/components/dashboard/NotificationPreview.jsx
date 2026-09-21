import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ArrowRight, Info } from 'lucide-react';
import { latestNotifications } from '../../data/mockStudentData';

export default function NotificationPreview({ notifications = null }) {
  const notifList = notifications && notifications.length > 0 ? notifications : latestNotifications;

  return (
    <div className="bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F5F5F0]">
              Latest Notifications
            </h3>
            <p className="text-xs text-[#A8B3B0]">Automated departmental alerts</p>
          </div>
          <div className="p-2 rounded-xl bg-[#315C3A]/20 text-[#D4A84F] border border-[#315C3A]/40">
            <Bell className="w-4 h-4" />
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifList.slice(0, 3).map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-3 ${
                notif.unread
                  ? 'bg-[#07121A] border-[#315C3A]/60 shadow-sm'
                  : 'bg-[#07121A]/50 border-white/5 opacity-80'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#0D1B22] border border-white/10 text-[#D4A84F] shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-xs font-bold text-[#F5F5F0] truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-[#A8B3B0]/60 shrink-0 font-mono">
                    {notif.time}
                  </span>
                </div>
                <p className="text-xs text-[#A8B3B0] leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="pt-4 mt-4 border-t border-white/5">
        <Link
          to="/student/notifications"
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#D4A84F] hover:text-[#E5BF6E] bg-[#07121A] hover:bg-[#13242E] border border-white/10 hover:border-[#315C3A] transition-all flex items-center justify-center gap-1.5"
        >
          <span>View All Notifications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
