import React from 'react';
import {
  MoreVertical,
  Eye,
  Edit2,
  UserCheck,
  Building2,
  KeyRound,
  Ban,
  Trash2,
  Clock
} from 'lucide-react';

export default function UserMobileCard({
  user,
  isSelected,
  onToggleSelect,
  onViewUser,
  onEditUser,
  onChangeRole,
  onChangeDepartment,
  onResetPassword,
  onSuspendUser,
  onDeleteUser
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`p-4 rounded-xl bg-[#0D1B22] border transition-colors ${
      isSelected ? 'border-[#D4A84F] bg-[#315C3A]/10' : 'border-[#1A2E3B]'
    }`}>
      {/* Top Row: Checkbox, Avatar, Name, and Menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="rounded border-[#1A2E3B] text-[#315C3A] focus:ring-[#D4A84F] bg-[#07121A] cursor-pointer"
          />

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#315C3A] to-[#13242E] border border-[#1A2E3B] flex items-center justify-center text-xs font-bold text-[#D4A84F] shrink-0">
            {getInitials(user.name)}
          </div>

          <div className="min-w-0">
            <h4
              onClick={onViewUser}
              className="font-bold text-sm text-[#F5F5F0] hover:text-[#D4A84F] cursor-pointer truncate"
            >
              {user.name}
            </h4>
            <span className="text-[11px] font-mono text-[#D4A84F] block">
              {user.code || user.id}
            </span>
          </div>
        </div>

        {/* 3-Dot Actions */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-md transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 w-48 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl shadow-2xl py-1 z-30 text-left text-xs animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => {
                    onViewUser();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5 text-[#71844A]" />
                  <span>View Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onEditUser();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Edit User</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeRole();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#D4A84F]" />
                  <span>Change Role</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeDepartment();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#315C3A]" />
                  <span>Change Dept</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetPassword();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reset Password</span>
                </button>
                <div className="my-1 border-t border-[#1A2E3B]" />
                <button
                  type="button"
                  onClick={() => {
                    onSuspendUser();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-amber-400 hover:bg-amber-500/10 flex items-center gap-2"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>{user.status === 'Suspended' ? 'Reactivate' : 'Suspend'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteUser();
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete User</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Badges Row */}
      <div className="flex items-center gap-2 my-2.5 flex-wrap">
        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#13242E] text-[#D4A84F] border border-[#1A2E3B]">
          {user.role}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
            user.status === 'Active'
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : user.status === 'Pending Verification'
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              : user.status === 'Suspended'
              ? 'bg-red-500/15 text-red-400 border-red-500/30'
              : 'bg-slate-500/15 text-slate-400 border-slate-500/30'
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* Meta Grid */}
      <div className="space-y-1 text-xs text-[#9FB1BC] pt-2 border-t border-[#1A2E3B]/60">
        <div className="flex justify-between">
          <span>Department:</span>
          <span className="text-[#F5F5F0] font-medium">{user.department || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span>Email:</span>
          <span className="text-[#F5F5F0] font-mono text-[11px]">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span>Last Active:</span>
          <span className="text-[#71844A] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {user.lastActive}
          </span>
        </div>
      </div>
    </div>
  );
}
