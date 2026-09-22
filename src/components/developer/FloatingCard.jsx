import React from 'react';

/**
 * FloatingCard — Glassmorphic card attached to the live orbital system
 * - Stays upright and readable via parent counter-rotation
 * - Hover interactions: pauses movement, lifts 6px, scales to 1.04, increases shadow and green glow
 */
export default function FloatingCard({
  icon: Icon,
  line1,
  line2,
  iconBg = 'bg-[#008F63]',
  iconColor = 'text-white',
  className = '',
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl 
        bg-white/85 dark:bg-[#0D1C24]/90 backdrop-blur-[14px] 
        border border-white/80 dark:border-white/15 
        shadow-[0_8px_24px_rgba(7,26,43,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]
        transition-all duration-300 select-none cursor-pointer group ${className} ${
          isHovered
            ? '-translate-y-1.5 scale-[1.04] shadow-[0_16px_36px_rgba(0,143,99,0.28)] border-[#008F63]/60 ring-2 ring-[#008F63]/25'
            : 'hover:-translate-y-1.5 hover:scale-[1.04] hover:shadow-[0_16px_36px_rgba(0,143,99,0.28)] hover:border-[#008F63]/60'
        }`}
    >
      {/* Icon Badge */}
      <div
        className={`w-8 h-8 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:brightness-110 transition-all duration-300`}
      >
        <Icon className="w-4 h-4 stroke-[2.2]" />
      </div>

      {/* Two line readable text */}
      <div className="flex flex-col text-left leading-tight whitespace-nowrap">
        <span className="text-[12px] font-bold text-[#071A2B] dark:text-[#F5F5F0]">
          {line1}
        </span>
        <span className="text-[11px] font-medium text-[#557A68] dark:text-[#9FB1BC]">
          {line2}
        </span>
      </div>
    </div>
  );
}
