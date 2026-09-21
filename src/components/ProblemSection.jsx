import React from 'react';
import { FileText, EyeOff, Clock, AlertCircle } from 'lucide-react';
import { problemPoints } from '../data/landingData';

const iconMap = {
  FileText: FileText,
  EyeOff: EyeOff,
  Clock: Clock,
};

export default function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#008F63]/5 dark:bg-[#315C3A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F1] border border-[#FFD5D5] text-[#D94A4A] dark:bg-[#0D1B22] dark:border-red-500/20 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Challenge Today</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight mb-4">
            Campus Complaints Shouldn't Get Lost.
          </h2>
          
          <p className="text-base sm:text-lg text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto leading-relaxed">
            Traditional complaint processes can be slow, fragmented, and difficult to track.
          </p>
        </div>

        {/* 3 Problem Statement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemPoints.map((item) => {
            const Icon = iconMap[item.iconName] || FileText;
            return (
              <div
                key={item.id}
                className="group relative bg-[#FFFFFF] hover:bg-[#FCFEFD] dark:bg-[#0D1B22]/80 dark:hover:bg-[#13242E]/90 border border-[#DDE8E3] dark:border-white/10 hover:border-[#D94A4A]/40 dark:hover:border-red-500/30 rounded-[20px] p-8 transition-all duration-300 shadow-xs hover:shadow-md dark:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-[#FFF4F4] border border-[#FFD9D9] text-[#E55353] dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  
                  {/* Category Badge */}
                  <span className="text-[11px] font-bold tracking-wider uppercase bg-[#FFF1F1] text-[#D94A4A] border border-[#FFD5D5] dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400/80 px-2.5 py-1 rounded-md shadow-2xs">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-3 group-hover:text-[#D94A4A] dark:group-hover:text-red-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#60717A] dark:text-[#9FB1BC] font-normal leading-[1.6]">
                    {item.description}
                  </p>
                </div>

                {/* Horizontal Divider & Bottom Label */}
                <div className="mt-8 pt-4 border-t border-[#DCE5E2] dark:border-white/10 flex items-center text-xs text-[#6B7C83] dark:text-[#9FB1BC]/60 font-medium">
                  <span>Traditional friction point</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
