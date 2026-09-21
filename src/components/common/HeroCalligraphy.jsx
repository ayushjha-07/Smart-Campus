import React from 'react';

/**
 * HeroCalligraphy — Subtle integrated "Your Voice / A Better Campus" right-side slogan.
 * 
 * Design specifications:
 * - No white rectangle, no glass card, no solid background, no large blob.
 * - Very subtle soft white radial glow strictly behind the text.
 * - Real campus photograph remains sharp and visible underneath.
 * - Elegant dark navy (#07121A) handwritten script typography.
 * - "Your Voice" slightly smaller, "A Better Campus" slightly larger.
 * - Thin curved green underline in #00B878.
 */
export default function HeroCalligraphy({ className = '' }) {
  return (
    <div className={`hidden sm:block relative select-none self-start shrink-0 pointer-events-none ${className}`}>
      
      <div className="relative">
        
        {/* Very subtle soft white radial glow behind the text only (no card/container) */}
        <div 
          className="absolute -inset-x-6 -inset-y-4 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 50%, transparent 75%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Foreground Elegant Script Text */}
        <div className="relative z-10 text-right pr-0.5">
          <p className="font-['Dancing_Script',cursive] text-[18px] sm:text-[20px] lg:text-[21px] font-bold text-[#07121A] leading-none tracking-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
            Your Voice
          </p>
          <p className="font-['Dancing_Script',cursive] text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-[#07121A] leading-tight mt-0.5 tracking-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
            A Better Campus
          </p>

          {/* Thin Green Underline */}
          <div className="flex justify-end mt-0.5">
            <svg
              className="w-24 sm:w-28 h-2 text-[#00B878]"
              viewBox="0 0 120 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C35 4 75 2 118 1.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}


