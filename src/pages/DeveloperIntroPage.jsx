import React, { useEffect } from 'react';
import DeveloperHeader from '../components/developer/DeveloperHeader';
import DeveloperHero from '../components/developer/DeveloperHero';
import DeveloperQualities from '../components/developer/DeveloperQualities';
import DeveloperQuote from '../components/developer/DeveloperQuote';
import DeveloperCTA from '../components/developer/DeveloperCTA';
import DeveloperPortrait from '../components/developer/DeveloperPortrait';
import DeveloperFooter from '../components/developer/DeveloperFooter';
import campusAssets from '../assets/campusAssets';

/**
 * DeveloperIntroPage — Premium, modern introduction/splash page
 * dedicated to developer Prachi Priya before proceeding to Smart Campus.
 * Route: /developer
 */
export default function DeveloperIntroPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Developed by Prachi Priya | Smart Campus — CGC University Mohali";
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#07121A] text-[#071A2B] dark:text-[#F5F5F0] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#008F63] selection:text-white transition-colors duration-300">
      
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND AMBIENT ACCENTS: Soft misty campus architecture    */}
      {/* ------------------------------------------------------------- */}
      {/* Campus silhouette with heavy soft mist */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-15 dark:opacity-10 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(${campusAssets.landingBg})` }}
      />

      {/* Soft gradient wash over the background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#F7FAF8]/95 via-[#F7FAF8]/85 to-[#EAF7F1]/70 dark:from-[#07121A]/95 dark:via-[#07121A]/90 dark:to-[#0B1E28]/80" />

      {/* Emerald ambient light orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#008F63]/10 dark:bg-[#00B878]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#71844A]/10 dark:bg-[#315C3A]/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: University Identity & Theme Toggle                 */}
      {/* ------------------------------------------------------------- */}
      <DeveloperHeader />

      {/* ------------------------------------------------------------- */}
      {/* MAIN TWO-COLUMN SHOWCASE                                       */}
      {/* ------------------------------------------------------------- */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          
          {/* LEFT COLUMN: Narrative, Values, Quote & Primary Action (~48%) */}
          <section className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7 order-2 lg:order-1 animate-fadeIn">
            {/* Developer Hero Heading */}
            <DeveloperHero />

            {/* 4 Developer Qualities */}
            <DeveloperQualities />

            {/* Lower Quote Section */}
            <DeveloperQuote />

            {/* Primary Action Button */}
            <DeveloperCTA />
          </section>

          {/* RIGHT COLUMN: Large Prominent Portrait & Floating Glass Cards (~52%) */}
          <section className="lg:col-span-6 xl:col-span-6 flex items-center justify-center order-1 lg:order-2 animate-fadeIn">
            <DeveloperPortrait />
          </section>

        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER: Grounded at Bottom                                    */}
      {/* ------------------------------------------------------------- */}
      <DeveloperFooter />

    </div>
  );
}
