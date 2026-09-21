import React, { useState } from 'react';
import {
  Building2,
  Wrench,
  Wifi,
  Home,
  GraduationCap,
  Shield,
  Bus,
  BookOpen,
  Coffee,
  Sparkles,
  MoreVertical,
  Eye,
  Edit2,
  ExternalLink,
  Users,
  Ban,
  CheckCircle2
} from 'lucide-react';

const DEPT_ICONS = {
  Maintenance: Wrench,
  'IT Support': Wifi,
  Hostel: Home,
  Academics: GraduationCap,
  Security: Shield,
  Transport: Bus,
  Library: BookOpen,
  Cafeteria: Coffee,
  Housekeeping: Sparkles,
  Administration: Building2
};

export default function DepartmentCard({
  dept,
  onViewDetails,
  onEditDepartment,
  onViewComplaints,
  onViewStaff,
  onDeactivateDepartment
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-4.5 hover:border-[#315C3A] transition-all hover:shadow-[0_4px_20px_-4px_rgba(49,92,58,0.2)] flex flex-col justify-between group">
      <div>
        {/* Top Bar: Icon, Name, ID, and Menu */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#315C3A]/40 to-[#13242E] border border-[#315C3A] flex items-center justify-center text-[#D4A84F] shrink-0 shadow-sm group-hover:border-[#D4A84F] transition-colors">
              {React.createElement(DEPT_ICONS[dept.name] || Building2, { className: 'w-5 h-5' })}
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#F5F5F0] group-hover:text-[#D4A84F] transition-colors">
                {dept.name}
              </h3>
              <span className="font-mono text-[10px] text-[#71844A]">
                {dept.code || dept.id}
              </span>
            </div>
          </div>

          {/* Actions Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-md transition-colors"
              aria-label="Department options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 w-44 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl shadow-2xl py-1 z-30 text-left text-xs animate-in fade-in duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      onViewDetails(dept);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#71844A]" />
                    <span>View Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onEditDepartment(dept);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>Edit Department</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onViewComplaints(dept);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4A84F]" />
                    <span>View Complaints</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onViewStaff(dept);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-[#F5F5F0] hover:bg-[#13242E] flex items-center gap-2"
                  >
                    <Users className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>View Staff ({dept.staffCount})</span>
                  </button>
                  <div className="my-1 border-t border-[#1A2E3B]" />
                  <button
                    type="button"
                    onClick={() => {
                      onDeactivateDepartment(dept);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-amber-400 hover:bg-amber-500/10 flex items-center gap-2"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Deactivate</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status Pill & Head of Department */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] text-[#9FB1BC] truncate">
            Head: <strong className="text-[#F5F5F0]">{dept.head || 'Unassigned'}</strong>
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              dept.status === 'Active'
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {dept.status === 'Active' && <CheckCircle2 className="w-2.5 h-2.5" />}
            {dept.status}
          </span>
        </div>

        {/* KPI Counts Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-[#07121A] border border-[#1A2E3B]/70 text-center mb-3">
          <div>
            <span className="text-[10px] text-[#9FB1BC] block">Staff</span>
            <span className="text-base font-extrabold text-[#F5F5F0]">{dept.staffCount}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#9FB1BC] block">Open</span>
            <span className="text-base font-extrabold text-amber-400">{dept.openComplaints}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#9FB1BC] block">Resolved/Mo</span>
            <span className="text-base font-extrabold text-[#10B981]">{dept.resolvedThisMonth || dept.resolvedComplaints}</span>
          </div>
        </div>

        {/* Categories Handled Preview */}
        {dept.categories && dept.categories.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {dept.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-[10px] px-2 py-0.5 rounded bg-[#13242E] text-[#9FB1BC] border border-[#1A2E3B]"
              >
                {cat}
              </span>
            ))}
            {dept.categories.length > 3 && (
              <span className="text-[10px] text-[#71844A]">
                +{dept.categories.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1A2E3B]/60 text-xs">
        <button
          type="button"
          onClick={() => onViewDetails(dept)}
          className="inline-flex items-center gap-1 text-[#9FB1BC] hover:text-[#F5F5F0] transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-[#71844A]" />
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={() => onEditDepartment(dept)}
          className="inline-flex items-center gap-1 text-[#D4A84F] hover:text-amber-300 font-medium transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
