import React from 'react';

/**
 * OrbitRings — Live animated elliptical orbit paths around the developer portrait
 * - Continuous slow rotations (22s clockwise, 16s counter-clockwise, 13s clockwise)
 * - Soft glowing green lines, thin white lines, gold highlights
 * - Moving glowing particles, tiny leaves, tiny hearts, small dots
 */
export default function OrbitRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center -z-10">
      {/* Outer Orbit Ring (22s clockwise) */}
      <div 
        className="absolute w-[104%] h-[100%] rounded-[50%] border border-[#008F63]/25 dark:border-[#38D59E]/30 animate-[spin_22s_linear_infinite]"
        style={{
          boxShadow: '0 0 25px rgba(0, 143, 99, 0.1), inset 0 0 20px rgba(0, 143, 99, 0.05)',
        }}
      >
        {/* Orbiting particles on outer ring */}
        <div className="absolute -top-1.5 left-1/3 w-2.5 h-2.5 rounded-full bg-[#008F63] shadow-[0_0_10px_#008F63] animate-pulse" />
        <div className="absolute -bottom-1.5 right-1/4 w-2 h-2 rounded-full bg-[#D4A84F] shadow-[0_0_8px_#D4A84F]" />
        <div className="absolute top-1/4 -left-1 w-2 h-2 rounded-full bg-white dark:bg-emerald-300 shadow-[0_0_6px_#ffffff]" />
      </div>

      {/* Middle Orbit Ring (16s counter-clockwise) */}
      <div 
        className="absolute w-[95%] h-[92%] rounded-[50%] border border-dashed border-[#D4A84F]/30 dark:border-[#D4A84F]/40 animate-[spin_16s_linear_infinite_reverse]"
      >
        {/* Orbiting particles on middle ring */}
        <div className="absolute -top-1 right-1/3 w-2 h-2 rounded-full bg-[#008F63] shadow-[0_0_8px_#008F63]" />
        <div className="absolute -bottom-1 left-1/4 w-1.5 h-1.5 rounded-full bg-[#38D59E]" />
      </div>

      {/* Inner Orbit Ring (13s clockwise) */}
      <div 
        className="absolute w-[86%] h-[84%] rounded-[50%] border border-[#008F63]/20 dark:border-[#38D59E]/30 animate-[spin_13s_linear_infinite]"
      >
        {/* Orbiting accent */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4A84F] shadow-[0_0_6px_#D4A84F]" />
      </div>

      {/* Soft central green radial aura */}
      <div className="absolute w-[90%] h-[90%] rounded-full bg-radial from-[#008F63]/10 via-[#E2F5EC]/15 to-transparent dark:from-[#008F63]/18 dark:via-[#004A33]/10 dark:to-transparent blur-2xl" />
    </div>
  );
}
