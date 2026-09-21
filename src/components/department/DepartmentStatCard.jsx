import React from 'react';
import {
  ClipboardList,
  Clock,
  LoaderCircle,
  CheckCircle2,
  Timer
} from 'lucide-react';

const iconMap = {
  ClipboardList,
  Clock,
  LoaderCircle,
  CheckCircle2,
  Timer,
};

export default function DepartmentStatCard({ stat }) {
  const Icon = iconMap[stat.iconName] || ClipboardList;

  return (
    <div className="relative group overflow-hidden rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-4.5 sm:p-5 transition-all duration-200 hover:border-[#315C3A] hover:-translate-y-0.5 shadow-sm">
      {/* Top indicator strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-80"
        style={{ backgroundColor: stat.borderAccent }}
      />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-medium text-[#9FB1BC] uppercase tracking-wider block">
            {stat.title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F0] mt-1.5 tracking-tight font-sans">
            {stat.value}
          </div>
        </div>

        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm transition-colors"
          style={{
            backgroundColor: stat.bgColor,
            borderColor: `${stat.color}40`,
            color: stat.color,
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-[#1A2E3B]/60 flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#9FB1BC]">
          {stat.label}
        </span>
        <span className="text-[10px] text-[#71844A] font-medium">
          Demo Metric
        </span>
      </div>
    </div>
  );
}
