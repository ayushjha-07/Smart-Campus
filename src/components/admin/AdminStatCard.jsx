import React from 'react';
import {
  FileText,
  Clock,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  Timer,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

const iconMap = {
  FileText,
  Clock,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  Timer,
};

export default function AdminStatCard({ stat }) {
  const Icon = iconMap[stat.iconName] || FileText;

  return (
    <div className="relative group overflow-hidden rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-4.5 sm:p-5 transition-all duration-200 hover:border-[#315C3A]/70 hover:shadow-lg hover:-translate-y-0.5">
      {/* Subtle top indicator line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-80"
        style={{ backgroundColor: stat.color }}
      />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-[#9FB1BC] block uppercase tracking-wider">
            {stat.title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F0] mt-1.5 tracking-tight font-sans">
            {stat.value}
          </div>
        </div>

        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors shadow-sm"
          style={{
            backgroundColor: stat.bgColor,
            borderColor: `${stat.color}40`,
            color: stat.color,
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Sub-label & trend pill */}
      <div className="mt-3.5 pt-3 border-t border-[#1A2E3B]/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          {stat.changeType === 'positive' && (
            <TrendingUp className="w-3.5 h-3.5 text-[#71844A]" />
          )}
          {stat.changeType === 'negative' && (
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
          )}
          {stat.changeType === 'warning' && (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          )}
          {stat.changeType === 'neutral' && (
            <TrendingDown className="w-3.5 h-3.5 text-blue-400" />
          )}

          <span
            className={
              stat.changeType === 'positive'
                ? 'text-[#A7C481]'
                : stat.changeType === 'negative'
                ? 'text-red-400 font-semibold'
                : stat.changeType === 'warning'
                ? 'text-amber-400 font-medium'
                : 'text-blue-300'
            }
          >
            {stat.change}
          </span>
        </div>

        {stat.changeLabel && (
          <span className="text-[11px] text-[#9FB1BC]/80 truncate">
            {stat.changeLabel}
          </span>
        )}
      </div>
    </div>
  );
}
