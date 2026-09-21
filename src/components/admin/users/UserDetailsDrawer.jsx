import React from 'react';
import {
  X,
  User,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  Clock,
  Edit2,
  KeyRound,
  Activity,
  UserCheck,
  Building2
} from 'lucide-react';

export default function UserDetailsDrawer({
  isOpen,
  onClose,
  user,
  onEditUser,
  onChangeRole,
  onChangeDepartment,
  onResetPassword
}) {
  if (!isOpen || !user) return null;

  const isStudent = user.role === 'Student';
  const isStaff = user.role === 'Department Staff';

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07121A] border-l border-[#1A2E3B] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#D4A84F]" />
              <h2 className="text-base font-bold text-[#F5F5F0]">User Profile Details</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin text-xs">
            {/* Avatar & Hero Identity */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#315C3A] to-[#13242E] border-2 border-[#D4A84F]/50 flex items-center justify-center text-lg font-bold text-[#D4A84F] shrink-0 shadow-md">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-[#F5F5F0] truncate">{user.name}</h3>
                <span className="font-mono text-xs text-[#D4A84F] block">{user.code || user.id}</span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#13242E] text-[#F5F5F0] border border-[#1A2E3B]">
                    {user.role}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      user.status === 'Active'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Complaint Statistics */}
            {user.complaintStats && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71844A]">
                  Complaint History
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
                    <span className="text-[10px] text-[#9FB1BC] block">Total</span>
                    <span className="text-base font-bold text-[#F5F5F0]">{user.complaintStats.total}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
                    <span className="text-[10px] text-[#9FB1BC] block">Resolved</span>
                    <span className="text-base font-bold text-[#10B981]">{user.complaintStats.resolved}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
                    <span className="text-[10px] text-[#9FB1BC] block">Pending</span>
                    <span className="text-base font-bold text-amber-400">{user.complaintStats.pending}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Details Grid */}
            <div className="space-y-2 p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#71844A] block mb-2">
                Account Information
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#1A2E3B]/60">
                  <span className="text-[#9FB1BC] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#71844A]" /> Email
                  </span>
                  <span className="font-mono text-[#F5F5F0]">{user.email}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#1A2E3B]/60">
                  <span className="text-[#9FB1BC] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#71844A]" /> Phone
                  </span>
                  <span className="text-[#F5F5F0]">{user.phone || 'Not provided'}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#1A2E3B]/60">
                  <span className="text-[#9FB1BC] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#71844A]" /> Registered
                  </span>
                  <span className="text-[#F5F5F0]">{user.registeredAt || '2025'}</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-[#9FB1BC] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#71844A]" /> Last Active
                  </span>
                  <span className="text-[#10B981] font-medium">{user.lastActive}</span>
                </div>
              </div>
            </div>

            {/* Student Specific Fields */}
            {isStudent && (
              <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B82F6] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Academic Profile
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div>
                    <span className="text-[10px] text-[#9FB1BC] block">Course:</span>
                    <span className="font-semibold text-[#F5F5F0]">{user.course || 'B.Tech'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9FB1BC] block">Academic Year:</span>
                    <span className="font-semibold text-[#D4A84F]">{user.year || '3rd Year'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-[#9FB1BC] block">Branch / Specialization:</span>
                    <span className="font-semibold text-[#F5F5F0]">{user.branch || user.department}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Staff Specific Fields */}
            {isStaff && (
              <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A84F] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Operational Assignment
                </span>
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#9FB1BC]">Designation:</span>
                    <span className="font-semibold text-[#F5F5F0]">{user.designation || 'Staff Member'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9FB1BC]">Assigned Department:</span>
                    <span className="font-semibold text-[#D4A84F]">{user.department}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity Timeline */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#71844A] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#D4A84F]" /> Recent Platform Activity
              </span>
              <div className="space-y-2">
                {(user.activity || [
                  { id: 1, action: 'Logged in to campus portal', time: user.lastActive },
                  { id: 2, action: 'Updated security verification credentials', time: 'Yesterday' }
                ]).map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]/80 flex items-center justify-between text-xs"
                  >
                    <span className="text-[#F5F5F0]">{act.action}</span>
                    <span className="text-[10px] text-[#71844A] shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Actions Footer */}
          <div className="p-4 border-t border-[#1A2E3B] bg-[#0D1B22] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onResetPassword(user);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#07121A] text-amber-400 hover:text-amber-300 border border-[#1A2E3B] text-xs transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Reset Pass</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onChangeRole(user);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#13242E] text-[#D4A84F] hover:text-[#F5F5F0] border border-[#1A2E3B] text-xs transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Role</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onChangeDepartment(user);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#13242E] text-[#315C3A] hover:text-[#F5F5F0] border border-[#1A2E3B] text-xs transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Dept</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onEditUser(user);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 shadow-sm transition-all"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#D4A84F]" />
                <span>Edit User</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
