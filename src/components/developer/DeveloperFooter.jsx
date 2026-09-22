import React from 'react';
import { Heart } from 'lucide-react';

/**
 * DeveloperFooter — Bottom copyright and developer dedication bar
 */
export default function DeveloperFooter() {
  return (
    <footer className="w-full bg-[#07121A] text-slate-400 py-3.5 px-4 sm:px-8 lg:px-12 border-t border-white/5 relative z-20 transition-colors select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <p className="font-normal text-slate-400/90">
          © 2026 Smart Campus. All rights reserved.
        </p>
        
        <p className="flex items-center gap-1.5 font-medium text-slate-300">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline-block animate-pulse" />
          <span>by</span>
          <span className="font-bold text-white tracking-wide">Prachi Priya</span>
        </p>
      </div>
    </footer>
  );
}
