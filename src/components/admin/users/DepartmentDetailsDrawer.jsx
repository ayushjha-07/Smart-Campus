import React from 'react';
import {
  X,
  Building2,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DepartmentDetailsDrawer({
  isOpen,
  onClose,
  dept,
  onEditDepartment
}) {
  const navigate = useNavigate();

  if (!isOpen || !dept) return null;

  const handleNavigateToComplaints = () => {
    onClose();
    navigate('/admin/complaints');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#07121A] border-l border-[#1A2E3B] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#315C3A]/30 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#F5F5F0]">{dept.name} Division</h2>
                <p className="text-[11px] text-[#9FB1BC]">{dept.code || dept.id}</p>
              </div>
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
            {/* Description & Status */}
            <div className="p-4 rounded-xl bg-[#0D1B22] border border-[#1A2E3B] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#F5F5F0]">{dept.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {dept.status}
                </span>
              </div>
              <p className="text-[11px] text-[#9FB1BC] leading-relaxed">
                {dept.description || 'Campus operations division dedicated to infrastructure and service resolution.'}
              </p>
              <div className="pt-2 border-t border-[#1A2E3B]/60 flex items-center justify-between text-[11px]">
                <span className="text-[#9FB1BC]">Department Head:</span>
                <span className="font-semibold text-[#D4A84F]">{dept.head || 'Unassigned'}</span>
              </div>
            </div>

            {/* Performance Stats Counters */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#71844A] block mb-2">
                Operational Metrics
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
                  <span className="text-[10px] text-[#9FB1BC] block">Staff</span>
                  <span className="text-base font-bold text-[#F5F5F0]">{dept.staffCount}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
                  <span className="text-[10px] text-[#9FB1BC] block">Open Tickets</span>
                  <span className="text-base font-bold text-amber-400">{dept.openComplaints}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
                  <span className="text-[10px] text-[#9FB1BC] block">Resolved</span>
                  <span className="text-base font-bold text-[#10B981]">{dept.resolvedComplaints || dept.resolvedThisMonth}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0D1B22] border border-[#1A2E3B]">
                  <span className="text-[10px] text-[#9FB1BC] block">Resolution Rate</span>
                  <span className="text-base font-bold text-[#D4A84F]">{dept.resolutionRate || 60}%</span>
                </div>
              </div>
            </div>

            {/* Categories Handled */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#71844A] block">
                Assigned Complaint Categories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(dept.categories || ['Maintenance', 'Infrastructure']).map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-1 rounded-lg bg-[#0D1B22] border border-[#1A2E3B] text-xs text-[#F5F5F0]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Staff List Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71844A]">
                  Department Staff ({dept.staff ? dept.staff.length : dept.staffCount})
                </span>
                <span className="text-[10px] text-[#9FB1BC]">Active Duty</span>
              </div>

              <div className="rounded-xl border border-[#1A2E3B] overflow-hidden bg-[#0D1B22]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1A2E3B] bg-[#050A0C]/50 text-[10px] text-[#71844A] uppercase tracking-wider">
                      <th className="py-2 px-3">Staff Name</th>
                      <th className="py-2 px-3">ID Code</th>
                      <th className="py-2 px-3">Role</th>
                      <th className="py-2 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A2E3B]/60">
                    {(dept.staff && dept.staff.length > 0 ? dept.staff : [
                      { name: 'Senior Supervisor', id: `${dept.code}-01`, role: 'Unit Lead', status: 'Active' },
                      { name: 'Field Specialist', id: `${dept.code}-02`, role: 'Technician', status: 'Active' }
                    ]).map((member, idx) => (
                      <tr key={idx} className="hover:bg-[#13242E]/60">
                        <td className="py-2.5 px-3 font-semibold text-[#F5F5F0]">{member.name}</td>
                        <td className="py-2.5 px-3 font-mono text-[10px] text-[#D4A84F]">{member.id}</td>
                        <td className="py-2.5 px-3 text-[#9FB1BC]">{member.role}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400">
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-[#1A2E3B] bg-[#0D1B22] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEditDepartment(dept);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#07121A] text-[#F5F5F0] hover:bg-[#13242E] border border-[#1A2E3B] text-xs transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Edit Department</span>
            </button>

            <button
              type="button"
              onClick={handleNavigateToComplaints}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-[#F5F5F0] text-xs font-semibold border border-[#D4A84F]/40 shadow-sm transition-all"
            >
              <span>View Department Complaints</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4A84F]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
