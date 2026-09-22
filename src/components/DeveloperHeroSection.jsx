import React from 'react';
import { ArrowRight, ArrowDown, Lightbulb, Settings2, Users } from 'lucide-react';
import { campusAssets } from '../assets/campusAssets';

/**
 * DeveloperHeroSection — Section 1 of the Smart Campus Landing Page
 * Faithfully matches the uploaded reference composition (media_1790086099506.jpg):
 * - Left: "Hello! 👋", "Developed by Prachi Priya", "DESIGN • DEVELOP • BUILD • IMPACT",
 *         4 skill badges, cream quote box, "Continue to Smart Campus →", "Explore the platform below",
 *         and the authentic CGC gate monument on the left edge.
 * - Right: The pristine composite containing Prachi Priya in the organic leaf frame,
 *          3 floating glass cards, CGC University Mohali building backdrop, sky calligraphy,
 *          and the dark green curved wave panel with 4 campus benefits.
 */
export default function DeveloperHeroSection({ onContinue }) {
  const handleScrollToSmartCampus = () => {
    if (onContinue) {
      onContinue();
      return;
    }
    const target = document.getElementById('your-voice') || document.getElementById('hero');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="developer-hero"
      className="relative w-full bg-white dark:bg-[#07121A] pt-20 sm:pt-24 pb-10 sm:pb-14 overflow-hidden select-none border-b border-[#EAF0EC] dark:border-white/5 transition-colors duration-300"
    >
      {/* Authentic CGC University Gate Entrance Monument Strip on Far Left */}
      <div className="absolute left-0 top-16 bottom-0 w-24 sm:w-32 lg:w-36 pointer-events-none opacity-90 hidden md:block select-none z-0">
        <img
          src={campusAssets.sec1GateStrip}
          alt="CGC University Entrance Monument"
          className="w-full h-full object-cover object-left"
          loading="eager"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Developer Introduction Editorial Content */}
          <div className="lg:col-span-6 flex flex-col items-start pl-0 md:pl-28 lg:pl-24 xl:pl-28 space-y-4 sm:space-y-4.5">
            
            {/* Friendly Greeting */}
            <div className="text-[#0B253A] dark:text-[#F5F5F0] font-semibold text-lg sm:text-xl flex items-center gap-1.5">
              <span>Hello!</span>
              <span className="inline-block hover:rotate-12 transition-transform cursor-default">👋</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-0.5">
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black text-[#0B253A] dark:text-[#F5F5F0] leading-none tracking-tight">
                Developed by
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-serif font-black text-[#008F63] leading-none tracking-tight mt-1.5">
                Prachi Priya
              </h2>
            </div>

            {/* Pillars / Supporting Subheading */}
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-[#536673] dark:text-[#A8B8C4] pt-0.5">
              DESIGN • DEVELOP • BUILD • IMPACT
            </p>

            {/* Narrative Description */}
            <p className="text-sm sm:text-[15px] text-[#4A5D6E] dark:text-[#9FB1BC] leading-relaxed max-w-lg font-normal">
              A passionate developer dedicated to building meaningful digital solutions for a smarter and better campus experience.
            </p>

            {/* 4 Skill Cards in a Single Row matching reference */}
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-lg pt-1">
              {/* 1. Creative Development */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white dark:bg-[#0D1F2D] border border-[#E2EAE5] dark:border-white/10 shadow-2xs hover:border-[#008F63] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] dark:bg-[#008F63]/20 flex items-center justify-center text-[#008F63] mb-1 font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                  &lt;/&gt;
                </div>
                <span className="text-[10.5px] font-bold text-[#0B253A] dark:text-[#F5F5F0] leading-tight">
                  Creative Development
                </span>
              </div>

              {/* 2. User-Centric Design */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white dark:bg-[#0D1F2D] border border-[#E2EAE5] dark:border-white/10 shadow-2xs hover:border-[#008F63] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[#FFF7E8] dark:bg-[#D4A84F]/20 flex items-center justify-center text-[#D4A84F] mb-1 group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-4 h-4 text-[#D4A84F]" />
                </div>
                <span className="text-[10.5px] font-bold text-[#0B253A] dark:text-[#F5F5F0] leading-tight">
                  User-Centric Design
                </span>
              </div>

              {/* 3. Problem Solving */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white dark:bg-[#0D1F2D] border border-[#E2EAE5] dark:border-white/10 shadow-2xs hover:border-[#008F63] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] dark:bg-[#008F63]/20 flex items-center justify-center text-[#008F63] mb-1 group-hover:scale-105 transition-transform">
                  <Settings2 className="w-4 h-4 text-[#008F63]" />
                </div>
                <span className="text-[10.5px] font-bold text-[#0B253A] dark:text-[#F5F5F0] leading-tight">
                  Problem Solving
                </span>
              </div>

              {/* 4. Better Community */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white dark:bg-[#0D1F2D] border border-[#E2EAE5] dark:border-white/10 shadow-2xs hover:border-[#008F63] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] dark:bg-[#008F63]/20 flex items-center justify-center text-[#008F63] mb-1 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4 text-[#008F63]" />
                </div>
                <span className="text-[10.5px] font-bold text-[#0B253A] dark:text-[#F5F5F0] leading-tight">
                  Better Community
                </span>
              </div>
            </div>

            {/* Cream Quote Box with Gold Quote Mark */}
            <div className="w-full max-w-lg bg-[#FFFDF5] dark:bg-[#0D1F2D] border border-[#F2E8D2] dark:border-white/10 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-serif font-black text-[#D4A84F] leading-none select-none">
                “
              </span>
              <p className="text-xs sm:text-[13.5px] italic text-[#334E68] dark:text-[#E2E9E6] font-medium leading-relaxed pt-0.5">
                Turning ideas into real-world solutions for a smarter tomorrow.
              </p>
            </div>

            {/* Action Button & Explore Down Hint */}
            <div className="pt-2 flex flex-col items-start gap-2">
              <button
                type="button"
                onClick={handleScrollToSmartCampus}
                className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#008F63] hover:bg-[#007A54] hover:shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Continue to Smart Campus</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleScrollToSmartCampus}
                className="flex items-center gap-1.5 text-xs font-bold text-[#008F63] hover:text-[#007A54] transition-colors cursor-pointer pl-1.5 pt-0.5 group"
              >
                <ArrowDown className="w-3.5 h-3.5 text-[#008F63] group-hover:translate-y-0.5 transition-transform" />
                <span>Explore the platform below</span>
              </button>
            </div>

          </div>

          {/* Right Column: Exact Artwork Composite from Reference Image */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-300/40 dark:shadow-black/70 border border-[#E2E9E6] dark:border-white/10 bg-white dark:bg-[#0A1822]">
              <img
                src={campusAssets.developerHeroArt}
                alt="Developed by Prachi Priya — Smart Campus CGC University Mohali"
                className="w-full h-auto object-contain block select-none pointer-events-none"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
