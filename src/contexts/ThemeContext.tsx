import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  language: 'es' | 'en';
  toggleTheme: () => void;
  setLanguage: (lang: 'es' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navegación
    'nav.dashboard': 'Dashboard',
    'nav.menu': 'Menú',
    'nav.categories': 'Categorías',
    'nav.clients': 'Clientes',
    'nav.sales': 'Ventas',
    'nav.reports': 'Reportes',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar Sesión',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Resumen del negocio',
    'dashboard.totalSales': 'Ventas Totales',
    'dashboard.todaySales': 'Ventas Hoy',
    'dashboard.totalClients': 'Total Clientes',
    'dashboard.products': 'Productos',
    
    // Público
    'public.home': 'Inicio',
    'public.menu': 'Menú',
    'public.about': 'Nosotros',
    'public.contact': 'Contacto',
    'public.cart': 'Carrito',
    'public.orders': 'Mis Pedidos',
    'public.welcome': 'Bienvenido a Restaurante Virtual',
    'public.subtitle': 'La mejor comida ecuatoriana e internacional',
    
    // Formularios
    'form.email': 'Correo electrónico',
    'form.password': 'Contraseña',
    'form.login': 'Iniciar Sesión',
    'form.name': 'Nombre',
    'form.price': 'Precio',
    'form.stock': 'Stock',
    'form.category': 'Categoría',
    'form.save': 'Guardar',
    'form.cancel': 'Cancelar',
    'form.edit': 'Editar',
    'form.delete': 'Eliminar',
    'form.add': 'Agregar',
    
    // Mensajes
    'message.loginSuccess': 'Inicio de sesión exitoso',
    'message.loginError': 'Credenciales incorrectas',
    'message.addedToCart': 'Producto agregado al carrito',
    'message.orderPlaced': 'Pedido realizado con éxito',
    
    // Configuración
    'settings.theme': 'Tema',
    'settings.language': 'Idioma',
    'settings.dark': 'Oscuro',
    'settings.light': 'Claro',
    'settings.spanish': 'Español',
    'settings.english': 'Inglés'
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.menu': 'Menu',
    'nav.categories': 'Categories',
    'nav.clients': 'Clients',
    'nav.sales': 'Sales',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Business overview',
    'dashboard.totalSales': 'Total Sales',
    'dashboard.todaySales': 'Today Sales',
    'dashboard.totalClients': 'Total Clients',
    'dashboard.products': 'Products',
    
    // Public
    'public.home': 'Home',
    'public.menu': 'Menu',
    'public.about': 'About Us',
    'public.contact': 'Contact',
    'public.cart': 'Cart',
    'public.orders': 'My Orders',
    'public.welcome': 'Welcome to Virtual Restaurant',
    'public.subtitle': 'The best Ecuadorian and international food',
    
    // Forms
    'form.email': 'Email',
    'form.password': 'Password',
    'form.login': 'Login',
    'form.name': 'Name',
    'form.price': 'Price',
    'form.stock': 'Stock',
    'form.category': 'Category',
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.edit': 'Edit',
    'form.delete': 'Delete',
    'form.add': 'Add',
    
    // Messages
    'message.loginSuccess': 'Login successful',
    'message.loginError': 'Invalid credentials',
    'message.addedToCart': 'Product added to cart',
    'message.orderPlaced': 'Order placed successfully',
    
    // Settings
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.dark': 'Dark',
    'settings.light': 'Light',
    'settings.spanish': 'Spanish',
    'settings.english': 'English'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguageState] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language') as 'es' | 'en';
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const setLanguage = (lang: 'es' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <ThemeContext.Provider value={{ isDark, language, toggleTheme, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
};