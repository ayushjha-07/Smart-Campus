import React from 'react';
import { Quote } from 'lucide-react';

/**
 * DeveloperQuote — Wide elegant quote panel
 * “Turning ideas into real-world solutions for a smarter tomorrow.”
 */
export default function DeveloperQuote() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0E1E26]/90 border border-[#E2EDE6] dark:border-white/10 shadow-xs border-l-4 border-l-[#008F63] p-4 sm:p-5 transition-all duration-300">
      <div className="flex items-start gap-3.5">
        {/* Large green quotation mark symbol */}
        <div className="shrink-0 -mt-1">
          <Quote className="w-7 h-7 text-[#008F63] dark:text-[#38D59E] fill-[#008F63]/15 rotate-180" />
        </div>

        {/* Italic quote text */}
        <p className="text-sm sm:text-[15px] font-medium text-[#071A2B] dark:text-[#F5F5F0] italic leading-relaxed">
          “Turning ideas into real-world solutions for a smarter tomorrow.”
        </p>
      </div>
    </div>
  );
}
