import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, MapPin, CreditCard, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import toast from 'react-hot-toast';

export default function CartSection() {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const { t, isDark } = useTheme();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    direccion: '',
    telefono: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const subtotal = getTotal();
  const impuestos = subtotal * 0.15; // 15% de impuestos
  const total = subtotal + impuestos;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
    setShowCheckout(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      toast.success(t('message.orderPlaced'));
      
      // Resetear después de 3 segundos
      setTimeout(() => {
        setOrderPlaced(false);
        setShowCheckout(false);
        setFormData({
          direccion: '',
          telefono: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardName: ''
        });
      }, 3000);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl`}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            ¡Pedido Realizado!
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Gracias por tu compra. Tu pedido está siendo preparado y será entregado pronto.
          </p>
          <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Recibirás una confirmación por email y podrás seguir tu pedido en tiempo real.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Formulario de Checkout */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                Información de Entrega
              </h2>
              
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Dirección de Entrega
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={formData.direccion}
                      onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      placeholder="Ingresa tu dirección completa"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    placeholder="Tu número de teléfono"
                    required
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Información de Pago
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="Nombre en la tarjeta"
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="MM/YY"
                        required
                      />
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="CVV"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className={`flex-1 py-3 px-4 border rounded-lg font-medium ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Volver al Carrito
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-orange-700"
                  >
                    Realizar Pedido
                  </button>
                </div>
              </form>
            </div>

            {/* Resumen del Pedido */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg h-fit`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Resumen del Pedido
              </h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.producto.id_producto} className="flex justify-between">
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.producto.nombre}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ${item.producto.precio.toFixed(2)} x {item.cantidad}
                      </p>
                    </div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${(item.producto.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4 space-y-2`}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Subtotal:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Impuestos (15%):</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>${impuestos.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between text-lg font-bold border-t ${isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'} pt-2`}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Tu Carrito
          </h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {items.length === 0 ? 'Tu carrito está vacío' : `${items.length} productos en tu carrito`}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-12 text-center shadow-lg`}>
            <div className="text-6xl mb-4">🛒</div>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Tu carrito está vacío
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Agrega algunos productos deliciosos para comenzar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items del Carrito */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.producto.id_producto}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.producto.nombre}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ${item.producto.precio.toFixed(2)} c/u
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.producto.id_producto, item.cantidad - 1)}
                        className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className={`w-8 text-center font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.cantidad}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.producto.id_producto, item.cantidad + 1)}
                        className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${(item.producto.precio * item.cantidad).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.producto.id_producto)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resumen */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg h-fit`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Resumen del Pedido
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Subtotal:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Impuestos (15%):</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>${impuestos.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Envío:</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-3 flex justify-between text-lg font-bold`}>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>Total:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-orange-700 transition-all"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}