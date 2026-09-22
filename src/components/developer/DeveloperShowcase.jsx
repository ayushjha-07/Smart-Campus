import React from 'react';
import { ArrowRight } from 'lucide-react';
import DeveloperIntro from './DeveloperIntro';
import DeveloperSkills from './DeveloperSkills';
import DeveloperQuote from './DeveloperQuote';
import DeveloperStats from './DeveloperStats';
import DeveloperPortrait from './DeveloperPortrait';

/**
 * DeveloperShowcase — Full Master Developer Showcase Section
 * Matches the reference image (media_1790096466020.jpg) exactly:
 * - Desktop Layout: Left (~43%), Right (~57%), Height ~850-950px
 * - Background: #F8FCFA -> #EEF8F3 -> #F7FAF5 with subtle radial glow
 * - Left: Meet Developer Badge, Hello!, Developed by Prachi Priya, Subtitle,
 *         Description, 4 Skills, Quote Panel, Continue Button, 3 Stats
 * - Right: Dominant Prachi Priya Portrait with CGC Mohali Backdrop,
 *          6 Floating Glass Cards, Curved Green Pill, Live Orbit Rings,
 *          and Handwritten Calligraphy
 */
export default function DeveloperShowcase() {
  const handleScrollToHero = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="developer"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F8FCFA] via-[#EEF8F3] to-[#F7FAF5] dark:from-[#07151D] dark:via-[#091B24] dark:to-[#051017] transition-colors duration-500 border-t border-[#E5EFE9] dark:border-white/5 select-none"
    >
      {/* Subtle green radial glow positioned behind the portrait */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[550px] h-[550px] bg-[#008F63]/8 dark:bg-[#008F63]/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-[10%] w-[400px] h-[400px] bg-[#D4A84F]/8 dark:bg-[#71844A]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: ~43% Width on Desktop */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6 order-2 lg:order-1">
            
            {/* 1. Badge, Hello, Name, Subtitle, Description */}
            <DeveloperIntro />

            {/* 2. Four Compact Skill Items in One Horizontal Row */}
            <DeveloperSkills />

            {/* 3. Wide Elegant Quote Panel */}
            <DeveloperQuote />

            {/* 4. Primary CTA: Continue to Smart Campus */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleScrollToHero}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-[#008F63] hover:bg-[#007A54] dark:bg-[#008F63] dark:hover:bg-[#007A54] shadow-lg shadow-[#008F63]/25 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Continue to Smart Campus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>

            {/* 5. Developer Stats: 100+ Ideas Coded, ∞ Possibilities Ahead, A Greener Tomorrow */}
            <DeveloperStats />

          </div>

          {/* RIGHT COLUMN: ~57% Width on Desktop */}
          <div className="lg:col-span-7 flex items-center justify-center relative order-1 lg:order-2">
            <DeveloperPortrait />
          </div>

        </div>
      </div>
    </section>
  );
}
