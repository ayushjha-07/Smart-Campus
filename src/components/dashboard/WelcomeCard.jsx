import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  ClipboardList 
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

      {/* 2. Smooth Dark Navy / Forest-Green Gradient ONLY on the LEFT 42% of the image (fading transparent toward center) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(4, 15, 22, 0.90) 0%, rgba(5, 22, 24, 0.82) 22%, rgba(5, 20, 24, 0.45) 34%, transparent 42%)'
        }}
      />

      {/* 3. Hero Content — Placed Strictly on the Left over the Darkened Area */}
      <div className="relative z-10 space-y-3.5 max-w-xl">
        
        {/* Top Badge: Active Grievance SLA Monitoring */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#051118]/75 backdrop-blur-xs border border-white/20 text-[#00B878] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B878] animate-pulse" />
            <span>Active Grievance SLA Monitoring</span>
          </div>
        </div>

        {/* Main Heading: White with Ayush! in Bright Green #00B878 */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Good to see you, <span className="text-[#00B878]">Ayush!</span>
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
            className="px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#00B878] hover:bg-[#009e66] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md shadow-emerald-950/30"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>+ Submit Complaint</span>
          </Link>

          {/* Secondary View My Complaints button */}
          <Link
            to="/student/complaints"
            className="px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#051118]/75 hover:bg-[#051118]/90 border border-white/25 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md backdrop-blur-xs"
          >
            <ClipboardList className="w-4 h-4 text-[#D4A84F]" />
            <span>View My Complaints</span>
          </Link>
        </div>

      </div>

      {/* 4. Right Side: Subtle Integrated Slogan in Upper-Right Area */}
      <div className="hidden sm:block absolute top-5 right-6 lg:top-6 lg:right-9 z-10 pointer-events-none">
        <HeroCalligraphy />
      </div>

    </div>
  );
}
