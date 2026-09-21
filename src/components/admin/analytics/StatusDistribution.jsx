import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CheckCircle } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#050A0C]/95 border border-[#1A2E3B] rounded-lg p-2.5 shadow-xl text-xs backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-semibold text-[#F5F5F0]">{data.name}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-[#9FB1BC]">
          <span>Count:</span>
          <span className="font-bold text-[#D4A84F]">{data.count}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-[#9FB1BC]">
          <span>Proportion:</span>
          <span className="font-medium text-[#10B981]">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function StatusDistribution({ data }) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#10B981]" />
            <h2 className="text-sm sm:text-base font-bold text-[#F5F5F0]">
              Complaint Status
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Lifecycle stages across active campus tickets
          </p>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#13242E] text-[#9FB1BC] border border-[#1A2E3B]">
          5 Stages
        </span>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              dataKey="count"
              stroke="#07121A"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Centered Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F0] tracking-tight">
            {total}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#9FB1BC] font-semibold">
            Total In Queue
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-[#1A2E3B]/60 text-xs">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-lg bg-[#07121A] border border-[#1A2E3B]/60"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#F5F5F0] font-medium truncate text-xs">
                {item.name}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-bold text-[#F5F5F0] mr-1">{item.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
