// RegisterForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import toast from 'react-hot-toast';

export default function RegisterForm({ onSwitch }: { onSwitch?: () => void }) {
  const { register } = useAuth();
  const { t, isDark } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    cedula: '',
    direccion: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de cédula (solo números y longitud 10)
    if (!/^\d{10}$/.test(formData.cedula)) {
      toast.error('La cédula debe contener exactamente 10 números');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(formData);

      if (success) {
        toast.success('Registrado y logueado correctamente');
      } else {
        // Aquí puedes mejorar dependiendo del backend
        toast.error('Error al registrar: correo o cédula ya registrados');
      }
    } catch (error: any) {
      toast.error('Error inesperado: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-orange-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 w-full max-w-md p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl backdrop-blur-sm`}
      >
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 text-center`}>
          Registrar Usuario
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nombre" type="text" placeholder="Nombre" required value={formData.nombre} onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
          <input name="apellido" type="text" placeholder="Apellido" required value={formData.apellido} onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
          <input name="cedula" type="text" placeholder="Cédula" required value={formData.cedula} onChange={handleChange}
            maxLength={10}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
          <input name="direccion" type="text" placeholder="Dirección" required value={formData.direccion} onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
          <input name="email" type="email" placeholder="Correo electrónico" required value={formData.email} onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />

          <div className="relative">
            <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" required value={formData.password} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        {onSwitch && (
          <p className="mt-6 text-sm text-center text-blue-500">
            ¿Ya tienes cuenta?{' '}
            <button onClick={onSwitch} className="underline hover:text-blue-700">
              Inicia sesión
            </button>
          </p>
        )}
      </motion.div>
    </div>
  );
}
