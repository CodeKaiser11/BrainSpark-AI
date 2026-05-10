import React from 'react';

export default function ContributionHeatmap() {
  // Generate mock data for a 20-week period
  const weeks = 24;
  const days = 7;
  const data = Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5));

  const getColor = (val) => {
    if (val === 0) return 'rgba(255, 255, 255, 0.05)';
    if (val === 1) return 'rgba(34, 211, 238, 0.2)';
    if (val === 2) return 'rgba(34, 211, 238, 0.4)';
    if (val === 3) return 'rgba(34, 211, 238, 0.7)';
    return 'rgba(34, 211, 238, 0.9)';
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-2 min-w-[600px]">
        {Array.from({ length: weeks }).map((_, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-2">
            {Array.from({ length: days }).map((_, dIndex) => {
              const value = data[wIndex * days + dIndex];
              return (
                <div
                  key={dIndex}
                  className="w-4 h-4 rounded-sm transition-all duration-500 hover:scale-125 cursor-pointer relative group"
                  style={{ backgroundColor: getColor(value) }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-deep-slate text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 z-10">
                    {value} hours of neural focus
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
        <span>Less Focus</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(v => (
            <div key={v} className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(v) }} />
          ))}
        </div>
        <span>High Focus</span>
      </div>
    </div>
  );
}
