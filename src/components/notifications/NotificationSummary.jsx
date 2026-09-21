import React from 'react';
import { Bell, BellDot, AlertTriangle } from 'lucide-react';

export default function NotificationSummary({ counts, activeFilter, onSelectFilter }) {
  const cards = [
    {
      id: 'all',
      label: 'ALL NOTIFICATIONS',
      count: String(counts.all).padStart(2, '0'),
      icon: Bell,
      color: 'text-[#14213D] dark:text-[#F5F5F0]',
      borderColor: activeFilter === 'all' ? 'border-[#168A5B] ring-2 ring-[#168A5B]/20' : 'border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B]/40',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-[#168A5B] border border-emerald-200 dark:border-emerald-500/30',
    },
    {
      id: 'unread',
      label: 'UNREAD NOTICES',
      count: String(counts.unread).padStart(2, '0'),
      icon: BellDot,
      color: 'text-amber-700 dark:text-amber-400',
      borderColor: activeFilter === 'unread' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-[#DDE7E2] dark:border-white/10 hover:border-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30',
    },
    {
      id: 'important',
      label: 'IMPORTANT / URGENT',
      count: String(counts.important).padStart(2, '0'),
      icon: AlertTriangle,
      color: 'text-purple-700 dark:text-purple-400',
      borderColor: activeFilter === 'important' ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-[#DDE7E2] dark:border-white/10 hover:border-purple-400',
      iconBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectFilter(card.id)}
            className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1B22]/90 border text-left transition-all duration-200 shadow-2xs dark:shadow-xl relative overflow-hidden group cursor-pointer ${
              card.borderColor
            } ${
              isSelected ? 'shadow-md' : 'hover:-translate-y-0.5 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.iconBg} transition-transform group-hover:scale-105 shadow-2xs`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-2">
              <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${card.color}`}>
                {card.count}
              </span>
            </div>

            {isSelected && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#168A5B]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
