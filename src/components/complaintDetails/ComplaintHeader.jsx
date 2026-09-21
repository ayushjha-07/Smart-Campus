import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import campusAssets from '../../assets/campusAssets';
import HeroCalligraphy from '../common/HeroCalligraphy';

export default function ComplaintHeader({ complaintId, onDownloadReport }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#DDE7E2] dark:border-white/10 p-6 sm:p-7 lg:p-8 shadow-xl min-h-[195px] sm:min-h-[215px] flex items-center justify-between transition-all">
      
      {/* Real CGC Aerial Campus Photo (100% Opacity, Sharp, Real Photograph) */}
      <img
        src={campusAssets.aerialImage}
        alt="CGC University Mohali Aerial Campus"
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] z-0 filter brightness-[1.0] contrast-[1.02]"
      />

      {/* Master Directional Contrast Gradient for Text Readability:
          - Left 45%: strong dark navy/black overlay (~82-84% opacity)
          - Middle 45%: smooth transition to transparent (down to ~18-20% opacity)
          - Right 10%: almost completely transparent, keeping CGC University building sharp & bright
      */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(5, 13, 18, 0.85) 0%, rgba(5, 13, 18, 0.80) 40%, rgba(5, 13, 18, 0.40) 65%, rgba(5, 13, 18, 0.12) 85%, rgba(5, 13, 18, 0.0) 100%)'
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(5, 13, 18, 0.70) 0%, rgba(5, 13, 18, 0.20) 28%, transparent 55%)'
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 w-full">
        
        {/* Left: Badge, Heading, Description, Buttons */}
        <div className="space-y-2.5 max-w-xl">
          {/* Top Pill Badge: Smart Campus */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#050D12]/75 backdrop-blur-md border border-white/20 text-white shadow-sm">
              <span>Smart Campus</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Complaint <span className="text-[#10E894]">Details</span>
              </h1>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#10E894] px-3 py-1 rounded-xl bg-[#050D12]/80 border border-emerald-500/40 shadow-sm backdrop-blur-md">
                #{complaintId}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-xs leading-relaxed max-w-lg">
              Track the complete status, progress, updates, and resolution of your complaint.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onDownloadReport}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#078A5A] hover:bg-[#06734B] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Report</span>
            </button>

            <Link
              to="/student/complaints"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10213A] bg-white hover:bg-slate-100 border border-slate-200/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-[#10213A]" />
              <span>Back to Complaints</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Script Calligraphy Overlay with Soft White Blur Cloud */}
        <HeroCalligraphy />

      </div>
    </div>
  );
}
