import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Utensils, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import "../../styles/neon.css";

export default function AuthNeonPage() {
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    direccion: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        if (!/^[0-9]{10}$/.test(formData.cedula)) {
          toast.error("La cédula debe tener 10 números");
          setIsLoading(false);
          return;
        }

        const success = await register(formData);
        if (success) {
          toast.success("¡Registrado correctamente! Ahora inicia sesión.");
          setTimeout(() => {
            setIsRegisterMode(false);
            // Navega al login (mismo componente, modo login)
            // No navegas a cliente directo porque acabas de registrarte
          }, 1500);
        } else {
          toast.error("Error al registrar");
        }
      } else {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast.success("¡Bienvenido!");
          setTimeout(() => {
            if (user?.rol === "admin") {
                navigate("/admin");
              } else {
                navigate("/cliente");
              }
              
          }, 1000);
        } else {
          toast.error("Credenciales incorrectas");
        }
      }
    } catch (err) {
      toast.error("Error en la conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${isRegisterMode ? "register-mode" : ""}`}>
      {/* Login */}
      <div className="left-section">
        <div className="floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
        </div>
        <div className="form-container">
          <div className="logo-container">
            <div className="logo">
              <Utensils className="text-white w-10 h-10" />
            </div>
          </div>
          <h1 className="form-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
          <div className="signup-link">
            ¿No tienes cuenta?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsRegisterMode(true);
              }}
            >
              Regístrate
            </a>
          </div>
        </div>
      </div>

      {/* Bienvenida visual */}
      <div className="right-section">
        <div className="floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
        </div>
        <h1 className="welcome-title">¡BIENVENIDO AL RESTAURANTE "EL SABOR"!</h1>
        <p className="welcome-text">
          Donde cada bocado es una experiencia única. Descubre nuestros platos
          con ingredientes frescos.
        </p>
      </div>

      {/* Registro */}
      <div className="register-section">
        <div className="floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
        </div>
        <div className="form-container">
          <div className="logo-container">
            <div className="logo">
              <UserPlus className="text-white w-10 h-10" />
            </div>
          </div>
          <h1 className="form-title">Registro</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group half-width">
                <label>Nombre</label>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group half-width">
                <label>Apellido</label>
                <input
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group half-width">
                <label>Cédula</label>
                <input
                  name="cedula"
                  value={formData.cedula}
                  maxLength={10}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group half-width">
                <label>Dirección</label>
                <input
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Crear Cuenta"}
            </button>
          </form>
          <div className="signup-link">
            ¿Ya tienes cuenta?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsRegisterMode(false);
              }}
            >
              Inicia Sesión
            </a>
          </div>
        </div>
      </div>

      {/* Bienvenida para registro */}
      <div className="register-welcome-section">
        <div className="floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
        </div>
        <h1 className="welcome-title">¡COMIENZA TU AVENTURA CULINARIA!</h1>
        <p className="welcome-text">
          Únete a miles de comensales. Crea tu cuenta y accede a promociones exclusivas.
        </p>
      </div>
    </div>
  );
}
