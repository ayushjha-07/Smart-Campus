import React from 'react';
import { Download, FileSpreadsheet, Sparkles, RefreshCw } from 'lucide-react';

export default function AnalyticsHeader({ onOpenReportModal, onExportCSV, onRefresh, isRefreshing }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1A2E3B]/80">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#315C3A]/25 text-[#D4A84F] border border-[#315C3A]/60">
            <Sparkles className="w-3 h-3 text-[#D4A84F]" />
            Administrative Intelligence
          </span>
          <span className="text-[11px] text-[#71844A] bg-[#13242E] px-2 py-0.5 rounded border border-[#1A2E3B]">
            Frontend Demo Data
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] tracking-tight flex items-center gap-2">
          Analytics & Insights
        </h1>
        <p className="text-xs sm:text-sm text-[#9FB1BC] mt-0.5">
          Understand complaint trends, department performance, and campus issues.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D1B22] border border-[#1A2E3B] text-xs font-medium text-[#9FB1BC] hover:text-[#F5F5F0] hover:border-[#315C3A] transition-all disabled:opacity-50"
          title="Refresh analytics data"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#D4A84F] ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>

        <button
          onClick={onExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D1B22] border border-[#1A2E3B] text-xs font-medium text-[#F5F5F0] hover:border-[#D4A84F]/60 hover:text-[#D4A84F] transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-[#71844A]" />
          <span>Export CSV</span>
        </button>

        <button
          onClick={onOpenReportModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#315C3A] to-[#25462c] border border-[#D4A84F]/50 text-xs font-semibold text-[#F5F5F0] hover:border-[#D4A84F] hover:shadow-[0_0_15px_-3px_rgba(212,168,79,0.3)] transition-all"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4A84F]" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
}
