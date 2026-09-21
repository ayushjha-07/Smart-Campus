import React from 'react';
import { FileSpreadsheet, Download, FileText } from 'lucide-react';

export default function ReportGenerator({ onOpenModal, onExportCSV }) {
  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4A84F]" />
          <h2 className="text-base font-bold text-[#F5F5F0]">
            Generate Report
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#315C3A]/25 text-[#D4A84F] border border-[#315C3A]/60 font-semibold">
            Audit Export
          </span>
        </div>
        <p className="text-xs text-[#9FB1BC] max-w-xl">
          Create a downloadable analytics report based on the selected filters.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
        <button
          type="button"
          onClick={onExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#07121A] hover:bg-[#13242E] text-xs font-medium text-[#F5F5F0] border border-[#1A2E3B] hover:border-[#315C3A] transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-[#71844A]" />
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-xs font-semibold text-[#F5F5F0] border border-[#D4A84F]/40 hover:border-[#D4A84F] shadow-sm transition-all"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4A84F]" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
}
