import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Study Hours', value: '24hrs', icon: '⏱️', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Day Streak', value: `${user?.streak || 0}`, icon: '🔥', color: 'text-brand-orange', bg: 'bg-orange-50' },
    { label: 'Quizzes Done', value: '12', icon: '📝', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Notes Saved', value: '8', icon: '📚', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const features = [
    { name: 'AI Chat', icon: '💬', desc: 'Chat with Gemini 2.0', path: '/chat', active: true },
    { name: 'Mind Maps', icon: '🧠', desc: 'Visual learning', active: false },
    { name: 'Snap & Solve', icon: '📸', desc: 'Photo equations', active: false },
    { name: 'Notes', icon: '📝', desc: 'AI Summaries', active: false },
    { name: 'Quizzes', icon: '🎯', desc: 'Test yourself', active: false },
    { name: 'YouTube', icon: '▶️', desc: 'Video summaries', active: false },
  ];

  const activities = [
    { title: 'Chatted with AI Tutor', time: '2 hours ago', icon: '💬' },
    { title: 'Completed Biology Quiz', time: 'Yesterday', icon: '🎯' },
    { title: 'Saved "Quantum Physics" notes', time: '3 days ago', icon: '📚' },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        
        {/* Welcome Section */}
        <section>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className="text-gray-600 text-lg">You're on a {user?.streak || 0}-day streak 🔥 Keep it up!</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-500 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Study Tools */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Study Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              feature.active ? (
                <Link key={i} to={feature.path} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-orange hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                  <div className="text-4xl bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-brand-orange transition-colors">{feature.name}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </Link>
              ) : (
                <div key={i} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 opacity-60 cursor-not-allowed flex items-center gap-4">
                  <div className="text-4xl bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center grayscale">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-700">{feature.name}</h3>
                    <p className="text-gray-500 text-sm text-xs mt-1 bg-gray-200 inline-block px-2 py-0.5 rounded-full">Coming Soon</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-80 space-y-6">
        
        {/* Today's Goal */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span>🎯</span> Today's Goal
          </h3>
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-gray-600">Daily Study Target</span>
            <span className="text-brand-orange">65%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
            <div className="bg-brand-orange h-3 rounded-full w-[65%]"></div>
          </div>
          <p className="text-sm text-gray-500">1 hour 15 mins remaining to hit your target.</p>
        </div>

        {/* Quick Ask AI */}
        <div className="bg-gradient-to-br from-brand-orange to-orange-600 p-6 rounded-2xl shadow-md text-white">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span>✨</span> Quick Ask AI
          </h3>
          <p className="text-orange-100 text-sm mb-4">Have a quick question? Ask Gemini right here.</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="E.g. What is mitosis?" 
              className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white placeholder-orange-200 outline-none focus:bg-white/30 transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-white text-brand-orange w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:scale-105 transition-transform">
              →
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span>⏱️</span> Recent Activity
          </h3>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex gap-4 items-start relative">
                {i !== activities.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-16px] w-px bg-gray-100"></div>
                )}
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 z-10">
                  {activity.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{activity.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </aside>

    </div>
  );
}
