import React from 'react';
import { Flame, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export default function ComplaintPriorityBadge({ priority }) {
  const norm = (priority || 'LOW').toUpperCase();

  const getBadgeConfig = () => {
    switch (norm) {
      case 'CRITICAL':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40',
          icon: AlertTriangle,
          label: 'Critical',
        };
      case 'HIGH':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40',
          icon: Flame,
          label: 'High',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-[#D8A63C] dark:border-amber-900/40',
          icon: Sparkles,
          label: 'Medium',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-50 text-[#087F5B] border-emerald-200 dark:bg-emerald-950/40 dark:text-[#16B978] dark:border-emerald-900/40',
          icon: ShieldCheck,
          label: 'Low',
        };
    }
  };

  const { bg, icon: Icon, label } = getBadgeConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs ${bg}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{label}</span>
    </span>
  );
}
