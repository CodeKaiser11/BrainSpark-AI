import React from 'react';
import StudyHoursChart from '../components/StudyHoursChart';
import StreakCalendar from '../components/StreakCalendar';
import SubjectProgressChart from '../components/SubjectProgressChart';
import QuizPerformanceChart from '../components/QuizPerformanceChart';
import { FaDownload } from 'react-icons/fa';

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-brand-dark">Analytics Overview</h1>
          <p className="text-gray-500 mt-2">Track your progress and study habits over time.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-sm transition-colors">
          <FaDownload />
          <span>Export Report</span>
        </button>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium mb-2">Total Study Hours</span>
          <span className="text-3xl font-bold text-brand-dark">128<span className="text-xl text-gray-400 font-normal ml-1">hrs</span></span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium mb-2">Best Streak</span>
          <span className="text-3xl font-bold text-brand-orange">24<span className="text-xl text-orange-300 font-normal ml-1">days</span></span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium mb-2">Subjects Mastered</span>
          <span className="text-3xl font-bold text-green-600">4</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium mb-2">Quizzes Completed</span>
          <span className="text-3xl font-bold text-blue-600">42</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Weekly Study Hours */}
        <div className="w-full">
          <StudyHoursChart />
        </div>
        
        {/* Chart 2: Streak Calendar */}
        <div className="w-full">
          <StreakCalendar />
        </div>

        {/* Chart 3: Subject Progress */}
        <div className="w-full">
          <SubjectProgressChart />
        </div>

        {/* Chart 4: Quiz Performance */}
        <div className="w-full">
          <QuizPerformanceChart />
        </div>
      </div>
      
    </div>
  );
}
