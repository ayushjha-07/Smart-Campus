import React from 'react';
import {
  Building2,
  AlertOctagon,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import { QUICK_INSIGHTS } from '../../../data/adminComplaintsData';

export default function QuickInsights() {
  const items = [
    {
      label: 'Most Reported',
      value: QUICK_INSIGHTS.mostReported.value,
      sub: QUICK_INSIGHTS.mostReported.metric,
      icon: Building2,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10 dark:bg-amber-400/15',
      border: 'border-amber-500/20 dark:border-amber-400/25'
    },
    {
      label: 'Highest Priority',
      value: QUICK_INSIGHTS.highestPriority.value,
      sub: QUICK_INSIGHTS.highestPriority.metric,
      icon: AlertOctagon,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-500/10 dark:bg-red-400/15',
      border: 'border-red-500/20 dark:border-red-400/25'
    },
    {
      label: 'Fastest Resolution',
      value: QUICK_INSIGHTS.fastestResolution.value,
      sub: QUICK_INSIGHTS.fastestResolution.metric,
      icon: Zap,
      color: 'text-[#008F63] dark:text-[#00A875]',
      bg: 'bg-[#008F63]/10 dark:bg-[#00A875]/15',
      border: 'border-[#008F63]/20 dark:border-[#00A875]/25'
    },
    {
      label: 'Needs Attention',
      value: QUICK_INSIGHTS.needsAttention.value,
      sub: QUICK_INSIGHTS.needsAttention.metric,
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10 dark:bg-purple-400/15',
      border: 'border-purple-500/20 dark:border-purple-400/25'
    }
  ];

  return (
    <div className="rounded-xl p-3 sm:p-3.5 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-2xs flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875]">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-[#071A2B] dark:text-[#F5F5F0]">
          Quick Insights:
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 flex-1">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border ${item.bg} ${item.border}`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider truncate">
                  {item.label}
                </span>
                <div className="flex items-baseline gap-1.5 truncate">
                  <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] truncate">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] truncate hidden xl:inline">
                    ({item.sub})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
