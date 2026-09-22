import React from 'react';
import { Code2, Lightbulb, Settings, Heart } from 'lucide-react';

/**
 * DeveloperSkills — Four compact feature items in one horizontal row
 * - Small rounded white icon boxes
 * - Green icons with gold accent on Lightbulb
 * - Minimal two-line text
 * - Responsive flex / grid matching reference
 */
export default function DeveloperSkills() {
  const skills = [
    {
      icon: Code2,
      line1: 'Creative',
      line2: 'Development',
      iconColor: 'text-[#008F63] dark:text-[#38D59E]',
      iconBg: 'bg-white dark:bg-[#11232B]',
      border: 'border-[#DCEBE2] dark:border-white/10',
    },
    {
      icon: Lightbulb,
      line1: 'User-Centric',
      line2: 'Design',
      iconColor: 'text-[#D4A84F] dark:text-[#E5B85C]',
      iconBg: 'bg-white dark:bg-[#11232B]',
      border: 'border-[#EAE1D0] dark:border-white/10',
    },
    {
      icon: Settings,
      line1: 'Problem',
      line2: 'Solving',
      iconColor: 'text-[#008F63] dark:text-[#38D59E]',
      iconBg: 'bg-white dark:bg-[#11232B]',
      border: 'border-[#DCEBE2] dark:border-white/10',
    },
    {
      icon: Heart,
      line1: 'Better',
      line2: 'Community',
      iconColor: 'text-[#008F63] fill-[#008F63] dark:text-[#38D59E] dark:fill-[#38D59E]',
      iconBg: 'bg-white dark:bg-[#11232B]',
      border: 'border-[#DCEBE2] dark:border-white/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 pt-1">
      {skills.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 dark:bg-[#0D1C24]/80 backdrop-blur-sm border border-[#E0EBE4] dark:border-white/10 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Small rounded white icon box */}
            <div
              className={`w-11 h-11 rounded-xl ${item.iconBg} ${item.border} border shadow-2xs flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`w-5 h-5 ${item.iconColor} stroke-[2.2]`} />
            </div>

            {/* Two-line minimal text */}
            <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-tight">
              {item.line1}
            </span>
            <span className="text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] leading-tight mt-0.5">
              {item.line2}
            </span>
          </div>
        );
      })}
    </div>
  );
}
