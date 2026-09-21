import React from 'react';
import { X, Building2, AlertCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DepartmentDetailsModal({ isOpen, onClose, department }) {
  const navigate = useNavigate();

  if (!isOpen || !department) return null;

  const handleNavigateToComplaints = () => {
    onClose();
    navigate('/admin/complaints');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2E3B] bg-[#0D1B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#315C3A]/30 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F0]">
                {department.department} Division
              </h2>
              <p className="text-[11px] text-[#9FB1BC]">
                Departmental resolution profile and workload distribution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Quick Stat Counters */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl">
              <span className="text-[10px] text-[#9FB1BC] block">Total</span>
              <span className="text-base font-extrabold text-[#F5F5F0]">{department.total}</span>
            </div>
            <div className="p-2.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl">
              <span className="text-[10px] text-[#9FB1BC] block">Pending</span>
              <span className="text-base font-extrabold text-amber-400">{department.pending}</span>
            </div>
            <div className="p-2.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl">
              <span className="text-[10px] text-[#9FB1BC] block">In Progress</span>
              <span className="text-base font-extrabold text-[#3B82F6]">{department.inProgress}</span>
            </div>
            <div className="p-2.5 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl">
              <span className="text-[10px] text-[#9FB1BC] block">Resolved</span>
              <span className="text-base font-extrabold text-[#10B981]">{department.resolved}</span>
            </div>
          </div>

          {/* Efficiency Bar */}
          <div className="p-4 bg-[#0D1B22] border border-[#1A2E3B] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#9FB1BC] font-medium">Resolution Success Rate</span>
              <span className="text-sm font-bold text-[#F5F5F0]">{department.resolutionRate}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#07121A] border border-[#1A2E3B] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${department.resolutionRate}%`,
                  backgroundColor: department.resolutionRate >= 60 ? '#10B981' : '#D4A84F'
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#71844A] pt-1">
              <span>Average resolution: {department.avgResolutionHours} hrs ({department.avgResolutionDays} days)</span>
              <span>Target: &le; 18 hrs</span>
            </div>
          </div>

          {/* Diagnostic Note */}
          <div className="p-3.5 bg-[#13242E]/70 border border-[#1A2E3B] rounded-xl space-y-1">
            <span className="font-semibold text-[#D4A84F] flex items-center gap-1.5 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              Department Observation:
            </span>
            <p className="text-[11px] text-[#9FB1BC] leading-relaxed">
              {department.department} handles {((department.total / 248) * 100).toFixed(1)}% of campus inquiries. Current turnaround sits at {department.avgResolutionHours} hours. Queue velocity is stable with {department.inProgress} active field jobs.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#1A2E3B] bg-[#0D1B22]">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs text-[#9FB1BC] hover:text-[#F5F5F0] hover:bg-[#13242E] transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleNavigateToComplaints}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#315C3A] hover:bg-[#3d7248] text-xs font-semibold text-[#F5F5F0] border border-[#D4A84F]/40 shadow-sm transition-all"
          >
            <span>Inspect All Tickets</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D4A84F]" />
          </button>
        </div>
      </div>
    </div>
  );
}
