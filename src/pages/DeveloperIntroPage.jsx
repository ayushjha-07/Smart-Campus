import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import campusAssets from '../assets/campusAssets';
import { useApp } from '../context/useApp';

/**
 * DeveloperIntroPage — Pixel-perfect presentation of the Master "Developed by Prachi Priya" design.
 * Route: /developer
 *
 * Implemented using the exact uploaded master graphic, with pixel-aligned interactive hotspots
 * for "Continue to Smart Campus →", Theme Toggle, and University branding, plus responsive mobile support.
 */
export default function DeveloperIntroPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();
  const isLight = theme === 'light';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Developed by Prachi Priya | Smart Campus — CGC University Mohali";
  }, []);

  const handleContinue = () => {
    try {
      sessionStorage.setItem('seen_developer_intro', 'true');
    } catch {
      // Storage safe fallback
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F8F7] dark:bg-[#07121A] flex flex-col justify-between items-center relative overflow-x-hidden selection:bg-[#008F63] selection:text-white transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#EAF7F1]/60 dark:from-[#315C3A]/20 to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-[#07121A] pointer-events-none -z-10" />

      {/* Main Canvas Container (Centered in Viewport) */}
      <main className="flex-1 w-full max-w-[1240px] flex items-center justify-center p-2 sm:p-4 lg:p-6 my-auto">
        <div className="relative w-full aspect-[1024/682] max-h-[92vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950/20 dark:shadow-black/70 border border-slate-200/80 dark:border-white/10 select-none bg-white">
          
          {/* 1. The Exact Master Graphic (100% faithful to uploaded reference) */}
          <img
            src={campusAssets.developerMaster}
            alt="Developed by Prachi Priya — Smart Campus CGC University Mohali"
            className="w-full h-full object-contain sm:object-cover pointer-events-none"
            loading="eager"
          />

          {/* 2. Interactive Clickable Hotspot: Top-Left Branding Link */}
          <Link
            to="/"
            onClick={handleContinue}
            title="CGC University — Smart Campus Home"
            aria-label="CGC University Smart Campus Home"
            className="absolute left-[3.5%] top-[2.0%] w-[24%] h-[7.5%] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008F63]/50 hover:bg-black/[0.02] active:bg-black/[0.04] transition-all cursor-pointer"
          />

          {/* 3. Interactive Clickable Hotspot: Top-Right Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            aria-label={`Toggle Theme (Current: ${isLight ? 'Light' : 'Dark'})`}
            className="absolute left-[87.5%] top-[2.4%] w-[9.2%] h-[5.2%] rounded-full focus:outline-none focus:ring-2 focus:ring-[#008F63]/50 hover:bg-black/[0.04] active:bg-black/[0.08] transition-all cursor-pointer flex items-center justify-center group"
          >
            <span className="sr-only">Toggle Theme</span>
            {/* Subtle interactive hover highlight */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 rounded-full ring-2 ring-[#008F63]/30" />
          </button>

          {/* 4. Interactive Clickable Hotspot: Primary "Continue to Smart Campus →" Button */}
          <button
            type="button"
            onClick={handleContinue}
            title="Continue to Smart Campus"
            aria-label="Continue to Smart Campus"
            className="absolute left-[5.0%] top-[83.8%] w-[21.2%] h-[6.2%] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#008F63]/50 hover:brightness-105 active:scale-[0.98] transition-all duration-150 cursor-pointer group"
          >
            <span className="sr-only">Continue to Smart Campus</span>
            {/* Subtle pulsing glow on button to invite interaction */}
            <span className="absolute inset-0 rounded-2xl ring-2 ring-white/40 group-hover:ring-white/80 transition-all" />
          </button>

        </div>
      </main>

      {/* Mobile/Tablet Helper CTA Bar (Ensures thumb accessibility on small screens) */}
      <div className="w-full sm:hidden p-3 bg-white dark:bg-[#07121A] border-t border-slate-200 dark:border-white/10 shadow-lg flex items-center justify-between gap-3 z-30">
        <div className="text-xs">
          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0] block">Smart Campus</span>
          <span className="text-[11px] text-[#60717A] dark:text-[#9FB1BC] block">CGC University, Mohali</span>
        </div>
        <button
          type="button"
          onClick={handleContinue}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#008F63] hover:bg-[#007A54] shadow-md flex items-center gap-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Semantic Screen-Reader Structure (Accessible SEO & Semantic Content) */}
      <div className="sr-only">
        <header>
          <h1>Smart Campus — CGC University, Mohali</h1>
        </header>
        <section>
          <h2>Developed by Prachi Priya</h2>
          <p>DESIGN • DEVELOP • BUILD • IMPACT</p>
          <p>
            A passionate developer dedicated to building meaningful digital solutions for a smarter and better campus experience.
          </p>
          <ul>
            <li>Creative Development</li>
            <li>User-Centric Design</li>
            <li>Problem Solving</li>
            <li>Better Community</li>
          </ul>
          <blockquote>
            “Turning ideas into real-world solutions for a smarter tomorrow.”
          </blockquote>
          <button onClick={handleContinue}>Continue to Smart Campus</button>
        </section>
        <aside>
          <ul>
            <li>Clean Code — Better Campus</li>
            <li>Ideas — into Impact</li>
            <li>For a — Smarter Campus</li>
            <li>“Good Design Solves Real Problems.”</li>
            <li>Passion Builds Better Solutions</li>
          </ul>
        </aside>
        <footer>
          <p>© 2026 Smart Campus. All rights reserved.</p>
          <p>Built with love by Prachi Priya</p>
        </footer>
      </div>

    </div>
  );
}
