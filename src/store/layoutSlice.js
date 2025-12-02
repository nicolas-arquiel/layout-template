import { createSlice } from '@reduxjs/toolkit'

// ** Funciones de inicialización desde localStorage
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  return item ? JSON.parse(item) : false
}

const initialDirection = () => {
  const item = window.localStorage.getItem('direction')
  return item ? JSON.parse(item) : false
}

const initialSkin = () => {
  const item = window.localStorage.getItem('skin')
  return item ? JSON.parse(item) : 'light'
}

/**
 * Slice de Redux para manejar el estado del layout
 * Controla el sidebar, tema, y otras configuraciones de UI
 */
export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    skin: initialSkin(),
    isRTL: initialDirection(),
    menuLayout: 'vertical',
    lastLayout: 'vertical',
    menuCollapsed: initialMenuCollapsed(),
    footerType: 'static',
    navbarType: 'floating',
    menuHidden: false,
    contentWidth: 'boxed',
    navbarColor: 'default',
    
    /**
     * @type {boolean}
     * Estado del overlay en mobile (sidebar visible u oculto)
     */
    mobileMenuOpen: false,
  },
  reducers: {
    handleRTL: (state, action) => {
      state.isRTL = action.payload
      window.localStorage.setItem('direction', JSON.stringify(action.payload))
    },
    handleSkin: (state, action) => {
      state.skin = action.payload
      window.localStorage.setItem('skin', JSON.stringify(action.payload))
    },
    handleLayout: (state, action) => {
      state.menuLayout = action.payload
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload
    },
    handleNavbarType: (state, action) => {
      state.navbarType = action.payload
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload
    },
    handleLastLayout: (state, action) => {
      state.lastLayout = action.payload
    },
    handleNavbarColor: (state, action) => {
      state.navbarColor = action.payload
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload))
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
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
  toggleMobileMenu,
  closeMobileMenu,
  setMenuLayout,
} = layoutSlice.actions

export default layoutSlice.reducer
