import { X, Settings, Sun, Moon, Layout, Monitor } from 'react-feather'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/cn'

/**
 * Theme Customizer Component
 * Panel lateral para personalizar el tema de la aplicación
 * Se abre/cierra con la tecla 'T'
 *
 * @returns {JSX.Element}
 */
export default function ThemeCustomizer() {
  const { themeConfig, updateThemeConfig, resetTheme, customizerOpen, setCustomizerOpen } =
    useTheme()

  // Colores primarios disponibles
  const primaryColors = [
    { name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
    { name: 'Purple', value: '#a855f7', class: 'bg-purple-500' },
    { name: 'Green', value: '#22c55e', class: 'bg-green-500' },
    { name: 'Orange', value: '#f97316', class: 'bg-orange-500' },
    { name: 'Red', value: '#ef4444', class: 'bg-red-500' },
    { name: 'Pink', value: '#ec4899', class: 'bg-pink-500' },
  ]

  return (
    <>
      {/* Overlay */}
      {customizerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
          onClick={() => setCustomizerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Customizer Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-80 transform overflow-y-auto border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900',
          customizerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personalizaci&oacute;n
            </h2>
          </div>
          <button
            onClick={() => setCustomizerOpen(false)}
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Cerrar customizer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Skin Mode */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Tema
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateThemeConfig('skin', 'light')}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                  themeConfig.skin === 'light'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <Sun size={24} className={themeConfig.skin === 'light' ? 'text-blue-600' : 'text-gray-600'} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
              </button>

              <button
                onClick={() => updateThemeConfig('skin', 'dark')}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                  themeConfig.skin === 'dark'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <Moon size={24} className={themeConfig.skin === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
              </button>
            </div>
          </div>

          {/* Primary Color */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Color Primario
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {primaryColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateThemeConfig('primaryColor', color.value)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all',
                    themeConfig.primaryColor === color.value
                      ? 'border-gray-900 dark:border-white'
                      : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                  )}
                  title={color.name}
                >
                  <div className={cn('h-8 w-8 rounded-full', color.class)} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Width */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Ancho del Contenido
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateThemeConfig('contentWidth', 'full')}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                  themeConfig.contentWidth === 'full'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <Monitor size={24} className={themeConfig.contentWidth === 'full' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Completo</span>
              </button>

              <button
                onClick={() => updateThemeConfig('contentWidth', 'boxed')}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                  themeConfig.contentWidth === 'boxed'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <Layout size={24} className={themeConfig.contentWidth === 'boxed' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Contenedor</span>
              </button>
            </div>
          </div>

          {/* Router Transition */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Transición de Rutas
            </h3>
            <select
              value={themeConfig.routerTransition}
              onChange={(e) => updateThemeConfig('routerTransition', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="none">Ninguna</option>
            </select>
          </div>

          {/* Footer Type */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Tipo de Footer
            </h3>
            <select
              value={themeConfig.footerType}
              onChange={(e) => updateThemeConfig('footerType', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="static">Estático</option>
              <option value="sticky">Pegajoso</option>
              <option value="hidden">Oculto</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="pt-4">
            <button
              onClick={resetTheme}
              className="w-full rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Restaurar Valores por Defecto
            </button>
          </div>

          {/* Keyboard Hint */}
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Tip:</strong> Presiona la tecla <kbd className="rounded bg-blue-200 px-2 py-1 text-xs font-semibold dark:bg-blue-800">T</kbd> para abrir/cerrar este panel
            </p>
          </div>
        </div>
      </div>

      {/* Floating Button (cuando está cerrado) */}
      {!customizerOpen && (
        <button
          onClick={() => setCustomizerOpen(true)}
          className="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Abrir customizer"
          title="Personalización (Presiona T)"
        >
          <Settings size={24} className="animate-spin-slow" />
        </button>
      )}
    </>
  )
}
