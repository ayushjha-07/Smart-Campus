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
import {
  COMPLAINT_TRENDS_7_DAYS,
  COMPLAINT_TRENDS_30_DAYS,
  COMPLAINT_TRENDS_3_MONTHS,
  COMPLAINT_TRENDS_1_YEAR
} from '../../data/adminDashboardData';

const timeFilterMap = {
  '7 Days': { data: COMPLAINT_TRENDS_7_DAYS, subtitle: 'Complaint volume over the last 7 days' },
  '30 Days': { data: COMPLAINT_TRENDS_30_DAYS, subtitle: 'Complaint volume over the last 30 days' },
  '3 Months': { data: COMPLAINT_TRENDS_3_MONTHS, subtitle: 'Weekly complaint volume over the last 3 months' },
  '1 Year': { data: COMPLAINT_TRENDS_1_YEAR, subtitle: 'Bimonthly complaint volume over the last 1 year' }
};

export default function ComplaintTrendChart() {
  const [activeFilter, setActiveFilter] = useState('30 Days');
  const currentConfig = timeFilterMap[activeFilter] || timeFilterMap['30 Days'];

  return (
    <div className="rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-[#0C1518] border-[#DDE8E3] dark:border-[#1A2E3B] shadow-2xs flex flex-col justify-between h-full">
      {/* Chart Header + Time Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-black tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
            Complaint Trends
          </h3>
          <p className="text-xs font-medium text-[#60717A] dark:text-[#9FB1BC] mt-0.5">
            {currentConfig.subtitle}
          </p>
        </div>

        {/* Time Filters */}
        <div className="inline-flex items-center p-1 rounded-xl border bg-[#F7F9F8] dark:bg-[#07121A] border-[#DDE8E3] dark:border-[#1A2E3B]">
          {['7 Days', '30 Days', '3 Months', '1 Year'].map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#008F63] text-white dark:bg-[#00A875] shadow-xs'
                    : 'text-[#60717A] dark:text-[#9FB1BC] hover:text-[#071A2B] dark:hover:text-[#F5F5F0]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-72 sm:h-80 min-h-[290px]">
        <ResponsiveContainer width="100%" height={290} minWidth={300} minHeight={290} initialDimension={{ width: 700, height: 290 }}>
          <AreaChart
            data={currentConfig.data}
            margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
          >
            <defs>
              {/* Primary Green Gradient (Submitted) */}
              <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#008F63" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#008F63" stopOpacity={0.0} />
              </linearGradient>

              {/* Gold Gradient (Resolved) */}
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A84F" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D4A84F" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#60717A' }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#60717A' }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#0C1518',
                borderColor: '#1A2E3B',
                borderRadius: '12px',
                color: '#F5F5F0',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
              }}
              itemStyle={{ color: '#F5F5F0' }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '14px', fontSize: '11px', fontWeight: 'bold' }}
            />

            <Area
              type="monotone"
              dataKey="submitted"
              name="Submitted"
              stroke="#008F63"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorSubmitted)"
              isAnimationActive={false}
            />

            <Area
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#D4A84F"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorResolved)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
