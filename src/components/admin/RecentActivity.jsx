import React from 'react';
import {
  UserCheck,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { RECENT_ACTIVITY_DATA } from '../../data/adminDashboardData';

const iconMap = {
  UserCheck,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ShieldCheck
};

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Recent Activity
          </h3>
          <p className="text-xs font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
            Institutional audit trail & real-time administrative logs
          </p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-[#60717A] dark:text-[#9FB1BC]">
          <Clock className="w-3.5 h-3.5 text-[#008F63] dark:text-[#D4A84F]" />
          <span>Live Feed</span>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-4 my-auto before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE8E3] dark:before:bg-[#1A2E3B]">
        {RECENT_ACTIVITY_DATA.map((item) => {
          const Icon = iconMap[item.iconName] || RefreshCw;
          const isCritical = item.type === 'critical_alert';

          return (
            <div key={item.id} className="relative flex items-start gap-3 group">
              {/* Timeline Indicator Node */}
              <span
                className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0C1518] shadow-xs ${
                  isCritical
                    ? 'bg-red-500 text-white'
                    : 'bg-[#F7F9F8] dark:bg-[#111C1F] text-[#008F63] dark:text-[#D4A84F]'
                }`}
              >
                <Icon className="w-2.5 h-2.5" />
              </span>

              {/* Activity Details */}
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[#071A2B] dark:text-[#F5F5F0] leading-relaxed">
                  <span className="font-bold text-[#008F63] dark:text-[#D4A84F]">
                    {item.actor}
                  </span>{' '}
                  <span className="font-medium text-[#60717A] dark:text-[#C5D0CD]">
                    {item.action}
                  </span>
                </p>
                <span className="block text-[11px] font-semibold text-[#60717A]/80 dark:text-[#9FB1BC]/70 mt-0.5">
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
