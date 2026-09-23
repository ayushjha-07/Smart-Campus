import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#0C1518] p-2.5 rounded-xl border border-[#DDE8E3] dark:border-[#243338] shadow-xl text-xs space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">
            {data.name}
          </span>
        </div>
        <div className="text-[11px] text-[#60717A] dark:text-[#A8B3B0]">
          Count:{' '}
          <span className="font-extrabold text-[#071A2B] dark:text-[#F5F5F0]">
            {data.value}
          </span>{' '}
          ({data.percentage})
        </div>
      </div>
    );
  }
  return null;
};

export default function StatusDistribution({ data }) {
  const totalCount = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Complaint Status
          </h2>
          <span className="text-[11px] font-semibold text-[#60717A] dark:text-[#A8B3B0]">
            Lifecycle Distribution
          </span>
        </div>
        <p className="text-xs text-[#60717A] dark:text-[#A8B3B0]">
          Active status across all campus tickets
        </p>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative my-3 h-52 w-full flex items-center justify-center">
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
              outerRadius={88}
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

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            {totalCount.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#60717A] dark:text-[#A8B3B0]">
            Total
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="space-y-1.5 pt-2 border-t border-[#DDE8E3] dark:border-[#243338]">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-xs py-0.5"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-[#071A2B] dark:text-[#F5F5F0]">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">
                {item.value}
              </span>
              <span className="text-[11px] text-[#60717A] dark:text-[#A8B3B0] w-12 text-right">
                {item.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
