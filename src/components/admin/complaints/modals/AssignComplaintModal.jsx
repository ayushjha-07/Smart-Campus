import React, { useState, useEffect } from 'react';
import { X, Building2, UserCheck, Check, ShieldCheck } from 'lucide-react';
import {
  COMPLAINT_DEPARTMENTS,
  COMPLAINT_PRIORITIES,
  DEPARTMENT_STAFF_MAP
} from '../../../../data/adminComplaintsData';

export default function AssignComplaintModal({
  isOpen,
  onClose,
  complaint,
  selectedCount = 1,
  isBulk = false,
  onAssign
}) {
  const [department, setDepartment] = useState('Hostel');
  const [staff, setStaff] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [adminNote, setAdminNote] = useState('');

  // Synchronize state when complaint changes
  useEffect(() => {
    if (complaint) {
      const dept = complaint.department || 'Hostel';
      setDepartment(dept);
      const staffList = DEPARTMENT_STAFF_MAP[dept] || [];
      setStaff(complaint.assignedTo && complaint.assignedTo !== 'Unassigned' ? complaint.assignedTo : staffList[0] || '');
      setPriority(complaint.priority || 'Medium');
      setAdminNote('');
    } else {
      setDepartment('Hostel');
      setStaff(DEPARTMENT_STAFF_MAP['Hostel'][0] || '');
      setPriority('Medium');
      setAdminNote('');
    }
  }, [complaint, isOpen]);

  // When department changes, update staff options
  const handleDeptChange = (newDept) => {
    setDepartment(newDept);
    const staffList = DEPARTMENT_STAFF_MAP[newDept] || [];
    setStaff(staffList[0] || 'Unassigned');
  };

  if (!isOpen) return null;

  const availableStaff = DEPARTMENT_STAFF_MAP[department] || ['Unassigned'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({
      department,
      staff,
      priority,
      adminNote
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE8E3] dark:border-[#243338]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                {isBulk ? `Assign ${selectedCount} Complaints` : 'Assign Complaint'}
              </h3>
              <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
                Route ticket & assign operational staff
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#13242E] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {!isBulk && complaint && (
            <div className="p-3 rounded-xl bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#008F63] dark:text-[#D4A84F] font-bold">
                  {complaint.id}
                </span>
                <span className="text-[11px] font-semibold text-[#071A2B] dark:text-[#F5F5F0]">
                  {complaint.student}
                </span>
              </div>
              <p className="font-medium text-[#60717A] dark:text-[#9FB1BC] truncate text-xs">
                {complaint.title}
              </p>
            </div>
          )}

          {/* Department */}
          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl px-3 py-2 text-xs font-semibold text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none cursor-pointer"
            >
              {COMPLAINT_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Assign Staff */}
          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Assign Staff
            </label>
            <select
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
              className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl px-3 py-2 text-xs font-semibold text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none cursor-pointer"
            >
              {availableStaff.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Priority
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Low', 'Medium', 'High', 'Critical'].map((pr) => (
                <button
                  key={pr}
                  type="button"
                  onClick={() => setPriority(pr)}
                  className={`py-1.5 px-2 rounded-lg font-bold text-center border transition-all text-xs ${
                    priority.toUpperCase() === pr.toUpperCase()
                      ? 'bg-[#008F63] text-white border-[#008F63] dark:bg-[#00A875] dark:border-[#00A875]'
                      : 'bg-[#F5F5F0]/60 dark:bg-[#07121A] text-[#60717A] dark:text-[#9FB1BC] border-[#DDE8E3] dark:border-[#243338] hover:border-[#008F63]'
                  }`}
                >
                  {pr}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Note */}
          <div>
            <label className="block font-bold text-[#071A2B] dark:text-[#F5F5F0] mb-1">
              Admin Note <span className="text-[10px] text-[#60717A] dark:text-[#9FB1BC] font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Instructions for the assigned staff member..."
              className="w-full bg-[#F5F5F0]/60 dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#243338] focus:border-[#008F63] dark:focus:border-[#00A875] rounded-xl p-2.5 text-xs text-[#071A2B] dark:text-[#F5F5F0] focus:outline-none resize-none placeholder-[#60717A]/60 dark:placeholder-[#9FB1BC]/60"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#DDE8E3] dark:border-[#243338] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#13242E] dark:hover:bg-[#1A2E3B] text-[#60717A] hover:text-[#071A2B] dark:text-[#9FB1BC] dark:hover:text-[#F5F5F0] font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#008F63] hover:bg-[#007A54] dark:bg-[#00A875] dark:hover:bg-[#008F63] text-white font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Assign Complaint</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
