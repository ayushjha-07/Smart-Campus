import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { STATUS_DONUT_DATA } from '../../data/departmentDashboardData';

export default function ComplaintStatusChart({ total = 42, data = STATUS_DONUT_DATA }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="rounded-xl px-3 py-2 bg-white dark:bg-[#0D1B22] border border-[#DDE8E3] dark:border-[#1A2E3B] shadow-xl text-xs">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.payload.color }}
            />
            <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">
              {item.name}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4 text-[11px] text-[#60717A] dark:text-[#9FB1BC]">
            <span>Tickets: <strong className="text-[#071A2B] dark:text-[#F5F5F0]">{item.value}</strong></span>
            <span>Share: <strong className="text-[#008F63] dark:text-[#D4A84F]">{item.payload.percentage}</strong></span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-[#0C1518] border border-[#DDE8E3] dark:border-[#243338] shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#DDE8E3]/60 dark:border-[#243338]/60">
        <div>
          <h3 className="text-sm font-extrabold text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            Complaint Status
          </h3>
          <p className="text-xs text-[#60717A] dark:text-[#9FB1BC]">
            Active distribution across lifecycle stages
          </p>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#008F63]/10 dark:bg-[#00A875]/20 text-[#008F63] dark:text-[#00A875]">
          Live Cycle
        </span>
      </div>

      {/* Donut Chart Container */}
      <div className="relative my-2 h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl sm:text-3xl font-black text-[#071A2B] dark:text-[#F5F5F0] tracking-tight">
            {total}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#60717A] dark:text-[#9FB1BC]">
            Total Assigned
          </span>
        </div>
      </div>

      {/* Legend & Percentages */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#DDE8E3]/60 dark:border-[#243338]/60">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-lg bg-[#F5F5F0]/60 dark:bg-[#07121A]/60 text-xs"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0] text-[11px] whitespace-nowrap">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0 text-[11px] ml-1">
              <span className="font-extrabold text-[#071A2B] dark:text-[#F5F5F0]">
                {item.value}
              </span>
              <span className="text-[#60717A] dark:text-[#9FB1BC] text-[10px]">
                ({item.percentage})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
