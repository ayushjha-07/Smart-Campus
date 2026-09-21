import React, { useState } from 'react';
import { X, MapPin, Save } from 'lucide-react';

export default function EditContactModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}) {
  const [campusAddress, setCampusAddress] = useState(initialData?.campusAddress || 'CGC University Mohali');
  const [hostel, setHostel] = useState(initialData?.hostel || 'Hostel Block B');
  const [room, setRoom] = useState(initialData?.room || 'B-204');
  const [phone, setPhone] = useState(initialData?.phone || '+91 98765 43210');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      campusAddress,
      hostel,
      room,
      phone,
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
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#10213A] dark:text-[#F5F7F5]">
                Update Contact & Residence
              </h3>
              <p className="text-xs text-[#687A91] dark:text-[#91A7A5]">
                Campus accommodation and residential contact details
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
              Primary Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
              Campus Address
            </label>
            <input
              type="text"
              value={campusAddress}
              onChange={(e) => setCampusAddress(e.target.value)}
              required
              className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
                Hostel Block
              </label>
              <input
                type="text"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                required
                className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-[#687A91] dark:text-[#91A7A5] uppercase tracking-wider">
                Room Number
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                className="w-full bg-[#F5F8F7] dark:bg-[#071A20] border border-[#DCE7E3] dark:border-white/10 focus:border-[#078A5A] dark:focus:border-[#00B87A] rounded-xl px-3.5 py-2.5 text-xs text-[#10213A] dark:text-[#F5F7F5] outline-none transition-all"
              />
            </div>
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
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
