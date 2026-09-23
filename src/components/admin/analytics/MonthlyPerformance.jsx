import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { CalendarRange } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const received = payload.find((p) => p.dataKey === 'received')?.value || 0;
    const resolved = payload.find((p) => p.dataKey === 'resolved')?.value || 0;
    const rate = payload.find((p) => p.dataKey === 'rate')?.value || 0;

    return (
      <div className="bg-white dark:bg-[#0C1518] p-3 rounded-xl border border-[#DDE8E3] dark:border-[#243338] shadow-xl text-xs space-y-1.5 min-w-[170px]">
        <div className="font-bold text-[#071A2B] dark:text-[#F5F5F0] border-b border-[#DDE8E3]/60 dark:border-[#243338]/60 pb-1">
          {label} Overview
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[#60717A] dark:text-[#A8B3B0]">
            <span className="w-2 h-2 rounded-xs bg-[#008F63]" /> Received:
          </span>
          <span className="font-bold text-[#071A2B] dark:text-[#F5F5F0]">
            {received}
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
        <div className="flex items-center justify-between pt-1 border-t border-[#DDE8E3]/40 dark:border-[#243338]/40">
          <span className="flex items-center gap-1.5 text-[#60717A] dark:text-[#A8B3B0]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Resolution Rate:
          </span>
          <span className="font-extrabold text-[#10B981]">
            {rate}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function MonthlyPerformance({ data }) {
  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              Monthly Performance
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#008F63]/10 text-[#008F63] dark:bg-[#00A875]/20 dark:text-[#00A875]">
              Jan – Jun 2026
            </span>
          </div>
          <p className="text-xs text-[#60717A] dark:text-[#A8B3B0] mt-0.5">
            Comparison of intake volume, closure counts, and departmental resolution rates
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#008F63] dark:bg-[#00A875]" />
            <span className="text-[#071A2B] dark:text-[#F5F5F0]">Received</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#D4A84F]" />
            <span className="text-[#071A2B] dark:text-[#F5F5F0]">Resolved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-[#10B981]" />
            <span className="text-[#071A2B] dark:text-[#F5F5F0]">Rate (%)</span>
          </div>
        </div>
      </div>

      {/* Composed Chart */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 15, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#DDE8E3"
              className="dark:stroke-[#1A2E3B]"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#60717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#DDE8E3', strokeWidth: 1 }}
            />
            <YAxis
              yAxisId="left"
              stroke="#60717A"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 220]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10B981"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[70, 100]}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="left"
              dataKey="received"
              name="Received"
              fill="#008F63"
              radius={[4, 4, 0, 0]}
              barSize={16}
              isAnimationActive={false}
            />
            <Bar
              yAxisId="left"
              dataKey="resolved"
              name="Resolved"
              fill="#D4A84F"
              radius={[4, 4, 0, 0]}
              barSize={16}
              isAnimationActive={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rate"
              name="Resolution Rate"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#10B981' }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-[#DDE8E3] dark:border-[#243338] flex items-center justify-between text-xs text-[#60717A] dark:text-[#A8B3B0]">
        <div className="flex items-center gap-1.5">
          <CalendarRange className="w-3.5 h-3.5 text-[#008F63] dark:text-[#00A875]" />
          <span>Consistent upward trend in semester resolution efficiency (83% in Jan → 88% in Jun).</span>
        </div>
        <span className="text-[11px] font-bold text-[#10B981]">
          Current Rate: 88%
        </span>
      </div>
    </div>
  );
}
