import React, { useState } from 'react';
import {
  MoreVertical,
  Eye,
  Edit2,
  UserCheck,
  Building2,
  KeyRound,
  Ban,
  Trash2,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function UserTable({
  users,
  selectedUserIds,
  onToggleSelectUser,
  onToggleSelectAll,
  onViewUser,
  onEditUser,
  onChangeRole,
  onChangeDepartment,
  onResetPassword,
  onSuspendUser,
  onDeleteUser
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const isAllSelected = users.length > 0 && users.every((u) => selectedUserIds.includes(u.id));

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Administrator':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Administrator
          </span>
        );
      case 'Department Staff':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#315C3A]/30 text-[#D4A84F] border border-[#315C3A]/60">
            Department Staff
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
            Student
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'Pending Verification':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Clock className="w-2.5 h-2.5" />
            Pending Verification
          </span>
        );
      case 'Suspended':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            <Ban className="w-2.5 h-2.5" />
            Suspended
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-500/15 text-slate-400 border border-slate-500/30">
            Inactive
          </span>
        );
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1A2E3B] bg-[#050A0C]/60 text-[11px] font-semibold text-[#71844A] uppercase tracking-wider">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-[#1A2E3B] text-[#315C3A] focus:ring-[#D4A84F] bg-[#07121A] cursor-pointer"
                />
              </th>
              <th className="py-3 px-3">User</th>
              <th className="py-3 px-3">ID Code</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Department</th>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Last Active</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A2E3B]/60 text-xs">
            {users.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#9FB1BC]">
                  <AlertCircle className="w-8 h-8 text-[#D4A84F] mx-auto mb-2 opacity-60" />
                  <p className="font-semibold text-[#F5F5F0]">No users found matching current filters</p>
                  <p className="text-[11px] mt-1">Try resetting the filter criteria or search query.</p>
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                const isMenuOpen = activeMenuId === user.id;

                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-[#13242E]/70 transition-colors ${
                      isSelected ? 'bg-[#315C3A]/10' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelectUser(user.id)}
                        className="rounded border-[#1A2E3B] text-[#315C3A] focus:ring-[#D4A84F] bg-[#07121A] cursor-pointer"
                      />
                    </td>

                    {/* User info with Avatar */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#315C3A] to-[#13242E] border border-[#1A2E3B] flex items-center justify-center text-[11px] font-bold text-[#D4A84F] shrink-0 shadow-sm">
                          {getInitials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <span
                            onClick={() => onViewUser(user)}
                            className="font-semibold text-[#F5F5F0] hover:text-[#D4A84F] cursor-pointer transition-colors block truncate"
                          >
                            {user.name}
                          </span>
                          <span className="text-[10px] text-[#9FB1BC] truncate block">
                            {user.phone || 'No phone'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* ID Code */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#D4A84F]">
                      {user.code || user.id}
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-3 text-[#9FB1BC] truncate max-w-[150px]">
                      {user.department || 'N/A'}
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-3 text-[#9FB1BC] font-mono text-[11px] truncate max-w-[180px]">
                      {user.email}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-3 text-[#9FB1BC] text-[11px] whitespace-nowrap">
                      {user.lastActive}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-3 text-right relative">
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(isMenuOpen ? null : user.id)}
                        className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-md transition-colors"
                        aria-label="Open user actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div className="absolute right-3 top-10 w-48 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl shadow-2xl py-1 z-30 text-left animate-in fade-in duration-150">
                            <button
                              type="button"
                              onClick={() => {
                                onViewUser(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#F5F5F0] hover:bg-[#13242E] hover:text-[#D4A84F] flex items-center gap-2.5"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#71844A]" />
                              <span>View Profile</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onEditUser(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#F5F5F0] hover:bg-[#13242E] hover:text-[#D4A84F] flex items-center gap-2.5"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                              <span>Edit User</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onChangeRole(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#F5F5F0] hover:bg-[#13242E] hover:text-[#D4A84F] flex items-center gap-2.5"
                            >
                              <UserCheck className="w-3.5 h-3.5 text-[#D4A84F]" />
                              <span>Change Role</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onChangeDepartment(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#F5F5F0] hover:bg-[#13242E] hover:text-[#D4A84F] flex items-center gap-2.5"
                            >
                              <Building2 className="w-3.5 h-3.5 text-[#315C3A]" />
                              <span>Change Department</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onResetPassword(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-[#F5F5F0] hover:bg-[#13242E] hover:text-[#D4A84F] flex items-center gap-2.5"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                              <span>Reset Password</span>
                            </button>

                            <div className="my-1 border-t border-[#1A2E3B]" />

                            <button
                              type="button"
                              onClick={() => {
                                onSuspendUser(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-amber-400 hover:bg-amber-500/10 flex items-center gap-2.5"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>{user.status === 'Suspended' ? 'Reactivate Account' : 'Suspend Account'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                onDeleteUser(user);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete Account</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
