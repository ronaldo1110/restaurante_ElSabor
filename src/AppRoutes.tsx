// src/AppRoutes.tsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import AuthNeonPage from './components/Auth/AuthNeonPage';
import Layout from './components/Layout/Layout';
import PublicApp from './pages/PublicApp';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Categorias from './pages/Categorias';
import Clientes from './pages/Clientes';
import Ventas from './pages/Ventas';
import Settings from './pages/Settings';

function ProtectedRoute({ children, requiredRole }: { children: JSX.Element; requiredRole?: 'admin' | 'cliente' }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to={user.rol === 'admin' ? '/admin' : '/public'} replace />;
  }

  return children;
}

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to={user.rol === 'admin' ? '/admin' : '/public'} replace /> : <AuthNeonPage />} />

      {/* Cliente */}
      <Route path="/public/*" element={
        <ProtectedRoute requiredRole="cliente">
          <PublicApp />
        </ProtectedRoute>
      } />

      {/* Admin con subrutas */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="configuracion" element={<Settings />} />
      </Route>

      {/* Default */}
      <Route path="/" element={
        user ? (
          <Navigate to={user.rol === 'admin' ? '/admin' : '/public'} replace />
        ) : (
          <Navigate to="/auth" replace />
        )
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
