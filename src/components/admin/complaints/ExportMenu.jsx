import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileSpreadsheet, Check } from 'lucide-react';
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

  const handleExportAll = () => {
    downloadCSV(allFilteredData, `campus_complaints_all_${Date.now()}.csv`);
    setOpen(false);
    if (onExportSuccess) onExportSuccess(`Exported ${allFilteredData.length} records.`);
  };

  const handleExportPage = () => {
    downloadCSV(currentPageData, `campus_complaints_page_${Date.now()}.csv`);
    setOpen(false);
    if (onExportSuccess) onExportSuccess(`Exported ${currentPageData.length} visible records.`);
  };

  const handleExportSelected = () => {
    downloadCSV(selectedData, `campus_complaints_selected_${Date.now()}.csv`);
    setOpen(false);
    if (onExportSuccess) onExportSuccess(`Exported ${selectedData.length} selected records.`);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-xs font-semibold text-[#F5F5F0] border border-[#1A2E3B] hover:border-[#315C3A] flex items-center gap-1.5 transition-colors"
        aria-label="Export complaints menu"
      >
        <Download className="w-3.5 h-3.5 text-[#D4A84F]" />
        <span>Export</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#9FB1BC]" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-56 bg-[#07121A] border border-[#1A2E3B] rounded-xl shadow-2xl py-1.5 z-50 text-xs animate-in fade-in duration-100">
          <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#71844A] tracking-wider border-b border-[#1A2E3B] pb-1.5 mb-1">
            Data Export
          </div>

          <button
            onClick={handleExportAll}
            className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Export All Filtered</span>
            </div>
            <span className="font-mono text-[10px] text-[#9FB1BC]">
              ({allFilteredData.length})
            </span>
          </button>

          <button
            onClick={handleExportPage}
            className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#71844A]" />
              <span>Export Current View</span>
            </div>
            <span className="font-mono text-[10px] text-[#9FB1BC]">
              ({currentPageData.length})
            </span>
          </button>

          {selectedData.length > 0 && (
            <button
              onClick={handleExportSelected}
              className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center justify-between text-left border-t border-[#1A2E3B] mt-1 pt-2"
            >
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#A7C481]" />
                <span className="text-[#A7C481] font-medium">Export Selected</span>
              </div>
              <span className="font-mono text-[10px] text-[#D4A84F]">
                ({selectedData.length})
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
