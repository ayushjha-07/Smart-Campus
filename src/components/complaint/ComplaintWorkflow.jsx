import React from 'react';
import { Send, Cpu, AlertTriangle, GitMerge, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ComplaintWorkflow() {
  const steps = [
    { label: 'Submit', icon: Send },
    { label: 'AI Analysis', icon: Cpu },
    { label: 'Priority', icon: AlertTriangle },
    { label: 'Assignment', icon: GitMerge },
    { label: 'Resolution', icon: CheckCircle2 },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#07121A]/60 p-4 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#F5F5F0]">Triage Pipeline</span>
        <span className="text-[10px] text-[#D4A84F] font-mono">Automated SLA routing</span>
      </div>

      {/* Connected workflow steps */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-1.5 shrink-0 px-1">
                <div className="w-8 h-8 rounded-xl bg-[#0D1B22] border border-[#315C3A]/60 text-[#71844A] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#A8B3B0]">
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <ArrowRight className="w-3 h-3 text-[#315C3A] shrink-0 mb-4" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <p className="text-[11px] text-[#A8B3B0]/70 text-center pt-1 border-t border-white/5">
        "Your complaint is automatically prepared for the right department."
      </p>
    </div>
  );
}
