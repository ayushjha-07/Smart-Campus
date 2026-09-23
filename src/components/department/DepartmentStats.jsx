import React from 'react';
import {
  ClipboardList,
  Clock,
  Search,
  Loader2,
  CheckCircle2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { DEPARTMENT_KPI_BENCHMARKS } from '../../data/departmentDashboardData';

export default function DepartmentStats({ counts = null }) {
  const cards = [
    {
      id: 'assigned',
      label: 'Assigned Complaints',
      value: counts?.assigned ?? DEPARTMENT_KPI_BENCHMARKS.assigned.value,
      trend: DEPARTMENT_KPI_BENCHMARKS.assigned.trend,
      trendType: DEPARTMENT_KPI_BENCHMARKS.assigned.trendType,
      trendPeriod: DEPARTMENT_KPI_BENCHMARKS.assigned.trendPeriod,
      icon: ClipboardList,
      color: '#008F63',
      darkColor: '#00A875',
      bgColor: 'bg-[#008F63]/10 dark:bg-[#00A875]/15',
      borderColor: 'border-l-[#008F63] dark:border-l-[#00A875]'
    },
    {
      id: 'pending',
      label: 'Pending',
      value: counts?.pending ?? DEPARTMENT_KPI_BENCHMARKS.pending.value,
      trend: DEPARTMENT_KPI_BENCHMARKS.pending.trend,
      trendType: DEPARTMENT_KPI_BENCHMARKS.pending.trendType,
      trendPeriod: DEPARTMENT_KPI_BENCHMARKS.pending.trendPeriod,
      icon: Clock,
      color: '#D4A84F',
      darkColor: '#D4A84F',
      bgColor: 'bg-[#D4A84F]/10 dark:bg-[#D4A84F]/15',
      borderColor: 'border-l-[#D4A84F]'
    },
    {
      id: 'underReview',
      label: 'Under Review',
      value: counts?.underReview ?? DEPARTMENT_KPI_BENCHMARKS.underReview.value,
      trend: DEPARTMENT_KPI_BENCHMARKS.underReview.trend,
      trendType: DEPARTMENT_KPI_BENCHMARKS.underReview.trendType,
      trendPeriod: DEPARTMENT_KPI_BENCHMARKS.underReview.trendPeriod,
      icon: Search,
      color: '#3B82F6',
      darkColor: '#60A5FA',
      bgColor: 'bg-blue-500/10 dark:bg-blue-500/15',
      borderColor: 'border-l-[#3B82F6]'
    },
    {
      id: 'inProgress',
      label: 'In Progress',
      value: counts?.inProgress ?? DEPARTMENT_KPI_BENCHMARKS.inProgress.value,
      trend: DEPARTMENT_KPI_BENCHMARKS.inProgress.trend,
      trendType: DEPARTMENT_KPI_BENCHMARKS.inProgress.trendType,
      trendPeriod: DEPARTMENT_KPI_BENCHMARKS.inProgress.trendPeriod,
      icon: Loader2,
      color: '#71844A',
      darkColor: '#8CA35C',
      bgColor: 'bg-[#71844A]/10 dark:bg-[#71844A]/15',
      borderColor: 'border-l-[#71844A]'
    },
    {
      id: 'resolved',
      label: 'Resolved',
      value: counts?.resolved ?? DEPARTMENT_KPI_BENCHMARKS.resolved.value,
      trend: DEPARTMENT_KPI_BENCHMARKS.resolved.trend,
      trendType: DEPARTMENT_KPI_BENCHMARKS.resolved.trendType,
      trendPeriod: DEPARTMENT_KPI_BENCHMARKS.resolved.trendPeriod,
      icon: CheckCircle2,
      color: '#315C3A',
      darkColor: '#4C8258',
      bgColor: 'bg-[#315C3A]/10 dark:bg-[#315C3A]/20',
      borderColor: 'border-l-[#315C3A]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] border-l-4 ${card.borderColor} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#A8B3B0]">
                  {card.label}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#071A2B] dark:text-[#F5F5F0] mt-1 tracking-tight">
                  {card.value}
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
            </div>

            {/* Small Trend Indicator */}
            <div className="mt-3 pt-2.5 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 flex items-center gap-1.5 text-[11px]">
              {card.trendType === 'up' && (
                <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                  {card.trend}
                </span>
              )}
              {card.trendType === 'down' && (
                <span className="inline-flex items-center text-amber-600 dark:text-amber-400 font-bold">
                  <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                  {card.trend}
                </span>
              )}
              {card.trendType === 'neutral' && (
                <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold">
                  {card.trend}
                </span>
              )}
              <span className="text-[#60717A] dark:text-[#9FB1BC] truncate">
                {card.trendPeriod}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
