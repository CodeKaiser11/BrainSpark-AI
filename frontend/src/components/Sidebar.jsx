import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'AI Chat', path: '/chat', icon: '💬' },
  ];

  return (
    <aside className="w-64 bg-brand-dark text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="text-3xl">🧠</span>
          <span className="text-xl font-bold tracking-tight">BrainSpark</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-brand-orange text-white font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
