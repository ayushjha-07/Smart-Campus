import React from 'react';
import { Link } from 'react-router-dom';
import {
  FilePlus,
  Users,
  Building2,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { QUICK_ACTIONS_CONFIG } from '../../data/adminDashboardData';

const iconMap = {
  FilePlus,
  Users,
  Building2,
  BarChart3
};

export default function QuickActions() {
  return (
    <div className="rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Quick Actions
          </h3>
          <p className="text-xs font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
            Direct shortcuts to key institutional administration panels
          </p>
        </div>
      </div>

      {/* 4 Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
        {QUICK_ACTIONS_CONFIG.map((action) => {
          const Icon = iconMap[action.iconName] || FilePlus;

          return (
            <Link
              key={action.id}
              to={action.route}
              className="group p-4 rounded-xl border transition-all duration-200 bg-[#F7F9F8] dark:bg-[#07121A] hover:bg-white dark:hover:bg-[#111C1F] border-[#DDE8E3] dark:border-[#1A2E3B] hover:border-[#008F63]/50 dark:hover:border-[#D4A84F]/50 shadow-2xs hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] shadow-xs text-[#008F63] dark:text-[#D4A84F] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] text-[#60717A] dark:text-[#9FB1BC]">
                  {action.badge}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#071A2B] dark:text-[#F5F5F0] group-hover:text-[#008F63] dark:group-hover:text-[#D4A84F] transition-colors flex items-center justify-between">
                  <span>{action.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
                  {action.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
