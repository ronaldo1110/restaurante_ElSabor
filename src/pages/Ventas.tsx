import React, { useState } from 'react';
import { Download, Search, Calendar } from 'lucide-react';
import { ventas as initialVentas, clientes, productos } from '../data/mockData';
import { Venta } from '../types';
import jsPDF from 'jspdf';
import { useTheme } from '../contexts/ThemeContext';

export default function Ventas() {
  const [ventas] = useState(initialVentas);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const { isDark } = useTheme();

  const getClienteName = (clienteId: number) => {
    const cliente = clientes.find(c => c.id_cliente === clienteId);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente no encontrado';
  };

  const getProductName = (productId: number) => {
    const product = productos.find(p => p.id_producto === productId);
    return product ? product.nombre : 'Producto no encontrado';
  };

  const generatePDF = (venta: Venta) => {
    const doc = new jsPDF();
    const cliente = clientes.find(c => c.id_cliente === venta.id_cliente);

    doc.setFontSize(20);
    doc.text('FACTURA DE VENTA', 20, 20);

    doc.setFontSize(12);
    doc.text('Restaurante Virtual', 20, 40);
    doc.text('Dirección del Restaurante', 20, 50);
    doc.text('Teléfono: (593) 123-4567', 20, 60);

    doc.text(`Factura #: ${venta.id_venta}`, 120, 40);
    doc.text(`Fecha: ${new Date(venta.fecha).toLocaleDateString()}`, 120, 50);

    if (cliente) {
      doc.text('CLIENTE:', 20, 80);
      doc.text(`${cliente.nombre} ${cliente.apellido}`, 20, 90);
      doc.text(`Cédula: ${cliente.cedula}`, 20, 100);
      doc.text(`Dirección: ${cliente.direccion}`, 20, 110);
    }

    let y = 130;
    doc.text('PRODUCTO', 20, y);
    doc.text('CANTIDAD', 80, y);
    doc.text('PRECIO UNIT.', 120, y);
    doc.text('TOTAL', 160, y);

    y += 10;
    venta.detalles.forEach((detalle) => {
      const productName = getProductName(detalle.id_producto);
      doc.text(productName, 20, y);
      doc.text(detalle.cantidad.toString(), 80, y);
      doc.text(`$${detalle.precio_unitario.toFixed(2)}`, 120, y);
      doc.text(`$${detalle.subtotal.toFixed(2)}`, 160, y);
      y += 10;
    });

    y += 10;
    doc.text(`Subtotal: $${venta.subtotal.toFixed(2)}`, 120, y);
    y += 10;
    doc.text(`Impuestos: $${venta.impuestos.toFixed(2)}`, 120, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`TOTAL: $${venta.total.toFixed(2)}`, 120, y);

    doc.save(`factura-${venta.id_venta}.pdf`);
  };

  const filteredVentas = ventas.filter(venta => {
    const cliente = clientes.find(c => c.id_cliente === venta.id_cliente);
    const clienteName = cliente ? `${cliente.nombre} ${cliente.apellido}`.toLowerCase() : '';
    const matchesSearch = clienteName.includes(searchTerm.toLowerCase()) ||
      venta.id_venta.toString().includes(searchTerm);

    const ventaDate = new Date(venta.fecha).toISOString().split('T')[0];
    const matchesDate = !dateFilter || ventaDate === dateFilter;

    return matchesSearch && matchesDate;
  });

  return (
    <main className={`pl-[240px] pr-6 py-8 min-h-screen transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Encabezado */}
        <div className="ml-2">
          <h1 className="text-3xl font-bold">Gestión de Ventas</h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Administra las ventas y genera facturas
          </p>
        </div>

        {/* Filtros */}
        <div className={`ml-2 mr-4 p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center gap-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por cliente o ID de venta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 w-full rounded-md border shadow-sm focus:ring focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>
          <div className="relative md:w-64">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={`pl-10 w-full rounded-md border shadow-sm focus:ring focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row gap-6 ml-2 mr-4">
          {/* Tabla */}
          <div className={`rounded-lg shadow p-4 w-full lg:w-[48%] min-w-[300px] ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}>
                  <tr>
                    {['ID Venta', 'Cliente', 'Fecha', 'Total', 'Productos', 'Acciones'].map((col, i) => (
                      <th key={i} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVentas.map((venta) => (
                    <tr key={venta.id_venta} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className="px-4 py-2 text-sm font-medium">#{venta.id_venta}</td>
                      <td className="px-4 py-2 text-sm">{getClienteName(venta.id_cliente)}</td>
                      <td className="px-4 py-2 text-sm">{new Date(venta.fecha).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-sm font-medium">${venta.total.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm">{venta.detalles.length} productos</td>
                      <td className="px-4 py-2 text-sm">
                        <button
                          onClick={() => generatePDF(venta)}
                          className="text-green-500 hover:text-green-400"
                          title="Descargar PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detalles */}
          <div className={`rounded-lg shadow p-6 flex-grow w-full lg:w-[52%] min-w-[300px] ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {filteredVentas.slice(0, 2).map((venta) => (
              <div key={venta.id_venta} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Venta #{venta.id_venta}</h3>
                  <button
                    onClick={() => generatePDF(venta)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Cliente:</span>
                    <span className="ml-2 text-sm">{getClienteName(venta.id_cliente)}</span>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500">Productos:</span>
                    <div className="mt-2 space-y-2">
                      {venta.detalles.map((detalle, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{getProductName(detalle.id_producto)} x{detalle.cantidad}</span>
                          <span>${detalle.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal:</span>
                      <span>${venta.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Impuestos:</span>
                      <span>${venta.impuestos.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>${venta.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
