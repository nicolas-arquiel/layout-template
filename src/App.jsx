import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { store } from '@src/store/store'
import router from './router'
import { CustomThemePanel } from '@core/components'

/**
 * Componente raíz de la aplicación
 * Configura Redux Provider, Radix Theme Provider y React Router
 * Gestiona el estado global del tema y su persistencia
 */
const App = () => {
  // Estado inicial cargado desde localStorage o valores por defecto
  const [themeSettings, setThemeSettings] = useState(() => {
    const saved = localStorage.getItem('app-theme-settings')
    return saved ? JSON.parse(saved) : {
      appearance: 'inherit',
      accentColor: 'indigo',
      grayColor: 'slate',
      radius: 'medium',
      scaling: '100%',
    }
  })

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('app-theme-settings', JSON.stringify(themeSettings))
  }, [themeSettings])

  const updateTheme = (key, value) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Provider store={store}>
      <Theme 
        appearance={themeSettings.appearance}
        accentColor={themeSettings.accentColor}
        grayColor={themeSettings.grayColor}
        radius={themeSettings.radius}
        scaling={themeSettings.scaling}
      >
        <CustomThemePanel settings={themeSettings} onUpdate={updateTheme} />
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  )
}

export default App