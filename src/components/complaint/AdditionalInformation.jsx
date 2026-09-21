import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders, Building, Hash, Mail, Phone, Bell } from 'lucide-react';

export default function AdditionalInformation({
  buildingBlock,
  onBuildingBlockChange,
  roomNumber,
  onRoomNumberChange,
  contactPreference,
  onContactPreferenceChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const preferences = [
    { id: 'Email', label: 'Email', icon: Mail },
    { id: 'Phone', label: 'Phone', icon: Phone },
    { id: 'Both', label: 'Both', icon: Bell },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#07121A]/60 overflow-hidden transition-all">
      {/* Accordion Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#0D1B22]/50 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#315C3A]/20 text-[#D4A84F]">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#F5F5F0] block">
              Additional Information
            </span>
            <span className="text-[10px] text-[#A8B3B0]">
              Specify room number, block details & contact preferences
            </span>
          </div>
        </div>

        <div className="text-[#A8B3B0]">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-4 pt-1 border-t border-white/5 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Building / Block */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
                Building / Block
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
                  <Building className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={buildingBlock}
                  onChange={(e) => onBuildingBlockChange(e.target.value)}
                  placeholder="e.g. Block B, Academic Hall 2"
                  className="w-full bg-[#050A0C] border border-white/10 focus:border-[#D4A84F] rounded-xl pl-9 pr-3 py-2 text-xs text-[#F5F5F0] placeholder-[#A8B3B0]/40 outline-none"
                />
              </div>
            </div>

            {/* Room Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-1.5">
                Room / Lab Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71844A]">
                  <Hash className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => onRoomNumberChange(e.target.value)}
                  placeholder="e.g. Room 204 or Lab 3"
                  className="w-full bg-[#050A0C] border border-white/10 focus:border-[#D4A84F] rounded-xl pl-9 pr-3 py-2 text-xs text-[#F5F5F0] placeholder-[#A8B3B0]/40 outline-none"
                />
              </div>
            </div>

          </div>

          {/* Contact Preference */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#A8B3B0] mb-2">
              Updates Notification Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {preferences.map((pref) => {
                const Icon = pref.icon;
                const isSelected = contactPreference === pref.id;

                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => onContactPreferenceChange(pref.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-[#315C3A] text-[#F5F5F0] border-[#D4A84F]'
                        : 'bg-[#050A0C] text-[#A8B3B0] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4A84F]' : 'text-[#71844A]'}`} />
                    <span>{pref.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
