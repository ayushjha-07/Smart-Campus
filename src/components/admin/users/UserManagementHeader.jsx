import React from 'react';
import { Users, Building2, UserPlus, Download, ShieldCheck } from 'lucide-react';

export default function UserManagementHeader({
  activeTab,
  onTabChange,
  onOpenAddUser,
  onOpenAddDepartment,
  onExportUsers
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1A2E3B]/80">
      {/* Title & Badge */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#315C3A]/25 text-[#D4A84F] border border-[#315C3A]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4A84F]" />
            Administrator Access
          </span>
          <span className="text-[11px] text-[#71844A] bg-[#13242E] px-2 py-0.5 rounded border border-[#1A2E3B]">
            Central Identity Directory
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] tracking-tight">
          User & Department Management
        </h1>
        <p className="text-xs sm:text-sm text-[#9FB1BC] mt-0.5">
          Manage campus users, roles, departments, and access permissions.
        </p>
      </div>

      {/* Controls: Tabs & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => onTabChange('users')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-[#315C3A] text-[#F5F5F0] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Users</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('departments')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'departments'
                ? 'bg-[#315C3A] text-[#F5F5F0] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Departments</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {activeTab === 'users' ? (
            <>
              <button
                type="button"
                onClick={onExportUsers}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D1B22] border border-[#1A2E3B] text-xs font-medium text-[#F5F5F0] hover:border-[#D4A84F]/60 hover:text-[#D4A84F] transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#71844A]" />
                <span>Export Users</span>
              </button>

              <button
                type="button"
                onClick={onOpenAddUser}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#315C3A] to-[#25462c] border border-[#D4A84F]/50 text-xs font-semibold text-[#F5F5F0] hover:border-[#D4A84F] hover:shadow-[0_0_15px_-3px_rgba(212,168,79,0.3)] transition-all"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#D4A84F]" />
                <span>Add User</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onOpenAddDepartment}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#315C3A] to-[#25462c] border border-[#D4A84F]/50 text-xs font-semibold text-[#F5F5F0] hover:border-[#D4A84F] hover:shadow-[0_0_15px_-3px_rgba(212,168,79,0.3)] transition-all"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4A84F]" />
              <span>Add Department</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
