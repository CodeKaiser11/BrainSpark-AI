import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function SkillRadarChart({ stats }) {
  const data = [
    { subject: 'Focus', A: 120, fullMark: 150 },
    { subject: 'Accuracy', A: stats ? stats.conceptMastery : 98, fullMark: 150 },
    { subject: 'Consistency', A: 86, fullMark: 150 },
    { subject: 'Retention', A: 99, fullMark: 150 },
    { subject: 'Speed', A: 85, fullMark: 150 },
  ];
  return (
    <div className="h-72 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="var(--electric-cyan)"
            fill="var(--electric-cyan)"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
