// src/components/Auth/AuthPage.tsx
/* import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import Logo from '../../assets/logo.png'; // Asegúrate que exista
export default function AuthPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '',
    nombre: '', apellido: '', cedula: '', direccion: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const action = isLogin 
       ? () => login(formData.email, formData.password)
       : () => register(formData as any);
    const ok = await action();
    toast[ok ? 'success' : 'error'](
      isLogin ? 'Inicio exitoso' : 'Registro fallido o duplicado'
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gradient-to-tr from-blue-400 to-purple-600">
      {/* Left form }
      <motion.div layout className="relative flex flex-1 flex-col justify-center px-8 py-12 w-full max-w-md lg:px-20">
        <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 mb-4"/>
        <motion.h2 layout className="text-3xl font-extrabold text-white text-center mb-4">
          {isLogin ? 'Iniciar Sesión' : 'Registrar Usuario'}
        </motion.h2>
        <motion.p layout className="text-center text-indigo-200 mb-8 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </motion.p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && <>
            <input name="nombre" placeholder="Nombre" required onChange={handleChange} />
            <input name="apellido" placeholder="Apellido" required onChange={handleChange} />
            <input name="cedula" placeholder="Cédula (10 dígitos)" maxLength={10} required onChange={handleChange} />
            <input name="direccion" placeholder="Dirección" required onChange={handleChange} />
          </>}
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          <input name="password" type="password" placeholder="Contraseña" required onChange={handleChange} />
          <button type="submit" disabled={loading}
            className="w-full rounded bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition">
            {loading ? (isLogin ? 'Iniciando...' : 'Registrando...') :
                       (isLogin ? 'Iniciar Sesión' : 'Registrar')}
          </button>
        </form>
      </motion.div>
      {/* Right image }
      <motion.div layout className="hidden lg:block flex-1 relative" initial={{ opacity:0 }} animate={{opacity:1}}>
        <div className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1367&q=80)' }} />
        <div className="absolute inset-0 bg-indigo-700/70" />
        <div className="relative h-full flex items-center justify-center px-12">
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x:0, opacity:1 }} transition={{ delay:0.3 }}>
            <h2 className="text-4xl font-bold text-white mb-4">Bienvenido a Restaurante Virtual</h2>
            <p className="text-lg text-indigo-200">Regístrate o inicia sesión para comenzar.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}*/