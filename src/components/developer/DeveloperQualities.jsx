import React from 'react';
import { Code2, Lightbulb, Cog, Heart } from 'lucide-react';

const qualities = [
  {
    icon: Code2,
    title: 'Creative',
    subtitle: 'Development',
  },
  {
    icon: Lightbulb,
    title: 'User-Centric',
    subtitle: 'Design',
  },
  {
    icon: Cog,
    title: 'Problem',
    subtitle: 'Solving',
  },
  {
    icon: Heart,
    title: 'Better',
    subtitle: 'Community',
  },
];

/**
 * DeveloperQualities — 4 feature tiles highlighting developer values and design philosophy
 */
export default function DeveloperQualities() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
      {qualities.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="group p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/10 hover:border-[#008F63]/50 dark:hover:border-[#00B878]/50 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center"
          >
            {/* Icon Circle */}
            <div className="w-10 h-10 rounded-xl bg-[#EAF7F1] dark:bg-[#315C3A]/25 border border-[#DDE8E3] dark:border-[#315C3A]/40 flex items-center justify-center text-[#008F63] dark:text-[#00B878] group-hover:scale-110 transition-transform mb-2">
              <Icon className="w-5 h-5 stroke-[2]" />
            </div>

            {/* Title & Subtitle */}
            <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-tight block">
              {item.title}
            </span>
            <span className="text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] leading-tight block">
              {item.subtitle}
            </span>
          </div>
        );
      })}
    </div>
  );
}
