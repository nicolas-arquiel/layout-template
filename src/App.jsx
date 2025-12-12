import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { store } from '@src/store/store'
import router from './router'
import { CustomThemePanel } from '@core/components'
import { AlertProvider } from '@src/context/AlertProvider'

/**
 * Componente raíz de la aplicación
 * Configura Redux Provider, Radix Theme Provider y React Router
 * Gestiona el estado global del tema y su persistencia
 */
import { ThemeProvider } from '@src/context/ThemeProvider'
import { useTheme } from '@src/hooks/useTheme'

// Componente interno para consumir el contexto
const AppContent = () => {
  const { themeSettings, colors } = useTheme()

  return (
    <Theme 
      appearance={themeSettings.appearance}
      accentColor={themeSettings.accentColor}
      grayColor={themeSettings.grayColor}
      radius={themeSettings.radius}
      scaling={themeSettings.scaling}
    >
      <AlertProvider semanticColors={{
        success: colors.success,
        warning: colors.warning,
        error: colors.danger,
        info: colors.info
      }}>
        <CustomThemePanel />
        <RouterProvider router={router} />
      </AlertProvider>
    </Theme>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  )
}

export default App