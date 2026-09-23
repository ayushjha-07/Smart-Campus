import React, { useState } from 'react';
import { Send, Bell, CheckCircle2 } from 'lucide-react';

export default function StudentNotification({ studentName, onSendNotification }) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      onSendNotification(message.trim());
      setMessage('');
      setIsSending(false);
    }, 200);
  };

  const sampleNotifications = [
    'Your complaint has been reviewed and the maintenance team has started work.',
    'A technician is currently inspecting the equipment on your floor.',
    'Required spare parts have arrived and resolution is expected within 2 hours.'
  ];

  return (
    <div className="rounded-xl p-4 bg-[#F5F5F0]/60 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338] space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#D4A84F]" />
          <h4 className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
            Notify Student
          </h4>
        </div>
        <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
          Direct alert to {studentName || 'Student'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write an update for the student…"
          className="w-full p-2.5 rounded-lg text-xs bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/70 dark:placeholder-[#9FB1BC]/60 focus:outline-none focus:border-[#D4A84F] focus:ring-1 focus:ring-[#D4A84F]/30 resize-none"
        />

        {/* Suggestion chip */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {sampleNotifications.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => setMessage(sug)}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] text-[#60717A] dark:text-[#9FB1BC] hover:text-[#008F63] dark:hover:text-[#D4A84F] hover:border-[#008F63]/40 transition-colors"
            >
              + {sug.slice(0, 36)}...
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="px-4 py-2 rounded-lg bg-[#D4A84F] hover:bg-[#C2963F] text-[#07121A] disabled:opacity-50 text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSending ? 'Sending...' : 'Send Notification'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
