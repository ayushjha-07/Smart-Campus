import React from 'react';

/**
 * FloatingCard — Premium Glassmorphic Information Card
 * - background: rgba(255,255,255,0.85) / dark:bg-[#0D1C24]/90
 * - backdrop-filter: blur(14px)
 * - border: 1px solid rgba(255,255,255,0.65)
 * - border-radius: 18px
 * - Hover: pauses float, lifts 6px, scales to 1.03, increases shadow, emerald glow
 */
export default function FloatingCard({
  icon: Icon,
  line1,
  line2,
  iconBg = 'bg-[#008F63]',
  iconColor = 'text-white',
  className = '',
  style = {},
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-[18px] 
        bg-white/85 dark:bg-[#0D1C24]/90 backdrop-blur-[14px] 
        border border-white/70 dark:border-white/15 
        shadow-[0_10px_28px_rgba(7,26,43,0.08)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.5)]
        transition-all duration-300 select-none cursor-pointer group ${className} ${
          isHovered
            ? '-translate-y-1.5 scale-[1.03] shadow-[0_18px_36px_rgba(0,143,99,0.25)] border-[#008F63]/60 ring-2 ring-[#008F63]/20 [animation-play-state:paused]'
            : 'hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(0,143,99,0.25)] hover:border-[#008F63]/60'
        }`}
    >
      {/* Small green/gold icon container */}
      <div
        className={`w-8 h-8 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:brightness-110 transition-all duration-300`}
      >
        <Icon className="w-4 h-4 stroke-[2.2]" />
      </div>

      {/* Dark navy text hierarchy */}
      <div className="flex flex-col text-left leading-tight whitespace-nowrap">
        <span className="text-[12px] font-bold text-[#071A2B] dark:text-[#F5F5F0]">
          {line1}
        </span>
        <span className="text-[11px] font-medium text-[#557A68] dark:text-[#9FB1BC] mt-0.5">
          {line2}
        </span>
      </div>
    </div>
  );
}
