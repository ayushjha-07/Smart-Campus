import React from 'react';
import { GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';

export default function RoleSelector({ selectedRole, onSelectRole }) {
  const roles = [
    {
      id: 'student',
      label: 'Student',
      icon: GraduationCap,
      description: 'Hostel & Academics',
    },
    {
      id: 'staff',
      label: 'Department Staff',
      icon: Briefcase,
      description: 'Field & Resolution',
    },
    {
      id: 'admin',
      label: 'Administrator',
      icon: ShieldCheck,
      description: 'Campus Oversight',
    },
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#A8B3B0]">
          Sign in as
        </label>
        <span className="text-[11px] text-[#008F63] dark:text-[#00B878] font-medium">
          Select portal profile
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id)}
              className={`p-3 rounded-xl text-left flex flex-col justify-between transition-all duration-200 border cursor-pointer group ${
                isSelected
                  ? 'bg-emerald-50/80 dark:bg-[#07261E] border-[#008F63] dark:border-[#00B878] shadow-md shadow-emerald-950/10 dark:shadow-[#00B878]/20 translate-y-[-1px]'
                  : 'bg-white dark:bg-[#050A0C] hover:bg-slate-50 dark:hover:bg-[#0D1B22] border-[#DDE5E1] dark:border-white/10 hover:border-[#008F63]/50 dark:hover:border-[#00B878]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isSelected 
                      ? 'text-[#008F63] dark:text-[#00B878]' 
                      : 'text-slate-400 dark:text-[#71844A] group-hover:text-[#008F63] dark:group-hover:text-[#F5F5F0]'
                  }`}
                />
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isSelected ? 'bg-[#008F63] dark:bg-[#00B878]' : 'bg-transparent'
                  }`}
                />
              </div>

              <div>
                <span
                  className={`block text-xs font-bold transition-colors ${
                    isSelected 
                      ? 'text-[#008F63] dark:text-[#F5F5F0]' 
                      : 'text-[#07121A] dark:text-[#F5F5F0]/80 group-hover:text-[#008F63] dark:group-hover:text-[#F5F5F0]'
                  }`}
                >
                  {role.label}
                </span>
                <span
                  className={`block text-[10px] mt-0.5 transition-colors ${
                    isSelected 
                      ? 'text-slate-600 dark:text-[#A8B3B0]' 
                      : 'text-slate-500 dark:text-[#A8B3B0]/60'
                  }`}
                >
                  {role.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
