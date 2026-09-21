import React from 'react';
import { Sparkles, BrainCircuit, ShieldCheck, Tag } from 'lucide-react';
import ComplaintPriorityBadge from '../complaints/ComplaintPriorityBadge';

export default function AIAnalysisCard({ aiAnalysis }) {
  if (!aiAnalysis) return null;

  const {
    category = 'Water Supply',
    priority = 'HIGH',
    confidence = 91,
    keywords = ['water supply', 'hostel', 'stopped', 'students'],
    reason = 'The complaint indicates a significant campus facility issue affecting multiple students and may require timely attention.',
    label = 'AI-generated recommendation',
  } = aiAnalysis;

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#0D1B22] dark:via-[#10222B] dark:to-[#0D1B22] border border-[#DDE7E2] dark:border-[#315C3A]/60 rounded-3xl p-5 sm:p-6 shadow-xs dark:shadow-2xl backdrop-blur-xl space-y-5 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-[#168A5B]/5 dark:bg-[#D4A84F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-[#DDE7E2] dark:border-white/5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-[#315C3A]/30 border border-emerald-200 dark:border-[#315C3A] flex items-center justify-center text-[#168A5B] dark:text-[#D4A84F] shadow-sm">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">
              AI Complaint Analysis
            </h3>
            <span className="text-[10px] text-[#64748B] dark:text-[#A8B3B0]/70 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#168A5B] dark:text-[#D4A84F]" />
              <span>Campus Automated Priority Engine</span>
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-[#315C3A]/30 border border-emerald-200 dark:border-[#315C3A] text-[10px] font-semibold text-[#168A5B] dark:text-[#D4A84F]">
          <ShieldCheck className="w-3 h-3" />
          <span>{label}</span>
        </div>
      </div>

      {/* 3 Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Category */}
        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0]/60 block">
            Detected Category
          </span>
          <span className="text-xs font-semibold text-[#14213D] dark:text-[#F5F5F0] flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-[#168A5B] dark:text-[#71844A]" />
            {category}
          </span>
        </div>

        {/* Priority */}
        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0]/60 block">
            Detected Priority
          </span>
          <div>
            <ComplaintPriorityBadge priority={priority} />
          </div>
        </div>

        {/* Confidence */}
        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#07121A]/80 border border-[#DDE7E2] dark:border-white/5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0]/60 block">
            Confidence Score
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#168A5B] dark:text-[#D4A84F]">
              {confidence}%
            </span>
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-[#050A0C] rounded-full overflow-hidden border border-[#DDE7E2] dark:border-white/5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#168A5B] dark:from-[#71844A] dark:to-[#D4A84F] rounded-full"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detected Keywords */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#A8B3B0]/70 tracking-wider block">
          Detected Keywords
        </span>
        <div className="flex flex-wrap gap-1.5">
          {keywords.map((kw, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 text-[11px] font-mono text-[#14213D] dark:text-[#F5F5F0]"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Reasoning text card */}
      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#07121A]/60 border border-[#DDE7E2] dark:border-white/5 space-y-1 text-xs">
        <span className="text-[10px] uppercase font-bold text-[#168A5B] dark:text-[#71844A] block">
          Analysis Reasoning
        </span>
        <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] leading-relaxed">
          "{reason}"
        </p>
      </div>

      {/* Footer disclaimer */}
      <div className="flex items-center justify-between text-[10px] text-[#64748B] dark:text-[#A8B3B0]/50 pt-1 border-t border-[#DDE7E2] dark:border-white/5">
        <span>Model: CampusNLP-v2.4 (Simulated)</span>
        <span className="text-[#168A5B] dark:text-[#D4A84F]/80">Frontend demo data only</span>
      </div>
    </div>
  );
}
