import React from 'react';
import { Sprout } from 'lucide-react';

/**
 * DeveloperIntro — Header, Badge, Name, Subtitle and Bio Description
 * Matches the reference image typography, spacing, and editorial hierarchy.
 */
export default function DeveloperIntro() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Rounded mint-green badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7F6EF] dark:bg-[#008F63]/20 border border-[#C8EBDC] dark:border-[#008F63]/30 shadow-2xs">
        <Sprout className="w-3.5 h-3.5 text-[#008F63] dark:text-[#38D59E]" />
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#008F63] dark:text-[#38D59E] uppercase">
          MEET THE DEVELOPER
        </span>
      </div>

      {/* 2. Hello! Greeting with Waving Hand */}
      <div className="flex items-center gap-2">
        <span className="text-base sm:text-lg font-semibold text-[#071A2B] dark:text-[#F5F5F0]">
          Hello!
        </span>
        <span className="text-xl inline-block animate-wave origin-[70%_70%]">
          👋
        </span>
      </div>

      {/* 3. Main Editorial Serif Heading */}
      <div className="space-y-1">
        <h2 
          style={{ fontFamily: "'Playfair Display', 'Merriweather', 'Georgia', serif" }}
          className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#071A2B] dark:text-[#F5F5F0] tracking-tight leading-[1.1]"
        >
          Developed by
        </h2>
        <h3 
          style={{ fontFamily: "'Playfair Display', 'Merriweather', 'Georgia', serif" }}
          className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#008F63] dark:text-[#00B878] tracking-tight leading-[1.1]"
        >
          Prachi Priya
        </h3>
      </div>

      {/* 4. Subtitle Tagline */}
      <p className="text-[11px] sm:text-xs lg:text-sm font-bold tracking-[0.24em] text-[#557A68] dark:text-[#D4A84F] uppercase">
        DESIGN &nbsp;•&nbsp; DEVELOP &nbsp;•&nbsp; BUILD &nbsp;•&nbsp; IMPACT
      </p>

      {/* 5. Narrative Description */}
      <p className="text-sm sm:text-base text-[#60717A] dark:text-[#9FB1BC] max-w-xl leading-relaxed font-normal">
        A passionate developer dedicated to building meaningful digital solutions for a smarter and better campus experience.
      </p>
    </div>
  );
}
