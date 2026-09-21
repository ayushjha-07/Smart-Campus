import React, { useState } from 'react';
import { Megaphone, ExternalLink, X, Calendar, Sparkles } from 'lucide-react';

export default function CampusAnnouncements() {
  const [modalOpen, setModalOpen] = useState(false);

  const announcements = [
    {
      id: 'ann-1',
      category: 'Campus Maintenance',
      title: 'Hostel Block B Water Supply Maintenance',
      content: 'Hostel Block B water supply maintenance scheduled for 21 September from 09:00 AM to 01:00 PM. Alternative storage tanks available.',
      date: '21 Sep 2026',
      badgeColor: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/30',
    },
    {
      id: 'ann-2',
      category: 'System Update',
      title: 'Enhanced Complaint Tracking Release',
      content: 'New complaint tracking improvements are now available. Live status audit logs and technician assignment metrics are active.',
      date: '20 Sep 2026',
      badgeColor: 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/30',
    },
    {
      id: 'ann-3',
      category: 'Academic Notice',
      title: 'Mid-Term Semester Feedback Cycle',
      content: 'Semester feedback submissions are now open across all engineering departments. Please submit course reviews by 30 September.',
      date: '18 Sep 2026',
      badgeColor: 'text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-500/30',
    },
  ];

  const allBulletins = [
    ...announcements,
    {
      id: 'ann-4',
      category: 'Library Notice',
      title: 'Extended Study Hours for Examination Term',
      content: 'Central Library 1st & 2nd floor reading halls will operate 24 hours starting next Monday with active Wi-Fi and café access.',
      date: '15 Sep 2026',
      badgeColor: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/30',
    },
    {
      id: 'ann-5',
      category: 'Campus Transport',
      title: 'Green Electric Shuttle Expansion',
      content: 'Three new low-emission electric campus buggies added connecting the sports complex, hostels, and academic halls.',
      date: '10 Sep 2026',
      badgeColor: 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/30',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xs dark:shadow-xl space-y-4 sm:space-y-5 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE7E3] dark:border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#078A5A] dark:text-[#00B87A]">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#10213A] dark:text-[#F5F7F5]">
              Campus Announcements
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#91A7A5]">
              Administrative advisories and university notices
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#DCE7E3] dark:border-white/10 hover:border-[#078A5A] dark:hover:border-[#00B87A] bg-[#F5F8F7] dark:bg-[#071A20] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-[#078A5A] dark:text-[#00B87A] transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>View All Bulletins</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 hover:border-[#078A5A]/40 dark:hover:border-[#00B87A]/40 transition-all duration-200 flex flex-col justify-between space-y-3 shadow-2xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border ${item.badgeColor}`}>
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-[#64748B] dark:text-[#91A7A5]">
                  {item.date}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#10213A] dark:text-[#F5F7F5] leading-snug">
                {item.title}
              </h4>

              <p className="text-xs text-[#64748B] dark:text-[#91A7A5] leading-relaxed line-clamp-3">
                {item.content}
              </p>
            </div>

            <div className="pt-2 border-t border-[#DCE7E3] dark:border-white/10 flex items-center gap-1.5 text-[11px] text-[#078A5A] dark:text-[#00B87A] font-semibold">
              <Sparkles className="w-3 h-3 text-[#D8A93E]" />
              <span>Official University Notice</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bulletins Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="max-w-2xl w-full bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-5 animate-scaleUp max-h-[85vh] overflow-y-auto text-[#10213A] dark:text-[#F5F7F5]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E3] dark:border-white/10">
              <div className="flex items-center gap-2 text-[#078A5A] dark:text-[#00B87A]">
                <Megaphone className="w-5 h-5" />
                <h3 className="font-bold text-base text-[#10213A] dark:text-[#F5F7F5]">All Campus Bulletins & Advisories</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-[#64748B] dark:text-[#91A7A5] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              {allBulletins.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${b.badgeColor}`}>
                      {b.category}
                    </span>
                    <span className="text-xs font-mono text-[#64748B] dark:text-[#91A7A5] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {b.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#10213A] dark:text-[#F5F7F5]">{b.title}</h4>
                  <p className="text-xs text-[#64748B] dark:text-[#91A7A5] leading-relaxed">{b.content}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
            >
              Close Bulletins
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
