import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  Flame, 
  Tag, 
  Gauge, 
  Workflow, 
  Info
} from 'lucide-react';
import { aiDemoData } from '../data/landingData';

export default function AISection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#008F63]/5 dark:bg-[#315C3A]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#D4A84F]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4F1] dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#D4A84F]/40 text-[#008F63] dark:text-[#D4A84F] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Language Processing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight mb-4">
            AI That Understands Complaints
          </h2>

          <p className="text-base sm:text-lg text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto leading-relaxed">
            NLP analyzes complaint descriptions to identify the issue, estimate priority, and support faster routing.
          </p>
        </div>

        {/* Interactive AI Demonstration Canvas */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[24px] bg-white dark:bg-[#0D1B22]/90 border border-[#DDE8E3] dark:border-[#315C3A]/40 shadow-lg shadow-slate-200/50 dark:shadow-2xl p-6 sm:p-10 backdrop-blur-xl overflow-hidden transition-colors">
            
            {/* Top Bar of the Mock Engine */}
            <div className="flex flex-wrap items-center justify-between pb-6 border-b border-[#DCE5E2] dark:border-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF4F1] dark:bg-[#315C3A]/30 border border-[#DDE8E3] dark:border-[#315C3A] flex items-center justify-center text-[#008F63] dark:text-[#D4A84F] shadow-2xs">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0] flex items-center gap-2">
                    <span>CampusNLP Semantic Engine</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#EEF4F1] dark:bg-emerald-500/10 text-[#008F63] dark:text-emerald-400 border border-[#DDE8E3] dark:border-emerald-500/20">
                      Live Simulation
                    </span>
                  </h3>
                  <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">Contextual classification & urgency quantification</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#008F63] dark:text-[#71844A] bg-[#F7F9F8] dark:bg-[#07121A] px-3 py-1.5 rounded-lg border border-[#DDE8E3] dark:border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#008F63] dark:bg-emerald-400 animate-ping" />
                <span>Model Ingestion Active</span>
              </div>
            </div>

            {/* Split Grid: Raw Input vs AI Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              
              {/* Left Column: Complaint Input Simulation */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#008F63] dark:text-[#71844A]" />
                      Sample Student Grievance
                    </span>
                    <span className="text-[11px] text-[#6B7C83] dark:text-[#9FB1BC]/60 font-mono">Input: Text Stream</span>
                  </div>

                  {/* Complaint card */}
                  <div className="p-5 rounded-2xl bg-[#F7F9F8] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-white/10 text-[#071A2B] dark:text-[#F5F5F0] relative group">
                    <div className="absolute -top-2 left-4 px-2 py-0.5 bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#315C3A]/60 rounded text-[10px] font-mono text-[#008F63] dark:text-[#D4A84F] shadow-2xs">
                      Raw Prompt
                    </div>
                    <p className="text-base sm:text-lg font-medium leading-relaxed italic mt-1 text-[#071A2B] dark:text-[#F5F5F0]">
                      "{aiDemoData.complaintText}"
                    </p>
                    <div className="mt-4 pt-3 border-t border-[#DCE5E2] dark:border-white/5 flex items-center justify-between text-xs text-[#60717A] dark:text-[#9FB1BC]">
                      <span>Source: Resident Student</span>
                      <span>Submitted: 2 mins ago</span>
                    </div>
                  </div>
                </div>

                {/* Detected Keywords Section */}
                <div>
                  <span className="text-xs font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider block mb-2.5">
                    Detected Keywords & Entities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aiDemoData.analysis.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#EEF4F1] dark:bg-[#315C3A]/20 border border-[#DDE8E3] dark:border-[#315C3A]/50 text-[#071A2B] dark:text-[#F5F5F0] hover:border-[#008F63] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#D4A84F]" />
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Model Note */}
                <div className="p-3.5 rounded-xl bg-[#F7F9F8] dark:bg-[#07121A]/80 border border-[#DDE8E3] dark:border-white/5 flex items-start gap-2.5">
                  <Workflow className="w-4 h-4 text-[#008F63] dark:text-[#71844A] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] leading-relaxed">
                    Zero-shot classification cross-checks hostel occupancy records, recurring campus outages, and health impact scores.
                  </p>
                </div>
              </div>

              {/* Right Column: AI Analysis Output Results */}
              <div className="lg:col-span-7 bg-[#F7F9F8] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#315C3A]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#DCE5E2] dark:border-white/10 mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#008F63] dark:text-[#D4A84F] flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Inference Diagnostics
                    </span>
                    <span className="text-xs font-mono text-[#60717A] dark:text-[#71844A]">Latency: 142ms</span>
                  </div>

                  {/* Category & SubCategory */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/5 shadow-2xs">
                      <span className="text-[11px] font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider block mb-1">
                        Assigned Category
                      </span>
                      <span className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0] flex items-center gap-2">
                        {aiDemoData.analysis.category}
                      </span>
                      <span className="text-xs text-[#008F63] dark:text-[#71844A] mt-0.5 block font-medium">
                        Sub: {aiDemoData.analysis.subCategory}
                      </span>
                    </div>

                    {/* Priority Block with Glowing High Badge */}
                    <div className="p-4 rounded-xl bg-[#FFF1F1] dark:bg-[#0D1B22] border border-[#FFD5D5] dark:border-red-500/30 relative overflow-hidden shadow-2xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-[#D94A4A] dark:text-[#9FB1BC] uppercase tracking-wider">
                          Priority Level
                        </span>
                        <Flame className="w-4 h-4 text-[#D94A4A] dark:text-red-400" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#D94A4A] dark:text-red-400 tracking-wide">
                          {aiDemoData.analysis.priority}
                        </span>
                        <span className="text-xs font-bold text-[#D94A4A] dark:text-red-400/80 uppercase px-2 py-0.5 rounded bg-white dark:bg-red-950/50 border border-[#FFD5D5] dark:border-red-800/40">
                          Urgent Tier
                        </span>
                      </div>
                      <span className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-0.5 block">
                        Impact: Multiple student residential units
                      </span>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/5 mb-6 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#60717A] dark:text-[#9FB1BC] uppercase tracking-wider flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-[#008F63] dark:text-[#D4A84F]" />
                        Model Confidence
                      </span>
                      <span className="text-lg font-extrabold text-[#008F63] dark:text-[#D4A84F] font-mono">
                        {aiDemoData.analysis.confidence}
                      </span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-[#EEF4F1] dark:bg-[#07121A] h-2.5 rounded-full overflow-hidden border border-[#DDE8E3] dark:border-white/10">
                      <div
                        className="bg-gradient-to-r from-[#008F63] via-[#00A875] to-[#D4A84F] h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '91%' }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#6B7C83] dark:text-[#9FB1BC]/60 font-mono mt-1.5">
                      <span>Threshold: 75%</span>
                      <span>High Certainty Verified</span>
                    </div>
                  </div>

                  {/* Recommended Routing Dispatch */}
                  <div className="p-4 rounded-xl bg-[#EEF4F1] dark:bg-[#315C3A]/15 border border-[#DDE8E3] dark:border-[#315C3A]/50 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#008F63] dark:text-[#71844A] uppercase tracking-wider block">
                        Auto-Routing Recommendation
                      </span>
                      <span className="text-sm font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                        {aiDemoData.analysis.suggestedRouting}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] block uppercase font-medium">Target SLA</span>
                      <span className="text-xs font-bold text-[#008F63] dark:text-[#D4A84F]">{aiDemoData.analysis.slaTarget}</span>
                    </div>
                  </div>
                </div>

                {/* Mandatory Disclaimer */}
                <div className="mt-6 pt-4 border-t border-[#DCE5E2] dark:border-white/10 flex items-center gap-2 text-xs text-[#6B7C83] dark:text-[#9FB1BC]/70">
                  <Info className="w-4 h-4 text-[#008F63] dark:text-[#D4A84F] shrink-0" />
                  <span>
                    Note: This is a frontend architectural demonstration illustrating prospective NLP extraction and prioritization flows.
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
