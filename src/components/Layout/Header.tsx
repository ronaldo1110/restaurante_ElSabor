import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { isDark } = useTheme();

  return (
    <header
      className={`w-full max-w-full shadow-sm border-b transition-colors ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{ minWidth: 0 }} // importante para evitar overflow en flex layouts
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-full">
        <div className="flex items-center">
          <button
            type="button"
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
            }`}
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2
            className={`ml-2 text-xl font-semibold lg:ml-0 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Panel de Administración
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className={`p-2 rounded-md relative transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span
              className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
