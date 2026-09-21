import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { WORKLOAD_DONUT_DATA } from '../../data/departmentMockData';

function CustomWorkloadTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / 42) * 100).toFixed(1);
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

export default function DepartmentWorkloadChart() {
  return (
    <div className="rounded-xl bg-[#0D1B22] border border-[#1A2E3B] p-5 shadow-card-elevated flex flex-col justify-between">
      {/* Header */}
      <div className="pb-3 border-b border-[#1A2E3B] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#F5F5F0] tracking-tight">
            My Complaint Workload
          </h3>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Maintenance status breakdown
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#13242E] text-[#D4A84F] border border-[#1A2E3B]">
          42 Tickets
        </span>
      </div>

      {/* Donut Chart with Centered Text */}
      <div className="relative h-56 w-full flex items-center justify-center my-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={WORKLOAD_DONUT_DATA}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
              stroke="#0D1B22"
              strokeWidth={2}
            >
              {WORKLOAD_DONUT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomWorkloadTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-[#F5F5F0] font-sans leading-none tracking-tight">
            42
          </span>
          <span className="text-[10px] text-[#9FB1BC] uppercase font-semibold tracking-wider mt-0.5">
            Assigned
          </span>
        </div>
      </div>

      {/* Legend below chart */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-2 border-t border-[#1A2E3B] text-[11px]">
        {WORKLOAD_DONUT_DATA.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-1.5 rounded bg-[#07121A]/70 border border-[#1A2E3B]/70"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#9FB1BC] truncate">{item.name}</span>
            </div>
            <span className="font-bold text-[#F5F5F0] font-mono ml-1">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
