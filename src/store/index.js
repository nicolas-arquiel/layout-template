import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './layoutSlice'
import authReducer from './authSlice'

/**
 * Store principal de Redux configurado con Redux Toolkit
 * Combina los reducers de layout y auth
 */
const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas action types en la verificación de serialización
        ignoredActions: ['auth/setAuth'],
      },
    }),
})

export default store
