// src/config.js
export const getEnvVar = (name) => {
    // Primero intentar obtener del window.env (runtime)
    if (window.env && window.env[name] !== undefined && window.env[name] !== '${' + name + '}') {
      return window.env[name];
    }
    // Como fallback, usar las variables compiladas por Vite
    return import.meta.env[name];
  };
  
  // Exportar todas las variables que necesitas
  export const SKIP_PREFLIGHT_CHECK = getEnvVar('SKIP_PREFLIGHT_CHECK');
  export const VITE_APP_BASENAME = getEnvVar('VITE_APP_BASENAME');
  export const VITE_APP_ABR_BASENAME = getEnvVar('VITE_APP_ABR_BASENAME');
  export const VITE_APP_BASE_URL_API = getEnvVar('VITE_APP_BASE_URL_API');
  export const VITE_ENVIRONMENT = getEnvVar('VITE_ENVIRONMENT');
  export const VITE_ENCRYPTION_KEY = getEnvVar('VITE_ENCRYPTION_KEY');
