import React, { useState, useEffect } from 'react';
import { FaDownload, FaEllipsisV, FaRobot, FaChartLine, FaBrain, FaFire } from 'react-icons/fa';
import PredictiveStudyChart from '../components/PredictiveStudyChart';
import ContributionHeatmap from '../components/ContributionHeatmap';
import AIInsights from '../components/AIInsights';
import { fetchRealTimeStats, generateForecastData } from '../services/analyticsService';

export default function Analytics() {
  const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRealTimeStats();
      setStats(data);
      setForecast(generateForecastData(2.5)); // 2.5 hrs/day velocity
      setLoading(false);
    };

    loadData();

    // Polling mechanism (every 10 seconds for "real-time" feel)
    const interval = setInterval(async () => {
      const data = await fetchRealTimeStats();
      setStats(data);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <AnalyticsSkeleton />;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-fade-in px-4">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-brand-dark flex items-center gap-4">
            Analytics <span className="text-gradient-cyan">Intelligence</span>
          </h1>
          <p className="text-gray-500 mt-3 text-lg font-medium">Real-time forecasting and neural learning patterns.</p>
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

      {/* Hero Stats Row - With Live Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Learning" 
          value={stats.totalLearning.toFixed(1)} 
          unit="hrs" 
          trend={stats.trend} 
          icon={<FaChartLine className="text-electric-cyan" />}
          isLive
        />
        <StatCard 
          label="Neural Streak" 
          value={stats.neuralStreak} 
          unit="days" 
          trend="Peak" 
          icon={<FaFire className="text-orange-500" />}
        />
        <StatCard 
          label="Concept Mastery" 
          value={stats.conceptMastery.toFixed(0)} 
          unit="%" 
          trend="+5%" 
          icon={<FaBrain className="text-royal-purple" />}
          isLive
        />
        <StatCard 
          label="Global Rank" 
          value={stats.globalRank} 
          unit="top" 
          trend="Top 5%" 
          icon={<span className="text-xl">🏆</span>}
          isLive
        />
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Predictive Analytics & Radar */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-2 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-brand-dark dark:text-white flex items-center gap-2">
                Predictive Learning Trend
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-electric-cyan animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-electric-cyan">Real-time Forecast</span>
              </div>
            </div>
            <PredictiveStudyChart data={forecast} />
          </div>

          <div className="glass-2 p-8 rounded-[40px] shadow-2xl">
            <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-8">
              Neural Connectivity (Contribution Heatmap)
            </h3>
            <ContributionHeatmap isLive={true} />
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="space-y-8">
          <AIInsights stats={stats} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, trend, icon, isLive }) {
  return (
    <div className="glass-2 p-8 rounded-[32px] shadow-xl border border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan"></span>
          </span>
          <span className="text-[10px] font-bold text-electric-cyan/70 uppercase tracking-tighter">Live</span>
        </div>
      )}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-electric-cyan/10 transition-colors"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xl">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend?.includes('+') ? 'text-green-400 bg-green-400/10' : 'text-electric-cyan bg-electric-cyan/10'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">{label}</p>
        <h4 className="text-4xl font-bold tabular-nums text-brand-dark dark:text-white transition-all duration-500">
          {value}<span className="text-lg text-gray-500 ml-1 font-normal">{unit}</span>
        </h4>
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4 animate-pulse">
      <div className="h-16 w-1/3 bg-gray-200 dark:bg-white/5 rounded-2xl mb-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-48 glass-2 rounded-[32px] animate-shimmer"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[500px] glass-2 rounded-[40px] animate-shimmer"></div>
        <div className="h-[500px] glass-2 rounded-[40px] animate-shimmer"></div>
      </div>
    </div>
  );
}
