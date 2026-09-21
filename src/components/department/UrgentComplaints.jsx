import React from 'react';
import { ShieldAlert, Clock, MapPin, ChevronRight, AlertTriangle } from 'lucide-react';

const priorityBadges = {
  HIGH: { bg: 'rgba(249, 115, 22, 0.15)', text: '#FDBA74', border: '#F97316' },
  CRITICAL: { bg: 'rgba(239, 68, 68, 0.18)', text: '#FCA5A5', border: '#EF4444' },
};

const statusBadges = {
  'Pending': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Submitted': { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: '#F59E0B' },
  'Under Review': { bg: 'rgba(139, 92, 246, 0.15)', text: '#A78BFA', border: '#8B5CF6' },
  'In Progress': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: '#3B82F6' },
};

export default function UrgentComplaints({ onSelectComplaint, items = null }) {
  const fallbackItems = [
    {
      id: 'SC-2026-1848',
      title: 'Water supply issue in Hostel Block B',
      priority: 'HIGH',
      status: 'In Progress',
      location: 'Hostel Block B',
      submitted: '10:32 AM',
    },
    {
      id: 'SC-2026-1842',
      title: 'Power outage in Computer Lab',
      priority: 'HIGH',
      status: 'Under Review',
      location: 'Computer Lab',
      submitted: '8:21 AM',
    },
    {
      id: 'SC-2026-1831',
      title: 'Water leakage near Academic Block',
      priority: 'CRITICAL',
      status: 'Pending',
      location: 'Academic Block',
      submitted: 'Yesterday',
    },
  ];

  const urgentItems = items && items.length > 0 ? items : fallbackItems;

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated">
      {/* Header */}
      <div className="pb-4 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-500/30 text-orange-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight flex items-center gap-2">
              Urgent Complaints
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Complaints requiring immediate attention
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/15 text-orange-300 border border-orange-500/30">
          3 Priority Items
        </span>
      </div>

      {/* 3 Urgent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
        {urgentItems.map((item) => {
          const prio = priorityBadges[item.priority] || priorityBadges.HIGH;
          const stat = statusBadges[item.status] || statusBadges.Pending;
          const isCritical = item.priority === 'CRITICAL';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                isCritical
                  ? 'bg-gradient-to-b from-red-950/15 to-[#07121A] border-red-500/30 hover:border-red-500/60'
                  : 'bg-[#07121A]/80 border-orange-500/25 hover:border-orange-500/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#D4A84F]">
                    {item.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                      style={{
                        backgroundColor: prio.bg,
                        color: prio.text,
                        border: `1px solid ${prio.border}40`,
                      }}
                    >
                      {item.priority}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.2 rounded"
                      style={{
                        backgroundColor: stat.bg,
                        color: stat.text,
                        border: `1px solid ${stat.border}40`,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-[#F5F5F0] mt-2 line-clamp-2 group-hover:text-[#D4A84F] transition-colors">
                  {item.title}
                </h4>

                <div className="mt-2.5 pt-2 border-t border-[#1A2E3B]/70 space-y-1 text-[11px] text-[#9FB1BC]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#71844A]" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#9FB1BC]" />
                    <span>Submitted: {item.submitted}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectComplaint(item.id)}
                className="mt-3.5 w-full py-2 rounded-lg bg-[#13242E] hover:bg-[#315C3A] text-xs font-semibold text-[#F5F5F0] border border-[#1A2E3B] hover:border-[#315C3A] flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>View Complaint</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-[#1A2E3B]/60 flex items-center gap-1.5 text-[11px] text-[#9FB1BC]">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Maintenance division target SLA: response under 60 minutes for high & critical tickets.</span>
      </div>
    </div>
  );
}
