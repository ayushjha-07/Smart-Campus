import React from 'react';
import { CheckCircle2, Ban, Building2, Download, X } from 'lucide-react';

export default function BulkUserActions({
  selectedCount,
  onActivateSelected,
  onSuspendSelected,
  onChangeDeptSelected,
  onExportSelected,
  onClearSelection
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-[#0D1B22]/95 border border-[#315C3A] rounded-2xl shadow-2xl p-3 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 px-2">
        <span className="w-2 h-2 rounded-full bg-[#D4A84F] animate-pulse" />
        <span className="text-xs font-bold text-[#F5F5F0]">
          {selectedCount} {selectedCount === 1 ? 'user' : 'users'} selected
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={onActivateSelected}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 transition-colors shadow-sm"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A84F]" />
          <span>Activate</span>
        </button>

        <button
          type="button"
          onClick={onSuspendSelected}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-colors"
        >
          <Ban className="w-3.5 h-3.5" />
          <span>Suspend</span>
        </button>

        <button
          type="button"
          onClick={onChangeDeptSelected}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07121A] hover:bg-[#13242E] text-[#F5F5F0] border border-[#1A2E3B] text-xs font-medium transition-colors"
        >
          <Building2 className="w-3.5 h-3.5 text-[#71844A]" />
          <span>Change Dept</span>
        </button>

        <button
          type="button"
          onClick={onExportSelected}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#07121A] hover:bg-[#13242E] text-[#F5F5F0] border border-[#1A2E3B] text-xs font-medium transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#D4A84F]" />
          <span>Export</span>
        </button>

        <button
          type="button"
          onClick={onClearSelection}
          className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors ml-1"
          title="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
