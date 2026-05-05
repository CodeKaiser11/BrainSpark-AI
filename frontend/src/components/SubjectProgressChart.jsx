import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { subject: 'Math', progress: 85, color: '#3B82F6' },
  { subject: 'Science', progress: 65, color: '#10B981' },
  { subject: 'English', progress: 92, color: '#8B5CF6' },
];

export default function SubjectProgressChart() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold mb-4 text-brand-dark">Subject Progress</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontWeight: 500 }} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value}%`, 'Progress']}
            />
            <Bar dataKey="progress" radius={[0, 8, 8, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
