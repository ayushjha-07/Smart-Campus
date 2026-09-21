import React from 'react';
import { Sparkles, BrainCircuit, ShieldAlert, ArrowRight } from 'lucide-react';
import { AI_INSIGHTS_DATA } from '../../../data/analyticsMockData';

export default function AIInsights() {
  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A84F]" />
            <h2 className="text-base sm:text-lg font-bold text-[#F5F5F0]">
              AI-Powered Insights
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Automated observations from complaint patterns
          </p>
        </div>

        {/* Disclaimer Tag */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13242E] text-[10px] text-[#71844A] border border-[#1A2E3B]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#D4A84F]" />
          <span>Demo pattern recognition • Simulated data</span>
        </div>
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {AI_INSIGHTS_DATA.map((insight) => (
          <div
            key={insight.id}
            className="bg-[#07121A] border border-[#1A2E3B] rounded-xl p-4 flex flex-col justify-between hover:border-[#315C3A] transition-all hover:shadow-[0_4px_16px_-4px_rgba(49,92,58,0.2)] group"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    color: insight.categoryColor,
                    backgroundColor: `${insight.categoryColor}15`,
                    borderColor: `${insight.categoryColor}30`
                  }}
                >
                  {insight.category}
                </span>
                <span className="text-[10px] text-[#71844A] flex items-center gap-1">
                  <BrainCircuit className="w-3 h-3 text-[#D4A84F]" />
                  {insight.confidence}
                </span>
              </div>

              {/* Title / Finding */}
              <h3 className="text-xs sm:text-sm font-semibold text-[#F5F5F0] leading-snug group-hover:text-[#D4A84F] transition-colors">
                "{insight.title}"
              </h3>

              {/* Description */}
              <p className="text-[11px] text-[#9FB1BC] mt-2 leading-relaxed">
                {insight.description}
              </p>
            </div>

            {/* Actionable Tip Footer */}
            <div className="mt-3 pt-2.5 border-t border-[#1A2E3B]/60 flex items-start gap-1.5 text-[10px] text-[#71844A]">
              <ArrowRight className="w-3 h-3 shrink-0 text-[#D4A84F] mt-0.5" />
              <span>
                <strong className="text-[#F5F5F0]">Action:</strong> {insight.actionableTip}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
