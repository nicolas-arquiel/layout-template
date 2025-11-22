import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from './store'
import router from './router'

/**
 * Componente raíz de la aplicación
 * Configura Redux Provider y React Router
 *
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App