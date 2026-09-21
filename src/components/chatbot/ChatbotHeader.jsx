import React from 'react';
import { Sparkles, Minus, X, RotateCcw } from 'lucide-react';

/**
 * ChatbotHeader — Premium university support header bar
 * Displays title, online presence, assistant emblem, and controls
 */
export default function ChatbotHeader({ onMinimize, onClose, onReset }) {
  return (
    <div className="relative px-4 py-3.5 sm:px-5 sm:py-4 bg-gradient-to-r from-[#071F2C] via-[#092B3A] to-[#08202D] text-white border-b border-white/10 rounded-t-[20px] flex items-center justify-between shrink-0 select-none">
      
      {/* Left: Assistant Identity */}
      <div className="flex items-center gap-3">
        {/* Assistant Avatar Badge */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#00A86B] to-[#00D68F] flex items-center justify-center shadow-md shadow-[#00A86B]/30 border border-white/20">
          <Sparkles className="w-5 h-5 text-white" />
          {/* Pulsating Green Online Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10E894] border-2 border-[#071F2C]" />
        </div>

        {/* Title & Status */}
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none flex items-center gap-1.5">
            <span>Smart Campus Assistant</span>
          </h3>
          <p className="text-[11px] text-emerald-300/90 font-medium mt-1 flex items-center gap-1.5 leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10E894] animate-pulse" />
            <span>Online • Ready to help</span>
          </p>
        </div>
      </div>

      {/* Right: Control Actions */}
      <div className="flex items-center gap-1">
        {/* Reset Conversation */}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-white/10 active:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Minimize Button */}
        <button
          type="button"
          onClick={onMinimize}
          title="Minimize chat"
          aria-label="Minimize chat"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-white/10 active:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          title="Close chat"
          aria-label="Close chat"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-red-500/20 active:bg-red-500/30 text-slate-300 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
