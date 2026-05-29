import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Menú', href: '/admin/menu', icon: UtensilsCrossed },
  { name: 'Categorías', href: '/admin/categorias', icon: Tags },
  { name: 'Clientes', href: '/admin/clientes', icon: Users },
  { name: 'Ventas', href: '/admin/ventas', icon: ShoppingCart },
  { name: 'Reportes', href: '/admin/reportes', icon: FileText },
  { name: 'Configuración', href: '/admin/configuracion', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const { isDark } = useTheme();

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'z-30 w-64 h-screen flex flex-col justify-between overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out',
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
          'fixed top-0 left-0', // siempre en esquina superior izquierda
          isOpen ? 'translate-x-0' : '-translate-x-full', // para animación en móvil
          'lg:translate-x-0 lg:static' // en escritorio, visible fijo
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <h1 className="text-xl font-bold text-white">RestauranteAdmin</h1>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )
              }
              onClick={onClose}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="px-4 pb-4">
          <button
            onClick={logout}
            className={clsx(
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-colors',
              isDark
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
