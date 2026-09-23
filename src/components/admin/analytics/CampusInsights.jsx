import React from 'react';
import {
  Compass,
  CheckCircle2,
  Building,
  Zap,
  Tag,
  Clock,
} from 'lucide-react';
import { CAMPUS_INSIGHTS_DATA } from '../../../data/analyticsData';

export default function CampusInsights() {
  const getIcon = (label) => {
    switch (label) {
      case 'Most Reported Category':
        return Tag;
      case 'Highest Complaint Volume':
        return Building;
      case 'Fastest Resolution':
        return Zap;
      case 'Most Active Priority':
        return Clock;
      case 'Most Common Status':
        return CheckCircle2;
      default:
        return Compass;
    }
  };

  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#D4A84F]/10 text-[#D4A84F] flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              Campus Insights
            </h2>
            <p className="text-xs text-[#60717A] dark:text-[#A8B3B0]">
              Key operational highlights and systemic leaders across campus facilities
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold text-[#60717A] dark:text-[#A8B3B0] bg-[#F7F9F8] dark:bg-white/5 px-2.5 py-1 rounded-lg">
          Executive Summary
        </span>
      </div>

      {/* 5 Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {CAMPUS_INSIGHTS_DATA.map((item) => {
          const Icon = getIcon(item.label);

          return (
            <div
              key={item.label}
              className="bg-[#F7F9F8] dark:bg-[#050A0C] border border-[#DDE8E3] dark:border-[#243338] rounded-xl p-4 flex flex-col justify-between hover:border-[#D4A84F]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#A8B3B0]">
                    {item.label}
                  </span>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-lg font-black text-[#071A2B] dark:text-[#F5F5F0] mb-1">
                  {item.value}
                </div>
              </div>

              <div className="pt-2 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 flex items-center justify-between">
                <span className="text-[10px] text-[#60717A] dark:text-[#A8B3B0] truncate mr-1">
                  {item.subtitle}
                </span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-white dark:bg-[#0C1518] text-[#008F63] dark:text-[#00A875] border border-[#DDE8E3] dark:border-[#243338] shrink-0">
                  {item.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
