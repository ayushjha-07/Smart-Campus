import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import DeveloperIntro from './DeveloperIntro';
import DeveloperSkills from './DeveloperSkills';
import DeveloperQuote from './DeveloperQuote';
import DeveloperStats from './DeveloperStats';
import DeveloperPortrait from './DeveloperPortrait';

/**
 * DeveloperShowcase — Master Real-Time Animated Developer Showcase
 * - Real live continuously orbiting information cards
 * - Real live 3-tier rotating elliptical orbits & moving particles
 * - Real live pulsing glow & floating leaves
 * - Real live progressive SVG curved line drawing
 * - Real live shimmer shine highlight on developer pill
 * - Smooth subtle mouse parallax (10-15px max)
 * - Viewport detection via IntersectionObserver for optimal GPU performance
 */
export default function DeveloperShowcase() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Viewport intersection detection: pause animations when off screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Subtle Mouse Parallax: max 12px offset
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x: x * 12, y: y * 12 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F8FCFA] via-[#EEF8F3] to-[#F7FAF5] dark:from-[#07151D] dark:via-[#091B24] dark:to-[#051017] transition-colors duration-500 border-t border-[#E5EFE9] dark:border-white/5 select-none"
    >
      {/* Ambient background lighting */}
      <div 
        className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[600px] h-[600px] bg-[#008F63]/10 dark:bg-[#008F63]/15 rounded-full blur-[150px] pointer-events-none -z-10" 
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.2}px, ${-mouseOffset.y * 0.2}px, 0)`,
          transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
        }}
      />
      <div className="absolute bottom-10 left-[8%] w-[420px] h-[420px] bg-[#D4A84F]/8 dark:bg-[#71844A]/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: ~44% Width on Desktop */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6 order-2 lg:order-1">
            
            {/* 1. Mint Badge, Hello!, Serif Heading, Subtitle & Bio */}
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

            {/* 5. 3 Developer Stats: 100+ Ideas Coded, ∞ Possibilities Ahead, A Greener Tomorrow */}
            <DeveloperStats />

          </div>

          {/* RIGHT COLUMN: ~56% Width on Desktop — REAL-TIME LIVE ORBIT SHOWCASE */}
          <div className="lg:col-span-7 flex items-center justify-center relative order-1 lg:order-2 overflow-visible py-8 lg:py-4">
            <DeveloperPortrait mouseOffset={mouseOffset} isVisible={isVisible} />
          </div>

        </div>
      </div>
    </section>
  );
}
