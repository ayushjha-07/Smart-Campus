import React from 'react';

/**
 * HeroCalligraphy — "Your Voice / A Better Campus" right-side hero banner treatment.
 * 
 * Features:
 * - Subtle soft white translucent background with delicate glass blur (no solid white blob/oval)
 * - Premium script typography in dark navy (#07121A)
 * - Balanced, compact sizing positioned in the upper-right area
 * - Thin curved green underline stroke below "A Better Campus"
 * - Campus photograph remains visible, sharp, and unobstructed underneath
 */
export default function HeroCalligraphy({ className = '' }) {
  return (
    <div className={`hidden sm:block relative select-none self-start shrink-0 ${className}`}>
      
      {/* Container with soft translucent gradient & subtle glass effect (NOT a solid white blob) */}
      <div className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl overflow-hidden">
        
        {/* Subtle soft white translucent gradient backdrop */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.22) 55%, rgba(255, 255, 255, 0.05) 80%, transparent 100%)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
          }}
        />

        {/* Delicate horizontal soft fade behind text */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.18) 15%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.20) 85%, transparent 100%)',
          }}
        />

        {/* Foreground Elegant Script Text */}
        <div className="relative z-10 text-right pr-1">
          <p className="font-['Dancing_Script',cursive] text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-[#07121A] tracking-normal leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.75)]">
            Your Voice
          </p>
          <p className="font-['Dancing_Script',cursive] text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-[#07121A] tracking-normal leading-tight mt-0.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.75)]">
            A Better Campus
          </p>

          {/* Thin Green Underline Stroke */}
          <div className="flex justify-end mt-0.5">
            <svg
              className="w-26 sm:w-30 h-2 text-[#078A5A]"
              viewBox="0 0 140 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8C40 5.5 90 3 137 2"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}

