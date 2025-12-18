/**
 * Constantes para las claves de almacenamiento en localStorage y sessionStorage
 * Centraliza todas las claves para evitar errores tipográficos y facilitar mantenimiento
 */

// ================================
// AUTENTICACIÓN (localStorage)
// ================================
export const AUTH_USER_DATA_KEY = 'userData'
export const AUTH_TOKEN_KEY = 'access_token'

// ================================
// AUTENTICACIÓN (sessionStorage)
// ================================
export const AUTH_USER_PERMISOS_KEY = 'userPermisos'

// ================================
// LAYOUT (localStorage)
// ================================
export const LAYOUT_MENU_COLLAPSED_KEY = 'menuCollapsed'
export const LAYOUT_DIRECTION_KEY = 'direction'
export const LAYOUT_SKIN_KEY = 'skin'
export const LAYOUT_MENU_LAYOUT_KEY = 'menu-layout'

// ================================
// TEMA GENERAL (localStorage)
// ================================
export const THEME_SETTINGS_KEY = 'app-theme-settings'

// ================================
// ACCESIBILIDAD (localStorage)
// ================================
export const ACCESSIBILITY_REDUCED_MOTION_KEY = 'reduced-motion'
export const ACCESSIBILITY_HIGH_CONTRAST_KEY = 'high-contrast'
export const ACCESSIBILITY_SEPIA_MODE_KEY = 'sepia-mode'
export const ACCESSIBILITY_GRAYSCALE_MODE_KEY = 'grayscale-mode'
export const ACCESSIBILITY_DYSLEXIC_SPACING_KEY = 'dyslexic-spacing'
export const ACCESSIBILITY_BIG_CURSOR_KEY = 'big-cursor'
export const ACCESSIBILITY_UNDERLINE_LINKS_KEY = 'underline-links'

// ================================
// GRUPOS DE CLAVES (útil para limpiezas selectivas)
// ================================
export const AUTH_KEYS = {
    localStorage: [AUTH_USER_DATA_KEY, AUTH_TOKEN_KEY],
    sessionStorage: [AUTH_USER_PERMISOS_KEY],
}

export const LAYOUT_KEYS = [
    LAYOUT_MENU_COLLAPSED_KEY,
    LAYOUT_DIRECTION_KEY,
    LAYOUT_SKIN_KEY,
    LAYOUT_MENU_LAYOUT_KEY,
]

export const THEME_KEYS = [THEME_SETTINGS_KEY]

export const ACCESSIBILITY_KEYS = [
    ACCESSIBILITY_REDUCED_MOTION_KEY,
    ACCESSIBILITY_HIGH_CONTRAST_KEY,
    ACCESSIBILITY_SEPIA_MODE_KEY,
    ACCESSIBILITY_GRAYSCALE_MODE_KEY,
    ACCESSIBILITY_DYSLEXIC_SPACING_KEY,
    ACCESSIBILITY_BIG_CURSOR_KEY,
    ACCESSIBILITY_UNDERLINE_LINKS_KEY,
]

// ================================
// TODAS LAS CLAVES (localStorage)
// ================================
export const ALL_LOCAL_STORAGE_KEYS = [
    ...AUTH_KEYS.localStorage,
    ...LAYOUT_KEYS,
    ...THEME_KEYS,
    ...ACCESSIBILITY_KEYS,
]

// ================================
// TODAS LAS CLAVES (sessionStorage)
// ================================
export const ALL_SESSION_STORAGE_KEYS = [...AUTH_KEYS.sessionStorage]
