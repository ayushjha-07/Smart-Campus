import React, { useState } from 'react';
import { X, UserPlus, GraduationCap, Briefcase, Shield, Check } from 'lucide-react';
import { DEPARTMENTS_LIST, YEARS } from '../../../data/userManagementMockData';

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [role, setRole] = useState('Student');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [course, setCourse] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('1st Year');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name,
      code: code || (role === 'Student' ? `SC-STU-2026-${Math.floor(100 + Math.random() * 900)}` : `EMP-${Math.floor(100 + Math.random() * 900)}`),
      role,
      department: role === 'Administrator' ? 'Administration' : department,
      email,
      phone,
      status: 'Active',
      lastActive: 'Just now',
      registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      course: role === 'Student' ? course : null,
      branch: role === 'Student' ? branch : null,
      year: role === 'Student' ? year : null,
      designation: role === 'Department Staff' ? designation : role === 'Administrator' ? 'Administrator' : null,
      complaintStats: { total: 0, resolved: 0, pending: 0 },
      activity: [{ id: 1, action: 'Account created by Administrator', time: 'Just now' }]
    };

    onAddUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#315C3A]/30 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">Add New User</h2>
              <p className="text-[11px] text-[#9FB1BC]">Provision student, staff, or administrative credentials</p>
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
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-[11px] font-semibold text-[#F5F5F0] mb-2">
              Select User Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('Student')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  role === 'Student'
                    ? 'bg-[#315C3A]/30 border-[#D4A84F] text-[#F5F5F0]'
                    : 'bg-[#0D1B22] border-[#1A2E3B] text-[#9FB1BC] hover:border-[#315C3A]'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${role === 'Student' ? 'text-[#D4A84F]' : ''}`} />
                <span className="font-semibold text-xs">Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('Department Staff')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  role === 'Department Staff'
                    ? 'bg-[#315C3A]/30 border-[#D4A84F] text-[#F5F5F0]'
                    : 'bg-[#0D1B22] border-[#1A2E3B] text-[#9FB1BC] hover:border-[#315C3A]'
                }`}
              >
                <Briefcase className={`w-4 h-4 ${role === 'Department Staff' ? 'text-[#D4A84F]' : ''}`} />
                <span className="font-semibold text-xs">Staff Member</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('Administrator')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  role === 'Administrator'
                    ? 'bg-[#315C3A]/30 border-[#D4A84F] text-[#F5F5F0]'
                    : 'bg-[#0D1B22] border-[#1A2E3B] text-[#9FB1BC] hover:border-[#315C3A]'
                }`}
              >
                <Shield className={`w-4 h-4 ${role === 'Administrator' ? 'text-[#D4A84F]' : ''}`} />
                <span className="font-semibold text-xs">Administrator</span>
              </button>
            </div>
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                {role === 'Student' ? 'Student ID / Roll No.' : 'Employee ID'}
              </label>
              <input
                type="text"
                placeholder={role === 'Student' ? 'SC-STU-2026-...' : 'EMP-...'}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="user@smartcampus.edu"
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
                placeholder="+91 98765 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
              />
            </div>
          </div>

          {/* Student-Specific Fields */}
          {role === 'Student' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-[#0D1B22] rounded-xl border border-[#1A2E3B]">
              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">
                  Course
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">
                  Academic Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">
                  Branch / Major
                </label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                />
              </div>
            </div>
          )}

          {/* Staff-Specific Fields */}
          {role === 'Department Staff' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#0D1B22] rounded-xl border border-[#1A2E3B]">
              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">
                  Assigned Department *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                >
                  {DEPARTMENTS_LIST.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#9FB1BC] mb-1">
                  Designation / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Field Supervisor"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-[#07121A] border border-[#1A2E3B] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
                />
              </div>
            </div>
          )}

          {/* Temporary Password */}
          <div>
            <label className="block text-[11px] font-medium text-[#9FB1BC] mb-1">
              Temporary Access Password *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0D1B22] border border-[#1A2E3B] rounded-lg px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4A84F]"
            />
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
              <span>Create User</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
