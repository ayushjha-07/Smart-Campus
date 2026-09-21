import React, { useState } from 'react';
import { X, Building2, Check, ArrowRight } from 'lucide-react';
import { CAMPUS_DEPARTMENTS } from '../../../data/adminMockData';

export default function AssignDepartmentModal({ isOpen, onClose, complaint, onAssign }) {
  const [selectedDept, setSelectedDept] = useState(complaint?.department || 'Maintenance');

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(complaint.id, selectedDept);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0D1B22] border border-[#1A2E3B] rounded-xl shadow-2xl p-6 overflow-hidden">
        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#315C3A] via-[#D4A84F] to-[#71844A]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A2E3B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#315C3A]/20 border border-[#315C3A]/40 text-[#D4A84F]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F5F0]">Assign Department</h3>
              <p className="text-xs text-[#9FB1BC]">Route ticket to specialized unit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-[#07121A] border border-[#1A2E3B] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#D4A84F] font-bold">{complaint.id}</span>
              <span className="text-[11px] text-[#9FB1BC]">{complaint.student}</span>
            </div>
            <p className="font-medium text-[#F5F5F0] text-xs line-clamp-2">{complaint.title}</p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#9FB1BC]">
              <span>Current Department:</span>
              <span className="font-semibold text-[#F5F5F0] px-2 py-0.5 rounded bg-[#13242E] border border-[#1A2E3B]">
                {complaint.department}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#F5F5F0] mb-1.5">
              Select Destination Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-[#07121A] border border-[#1A2E3B] focus:border-[#D4A84F] rounded-lg px-3 py-2.5 text-xs text-[#F5F5F0] focus:outline-none"
            >
              {CAMPUS_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {selectedDept !== complaint.department && (
            <div className="p-2.5 rounded-lg bg-[#315C3A]/15 border border-[#315C3A]/30 flex items-center gap-2 text-[11px] text-[#A7C481]">
              <span>{complaint.department}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span className="font-bold text-[#F5F5F0]">{selectedDept}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#1A2E3B] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#13242E] hover:bg-[#1A2E3B] text-[#9FB1BC] hover:text-[#F5F5F0] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3D7349] text-[#F5F5F0] font-semibold border border-[#315C3A] shadow-glow-green flex items-center gap-1.5 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Assign Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
