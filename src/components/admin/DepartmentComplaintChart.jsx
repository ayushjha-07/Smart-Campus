import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { DEPARTMENT_COMPLAINTS_DATA } from '../../data/adminDashboardData';

export default function DepartmentComplaintChart() {
  return (
    <div className="rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Department-wise Complaints
          </h3>
          <p className="text-xs font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
            Current complaint distribution across departments
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#60717A] dark:text-[#9FB1BC] bg-[#F7F9F8] dark:bg-[#07121A] px-3 py-1 rounded-xl border border-[#DDE8E3] dark:border-[#1A2E3B]">
          <span>Total: 9 Active Units</span>
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="w-full h-80 sm:h-96 min-h-[340px] min-w-[320px] overflow-x-auto">
        <ResponsiveContainer width="100%" height={340} minWidth={320} minHeight={340} initialDimension={{ width: 1000, height: 340 }}>
          <BarChart
            layout="vertical"
            data={DEPARTMENT_COMPLAINTS_DATA}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.15} />

            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#60717A' }}
            />

            <YAxis
              type="category"
              dataKey="department"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#60717A', fontWeight: 600 }}
              width={100}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#0C1518',
                borderColor: '#1A2E3B',
                borderRadius: '12px',
                color: '#F5F5F0',
                fontSize: '12px',
                fontWeight: '600'
              }}
              formatter={(value) => [`${value} complaints`, 'Volume']}
            />

            <Bar dataKey="count" radius={[0, 6, 6, 0]} isAnimationActive={false}>
              {DEPARTMENT_COMPLAINTS_DATA.map((entry) => (
                <Cell key={`bar-${entry.department}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
