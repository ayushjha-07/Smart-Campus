import React from 'react';

/**
 * DeveloperHero — Main heading and introduction text for Prachi Priya
 */
export default function DeveloperHero() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Hello prefix with decorative horizontal line */}
      <div className="flex items-center gap-2.5">
        <span className="text-base sm:text-lg font-bold text-[#071A2B] dark:text-[#F5F5F0] flex items-center gap-1.5">
          <span>Hello!</span>
          <span className="inline-block animate-wiggle">👋</span>
        </span>
        <span className="w-10 h-0.5 bg-[#008F63] dark:bg-[#00B878] rounded-full" />
      </div>

      {/* Main Heading: Developed by Prachi Priya */}
      <div className="space-y-0.5">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071A2B] dark:text-[#F5F5F0] tracking-tight leading-[1.1]">
          Developed by
        </h1>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#008F63] dark:text-[#00B878] tracking-tight leading-[1.1] drop-shadow-xs">
          Prachi Priya
        </h2>
      </div>

      {/* Supporting Text: DESIGN • DEVELOP • BUILD • IMPACT */}
      <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#71844A] dark:text-[#D4A84F] uppercase pt-1">
        DESIGN &nbsp;•&nbsp; DEVELOP &nbsp;•&nbsp; BUILD &nbsp;•&nbsp; IMPACT
      </p>

      {/* Description */}
      <p className="text-sm sm:text-base text-[#60717A] dark:text-[#9FB1BC] max-w-xl leading-relaxed font-normal pt-1">
        A passionate developer dedicated to building meaningful digital solutions for a smarter and better campus experience.
      </p>
    </div>
  );
}
