import { createSlice } from '@reduxjs/toolkit'

/**
 * Slice de Redux para manejar el estado del layout
 * Controla el sidebar, tema, y otras configuraciones de UI
 */
const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    /**
     * @type {boolean}
     * Estado del sidebar (colapsado o expandido)
     */
    menuCollapsed: false,

    /**
     * @type {boolean}
     * Estado del overlay en mobile (sidebar visible u oculto)
     */
    mobileMenuOpen: false,

    /**
     * @type {'vertical' | 'horizontal'}
     * Layout del menú (sidebar vertical o navbar horizontal)
     */
    menuLayout: typeof window !== 'undefined' 
      ? (localStorage.getItem('menu-layout') || 'vertical')
      : 'vertical',
  },
  reducers: {
    /**
     * Toggle del estado colapsado del sidebar
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload booleano
     */
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload
    },

    /**
     * Toggle del sidebar en mobile
     * @param {Object} state - Estado actual
     */
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },

    /**
     * Cierra el sidebar en mobile
     * @param {Object} state - Estado actual
     */
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false
    },

    /**
     * Cambia el layout del menú (vertical/horizontal)
     * @param {Object} state - Estado actual
     * @param {Object} action - Action con payload 'vertical' | 'horizontal'
     */
    setMenuLayout: (state, action) => {
      state.menuLayout = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('menu-layout', action.payload)
      }
    },
  },
})

export const {
  handleMenuCollapsed,
  toggleMobileMenu,
  closeMobileMenu,
  setMenuLayout,
} = layoutSlice.actions

export default layoutSlice.reducer
