import React from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Timer,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

export default function AnalyticsKpiCards({ kpiData }) {
  const getIcon = (id) => {
    switch (id) {
      case 'total':
        return ClipboardList;
      case 'resolved':
        return CheckCircle2;
      case 'pending':
        return Clock;
      case 'resolution_time':
        return Timer;
      case 'critical':
        return AlertTriangle;
      default:
        return ClipboardList;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {kpiData.map((kpi) => {
        const Icon = getIcon(kpi.id);
        const isPositive = kpi.change.startsWith('+');
        const isTimeCard = kpi.id === 'resolution_time';
        const isPendingCard = kpi.id === 'pending';

        // For resolution time and pending, a decrease is good (green), increase is warning
        const isGood = (isTimeCard || isPendingCard) ? !isPositive : isPositive;

        return (
          <div
            key={kpi.id}
            className="group relative bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#008F63]/40 dark:hover:border-[#00A875]/40 transition-all duration-200"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-[#60717A] dark:text-[#A8B3B0] leading-tight">
                {kpi.title}
              </span>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${kpi.color}15`,
                  borderColor: `${kpi.color}30`,
                  color: kpi.color,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Value */}
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B] dark:text-[#F5F5F0] mb-2">
              {kpi.value}
            </div>

            {/* Change & Comparison Indicator */}
            <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-bold ${
                  isGood
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {kpi.change}
              </span>
              <span className="text-[#60717A] dark:text-[#A8B3B0] text-[10px]">
                {kpi.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
