import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { AI_INSIGHT_DATA } from '../../data/adminDashboardData';

export default function AIInsight() {
  return (
    <div className="relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all bg-gradient-to-br from-white via-[#F7F9F8] to-emerald-50/40 dark:from-[#0C1518] dark:via-[#0C1518]/95 dark:to-[#0A261D] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs h-full flex flex-col justify-between">
      {/* Decorative subtle backdrop orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#008F63]/5 dark:bg-[#00A875]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#008F63]/10 dark:bg-[#315C3A]/30 border border-[#008F63]/25 dark:border-[#315C3A]/50 flex items-center justify-center text-[#008F63] dark:text-[#D4A84F]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              {AI_INSIGHT_DATA.title}
            </h3>
            <p className="text-[11px] font-medium text-[#60717A] dark:text-[#9FB1BC]">
              Heuristic campus analytics prediction
            </p>
          </div>
        </div>

        {/* Clear Demo Label */}
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-[#D4A84F] border border-amber-200 dark:border-amber-900/40">
          {AI_INSIGHT_DATA.badge}
        </span>
      </div>

      {/* Insight Content */}
      <div className="p-4 rounded-xl bg-white/80 dark:bg-[#07121A]/70 border border-[#DDE8E3] dark:border-[#1A2E3B]/80 my-auto relative z-10 shadow-2xs">
        <div className="flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-[#D4A84F] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#071A2B] dark:text-[#F5F5F0] font-medium">
            {AI_INSIGHT_DATA.message}
          </p>
        </div>
      </div>

      {/* Action Link & Note */}
      <div className="flex items-center justify-between pt-3 border-t border-[#DDE8E3] dark:border-[#1A2E3B] relative z-10">
        <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]/70 italic">
          *Heuristic pattern rule-based analysis
        </span>

        <Link
          to={AI_INSIGHT_DATA.linkRoute}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008F63] hover:text-[#00704E] dark:text-[#D4A84F] dark:hover:text-[#E5BF6E] transition-colors"
        >
          <span>{AI_INSIGHT_DATA.linkText}</span>
        </Link>
      </div>
    </div>
  );
}
