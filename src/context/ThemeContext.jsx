import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Theme Context
 * Maneja configuración de tema, colores, layout y personalización
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
 * Provee configuración de tema a toda la aplicación
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Children components
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
          primaryColor: '#3b82f6', // blue-500
          skin: 'light', // 'light' | 'dark'
          contentWidth: 'boxed', // 'full' | 'boxed'
          menuCollapsed: false,
          navbarColor: 'white',
          footerType: 'static', // 'static' | 'sticky' | 'hidden'
          routerTransition: 'fade', // 'fade' | 'slide' | 'none'
        }
  })

  // Guardar configuración en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('themeConfig', JSON.stringify(themeConfig))
  }, [themeConfig])

  // Aplicar skin (light/dark) al HTML
  useEffect(() => {
    if (themeConfig.skin === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeConfig.skin])

  // Aplicar color primario como CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', themeConfig.primaryColor)
  }, [themeConfig.primaryColor])

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
   * Resetea el tema a valores por defecto
   */
  const resetTheme = () => {
    const defaultConfig = {
      primaryColor: '#3b82f6',
      skin: 'light',
      contentWidth: 'boxed',
      menuCollapsed: false,
      navbarColor: 'white',
      footerType: 'static',
      routerTransition: 'fade',
    }
    setThemeConfig(defaultConfig)
    localStorage.setItem('themeConfig', JSON.stringify(defaultConfig))
  }

  const value = {
    themeConfig,
    updateThemeConfig,
    resetTheme,
    customizerOpen,
    setCustomizerOpen,
    toggleCustomizer: () => setCustomizerOpen((prev) => !prev),
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
