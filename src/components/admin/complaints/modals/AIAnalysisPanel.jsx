import React from 'react';
import { Sparkles, CheckCircle2, Tag, Building2, AlertTriangle } from 'lucide-react';

export default function AIAnalysisPanel({ complaint }) {
  const analysis = complaint?.aiAnalysis || {
    category: complaint?.category || 'Water Supply',
    priority: complaint?.priority === 'HIGH' ? 'High' : complaint?.priority || 'High',
    confidence: '94%',
    keywords: ['water', 'hostel', 'unavailable', 'students'],
    suggestedDepartment: 'Hostel / Maintenance',
    label: 'Demo AI Analysis'
  };

  return (
    <div className="rounded-xl p-4 bg-gradient-to-br from-[#008F63]/5 via-[#008F63]/10 to-transparent dark:from-[#00A875]/10 dark:via-[#00A875]/5 dark:to-transparent border border-[#008F63]/25 dark:border-[#00A875]/30 space-y-3.5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#008F63]/20 dark:border-[#00A875]/20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#008F63] text-white dark:bg-[#00A875] dark:text-[#071A2B]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              AI Analysis
            </h4>
            <p className="text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
              Automated classification & priority heuristics
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4A84F]/20 text-[#B88728] dark:text-[#E5BF6E] border border-[#D4A84F]/40 uppercase tracking-wider">
          {analysis.label || 'Demo AI Analysis'}
        </span>
      </div>

      {/* Grid of Attributes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338]">
          <span className="block text-[10px] font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider">
            Category
          </span>
          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block truncate">
            {analysis.category}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338]">
          <span className="block text-[10px] font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider">
            Priority
          </span>
          <span className="font-bold text-orange-600 dark:text-orange-400 mt-0.5 block truncate">
            {analysis.priority}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338]">
          <span className="block text-[10px] font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider">
            Confidence
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="font-extrabold text-[#008F63] dark:text-[#00A875] font-mono">
              {analysis.confidence}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-[#243338]">
          <span className="block text-[10px] font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider">
            Suggested Dept
          </span>
          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0] mt-0.5 block truncate">
            {analysis.suggestedDepartment}
          </span>
        </div>
      </div>

      {/* Keywords */}
      <div>
        <span className="block text-[10px] font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider mb-1.5">
          Keywords Detected
        </span>
        <div className="flex flex-wrap gap-1.5">
          {analysis.keywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-white dark:bg-[#07121A] text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338]"
            >
              <Tag className="w-2.5 h-2.5 text-[#008F63] dark:text-[#00A875]" />
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Notice */}
      <p className="text-[10px] italic text-[#60717A] dark:text-[#9FB1BC]/80 pt-1">
        * Notice: AI analysis is simulated mock telemetry designed for administrative triage demonstration.
      </p>
    </div>
  );
}
