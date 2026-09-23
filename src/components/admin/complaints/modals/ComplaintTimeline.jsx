import React from 'react';
import {
  FileCheck,
  Search,
  Building2,
  UserCheck,
  LoaderCircle,
  CheckCircle2,
  XCircle,
  MessageSquare
} from 'lucide-react';

export default function ComplaintTimeline({ timeline = [] }) {
  const getIcon = (title = '') => {
    const t = title.toLowerCase();
    if (t.includes('submit')) return { icon: FileCheck, color: 'text-[#008F63] bg-[#008F63]/15' };
    if (t.includes('review')) return { icon: Search, color: 'text-blue-500 bg-blue-500/15' };
    if (t.includes('hostel') || t.includes('department') || t.includes('dept')) return { icon: Building2, color: 'text-purple-500 bg-purple-500/15' };
    if (t.includes('rohit') || t.includes('assign') || t.includes('staff')) return { icon: UserCheck, color: 'text-[#D4A84F] bg-[#D4A84F]/15' };
    if (t.includes('progress')) return { icon: LoaderCircle, color: 'text-[#008F63] bg-[#008F63]/15' };
    if (t.includes('resolve')) return { icon: CheckCircle2, color: 'text-[#315C3A] bg-[#315C3A]/20' };
    if (t.includes('reject')) return { icon: XCircle, color: 'text-red-500 bg-red-500/15' };
    return { icon: MessageSquare, color: 'text-slate-500 bg-slate-500/15' };
  };

  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-xs text-[#60717A] dark:text-[#9FB1BC] italic py-2">
        No timeline events recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 relative pl-3 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DDE8E3] dark:before:bg-[#243338]">
      {timeline.map((step, idx) => {
        const { icon: StepIcon, color } = getIcon(step.title);
        return (
          <div key={idx} className="relative flex items-start gap-3.5 group">
            {/* Step Icon */}
            <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center border border-white dark:border-[#0C1518] shadow-xs shrink-0 ${color}`}>
              <StepIcon className="w-3.5 h-3.5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <h5 className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                  {step.title}
                </h5>
                <span className="text-[10px] font-mono text-[#60717A] dark:text-[#9FB1BC]">
                  {step.time}
                </span>
              </div>
              {step.desc && (
                <p className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
