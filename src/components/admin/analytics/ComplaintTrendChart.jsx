import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { TrendingUp, Info } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#0C1518] p-3 rounded-xl border border-[#DDE8E3] dark:border-[#243338] shadow-xl text-xs space-y-1">
        <p className="font-bold text-[#071A2B] dark:text-[#F5F5F0] border-b border-[#DDE8E3]/60 dark:border-[#243338]/60 pb-1">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-[#60717A] dark:text-[#A8B3B0]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-extrabold text-[#071A2B] dark:text-[#F5F5F0]">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ComplaintTrendChart({ data }) {
  return (
    <div className="bg-white dark:bg-[#0C1518] rounded-2xl border border-[#DDE8E3] dark:border-[#243338] p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#071A2B] dark:text-[#F5F5F0]">
              Complaint Trends
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#008F63]/10 text-[#008F63] dark:bg-[#00A875]/20 dark:text-[#00A875]">
              Weeks 1–8
            </span>
          </div>
          <p className="text-xs text-[#60717A] dark:text-[#A8B3B0] mt-0.5">
            Complaint volume and resolution activity over time
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#008F63] dark:bg-[#00A875]" />
            <span className="text-[#071A2B] dark:text-[#F5F5F0]">Received</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A84F]" />
            <span className="text-[#071A2B] dark:text-[#F5F5F0]">Resolved</span>
          </div>
        </div>
      </div>

      {/* Recharts LineChart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#DDE8E3"
              className="dark:stroke-[#1A2E3B]"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              stroke="#60717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#DDE8E3', strokeWidth: 1 }}
              dy={8}
            />
            <YAxis
              stroke="#60717A"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="received"
              name="Complaints Received"
              stroke="#008F63"
              strokeWidth={3}
              dot={{ r: 4, fill: '#008F63', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#008F63' }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="resolved"
              name="Complaints Resolved"
              stroke="#D4A84F"
              strokeWidth={3}
              dot={{ r: 4, fill: '#D4A84F', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#D4A84F' }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Insight Footer */}
      <div className="mt-4 pt-3.5 border-t border-[#DDE8E3] dark:border-[#243338] flex items-start gap-2.5 bg-[#F7F9F8]/60 dark:bg-white/2 p-3 rounded-xl">
        <Info className="w-4 h-4 text-[#008F63] dark:text-[#00A875] shrink-0 mt-0.5" />
        <p className="text-xs text-[#60717A] dark:text-[#A8B3B0] leading-relaxed">
          <span className="font-semibold text-[#071A2B] dark:text-[#F5F5F0]">Demo Insight:</span>{' '}
          Complaint volume increased during the selected period while resolution activity continued to improve.
        </p>
      </div>
    </div>
  );
}
