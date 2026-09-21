import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { ArrowUpDown, Layers } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#050A0C]/95 border border-[#1A2E3B] rounded-lg p-2.5 shadow-xl text-xs backdrop-blur-md">
        <div className="font-semibold text-[#F5F5F0] mb-1">{data.category}</div>
        <div className="flex items-center justify-between gap-4 text-[#9FB1BC]">
          <span>Complaints:</span>
          <span className="font-bold text-[#D4A84F]">{data.count}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-[#9FB1BC]">
          <span>Share:</span>
          <span className="font-medium text-[#71844A]">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CategoryAnalysis({ data }) {
  const [sortOrder, setSortOrder] = useState('highest'); // 'highest' | 'lowest'

  const sortedData = [...data].sort((a, b) => {
    return sortOrder === 'highest' ? b.count - a.count : a.count - b.count;
  });

  return (
    <div className="bg-[#0D1B22] border border-[#1A2E3B] rounded-xl p-5 shadow-lg flex flex-col justify-between h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1A2E3B]/80">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D4A84F]" />
            <h2 className="text-sm sm:text-base font-bold text-[#F5F5F0]">
              Complaints by Category
            </h2>
          </div>
          <p className="text-xs text-[#9FB1BC] mt-0.5">
            Breakdown across campus services and facilities
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1 bg-[#07121A] p-0.5 rounded-lg border border-[#1A2E3B]">
          <button
            type="button"
            onClick={() => setSortOrder('highest')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              sortOrder === 'highest'
                ? 'bg-[#315C3A] text-[#F5F5F0] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            Highest
          </button>
          <button
            type="button"
            onClick={() => setSortOrder('lowest')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
              sortOrder === 'lowest'
                ? 'bg-[#315C3A] text-[#F5F5F0] shadow-sm'
                : 'text-[#9FB1BC] hover:text-[#F5F5F0]'
            }`}
          >
            Lowest
          </button>
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              type="number"
              stroke="#9FB1BC"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1A2E3B' }}
            />
            <YAxis
              type="category"
              dataKey="category"
              stroke="#F5F5F0"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1A2E3B' }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={16}>
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || '#315C3A'}
                  opacity={0.9}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="mt-2 pt-2 border-t border-[#1A2E3B]/60 flex items-center justify-between text-[11px] text-[#9FB1BC]">
        <span>Top Category: <strong className="text-[#F5F5F0]">Infrastructure (48)</strong></span>
        <span className="text-[#D4A84F] flex items-center gap-1">
          <ArrowUpDown className="w-3 h-3" />
          Sorted by {sortOrder}
        </span>
      </div>
    </div>
  );
}
