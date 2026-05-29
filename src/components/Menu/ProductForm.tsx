import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Producto } from '../../types';

interface ProductFormProps {
  showModal: boolean;
  onClose: () => void;
  onProductSaved: (product: Producto) => void;
  product?: Producto;
}

const ProductForm: React.FC<ProductFormProps> = ({
  showModal,
  onClose,
  onProductSaved,
  product
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    popularidad: ''
  });

  const [imagen, setImagen] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        categoria: product.categoria,
        precio: product.precio.toString(),
        stock: product.stock.toString(),
        popularidad: product.popularidad
      });
    } else {
      setFormData({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        popularidad: ''
      });
      setImagen(null);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (imagen) {
        data.append('imagen', imagen);
      }

      let response;

      if (product?._id) {
        // Usar el _id real de Mongo para editar
        response = await axios.put(
          `http://localhost:3001/api/productos/${product._id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        response = await axios.post('http://localhost:3001/api/productos', data);
      }

      alert(`✅ Producto ${product ? 'actualizado' : 'guardado'} correctamente`);
      onClose();
      onProductSaved(response.data);
    } catch (error) {
      console.error('❌ Error al guardar producto:', error);
      alert('Error al guardar producto');
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {product ? 'Editar Producto' : 'Agregar Producto'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="Comida Ecuatoriana">Comida Ecuatoriana</option>
            <option value="Postres">Postres</option>
            <option value="Comida Internacional">Comida Internacional</option>
            <option value="Complementos y servicios">Complementos y servicios</option>
          </select>

          <input
            type="number"
            step="0.01"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="popularidad"
            value={formData.popularidad}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccionar popularidad</option>
            <option value="muy popular">Muy popular</option>
            <option value="popular">Popular</option>
            <option value="con potencial">Con potencial</option>
            <option value="poco conocido">Poco conocido</option>
          </select>

          {product?.imagen_id && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
              <img
                src={`http://localhost:3001/uploads/${product.imagen_id}`}
                alt="Imagen del producto"
                className="w-32 h-32 object-contain rounded mx-auto"
              />
            </div>
          )}

          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Guardar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
