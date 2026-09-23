import React from 'react';
import { FileSearch, RotateCcw } from 'lucide-react';
import ComplaintRow from './ComplaintRow';
import ComplaintCard from './ComplaintCard';

export default function ComplaintTable({
  complaints = [],
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onViewDetails,
  onAssign,
  onChangeStatus,
  onChangePriority,
  onAddRemark,
  onDelete,
  onResetFilters,
  isAllSelected
}) {
  if (complaints.length === 0) {
    return (
      <div className="rounded-xl p-12 text-center bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#008F63]/10 dark:bg-[#00A875]/20 flex items-center justify-center text-[#008F63] dark:text-[#00A875] mx-auto mb-3">
          <FileSearch className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0]">
          No matching complaints found
        </h3>
        <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-1 max-w-sm mx-auto">
          No complaints match your active filters or search query. Try clearing filters to see all tickets.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 px-4 py-2 rounded-lg bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-xs font-bold text-white inline-flex items-center gap-2 transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs overflow-hidden">
      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#DDE8E3] dark:border-[#243338] bg-[#F5F5F0]/60 dark:bg-[#07121A]/80 text-[#60717A] dark:text-[#9FB1BC] uppercase font-bold text-[10px] tracking-wider">
              <th className="py-3 px-2 w-8">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 rounded border-[#DDE8E3] dark:border-[#243338] bg-white dark:bg-[#07121A] text-[#008F63] dark:text-[#00A875] focus:ring-0 cursor-pointer accent-[#008F63]"
                  aria-label="Select all complaints on current page"
                />
              </th>
              <th className="py-3 px-2 whitespace-nowrap">Complaint ID</th>
              <th className="py-3 px-2">Complaint</th>
              <th className="py-3 px-2 whitespace-nowrap">Student</th>
              <th className="py-3 px-1.5 whitespace-nowrap">Category</th>
              <th className="py-3 px-1.5 whitespace-nowrap">Department</th>
              <th className="py-3 px-1.5 whitespace-nowrap">Priority</th>
              <th className="py-3 px-1.5 whitespace-nowrap">Status</th>
              <th className="py-3 px-1.5 whitespace-nowrap">Submitted</th>
              <th className="py-3 px-1.5 whitespace-nowrap">Assigned To</th>
              <th className="py-3 px-2 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((item) => (
              <ComplaintRow
                key={item.id}
                complaint={item}
                isSelected={selectedIds.includes(item.id)}
                onToggleSelect={onToggleSelect}
                onViewDetails={onViewDetails}
                onAssign={onAssign}
                onChangeStatus={onChangeStatus}
                onChangePriority={onChangePriority}
                onAddRemark={onAddRemark}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden p-3 space-y-3">
        {complaints.map((item) => (
          <ComplaintCard
            key={item.id}
            complaint={item}
            isSelected={selectedIds.includes(item.id)}
            onToggleSelect={onToggleSelect}
            onViewDetails={onViewDetails}
            onAssign={onAssign}
            onChangeStatus={onChangeStatus}
            onChangePriority={onChangePriority}
            onAddRemark={onAddRemark}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
