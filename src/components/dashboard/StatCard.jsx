import React from 'react';
import { 
  FileText, 
  Activity, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

const iconMap = {
  FileText,
  Activity,
  Clock,
  CheckCircle2,
};

export default function StatCard({ stat }) {
  const {
    label,
    value,
    trend,
    description,
    iconName,
    accentColor = 'green', // 'green' | 'olive' | 'blue'
  } = stat;

  const Icon = iconMap[iconName] || FileText;

  const getTheme = () => {
    switch (accentColor) {
      case 'olive':
        return {
          iconBox: 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400',
          trendText: 'text-amber-700 dark:text-amber-400',
          chartStroke: '#D4A84F',
        };
      case 'blue':
        return {
          iconBox: 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400',
          trendText: 'text-blue-700 dark:text-blue-400',
          chartStroke: '#3B82F6',
        };
      case 'green':
      default:
        return {
          iconBox: 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-[#168A5B] dark:text-emerald-400',
          trendText: 'text-[#168A5B] dark:text-emerald-400',
          chartStroke: '#168A5B',
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B]/40 dark:hover:border-[#168A5B]/60 rounded-2xl p-4 sm:p-5 h-[142px] flex flex-col justify-between transition-all duration-200 shadow-2xs dark:shadow-xl hover:shadow-md relative overflow-hidden group">
      
      {/* Top row: Icon inside rounded square + Large Prominent Number */}
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${theme.iconBox}`}>
          <Icon className="w-5 h-5" strokeWidth={2.2} />
        </div>

        <span className="text-3xl sm:text-4xl font-black text-[#14213D] dark:text-[#F5F5F0] tracking-tight font-mono">
          {value}
        </span>
      </div>

      {/* Middle row: Strong Title + Small Description */}
      <div className="space-y-0.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
          {label}
        </h3>
        <p className="text-[11px] text-[#64748B] dark:text-[#A8B3B0] line-clamp-1">
          {description}
        </p>
      </div>

      {/* Bottom row: Small Trend Indicator + Subtle Decorative Mini Wave Chart */}
      <div className="flex items-end justify-between pt-1">
        <span className={`text-[11px] font-semibold tracking-wide flex items-center gap-1 ${theme.trendText}`}>
          {trend}
        </span>

        {/* Very subtle decorative mini line/chart at bottom-right */}
        <div className="w-16 h-5 opacity-60 group-hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 64 20" fill="none" className="w-full h-full">
            <path
              d="M2 14 C12 8, 22 18, 34 10 C46 2, 54 12, 62 6"
              stroke={theme.chartStroke}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

    </div>
  );
}
