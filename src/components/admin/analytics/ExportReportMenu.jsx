import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Printer, ChevronDown, Check } from 'lucide-react';
import { downloadAnalyticsCSV } from '../../../data/analyticsData';

export default function ExportReportMenu({ filters, onShowToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportCSV = () => {
    downloadAnalyticsCSV(filters);
    setIsOpen(false);
    if (onShowToast) {
      onShowToast('Analytics summary exported as CSV successfully.', 'success');
    }
  };

  const handleExportPDF = () => {
    setIsOpen(false);
    if (onShowToast) {
      onShowToast('PDF report generation will be connected to the backend later.', 'info');
    }
  };

  const handlePrint = () => {
    setIsOpen(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white shadow-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#008F63]/40"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Export Report</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#A8B3B0] border-b border-[#DDE8E3]/60 dark:border-[#243338]/60">
            Export Analytics Format
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F7F9F8] dark:hover:bg-white/5 text-left transition-colors"
          >
            <Download className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
            <div className="flex-1">
              <div className="font-semibold">Export CSV</div>
              <div className="text-[11px] text-[#60717A] dark:text-[#A8B3B0]">Download tabular raw telemetry</div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleExportPDF}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F7F9F8] dark:hover:bg-white/5 text-left transition-colors"
          >
            <FileText className="w-4 h-4 text-[#D4A84F]" />
            <div className="flex-1">
              <div className="font-semibold">Export PDF</div>
              <div className="text-[11px] text-[#60717A] dark:text-[#A8B3B0]">Printable institutional executive brief</div>
            </div>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F7F9F8] dark:hover:bg-white/5 text-left transition-colors border-t border-[#DDE8E3]/60 dark:border-[#243338]/60"
          >
            <Printer className="w-4 h-4 text-[#71844A]" />
            <div className="flex-1">
              <div className="font-semibold">Print Report</div>
              <div className="text-[11px] text-[#60717A] dark:text-[#A8B3B0]">Native browser print dialogue</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
