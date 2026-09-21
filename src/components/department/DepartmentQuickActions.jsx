import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  ClipboardList,
  RefreshCw,
  CheckCircle2,
  FileText,
  BarChart3
} from 'lucide-react';

export default function DepartmentQuickActions({
  onOpenStatus,
  onOpenResolve,
  onOpenNote
}) {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'review',
      label: 'Review Assigned Complaints',
      icon: ClipboardList,
      color: '#D4A84F',
      onClick: () => navigate('/department/complaints'),
    },
    {
      id: 'update-status',
      label: 'Update Complaint Status',
      icon: RefreshCw,
      color: '#3B82F6',
      onClick: onOpenStatus,
    },
    {
      id: 'resolve',
      label: 'Mark Complaint Resolved',
      icon: CheckCircle2,
      color: '#315C3A',
      onClick: onOpenResolve,
    },
    {
      id: 'internal-note',
      label: 'Add Internal Note',
      icon: FileText,
      color: '#A855F7',
      onClick: onOpenNote,
    },
    {
      id: 'analytics',
      label: 'View Department Analytics',
      icon: BarChart3,
      color: '#71844A',
      onClick: () => navigate('/department/analytics'),
    },
  ];

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated">
      {/* Header */}
      <div className="pb-3 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#D4A84F]/15 border border-[#D4A84F]/30 text-[#D4A84F]">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
            Quick Actions
          </h3>
        </div>
        <span className="text-[11px] text-[#9FB1BC]">Department Staff Shortcuts</span>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-[#07121A] hover:bg-[#13242E] border border-[#1A2E3B] hover:border-[#315C3A] text-left transition-all group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `${act.color}15`,
                  borderColor: `${act.color}40`,
                  color: act.color,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-[#F5F5F0] group-hover:text-[#D4A84F] transition-colors truncate block">
                  {act.label}
                </span>
                <span className="text-[10px] text-[#9FB1BC] truncate block">
                  Staff Action
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
