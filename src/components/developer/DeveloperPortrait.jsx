import React from 'react';
import { Code2, BarChart3, GraduationCap, Users, ShieldCheck, Leaf } from 'lucide-react';
import { campusAssets } from '../../assets/campusAssets';
import OrbitRings from './OrbitRings';
import OrbitCard from './OrbitCard';
import DeveloperDecorations from './DeveloperDecorations';

/**
 * DeveloperPortrait — Central Showcase with Real-Time Animated Orbital Physics
 * - Large, dominant authentic portrait of Prachi Priya with CGC University Mohali entrance
 * - 3 independent elliptical orbits (22s, 16s reverse, 11s)
 * - 6 live floating cards orbiting continuously around her while remaining upright & readable
 * - Moving particles (green dots, gold sparkles, tiny hearts, leaves)
 * - Animated progressive drawing and fading SVG curved line
 * - Pulsing radial ambient glow behind portrait
 * - Floating leaves with staggered drift
 * - Dark-green curved pill with moving 4s shine effect
 * - Subtle mouse parallax
 */
export default function DeveloperPortrait({ mouseOffset = { x: 0, y: 0 }, isVisible = true }) {
  // 6 Live Floating Cards orbiting smoothly at varied radii and initial angles
  const cards = [
    // Orbit 1: Outer (22s clockwise)
    {
      orbit: 1,
      radiusX: 295,
      radiusY: 260,
      initialAngle: 155, // Top-Left
      duration: 22,
      reverse: false,
      cardProps: {
        icon: Code2,
        line1: 'Clean Code',
        line2: 'Better Campus',
        iconBg: 'bg-[#008F63]',
      },
    },
    {
      orbit: 1,
      radiusX: 295,
      radiusY: 260,
      initialAngle: 335, // Bottom-Right
      duration: 22,
      reverse: false,
      cardProps: {
        icon: Users,
        line1: 'Stronger',
        line2: 'Community',
        iconBg: 'bg-[#008F63]',
      },
    },
    // Orbit 2: Middle (16s counter-clockwise)
    {
      orbit: 2,
      radiusX: 255,
      radiusY: 225,
      initialAngle: 215, // Mid-Left
      duration: 16,
      reverse: true,
      cardProps: {
        icon: BarChart3,
        line1: 'Ideas',
        line2: 'into Impact',
        iconBg: 'bg-[#D4A84F]',
      },
    },
    {
      orbit: 2,
      radiusX: 255,
      radiusY: 225,
      initialAngle: 35, // Top-Right
      duration: 16,
      reverse: true,
      cardProps: {
        icon: ShieldCheck,
        line1: 'Safer',
        line2: 'Campus',
        iconBg: 'bg-[#008F63]',
      },
    },
    // Orbit 3: Inner (11s clockwise)
    {
      orbit: 3,
      radiusX: 220,
      radiusY: 190,
      initialAngle: 255, // Lower-Left
      duration: 11,
      reverse: false,
      cardProps: {
        icon: GraduationCap,
        line1: 'For a',
        line2: 'Smarter Campus',
        iconBg: 'bg-[#008F63]',
      },
    },
    {
      orbit: 3,
      radiusX: 220,
      radiusY: 190,
      initialAngle: 75, // Upper-Right
      duration: 11,
      reverse: false,
      cardProps: {
        icon: Leaf,
        line1: 'Greener',
        line2: 'Future',
        iconBg: 'bg-[#008F63]',
      },
    },
  ];

  return (
    <div className="relative w-full max-w-[650px] lg:max-w-[700px] aspect-square mx-auto flex items-center justify-center select-none overflow-visible">
      
      {/* 1. SOFT PULSING GLOW BEHIND PORTRAIT */}
      <div
        className="absolute w-[520px] h-[520px] rounded-full bg-radial from-[#008F63]/25 via-[#38D59E]/12 to-transparent blur-3xl pointer-events-none -z-20 animate-glow-pulse"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.3}px, ${-mouseOffset.y * 0.3}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
        }}
      />

      {/* 2. LIVE ORBIT SYSTEM & PARTICLES */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.5}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        <OrbitRings isVisible={isVisible} />
      </div>

      {/* 3. 6 CONTINUOUSLY TRAVELING LIVE FLOATING CARDS */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.4}px, ${-mouseOffset.y * 0.4}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        {cards.map((card, idx) => (
          <OrbitCard
            key={idx}
            radiusX={card.radiusX}
            radiusY={card.radiusY}
            initialAngle={card.initialAngle}
            duration={card.duration}
            reverse={card.reverse}
            isVisible={isVisible}
            cardProps={card.cardProps}
          />
        ))}
      </div>

      {/* 4. LARGE DOMINANT PORTRAIT OF PRACHI & CGC MOHALI ENTRANCE */}
      <div
        className="relative w-[440px] sm:w-[510px] aspect-square rounded-full flex items-center justify-center pointer-events-none z-10"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        {/* Soft circular aura backdrop */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#E7F6EF]/65 to-[#F2FAF6]/35 dark:from-[#008F63]/18 dark:to-[#0A1A22]/25 border border-[#008F63]/25 dark:border-white/10 shadow-inner -z-5" />

        {/* Clean Composite Portrait Image */}
        <img
          src={campusAssets.developerCleanPortraitComposite}
          alt="Prachi Priya — Developer of Smart Campus"
          className="w-full h-full object-contain block drop-shadow-2xl select-none pointer-events-none"
          loading="eager"
        />

        {/* 5. CURVED DARK-GREEN PILL WITH 4S SHIMMER SHINE HIGHLIGHT */}
        <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <div className="relative overflow-hidden px-5 sm:px-6 py-2 rounded-full bg-[#0B3B26] dark:bg-[#072B1C] border border-[#16603F] shadow-xl shadow-emerald-950/35 flex items-center justify-center">
            {/* Soft highlight traveling from left to right every 4 seconds */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-shimmer-pill"
              style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
            />
            {/* Pill Label Text */}
            <span className="relative z-10 text-[11px] sm:text-xs font-bold text-white tracking-wide whitespace-nowrap">
              Developer &nbsp;•&nbsp; Learner &nbsp;•&nbsp; Problem Solver &nbsp;•&nbsp; Dreamer
            </span>
          </div>
        </div>

      </div>

      {/* 6. CALLIGRAPHY & FLOATING SWAYING LEAVES */}
      <DeveloperDecorations isVisible={isVisible} />

    </div>
  );
}
