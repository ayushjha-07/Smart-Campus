import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { BarChart3, ShieldAlert } from 'lucide-react';
import { priorityDistributionChart } from '../../data/mockStudentData';

export default function PrioritySummary({ priorityData = null }) {
  const chartData = priorityData
    ? [
        { priority: 'Critical', count: priorityData.CRITICAL || 0, fill: '#ef4444' },
        { priority: 'High', count: priorityData.HIGH || 0, fill: '#D4A84F' },
        { priority: 'Medium', count: priorityData.MEDIUM || 0, fill: '#71844A' },
        { priority: 'Low', count: priorityData.LOW || 0, fill: '#315C3A' }
      ]
    : priorityDistributionChart;

  return (
    <div className="bg-[#0D1B22]/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#F5F5F0]">
            Priority Distribution
          </h3>
          <p className="text-xs text-[#A8B3B0]">Severity categorization index</p>
        </div>
        <div className="p-2 rounded-xl bg-[#07121A] text-[#D4A84F] border border-white/10">
          <BarChart3 className="w-4 h-4" />
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="h-52 w-full my-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <XAxis
              type="number"
              stroke="#A8B3B0"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="priority"
              stroke="#F5F5F0"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              width={65}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#07121A',
                borderColor: '#315C3A',
                borderRadius: '12px',
                fontSize: '11px',
                color: '#F5F5F0',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8)',
              }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
              {priorityDistributionChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Breakdown */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#A8B3B0]">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span>1 Critical active ticket</span>
        </div>
        <span className="font-mono text-[#D4A84F]">Avg Response: 1.8 hrs</span>
      </div>

    </div>
  );
}
