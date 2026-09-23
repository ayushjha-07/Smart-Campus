import React from 'react';
import {
  RefreshCw,
  UserCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { RECENT_DEPARTMENT_ACTIVITY } from '../../data/departmentDashboardData';

export default function RecentActivity({ activities = RECENT_DEPARTMENT_ACTIVITY, onSelectTicket }) {
  const getIcon = (type) => {
    switch (type) {
      case 'status_update':
        return <RefreshCw className="w-3.5 h-3.5 text-blue-500" />;
      case 'assignment':
        return <UserCheck className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />;
      case 'priority_change':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case 'urgent':
        return <Flame className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#71844A]" />;
    }
  };

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DDE8E3]/60 dark:border-[#243338]/60">
        <div>
          <h3 className="text-sm font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            Recent Department Activity
          </h3>
          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
            Live chronological stream of status changes and assignments
          </p>
        </div>
        <Clock className="w-4 h-4 text-[#60717A] dark:text-[#71844A]" />
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-4 my-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE8E3] dark:before:bg-[#243338]">
        {activities.map((act) => (
          <div
            key={act.id}
            onClick={() => onSelectTicket && onSelectTicket(act.ticketId)}
            className="relative group cursor-pointer"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-[#0C1518] border-2 border-[#DDE8E3] dark:border-[#243338] group-hover:border-[#008F63] dark:group-hover:border-[#D4A84F] flex items-center justify-center transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#D4A84F]" />
            </div>

            <div className="rounded-xl p-2.5 bg-[#F5F5F0]/60 dark:bg-[#07121A]/60 border border-[#DDE8E3]/60 dark:border-[#243338]/60 group-hover:border-[#008F63]/30 dark:group-hover:border-[#315C3A] transition-all">
              <div className="flex items-center gap-2">
                {getIcon(act.type)}
                <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] transition-colors">
                  {act.title}
                </span>
              </div>
              <div className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] mt-1 pl-5">
                {act.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 text-center border-t border-[#DDE8E3]/60 dark:border-[#243338]/60">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#71844A]">
          Automated Dispatch Log • Synced
        </span>
      </div>
    </div>
  );
}
