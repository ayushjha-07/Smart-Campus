import React from 'react';
import { FileSearch, RotateCcw } from 'lucide-react';
import ComplaintRow from './ComplaintRow';
import ComplaintMobileCard from './ComplaintMobileCard';

export default function ComplaintTable({
  complaints = [],
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onViewDetails,
  onAssignDept,
  onChangePriority,
  onChangeStatus,
  onAddNote,
  onMarkResolved,
  onResetFilters,
  isAllSelected
}) {
  if (complaints.length === 0) {
    return (
      <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-12 text-center shadow-card-elevated">
        <div className="w-14 h-14 rounded-2xl bg-[#13242E] border border-[#1A2E3B] flex items-center justify-center text-[#9FB1BC] mx-auto mb-3">
          <FileSearch className="w-7 h-7 text-[#D4A84F]" />
        </div>
        <h3 className="text-base font-bold text-[#F5F5F0]">No complaints found</h3>
        <p className="text-xs text-[#9FB1BC] mt-1 max-w-sm mx-auto">
          No complaints match your active filters or search parameters. Try adjusting your criteria.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-xs font-semibold text-[#F5F5F0] inline-flex items-center gap-2 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] shadow-card-elevated overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#1A2E3B] bg-[#07121A]/80 text-[#9FB1BC] uppercase font-semibold text-[10px] tracking-wider">
              <th className="py-3 px-3.5 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 rounded border-[#1A2E3B] bg-[#07121A] text-[#D4A84F] focus:ring-0 cursor-pointer accent-[#315C3A]"
                  aria-label="Select all complaints on current page"
                />
              </th>
              <th className="py-3 px-3">Complaint</th>
              <th className="py-3 px-3">Student</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Department</th>
              <th className="py-3 px-2.5 text-center">Priority</th>
              <th className="py-3 px-2.5 text-center">Status</th>
              <th className="py-3 px-3">Submitted</th>
              <th className="py-3 px-3">Updated</th>
              <th className="py-3 px-3 text-right">Actions</th>
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
                onAssignDept={onAssignDept}
                onChangePriority={onChangePriority}
                onChangeStatus={onChangeStatus}
                onAddNote={onAddNote}
                onMarkResolved={onMarkResolved}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden p-3 space-y-3">
        {complaints.map((item) => (
          <ComplaintMobileCard
            key={item.id}
            complaint={item}
            isSelected={selectedIds.includes(item.id)}
            onToggleSelect={onToggleSelect}
            onViewDetails={onViewDetails}
            onAssignDept={onAssignDept}
            onChangePriority={onChangePriority}
            onChangeStatus={onChangeStatus}
            onAddNote={onAddNote}
            onMarkResolved={onMarkResolved}
          />
        ))}
      </div>
    </div>
  );
}
