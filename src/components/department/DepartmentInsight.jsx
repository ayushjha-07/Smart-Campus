import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DepartmentInsight({ onViewAnalytics }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-white via-[#EAF7F1]/60 to-[#F5F5F0] dark:from-[#0C1518] dark:via-[#102422]/50 dark:to-[#07121A] border border-[#DDE8E3] dark:border-[#243338] shadow-xs flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#008F63]/10 dark:bg-[#00A875]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE8E3]/60 dark:border-[#243338]/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#008F63]/10 dark:bg-[#00A875]/20 flex items-center justify-center text-[#008F63] dark:text-[#00A875]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
              Department Insight
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#008F63]/10 text-[#008F63] dark:text-[#00A875] border border-[#008F63]/25">
            Demo AI Insight
          </span>
        </div>

        {/* Insight Body Text */}
        <div className="my-3 space-y-2">
          <p className="text-xs sm:text-sm text-[#071A2B] dark:text-[#F5F5F0] font-medium leading-relaxed">
            Most current complaints are related to hostel water supply and infrastructure. Two critical complaints require immediate attention.
          </p>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3]/80 dark:border-[#243338]/80 text-[11px] text-[#60717A] dark:text-[#9FB1BC] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#071A2B] dark:text-[#F5F5F0]">
              <Lightbulb className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Recommended Operational Strategy:</span>
            </div>
            <p>
              Prioritize water inlet pump check in Block B and expedite the dining hall RO chiller parts request to de-escalate overdue SLA tickets.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Button & Demo Notice */}
      <div className="pt-3 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] italic">
          * Demo AI heuristic insight generated for Hostel Department
        </span>
        <button
          onClick={onViewAnalytics || (() => navigate('/department/analytics'))}
          className="text-xs font-bold text-[#008F63] hover:text-[#007A54] dark:text-[#D4A84F] dark:hover:text-[#F5F5F0] inline-flex items-center gap-1.5 transition-colors self-end sm:self-auto cursor-pointer"
        >
          <span>View Detailed Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
