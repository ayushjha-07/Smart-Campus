import React from 'react';
import {
  UserCheck,
  RefreshCw,
  Edit,
  Download,
  Trash2,
  X,
  CheckSquare
} from 'lucide-react';

export default function BulkActions({
  selectedCount = 0,
  onBulkAssign,
  onBulkStatus,
  onBulkPriority,
  onExportSelected,
  onBulkDelete,
  onClearSelection
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky bottom-4 z-40 animate-in slide-in-from-bottom-3 fade-in duration-200">
      <div className="max-w-4xl mx-auto px-4 py-3 rounded-2xl bg-white/95 dark:bg-[#0C1518]/95 backdrop-blur-md border border-[#008F63]/40 dark:border-[#00A875]/40 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left Count */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#008F63]/15 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875] flex items-center justify-center font-bold">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-[#071A2B] dark:text-[#F5F5F0]">
              {selectedCount} {selectedCount === 1 ? 'complaint' : 'complaints'} selected
            </span>
          </div>
        </div>

        {/* Action Buttons: Assign, Change Status, Change Priority, Export, Delete */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onBulkAssign}
            className="px-3 py-1.5 rounded-lg bg-[#008F63]/10 hover:bg-[#008F63]/20 dark:bg-[#00A875]/20 dark:hover:bg-[#00A875]/30 text-[#008F63] dark:text-[#00A875] font-bold flex items-center gap-1.5 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Assign</span>
          </button>

          <button
            onClick={onBulkStatus}
            className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Status</span>
          </button>

          <button
            onClick={onBulkPriority}
            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Change Priority</span>
          </button>

          <button
            onClick={onExportSelected}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#071A2B] dark:text-[#F5F5F0] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={onBulkDelete}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>

          <div className="h-5 w-px bg-[#DDE8E3] dark:border-[#243338] mx-1" />

          <button
            onClick={onClearSelection}
            className="p-1.5 rounded-lg text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] transition-colors"
            title="Deselect all"
            aria-label="Deselect all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
