import React, { useState } from 'react';
import { X, Building2, Check } from 'lucide-react';
import { ALL_COMPLAINT_CATEGORIES } from '../../../data/userManagementMockData';

export default function AddDepartmentModal({ isOpen, onClose, onAddDepartment }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [head, setHead] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [selectedCategories, setSelectedCategories] = useState(['Infrastructure', 'Maintenance']);

  if (!isOpen) return null;

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDept = {
      id: `DEPT-${Math.floor(100 + Math.random() * 900)}`,
      name,
      code: code || `DEPT-${Math.floor(100 + Math.random() * 900)}`,
      description,
      head: head || 'Appointed Head',
      staffCount: 1,
      openComplaints: 0,
      resolvedThisMonth: 0,
      resolvedComplaints: 0,
      resolutionRate: 100,
      averageResolutionTime: '12.0 hrs',
      status,
      categories: selectedCategories,
      staff: [{ name: head || 'Unit Officer', id: `EMP-${Math.floor(10 + Math.random() * 90)}`, role: 'Department Head', status: 'Active' }]
    };
    onAddDepartment(newDept);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#315C3A]/30 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">Add New Department</h2>
              <p className="text-[11px] text-[#9FB1BC]">Establish a functional resolution division</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs scrollbar-thin">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Department Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sports & Recreation"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Department Code / ID
              </label>
              <input
                type="text"
                placeholder="DEPT-011"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Department Head
              </label>
              <input
                type="text"
                placeholder="Prof. / Dr. Lead"
                value={head}
                onChange={(e) => setHead(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Initial Operational Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              >
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
              Operational Scope & Description
            </label>
            <textarea
              rows={2}
              placeholder="Responsibilities, physical premises, and jurisdiction..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg p-3 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F] resize-none"
            />
          </div>

          {/* Categories Handled Checkboxes */}
          <div>
            <label className="block text-[11px] font-semibold text-[#F5F5F0] mb-2">
              Assigned Complaint Categories
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-[#0D1B22] rounded-xl border border-[#1A2E3B]">
              {ALL_COMPLAINT_CATEGORIES.map((cat) => {
                const checked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-xs text-[#9FB1BC] hover:text-[#F5F5F0] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-[#1A2E3B] text-[#315C3A] focus:ring-[#D4A84F] bg-[#07121A]"
                    />
                    <span className="truncate">{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#1A2E3B]">
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
              <span>Create Department</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
