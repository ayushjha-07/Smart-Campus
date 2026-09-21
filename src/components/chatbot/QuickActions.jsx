import React from 'react';
import { PlusCircle, Clock, Bell, HelpCircle, PhoneCall } from 'lucide-react';
import { QUICK_ACTION_PROMPTS } from './chatbotKnowledge';

const ICON_MAP = {
  PlusCircle: PlusCircle,
  Clock: Clock,
  Bell: Bell,
  HelpCircle: HelpCircle,
  PhoneCall: PhoneCall
};

/**
 * QuickActions — Clickable quick topic chips for rapid student interactions
 */
export default function QuickActions({ onSelectAction }) {
  return (
    <div className="py-2.5 px-4 bg-slate-50/80 dark:bg-[#061824]/60 border-y border-slate-200/70 dark:border-white/5 select-none">
      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
        Quick Suggestions
      </p>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {QUICK_ACTION_PROMPTS.map((action) => {
          const Icon = ICON_MAP[action.icon] || PlusCircle;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onSelectAction(action.label)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#0B202E] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-[#00B878] dark:hover:border-[#00B878] hover:text-[#00A86B] dark:hover:text-[#10E894] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 active:scale-95 transition-all shadow-2xs cursor-pointer"
            >
              <Icon className="w-3.5 h-3.5 text-[#00B878]" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
