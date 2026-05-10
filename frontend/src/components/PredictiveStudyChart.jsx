import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { day: 'Mon', actual: 2.5, predicted: 2.5 },
  { day: 'Tue', actual: 3.8, predicted: 3.5 },
  { day: 'Wed', actual: 1.5, predicted: 2.0 },
  { day: 'Thu', actual: 4.2, predicted: 4.0 },
  { day: 'Fri', actual: 3.0, predicted: 3.2 },
  { day: 'Sat', actual: null, predicted: 4.8 },
  { day: 'Sun', actual: null, predicted: 5.2 },
];

export default function PredictiveStudyChart() {
  return (
    <div className="h-80 w-full group">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--electric-cyan)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--electric-cyan)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              borderRadius: '16px', 
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
            }}
            itemStyle={{ color: '#fff' }}
          />
          {/* Actual Data */}
          <Area 
            type="monotone" 
            dataKey="actual" 
            stroke="var(--electric-cyan)" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorActual)" 
            dot={{ r: 4, fill: 'var(--electric-cyan)', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
          {/* Predicted Data */}
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="var(--royal-purple)" 
            strokeWidth={3} 
            strokeDasharray="8 5" 
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
