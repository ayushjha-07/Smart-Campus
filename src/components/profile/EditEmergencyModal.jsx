import React, { useState } from 'react';
import { X, Users, Save, ShieldAlert } from 'lucide-react';

export default function EditEmergencyModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}) {
  const [name, setName] = useState(initialData?.emergencyName || 'Raj Kumar Jha');
  const [relationship, setRelationship] = useState(initialData?.emergencyRelation || 'Father');
  const [phone, setPhone] = useState(initialData?.emergencyPhone || '+91 98765 43211');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      emergencyName: name,
      emergencyRelation: relationship,
      emergencyPhone: phone,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0B2027] border border-[#DCE7E3] dark:border-white/10 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 relative animate-scaleUp text-[#10213A] dark:text-[#F5F7F5]">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCE7E3] dark:border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[#078A5A] dark:text-[#00B87A]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                Update Emergency Contact
              </h3>
              <p className="text-xs text-[#687A91] dark:text-[#91A7A5]">
                Primary contact in case of medical or campus emergencies
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
              Contact Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
              Relationship
            </label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
              className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
              Emergency Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
            />
          </div>

          {/* Notice */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 flex items-center gap-2 text-amber-800 dark:text-amber-300 text-[11px]">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#D8A93E]" />
            <span>Keep your emergency contact updated for student safety compliance.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#DCE7E3] dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#687A91] dark:text-[#91A7A5] hover:text-[#10213A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#078A5A] hover:bg-[#06744C] dark:bg-[#00B87A] dark:hover:bg-[#009E69] text-white transition-all shadow-2xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Contact</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
