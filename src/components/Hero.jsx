import React from 'react';
import { ArrowRight, PlusCircle, Sprout, Building2, Zap, Users } from 'lucide-react';
import { campusAssets } from '../assets/campusAssets';
import HeroCalligraphy from './common/HeroCalligraphy';

/**
 * Hero — Cinematic Landing Page Hero Section
 * 
 * Design specifications:
 * - Uses exact high-resolution CGC University Mohali aerial campus image (cgc_landing_campus_hd.jpg)
 * - Full-width, ~650–750px height on desktop
 * - Entrance and campus buildings clearly visible
 * - Directional dark navy/black gradient ONLY behind left-side text (rgba(3, 15, 20, 0.75))
 * - Right side features "Your Voice / A Better Campus" calligraphy with soft light glow
 * - Clean feature chips in one single row: Clean Campus, Better Facilities, Quick Resolutions, Stronger Community
 */
export default function Hero({ onOpenSubmitModal }) {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[660px] lg:h-[720px] xl:h-[750px] flex items-center overflow-hidden select-none"
    >
      {/* 1. Exact Uploaded CGC University Mohali Aerial Campus Photograph */}
      <img
        src={campusAssets.landingBg}
        alt="CGC University Mohali Entrance & Campus Buildings"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-[0.98] contrast-[1.02] transition-transform duration-1000 ease-out"
        loading="eager"
      />

      {/* 2. Directional Gradient Overlay ONLY on the Left / Center-Left Side */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(3, 15, 20, 0.88) 0%, rgba(3, 15, 20, 0.78) 32%, rgba(3, 15, 20, 0.40) 55%, rgba(3, 15, 20, 0.10) 75%, transparent 88%)'
        }}
      />
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(3, 15, 20, 0.65) 0%, transparent 28%, transparent 70%, rgba(3, 15, 20, 0.75) 100%)'
        }}
      />

      {/* 3. Foreground Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12 sm:pt-24 sm:pb-16 flex flex-col justify-between h-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          
          {/* Left Column: Smart Campus Branding & Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 max-w-2xl">
            
            {/* Institutional Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#051118]/80 border border-white/20 backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#00B878] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A84F]">
                CGC University Mohali
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-medium text-white/90">
                Digital Governance
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-md">
                CGC Smart <span className="text-[#00B878]">Campus</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#D4A84F] tracking-tight drop-shadow-xs">
                Complaint & Analytics
              </p>
            </div>

            {/* Slogan */}
            <div className="border-l-3 border-[#00B878] pl-4 py-0.5 space-y-1">
              <p className="text-xl sm:text-2xl font-black text-white italic tracking-wide">
                “Report. Track. Resolve. Improve.”
              </p>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl">
                Smart digital complaint management for a better campus.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              {/* Primary + Submit a Complaint */}
              <button
                type="button"
                onClick={onOpenSubmitModal}
                className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#00B878] hover:bg-[#009e66] hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-950/30 hover:shadow-xl hover:shadow-emerald-950/40 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span>+ Submit a Complaint</span>
              </button>

              {/* Secondary Explore How It Works */}
              <a
                href="#how-it-works"
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#051118]/75 hover:bg-[#051118]/90 border border-white/20 hover:border-white/35 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore How It Works</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </a>
            </div>

            {/* Subtle Hero Feature Chips in ONE single row */}
            <div className="pt-4 flex flex-wrap sm:flex-nowrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#051118]/70 backdrop-blur-md border border-white/15 text-white font-medium whitespace-nowrap shadow-xs">
                <Sprout className="w-3.5 h-3.5 text-[#00B878]" />
                <span>Clean Campus</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#051118]/70 backdrop-blur-md border border-white/15 text-white font-medium whitespace-nowrap shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-[#00B878]" />
                <span>Better Facilities</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#051118]/70 backdrop-blur-md border border-white/15 text-white font-medium whitespace-nowrap shadow-xs">
                <Zap className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Quick Resolutions</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#051118]/70 backdrop-blur-md border border-white/15 text-white font-medium whitespace-nowrap shadow-xs">
                <Users className="w-3.5 h-3.5 text-[#00B878]" />
                <span>Stronger Community</span>
              </span>
            </div>

          </div>

          {/* Right Column: Decorative Slogan with Radiant Light Reflection over Bright Campus */}
          <div className="lg:col-span-5 hidden lg:flex justify-end items-center pointer-events-none">
            <HeroCalligraphy />
          </div>

        </div>

      </div>

      {/* Subtle bottom transition border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B878]/30 to-transparent pointer-events-none" />
    </section>
  );
}
