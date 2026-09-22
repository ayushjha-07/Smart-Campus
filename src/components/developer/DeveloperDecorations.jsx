import React from 'react';
import { Heart } from 'lucide-react';

/**
 * DeveloperDecorations — Live animated script calligraphy, floating leaves & ambient sparkles
 * - Top-right: "Passion Builds Better Solutions" with live glowing pulse, heart & curved arrow
 * - Bottom-right: "Same Campus Brighter Tomorrow" with gold flourish
 * - 6 live floating leaves with varied vertical drift and rotation delays
 */
export default function DeveloperDecorations({ isVisible = true }) {
  const playState = isVisible ? 'running' : 'paused';

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible z-10">
      
      {/* 1. TOP-RIGHT CALLIGRAPHY: "Passion Builds Better Solutions" with live pulse glow */}
      <div 
        className="absolute top-2 right-2 sm:right-6 text-right animate-text-glow"
        style={{ animationPlayState: playState }}
      >
        <div className="flex items-center justify-end gap-1.5">
          <p className="font-['Dancing_Script',cursive] text-base sm:text-lg lg:text-xl font-bold text-[#008F63] dark:text-[#38D59E] leading-tight">
            Passion Builds<br />
            Better Solutions
          </p>
          <Heart className="w-4 h-4 text-[#008F63] fill-[#008F63] dark:text-[#38D59E] dark:fill-[#38D59E] -mt-3 animate-pulse" />
        </div>
        <svg className="w-16 h-4 text-[#008F63]/70 dark:text-[#38D59E]/70 ml-auto -mt-1" viewBox="0 0 60 16" fill="none">
          <path d="M4 12 C 20 15, 45 10, 54 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M48 2 L 55 4 L 52 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 2. BOTTOM-RIGHT CALLIGRAPHY: "Same Campus Brighter Tomorrow" */}
      <div 
        className="absolute bottom-6 right-2 sm:right-6 text-right animate-text-glow"
        style={{ animationPlayState: playState }}
      >
        <p className="font-['Dancing_Script',cursive] text-base sm:text-lg lg:text-xl font-bold text-[#008F63] dark:text-[#38D59E] leading-tight">
          Same Campus<br />
          Brighter Tomorrow
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4A84F] to-[#008F63] ml-auto rounded-full mt-1" />
      </div>

      {/* 3. 6 LIVE FLOATING & SWAYING LEAVES WITH VARIED TIMINGS */}
      <div 
        className="absolute top-12 left-4 text-lg select-none opacity-85 animate-leaf-drift-1"
        style={{ animationPlayState: playState, filter: 'drop-shadow(0 2px 8px rgba(0, 143, 99, 0.25))' }}
      >
        🍃
      </div>
      <div 
        className="absolute top-1/4 right-0 text-base select-none opacity-80 animate-leaf-drift-2"
        style={{ animationPlayState: playState, filter: 'drop-shadow(0 2px 8px rgba(0, 143, 99, 0.25))' }}
      >
        🌿
      </div>
      <div 
        className="absolute bottom-28 left-8 text-sm select-none opacity-75 animate-leaf-drift-3"
        style={{ animationPlayState: playState, filter: 'drop-shadow(0 2px 8px rgba(0, 143, 99, 0.25))' }}
      >
        🍃
      </div>
      <div 
        className="absolute bottom-16 right-16 text-base select-none opacity-80 animate-leaf-drift-4"
        style={{ animationPlayState: playState, filter: 'drop-shadow(0 2px 8px rgba(0, 143, 99, 0.25))' }}
      >
        🌿
      </div>
      <div 
        className="absolute top-2 left-1/3 text-xs select-none opacity-70 animate-leaf-drift-2"
        style={{ animationPlayState: playState }}
      >
        🍃
      </div>
      <div 
        className="absolute bottom-4 left-1/4 text-xs select-none opacity-75 animate-leaf-drift-3"
        style={{ animationPlayState: playState }}
      >
        🍃
      </div>

    </div>
  );
}
