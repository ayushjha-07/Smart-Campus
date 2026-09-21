import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { DEPARTMENT_NOTIFICATIONS } from '../../data/departmentMockData';

export default function DepartmentNotifications() {
  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
              Recent Notifications
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Urgent updates & ticket assignments
            </p>
          </div>
        </div>

        <span className="w-2 h-2 rounded-full bg-[#D4A84F] animate-pulse" />
      </div>

      {/* Notifications List */}
      <div className="my-3 space-y-2.5">
        {DEPARTMENT_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`p-3 rounded-xl border transition-all text-xs flex items-start justify-between gap-2 ${
              n.unread
                ? 'bg-[#07121A] border-[#315C3A]/60 hover:border-[#D4A84F]/60'
                : 'bg-[#07121A]/50 border-[#1A2E3B]'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#F5F5F0]">{n.title}</span>
                {n.unread && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A84F]" />
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-mono text-[#D4A84F] font-bold">
                  {n.ticketId}
                </span>
                <span className="text-[#9FB1BC]">•</span>
                <span className="text-[#9FB1BC] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {n.time}
                </span>
              </div>
            </div>

            <div className="p-1 rounded bg-[#13242E] text-[#9FB1BC] mt-0.5 shrink-0">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="pt-2 border-t border-[#1A2E3B] text-center">
        <Link
          to="/department/notifications"
          className="w-full py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#D4A84F] hover:text-[#E5BF6E] border border-[#1A2E3B] flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>View All Notifications</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
