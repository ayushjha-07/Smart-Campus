import React from 'react';

/**
 * FloatingCard — Glassmorphic floating card orbiting around the developer portrait
 * - Translucent background with backdrop-filter blur(14px)
 * - Rounded corners, soft shadow, subtle border
 * - Green/Gold icon box
 * - Navy text in light mode, cream/white text in dark mode
 * - Smooth CSS floating keyframe animation and interactive hover lift
 */
export default function FloatingCard({
  icon: Icon,
  line1,
  line2,
  iconBg = 'bg-[#008F63]',
  iconColor = 'text-white',
  className = '',
  style = {},
  animationDelay = '0s',
}) {
  return (
    <div
      style={{
        animationDelay,
        ...style,
      }}
      className={`absolute z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl 
        bg-white/80 dark:bg-[#0D1C24]/85 backdrop-blur-[14px] 
        border border-white/80 dark:border-white/15 
        shadow-[0_8px_24px_rgba(7,26,43,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]
        transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-[#008F63]/40 cursor-default select-none group ${className}`}
    >
      {/* Icon badge */}
      <div
        className={`w-8 h-8 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-4 h-4 stroke-[2.2]" />
      </div>

      {/* Two line text */}
      <div className="flex flex-col text-left leading-tight">
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
