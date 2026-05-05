import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark font-sans flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        <Navbar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
