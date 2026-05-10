import React, { useState } from 'react';
import { FaDownload, FaEllipsisV, FaRobot, FaChartLine, FaBrain, FaFire } from 'react-icons/fa';
import PredictiveStudyChart from '../components/PredictiveStudyChart';
import ContributionHeatmap from '../components/ContributionHeatmap';
import SkillRadarChart from '../components/SkillRadarChart';
import AIInsights from '../components/AIInsights';

export default function Analytics() {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-fade-in px-4">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-brand-dark flex items-center gap-4">
            Analytics <span className="text-gradient-cyan">Intelligence</span>
          </h1>
          <p className="text-gray-500 mt-3 text-lg font-medium">Advanced insights into your neural learning patterns.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowActions(!showActions)}
            className="p-4 bg-white dark:bg-deep-slate rounded-2xl shadow-xl border border-white/10 hover:scale-105 transition-all text-gray-500"
          >
            <FaEllipsisV />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-3 w-56 glass-2 rounded-2xl shadow-2xl z-50 p-2 animate-fade-in-up border border-white/5">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors text-brand-dark dark:text-white font-medium">
                <FaDownload className="text-electric-cyan" />
                <span>Export PDF Report</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors text-brand-dark dark:text-white font-medium">
                <FaRobot className="text-royal-purple" />
                <span>AI Re-Analysis</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Stats Row - Glassmorphism 2.0 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Learning" 
          value="128.4" 
          unit="hrs" 
          trend="+12%" 
          icon={<FaChartLine className="text-electric-cyan" />}
        />
        <StatCard 
          label="Neural Streak" 
          value="24" 
          unit="days" 
          trend="Peak" 
          icon={<FaFire className="text-orange-500" />}
        />
        <StatCard 
          label="Concept Mastery" 
          value="82" 
          unit="%" 
          trend="+5%" 
          icon={<FaBrain className="text-royal-purple" />}
        />
        <StatCard 
          label="Global Rank" 
          value="1.2k" 
          unit="top" 
          trend="Top 5%" 
          icon={<span className="text-xl">🏆</span>}
        />
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Predictive Analytics & Radar */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-2 p-8 rounded-[40px] shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-brand-dark dark:text-white flex items-center gap-2">
                Predictive Learning Trend
              </h3>
              <span className="text-xs font-bold uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3 py-1 rounded-full">
                ML Predicted
              </span>
            </div>
            <PredictiveStudyChart />
          </div>

          <div className="glass-2 p-8 rounded-[40px] shadow-2xl">
            <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-8">
              Neural Connectivity (Contribution Heatmap)
            </h3>
            <ContributionHeatmap />
          </div>
        </div>

        {/* Right Column: Skill Radar & AI Insights */}
        <div className="space-y-8">
          <div className="glass-2 p-8 rounded-[40px] shadow-2xl h-fit">
            <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-6">Skill Balance Radar</h3>
            <SkillRadarChart />
          </div>

          <AIInsights />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, trend, icon }) {
  return (
    <div className="glass-2 p-8 rounded-[32px] shadow-xl border border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-electric-cyan/10 transition-colors"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xl">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.includes('+') ? 'text-green-400 bg-green-400/10' : 'text-electric-cyan bg-electric-cyan/10'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">{label}</p>
        <h4 className="text-4xl font-bold tabular-nums text-brand-dark dark:text-white">
          {value}<span className="text-lg text-gray-500 ml-1 font-normal">{unit}</span>
        </h4>
      </div>
    </div>
  );
}
