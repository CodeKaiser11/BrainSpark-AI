import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-brand-cream/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center ml-64">
      <div>
        {/* Can put breadcrumbs or page title here if needed */}
      </div>
      <div className="flex items-center gap-4">
        <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="text-right">
            <div className="text-sm font-bold text-brand-dark">{user?.name || 'Student'}</div>
            <div className="text-xs text-gray-500">Level 5 Learner</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
        </Link>
      </div>
    </header>
  );
}
