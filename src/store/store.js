import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@src/store/rootReducer'
import { baseApi } from '@src/store/api/baseApi'

const isProduction = import.meta.env.VITE_ENVIRONMENT === 'prod'

/**
 * Store principal de Redux configurado con Redux Toolkit
 * Incluye middleware para RTK Query y configuración de devTools
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      baseApi.middleware,
    ])
  },
  devTools: !isProduction,
})

export { store }
