import React, { useState } from 'react';
import { X, Building2, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactDepartmentModal({ complaint, isOpen, onClose, onMessageSent }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    if (onMessageSent) {
      onMessageSent(message);
    }
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0D1B22] border border-[#DDE7E2] dark:border-[#315C3A] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DDE7E2] dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#315C3A]/20 border border-emerald-200 dark:border-[#315C3A]/50 flex items-center justify-center text-[#168A5B] dark:text-[#D4A84F]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#14213D] dark:text-[#F5F5F0]">
                Contact {complaint.department || 'Department'}
              </h3>
              <span className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
                Regarding Complaint #{complaint.id}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] hover:bg-slate-100 dark:hover:bg-[#07121A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[#168A5B] dark:text-[#71844A] text-[10px] uppercase font-bold">
              <Mail className="w-3 h-3" />
              <span>Department Email</span>
            </div>
            <a
              href={`mailto:${complaint.departmentEmail || 'maintenance@smartcampus.demo'}`}
              className="text-[#14213D] dark:text-[#F5F5F0] hover:text-[#168A5B] dark:hover:text-[#D4A84F] font-mono transition-colors block truncate"
            >
              {complaint.departmentEmail || 'maintenance@smartcampus.demo'}
            </a>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 text-[#D4A84F] text-[10px] uppercase font-bold">
              <Phone className="w-3 h-3" />
              <span>Helpline Extension</span>
            </div>
            <span className="text-[#14213D] dark:text-[#F5F5F0] font-mono block">
              {complaint.departmentPhone || '+91 (080) 2854-9102'}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/5 flex items-center gap-2 text-xs text-[#64748B] dark:text-[#A8B3B0]">
          <MapPin className="w-4 h-4 text-[#168A5B] dark:text-[#71844A] shrink-0" />
          <span>
            Office: <strong className="text-[#14213D] dark:text-[#F5F5F0]">{complaint.departmentOffice || 'Maintenance Block Room 104'}</strong>
          </span>
        </div>

        {/* Send Direct Message Form */}
        {sent ? (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-center space-y-1.5">
            <CheckCircle2 className="w-6 h-6 text-[#168A5B] dark:text-emerald-400 mx-auto" />
            <h5 className="text-sm font-bold text-[#14213D] dark:text-[#F5F5F0]">Message Sent!</h5>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3B0]">
              Your inquiry has been dispatched to {complaint.assignedStaff || 'the department staff'}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] dark:text-[#A8B3B0]/70 block">
                Direct Message to Handler ({complaint.assignedStaff || 'Staff'})
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about schedule, urgent access requirements, or queries..."
                rows={3}
                required
                className="w-full bg-[#F8FAFC] dark:bg-[#07121A] border border-[#DDE7E2] dark:border-white/10 focus:border-[#168A5B] dark:focus:border-[#D4A84F] rounded-2xl p-3 text-xs text-[#14213D] dark:text-[#F5F5F0] placeholder-[#94A3B8] dark:placeholder-[#A8B3B0]/50 outline-none resize-none transition-colors"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#DDE7E2] dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] dark:text-[#A8B3B0] hover:text-[#14213D] dark:hover:text-[#F5F5F0] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!message.trim()}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#168A5B] dark:bg-[#D4A84F] hover:bg-[#127049] dark:hover:bg-[#E5BF6E] text-white dark:text-[#07121A] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
