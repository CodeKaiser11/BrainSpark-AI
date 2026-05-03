import React from 'react';

// Mock data: 30 days, randomly active (true/false)
const generateMockCalendar = () => {
  return Array.from({ length: 35 }, (_, i) => ({
    id: i,
    active: Math.random() > 0.4,
    level: Math.floor(Math.random() * 4) // 0-3 for color intensity
  }));
};

export default function StreakCalendar() {
  const days = generateMockCalendar();

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-brand-dark">Streak Calendar</h3>
        <span className="text-sm font-bold text-brand-orange bg-orange-50 px-3 py-1 rounded-full">12 Days 🔥</span>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={`head-${i}`} className="text-center text-xs text-gray-400 font-medium mb-1">{d}</div>
        ))}
        
        {days.map((day) => {
          let bg = 'bg-gray-100';
          if (day.active) {
            if (day.level === 1) bg = 'bg-green-200';
            else if (day.level === 2) bg = 'bg-green-400';
            else bg = 'bg-green-500';
          }
          
          return (
            <div 
              key={day.id} 
              className={`aspect-square rounded-md ${bg} transition-all hover:ring-2 hover:ring-offset-1 hover:ring-green-400 cursor-pointer`}
              title={day.active ? `Studied` : 'No activity'}
            ></div>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
        <div className="w-3 h-3 rounded-sm bg-green-200"></div>
        <div className="w-3 h-3 rounded-sm bg-green-400"></div>
        <div className="w-3 h-3 rounded-sm bg-green-500"></div>
        <span>More</span>
      </div>
    </div>
  );
}
