import React, { useState, useEffect } from 'react';
import { Users, Edit, Trash2, Search, MapPin, Mail } from 'lucide-react';
import { Cliente } from '../types';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteAEditar, setClienteAEditar] = useState<Cliente | null>(null);
  const [clienteAEliminar, setClienteAEliminar] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({ nombre: '', apellido: '', direccion: '' });

  const { isDark } = useTheme();

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
        alert('No se pudieron cargar los clientes');
      }
    };
    cargarClientes();
  }, []);

  const filteredClients = clientes.filter((cliente) => {
    const fullName = `${cliente.nombre} ${cliente.apellido}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      cliente.cedula.includes(searchLower) ||
      cliente.usuario.email.toLowerCase().includes(searchLower)
    );
  });

  const getTotalSpent = (cliente: Cliente) => {
    return cliente.carritos.reduce((total, carrito) => {
      return total + carrito.productos.reduce((carritoTotal, producto) => {
        return carritoTotal + producto.subtotal;
      }, 0);
    }, 0);
  };

  const eliminarCliente = async (id_cliente: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/clientes/${id_cliente}`);
      setClientes((prev) => prev.filter((c) => c.id_cliente !== id_cliente));
      alert('Cliente eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      alert('No se pudo eliminar el cliente');
    }
  };

  const iniciarEdicion = (cliente: Cliente) => {
    setClienteAEditar(cliente);
    setFormData({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      direccion: cliente.direccion,
    });
  };

  const guardarCambios = async () => {
    if (!clienteAEditar) return;

    try {
      const clienteActualizado = {
        ...clienteAEditar,
        nombre: formData.nombre,
        apellido: formData.apellido,
        direccion: formData.direccion,
      };

      await axios.put(`http://localhost:3001/api/clientes/${clienteAEditar.id_cliente}`, clienteActualizado);

      setClientes(clientes.map(c =>
        c.id_cliente === clienteAEditar.id_cliente ? clienteActualizado : c
      ));
      setClienteAEditar(null);
      alert('Cliente actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      alert('No se pudo actualizar el cliente');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <Users className="h-6 w-6 text-blue-600" />
          Gestión de Clientes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Administra la información de los clientes</p>
      </div>

      <div className={`p-4 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredClients.map((cliente) => (
          <div
            key={cliente.id_cliente}
            className={`rounded-lg shadow p-6 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {cliente.nombre} {cliente.apellido}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cliente #{cliente.id_cliente}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => iniciarEdicion(cliente)} className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => setClienteAEliminar(cliente)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <span>{cliente.usuario.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span>{cliente.direccion}</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Cédula:</span>
                  <span>{cliente.cedula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Total gastado:</span>
                  <span className="font-medium">${getTotalSpent(cliente).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Pedidos:</span>
                  <span>{cliente.carritos.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {clienteAEditar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editar Cliente</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                onClick={() => setClienteAEditar(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={guardarCambios}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de eliminación */}
      {clienteAEliminar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg text-center border-2 border-red-600">
            <h2 className="text-xl font-bold text-red-700 mb-4">Confirmar eliminación</h2>
            <p className="mb-6 text-red-600">
              ¿Estás seguro de que quieres eliminar al cliente{' '}
              <strong>{clienteAEliminar.nombre} {clienteAEliminar.apellido}</strong>?<br />
              <span className="font-semibold">Una vez eliminado, no podrás recuperar sus datos.</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                onClick={() => setClienteAEliminar(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  eliminarCliente(clienteAEliminar.id_cliente);
                  setClienteAEliminar(null);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
