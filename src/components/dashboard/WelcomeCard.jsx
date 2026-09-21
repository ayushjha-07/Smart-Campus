import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  ClipboardList, 
  Sprout, 
  Building2, 
  Zap, 
  Users 
} from 'lucide-react';
import campusAssets from '../../assets/campusAssets';
import HeroCalligraphy from '../common/HeroCalligraphy';

export default function WelcomeCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 p-6 sm:p-7 lg:p-8 shadow-xl min-h-[230px] sm:min-h-[260px] flex items-center transition-all">
      
      {/* 1. Exact Uploaded CGC University Mohali Panoramic Aerial Photograph */}
      <img
        src={campusAssets.aerialImage}
        alt="CGC University Mohali Aerial Campus"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. Subtle Dark Navy/Black Gradient ONLY behind the LEFT text area (Right 45% is 100% transparent & bright) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(5, 13, 18, 0.84) 0%, rgba(5, 13, 18, 0.76) 32%, rgba(5, 13, 18, 0.35) 54%, transparent 72%)'
        }}
      />

      {/* 3. Hero Content — Placed Strictly on the Left over the Darkened Area */}
      <div className="relative z-10 space-y-3.5 max-w-xl">
        
        {/* Top Badge: Active Grievance SLA Monitoring */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#050D12]/75 backdrop-blur-md border border-white/20 text-[#10E894] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10E894] animate-pulse" />
            <span>Active Grievance SLA Monitoring</span>
          </div>
        </div>

        {/* Main Heading: White with Ayush! in Smart Campus Green */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Good to see you, <span className="text-[#10E894]">Ayush!</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-100 max-w-lg leading-relaxed font-medium drop-shadow-xs">
            Track your complaints, report new issues, and help make your CGC campus better.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 flex flex-wrap items-center gap-3">
          {/* Primary Submit Complaint button */}
          <Link
            to="/student/complaints/new"
            className="px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#078A5A] hover:bg-[#06734B] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md shadow-emerald-950/25"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>+ Submit Complaint</span>
          </Link>

          {/* Secondary View My Complaints button */}
          <Link
            to="/student/complaints"
            className="px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#050D12]/75 hover:bg-[#050D12]/90 border border-white/25 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md backdrop-blur-xs"
          >
            <ClipboardList className="w-4 h-4 text-[#D4A84F]" />
            <span>View My Complaints</span>
          </Link>
        </div>

        {/* Bottom Feature Labels */}
        <div className="pt-1.5 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#050D12]/60 backdrop-blur-xs border border-white/15 text-white/90 font-medium drop-shadow-xs">
            <Sprout className="w-3.5 h-3.5 text-[#10E894]" />
            <span>Clean Campus</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#050D12]/60 backdrop-blur-xs border border-white/15 text-white/90 font-medium drop-shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-[#10E894]" />
            <span>Better Facilities</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#050D12]/60 backdrop-blur-xs border border-white/15 text-white/90 font-medium drop-shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>Quick Resolutions</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#050D12]/60 backdrop-blur-xs border border-white/15 text-white/90 font-medium drop-shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#10E894]" />
            <span>Stronger Community</span>
          </span>
        </div>

      </div>

      {/* 4. Right Side: Script Calligraphy in Upper-Right Area (Subtle glass blur, leaves main university building completely unobstructed) */}
      <div className="hidden sm:block absolute top-4 right-4 sm:top-5 sm:right-6 lg:top-6 lg:right-8 z-10 pointer-events-none">
        <HeroCalligraphy />
      </div>

    </div>
  );
}
