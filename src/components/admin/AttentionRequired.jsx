import React from 'react';
import { AlertTriangle, Clock, MapPin, ChevronRight, ShieldAlert } from 'lucide-react';
import { URGENT_ATTENTION_DATA } from '../../data/adminMockData';

export default function AttentionRequired({ onReviewComplaint }) {
  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-4 border-b border-[#1A2E3B] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight flex items-center gap-2">
              Requires Attention
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </h3>
            <p className="text-xs text-[#9FB1BC] mt-0.5">
              Urgent hazards and high-priority escalation tickets
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30">
          3 Critical
        </span>
      </div>

      {/* 3 Urgent Cards */}
      <div className="space-y-3 my-3">
        {URGENT_ATTENTION_DATA.map((item) => {
          const isCritical = item.priority === 'CRITICAL';

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isCritical
                  ? 'bg-gradient-to-r from-red-950/20 to-[#07121A] border-red-500/40 hover:border-red-500/70'
                  : 'bg-[#07121A]/80 border-orange-500/30 hover:border-orange-500/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#D4A84F]">
                    {item.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isCritical
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <span className="text-[10px] text-[#9FB1BC] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#9FB1BC]" />
                  {item.submitted}
                </span>
              </div>

              <h4 className="text-xs font-bold text-[#F5F5F0] mt-1.5 line-clamp-1">
                {item.title}
              </h4>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A2E3B]/70">
                <div className="flex items-center gap-1.5 text-[11px] text-[#9FB1BC]">
                  <MapPin className="w-3 h-3 text-[#71844A]" />
                  <span>{item.location}</span>
                </div>

                <button
                  onClick={() => onReviewComplaint(item.id)}
                  className="px-2.5 py-1 rounded bg-[#13242E] hover:bg-[#315C3A] text-xs font-medium text-[#F5F5F0] hover:text-white border border-[#1A2E3B] hover:border-[#315C3A] flex items-center gap-1 transition-all"
                >
                  <span>Review</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-[11px] text-[#9FB1BC] flex items-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        <span>Action required to maintain compliance with university SLA</span>
      </div>
    </div>
  );
}
