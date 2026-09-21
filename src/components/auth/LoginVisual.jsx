import React from 'react';
import { campusAssets } from '../../assets/campusAssets';
import { ShieldCheck, Zap, Activity } from 'lucide-react';

/**
 * LoginVisual — Split-screen Left 55% Visual Section
 * 
 * Design specifications:
 * - Uses exact uploaded CGC University Mohali aerial photograph (cgc_campus_login_bg.jpg)
 * - background-size: cover; background-position: center;
 * - Entire branding/text content vertically centered at ~50% height
 * - Placed in the center-left region with comfortable ~64px padding
 * - Text remains highly readable with subtle contrast gradient
 * - Main campus building clearly visible behind the content
 */
export default function LoginVisual() {
  return (
    <div className="relative hidden md:flex md:w-[45%] lg:w-[55%] min-h-screen overflow-hidden flex-col justify-center p-8 sm:p-12 lg:p-16 select-none">
      
      {/* 1. Exact Uploaded CGC University Mohali Aerial Campus Photograph */}
      <img
        src={campusAssets.loginBg}
        alt="CGC University Mohali Aerial Campus"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-[0.98] contrast-[1.02] transition-all duration-300"
      />

      {/* 2. Directional Gradient Overlay — Subtle, ensures text legibility while campus building remains clearly visible */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(90deg, rgba(5, 13, 18, 0.85) 0%, rgba(5, 13, 18, 0.70) 45%, rgba(5, 13, 18, 0.30) 80%, rgba(5, 13, 18, 0.08) 100%)'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(5, 13, 18, 0.45) 0%, transparent 40%, transparent 60%, rgba(5, 13, 18, 0.55) 100%)'
        }}
      />

      {/* Additional subtle dark mode tint for dark theme harmony */}
      <div className="absolute inset-0 bg-[#050A0C]/15 dark:bg-[#050A0C]/35 pointer-events-none z-0 transition-colors duration-300" />

      {/* 3. Top Institutional Logo Badge (Fixed in upper-left corner) */}
      <div className="absolute top-6 left-8 sm:top-8 sm:left-12 lg:top-10 lg:left-16 z-10">
        <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#051219]/75 backdrop-blur-md border border-white/15 shadow-lg">
          <img
            src={campusAssets.logo}
            alt="CGC University Mohali"
            className="h-9 sm:h-11 w-auto object-contain shrink-0"
          />
          <div className="border-l border-white/20 pl-3">
            <span className="block text-xs sm:text-sm font-extrabold text-white tracking-wide leading-none">
              CGC University
            </span>
            <span className="block text-[11px] font-bold text-[#D4A84F] tracking-wider uppercase mt-1 leading-none">
              Mohali Campus
            </span>
          </div>
        </div>
      </div>

      {/* 4. Vertically Centered Branding & Text Content Block (~50% Height, Center-Left Region) */}
      <div className="relative z-10 max-w-lg space-y-5 my-auto pt-16 md:pt-0">
        
        {/* Title Block */}
        <div className="space-y-1.5">
          {/* Digital Campus Portal Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00B878]/25 border border-[#00B878]/50 text-[#10E894] backdrop-blur-xs mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10E894] animate-pulse" />
            <span>Digital Campus Portal</span>
          </div>

          {/* CGC Smart Campus */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            CGC Smart <span className="text-[#10E894]">Campus</span>
          </h1>

          {/* Complaint & Analytics */}
          <p className="text-base sm:text-lg lg:text-xl font-bold text-[#D4A84F] tracking-wide">
            Complaint & Analytics
          </p>
        </div>

        {/* Slogan & Subtitle */}
        <div className="space-y-1.5 border-l-2 border-[#00B878] pl-3.5 py-0.5">
          <p className="text-base sm:text-lg font-extrabold text-white tracking-wide italic">
            “Report. Track. Resolve. Improve.”
          </p>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-md">
            Smarter campus services. Faster complaint resolution.
          </p>
        </div>

        {/* Feature Cards in One Responsive Row */}
        <div className="pt-2 grid grid-cols-3 gap-2.5 sm:gap-3 text-white max-w-md">
          {/* FAST SLA — Automated Triage */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#051219]/80 backdrop-blur-md border border-white/10 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#00B878] mb-1">
              <Zap className="w-3.5 h-3.5 text-[#00B878]" />
              <span className="text-[10px] uppercase font-bold text-[#D4A84F]">FAST SLA</span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold leading-tight text-white/95">
              Automated Triage
            </p>
          </div>

          {/* SECURE — Role Access */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#051219]/80 backdrop-blur-md border border-white/10 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#00B878] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00B878]" />
              <span className="text-[10px] uppercase font-bold text-[#D4A84F]">SECURE</span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold leading-tight text-white/95">
              Role Access
            </p>
          </div>

          {/* LIVE TRACKING — Real-Time Updates */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#051219]/80 backdrop-blur-md border border-white/10 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#00B878] mb-1">
              <Activity className="w-3.5 h-3.5 text-[#00B878]" />
              <span className="text-[10px] uppercase font-bold text-[#D4A84F]">LIVE TRACKING</span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold leading-tight text-white/95">
              Real-Time Updates
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
