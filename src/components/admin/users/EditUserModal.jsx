import React, { useState } from 'react';
import { X, Edit2, Check } from 'lucide-react';
import { ROLES, DEPARTMENTS_LIST, STATUSES, YEARS } from '../../../data/userManagementMockData';

export default function EditUserModal({ isOpen, onClose, user, onSaveUser }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [role, setRole] = useState(user?.role || 'Student');
  const [department, setDepartment] = useState(user?.department || 'Maintenance');
  const [status, setStatus] = useState(user?.status || 'Active');
  const [course, setCourse] = useState(user?.course || 'B.Tech');
  const [branch, setBranch] = useState(user?.branch || '');
  const [year, setYear] = useState(user?.year || '1st Year');
  const [designation, setDesignation] = useState(user?.designation || '');

  if (!isOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      phone,
      role,
      department: role === 'Administrator' ? 'Administration' : department,
      status,
      course: role === 'Student' ? course : null,
      branch: role === 'Student' ? branch : null,
      year: role === 'Student' ? year : null,
      designation: role === 'Department Staff' ? designation : user.designation
    };
    onSaveUser(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#315C3A]/30 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
              <Edit2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">Edit User Information</h2>
              <p className="text-[11px] text-[#9FB1BC]">{user.code || user.id} • {user.name}</p>
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
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Account Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-2.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              >
                {DEPARTMENTS_LIST.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Fields */}
          {role === 'Student' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#0D1B22] rounded-xl border border-[#1A2E3B]">
              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2 py-1.5 text-xs text-[#F5F5F0]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2 py-1.5 text-xs text-[#F5F5F0]"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">Branch</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2 py-1.5 text-xs text-[#F5F5F0]"
                />
              </div>
            </div>
          )}

          {/* Staff Fields */}
          {role === 'Department Staff' && (
            <div className="p-3 bg-[#0D1B22] rounded-xl border border-[#1A2E3B]">
              <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0]"
              />
            </div>
          )}

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
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
