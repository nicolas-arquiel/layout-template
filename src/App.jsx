import { useState, useEffect, createContext, useContext } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Theme, ThemePanel } from '@radix-ui/themes'
import store from './store'
import router from './router'
import '@radix-ui/themes/styles.css'

/**
 * Context para compartir themeConfig en toda la aplicación
 */
export const ThemeConfigContext = createContext()

export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext)
  if (!context) {
    throw new Error('useThemeConfig must be used within App')
  }
  return context
}

/**
 * Componente raíz de la aplicación
 * Configura Redux Provider, Radix Theme Provider y React Router
 * Maneja configuración de tema con localStorage
 *
 * @returns {JSX.Element}
 */
function App() {
  // Estado de configuración del tema
  const [themeConfig, setThemeConfig] = useState(() => {
    const saved = localStorage.getItem('radix-theme-config')
    return saved
      ? JSON.parse(saved)
      : {
          navbarSticky: true,
          sidebarWidth: 280,
          contentWidth: 'boxed',
          footerType: 'static',
        }
  })

  // Persistir configuración en localStorage
  useEffect(() => {
    localStorage.setItem('radix-theme-config', JSON.stringify(themeConfig))
  }, [themeConfig])

  const updateThemeConfig = (key, value) => {
    setThemeConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const resetThemeConfig = () => {
    const defaultConfig = {
      navbarSticky: true,
      sidebarWidth: 280,
      contentWidth: 'boxed',
      footerType: 'static',
    }
    setThemeConfig(defaultConfig)
    localStorage.setItem('radix-theme-config', JSON.stringify(defaultConfig))
  }

  return (
    <Provider store={store}>
      <ThemeConfigContext.Provider
        value={{ themeConfig, updateThemeConfig, resetThemeConfig }}
      >
        <Theme>
          <ThemePanel />
          <RouterProvider router={router} />
        </Theme>
      </ThemeConfigContext.Provider>
    </Provider>
  )
}

export default App