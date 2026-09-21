import React from 'react';
import { 
  TrendingUp, 
  Leaf, 
  Building2, 
  Users, 
  BarChart3, 
  Lightbulb 
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';

export default function CampusInsight() {
  const featureItems = [
    {
      id: 'feat-1',
      label: 'Cleaner Campus',
      icon: Leaf,
      boxClass: 'bg-emerald-50 border-emerald-200 text-[#168A5B]',
    },
    {
      id: 'feat-2',
      label: 'Better Facilities',
      icon: Building2,
      boxClass: 'bg-amber-50 border-amber-200 text-[#D4A84F]',
    },
    {
      id: 'feat-3',
      label: 'Stronger Community',
      icon: Users,
      boxClass: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
    {
      id: 'feat-4',
      label: 'Data Driven Solutions',
      icon: BarChart3,
      boxClass: 'bg-blue-50 border-blue-200 text-blue-600',
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#0B171D] border border-[#DDE7E2] dark:border-white/10 relative overflow-hidden shadow-2xs dark:shadow-xl transition-all duration-300 min-h-[175px] sm:min-h-[185px] flex items-center">
      
      {/* Background CGC University Photo on Right Side with Smooth Fade */}
      <div className="absolute right-0 top-0 bottom-0 h-full w-auto max-w-[50%] md:max-w-[40%] pointer-events-none select-none z-0 hidden sm:block">
        <img
          src={campusAssets.aerialImage}
          alt="CGC University Mohali Aerial Campus"
          className="h-full w-full object-cover object-right filter brightness-[1.0] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0D1B22] dark:via-[#0D1B22]/80 dark:to-transparent" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 w-full p-5 sm:p-6 lg:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Section: Badge, Heading, Subtitle, Quote */}
        <div className="max-w-xl space-y-2.5">
          
          {/* Top Pill Badge: Campus Analytics Pulse */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
            <TrendingUp className="w-3.5 h-3.5 text-[#D4A84F]" />
            <span>Campus Analytics Pulse</span>
          </div>

          {/* Main Title: Campus Insight */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-[#14213D] dark:text-[#F5F5F0]">
            Campus <span className="text-[#168A5B]">Insight</span>
          </h2>

          {/* Subtext Body */}
          <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] leading-relaxed max-w-md">
            Cleanliness and infrastructure complaints have increased recently. Your reports help administrators identify recurring campus issues and allocate maintenance crews effectively.
          </p>

          {/* Quote & Underline */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#14213D] dark:text-[#F5F5F0]">
              <Lightbulb className="w-3.5 h-3.5 text-[#D4A84F] shrink-0" />
              <span className="italic">
                &ldquo;Your voice helps improve campus.&rdquo;
              </span>
            </div>
            <div className="w-14 h-0.5 bg-[#D4A84F] rounded-full mt-1.5" />
          </div>
        </div>

        {/* Center-Right Section: 4 Square Feature Cards in a Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 shrink-0 lg:mr-[300px] xl:mr-[320px] z-10">
          {featureItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex flex-col items-center group cursor-default">
                {/* Rounded square card */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs ${item.boxClass}`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                {/* Label below */}
                <span className="text-[10px] sm:text-[11px] font-medium text-center mt-1.5 leading-tight max-w-[70px] text-[#64748B] dark:text-[#A8B3B0]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
