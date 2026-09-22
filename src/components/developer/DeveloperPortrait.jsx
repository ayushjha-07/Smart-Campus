import React from 'react';
import { Code2, BarChart3, GraduationCap, Users, ShieldCheck, Leaf } from 'lucide-react';
import { campusAssets } from '../../assets/campusAssets';
import OrbitRings from './OrbitRings';
import OrbitCard from './OrbitCard';
import DeveloperDecorations from './DeveloperDecorations';

/**
 * DeveloperPortrait — Three-Layer Natural Depth Showcase
 * LAYER 1 — Real CGC University Mohali Campus Backdrop (bright, realistic, naturally blended)
 * LAYER 2 — Atmosphere: Soft mint/white layered gradient & subtle pulsing glow
 * LAYER 3 — Foreground: Sharp Prachi Portrait + Live Orbit Graphics + 6 Traveling Cards
 */
export default function DeveloperPortrait({ mouseOffset = { x: 0, y: 0 }, isVisible = true }) {
  // 6 Live Floating Cards orbiting smoothly at varied radii and initial angles
  const cards = [
    // Orbit 1: Outer (22s clockwise)
    {
      orbit: 1,
      radiusX: 295,
      radiusY: 255,
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
      radiusY: 255,
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
      radiusY: 220,
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
      radiusY: 220,
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
      radiusY: 185,
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
      radiusY: 185,
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
      
      {/* ==============================================================
          LAYER 1 — REAL CGC UNIVERSITY MOHALI CAMPUS BACKGROUND (z-1)
          Bright, natural, high quality, seamlessly blended into section
          ============================================================== */}
      <div 
        className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 75%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 75%, transparent 100%)',
          transform: `translate3d(${-mouseOffset.x * 0.15}px, ${-mouseOffset.y * 0.15}px, 0)`,
          transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 1,
        }}
      >
        <img
          src={campusAssets.cgcCampusBrightBackdrop}
          alt="CGC University Mohali Campus"
          className="w-full h-full object-cover object-center opacity-90 dark:opacity-35 brightness-[1.04] contrast-[1.02] filter saturate-[1.08]"
          loading="eager"
        />
      </div>

      {/* ==============================================================
          LAYER 2 — ATMOSPHERE & SOFT LAYERED GRADIENT (z-2)
          center: rgba(220,245,235,0.45), around: rgba(255,255,255,0.18)
          ============================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[3rem]"
        style={{
          background: 'radial-gradient(ellipse 80% 75% at 50% 45%, rgba(220, 245, 235, 0.45) 0%, rgba(255, 255, 255, 0.18) 55%, transparent 85%)',
          zIndex: 2,
        }}
      />
      {/* Soft pulsing ambient green/mint glow */}
      <div
        className="absolute w-[480px] h-[480px] rounded-full bg-radial from-[#008F63]/16 via-[#38D59E]/08 to-transparent blur-3xl pointer-events-none animate-glow-pulse"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.25}px, ${-mouseOffset.y * 0.25}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 2,
        }}
      />

      {/* ==============================================================
          LAYER 3 — LIVE ORBIT RINGS & TRAVELING PARTICLES (z-3)
          ============================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.4}px, ${-mouseOffset.y * 0.4}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 3,
        }}
      >
        <OrbitRings isVisible={isVisible} />
      </div>

      {/* ==============================================================
          LAYER 4 — PRACHI PORTRAIT (z-4)
          Sharp, natural, standing in front of campus (no circular frame)
          ============================================================== */}
      <div
        className="relative w-[380px] sm:w-[460px] h-[520px] sm:h-[600px] flex items-end justify-center pointer-events-none"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.35}px, ${mouseOffset.y * 0.35}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 4,
        }}
      >
        <img
          src={campusAssets.prachiPortraitCleanCutout}
          alt="Prachi Priya — Developer of Smart Campus"
          className="w-full h-full object-contain object-bottom block select-none pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 35px rgba(255, 255, 255, 0.45)) drop-shadow(0 10px 25px rgba(7, 26, 43, 0.12))',
          }}
          loading="eager"
        />
      </div>

      {/* ==============================================================
          LAYER 5 — 6 LIVE TRAVELING FLOATING CARDS & DEVELOPER PILL (z-5)
          ============================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.3}px, ${-mouseOffset.y * 0.3}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 5,
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

      {/* Dark-Green Curved Pill with 4s Shimmer Shine Highlight */}
      <div 
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{ zIndex: 5 }}
      >
        <div className="relative overflow-hidden px-5 sm:px-6 py-2 rounded-full bg-[#0B3B26] dark:bg-[#072B1C] border border-[#16603F] shadow-xl shadow-emerald-950/30 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-shimmer-pill"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          />
          <span className="relative z-10 text-[11px] sm:text-xs font-bold text-white tracking-wide whitespace-nowrap">
            Developer &nbsp;•&nbsp; Learner &nbsp;•&nbsp; Problem Solver &nbsp;•&nbsp; Dreamer
          </span>
        </div>
      </div>

      {/* Live Calligraphy & Floating Drifting Leaves */}
      <div style={{ zIndex: 5 }} className="absolute inset-0 pointer-events-none">
        <DeveloperDecorations isVisible={isVisible} />
      </div>

    </div>
  );
}
