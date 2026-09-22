import React from 'react';
import { Coffee, Users, Sprout } from 'lucide-react';

/**
 * DeveloperStats — 3 subtle and elegant developer metrics below CTA
 * - 100+ Ideas Coded (Coffee)
 * - ∞ Possibilities Ahead (Users)
 * - A Greener Tomorrow (Sprout with green 'A')
 */
export default function DeveloperStats() {
  const stats = [
    {
      icon: Coffee,
      value: '100+',
      label: 'Ideas Coded',
      valueColor: 'text-[#071A2B] dark:text-[#F5F5F0]',
    },
    {
      icon: Users,
      value: '∞',
      label: 'Possibilities Ahead',
      valueColor: 'text-[#071A2B] dark:text-[#F5F5F0]',
    },
    {
      icon: Sprout,
      value: 'A',
      label: 'Greener Tomorrow',
      valueColor: 'text-[#008F63] dark:text-[#38D59E]',
    },
  ];

  return (
    <div className="pt-2 flex flex-wrap items-center justify-between sm:justify-start gap-6 sm:gap-9 border-t border-[#E5EFE9] dark:border-white/10 mt-3 select-none">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#EAF7F1] dark:bg-[#008F63]/15 flex items-center justify-center text-[#008F63] dark:text-[#38D59E] shrink-0 group-hover:scale-110 transition-transform">
              <Icon className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className={`text-base sm:text-lg font-black ${item.valueColor} leading-none tracking-tight`}>
                {item.value}
              </span>
              <span className="text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5 leading-tight">
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
