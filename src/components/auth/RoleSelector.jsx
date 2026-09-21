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
        <label className="text-xs font-semibold uppercase tracking-wider text-[#A8B3B0]">
          Sign in as
        </label>
        <span className="text-[11px] text-[#71844A] font-medium">
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
              className={`p-3 rounded-xl text-left flex flex-col justify-between transition-all duration-200 border group ${
                isSelected
                  ? 'bg-[#315C3A] border-[#D4A84F] shadow-lg shadow-[#315C3A]/30 translate-y-[-1px]'
                  : 'bg-[#050A0C] hover:bg-[#0D1B22] border-white/10 hover:border-[#315C3A]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isSelected ? 'text-[#D4A84F]' : 'text-[#71844A] group-hover:text-[#F5F5F0]'
                  }`}
                />
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-[#D4A84F]' : 'bg-transparent'
                  }`}
                />
              </div>

              <div>
                <span
                  className={`block text-xs font-bold transition-colors ${
                    isSelected ? 'text-[#F5F5F0]' : 'text-[#F5F5F0]/80 group-hover:text-[#F5F5F0]'
                  }`}
                >
                  {role.label}
                </span>
                <span
                  className={`block text-[10px] mt-0.5 transition-colors ${
                    isSelected ? 'text-[#F5F5F0]/80' : 'text-[#A8B3B0]/60'
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
