import React from 'react';

/**
 * TypingIndicator — 3 animated bouncing dots indicating assistant is generating a response
 */
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1 px-3.5 bg-slate-100 dark:bg-white/10 rounded-2xl w-fit">
      <span className="w-2 h-2 rounded-full bg-[#00B878] animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 rounded-full bg-[#00B878] animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 rounded-full bg-[#00B878] animate-bounce" />
    </div>
  );
}
