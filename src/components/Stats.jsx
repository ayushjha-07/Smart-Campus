import React from 'react';
import { FileText, Clock, CheckCircle, BarChart2 } from 'lucide-react';

/**
 * ProcessCards (Stats) — Section 3 of the Smart Campus Landing Page
 * Faithfully matches Section 3 in the reference image (scratch_sec3.png):
 * 4 horizontal cards:
 * 1. Report - "Raise your concern"
 * 2. Track - "Stay updated"
 * 3. Resolve - "Get it addressed"
 * 4. Improve - "Build a better campus"
 */
const processSteps = [
  {
    id: 'report',
    title: 'Report',
    subtitle: 'Raise your concern',
    icon: FileText,
  },
  {
    id: 'track',
    title: 'Track',
    subtitle: 'Stay updated',
    icon: Clock,
  },
  {
    id: 'resolve',
    title: 'Resolve',
    subtitle: 'Get it addressed',
    icon: CheckCircle,
  },
  {
    id: 'improve',
    title: 'Improve',
    subtitle: 'Build a better campus',
    icon: BarChart2,
  },
];

export default function Stats() {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {processSteps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.id}
              className="bg-white dark:bg-[#0D1F2D] border border-[#E2EAE5] dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#008F63]/50 transition-all duration-200 flex items-center gap-4 group cursor-default"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#E8F5EE] dark:bg-[#008F63]/20 flex items-center justify-center text-[#008F63] dark:text-[#00B878] group-hover:scale-105 transition-transform shrink-0">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-[#0B253A] dark:text-[#F5F5F0] tracking-tight">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#60717A] dark:text-[#9FB1BC] mt-0.5 font-medium truncate">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
