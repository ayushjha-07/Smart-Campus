import React, { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Wifi,
  BarChart,
  Clock,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { AI_INSIGHTS_DATA } from '../../../data/analyticsData';

export default function AIInsights() {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const getInsightIcon = (id) => {
    switch (id) {
      case '01':
        return TrendingUp;
      case '02':
        return Wifi;
      case '03':
        return BarChart;
      case '04':
        return Clock;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              AI-Powered Insights
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              Demo Models
            </span>
          </div>
          <p className="text-xs text-[#60717A] dark:text-[#A8B3B0] mt-1">
            Automated heuristic pattern detection across campus ticket streams
          </p>
        </div>

        <div className="text-[11px] text-[#60717A] dark:text-[#A8B3B0] flex items-center gap-1.5 self-start sm:self-auto bg-[#F7F9F8] dark:bg-white/5 px-2.5 py-1 rounded-lg">
          <HelpCircle className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
          <span>Simulated demo analytics — not live ML inference</span>
        </div>
      </div>

      {/* Grid of 4 Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {AI_INSIGHTS_DATA.map((insight) => {
          const Icon = getInsightIcon(insight.id);

          return (
            <div
              key={insight.id}
              className="group relative bg-[#F7F9F8] dark:bg-[#050A0C] border border-[#DDE8E3] dark:border-[#243338] rounded-xl p-4 flex flex-col justify-between hover:border-[#008F63] dark:hover:border-[#00A875] hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase text-[#008F63] dark:text-[#00A875]">
                    <Icon className="w-3.5 h-3.5" />
                    {insight.code}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-[#0C1518] text-[#60717A] dark:text-[#A8B3B0] border border-[#DDE8E3] dark:border-[#243338]">
                    {insight.confidence}
                  </span>
                </div>

                {/* Insight Description */}
                <p className="text-xs text-[#071A2B] dark:text-[#F5F5F0] font-medium leading-relaxed mb-3">
                  "{insight.description}"
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 flex items-center justify-between">
                <span className="text-[10px] text-[#60717A] dark:text-[#A8B3B0]">
                  {insight.category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedInsight(insight)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#008F63] dark:text-[#00A875] hover:underline cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight Details Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] shadow-2xl max-w-lg w-full p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDE8E3] dark:border-[#243338] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#008F63]/10 text-[#008F63] dark:bg-[#00A875]/20 dark:text-[#00A875]">
                  {selectedInsight.code}
                </span>
                <h3 className="font-bold text-[#071A2B] dark:text-[#F5F5F0] text-sm sm:text-base">
                  {selectedInsight.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInsight(null)}
                className="p-1 rounded-lg text-[#60717A] hover:text-[#071A2B] dark:hover:text-white hover:bg-[#F7F9F8] dark:hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F9F8] dark:bg-[#050A0C] border border-[#DDE8E3] dark:border-[#243338]">
                <div className="font-bold text-[#60717A] dark:text-[#A8B3B0] mb-1">
                  Observed Pattern:
                </div>
                <p className="text-[#071A2B] dark:text-[#F5F5F0] leading-relaxed">
                  {selectedInsight.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl border border-[#DDE8E3] dark:border-[#243338]">
                  <div className="text-[10px] text-[#60717A] dark:text-[#A8B3B0]">Model Confidence</div>
                  <div className="font-bold text-[#008F63] dark:text-[#00A875] text-sm mt-0.5">{selectedInsight.confidence}</div>
                </div>
                <div className="p-2.5 rounded-xl border border-[#DDE8E3] dark:border-[#243338]">
                  <div className="text-[10px] text-[#60717A] dark:text-[#A8B3B0]">Sample Impact</div>
                  <div className="font-bold text-[#D4A84F] text-sm mt-0.5">{selectedInsight.impact}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Suggested Administrative Action:
                </div>
                <p className="text-[#071A2B] dark:text-[#F5F5F0] leading-relaxed">
                  {selectedInsight.actionText}
                </p>
              </div>

              <p className="text-[10px] text-[#60717A] dark:text-[#A8B3B0] italic text-center pt-1">
                Notice: Generated as synthetic demonstration heuristics for CGC University administrator review.
              </p>
            </div>

            <div className="pt-2 border-t border-[#DDE8E3] dark:border-[#243338] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedInsight(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] text-white"
              >
                Close Insight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
