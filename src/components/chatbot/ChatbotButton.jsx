import React, { useState } from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

/**
 * ChatbotButton — Floating circular trigger button positioned bottom-right
 * Features Smart Campus green, modern sparkles/message icon, pulse animation ring, and tooltip
 */
export default function ChatbotButton({ onClick, isOpen, unreadCount = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center select-none">
      
      {/* Tooltip on Hover (hidden on mobile, visible on desktop) */}
      <div 
        className={`hidden sm:flex items-center gap-1.5 absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#061824] text-white text-xs font-semibold shadow-xl border border-white/10 whitespace-nowrap pointer-events-none transition-all duration-200 ${
          isHovered && !isOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#00B878]" />
        <span>Smart Campus Assistant</span>
      </div>

      {/* Main Floating Circular Button */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open Smart Campus Assistant"
        aria-expanded={isOpen}
        className={`relative group w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#00A86B] to-[#00D68F] text-white flex items-center justify-center shadow-lg shadow-[#00A86B]/35 hover:shadow-xl hover:shadow-[#00A86B]/50 transition-all duration-300 transform active:scale-95 cursor-pointer ${
          isOpen ? 'rotate-90 scale-95' : 'hover:scale-105'
        }`}
      >
        {/* Subtle Ambient Pulse Ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#00B878]/30 animate-ping pointer-events-none opacity-60" />
        )}

        {/* Inner Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white stroke-[2.2]" />
          <Sparkles className="w-3.5 h-3.5 text-[#FDE047] absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Optional Notification Dot */}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-white dark:border-[#071724] rounded-full z-20" />
        )}
      </button>

    </div>
  );
}
