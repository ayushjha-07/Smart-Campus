import React, { useState } from 'react';
import { X, Building2, Check } from 'lucide-react';
import { DEPARTMENTS_LIST } from '../../../data/userManagementMockData';

export default function ChangeDepartmentModal({ isOpen, onClose, user, onUpdateDepartment }) {
  const [newDepartment, setNewDepartment] = useState(user?.department || 'Maintenance');

  if (!isOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateDepartment(user.id, newDepartment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#315C3A]/30 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">Assign Department</h2>
              <p className="text-[11px] text-[#9FB1BC]">{user.name} ({user.code || user.id})</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl flex items-center justify-between">
            <span className="text-[#9FB1BC]">Current Assignment:</span>
            <span className="font-bold text-[#D4A84F]">{user.department || 'Unassigned'}</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#F5F5F0] mb-1.5">
              Select Target Department
            </label>
            <select
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            >
              {DEPARTMENTS_LIST.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <p className="text-[11px] text-[#9FB1BC] leading-relaxed">
            Reassigning this user updates their primary functional division and adjusts automated complaint triage routing.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1A2E3B]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Assign Department</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
