import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AIFloatingAgent from './AIFloatingAgent';

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark font-sans flex transition-all duration-300">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar isSidebarCollapsed={isSidebarCollapsed} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      <AIFloatingAgent />
    </div>
  );
}
