
import { motion } from 'framer-motion';
import { Moon, Sun, Globe, Palette, Bell, Shield, User, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { isDark, language, toggleTheme, setLanguage, t } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('nav.settings')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Personaliza tu experiencia en la aplicación
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Apariencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="flex items-center mb-4">
            <Palette className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Apariencia
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.theme')}
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={toggleTheme}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                    !isDark
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  {t('settings.light')}
                </button>
                <button
                  onClick={toggleTheme}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                    isDark
                      ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  {t('settings.dark')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Idioma */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('settings.language')}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seleccionar idioma
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setLanguage('es')}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                    language === 'es'
                      ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  🇪🇸 {t('settings.spanish')}
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                    language === 'en'
                      ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  🇺🇸 {t('settings.english')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notificaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notificaciones
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Nuevos pedidos
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recibir notificaciones de nuevos pedidos
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Actualizaciones de estado
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cambios en el estado de los pedidos
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Promociones
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ofertas especiales y descuentos
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Seguridad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Seguridad
            </h3>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Cambiar contraseña
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Actualiza tu contraseña de acceso
                  </p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </button>

            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Autenticación de dos factores
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Añade una capa extra de seguridad
                  </p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </button>

            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Sesiones activas
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Gestiona tus sesiones abiertas
                  </p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Botón de guardar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </button>
      </motion.div>
    </div>
  );
}