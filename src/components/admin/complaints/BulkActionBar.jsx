import React from 'react';
import {
  Building2,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Download,
  X,
  CheckSquare
} from 'lucide-react';

export default function BulkActionBar({
  selectedCount,
  onBulkAssign,
  onBulkPriority,
  onBulkStatus,
  onBulkResolve,
  onExportSelected,
  onClearSelection
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky bottom-4 z-40 animate-in slide-in-from-bottom-4 fade-in duration-200">
      <div className="max-w-4xl mx-auto px-4 py-3 rounded-xl bg-[#0D1B22]/95 backdrop-blur-md border border-[#D4A84F]/50 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left Count */}
        <div className="flex items-center gap-2 text-[#F5F5F0]">
          <div className="w-6 h-6 rounded-md bg-[#D4A84F]/20 border border-[#D4A84F]/50 text-[#D4A84F] flex items-center justify-center">
            <CheckSquare className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-sm">
            {selectedCount} {selectedCount === 1 ? 'complaint' : 'complaints'} selected
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onBulkAssign}
            className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-[#D4A84F]" />
            <span>Assign Dept</span>
          </button>

          <button
            onClick={onBulkPriority}
            className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Change Priority</span>
          </button>

          <button
            onClick={onBulkStatus}
            className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#F5F5F0] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Change Status</span>
          </button>

          <button
            onClick={onBulkResolve}
            className="px-3 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-[#F5F5F0] font-semibold border border-[#315C3A] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#A7C481]" />
            <span>Mark Resolved</span>
          </button>

          <button
            onClick={onExportSelected}
            className="px-3 py-1.5 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#D4A84F] border border-[#1A2E3B] flex items-center gap-1.5 transition-colors"
            title="Export only selected complaints"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <div className="h-5 w-px bg-[#1A2E3B] mx-1" />

          <button
            onClick={onClearSelection}
            className="p-1.5 rounded-lg text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] transition-colors"
            aria-label="Deselect all complaints"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
