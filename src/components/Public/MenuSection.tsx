import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

interface Producto {
  _id?: string;
  id_producto: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  popularidad: string;
  imagen_id: string;
  creado_en: string;
}

const MenuSection = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();
  const { t, isDark } = useTheme();

  useEffect(() => {
    // Dentro del useEffect:
const fetchData = async () => {
  try {
    const response = await axios.get<Producto[]>('http://localhost:3001/api/productos');
    setProductos(response.data);

    const categoriasUnicas: string[] = Array.from(new Set(response.data.map((p) => p.categoria)));
    setCategorias(categoriasUnicas); // ← ✅ Error corregido
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
};


    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? productos.filter((p) => p.categoria === selectedCategory)
    : productos;

    const handleAddToCart = async (producto: Producto) => {
      try {
        addToCart(producto); // Contexto local
    
        // Simula cliente actual (deberías obtener de auth o contexto)
        const id_cliente = 1;
    
        await axios.post('http://localhost:3001/api/carrito', {
          id_cliente,
          productos: [
            {
              id_producto: producto.id_producto,
              cantidad: 1,
              precio_unitario: producto.precio
            }
          ]
        });
    
        toast.success(t('message.addedToCart') || 'Agregado al carrito');
      } catch (error) {
        console.error('Error al agregar al carrito:', error);
        toast.error('No se pudo agregar al carrito');
      }
    };
    

  const getPopularityStars = (popularidad: string) => {
    const stars = {
      'poco conocido': 2,
      'con potencial': 3,
      'popular': 4,
      'muy popular': 5,
    };
    return stars[popularidad as keyof typeof stars] || 3;
  };

  return (
    <div className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Nuestro Menú
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Descubre los sabores auténticos de Ecuador y el mundo
          </p>
        </motion.div>

        {/* Filtro de Categoría */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setSelectedCategory(categoria)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === categoria
                  ? 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((producto, index) => (
            <motion.div
              key={producto._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${
                isDark ? 'bg-gray-800' : 'bg-white'
              } rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group`}
            >
              {/* Imagen del producto */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-orange-100 overflow-hidden">
                <img
                  src={`http://localhost:3001/uploads/${producto.imagen_id}`}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/default.jpg';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      producto.stock > 10
                        ? 'bg-green-100 text-green-800'
                        : producto.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}
                  </span>
                </div>
              </div>

              {/* Información del producto */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    } group-hover:text-blue-600 transition-colors`}
                  >
                    {producto.nombre}
                  </h3>
                  <span
                    className={`text-2xl font-bold ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    ${producto.precio.toFixed(2)}
                  </span>
                </div>

                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  {producto.categoria}
                </p>

                {/* Estrellas de popularidad */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < getPopularityStars(producto.popularidad)
                          ? 'text-yellow-400 fill-current'
                          : isDark
                          ? 'text-gray-600'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {producto.popularidad}
                  </span>
                </div>

                {/* Botón agregar al carrito */}
                <button
                  onClick={() => handleAddToCart(producto)}
                  disabled={producto.stock === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                    producto.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-orange-600 text-white hover:from-blue-700 hover:to-orange-700 transform hover:scale-105'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{producto.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
