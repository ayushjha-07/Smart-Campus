import React from 'react';
import { Building2, Calendar, AlertCircle } from 'lucide-react';

export default function DepartmentSelect({
  role,
  department,
  onDepartmentChange,
  year,
  onYearChange,
  departmentError,
  yearError,
}) {
  const studentDepartments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Business Administration',
    'Other',
  ];

  const staffDepartments = [
    'Administration',
    'Maintenance',
    'Hostel',
    'IT Support',
    'Academics',
    'Security',
    'Transport',
    'Library',
    'Cafeteria',
  ];

  const studentYears = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
  ];

  if (role === 'student') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Department / Branch */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
            Department / Branch <span className="text-[#D4A84F]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
              <Building2 className="w-4 h-4" />
            </div>
            <select
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className={`w-full bg-[#050A0C] border ${
                departmentError
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/10 focus:border-[#D4A84F]'
              } rounded-xl pl-10 pr-8 py-2.5 text-sm text-[#F5F5F0] outline-none transition-colors appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-[#07121A] text-[#A8B3B0]">
                Select your branch
              </option>
              {studentDepartments.map((dept) => (
                <option key={dept} value={dept} className="bg-[#07121A] text-[#F5F5F0]">
                  {dept}
                </option>
              ))}
            </select>
          </div>
          {departmentError && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{departmentError}</span>
            </p>
          )}
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
            Academic Year <span className="text-[#D4A84F]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
              <Calendar className="w-4 h-4" />
            </div>
            <select
              value={year}
              onChange={(e) => onYearChange(e.target.value)}
              className={`w-full bg-[#050A0C] border ${
                yearError
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/10 focus:border-[#D4A84F]'
              } rounded-xl pl-10 pr-8 py-2.5 text-sm text-[#F5F5F0] outline-none transition-colors appearance-none cursor-pointer`}
            >
              <option value="" disabled className="bg-[#07121A] text-[#A8B3B0]">
                Select study year
              </option>
              {studentYears.map((yr) => (
                <option key={yr} value={yr} className="bg-[#07121A] text-[#F5F5F0]">
                  {yr}
                </option>
              ))}
            </select>
          </div>
          {yearError && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{yearError}</span>
            </p>
          )}
        </div>
      </div>
    );
  }

  // Staff View
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
        Assigned Department <span className="text-[#D4A84F]">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
          <Building2 className="w-4 h-4" />
        </div>
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className={`w-full bg-[#050A0C] border ${
            departmentError
              ? 'border-red-500/80 focus:border-red-500'
              : 'border-white/10 focus:border-[#D4A84F]'
          } rounded-xl pl-10 pr-8 py-2.5 text-sm text-[#F5F5F0] outline-none transition-colors appearance-none cursor-pointer`}
        >
          <option value="" disabled className="bg-[#07121A] text-[#A8B3B0]">
            Select staff department
          </option>
          {staffDepartments.map((dept) => (
            <option key={dept} value={dept} className="bg-[#07121A] text-[#F5F5F0]">
              {dept}
            </option>
          ))}
        </select>
      </div>
      {departmentError && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{departmentError}</span>
        </p>
      )}
    </div>
  );
}
