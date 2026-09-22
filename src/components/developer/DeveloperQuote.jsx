import React from 'react';
import { Quote } from 'lucide-react';

/**
 * DeveloperQuote — Left-side lower statement quote with green accent line
 */
export default function DeveloperQuote() {
  return (
    <div className="relative pl-4 sm:pl-5 border-l-3 border-[#008F63] dark:border-[#00B878] py-1">
      <div className="flex items-start gap-2">
        <Quote className="w-5 h-5 text-[#008F63] dark:text-[#00B878] shrink-0 fill-[#008F63]/10 rotate-180 -mt-0.5" />
        <p className="text-base sm:text-lg font-semibold text-[#071A2B] dark:text-[#F5F5F0] italic leading-snug">
          “Turning ideas into real-world solutions for a smarter tomorrow.”
        </p>
      </div>
    </div>
  );
}
