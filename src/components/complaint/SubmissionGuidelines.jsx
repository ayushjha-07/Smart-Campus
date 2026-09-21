import React from 'react';
import { FileText, Lightbulb } from 'lucide-react';

export default function SubmissionGuidelines() {
  const steps = [
    {
      num: 1,
      title: 'Be clear and specific',
      desc: 'Explain what happened, when it started, and how it impacts you.',
    },
    {
      num: 2,
      title: 'Add relevant photos',
      desc: 'Images help the team understand the issue quickly.',
    },
    {
      num: 3,
      title: 'Select the right category',
      desc: 'This ensures your complaint reaches the correct department.',
    },
    {
      num: 4,
      title: 'Track your complaint',
      desc: "You'll receive updates at every stage.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 rounded-3xl p-6 shadow-md space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DDE7E2] dark:border-white/10">
        <div>
          <h3 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">
            Before You Submit
          </h3>
          <p className="text-[10px] text-[#64748B] dark:text-[#A8B3B0]">Quick guidelines for a faster resolution</p>
        </div>
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-[#168A5B] flex items-center justify-center">
          <FileText className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>

      {/* 4 Numbered Steps */}
      <div className="space-y-3 pt-1">
        {steps.map((step) => (
          <div key={step.num} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/10 text-[#168A5B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              {step.num}
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#14213D] dark:text-[#F5F5F0]">
                {step.title}
              </h4>
              <p className="text-[11px] text-[#64748B] dark:text-[#A8B3B0] leading-relaxed mt-0.5">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Highlighted Banner */}
      <div className="pt-2">
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200 shadow-2xs">
          <Lightbulb className="w-4 h-4 text-[#D4A84F] shrink-0" />
          <span className="font-medium text-[11px] sm:text-xs">
            A well-documented complaint gets resolved faster!
          </span>
        </div>
      </div>

    </div>
  );
}
