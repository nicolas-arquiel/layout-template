import { hasMenuPermission as checkPermission } from './permissions' // Self reference? No.

const isProduction = import.meta.env.VITE_ENVIRONMENT === 'prod'
const DEBUG = !isProduction;

const log = (message, data = null) => {
  if (DEBUG) {
    if (data) {
      console.log(`[NavAuth] ${message}:`, data);
    } else {
      console.log(`[NavAuth] ${message}`);
    }
  }
};

// Función para normalizar strings
const normalizeString = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

// Función para verificar permisos de un ítem de menú
export const hasMenuPermission = (permiso, permisosArray = []) => {
  if (!permiso) return true;
  
  // log('Verificando permiso de menú:', { permiso, permisosDisponibles: permisosArray });
  
  const normalizedPermiso = normalizeString(permiso);
  
  // Si el permiso no contiene ':', debemos verificar '*' o 'ver'
  if (!normalizedPermiso.includes(':')) {
    const tienePermiso = permisosArray.some(userPermiso => {
      const normalizedUserPermiso = normalizeString(userPermiso);
      return normalizedUserPermiso === `${normalizedPermiso}:*` || 
             normalizedUserPermiso === `${normalizedPermiso}:ver`;
    });
    
    // log(`Resultado verificación permiso básico: ${tienePermiso}`);
    return tienePermiso;
  }
  
  // Para permisos con formato complejo (con ':')
  const tienePermiso = permisosArray.some(userPermiso => {
    const normalizedUserPermiso = normalizeString(userPermiso);
    
    // Dividir los permisos en sus partes
    const permisoPartes = normalizedPermiso.split(':');
    const userPermisoPartes = normalizedUserPermiso.split(':');
    
    // Verificar coincidencia exacta
    if (normalizedUserPermiso === normalizedPermiso) {
      return true;
    }
    
    // Verificar permisos especiales
    const moduloBase = permisoPartes[0];
    
    // Si el usuario tiene el wildcard del módulo
    if (normalizedUserPermiso === `${moduloBase}:*`) {
      return true;
    }
    
    // Si es un permiso de ver y el usuario tiene el permiso de ver del módulo
    if (permisoPartes[permisoPartes.length - 1] === 'ver' && 
        normalizedUserPermiso === `${moduloBase}:ver`) {
      return true;
    }
    
    // Verificar wildcards en diferentes niveles
    let isMatch = true;
    for (let i = 0; i < permisoPartes.length; i++) {
      if (i >= userPermisoPartes.length) {
        isMatch = false;
        break;
      }
      
      if (userPermisoPartes[i] === '*') {
        return true;
      }
      
      if (permisoPartes[i] !== userPermisoPartes[i]) {
        isMatch = false;
        break;
      }
    }
    
    return isMatch;
  });

  // log(`Resultado verificación permiso: ${tienePermiso}`);
  return tienePermiso;
};

// Función para verificar si se puede mostrar un grupo de menú
export const canViewMenuGroup = (item, permisosData, user) => {
  // log('Verificando grupo de menú:', { itemId: item.id });

  // Si es superadmin, tiene acceso total
  if (user?.isSuperAdmin) {
    // log('Es superadmin - acceso permitido');
    return true;
  }

  // Convertir los permisos a array
  const permisosArray = typeof permisosData === 'string' 
    ? permisosData.split(',').map(p => p.trim())
    : Array.isArray(permisosData) ? permisosData : [];

  // Verificar permiso del grupo
  if (item.permiso && !hasMenuPermission(item.permiso, permisosArray)) {
    // log('Grupo sin permiso necesario');
    return false;
  }

  // Si el grupo tiene hijos, verificar si al menos uno es visible
  if (item.children?.length) {
    const hasVisibleChild = item.children.some(child => {
      // Si el hijo tiene roles, debería verificarse también, pero aquí solo miramos permiso
      if (child.permiso) {
        return hasMenuPermission(child.permiso, permisosArray);
      }
      return true; // Si el hijo no tiene permiso específico, es visible
    });

    // log(`Grupo tiene hijo visible: ${hasVisibleChild}`);
    return hasVisibleChild;
  }

  return true;
};

// Función para verificar si se puede mostrar un ítem de menú
export const canViewMenuItem = (item, permisosData, user) => {
  
  // log('Verificando ítem de menú:', { itemId: item.id });

  // Si es superadmin, tiene acceso total
  if (user?.isSuperAdmin) {
    // log('Es superadmin - acceso permitido');
    return true;
  }

  // Convertir los permisos a array
  const permisosArray = typeof permisosData === 'string' 
    ? permisosData.split(',').map(p => p.trim())
    : Array.isArray(permisosData) ? permisosData : [];

  // Verificar permiso del ítem
  if (item.permiso) {
    const tienePermiso = hasMenuPermission(item.permiso, permisosArray);
    // log(`Resultado verificación ítem: ${tienePermiso}`);
    return tienePermiso;
  }

  // Si no tiene permiso específico, es visible
  return true;
};

/**
 * Filtra items de navegación basándose en permisos del usuario
 *
 * @param {Array<Object>} navItems - Array de items de navegación
 * @param {string|Array} permisosData - Permisos del usuario
 * @param {Object} user - Objeto de usuario
 * @returns {Array<Object>} Items filtrados que el usuario puede ver
 */
export function filterNavigationByPermissions(navItems = [], permisosData, user) {
  return navItems.filter(item => {
    // Headers siempre visibles
    if (item.header) {
      return true
    }

    // Items con children
    if (item.children) {
      return canViewMenuGroup(item, permisosData, user)
    }

    // Items individuales
    return canViewMenuItem(item, permisosData, user)
  })
}
