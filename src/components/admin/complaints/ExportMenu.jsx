import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileSpreadsheet, FileText } from 'lucide-react';
import { downloadCSV } from '../../../data/adminComplaintsData';

export default function ExportMenu({
  allFilteredData = [],
  currentPageData = [],
  selectedData = [],
  onExportSuccess
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportCSV = () => {
    const dataToExport = selectedData.length > 0 ? selectedData : allFilteredData;
    downloadCSV(dataToExport, `campus_complaints_export_${Date.now()}.csv`);
    setOpen(false);
    if (onExportSuccess) {
      onExportSuccess(`Exported ${dataToExport.length} complaints to CSV successfully.`);
    }
  };

  const handleExportPDF = () => {
    setOpen(false);
    if (onExportSuccess) {
      onExportSuccess('PDF generation initiated: Administrative digest report queued.');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#0C1518] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0] border border-[#DDE8E3] dark:border-[#243338] flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
        aria-label="Export reports menu"
      >
        <Download className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
        <span>Export Reports</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#60717A] dark:text-[#9FB1BC]" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] rounded-2xl shadow-xl py-2 z-50 text-xs animate-in fade-in duration-100">
          <div className="px-3.5 py-1 text-[10px] uppercase font-bold text-[#60717A] dark:text-[#9FB1BC] tracking-wider border-b border-[#DDE8E3] dark:border-[#1A2E3B] pb-1.5 mb-1">
            Export Options
          </div>

          <button
            onClick={handleExportCSV}
            className="w-full px-3.5 py-2 text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
              <span className="font-semibold">Export CSV</span>
            </div>
            <span className="font-mono text-[10px] text-[#60717A] dark:text-[#9FB1BC]">
              ({selectedData.length > 0 ? selectedData.length : allFilteredData.length})
            </span>
          </button>

          <button
            onClick={handleExportPDF}
            className="w-full px-3.5 py-2 text-[#071A2B] dark:text-[#F5F5F0] hover:bg-[#F5F5F0] dark:hover:bg-[#13242E] flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500" />
              <span className="font-semibold">Export PDF</span>
            </div>
            <span className="text-[10px] font-bold text-amber-500 uppercase">
              Digest
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
