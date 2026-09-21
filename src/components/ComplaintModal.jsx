import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function ComplaintModal({ isOpen, onClose }) {
  const [category, setCategory] = useState('Hostel / Infrastructure');
  const [location, setLocation] = useState('Hostel Block B, Room 204');
  const [description, setDescription] = useState('Water supply has stopped in Hostel Block B and students are facing serious difficulty.');
  const [submittedId, setSubmittedId] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedId('SC-2026-' + Math.floor(1000 + Math.random() * 9000));
  };

  const handleReset = () => {
    setSubmittedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0D1B22] border border-[#315C3A]/60 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#07121A] text-[#9FB1BC] hover:text-[#F5F5F0] border border-white/10 hover:border-white/20 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedId ? (
          /* Submission Success State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#315C3A]/30 border border-[#71844A] text-[#D4A84F] flex items-center justify-center mx-auto shadow-lg shadow-[#315C3A]/30">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-bold text-[#F5F5F0]">
              Complaint Registered Successfully!
            </h3>

            <p className="text-sm text-[#9FB1BC] max-w-md mx-auto">
              Your issue has been logged into the Smart Campus routing queue.
            </p>

            <div className="p-4 rounded-xl bg-[#07121A] border border-[#315C3A]/50 inline-block font-mono text-sm">
              <span className="text-[#9FB1BC] block text-xs mb-1">Assigned Ticket Reference:</span>
              <strong className="text-lg text-[#D4A84F]">{submittedId}</strong>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#315C3A] hover:bg-[#3D7349] text-[#F5F5F0] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#315C3A]/20 border border-[#315C3A] flex items-center justify-center text-[#D4A84F]">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F0]">
                  Submit Campus Complaint
                </h3>
                <p className="text-xs text-[#9FB1BC]">
                  AI-assisted categorization & automatic department assignment
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#9FB1BC] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#07121A] border border-white/15 focus:border-[#D4A84F] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
                >
                  <option value="Hostel / Infrastructure">Hostel & Living Quarters</option>
                  <option value="Water & Plumbing">Water Supply & Plumbing</option>
                  <option value="Electrical & Air Conditioning">Electrical & Power Grid</option>
                  <option value="Campus Wi-Fi & IT">Campus Network & IT Services</option>
                  <option value="Classrooms & Laboratories">Academic Blocks & Labs</option>
                  <option value="Sanitation & Waste">Sanitation & Grounds</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#9FB1BC] mb-1.5">
                  Campus Location / Hall / Block
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="e.g., Hostel Block B, Floor 2, Room 204"
                  className="w-full bg-[#07121A] border border-white/15 focus:border-[#D4A84F] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9FB1BC]">
                    Complaint Details
                  </label>
                  <span className="text-[11px] text-[#D4A84F] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI analyzes urgency
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe what happened, severity, and when it started..."
                  className="w-full bg-[#07121A] border border-white/15 focus:border-[#D4A84F] rounded-xl px-4 py-3 text-sm text-[#F5F5F0] outline-none transition-colors resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#07121A] border border-white/5 flex items-center gap-2.5 text-xs text-[#9FB1BC]">
                <AlertCircle className="w-4 h-4 text-[#71844A] shrink-0" />
                <span>Urgent issues are automatically flagged for immediate same-day dispatch.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#9FB1BC] hover:text-[#F5F5F0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-[#F5F5F0] bg-gradient-to-r from-[#315C3A] to-[#3D7349] hover:from-[#3D7349] hover:to-[#71844A] border border-[#71844A]/50 transition-all flex items-center gap-2 shadow-lg shadow-[#315C3A]/20"
                >
                  <span>Submit Ticket</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
