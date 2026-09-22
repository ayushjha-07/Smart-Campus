import React from 'react';
import { ArrowRight, Code2, Lightbulb, Cog, Heart, Quote } from 'lucide-react';
import { campusAssets } from '../assets/campusAssets';

/**
 * DeveloperSection — Embedded Developer Introduction at the end of the Landing Page
 * Matches the reference design (media_1790095750676.jpg):
 * - Left: "Hello!", "Developed by Prachi Priya", "DESIGN • DEVELOP • BUILD • IMPACT",
 *         Description, 4 compact quality cards (Creative Development, User-Centric Design,
 *         Problem Solving, Better Community), cream quote box with green quotation mark,
 *         and "Continue to Smart Campus →" smooth-scroll button.
 * - Right: The authentic daylight campus portrait of Prachi Priya framed with the green circular
 *          accent, natural leaves, 4 floating glass cards, and handwritten script calligraphy.
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

  const qualities = [
    {
      icon: Code2,
      title: 'Creative',
      subtitle: 'Development',
      isHeart: false,
    },
    {
      icon: Lightbulb,
      title: 'User-Centric',
      subtitle: 'Design',
      isHeart: false,
    },
    {
      icon: Cog,
      title: 'Problem',
      subtitle: 'Solving',
      isHeart: false,
    },
    {
      icon: Heart,
      title: 'Better',
      subtitle: 'Community',
      isHeart: true,
    },
  ];

  return (
    <section
      id="developer"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-[#FAF8F2] dark:bg-[#07121A] transition-colors duration-300 border-t border-[#E8EFEA] dark:border-white/5 select-none"
    >
      {/* Background ambient lighting and soft campus mist */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-10 dark:opacity-5 bg-cover bg-center filter blur-xl"
        style={{ backgroundImage: `url(${campusAssets.landingBg})` }}
      />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#008F63]/5 dark:bg-[#315C3A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4A84F]/10 dark:bg-[#71844A]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Narrative, 4 Qualities, Quote & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6 order-2 lg:order-1">
            
            {/* Hello with decorative green line */}
            <div className="flex items-center gap-2.5">
              <span className="text-base sm:text-lg font-semibold text-[#071A2B] dark:text-[#F5F5F0]">
                Hello!
              </span>
              <span className="w-10 h-0.5 bg-[#008F63] rounded-full" />
            </div>

            {/* Main Headline */}
            <div className="space-y-0.5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071A2B] dark:text-[#F5F5F0] tracking-tight leading-[1.1]">
                Developed by
              </h2>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#008F63] tracking-tight leading-[1.1]">
                Prachi Priya
              </h3>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#71844A] dark:text-[#D4A84F] uppercase pt-0.5">
              DESIGN &nbsp;•&nbsp; DEVELOP &nbsp;•&nbsp; BUILD &nbsp;•&nbsp; IMPACT
            </p>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-[#60717A] dark:text-[#9FB1BC] max-w-xl leading-relaxed font-normal">
              A passionate developer dedicated to building meaningful digital solutions for a smarter and better campus experience.
            </p>

            {/* 4 Developer Qualities Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              {qualities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/10 shadow-xs flex flex-col items-center text-center group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {item.isHeart ? (
                      <div className="w-10 h-10 rounded-full bg-[#008F63] flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5 fill-white text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-[#EAF7F1] dark:bg-[#315C3A]/25 border border-[#DDE8E3] dark:border-[#315C3A]/40 flex items-center justify-center text-[#008F63] mb-2 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                    )}
                    <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] leading-tight block">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC] leading-tight block mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Cream / White Quote Panel with Green Quotation Mark */}
            <div className="relative pl-4 sm:pl-5 border-l-3 border-[#008F63] bg-white/60 dark:bg-[#0D1B22]/60 backdrop-blur-md rounded-r-xl p-3 border-y border-r border-[#E2EAE5] dark:border-white/5 shadow-2xs">
              <div className="flex items-start gap-2.5">
                <Quote className="w-5 h-5 text-[#008F63] shrink-0 fill-[#008F63]/15 rotate-180 -mt-0.5" />
                <p className="text-xs sm:text-[14px] font-medium text-[#071A2B] dark:text-[#F5F5F0] italic leading-relaxed">
                  “Turning ideas into real-world solutions for a smarter tomorrow.”
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToHero}
                className="px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-[#008F63] hover:bg-[#007A54] shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Continue to Smart Campus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Pristine Daylight Campus Artwork Composite */}
          <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-2">
            
            {/* Ambient soft glow behind artwork */}
            <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full bg-[#008F63]/10 dark:bg-[#00B878]/15 blur-[90px] pointer-events-none -z-10" />

            {/* Slogan script text */}
            <div className="hidden sm:block absolute right-6 -top-4 font-['Dancing_Script',cursive] text-sm sm:text-base font-bold text-[#008F63] dark:text-[#D4A84F] -rotate-3 select-none pointer-events-none z-20">
              Same Campus Brighter Tomorrow
            </div>

            {/* Master Daylight Artwork matching reference image */}
            <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 dark:shadow-black/70 border border-[#DDE8E3] dark:border-white/10 bg-white/70 dark:bg-[#0D1B22]/70 backdrop-blur-md transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={campusAssets.developerDaylightPortrait}
                alt="Developed by Prachi Priya — Smart Campus CGC University Mohali"
                className="w-full h-auto object-contain block select-none pointer-events-none"
                loading="lazy"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
