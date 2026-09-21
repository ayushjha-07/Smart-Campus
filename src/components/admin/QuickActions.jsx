import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  ClipboardList,
  UserCheck,
  Building2,
  BarChart3,
  FileSpreadsheet
} from 'lucide-react';

export default function QuickActions({ onAssignFirstUnassigned, onGenerateReportToast }) {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'review',
      label: 'Review Complaints',
      icon: ClipboardList,
      color: '#D4A84F',
      onClick: () => navigate('/admin/complaints'),
    },
    {
      id: 'assign',
      label: 'Assign Complaints',
      icon: UserCheck,
      color: '#71844A',
      onClick: onAssignFirstUnassigned,
    },
    {
      id: 'departments',
      label: 'Manage Departments',
      icon: Building2,
      color: '#3B82F6',
      onClick: () => navigate('/admin/departments'),
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: BarChart3,
      color: '#A855F7',
      onClick: () => navigate('/admin/analytics'),
    },
    {
      id: 'report',
      label: 'Generate Report',
      icon: FileSpreadsheet,
      color: '#10B981',
      onClick: onGenerateReportToast,
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
        <span className="text-[11px] text-[#9FB1BC]">Operational Shortcuts</span>
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
                  + {act.label}
                </span>
                <span className="text-[10px] text-[#9FB1BC] truncate block">
                  Fast Action
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
