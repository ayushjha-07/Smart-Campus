import React from 'react';
import { campusAssets } from '../../assets/campusAssets';
import OrbitRings from './OrbitRings';
import DeveloperDecorations from './DeveloperDecorations';

/**
 * DeveloperPortrait — The large, dominant right-side composition
 * - Features the authentic portrait of Prachi Priya in lavender kurta
 * - Real CGC University Mohali campus backdrop
 * - Curved dark green pill: "Developer • Learner • Problem Solver • Dreamer"
 * - 6 floating glass cards in organic orbital layout
 * - Live animated orbit rings, rotating particles, and script typography
 * - Completely unboxed, organic composition blending seamlessly with background
 */
export default function DeveloperPortrait() {
  return (
    <div className="relative w-full max-w-[580px] lg:max-w-[640px] mx-auto flex items-center justify-center select-none overflow-visible">
      
      {/* Live Animated Orbit Rings around composition */}
      <OrbitRings />

      {/* Floating Leaf Accents & Particles */}
      <DeveloperDecorations />

      {/* Main Master Artwork Container blending organically into the page */}
      <div className="relative w-full overflow-visible transition-transform duration-500 hover:scale-[1.012] group">
        
        {/* Soft background ambient glow */}
        <div className="absolute inset-0 bg-radial from-[#008F63]/12 via-transparent to-transparent pointer-events-none -z-10" />

        {/* Master Showcase Artwork */}
        <img
          src={campusAssets.developerShowcaseArt}
          alt="Developed by Prachi Priya — Smart Campus CGC University Mohali"
          className="w-full h-auto object-contain block drop-shadow-lg"
          loading="lazy"
        />

        {/* Interactive hover highlight overlays for the 6 cards */}
        <div className="absolute inset-0 pointer-events-auto">
          {/* Card 1: Clean Code / Better Campus */}
          <div 
            className="absolute top-[10%] left-[13%] w-[35%] h-[14%] rounded-2xl cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
            title="Clean Code • Better Campus"
          />
          {/* Card 2: Ideas into Impact */}
          <div 
            className="absolute top-[28%] left-[4%] w-[33%] h-[14%] rounded-2xl cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
            title="Ideas into Impact"
          />
          {/* Card 3: For a Smarter Campus */}
          <div 
            className="absolute top-[48%] left-[7%] w-[35%] h-[14%] rounded-2xl cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
            title="For a Smarter Campus"
          />
          {/* Card 4: Stronger Community */}
          <div 
            className="absolute top-[25%] right-[16%] w-[34%] h-[14%] rounded-2xl cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
            title="Stronger Community"
          />
          {/* Card 5: Safer Campus */}
          <div 
            className="absolute top-[44%] right-[8%] w-[30%] h-[14%] rounded-2xl cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
            title="Safer Campus"
          />
          {/* Card 6: Greener Future */}
          <div 
            className="absolute top-[60%] right-[10%] w-[30%] h-[14%] rounded-2xl cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
            title="Greener Future"
          />
        </div>

      </div>

    </div>
  );
}
