import React, { useState } from 'react';
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
import { Calendar, TrendingUp } from 'lucide-react';
import { COMPLAINT_OVERVIEW_DATA } from '../../data/adminMockData';

// Custom dark themed tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#07121A] border border-[#315C3A] rounded-lg p-3 shadow-xl text-xs z-50">
        <div className="font-semibold text-[#F5F5F0] border-b border-[#1A2E3B] pb-1 mb-2 flex items-center justify-between gap-4">
          <span>{label}</span>
          <span className="text-[10px] text-[#9FB1BC]">Daily Total: {payload.reduce((acc, curr) => acc + curr.value, 0)}</span>
        </div>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-[#9FB1BC]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-bold text-[#F5F5F0] font-mono">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default function ComplaintOverviewChart() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1A2E3B]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
              Complaint Overview
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#315C3A]/20 text-[#A7C481] border border-[#315C3A]/40">
              <TrendingUp className="w-3 h-3" /> +8.4% resolution
            </span>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Complaint volume and resolution activity
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-[#07121A] border border-[#1A2E3B] hover:border-[#315C3A] text-xs text-[#F5F5F0] rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#D4A84F] cursor-pointer transition-colors"
              aria-label="Select overview time range"
            >
              <option value="7d">Last 7 days</option>
              <option value="14d">Last 14 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <Calendar className="w-3.5 h-3.5 text-[#9FB1BC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={COMPLAINT_OVERVIEW_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A84F" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#D4A84F" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#315C3A" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#315C3A" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2E3B" vertical={false} />
            <XAxis
              dataKey="day"
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
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', color: '#9FB1BC' }}
            />
            <Area
              type="monotone"
              dataKey="submitted"
              name="Submitted"
              stroke="#D4A84F"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSubmitted)"
            />
            <Area
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#315C3A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorResolved)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
