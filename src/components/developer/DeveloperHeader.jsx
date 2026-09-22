import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import cgcLogo from '../../assets/cgc_logo.png';
import { useApp } from '../../context/useApp';

/**
 * DeveloperHeader — Top branding bar with CGC University logo, Smart Campus identity, and Theme Toggle
 */
export default function DeveloperHeader() {
  const { theme, toggleTheme } = useApp();
  const isLight = theme === 'light';

  return (
    <header className="w-full flex items-center justify-between py-4 sm:py-6 px-4 sm:px-8 lg:px-12 relative z-30 transition-colors">
      {/* Top-Left: CGC University Logo + Smart Campus Branding */}
      <div className="flex items-center gap-3 sm:gap-3.5 group select-none">
        <div className="flex items-center justify-center shrink-0">
          <img
            src={cgcLogo}
            alt="CGC University Logo"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-xs"
            loading="eager"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-lg sm:text-xl font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              Smart <span className="text-[#008F63] dark:text-[#00B878]">Campus</span>
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-[#60717A] dark:text-[#9FB1BC] tracking-wide mt-1">
            CGC University, Mohali
          </span>
        </div>
      </div>

      {/* Top-Right: Theme Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/10 text-[#071A2B] dark:text-[#F5F5F0] hover:border-[#008F63] dark:hover:border-[#00B878] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        {isLight ? (
          <>
            <Sun className="w-3.5 h-3.5 text-[#F59E0B] stroke-[2.2]" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-[#38BDF8] stroke-[2.2]" />
            <span>Dark</span>
          </>
        )}
      </button>
    </header>
  );
}
