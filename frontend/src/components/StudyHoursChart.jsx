import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.2 },
  { day: 'Fri', hours: 3.0 },
  { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 4.0 },
];

export default function StudyHoursChart() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold mb-4 text-brand-dark">Weekly Study Hours</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#F97316" 
              strokeWidth={4} 
              dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
