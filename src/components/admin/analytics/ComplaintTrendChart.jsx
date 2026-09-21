import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, Calendar, Info } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050A0C]/95 border border-[#1A2E3B] rounded-lg p-3 shadow-2xl text-xs backdrop-blur-md">
        <div className="font-semibold text-[#F5F5F0] border-b border-[#1A2E3B] pb-1.5 mb-2 flex items-center justify-between gap-3">
          <span>{label}, 2026</span>
          <span className="text-[10px] text-[#71844A]">Daily Volume</span>
        </div>
        <div className="space-y-1.5">
          {payload.map((entry) => (
            <div key={entry.dataKey} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[#9FB1BC]">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-bold text-[#F5F5F0]">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ComplaintTrendChart({ data }) {
  const [activeSeries, setActiveSeries] = useState({
    Submitted: true,
    Resolved: true,
    Active: true
  });

  const toggleSeries = (series) => {
    setActiveSeries((prev) => ({
      ...prev,
      [series]: !prev[series]
    }));
  };

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-[#F5F5F0]">
              Complaint Trend
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#315C3A]/25 text-[#D4A84F] border border-[#315C3A]/60 font-medium">
              <Calendar className="w-3 h-3 text-[#D4A84F]" />
              Last 7 Days
            </span>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Submitted, resolved, and active complaints over time
          </p>
        </div>

        {/* Interactive Legend Toggles */}
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => toggleSeries('Submitted')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all text-[11px] ${
              activeSeries.Submitted
                ? 'bg-[#D4A84F]/15 border-[#D4A84F]/50 text-[#F5F5F0]'
                : 'bg-transparent border-[#1A2E3B] text-[#9FB1BC]/60 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A84F]" />
            <span>Submitted</span>
          </button>

          <button
            type="button"
            onClick={() => toggleSeries('Resolved')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all text-[11px] ${
              activeSeries.Resolved
                ? 'bg-[#10B981]/15 border-[#10B981]/50 text-[#F5F5F0]'
                : 'bg-transparent border-[#1A2E3B] text-[#9FB1BC]/60 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span>Resolved</span>
          </button>

          <button
            type="button"
            onClick={() => toggleSeries('Active')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all text-[11px] ${
              activeSeries.Active
                ? 'bg-[#3B82F6]/15 border-[#3B82F6]/50 text-[#F5F5F0]'
                : 'bg-transparent border-[#1A2E3B] text-[#9FB1BC]/60 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span>Active</span>
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A84F" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D4A84F" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1A2E3B" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#9FB1BC"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1A2E3B' }}
            />
            <YAxis
              stroke="#9FB1BC"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1A2E3B' }}
            />
            <Tooltip content={<CustomTooltip />} />

            {activeSeries.Active && (
              <Area
                type="monotone"
                dataKey="Active"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorActive)"
                name="Active Queue"
              />
            )}

            {activeSeries.Submitted && (
              <Area
                type="monotone"
                dataKey="Submitted"
                stroke="#D4A84F"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorSubmitted)"
                name="Submitted"
              />
            )}

            {activeSeries.Resolved && (
              <Area
                type="monotone"
                dataKey="Resolved"
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorResolved)"
                name="Resolved"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-[#1A2E3B]/60 flex items-center justify-between text-[11px] text-[#9FB1BC]">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
          Resolved velocity (+41) surpassed submissions (+38) on Sep 20.
        </span>
        <span className="hidden sm:flex items-center gap-1 text-[10px] text-[#71844A]">
          <Info className="w-3 h-3" />
          Click series pills above to isolate trends
        </span>
      </div>
    </div>
  );
}
