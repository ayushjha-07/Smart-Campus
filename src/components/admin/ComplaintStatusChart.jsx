import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { COMPLAINT_STATUS_DATA } from '../../data/adminMockData';

function CustomStatusTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / 290) * 100).toFixed(1);
    return (
      <div className="bg-[#07121A] border border-[#1A2E3B] rounded-lg p-2.5 shadow-xl text-xs z-50">
        <div className="flex items-center gap-2 font-semibold text-[#F5F5F0]">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span>{data.name}</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3 text-[#9FB1BC]">
          <span>Tickets: <strong className="text-[#F5F5F0]">{data.value}</strong></span>
          <span>({percentage}%)</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function ComplaintStatusChart() {
  const totalTickets = 248;

  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3 border-b border-[#1A2E3B] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
            Complaint Status
          </h3>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Active lifecycle distribution
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#13242E] text-[#3B82F6] border border-[#1A2E3B]">
          5 Stages
        </span>
      </div>

      {/* Donut Chart with Centered Overlay */}
      <div className="relative h-56 w-full flex items-center justify-center my-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={COMPLAINT_STATUS_DATA}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
              stroke="#0D1B22"
              strokeWidth={2}
            >
              {COMPLAINT_STATUS_DATA.map((entry, index) => (
                <Cell key={`status-cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomStatusTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-[#F5F5F0] font-sans leading-none tracking-tight">
            {totalTickets}
          </span>
          <span className="text-[10px] text-[#9FB1BC] uppercase font-semibold tracking-wider mt-0.5">
            Complaints
          </span>
        </div>
      </div>

      {/* Legend Below Chart */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-[#1A2E3B]">
        {COMPLAINT_STATUS_DATA.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#07121A]/60 border border-[#1A2E3B]/60 text-[11px]"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[#9FB1BC]">{item.name}:</span>
            <span className="font-bold text-[#F5F5F0] font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
