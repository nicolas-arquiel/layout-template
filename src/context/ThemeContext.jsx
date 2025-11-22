import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Theme Context para Radix UI Themes
 * Maneja appearance (light/dark) y configuración de layout
 */
const ThemeContext = createContext()

/**
 * Hook para usar el Theme Context
 * @returns {Object} Theme context value
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

/**
 * Theme Provider Component
 * Provee configuración de tema a toda la aplicación usando Radix Theme
 *
 * @param {Object} props
 * @param {Function} props.children - Render prop que recibe { appearance }
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children }) {
  // Estado del customizer
  const [customizerOpen, setCustomizerOpen] = useState(false)

  // Configuración del tema
  const [themeConfig, setThemeConfig] = useState(() => {
    // Cargar configuración guardada del localStorage
    const saved = localStorage.getItem('themeConfig')
    return saved
      ? JSON.parse(saved)
      : {
          appearance: 'light', // 'light' | 'dark' - para Radix Theme
          accentColor: 'blue',
          grayColor: 'slate',
          radius: 'medium',
          contentWidth: 'boxed', // 'full' | 'boxed'
          menuCollapsed: false,
          footerType: 'static', // 'static' | 'sticky' | 'hidden'
        }
  })

  // Guardar configuración en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('themeConfig', JSON.stringify(themeConfig))
  }, [themeConfig])

  // Toggle customizer con tecla T
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Tecla T (solo si no está en un input/textarea)
      if (
        e.key === 't' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !['INPUT', 'TEXTAREA'].includes(e.target.tagName)
      ) {
        setCustomizerOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  /**
   * Actualiza una propiedad del tema
   * @param {string} key - Clave de la propiedad
   * @param {*} value - Nuevo valor
   */
  const updateThemeConfig = (key, value) => {
    setThemeConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  /**
   * Toggle appearance (light/dark)
   */
  const toggleAppearance = () => {
    setThemeConfig((prev) => ({
      ...prev,
      appearance: prev.appearance === 'light' ? 'dark' : 'light',
    }))
  }

  /**
   * Resetea el tema a valores por defecto
   */
  const resetTheme = () => {
    const defaultConfig = {
      appearance: 'light',
      accentColor: 'blue',
      grayColor: 'slate',
      radius: 'medium',
      contentWidth: 'boxed',
      menuCollapsed: false,
      footerType: 'static',
    }
    setThemeConfig(defaultConfig)
    localStorage.setItem('themeConfig', JSON.stringify(defaultConfig))
  }

  const value = {
    themeConfig,
    updateThemeConfig,
    toggleAppearance,
    resetTheme,
    customizerOpen,
    setCustomizerOpen,
    toggleCustomizer: () => setCustomizerOpen((prev) => !prev),
    appearance: themeConfig.appearance,
  }

  return (
    <ThemeContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </ThemeContext.Provider>
  )
}
