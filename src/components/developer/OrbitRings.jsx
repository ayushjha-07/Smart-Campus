import React from 'react';

/**
 * OrbitRings — Real-time live animated orbital system around Prachi's portrait
 * - Orbit 1 (Outer): 22s clockwise rotation with green+white glowing stroke
 * - Orbit 2 (Middle): 16s counter-clockwise rotation with green/gold gradient glow
 * - Orbit 3 (Inner): 11s clockwise rotation with mint/green line
 * - Continuously traveling particles (dots, sparkles, tiny hearts, leaves)
 * - Animated progressive drawing and fading curved SVG line (stroke-dasharray/offset)
 */
export default function OrbitRings({ isVisible = true }) {
  const playState = isVisible ? 'running' : 'paused';

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 overflow-visible">
      
      {/* 1. PROGRESSIVE DRAWING CURVED SVG LINE */}
      <svg 
        className="absolute w-[114%] h-[114%] pointer-events-none overflow-visible -rotate-12" 
        viewBox="0 0 500 500" 
        fill="none"
      >
        <defs>
          <linearGradient id="orbitStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#008F63" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38D59E" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4A84F" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 60 250 A 190 190 0 1 1 440 250 A 190 190 0 1 1 60 250"
          stroke="url(#orbitStrokeGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glowFilter)"
          className="animate-svg-line"
          style={{ animationPlayState: playState }}
        />
      </svg>

      {/* 2. ORBIT 1 — OUTER (22s clockwise) */}
      <div
        className="absolute w-[110%] h-[106%] rounded-[50%] border border-[#008F63]/35 dark:border-[#38D59E]/40"
        style={{
          boxShadow: '0 0 25px rgba(0, 143, 99, 0.15), inset 0 0 20px rgba(0, 143, 99, 0.08)',
          animation: 'orbitSpin 22s linear infinite',
          animationPlayState: playState,
        }}
      >
        {/* Traveling Particles on Outer Ring */}
        <div className="absolute -top-1.5 left-1/4 w-3 h-3 rounded-full bg-[#008F63] shadow-[0_0_12px_#008F63] animate-pulse" />
        <div className="absolute -bottom-1.5 right-1/3 w-2.5 h-2.5 rounded-full bg-[#D4A84F] shadow-[0_0_10px_#D4A84F]" />
        <div className="absolute top-1/2 -right-2 text-xs select-none text-[#008F63] drop-shadow-[0_0_8px_rgba(0,143,99,0.6)]">
          ✦
        </div>
        <div className="absolute top-1/3 -left-2 text-[11px] select-none">
          🍃
        </div>
        <div className="absolute bottom-1/4 -right-1.5 w-2 h-2 rounded-full bg-white dark:bg-emerald-200 shadow-[0_0_8px_#ffffff]" />
      </div>

      {/* 3. ORBIT 2 — MIDDLE (16s counter-clockwise) */}
      <div
        className="absolute w-[96%] h-[92%] rounded-[50%] border border-dashed border-[#D4A84F]/40 dark:border-[#D4A84F]/50"
        style={{
          boxShadow: '0 0 20px rgba(212, 168, 79, 0.12)',
          animation: 'orbitSpinReverse 16s linear infinite',
          animationPlayState: playState,
        }}
      >
        {/* Traveling Particles on Middle Ring */}
        <div className="absolute -top-1.5 right-1/4 w-2.5 h-2.5 rounded-full bg-[#008F63] shadow-[0_0_8px_#008F63]" />
        <div className="absolute -bottom-1 left-1/3 w-2 h-2 rounded-full bg-[#38D59E] shadow-[0_0_8px_#38D59E]" />
        <div className="absolute top-1/4 -left-2 text-[11px] select-none text-[#008F63]">
          💚
        </div>
        <div className="absolute bottom-1/3 -right-2 text-xs select-none text-[#D4A84F]">
          ✦
        </div>
      </div>

      {/* 4. ORBIT 3 — INNER (11s clockwise) */}
      <div
        className="absolute w-[82%] h-[80%] rounded-[50%] border border-[#008F63]/25 dark:border-[#38D59E]/30"
        style={{
          boxShadow: '0 0 15px rgba(0, 143, 99, 0.1)',
          animation: 'orbitSpin 11s linear infinite',
          animationPlayState: playState,
        }}
      >
        {/* Traveling Particles on Inner Ring */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D4A84F] shadow-[0_0_8px_#D4A84F]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white dark:bg-emerald-300" />
        <div className="absolute top-1/2 -left-1.5 w-1.5 h-1.5 rounded-full bg-[#008F63]" />
      </div>

    </div>
  );
}
