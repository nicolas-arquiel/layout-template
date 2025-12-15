import { createSlice } from '@reduxjs/toolkit'
import { encryptData, decryptData } from '@src/@core/utils/encryption'

const initialUser = () => {
  const item = window.localStorage.getItem('user')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : null
}

const initialPermisos = () => {
  // Ahora los permisos vienen de sessionStorage y están encriptados
  const item = window.sessionStorage.getItem('permisos')
  return item || ''
}

const initialToken = () => {
  const item = window.localStorage.getItem('token')
  return item ? JSON.parse(item) : null
}

/**
 * Slice de Redux para manejar autenticación y permisos
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    /**
     * @type {Object|null}
     * Usuario autenticado
     */
    user: initialUser(),

    /**
     * @type {string}
     * Permisos del usuario en formato string encriptado
     */
    permisos: initialPermisos(),

    /**
     * @type {string|null}
     * Token de autenticación
     */
    token: initialToken(),
  },
  reducers: {
    /**
     * Establece el usuario y sus permisos al hacer login
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload {user, permisos, token}
     */
    setAuth: (state, action) => {
      const { user, permisos, token } = action.payload;
      state.user = user
      state.token = token
      
      // Encriptar permisos antes de guardar en estado y storage
      const permisosEncriptados = encryptData(permisos || '')
      state.permisos = permisosEncriptados

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(token))
      
      // Guardar permisos en sessionStorage (encriptados)
      sessionStorage.setItem('permisos', permisosEncriptados)
    },

    /**
     * Limpia el estado de autenticación al hacer logout
     * @param {Object} state - Estado actual
     */
    clearAuth: (state) => {
      state.user = null
      state.permisos = ''
      state.token = null

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('permisos') // Limpiar también de local por si quedó algun residuo antiguo
      sessionStorage.removeItem('permisos')
    },

    /**
     * Actualiza los permisos del usuario
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload de string de permisos (sin encriptar)
     */
    updatePermisos: (state, action) => {
      const permisosEncriptados = encryptData(action.payload)
      state.permisos = permisosEncriptados
      sessionStorage.setItem('permisos', permisosEncriptados)
    },

    /**
     * Actualiza la información del usuario
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload de datos del usuario
     */
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },

    /**
     * Refresca los datos del usuario (para validación de token)
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload {currentData}
     */
    refreshUserData: (state, action) => {
      if (action.payload.currentData) {
        state.user = { ...state.user, ...action.payload.currentData.user }
        
        if (action.payload.currentData.permisos) {
           const permisosEncriptados = encryptData(action.payload.currentData.permisos)
           state.permisos = permisosEncriptados
           sessionStorage.setItem('permisos', permisosEncriptados)
        }

        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
  },
})

export const { setAuth, clearAuth, updatePermisos, updateUser, refreshUserData } = authSlice.actions

// Selectores
export const selectCurrentUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token

// Selector derivado para saber si está autenticado
export const selectIsAuthenticated = (state) => !!state.auth.user

// Selector que desencripta los permisos al vuelo
export const selectPermisos = (state) => {
  const permisosEncriptados = state.auth.permisos
  if (!permisosEncriptados) return ''
  return decryptData(permisosEncriptados) || ''
}

export default authSlice.reducer
