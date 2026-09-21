import React from 'react';
import { Check, Clock, GitCommit } from 'lucide-react';

export default function ComplaintTimeline({ timeline = [] }) {
  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-5 sm:p-7 shadow-xs dark:shadow-2xl backdrop-blur-xl space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] dark:border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-[#168A5B] dark:text-[#D4A84F]" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#14213D] dark:text-[#F5F5F0]">
              Complaint Timeline
            </h3>
            <span className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
              Track the step-by-step resolution lifecycle of this request
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
          </span>
          <span className="flex items-center gap-1 text-[#D4A84F]">
            <span className="w-2 h-2 rounded-full bg-[#D4A84F] animate-pulse" /> Active Stage
          </span>
          <span className="flex items-center gap-1 text-[#64748B] dark:text-[#A8B3B0]/60">
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20" /> Pending
          </span>
        </div>
      </div>

      {/* ======================================================= */}
      {/* Desktop Horizontal Timeline (Visible on lg and larger)   */}
      {/* ======================================================= */}
      <div className="hidden lg:block pt-4 pb-2">
        <div className="relative flex items-start justify-between">
          {/* Connecting Track Line */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 dark:bg-white/10 -z-0">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-[#168A5B] dark:via-[#315C3A] to-[#D4A84F] transition-all duration-500"
              style={{ width: '75%' }}
            />
          </div>

          {timeline.map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isCurrent = item.status === 'current';

            return (
              <div 
                key={item.step || index} 
                className="relative z-10 flex flex-col items-center text-center max-w-[170px] flex-1 group"
              >
                {/* Node Icon Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-mono text-xs font-bold ${
                    isCompleted
                      ? 'bg-[#168A5B] dark:bg-[#315C3A] text-white dark:text-[#F5F5F0] border-2 border-emerald-400/80 shadow-lg shadow-emerald-500/20 dark:shadow-[#315C3A]/40'
                      : isCurrent
                      ? 'bg-[#D4A84F] text-white dark:text-[#07121A] border-4 border-white dark:border-[#07121A] ring-4 ring-[#D4A84F]/40 shadow-xl shadow-[#D4A84F]/30 scale-110'
                      : 'bg-slate-100 dark:bg-[#07121A] text-[#64748B] dark:text-[#A8B3B0]/50 border-2 border-[#DDE7E2] dark:border-white/10'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{item.step}</span>
                  )}
                </div>

                {/* Stage Step & Title */}
                <div className="mt-3 space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#64748B] dark:text-[#A8B3B0]/70 uppercase">
                    Stage {item.step}
                  </span>
                  <h4 className={`text-xs font-bold ${
                    isCurrent ? 'text-[#D4A84F]' : isCompleted ? 'text-[#14213D] dark:text-[#F5F5F0]' : 'text-[#94A3B8] dark:text-[#A8B3B0]/60'
                  }`}>
                    {item.title}
                  </h4>
                </div>

                {/* Date / Time */}
                <div className="mt-1 font-mono text-[11px]">
                  {item.date === 'Pending' ? (
                    <span className="text-[#94A3B8] dark:text-[#A8B3B0]/40 italic">Pending</span>
                  ) : (
                    <span className="text-[#168A5B] dark:text-[#71844A] font-semibold">
                      {item.date} {item.time && `• ${item.time}`}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-1.5 text-[11px] text-[#64748B] dark:text-[#A8B3B0]/80 leading-tight">
                  {item.description}
                </p>

                {/* Current Stage Ribbon */}
                {isCurrent && (
                  <span className="mt-2 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-[#D4A84F]/15 border border-amber-300 dark:border-[#D4A84F]/40 text-[9px] font-bold text-[#D4A84F] tracking-wider uppercase animate-pulse">
                    Active Stage
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================= */}
      {/* Mobile/Tablet Vertical Timeline (Visible on screens < lg)*/}
      {/* ======================================================= */}
      <div className="block lg:hidden space-y-6 relative pl-4 border-l-2 border-[#DDE7E2] dark:border-white/10 ml-3">
        {timeline.map((item, index) => {
          const isCompleted = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <div key={item.step || index} className="relative pl-6 space-y-1">
              {/* Vertical Node Indicator */}
              <div
                className={`absolute -left-[25px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-[#168A5B] dark:bg-[#315C3A] text-white dark:text-[#F5F5F0] border-2 border-emerald-400 shadow-md'
                    : isCurrent
                    ? 'bg-[#D4A84F] text-white dark:text-[#07121A] border-2 border-white dark:border-[#07121A] ring-4 ring-[#D4A84F]/30 scale-105'
                    : 'bg-slate-100 dark:bg-[#07121A] text-[#64748B] dark:text-[#A8B3B0]/50 border-2 border-[#DDE7E2] dark:border-white/10'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <span>{item.step}</span>
                )}
              </div>

              {/* Text Information */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-[#64748B] dark:text-[#A8B3B0]/70">
                  Stage {item.step}
                </span>
                {isCurrent && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 dark:bg-[#D4A84F]/20 text-[#D4A84F] border border-amber-300 dark:border-[#D4A84F]/30 uppercase">
                    Active
                  </span>
                )}
              </div>

              <h4 className={`text-xs font-bold ${
                isCurrent ? 'text-[#D4A84F]' : isCompleted ? 'text-[#14213D] dark:text-[#F5F5F0]' : 'text-[#94A3B8] dark:text-[#A8B3B0]/60'
              }`}>
                {item.title}
              </h4>

              <div className="font-mono text-[10px]">
                {item.date === 'Pending' ? (
                  <span className="text-[#94A3B8] dark:text-[#A8B3B0]/40 italic">Pending</span>
                ) : (
                  <span className="text-[#168A5B] dark:text-[#71844A] font-semibold">
                    {item.date} {item.time && `• ${item.time}`}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#64748B] dark:text-[#A8B3B0]/80 leading-tight pt-0.5">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
