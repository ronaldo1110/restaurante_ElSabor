import { DollarSign, Users, Package, TrendingUp, LayoutDashboard } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import SalesChart from '../components/Dashboard/SalesChart';
import PopularProducts from '../components/Dashboard/PopularProducts';
import { dashboardStats } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

export default function Dashboard() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen px-4 sm:px-6 lg:px-8 py-6 transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Encabezado con ícono */}
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-7 w-7 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Resumen del negocio en tiempo real</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Ventas Totales"
            value={`$${dashboardStats.totalVentas}`}
            icon={DollarSign}
            color="blue"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Ventas Hoy"
            value={`$${dashboardStats.ventasHoy}`}
            icon={TrendingUp}
            color="green"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Total Clientes"
            value={dashboardStats.clientesTotal}
            icon={Users}
            color="purple"
            trend={{ value: 3.1, isPositive: true }}
          />
          <StatsCard
            title="Productos"
            value={dashboardStats.productosTotal}
            icon={Package}
            color="yellow"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h2 className="text-lg font-semibold mb-4">Ventas por mes</h2>
            <SalesChart data={dashboardStats.ventasPorMes} />
          </div>
          <div className={`rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h2 className="text-lg font-semibold mb-4">Productos populares</h2>
            <PopularProducts data={dashboardStats.productosPopulares} />
          </div>
        </div>

        {/* Recent Orders */}
        <div className={`rounded-lg shadow ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className="text-lg font-semibold">Pedidos Recientes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody className={isDark ? 'bg-gray-800 divide-y divide-gray-700' : 'bg-white divide-y divide-gray-200'}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Leonidas Inca</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Entregado
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">$36.63</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">02 Jun 2025</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Ana Arias</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Enviado
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">$29.89</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">03 Jun 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
