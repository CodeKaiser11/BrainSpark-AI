import React from 'react';
import { FaLightbulb, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function AIInsights() {
  const insights = [
    {
      type: 'Peak Productivity',
      text: 'You are most productive between 10 AM - 12 PM. Try scheduling your hardest subjects then.',
      icon: <FaClock className="text-electric-cyan" />,
      color: 'bg-electric-cyan/10'
    },
    {
      type: 'Retention Alert',
      text: 'Your accuracy in Mathematics drops after 90 minutes. Take a break to reset focus.',
      icon: <FaExclamationTriangle className="text-orange-400" />,
      color: 'bg-orange-400/10'
    },
    {
      type: 'Success Pattern',
      text: 'Quiz scores improve by 15% when you use Flashcards right before.',
      icon: <FaCheckCircle className="text-green-400" />,
      color: 'bg-green-400/10'
    }
  ];

  return (
    <div className="glass-2 p-8 rounded-[40px] shadow-2xl space-y-6">
      <h3 className="text-xl font-bold text-brand-dark dark:text-white flex items-center gap-2">
        <FaLightbulb className="text-yellow-400" /> AI Focus Insights
      </h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
            <div className={`p-3 rounded-xl h-fit ${insight.color} transform group-hover:scale-110 transition-transform`}>
              {insight.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{insight.type}</p>
              <p className="text-sm text-brand-dark dark:text-gray-300 leading-relaxed font-medium">{insight.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
