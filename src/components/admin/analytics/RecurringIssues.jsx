import React from 'react';
import { RefreshCw, MapPin, AlertCircle, ArrowUpRight, Flame, ExternalLink } from 'lucide-react';
import { RECURRING_ISSUES_DATA, TOP_ISSUE_DATA } from '../../../data/analyticsMockData';

export default function RecurringIssues({ onViewRelatedComplaints }) {
  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#D4A84F]" />
            <h2 className="text-base sm:text-lg font-bold text-[#F5F5F0]">
              Recurring Issues
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Repeated incident patterns requiring root-cause preventive maintenance
          </p>
        </div>

        <span className="text-xs text-[#71844A] bg-[#07121A] px-2.5 py-1 rounded-lg border border-[#1A2E3B]">
          4 Active Cluster Patterns
        </span>
      </div>

      {/* Highlighted Top Issue Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#1A2E3B]/50 via-[#315C3A]/20 to-[#07121A] border border-[#D4A84F]/60 shadow-[0_0_20px_-5px_rgba(212,168,79,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-[#D4A84F]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A84F]/20 text-[#D4A84F] border border-[#D4A84F]/40">
              <Flame className="w-3 h-3 text-[#D4A84F]" />
              {TOP_ISSUE_DATA.badge}
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F0] flex items-center gap-2">
              {TOP_ISSUE_DATA.issue}
              <span className="text-sm font-semibold text-[#D4A84F] bg-[#07121A] px-2 py-0.5 rounded border border-[#1A2E3B]">
                {TOP_ISSUE_DATA.count} complaints
              </span>
            </h3>
            <p className="text-xs text-[#9FB1BC] max-w-xl">
              {TOP_ISSUE_DATA.observation}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => onViewRelatedComplaints && onViewRelatedComplaints('Water Supply')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/50 transition-all shadow-sm"
            >
              <span>View Water Supply Tickets</span>
              <ExternalLink className="w-3 h-3 text-[#D4A84F]" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 4 Recurring Issue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {RECURRING_ISSUES_DATA.map((issue) => (
          <div
            key={issue.id}
            className="bg-[#07121A] border border-[#1A2E3B] rounded-xl p-4 flex flex-col justify-between hover:border-[#315C3A] transition-all group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-semibold text-[#71844A] bg-[#13242E] px-2 py-0.5 rounded border border-[#1A2E3B]">
                  {issue.category}
                </span>
                <span className="text-[11px] font-bold text-[#D4A84F] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {issue.trend}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#F5F5F0] group-hover:text-[#D4A84F] transition-colors">
                {issue.title}
              </h4>

              <div className="my-2.5 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#F5F5F0]">
                  {issue.complaints}
                </span>
                <span className="text-xs text-[#9FB1BC]">complaints</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#9FB1BC] pb-3 border-b border-[#1A2E3B]/60">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A84F] shrink-0" />
                  <span className="truncate">Primary: <strong className="text-[#F5F5F0]">{issue.primaryLocation}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#71844A]">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{issue.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => onViewRelatedComplaints && onViewRelatedComplaints(issue.category)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#0D1B22] hover:bg-[#13242E] text-xs text-[#F5F5F0] border border-[#1A2E3B] hover:border-[#315C3A] transition-colors"
              >
                <span>View Related Complaints</span>
                <ExternalLink className="w-3 h-3 text-[#D4A84F]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
