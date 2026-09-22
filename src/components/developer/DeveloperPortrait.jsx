import React from 'react';
import { Code2, BarChart3, GraduationCap } from 'lucide-react';
import campusAssets from '../../assets/campusAssets';

/**
 * DeveloperPortrait — Central visual showcase of Prachi Priya with decorative circular arcs,
 * floating glassmorphism information cards, and handwritten calligraphic annotation.
 */
export default function DeveloperPortrait() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto flex items-center justify-center select-none py-4 sm:py-6">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. DECORATIVE BACKGROUND GRAPHICS: Concentric Arcs & Glow      */}
      {/* ------------------------------------------------------------- */}
      {/* Ambient soft green blur */}
      <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full bg-[#008F63]/10 dark:bg-[#00B878]/15 blur-[100px] pointer-events-none -z-10" />

      {/* Large outer circular arc */}
      <div className="absolute w-[380px] sm:w-[480px] lg:w-[520px] h-[380px] sm:h-[480px] lg:h-[520px] rounded-full border-[2.5px] border-[#008F63]/25 dark:border-[#00B878]/25 pointer-events-none -z-10" />

      {/* Inner concentric ring with subtle dashed stroke */}
      <div className="absolute w-[320px] sm:w-[400px] lg:w-[440px] h-[320px] sm:h-[400px] lg:h-[440px] rounded-full border border-dashed border-[#71844A]/30 dark:border-[#71844A]/40 pointer-events-none -z-10" />

      {/* Small floating decorative green circle accent */}
      <div className="absolute -top-3 left-1/4 w-3.5 h-3.5 rounded-full bg-[#008F63] dark:bg-[#00B878] opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute bottom-16 -left-4 w-2.5 h-2.5 rounded-full bg-[#D4A84F] opacity-60 pointer-events-none" />

      {/* ------------------------------------------------------------- */}
      {/* 2. THE MAIN PORTRAIT CONTAINER (Organic Curved Frame)         */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-[270px] sm:w-[320px] md:w-[360px] lg:w-[380px] h-[380px] sm:h-[460px] md:h-[500px] lg:h-[530px] rounded-[36px] sm:rounded-[44px] overflow-hidden border-2 border-white/80 dark:border-white/15 shadow-2xl shadow-emerald-950/20 dark:shadow-black/60 bg-[#EAF7F1]/30 dark:bg-[#0D1B22]/40 backdrop-blur-xs group transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Soft interior gradient ring */}
        <div className="absolute inset-0 z-10 pointer-events-none rounded-[36px] sm:rounded-[44px] ring-1 ring-inset ring-black/5 dark:ring-white/10" />

        {/* High-Resolution Portrait Photo of Prachi Priya */}
        <img
          src={campusAssets.prachiPriyaPortrait}
          alt="Prachi Priya — Developer of Smart Campus"
          className="w-full h-full object-cover object-top filter brightness-[1.01] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
          loading="eager"
        />

        {/* Subtle bottom gradient vignette for soft visual grounding */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07121A]/30 to-transparent pointer-events-none z-10" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FLOATING GLASSMORPHISM INFORMATION CARDS                   */}
      {/* ------------------------------------------------------------- */}

      {/* CARD 1: Clean Code / Better Campus (Top-Left) */}
      <div className="absolute -left-2 sm:-left-6 top-10 sm:top-14 z-20 animate-float-slow">
        <div className="p-2.5 sm:p-3 pr-4 rounded-2xl bg-white/95 dark:bg-[#0D1B22]/95 backdrop-blur-md border border-[#DDE8E3] dark:border-white/15 shadow-lg shadow-slate-300/40 dark:shadow-black/50 flex items-center gap-3 transition-transform hover:-translate-y-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#008F63] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs sm:text-[13px] font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-none block">
              Clean Code
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] leading-none block mt-1">
              Better Campus
            </span>
            {/* Tiny accent progress line */}
            <div className="w-16 h-1 bg-[#008F63]/20 dark:bg-[#00B878]/30 rounded-full mt-1.5 overflow-hidden">
              <div className="w-10 h-full bg-[#008F63] dark:bg-[#00B878] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Ideas into Impact (Mid-Left) */}
      <div className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-4 z-20 animate-float-delayed">
        <div className="p-2.5 sm:p-3 pr-4 rounded-2xl bg-white/95 dark:bg-[#0D1B22]/95 backdrop-blur-md border border-[#DDE8E3] dark:border-white/15 shadow-lg shadow-slate-300/40 dark:shadow-black/50 flex items-center gap-3 transition-transform hover:-translate-y-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#008F63] text-white flex items-center justify-center shrink-0 shadow-xs">
            <BarChart3 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs sm:text-[13px] font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-none block">
              Ideas
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] leading-none block mt-1">
              into Impact
            </span>
            {/* Tiny accent progress line */}
            <div className="w-16 h-1 bg-[#008F63]/20 dark:bg-[#00B878]/30 rounded-full mt-1.5 overflow-hidden">
              <div className="w-12 h-full bg-[#008F63] dark:bg-[#00B878] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* CARD 3: For a Smarter Campus (Mid-Right) */}
      <div className="absolute -right-2 sm:-right-8 top-1/3 z-20 animate-float-slow">
        <div className="p-2.5 sm:p-3 pr-4 rounded-2xl bg-white/95 dark:bg-[#0D1B22]/95 backdrop-blur-md border border-[#DDE8E3] dark:border-white/15 shadow-lg shadow-slate-300/40 dark:shadow-black/50 flex items-center gap-3 transition-transform hover:-translate-y-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#008F63] text-white flex items-center justify-center shrink-0 shadow-xs">
            <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs sm:text-[13px] font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-none block">
              For a
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] leading-none block mt-1">
              Smarter Campus
            </span>
            {/* Tiny accent progress line */}
            <div className="w-16 h-1 bg-[#008F63]/20 dark:bg-[#00B878]/30 rounded-full mt-1.5 overflow-hidden">
              <div className="w-14 h-full bg-[#008F63] dark:bg-[#00B878] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* CARD 4: Good Design Solves Real Problems (Bottom-Right) */}
      <div className="absolute -right-2 sm:-right-6 bottom-10 sm:bottom-14 z-20 animate-float-delayed">
        <div className="p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#0D1B22]/95 backdrop-blur-md border border-[#DDE8E3] dark:border-white/15 shadow-lg shadow-slate-300/40 dark:shadow-black/50 max-w-[170px] sm:max-w-[190px] transition-transform hover:-translate-y-1">
          <p className="text-xs sm:text-[13px] font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-tight italic">
            “Good Design Solves Real Problems.”
          </p>
          <div className="w-6 h-0.5 bg-[#008F63] dark:bg-[#00B878] rounded-full mt-2" />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. HANDWRITTEN ANNOTATION & CURVED ARROW (Top-Right)          */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden sm:block absolute -right-2 lg:-right-4 top-2 sm:top-4 z-20 pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="font-['Dancing_Script',cursive] text-lg sm:text-xl lg:text-2xl font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-snug -rotate-6 tracking-normal">
            <span>Passion</span><br />
            <span className="pl-2">Builds</span><br />
            <span>Better Solutions</span>
          </div>

          {/* Hand-Drawn Style Curved Green SVG Arrow pointing to Prachi Priya */}
          <svg
            className="w-10 h-10 -ml-8 -mt-1 text-[#008F63] dark:text-[#00B878]"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 40 5 C 42 20, 25 25, 12 35" />
            <path d="M 12 35 L 20 32" />
            <path d="M 12 35 L 16 26" />
          </svg>
        </div>
      </div>

    </div>
  );
}
