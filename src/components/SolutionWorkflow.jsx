import React from 'react';
import { 
  UserCheck, 
  Send, 
  Cpu, 
  AlertTriangle, 
  GitMerge, 
  CheckCircle2, 
  BellRing,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { workflowSteps } from '../data/landingData';

const iconMap = {
  UserCheck,
  Send,
  Cpu,
  AlertTriangle,
  GitMerge,
  CheckCircle2,
  BellRing,
};

export default function SolutionWorkflow() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#07121A]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#315C3A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1B22] border border-[#315C3A]/40 text-[#71844A] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Seamless Campus Flow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F0] tracking-tight mb-4">
            One Platform. Complete Visibility.
          </h2>

          <p className="text-base sm:text-lg text-[#9FB1BC] max-w-2xl mx-auto">
            From initial report to final confirmation, experience a continuous, automated lifecycle designed for speed, accountability, and clarity.
          </p>
        </div>

        {/* Workflow Pipeline */}
        <div className="relative">
          
          {/* Desktop/Tablet Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-3">
            {workflowSteps.map((step, idx) => {
              const IconComponent = iconMap[step.iconName] || Cpu;
              const isLast = idx === workflowSteps.length - 1;
              const isAiStep = step.title.includes('AI') || step.title.includes('Priority');

              return (
                <div key={step.step} className="relative group flex flex-col items-stretch">
                  
                  {/* Card Body */}
                  <div
                    className={`h-full p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 border ${
                      isAiStep
                        ? 'bg-gradient-to-b from-[#0D1B22] to-[#122822] border-[#71844A]/50 shadow-lg shadow-[#315C3A]/10'
                        : 'bg-[#0D1B22]/85 hover:bg-[#13242E] border-white/10 hover:border-[#315C3A]/50'
                    } group-hover:-translate-y-1`}
                  >
                    <div>
                      {/* Step index pill & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isAiStep
                              ? 'bg-[#D4A84F] text-[#07121A] border-[#D4A84F]'
                              : 'bg-[#07121A] text-[#71844A] border-white/10 group-hover:border-[#315C3A]'
                          }`}
                        >
                          {step.step}
                        </span>

                        <div
                          className={`p-2 rounded-lg border ${
                            isAiStep
                              ? 'bg-[#315C3A]/30 border-[#71844A]/50 text-[#D4A84F]'
                              : 'bg-[#07121A] border-white/10 text-[#71844A] group-hover:text-[#F5F5F0]'
                          } transition-colors`}
                        >
                          <IconComponent className="w-4 h-4 stroke-[2]" />
                        </div>
                      </div>

                      {/* Step Labels */}
                      <h3 className="text-sm font-bold text-[#F5F5F0] leading-snug mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#D4A84F] uppercase tracking-wider mb-2">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-[12px] text-[#9FB1BC] leading-relaxed mt-2 pt-2 border-t border-white/5">
                      {step.description}
                    </p>
                  </div>

                  {/* Desktop Right Connector Arrow */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-[#71844A]/60">
                      <div className="w-5 h-5 rounded-full bg-[#07121A] border border-[#315C3A]/50 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-[#D4A84F]" />
                      </div>
                    </div>
                  )}

                  {/* Mobile Down Connector Arrow */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center py-2 text-[#71844A]/60">
                      <ChevronDown className="w-5 h-5 animate-bounce text-[#D4A84F]" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom banner notice */}
        <div className="mt-12 bg-[#0D1B22]/60 border border-[#315C3A]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#315C3A] animate-ping" />
            <span className="text-xs sm:text-sm text-[#F5F5F0]">
              Every ticket generates an immutable audit trail from entry to student confirmation.
            </span>
          </div>
          <a
            href="#tracking"
            className="text-xs font-semibold text-[#D4A84F] hover:text-[#E5BF6E] flex items-center gap-1 shrink-0"
          >
            <span>View live sample ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
