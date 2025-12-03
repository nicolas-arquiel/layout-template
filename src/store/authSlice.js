import { createSlice } from '@reduxjs/toolkit'

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
    user: null,

    /**
     * @type {string}
     * Permisos del usuario en formato string separado por comas
     * Formato: "modulo:submodulo:accion" o "modulo:*" para wildcards
     * Ejemplo: "personas:ver,personas:editar,academica:*"
     */
    permisos: '',

    /**
     * @type {boolean}
     * Estado de autenticación
     */
    isAuthenticated: false,

    /**
     * @type {string|null}
     * Token de autenticación
     */
    token: null,
  },
  reducers: {
    /**
     * Establece el usuario y sus permisos al hacer login
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload {user, permisos, token}
     */
    setAuth: (state, action) => {
      state.user = action.payload.user
      state.permisos = action.payload.permisos || ''
      state.token = action.payload.token
      state.isAuthenticated = true
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
    },

    /**
     * Actualiza los permisos del usuario
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload de string de permisos
     */
    updatePermisos: (state, action) => {
      state.permisos = action.payload
    },

    /**
     * Actualiza la información del usuario
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload de datos del usuario
     */
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
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
