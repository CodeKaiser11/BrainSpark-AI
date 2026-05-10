import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'AI Chat', path: '/chat', icon: '💬' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <aside 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-brand-dark text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 z-30`}
    >
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <span className="text-xl font-bold tracking-tight">BrainSpark</span>
          </Link>
        )}
        {isCollapsed && <span className="text-3xl">🧠</span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-white/10 transition-colors ${isCollapsed ? 'mt-4' : ''}`}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              title={isCollapsed ? item.name : ''}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-brand-orange text-white font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      
      {!isCollapsed && (
        <div className="p-4 m-4 bg-white/5 rounded-2xl border border-white/10 text-center">
          <p className="text-xs text-gray-400 mb-2">Upgrade to Pro for more AI power</p>
          <button className="w-full py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors">
            Get Pro
          </button>
        </div>
      )}
    </aside>
  );
}
