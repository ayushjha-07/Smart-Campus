import React from 'react';

/**
 * DeveloperDecorations — Subtle floating leaves and ambient particles
 * The script calligraphy ("Passion Builds Better Solutions" & "Same Campus Brighter Tomorrow")
 * is already artistically rendered in the master artwork.
 * This component provides real live animated floating leaves and ambient glowing particles.
 */
export default function DeveloperDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible -z-5">
      {/* 1. Subtle Swaying Floating Leaves */}
      <div 
        className="absolute top-10 left-4 text-base opacity-75 animate-[bounce_4s_ease-in-out_infinite]"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 143, 99, 0.2))' }}
      >
        🍃
      </div>
      <div 
        className="absolute bottom-20 left-10 text-sm opacity-70 animate-[pulse_3.5s_ease-in-out_infinite]"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 143, 99, 0.15))' }}
      >
        🌿
      </div>
      <div 
        className="absolute top-1/4 -right-2 text-base opacity-80 animate-[bounce_5s_ease-in-out_infinite]"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 143, 99, 0.2))' }}
      >
        🍃
      </div>

      {/* 2. Floating tiny green hearts & gold sparkles */}
      <div className="absolute top-4 left-1/3 text-xs text-[#008F63] opacity-80 animate-pulse">
        💚
      </div>
      <div className="absolute bottom-12 right-1/4 text-xs text-[#D4A84F] opacity-75 animate-ping duration-[3000ms]">
        ✦
      </div>
    </div>
  );
}
