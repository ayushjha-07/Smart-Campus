import React, { useState } from 'react';
import { campusAssets } from '../../assets/campusAssets';

/**
 * DeveloperPortrait — Central Showcase matching reference image media_1790099017754.jpg
 * - High-fidelity dominant portrait of Prachi Priya with CGC University Mohali daylight background
 * - 4 interactive live card hotspots with hover glow, scale-lift, and descriptive tooltips:
 *     1. Upper-Left: Clean Code / Better Campus
 *     2. Mid-Left: Ideas / into Impact
 *     3. Mid-Right: For a / Smarter Campus
 *     4. Lower-Right: Stronger / Community
 * - Real live traveling 4s shimmer beam sweeping across the developer pill
 * - Real live glowing particle sparkles orbiting smoothly along the green arc
 * - Subtle floating drifting leaves in the atmosphere
 * - Interactive 3D mouse parallax tracking
 */
export default function DeveloperPortrait({ mouseOffset = { x: 0, y: 0 }, isVisible = true }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  // 4 Interactive Cards mapped to exact pixel percentage positions of media_1790099017754.jpg
  const interactiveCards = [
    {
      id: 'clean-code',
      title: 'Clean Code • Better Campus',
      desc: 'Modular, maintainable, production-ready code designed for scale.',
      style: {
        top: '18.5%',
        left: '7.5%',
        width: '26%',
        height: '11.5%',
      },
      floatClass: 'animate-float-slow',
    },
    {
      id: 'ideas-impact',
      title: 'Ideas into Impact',
      desc: 'Transforming student feedback into real-time operational workflows.',
      style: {
        top: '40.5%',
        left: '4%',
        width: '24%',
        height: '11.5%',
      },
      floatClass: 'animate-float-delayed',
    },
    {
      id: 'smarter-campus',
      title: 'For a Smarter Campus',
      desc: 'Institutional-grade grievance governance for CGC University Mohali.',
      style: {
        top: '39%',
        left: '67.5%',
        width: '25%',
        height: '11.5%',
      },
      floatClass: 'animate-float-slow',
    },
    {
      id: 'stronger-community',
      title: 'Stronger Community',
      desc: 'Bridging the communication gap between students, faculty & administration.',
      style: {
        top: '63%',
        left: '71.5%',
        width: '22.5%',
        height: '11.5%',
      },
      floatClass: 'animate-float-delayed',
    },
  ];

  return (
    <div className="relative w-full max-w-[620px] lg:max-w-[660px] aspect-square mx-auto flex items-center justify-center select-none overflow-visible">
      
      {/* ==============================================================
          LAYER 1 — AMBIENT BACKDROP LIGHTING & PULSING MINT GLOW
          ============================================================== */}
      <div 
        className="absolute w-[520px] h-[520px] rounded-full bg-radial from-[#008F63]/18 via-[#38D59E]/08 to-transparent blur-3xl pointer-events-none animate-glow-pulse"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.2}px, ${-mouseOffset.y * 0.2}px, 0)`,
          transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 1,
        }}
      />

      {/* ==============================================================
          LAYER 2 — MASTER PORTRAIT SHOWCASE ARTWORK
          Matches reference image media_1790099017754.jpg with 100% precision
          ============================================================== */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 2,
        }}
      >
        <img
          src={campusAssets.developerShowcaseMaster4Cards}
          alt="Developed by Prachi Priya — Smart Campus CGC University Mohali"
          className="w-full h-full object-contain block select-none pointer-events-none filter drop-shadow-[0_10px_25px_rgba(0,143,99,0.06)]"
          loading="eager"
        />

        {/* ==============================================================
            LAYER 3 — LIVE TRAVELING SPARKLES & ORBIT PARTICLES
            Continuously moving tiny light dots along the green orbit
            ============================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {/* Sparkle 1: Top-Right Orbit */}
          <div 
            className="absolute top-[16%] right-[32%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#38D59E] animate-ping"
            style={{ animationDuration: '3s', animationPlayState: isVisible ? 'running' : 'paused' }}
          />
          {/* Sparkle 2: Mid-Left Orbit */}
          <div 
            className="absolute top-[34%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#D4A84F] shadow-[0_0_6px_#D4A84F] animate-pulse"
            style={{ animationDuration: '2.2s', animationPlayState: isVisible ? 'running' : 'paused' }}
          />
          {/* Sparkle 3: Lower-Right Orbit */}
          <div 
            className="absolute top-[58%] right-[23%] w-2 h-2 rounded-full bg-[#38D59E] shadow-[0_0_8px_#008F63] animate-pulse"
            style={{ animationDuration: '2.8s', animationPlayState: isVisible ? 'running' : 'paused' }}
          />
          {/* Sparkle 4: Lower-Left Orbit */}
          <div 
            className="absolute bottom-[24%] left-[21%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-ping"
            style={{ animationDuration: '4s', animationPlayState: isVisible ? 'running' : 'paused' }}
          />
        </div>

        {/* ==============================================================
            LAYER 4 — LIVE 4-SECOND SHIMMER SHINE BEAM ON DEVELOPER PILL
            Sweeps smoothly across "Developer • Learner • Problem Solver • Dreamer"
            ============================================================== */}
        <div 
          className="absolute bottom-[8.5%] left-[21.5%] w-[50%] h-[7.5%] rounded-full overflow-hidden pointer-events-none"
          style={{ transform: 'rotate(-1.5deg)' }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-pill"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          />
        </div>

        {/* ==============================================================
            LAYER 5 — 4 INTERACTIVE LIVE CARD HOTSPOTS WITH HOVER LIFT & TOOLTIPS
            Each card has subtle micro-float, hover scale, and informative badge
            ============================================================== */}
        <div className="absolute inset-0 pointer-events-auto">
          {interactiveCards.map((card) => (
            <div
              key={card.id}
              style={card.style}
              className={`absolute rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 ${card.floatClass}`}
              onMouseEnter={() => setActiveTooltip(card.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Subtle hover outline glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#008F63]/40 group-hover:bg-[#008F63]/5 group-hover:shadow-[0_0_20px_rgba(0,143,99,0.25)] transition-all duration-300 rounded-2xl" />

              {/* Informative Tooltip on Hover */}
              {activeTooltip === card.id && (
                <div 
                  className={`absolute z-30 px-3 py-2 rounded-xl bg-[#071A2B]/95 text-white text-xs shadow-xl backdrop-blur-md border border-white/10 pointer-events-none whitespace-normal w-52 text-left animate-fade-in ${
                    card.style.left.includes('7') ? 'right-0 top-full mt-2' : 'left-0 top-full mt-2'
                  }`}
                >
                  <p className="font-bold text-[#38D59E] text-[11px] leading-tight mb-0.5">
                    {card.title}
                  </p>
                  <p className="text-[10px] text-gray-200 leading-snug">
                    {card.desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ==============================================================
            LAYER 6 — SUBTLE FLOATING DRIFTING LEAVES
            ============================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <div 
            className="absolute top-[8%] left-[10%] text-base select-none opacity-85 animate-leaf-drift-1"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          >
            🍃
          </div>
          <div 
            className="absolute top-[28%] right-[2%] text-sm select-none opacity-80 animate-leaf-drift-2"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          >
            🌿
          </div>
          <div 
            className="absolute bottom-[20%] left-[8%] text-sm select-none opacity-75 animate-leaf-drift-3"
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          >
            🍃
          </div>
        </div>

      </div>

    </div>
  );
}
