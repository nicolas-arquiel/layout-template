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
     * @type {Array<string>}
     * Permisos del usuario
     * Formato: "modulo:submodulo:accion" o "modulo:*" para wildcards
     */
    permisos: [],

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
      state.permisos = action.payload.permisos || []
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    /**
     * Limpia el estado de autenticación al hacer logout
     * @param {Object} state - Estado actual
     */
    clearAuth: (state) => {
      state.user = null
      state.permisos = []
      state.token = null
      state.isAuthenticated = false
    },

    /**
     * Actualiza los permisos del usuario
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload de array de permisos
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
  },
})

export const { setAuth, clearAuth, updatePermisos, updateUser } = authSlice.actions

export default authSlice.reducer
