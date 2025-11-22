import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import store from './store'
import router from './router'

/**
 * Componente raíz de la aplicación
 * Configura Redux Provider, Theme Provider y React Router
 *
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App