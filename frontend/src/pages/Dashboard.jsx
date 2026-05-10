import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import FeatureGrid from '../components/FeatureGrid';
import ActivityFeed from '../components/ActivityFeed';
import GoalProgress from '../components/GoalProgress';

export default function Dashboard() {
  const { user: contextUser } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/auth/me');
        if (res.data && res.data.user) {
          setDbUser(res.data.user);
        }
      } catch (err) {
        console.error('Error fetching user data', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const user = dbUser || contextUser;
  
  const stats = [
    { label: 'Study Hours', value: '24hrs', icon: '⏱️', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Day Streak', value: `${user?.streak || 0}`, icon: '🔥', color: 'text-brand-orange', bg: 'bg-orange-50' },
    { label: 'Quizzes Done', value: '12', icon: '📝', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Notes Saved', value: '8', icon: '📚', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const features = [
    { name: 'AI Chat', icon: '💬', desc: 'Chat with Gemini 2.0', path: '/chat', active: true },
    { name: 'Mind Maps', icon: '🧠', desc: 'Visual learning', path: '/mindmaps', active: true },
    { name: 'Snap & Solve', icon: '📸', desc: 'Photo equations', path: '/snapsolve', active: true },
    { name: 'Notes', icon: '📝', desc: 'AI Summaries', path: '/notes', active: true },
    { name: 'Quizzes', icon: '🎯', desc: 'Test yourself', path: '/quizzes', active: true },
    { name: 'YouTube', icon: '▶️', desc: 'Video summaries', path: '/youtube', active: true },
  ];

  const activities = [
    { title: 'Chatted with AI Tutor', time: '2 hours ago', icon: '💬' },
    { title: 'Completed Biology Quiz', time: 'Yesterday', icon: '🎯' },
    { title: 'Saved "Quantum Physics" notes', time: '3 days ago', icon: '📚' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      
      {/* Main Content Area */}
      <div className="space-y-8">
        
        {/* Welcome Section */}
        <section className="opacity-0 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 text-brand-dark">Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className="text-gray-600 text-lg">You're on a {user?.streak || 0}-day streak 🔥 Keep it up!</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-in-up delay-200">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </section>

        {/* Study Tools */}
        <FeatureGrid features={features} />

        {/* New Bottom Section for Goals and Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>🎯</span> Daily Goal
            </h3>
            <GoalProgress />
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>⚡</span> Recent Activity
            </h3>
            <ActivityFeed activities={activities} />
          </div>
        </section>
      </div>

    </div>
  );
}
