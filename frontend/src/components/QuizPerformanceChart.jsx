import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Excellent', value: 45, color: '#10B981' }, // Green
  { name: 'Good', value: 35, color: '#3B82F6' },      // Blue
  { name: 'Average', value: 20, color: '#F59E0B' },   // Yellow
];

export default function QuizPerformanceChart() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold mb-4 text-brand-dark">Quiz Performance</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value}%`, 'Score Range']}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
