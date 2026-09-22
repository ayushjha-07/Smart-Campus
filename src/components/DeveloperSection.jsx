import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import campusAssets from '../assets/campusAssets';

/**
 * DeveloperSection — Embedded "Developed by Prachi Priya" Showcase on the Smart Campus Landing Page
 * Displays the exact master developer artwork with interactive hotspots and mobile support.
 */
export default function DeveloperSection({ onOpenSubmitModal }) {
  const handleScrollToHero = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="developer" className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#008F63]/5 dark:bg-[#315C3A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4A84F]/10 dark:bg-[#71844A]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
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

        {/* Master Graphic Canvas Container (100% exact to reference artwork) */}
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full aspect-[1024/682] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 dark:shadow-black/70 border border-[#DDE8E3] dark:border-white/10 select-none bg-white">
            
            {/* The Exact Master Image */}
            <img
              src={campusAssets.developerMaster}
              alt="Developed by Prachi Priya — Smart Campus CGC University Mohali"
              className="w-full h-full object-contain sm:object-cover pointer-events-none"
              loading="lazy"
            />

            {/* Interactive Clickable Hotspot: Top-Left Branding -> Scroll to Hero */}
            <button
              type="button"
              onClick={handleScrollToHero}
              title="CGC University — Smart Campus"
              aria-label="CGC University Smart Campus"
              className="absolute left-[3.5%] top-[2.0%] w-[24%] h-[7.5%] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008F63]/50 hover:bg-black/[0.02] active:bg-black/[0.04] transition-all cursor-pointer"
            />

            {/* Interactive Clickable Hotspot: Primary "Continue to Smart Campus →" Button */}
            <button
              type="button"
              onClick={handleScrollToHero}
              title="Explore Smart Campus"
              aria-label="Explore Smart Campus"
              className="absolute left-[5.0%] top-[83.8%] w-[21.2%] h-[6.2%] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#008F63]/50 hover:brightness-105 active:scale-[0.98] transition-all duration-150 cursor-pointer group"
            >
              <span className="sr-only">Explore Smart Campus</span>
              <span className="absolute inset-0 rounded-2xl ring-2 ring-white/40 group-hover:ring-white/80 transition-all" />
            </button>

          </div>

          {/* Mobile Helper Card (Visible on small screens) */}
          <div className="sm:hidden mt-4 p-4 rounded-2xl bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/10 shadow-md flex items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                Developed by Prachi Priya
              </h4>
              <p className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
                CGC University, Mohali
              </p>
            </div>
            <button
              type="button"
              onClick={handleScrollToHero}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#008F63] hover:bg-[#007A54] flex items-center gap-1.5 shadow-xs"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
