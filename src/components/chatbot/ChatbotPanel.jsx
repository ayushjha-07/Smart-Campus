import React, { useRef, useEffect } from 'react';
import ChatbotHeader from './ChatbotHeader';
import ChatMessage from './ChatMessage';
import QuickActions from './QuickActions';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

/**
 * ChatbotPanel — Floating 420px × 600px university support window
 * Theme-aware with smooth animations, auto-scrolling message list, and modular structure
 */
export default function ChatbotPanel({
  isOpen,
  onClose,
  onMinimize,
  onReset,
  messages,
  isTyping,
  onSendMessage,
  onSelectQuickAction,
  onNavigate
}) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message or when typing
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Smart Campus Assistant Chat"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[calc(100vh-80px)] flex flex-col rounded-[20px] overflow-hidden bg-white dark:bg-[#071724] border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-slate-900/25 dark:shadow-black/60 transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      {/* 1. Header Bar */}
      <ChatbotHeader 
        onMinimize={onMinimize} 
        onClose={onClose} 
        onReset={onReset} 
      />

      {/* 2. Scrollable Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC] dark:bg-[#05111A]">
        
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            onNavigate={onNavigate} 
          />
        ))}

        {/* Typing indicator bubble */}
        {isTyping && (
          <div className="flex items-start gap-2.5 my-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#00A86B] to-[#00D68F] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <span className="text-xs">✦</span>
            </div>
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Quick Actions Suggestions Bar */}
      <QuickActions onSelectAction={onSelectQuickAction} />

      {/* 4. Bottom Input Bar */}
      <ChatInput 
        onSendMessage={onSendMessage} 
        disabled={isTyping} 
      />

    </div>
  );
}
