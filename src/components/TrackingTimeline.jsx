import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  Clock, 
  Circle, 
  User 
} from 'lucide-react';
import { trackingDemoData } from '../data/landingData';

export default function TrackingTimeline() {
  const [searchInput, setSearchInput] = useState('SC-2026-1847');
  const [searchStatus, setSearchStatus] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim().toUpperCase() === 'SC-2026-1847') {
      setSearchStatus('found');
    } else {
      setSearchStatus('simulated');
    }
  };

  return (
    <section id="tracking" className="py-24 relative overflow-hidden bg-[#F7F9F8] dark:bg-[#07121A] transition-colors duration-300">
      {/* Background ambient elements */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#008F63]/5 dark:bg-[#315C3A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#00A875]/5 dark:bg-[#71844A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4F1] dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#315C3A]/50 text-[#008F63] dark:text-[#71844A] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>End-to-End Transparency</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight mb-4">
            Know What Happens Next.
          </h2>

          <p className="text-base sm:text-lg text-[#60717A] dark:text-[#9FB1BC] max-w-2xl mx-auto leading-relaxed">
            No more wondering if your voice was heard. Follow every milestone in real time with exact timestamps, staff dispatches, and expected resolution hours.
          </p>
        </div>

        {/* Tracking Container */}
        <div className="max-w-4xl mx-auto">
          
          {/* Quick Lookup Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#008F63] dark:text-[#71844A]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Complaint ID (e.g. SC-2026-1847)..."
                className="w-full bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-white/10 focus:border-[#008F63] dark:focus:border-[#D4A84F] rounded-2xl py-4 pl-12 pr-32 sm:pr-36 text-sm text-[#071A2B] dark:text-[#F5F5F0] placeholder-[#60717A]/50 outline-none transition-all shadow-xs hover:shadow-md dark:shadow-xl font-mono"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#008F63] hover:bg-[#007A54] text-white transition-colors border border-[#00A875]/40 shadow-xs cursor-pointer"
              >
                Track Now
              </button>
            </div>
            {searchStatus === 'simulated' && (
              <p className="text-xs text-[#008F63] dark:text-[#D4A84F] mt-2 text-left pl-2 font-medium">
                Showing sample demonstration ticket: <strong>SC-2026-1847</strong>
              </p>
            )}
          </form>

          {/* Ticket Card */}
          <div className="bg-white dark:bg-[#0D1B22]/90 border border-[#DDE8E3] dark:border-[#315C3A]/40 rounded-[24px] p-6 sm:p-10 shadow-lg shadow-slate-200/50 dark:shadow-2xl backdrop-blur-xl transition-colors">
            
            {/* Top Ticket Details Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#DCE5E2] dark:border-white/10 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#EEF4F1] dark:bg-[#07121A] text-[#008F63] dark:text-[#D4A84F] border border-[#DDE8E3] dark:border-[#D4A84F]/30">
                    ID: {trackingDemoData.ticketId}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F0FDF4] dark:bg-[#315C3A]/30 text-[#008F63] dark:text-[#71844A] border border-[#BBF7D0] dark:border-[#71844A]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#71844A] animate-pulse" />
                    In Progress
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                  {trackingDemoData.title}
                </h3>
              </div>

              <div className="flex flex-col sm:items-end text-xs text-[#60717A] dark:text-[#9FB1BC] space-y-1">
                <div>Department: <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">{trackingDemoData.department}</span></div>
                <div>Submitted: <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">{trackingDemoData.submittedTime}</span></div>
                <div>Est. Resolution: <span className="font-bold text-[#008F63] dark:text-[#D4A84F]">{trackingDemoData.estimatedResolution}</span></div>
              </div>
            </div>

            {/* Step-by-Step Timeline Component */}
            <div className="mt-8 pt-2">
              <div className="relative">
                
                {/* Timeline vertical connection line for mobile / horizontal for desktop */}
                <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-5 gap-4 relative">
                  
                  {trackingDemoData.steps.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isActive = step.status === 'active';
                    const isPending = step.status === 'pending';

                    return (
                      <div key={step.name} className="relative flex sm:flex-col items-start sm:items-center text-left sm:text-center group">
                        
                        {/* Step Marker Icon */}
                        <div className="relative z-10 flex items-center justify-center shrink-0 mr-4 sm:mr-0 sm:mb-4">
                          {isCompleted && (
                            <div className="w-10 h-10 rounded-full bg-[#008F63] text-white flex items-center justify-center border-2 border-[#00A875] shadow-md shadow-[#008F63]/20">
                              <Check className="w-5 h-5 stroke-[2.5]" />
                            </div>
                          )}

                          {isActive && (
                            <div className="w-10 h-10 rounded-full bg-[#D4A84F] text-[#07121A] flex items-center justify-center border-4 border-white dark:border-[#07121A] shadow-md shadow-[#D4A84F]/40 animate-pulse">
                              <span className="w-3.5 h-3.5 rounded-full bg-[#07121A]" />
                            </div>
                          )}

                          {isPending && (
                            <div className="w-10 h-10 rounded-full bg-[#EEF4F1] dark:bg-[#07121A] text-[#60717A]/50 dark:text-[#9FB1BC]/40 flex items-center justify-center border-2 border-[#DDE8E3] dark:border-white/10">
                              <Circle className="w-4 h-4 stroke-[1.5]" />
                            </div>
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <div className="flex sm:flex-col items-baseline sm:items-center justify-between sm:justify-start gap-1">
                            <h4
                              className={`text-sm font-bold ${
                                isActive
                                  ? 'text-[#008F63] dark:text-[#D4A84F]'
                                  : isCompleted
                                  ? 'text-[#071A2B] dark:text-[#F5F5F0]'
                                  : 'text-[#60717A]/60 dark:text-[#9FB1BC]/60'
                              }`}
                            >
                              {step.name}
                            </h4>
                            <span className="text-[11px] font-mono text-[#008F63] dark:text-[#71844A] font-semibold">
                              {step.time}
                            </span>
                          </div>

                          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC] mt-1 leading-normal sm:max-w-[150px] mx-auto">
                            {step.note}
                          </p>
                        </div>

                        {/* Connector line between steps (Desktop) */}
                        {idx < trackingDemoData.steps.length - 1 && (
                          <div
                            className={`hidden sm:block absolute top-5 left-1/2 w-full h-[2px] -z-0 ${
                              isCompleted ? 'bg-[#008F63] dark:bg-[#315C3A]' : 'bg-[#DCE5E2] dark:bg-white/10'
                            }`}
                          />
                        )}

                      </div>
                    );
                  })}

                </div>

              </div>
            </div>

            {/* Assigned Personnel & Escalation Footer */}
            <div className="mt-10 pt-6 border-t border-[#DCE5E2] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#60717A] dark:text-[#9FB1BC]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#008F63] dark:text-[#D4A84F]" />
                <span>Assigned Field Officer: <strong className="text-[#071A2B] dark:text-[#F5F5F0]">{trackingDemoData.assignedOfficer}</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#008F63] dark:text-emerald-400 font-bold">Auto-escalates if unaddressed in 3 hours</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
