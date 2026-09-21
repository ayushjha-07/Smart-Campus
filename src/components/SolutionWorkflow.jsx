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
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#008F63]/5 dark:bg-[#315C3A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4F1] dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#315C3A]/40 text-[#008F63] dark:text-[#71844A] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span>Seamless Campus Flow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight mb-4">
            One Platform. Complete Visibility.
          </h2>

          <p className="text-base sm:text-lg text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto leading-relaxed">
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
                    className={`h-full p-5 rounded-[18px] flex flex-col justify-between transition-all duration-300 border ${
                      isAiStep
                        ? 'bg-gradient-to-b from-white to-[#F0FDF4] dark:from-[#0D1B22] dark:to-[#122822] border-[#00A875]/50 dark:border-[#71844A]/50 shadow-md shadow-[#008F63]/5 dark:shadow-[#315C3A]/10'
                        : 'bg-white dark:bg-[#0D1B22]/85 hover:bg-[#FCFEFD] dark:hover:bg-[#13242E] border-[#DDE8E3] dark:border-white/10 hover:border-[#008F63]/50 dark:hover:border-[#315C3A]/50 shadow-xs hover:shadow-md'
                    } group-hover:-translate-y-1`}
                  >
                    <div>
                      {/* Step index pill & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isAiStep
                              ? 'bg-[#008F63] text-white border-[#008F63] dark:bg-[#D4A84F] dark:text-[#07121A] dark:border-[#D4A84F]'
                              : 'bg-[#EEF4F1] dark:bg-[#07121A] text-[#008F63] dark:text-[#71844A] border-[#DDE8E3] dark:border-white/10 group-hover:border-[#008F63] dark:group-hover:border-[#315C3A]'
                          }`}
                        >
                          {step.step}
                        </span>

                        <div
                          className={`p-2 rounded-lg border ${
                            isAiStep
                              ? 'bg-[#EEF4F1] dark:bg-[#315C3A]/30 border-[#00A875]/40 dark:border-[#71844A]/50 text-[#008F63] dark:text-[#D4A84F]'
                              : 'bg-[#EEF4F1] dark:bg-[#07121A] border-[#DDE8E3] dark:border-white/10 text-[#536673] dark:text-[#71844A] group-hover:text-[#008F63] dark:group-hover:text-[#F5F5F0]'
                          } transition-colors`}
                        >
                          <IconComponent className="w-4 h-4 stroke-[2]" />
                        </div>
                      </div>

                      {/* Step Labels */}
                      <h3 className="text-sm font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-snug mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[11px] font-bold text-[#008F63] dark:text-[#D4A84F] uppercase tracking-wider mb-2">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-[12px] text-[#60717A] dark:text-[#9FB1BC] leading-relaxed mt-2 pt-2 border-t border-[#DCE5E2] dark:border-white/5">
                      {step.description}
                    </p>
                  </div>

                  {/* Desktop Right Connector Arrow */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-[#536673] dark:text-[#71844A]/60">
                      <div className="w-5 h-5 rounded-full bg-white dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#315C3A]/50 flex items-center justify-center shadow-xs">
                        <ArrowRight className="w-3 h-3 text-[#008F63] dark:text-[#D4A84F]" />
                      </div>
                    </div>
                  )}

                  {/* Mobile Down Connector Arrow */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center py-2 text-[#536673] dark:text-[#71844A]/60">
                      <ChevronDown className="w-5 h-5 animate-bounce text-[#008F63] dark:text-[#D4A84F]" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
