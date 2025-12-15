import { createSlice } from '@reduxjs/toolkit'


const initialUser = () => {
  const item = window.localStorage.getItem('user')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : null
}

const initialPermisos = () => {
  const item = window.localStorage.getItem('permisos')
  return item ? JSON.parse(item) : ''
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
     * Permisos del usuario en formato string separado por comas
     * Formato: "modulo:submodulo:accion" o "modulo:*" para wildcards
     * Ejemplo: "personas:ver,personas:editar,academica:*"
     */
    permisos: initialPermisos(),

    /**
     * @type {boolean}
     * Estado de autenticación
     */
    isAuthenticated: !!initialUser(),

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
      state.permisos = permisos || ''
      state.token = token
      state.isAuthenticated = true

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('permisos', JSON.stringify(permisos))
      localStorage.setItem('token', JSON.stringify(token))
    },

    /**
     * Limpia el estado de autenticación al hacer logout
     * @param {Object} state - Estado actual
     */
    clearAuth: (state) => {
      state.user = null
      state.permisos = ''
      state.token = null
      state.isAuthenticated = false

      localStorage.removeItem('user')
      localStorage.removeItem('permisos')
      localStorage.removeItem('token')
    },

    /**
     * Actualiza los permisos del usuario
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload de string de permisos
     */
    updatePermisos: (state, action) => {
      state.permisos = action.payload
      localStorage.setItem('permisos', JSON.stringify(action.payload))
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
        state.permisos = action.payload.currentData.permisos || state.permisos

        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('permisos', JSON.stringify(state.permisos))
      }
    },
  },
})

export const { setAuth, clearAuth, updatePermisos, updateUser, refreshUserData } = authSlice.actions

// Selectores
export const selectCurrentUser = (state) => state.auth.user
export const selectPermisos = (state) => state.auth.permisos
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectToken = (state) => state.auth.token

export default authSlice.reducer
