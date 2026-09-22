import React from 'react';
import { Calendar, Activity, CheckCircle2 } from 'lucide-react';

export default function AdminWelcome() {
  // Compute greeting dynamically based on hour of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const greeting = getGreeting();

  // Current formatted date
  const todayFormatted = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="relative overflow-hidden rounded-2xl border transition-all p-5 sm:p-6 bg-gradient-to-r from-white via-white to-[#F7F9F8] dark:from-[#0C1518] dark:via-[#0C1518]/95 dark:to-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-sm">
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, #D4A84F 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 143, 99, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 143, 99, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Greeting & Subtitle */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2 bg-[#008F63]/10 dark:bg-[#315C3A]/25 border border-[#008F63]/25 dark:border-[#315C3A]/50 text-[#008F63] dark:text-[#D4A84F]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Central Campus Oversight Active</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            {greeting}, <span className="text-[#008F63] dark:text-[#00A875]">Administrator</span>
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[#60717A] dark:text-[#9FB1BC] mt-1 max-w-xl">
            Here’s what’s happening across the Smart Campus today.
          </p>
        </div>

        {/* Right: Date & Status Card */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold bg-[#F7F9F8] dark:bg-[#07121A]/80 border-[#DDE8E3] dark:border-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0]">
            <Calendar className="w-4 h-4 text-[#D4A84F]" />
            <span>{todayFormatted}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold bg-[#008F63]/10 dark:bg-[#315C3A]/20 border-[#008F63]/30 dark:border-[#315C3A]/50 text-[#008F63] dark:text-[#A7C481] shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008F63] dark:bg-[#00A875] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008F63] dark:bg-[#00A875]" />
            </span>
            <div className="leading-tight text-left">
              <span className="block text-[10px] text-[#60717A] dark:text-[#A8B3B0] font-bold">Campus System</span>
              <span className="block font-black text-[#008F63] dark:text-[#00A875]">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
