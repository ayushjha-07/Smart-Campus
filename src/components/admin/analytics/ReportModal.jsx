import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  Building2,
  Tag,
  AlertCircle
} from 'lucide-react';
import { FILTER_OPTIONS, exportAnalyticsCSV } from '../../../data/analyticsMockData';

export default function ReportModal({ isOpen, onClose, defaultFilters = {}, onReportSuccess }) {
  const [reportName, setReportName] = useState('Smart-Campus-Analytics-Audit-Sep2026');
  const [dateRange, setDateRange] = useState(defaultFilters.dateRange || 'Last 7 Days');
  const [department, setDepartment] = useState(defaultFilters.department || 'All Departments');
  const [category, setCategory] = useState(defaultFilters.category || 'All Categories');
  const [priority, setPriority] = useState(defaultFilters.priority || 'All');
  const [format, setFormat] = useState('csv'); // 'pdf' | 'csv'
  const [pdfReadyNotice, setPdfReadyNotice] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();

    if (format === 'csv') {
      exportAnalyticsCSV({ dateRange, department, category, priority });
      if (onReportSuccess) {
        onReportSuccess(`CSV report "${reportName}.csv" downloaded successfully.`);
      }
      onClose();
    } else {
      // PDF simulation mode
      setPdfReadyNotice(true);
    }
  };

  const handleConfirmClose = () => {
    setPdfReadyNotice(false);
    if (onReportSuccess) {
      onReportSuccess(`PDF simulation recorded: "${reportName}". Ready for backend integration.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#315C3A]/30 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">
                Generate Analytics Report
              </h2>
              <p className="text-xs text-[#9FB1BC]">
                Configure parameters and file format for export
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {pdfReadyNotice ? (
          <div className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#315C3A]/25 border border-[#315C3A] text-[#10B981] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#F5F5F0]">
              PDF Template Queued
            </h3>
            <div className="p-3.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl text-xs text-[#9FB1BC] text-left space-y-1.5">
              <p className="text-[#D4A84F] font-semibold">
                Report generation is ready for backend integration.
              </p>
              <p className="text-[11px] leading-relaxed">
                Frontend preview parameters for <strong>{reportName}</strong> (Scope: {department}, {category}) are ready to link with the campus PDF rendering worker.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  exportAnalyticsCSV({ dateRange, department, category, priority });
                  handleConfirmClose();
                }}
                className="px-4 py-2 rounded-lg bg-[#0D1B22] hover:bg-[#13242E] text-xs font-medium text-[#F5F5F0] border border-[#1A2E3B] transition-colors"
              >
                Download CSV Copy Instead
              </button>
              <button
                type="button"
                onClick={handleConfirmClose}
                className="px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-xs font-semibold text-[#F5F5F0] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="p-6 space-y-4 text-xs">
            {/* Report Name */}
            <div>
              <label className="block text-[11px] font-semibold text-[#F5F5F0] mb-1">
                Report Title / Identifier
              </label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                required
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            {/* Grid Filters */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#71844A]" /> Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                >
                  {FILTER_OPTIONS.dateRanges.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#315C3A]" /> Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                >
                  {FILTER_OPTIONS.departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#D4A84F]" /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                >
                  {FILTER_OPTIONS.categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-400" /> Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                >
                  {FILTER_OPTIONS.priorities.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Export Format Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-[#F5F5F0] mb-2">
                Export File Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('csv')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                    format === 'csv'
                      ? 'bg-[#315C3A]/25 border-[#D4A84F] text-[#F5F5F0] shadow-sm'
                      : 'bg-[#0D1B22] border-[#1A2E3B] text-[#9FB1BC] hover:border-[#315C3A]'
                  }`}
                >
                  <FileSpreadsheet className={`w-5 h-5 ${format === 'csv' ? 'text-[#D4A84F]' : 'text-[#71844A]'}`} />
                  <div>
                    <span className="font-bold block text-xs">CSV Spreadsheet</span>
                    <span className="text-[10px] text-[#9FB1BC]">Instant client-side download</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                    format === 'pdf'
                      ? 'bg-[#315C3A]/25 border-[#D4A84F] text-[#F5F5F0] shadow-sm'
                      : 'bg-[#0D1B22] border-[#1A2E3B] text-[#9FB1BC] hover:border-[#315C3A]'
                  }`}
                >
                  <FileText className={`w-5 h-5 ${format === 'pdf' ? 'text-[#D4A84F]' : 'text-[#71844A]'}`} />
                  <div>
                    <span className="font-bold block text-xs">PDF Document</span>
                    <span className="text-[10px] text-[#9FB1BC]">Standard administrative audit</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#1A2E3B]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#0D1B22] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5 text-[#D4A84F]" />
                <span>Generate</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
