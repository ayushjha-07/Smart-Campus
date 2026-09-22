import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  PRIORITY_DISTRIBUTION_DATA,
  TOTAL_PRIORITY_COUNT
} from '../../data/adminDashboardData';

export default function PriorityDistribution() {
  return (
    <div className="rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
          Priority Distribution
        </h3>
        <p className="text-xs font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
          Breakdown of active complaints by severity
        </p>
      </div>

      {/* Donut Chart with Center Total */}
      <div className="relative w-full h-52 sm:h-56 min-h-[210px] my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={210} minWidth={200} minHeight={210} initialDimension={{ width: 280, height: 210 }}>
          <PieChart>
            <Pie
              data={PRIORITY_DISTRIBUTION_DATA}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={84}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={false}
            >
              {PRIORITY_DISTRIBUTION_DATA.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0C1518',
                borderColor: '#1A2E3B',
                borderRadius: '12px',
                color: '#F5F5F0',
                fontSize: '12px',
                fontWeight: '600'
              }}
              formatter={(value, name) => [`${value} complaints`, `${name} Priority`]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Count Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0] leading-none">
            {TOTAL_PRIORITY_COUNT.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#60717A] dark:text-[#9FB1BC] mt-1">
            Total Tickets
          </span>
        </div>
      </div>

      {/* Legend & Percentages */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#DDE8E3] dark:border-[#1A2E3B]">
        {PRIORITY_DISTRIBUTION_DATA.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-xl bg-[#F7F9F8] dark:bg-[#07121A] border border-[#DDE8E3] dark:border-[#1A2E3B]/60"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-bold text-[#071A2B] dark:text-[#F5F5F0]">
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-[#071A2B] dark:text-[#F5F5F0]">
                {item.value}
              </span>
              <span className="block text-[10px] font-semibold text-[#60717A] dark:text-[#9FB1BC]">
                {item.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
