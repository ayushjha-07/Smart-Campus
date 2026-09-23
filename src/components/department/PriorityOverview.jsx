import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { PRIORITY_OVERVIEW_DATA } from '../../data/departmentDashboardData';

export default function PriorityOverview({ onFilterPriority }) {
  const getIcon = (priority) => {
    switch (priority) {
      case 'Critical':
        return Flame;
      case 'High':
        return AlertTriangle;
      case 'Medium':
        return AlertCircle;
      case 'Low':
      default:
        return ShieldCheck;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            Priority Overview
          </h3>
          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
            Triage breakdown across operational urgency tiers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {PRIORITY_OVERVIEW_DATA.map((item) => {
          const Icon = getIcon(item.priority);
          return (
            <div
              key={item.priority}
              onClick={() => onFilterPriority && onFilterPriority(item.priority)}
              className={`rounded-xl p-3.5 sm:p-4 bg-white dark:bg-[#0C1518] border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 shadow-xs ${
                item.isWarning
                  ? 'border-red-300 dark:border-red-900/50 hover:border-red-500 ring-1 ring-red-500/20'
                  : 'border-[#DDE8E3] dark:border-[#243338] hover:border-[#008F63]/50 dark:hover:border-[#315C3A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                  style={{
                    color: item.color,
                    backgroundColor: `${item.color}15`
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.priority}</span>
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#071A2B] dark:text-[#F5F5F0]">
                  {item.count}
                </span>
              </div>

              <div className="mt-2 text-[11px] text-[#60717A] dark:text-[#9FB1BC] truncate">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
