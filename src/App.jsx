import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from './context/ThemeContext'
import store from './store'
import router from './router'
import '@radix-ui/themes/styles.css'

/**
 * Componente raíz de la aplicación
 * Configura Redux Provider, Radix Theme Provider y React Router
 *
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {({ appearance }) => (
          <Theme
            appearance={appearance}
            accentColor="blue"
            grayColor="slate"
            radius="medium"
            scaling="100%"
          >
            <RouterProvider router={router} />
          </Theme>
        )}
      </ThemeProvider>
    </Provider>
  )
}

export default App