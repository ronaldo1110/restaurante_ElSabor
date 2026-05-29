import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/Public/Header';
import Hero from '../components/Public/Hero';
import MenuSection from '../components/Public/MenuSection';
import CartSection from '../components/Public/CartSection';
import Chatbot from '../components/Public/Chatbot';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';

export default function PublicApp() {
  const [activeSection, setActiveSection] = useState('home');
  const { t, isDark } = useTheme();

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero />
            <MenuSection />
            <AboutSection />
          </>
        );
      case 'menu':
        return <MenuSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      case 'cart':
        return <CartSection />;
      case 'orders':
        return <OrdersSection />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <PublicHeader activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderSection()}
      <Chatbot />
    </div>
  );
}

function AboutSection() {
  const { isDark } = useTheme();
  
  return (
    <div className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Sobre Nosotros
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Somos un restaurante familiar dedicado a preservar y compartir los sabores auténticos de Ecuador, 
            combinados con lo mejor de la gastronomía internacional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Nuestro restaurante"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Nuestra Historia
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              Fundado en 2020, Restaurante Virtual nació del sueño de compartir la riqueza culinaria 
              ecuatoriana con el mundo. Nuestros chefs, con más de 15 años de experiencia, preparan 
              cada plato con ingredientes frescos y recetas tradicionales transmitidas de generación en generación.
            </p>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              Creemos que la comida es más que nutrición; es cultura, tradición y amor en cada bocado. 
              Por eso, cada plato que servimos cuenta una historia y conecta a nuestros comensales 
              con las raíces de nuestra hermosa tierra ecuatoriana.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>1000+</div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Clientes Felices</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>50+</div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Platos Únicos</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  const { isDark } = useTheme();
  
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
            Contáctanos
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Estamos aquí para servirte y hacer tu experiencia inolvidable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dirección</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Av. Principal 123, Machala, Ecuador
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Teléfono</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      +593 7 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      info@restaurantevirtual.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Horarios</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Lun - Dom: 11:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Síguenos en Redes Sociales
              </h3>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                  f
                </button>
                <button className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700">
                  📷
                </button>
                <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500">
                  🐦
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}
          >
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              Envíanos un Mensaje
            </h3>
            
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Tu teléfono"
                  className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Tu mensaje"
                  className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-orange-700 transition-all"
              >
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function OrdersSection() {
  const { isDark } = useTheme();
  
  // Mock orders data
  const orders = [
    {
      id: 1,
      fecha: '2025-01-15',
      estado: 'entregado',
      total: 36.63,
      productos: ['Seco de Pollo', 'Encebollado x2']
    },
    {
      id: 2,
      fecha: '2025-01-14',
      estado: 'en_preparacion',
      total: 29.89,
      productos: ['Parrillada Campestre']
    }
  ];

  const getStatusColor = (estado: string) => {
    const colors = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'confirmado': 'bg-blue-100 text-blue-800',
      'en_preparacion': 'bg-orange-100 text-orange-800',
      'enviado': 'bg-purple-100 text-purple-800',
      'entregado': 'bg-green-100 text-green-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return colors[estado as keyof typeof colors] || colors.pendiente;
  };

  const getStatusText = (estado: string) => {
    const texts = {
      'pendiente': 'Pendiente',
      'confirmado': 'Confirmado',
      'en_preparacion': 'En Preparación',
      'enviado': 'Enviado',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    return texts[estado as keyof typeof texts] || 'Pendiente';
  };

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Mis Pedidos
          </h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Historial y estado de tus pedidos
          </p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Pedido #{order.id}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {new Date(order.fecha).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.estado)}`}>
                  {getStatusText(order.estado)}
                </span>
              </div>

              <div className="mb-4">
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Productos:
                </h4>
                <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                  {order.productos.map((producto, index) => (
                    <li key={index}>• {producto}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Total: ${order.total.toFixed(2)}
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}