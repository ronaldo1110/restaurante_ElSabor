import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Utensils } from 'lucide-react';
import ProductForm from '../components/Menu/ProductForm';
import axios from 'axios';
import type { Producto } from '../types';

export default function Menu() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | undefined>(undefined);

  const fetchProductos = () => {
    axios.get('http://localhost:3001/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos desde BD', err));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const filteredProducts = productos.filter(product => {
    const matchesSearch =
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.categoria === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = () => {
    fetchProductos();
    setIsFormOpen(false);
    setProductoSeleccionado(undefined);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await axios.delete(`http://localhost:3001/api/productos/${id}`);
        fetchProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto');
      }
    }
  };

  const handleEditProduct = (product: Producto) => {
    setProductoSeleccionado(product);
    setIsFormOpen(true);
  };

  const getPopularityColor = (popularidad: string) => {
    switch (popularidad) {
      case 'muy popular': return 'bg-green-100 text-green-800';
      case 'popular': return 'bg-blue-100 text-blue-800';
      case 'con potencial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Sin stock', color: 'bg-red-100 text-red-800' };
    if (stock < 10) return { text: 'Stock bajo', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'En stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Utensils className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Menú</h1>
            <p className="text-gray-600 dark:text-gray-400">Administra los productos del restaurante</p>
          </div>
        </div>
        <button
          onClick={() => {
            setProductoSeleccionado(undefined);
            setIsFormOpen(true);
          }}
          className="bg-orange-600 hover:bg-orange-600 text-white px-5 py-2 rounded-md flex items-center shadow"
          aria-label="Agregar nuevo producto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Producto
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              aria-label="Buscar productos"
            />
          </div>
        </div>
        <div className="md:w-48">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {['Comida Ecuatoriana', 'Postres', 'Comida Internacional', 'Complementos y servicios'].map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Popularidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map(product => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <tr key={product._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <img
                        src={`http://localhost:3001/uploads/${product.imagen_id}`}
                        alt={product.nombre}
                        className="w-[150px] h-[150px] object-contain rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{product.nombre}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Código: {product.codigo}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{product.categoria}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${product.precio.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900 dark:text-white">{product.stock} unidades</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPopularityColor(product.popularidad)}`}>
                        {product.popularidad}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-orange-600 hover:text-blue-900"
                          aria-label={`Editar producto ${product.nombre}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        {product._id && (
                          <button
                            onClick={() => handleDeleteProduct(product._id!)}
                            className="text-red-600 hover:text-red-900"
                            aria-label={`Eliminar producto ${product.nombre}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ProductForm
        showModal={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setProductoSeleccionado(undefined);
        }}
        onProductSaved={handleSaveProduct}
        product={productoSeleccionado}
      />
    </div>
  );
}
