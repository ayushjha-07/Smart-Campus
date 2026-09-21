import React from 'react';
import { Activity, Lightbulb } from 'lucide-react';
import cgcAerialPhoto from '../../assets/cgc_aerial_photo.png';

export default function CampusInsightHero() {
  return (
    <div className="relative rounded-[22px] sm:rounded-[26px] bg-[#071720] border border-[#1F383D] shadow-2xl overflow-hidden min-h-[220px] flex items-center">
      
      {/* Right side: Authentic CGC University aerial campus photograph */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[58%] lg:w-[56%] overflow-hidden pointer-events-none">
        <img
          src={cgcAerialPhoto}
          alt="CGC University Aerial Campus"
          className="w-full h-full object-cover object-center sm:object-right filter brightness-[1.02] contrast-[1.05]"
        />
        {/* Deep navy gradient overlay ensuring crisp left-side text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071720] via-[#071720]/85 sm:via-[#071720]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071720]/60 via-transparent to-transparent sm:hidden" />
      </div>

      {/* Left side: Campus Insight content */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-xl space-y-3.5">
        
        {/* Campus Analytics Pulse Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06131A]/90 border border-[#D4A84F]/40 text-[#D4A84F] text-[11px] font-semibold shadow-sm backdrop-blur-sm">
          <Activity className="w-3.5 h-3.5" />
          <span>Campus Analytics Pulse</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F0] tracking-tight leading-tight">
          Campus <span className="text-[#34D399]">Insight</span>
        </h2>

        {/* Body Text */}
        <p className="text-xs sm:text-sm text-[#A8B3B0] leading-relaxed max-w-lg">
          Cleanliness and infrastructure complaints have increased recently. Your reports help administrators identify recurring campus issues and allocate maintenance crews effectively.
        </p>

        {/* Highlight Quote */}
        <div className="pt-2 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#D4A84F]/20 flex items-center justify-center text-[#D4A84F] shrink-0 border border-[#D4A84F]/30">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-serif italic font-medium text-[#F5F5F0] tracking-wide">
              “Your voice helps improve campus.”
            </span>
            <div className="h-0.5 w-10 bg-[#D4A84F] mt-0.5 rounded-full" />
          </div>
        </div>

      </div>

    </div>
  );
}
