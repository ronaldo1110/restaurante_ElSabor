import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../contexts/ThemeContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
   <div className={`flex min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
  {/* Sidebar fijo */}
  <div className="hidden lg:block fixed inset-y-0 left-0 w-64 z-40">
    <Sidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
  </div>

  {/* Sidebar móvil */}
  <div className="lg:hidden">
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  </div>

  {/* Contenido principal */}
  <div className="flex flex-col flex-1 w-full lg:ml-64 min-h-screen" style={{ minWidth: 0 }}>
    <Header onMenuClick={() => setSidebarOpen(true)} />
    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
      <Outlet />
    </main>
  </div>
</div>
);}
