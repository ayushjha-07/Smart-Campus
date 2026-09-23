import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Building2 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.find((p) => p.dataKey === 'total')?.value || 0;
    const resolved = payload.find((p) => p.dataKey === 'resolved')?.value || 0;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return (
      <div className="bg-white dark:bg-[#0C1518] p-3 rounded-xl border border-[#DDE8E3] dark:border-[#243338] shadow-xl text-xs space-y-1.5 min-w-[160px]">
        <div className="font-bold text-[#071A2B] dark:text-[#F5F5F0] border-b border-[#DDE8E3]/60 dark:border-[#243338]/60 pb-1 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] font-semibold text-[#008F63] dark:text-[#00A875]">
            {rate}% Closed
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[#60717A] dark:text-[#A8B3B0]">
            <span className="w-2 h-2 rounded-xs bg-[#008F63]" /> Total:
          </span>
          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">
            {total}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[#60717A] dark:text-[#A8B3B0]">
            <span className="w-2 h-2 rounded-xs bg-[#D4A84F]" /> Resolved:
          </span>
          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">
            {resolved}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function DepartmentAnalytics({ data }) {
  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              Department-wise Complaints
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#008F63]/10 text-[#008F63] dark:bg-[#00A875]/20 dark:text-[#00A875]">
              8 Departments
            </span>
          </div>
          <p className="text-xs text-[#60717A] dark:text-[#A8B3B0] mt-0.5">
            Complaint volume and resolution performance by department
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#008F63] dark:bg-[#00A875]" />
            <span className="text-[#071A2B] dark:text-[#F5F5F0]">Total Complaints</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#D4A84F]" />
            <span className="text-[#071A2B] dark:text-[#F5F5F0]">Resolved</span>
          </div>
        </div>
      </div>

      {/* Horizontal BarChart */}
      <div className="h-80 sm:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            barCategoryGap={10}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#DDE8E3"
              className="dark:stroke-[#1A2E3B]"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#60717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#DDE8E3', strokeWidth: 1 }}
            />
            <YAxis
              type="category"
              dataKey="department"
              stroke="#60717A"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="total"
              name="Total Complaints"
              fill="#008F63"
              radius={[0, 4, 4, 0]}
              barSize={12}
              isAnimationActive={false}
            />
            <Bar
              dataKey="resolved"
              name="Resolved"
              fill="#D4A84F"
              radius={[0, 4, 4, 0]}
              barSize={12}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Benchmark Insight */}
      <div className="mt-4 pt-3 border-t border-[#DDE8E3] dark:border-[#243338] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#60717A] dark:text-[#A8B3B0]">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#008F63] dark:text-[#00A875]" />
          <span>
            Hostel has the highest intake (<span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">245</span>), while Library and Security lead in closure efficiency.
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#008F63] dark:text-[#00A875]">
          Institutional Target: ≥ 60%
        </span>
      </div>
    </div>
  );
}
