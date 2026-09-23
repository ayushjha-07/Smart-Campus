import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { WEEKLY_ACTIVITY_DATA } from '../../data/departmentDashboardData';

export default function WeeklyComplaintChart({ data = WEEKLY_ACTIVITY_DATA }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl p-3 bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] shadow-xl text-xs space-y-1.5">
          <div className="font-extrabold text-[#071A2B] dark:text-[#F5F5F0] border-b border-[#DDE8E3] dark:border-[#1A2E3B] pb-1">
            {label} Breakdown
          </div>
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[#60717A] dark:text-[#9FB1BC] capitalize">{entry.name}:</span>
              </div>
              <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">{entry.value} tickets</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs flex flex-col justify-between h-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#DDE8E3]/60 dark:border-[#243338]/60">
        <div>
          <h3 className="text-sm font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            Weekly Complaint Activity
          </h3>
          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
            Volume comparison: Submitted vs Resolved (Mon – Sun)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#008F63]" />
            <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">Submitted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#D4A84F]" />
            <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">Resolved</span>
          </div>
        </div>
      </div>

      {/* Area Chart Container */}
      <div className="my-2 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#008F63" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#008F63" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A84F" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#D4A84F" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-[#DDE8E3] dark:text-[#243338]" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'currentColor', fontSize: 11 }}
              className="text-[#60717A] dark:text-[#9FB1BC]"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'currentColor', fontSize: 11 }}
              className="text-[#60717A] dark:text-[#9FB1BC]"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="submitted"
              name="Submitted"
              stroke="#008F63"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorSubmitted)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#D4A84F"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorResolved)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Highlights */}
      <div className="pt-3 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60 flex items-center justify-between text-[11px] text-[#60717A] dark:text-[#9FB1BC]">
        <span>Peak Influx: <strong className="text-[#071A2B] dark:text-[#F5F5F0]">Friday (11 tickets)</strong></span>
        <span>Resolution Rate: <strong className="text-emerald-600 dark:text-emerald-400">81.4% Efficiency</strong></span>
      </div>
    </div>
  );
}
