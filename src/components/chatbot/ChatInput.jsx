import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

/**
 * ChatInput — Bottom query composer with Enter key support and disabled state when empty
 */
export default function ChatInput({ onSendMessage, disabled = false, placeholder = "Ask Smart Campus Assistant..." }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-focus input when enabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const isEmpty = text.trim().length === 0;

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-3 bg-white dark:bg-[#071F2C] border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2 select-none"
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-[#0A2635] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-transparent focus:border-[#00B878] dark:focus:border-[#00B878] focus:bg-white dark:focus:bg-[#0C2D3E] outline-none transition-all"
      />

      <button
        type="submit"
        disabled={isEmpty || disabled}
        aria-label="Send message"
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
          isEmpty || disabled
            ? 'bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            : 'bg-[#00B878] hover:bg-[#009e66] active:scale-95 text-white shadow-md shadow-[#00B878]/30 cursor-pointer'
        }`}
      >
        <SendHorizontal className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </button>
    </form>
  );
}
