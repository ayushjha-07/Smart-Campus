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
      
      <div className="relative px-3 py-1">
        
        {/* Layer 1: Feathered Backdrop Blur with Radial Mask — soft Gaussian defocus of underlying campus photo without rectangular borders */}
        <div 
          className="absolute -inset-x-20 -inset-y-16 pointer-events-none z-0"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maskImage: 'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.25) 55%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.25) 55%, transparent 70%)',
          }}
        />

        {/* Layer 2: Wide Atmospheric Radiant White Light Bloom — soft cloud fading to transparent well before element bounds */}
        <div 
          className="absolute -inset-x-24 -inset-y-20 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 48%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.94) 22%, rgba(255, 255, 255, 0.78) 42%, rgba(255, 255, 255, 0.38) 58%, rgba(255, 255, 255, 0.08) 72%, transparent 82%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Layer 3: Core Luminous Pure-White Center right behind text for maximum clarity and contrast */}
        <div 
          className="absolute -inset-x-12 -inset-y-8 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.96) 30%, rgba(255, 255, 255, 0.65) 55%, transparent 75%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Layer 4: Foreground Script Calligraphy */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <p 
            className="font-['Dancing_Script',cursive] text-[23px] sm:text-[26px] lg:text-[28px] font-bold text-[#0B1E36] leading-none tracking-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]"
            style={{ transform: 'skewX(-6deg)' }}
          >
            Your Voice
          </p>
          <p 
            className="font-['Dancing_Script',cursive] text-[28px] sm:text-[31px] lg:text-[34px] font-bold text-[#0B1E36] leading-tight mt-1 tracking-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]"
            style={{ transform: 'skewX(-6deg)' }}
          >
            A Better Campus
          </p>

          {/* Thin Vibrant Green Underline Brush Stroke */}
          <div className="flex justify-center mt-1 w-full" style={{ transform: 'skewX(-6deg)' }}>
            <svg
              className="w-32 sm:w-36 lg:w-40 h-2.5 text-[#00A86B]"
              viewBox="0 0 150 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7.5C45 5 100 3 146 2.5"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
}


