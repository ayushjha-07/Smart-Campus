import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  PlusCircle, 
  Award 
} from 'lucide-react';

export default function ProfileActivitySummary({
  stats = { total: 12, pending: 3, inProgress: 4, resolved: 5 },
}) {
  const activities = [
    {
      id: 1,
      title: 'Water supply issue in Hostel Block B',
      status: 'In Progress',
      date: 'Today, 12:45 PM',
      complaintId: 'SC-2026-1847',
    },
    {
      id: 2,
      title: 'Wi-Fi connectivity issue',
      status: 'Under Review',
      date: 'Today, 11:30 AM',
      complaintId: 'SC-2026-1839',
    },
    {
      id: 3,
      title: 'Library AC not working',
      status: 'Resolved',
      date: 'Yesterday',
      complaintId: 'SC-2026-1828',
    },
    {
      id: 4,
      title: 'Cafeteria cleanliness issue',
      status: 'Resolved',
      date: '18 Sep 2026',
      complaintId: 'SC-2026-1814',
    },
  ];

  return (
    <div className="bg-white border border-[#DDE7E2] rounded-2xl p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#DDE7E2] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#168A5B]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#14213D]">
              Activity & Ticket History
            </h3>
            <p className="text-xs text-[#64748B]">
              Personal complaint submissions and service resolution lifecycle
            </p>
          </div>
        </div>

        <Link
          to="/student/complaints"
          className="text-xs text-[#168A5B] hover:text-[#127049] font-semibold flex items-center gap-1"
        >
          <span>View All Complaints</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Mini KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DDE7E2] space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1">
            <ClipboardList className="w-3 h-3 text-[#168A5B]" />
            <span>Total Logged</span>
          </span>
          <span className="font-mono text-xl font-extrabold text-[#14213D] block">
            {stats.total || 12}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DDE7E2] space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Active Issues</span>
          </span>
          <span className="font-mono text-xl font-extrabold text-amber-600 block">
            {stats.inProgress || 4}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DDE7E2] space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#168A5B]" />
            <span>Resolved</span>
          </span>
          <span className="font-mono text-xl font-extrabold text-[#168A5B] block">
            {stats.resolved || 5}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DDE7E2] space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1">
            <Award className="w-3 h-3 text-[#D4A84F]" />
            <span>Resolution Rate</span>
          </span>
          <span className="font-mono text-xl font-extrabold text-[#168A5B] block">
            42%
          </span>
        </div>
      </div>

      {/* Recent Submissions Feed */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-[#14213D] block">
          Recent Service Activity
        </span>

        <div className="space-y-2 text-xs">
          {activities.map((act) => (
            <Link
              key={act.id}
              to={`/student/complaints/${act.complaintId}`}
              className="p-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-emerald-50/40 border border-[#DDE7E2] hover:border-[#168A5B] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs font-bold text-[#168A5B] shrink-0">
                  #{act.complaintId}
                </span>
                <span className="text-[#14213D] font-medium group-hover:text-[#168A5B] transition-colors truncate">
                  {act.title}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  act.status === 'Resolved'
                    ? 'bg-emerald-50 text-[#168A5B] border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {act.status}
                </span>
                <span className="text-[11px] font-mono text-[#64748B] hidden sm:inline">
                  {act.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="pt-2 border-t border-[#DDE7E2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-[#64748B]">
          Need to report an issue in your hostel or academic block?
        </span>

        <Link
          to="/student/complaints/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#168A5B] hover:bg-[#127049] text-white transition-all shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Complaint</span>
        </Link>
      </div>
    </div>
  );
}
