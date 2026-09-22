import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';
import { SYSTEM_STATUS_DATA } from '../../data/adminDashboardData';

export default function SystemStatus() {
  return (
    <div className="rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#008F63]/10 dark:bg-[#315C3A]/25 border border-[#008F63]/20 dark:border-[#315C3A]/40 flex items-center justify-center text-[#008F63] dark:text-[#D4A84F]">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              System Status
            </h3>
            <p className="text-xs font-medium text-[#60717A] dark:text-[#9FB1BC]">
              Campus cloud microservices health
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#008F63]/10 dark:bg-[#315C3A]/25 text-[#008F63] dark:text-[#A7C481] border border-[#008F63]/25 dark:border-[#315C3A]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008F63] dark:bg-[#00A875] animate-pulse" />
          <span>All Normal</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-2.5 my-auto">
        {SYSTEM_STATUS_DATA.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[#F7F9F8] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#1A2E3B]/60"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008F63] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#008F63] dark:bg-[#00A875]" />
              </span>
              <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                {service.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#60717A] dark:text-[#9FB1BC]">
                {service.uptime}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#008F63] dark:text-[#00A875] border border-emerald-200 dark:border-emerald-900/40">
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
