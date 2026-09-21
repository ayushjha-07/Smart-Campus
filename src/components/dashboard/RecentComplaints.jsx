import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ArrowRight, 
  Zap, 
  Building2, 
  AlertCircle,
  BarChart2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function RecentComplaints({ complaints = null }) {
  const navigate = useNavigate();

  // Default exact reference data
  const defaultComplaints = [
    {
      id: 'SC-2026-1847',
      title: 'Water supply issue in Hostel Block B',
      subtext: 'Maintenance',
      category: 'Water Supply',
      categoryIcon: Building2,
      categoryColor: 'text-[#168A5B]',
      priority: 'HIGH',
      status: 'In Progress',
      lastUpdated: '12:45 PM today',
      link: '/student/complaints/SC-2026-1847',
    },
    {
      id: 'SC-2026-1839',
      title: 'Wi-Fi connectivity issue in Academic Block 3',
      subtext: 'IT Operations',
      category: 'IT / Wi-Fi',
      categoryIcon: Zap,
      categoryColor: 'text-blue-600',
      priority: 'MEDIUM',
      status: 'Under Review',
      lastUpdated: '11:30 AM today',
      link: '/student/complaints/SC-2026-1839',
    },
    {
      id: 'SC-2026-1828',
      title: 'Library AC chiller malfunction in reading room',
      subtext: 'HVAC Services',
      category: 'Infrastructure',
      categoryIcon: Building2,
      categoryColor: 'text-[#168A5B]',
      priority: 'HIGH',
      status: 'Resolved',
      lastUpdated: 'Yesterday',
      link: '/student/complaints/SC-2026-1828',
    },
  ];

  const displayList = (complaints && complaints.length > 0) ? complaints.slice(0, 5).map((c) => ({
    id: c.complaint_number || c.id,
    title: c.title,
    subtext: c.department_name || 'Maintenance',
    category: c.category || 'General',
    categoryIcon: c.category?.toLowerCase().includes('electr') ? Zap : Building2,
    categoryColor: 'text-[#168A5B]',
    priority: (c.priority || 'MEDIUM').toUpperCase(),
    status: c.status || 'Under Review',
    lastUpdated: c.lastUpdated || 'Today',
    link: `/student/complaints/${c.id || c.complaint_number}`,
  })) : defaultComplaints;

  const getPriorityBadge = (priority) => {
    switch ((priority || '').toUpperCase()) {
      case 'CRITICAL':
        return {
          pill: 'bg-rose-50 text-rose-700 border border-rose-200',
          icon: AlertCircle,
        };
      case 'HIGH':
        return {
          pill: 'bg-amber-50 text-amber-800 border border-amber-200',
          icon: AlertCircle,
        };
      case 'MEDIUM':
        return {
          pill: 'bg-blue-50 text-blue-700 border border-blue-200',
          icon: BarChart2,
        };
      case 'LOW':
      default:
        return {
          pill: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
          icon: BarChart2,
        };
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('resolv')) {
      return {
        pill: 'bg-emerald-50 border border-emerald-200 text-emerald-800',
        icon: CheckCircle2,
        isDot: false,
      };
    }
    if (s.includes('progress') || s.includes('investig')) {
      return {
        pill: 'bg-amber-50 border border-amber-200 text-amber-800',
        isDot: true,
        dotColor: 'bg-amber-500 animate-pulse',
      };
    }
    // Under Review / Pending
    return {
      pill: 'bg-blue-50 border border-blue-200 text-blue-800',
      isDot: true,
      dotColor: 'bg-blue-500',
    };
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#0D1B22]/90 border border-[#DDE7E2] dark:border-white/10 p-5 sm:p-6 shadow-2xs dark:shadow-xl overflow-hidden transition-all duration-300">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DDE7E2] dark:border-white/10 gap-3">
        <div className="flex items-center gap-3.5">
          {/* Green Icon Badge */}
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-[#168A5B] flex items-center justify-center shrink-0 shadow-2xs">
            <FileText className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#14213D] dark:text-[#F5F5F0] tracking-tight leading-tight">
              Recent Complaints
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0] mt-0.5">
              Real-time status updates across active ticket lifecycles
            </p>
          </div>
        </div>

        {/* View All Button */}
        <Link
          to="/student/complaints"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#DDE7E2] dark:border-white/10 hover:border-[#168A5B] text-[#168A5B] hover:bg-emerald-50 dark:hover:bg-[#041118] text-xs font-semibold transition-all duration-200 self-start sm:self-auto shadow-2xs"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Table Container with Horizontal Scroll on Mobile */}
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#DDE7E2] dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#A8B3B0]">
              <th className="py-3 px-3">COMPLAINT ID</th>
              <th className="py-3 px-3">COMPLAINT</th>
              <th className="py-3 px-3">CATEGORY</th>
              <th className="py-3 px-3">PRIORITY</th>
              <th className="py-3 px-3">STATUS</th>
              <th className="py-3 px-3">LAST UPDATED</th>
              <th className="py-3 px-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE7E2] dark:divide-white/10">
            {displayList.map((item) => {
              const priorityInfo = getPriorityBadge(item.priority);
              const PriorityIcon = priorityInfo.icon;
              const statusInfo = getStatusBadge(item.status);
              const StatusIcon = statusInfo.icon;

              return (
                <tr
                  key={item.id}
                  onClick={() => navigate(item.link)}
                  className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  {/* COMPLAINT ID */}
                  <td className="py-3.5 px-3 font-mono font-bold text-[#168A5B]">
                    {item.id}
                  </td>

                  {/* COMPLAINT */}
                  <td className="py-3.5 px-3 max-w-[280px]">
                    <span className="block font-semibold text-[#14213D] dark:text-[#F5F5F0] truncate group-hover:text-[#168A5B] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#64748B] dark:text-[#A8B3B0] block truncate mt-0.5">
                      {item.subtext}
                    </span>
                  </td>

                  {/* CATEGORY */}
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#14213D] dark:text-[#F5F5F0] text-[11px] font-medium">
                      <span>{item.category}</span>
                    </span>
                  </td>

                  {/* PRIORITY */}
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityInfo.pill}`}>
                      <PriorityIcon className="w-3 h-3 stroke-[2.5]" />
                      <span>{item.priority}</span>
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusInfo.pill}`}>
                      {statusInfo.isDot ? (
                        <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`} />
                      ) : (
                        <StatusIcon className="w-3 h-3 stroke-[2.5]" />
                      )}
                      <span>{item.status}</span>
                    </span>
                  </td>

                  {/* LAST UPDATED */}
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#64748B] dark:text-[#A8B3B0]">
                    {item.lastUpdated}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#168A5B] group-hover:text-[#127049]">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
