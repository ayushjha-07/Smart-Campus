import React from 'react';
import {
  FileText,
  Clock,
  Loader,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const iconMap = {
  FileText,
  Clock,
  Loader,
  CheckCircle,
  AlertTriangle
};

export default function AdminStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
      {stats.map((card) => {
        const IconComponent = iconMap[card.iconName] || FileText;
        const isCritical = card.id === 'critical';

        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              isCritical
                ? 'bg-white dark:bg-[#0C1518] border-red-200 dark:border-red-900/50 shadow-xs'
                : 'bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs'
            }`}
          >
            {/* Top Row: Icon & Trend */}
            <div className="flex items-center justify-between">
              {/* Icon Box */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  isCritical
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-[#EF4444]'
                    : card.id === 'total'
                    ? 'bg-emerald-50 dark:bg-[#008F63]/15 border-emerald-200 dark:border-[#008F63]/30 text-[#008F63]'
                    : card.id === 'pending'
                    ? 'bg-amber-50 dark:bg-[#D4A84F]/15 border-amber-200 dark:border-[#D4A84F]/30 text-[#D4A84F]'
                    : card.id === 'in-progress'
                    ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50 text-[#3B82F6]'
                    : 'bg-emerald-50 dark:bg-[#315C3A]/25 border-emerald-200 dark:border-[#315C3A]/50 text-[#315C3A] dark:text-[#A7C481]'
                }`}
              >
                <IconComponent className="w-5 h-5 stroke-[2]" />
              </div>

              {/* Trend Pill */}
              <div
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isCritical
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40'
                    : card.changeType === 'positive'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#00A875] border border-emerald-200 dark:border-emerald-900/40'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {card.changeType === 'positive' && !isCritical ? (
                  <TrendingUp className="w-3 h-3 text-[#008F63] dark:text-[#00A875]" />
                ) : isCritical ? (
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-slate-500" />
                )}
                <span>{card.change}</span>
              </div>
            </div>

            {/* Bottom Row: Large Number & Label */}
            <div className="mt-3.5">
              <span className={`block text-2xl sm:text-3xl font-black tracking-tight ${
                isCritical ? 'text-red-600 dark:text-red-400' : 'text-[#071A2B] dark:text-[#F5F5F0]'
              }`}>
                {card.value}
              </span>
              <span className="block text-xs font-bold text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
                {card.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
