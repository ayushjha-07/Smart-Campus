import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import DeveloperHero from './developer/DeveloperHero';
import DeveloperQualities from './developer/DeveloperQualities';
import DeveloperQuote from './developer/DeveloperQuote';
import DeveloperPortrait from './developer/DeveloperPortrait';
import campusAssets from '../assets/campusAssets';

/**
 * DeveloperSection — Embedded Developer Spotlight for Prachi Priya
 * Restores the original interactive developer showcase with organic curved frame,
 * floating glass cards, 4 value tiles, inspirational quote, and handwritten calligraphy.
 */
export default function DeveloperSection() {
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
      className="py-20 sm:py-24 relative overflow-hidden bg-[#F7FAF8] dark:bg-[#07121A] transition-colors duration-300 border-t border-[#E2E9E6] dark:border-white/5 select-none"
    >
      {/* Background ambient lighting and subtle campus texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-10 dark:opacity-5 bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url(${campusAssets.landingBg})` }}
      />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#008F63]/5 dark:bg-[#315C3A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4A84F]/10 dark:bg-[#71844A]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4F1] dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#315C3A]/40 text-[#008F63] dark:text-[#71844A] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#008F63] dark:text-[#D4A84F]" />
            <span>Developer Spotlight</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight mb-4">
            Crafted for Campus Excellence
          </h2>

          <p className="text-base sm:text-lg text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto leading-relaxed font-normal">
            Behind Smart Campus is a commitment to building meaningful, human-centered digital solutions that solve real institution challenges.
          </p>
        </div>

        {/* Main Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Narrative, 4 Qualities & Quote */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <DeveloperHero />
            <DeveloperQualities />
            <DeveloperQuote />

            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToHero}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#008F63] hover:bg-[#007A54] shadow-md shadow-emerald-950/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Explore Smart Campus</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Organic Portrait with Floating Glass Cards */}
          <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2">
            <DeveloperPortrait />
          </div>

        </div>

      </div>
    </section>
  );
}
