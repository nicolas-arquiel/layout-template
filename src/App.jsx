import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Theme, ThemePanel } from '@radix-ui/themes'
import store from './store'
import router from './router'

/**
 * Componente raíz de la aplicación
 * Configura Redux Provider, Radix Theme Provider y React Router
 *
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <Provider store={store}>
      <Theme panelBackground="translucent">
        <ThemePanel />
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  )
}

export default App