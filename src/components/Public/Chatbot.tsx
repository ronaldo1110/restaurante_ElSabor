import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses = {
  greeting: [
    "¡Hola! Soy el asistente virtual de Restaurante Virtual. ¿En qué puedo ayudarte?",
    "¡Bienvenido! Estoy aquí para ayudarte con cualquier pregunta sobre nuestro restaurante."
  ],
  menu: [
    "Tenemos una gran variedad de platos ecuatorianos e internacionales. Nuestros más populares son el Seco de Pollo, Encebollado y la Parrillada Campestre.",
    "Puedes ver nuestro menú completo en la sección 'Menú'. Tenemos comida ecuatoriana, internacional, postres y complementos."
  ],
  hours: [
    "Estamos abiertos de lunes a domingo de 11:00 AM a 10:00 PM.",
    "Nuestro horario de atención es todos los días de 11:00 AM a 10:00 PM."
  ],
  delivery: [
    "Hacemos entregas a domicilio sin costo adicional en un radio de 10km. El tiempo estimado es de 30-45 minutos.",
    "Ofrecemos delivery gratuito y el tiempo de entrega es aproximadamente 30-45 minutos dependiendo de tu ubicación."
  ],
  payment: [
    "Aceptamos tarjetas de crédito, débito y efectivo. También puedes pagar en línea de forma segura.",
    "Puedes pagar con tarjeta de crédito/débito, efectivo o a través de nuestra plataforma en línea."
  ],
  default: [
    "Lo siento, no entendí tu pregunta. ¿Podrías ser más específico?",
    "No estoy seguro de cómo responder a eso. ¿Puedes reformular tu pregunta?",
    "Disculpa, no tengo información sobre eso. ¿Hay algo más en lo que pueda ayudarte?"
  ]
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy el asistente virtual de Restaurante Virtual. ¿En qué puedo ayudarte?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const { isDark } = useTheme();

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hola') || message.includes('buenos') || message.includes('saludos')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    if (message.includes('menu') || message.includes('comida') || message.includes('platos') || message.includes('carta')) {
      return botResponses.menu[Math.floor(Math.random() * botResponses.menu.length)];
    }
    
    if (message.includes('horario') || message.includes('hora') || message.includes('abierto') || message.includes('cerrado')) {
      return botResponses.hours[Math.floor(Math.random() * botResponses.hours.length)];
    }
    
    if (message.includes('delivery') || message.includes('entrega') || message.includes('domicilio') || message.includes('envio')) {
      return botResponses.delivery[Math.floor(Math.random() * botResponses.delivery.length)];
    }
    
    if (message.includes('pago') || message.includes('pagar') || message.includes('tarjeta') || message.includes('efectivo')) {
      return botResponses.payment[Math.floor(Math.random() * botResponses.payment.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simular respuesta del bot después de un delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 w-80 h-96 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Asistente Virtual</h3>
                  <p className="text-xs opacity-90">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl px-3 py-2 ${
                      message.isBot
                        ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                        : 'bg-gradient-to-r from-blue-600 to-orange-600 text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className={`flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-orange-600 text-white p-2 rounded-full hover:from-blue-700 hover:to-orange-700 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}