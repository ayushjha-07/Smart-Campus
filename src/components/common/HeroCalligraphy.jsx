import React from 'react';

/**
 * HeroCalligraphy — "Your Voice / A Better Campus" badge with an authentic soft white blur
 * cloud backdrop matching the master reference image.
 */
export default function HeroCalligraphy({ className = '' }) {
  return (
    <div className={`hidden sm:block relative select-none pr-2 sm:pr-4 shrink-0 ${className}`}>
      
      {/* ================================================== */}
      {/* 1. SOFT WHITE BLUR CLOUD BACKDROP (Exact match to reference) */}
      {/* ================================================== */}
      
      {/* Layer A: Wide diffuse feathering into sky and campus foliage */}
      <div 
        className="absolute -inset-x-12 -inset-y-8 pointer-events-none z-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 38%, rgba(255, 255, 255, 0.65) 60%, rgba(255, 255, 255, 0.20) 80%, transparent 100%)',
          filter: 'blur(16px)',
          transform: 'scale(1.15)',
        }}
      />

      {/* Layer B: Dense bright white illumination directly behind the text */}
      <div 
        className="absolute -inset-x-7 -inset-y-5 pointer-events-none z-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.88) 55%, transparent 100%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Layer C: Crisp core glow for guaranteed high contrast */}
      <div 
        className="absolute -inset-x-4 -inset-y-2 pointer-events-none z-0 rounded-full bg-white/75 filter blur-xs"
      />

      {/* ================================================== */}
      {/* 2. FOREGROUND CALLIGRAPHY TEXT & GREEN UNDERLINE */}
      {/* ================================================== */}
      <div className="relative z-10 text-right px-2 py-1">
        <p className="font-['Dancing_Script',cursive] text-[28px] sm:text-[32px] lg:text-[36px] text-[#0A1B39] font-bold tracking-tight leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          Your Voice
        </p>
        <p className="font-['Dancing_Script',cursive] text-[26px] sm:text-[30px] lg:text-[34px] text-[#0A1B39] font-bold tracking-tight leading-none mt-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          A Better Campus
        </p>
        
        {/* Dynamic Curved Green Underline Stroke rising upwards to the right */}
        <div className="flex justify-end mt-1">
          <svg
            className="w-36 sm:w-44 h-3 sm:h-3.5 text-[#078A5A]"
            viewBox="0 0 160 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 11C50 7.5 110 4.5 156 3"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

    </div>
  );
}
