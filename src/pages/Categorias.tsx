import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { categorias as initialCategorias } from '../data/mockData';
import { Categoria } from '../types';
import { useTheme } from '../contexts/ThemeContext'; // asegúrate de importar tu contexto correctamente

export default function Categorias() {
  const [categorias, setCategorias] = useState(initialCategorias);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | undefined>();
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      setCategorias(categorias.map(cat =>
        cat.id_categoria === editingCategory.id_categoria
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      const newCategory: Categoria = {
        id_categoria: Math.max(...categorias.map(c => c.id_categoria)) + 1,
        ...formData
      };
      setCategorias([...categorias, newCategory]);
    }

    setFormData({ nombre: '', descripcion: '' });
    setEditingCategory(undefined);
    setIsFormOpen(false);
  };

  const handleEdit = (category: Categoria) => {
    setEditingCategory(category);
    setFormData({ nombre: category.nombre, descripcion: category.descripcion });
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      setCategorias(categorias.filter(cat => cat.id_categoria !== id));
    }
  };

  return (
    <div className={`flex-1 p-6 min-h-screen transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Administra las categorías de productos
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(undefined);
            setFormData({ nombre: '', descripcion: '' });
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Categoría
        </button>
      </div>

      {/* Lista de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div
            key={categoria.id_categoria}
            className={`rounded-lg shadow p-6 transition-shadow ${isDark ? 'bg-gray-800' : 'bg-white'} hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Tag className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold">
                  {categoria.nombre}
                </h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(categoria)}
                  className="text-indigo-600 hover:text-indigo-400"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(categoria.id_categoria)}
                  className="text-red-600 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
              {categoria.descripcion}
            </p>
            <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <span className="text-xs text-gray-500">ID: {categoria.id_categoria}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className={`px-4 py-2 rounded-md text-sm ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingCategory ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
