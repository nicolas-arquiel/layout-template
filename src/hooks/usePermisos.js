import { useSelector } from 'react-redux'
import { selectCurrentUser, selectPermisos } from '@/store/auth/authSlice'

/**
 * Hook para verificar permisos del usuario
 * 
 * @returns {Object} - { tienePermiso, permisos, isSuperAdmin, isProduction }
 * 
 * Ejemplos de uso:
 * - tienePermiso('personas') -> verifica 'personas:*'
 * - tienePermiso('personas:ver', true) -> para rutas, verifica 'personas:ver'
 * - tienePermiso('academica:materias:editar') -> verifica permiso específico
 */
export const usePermisos = () => {
  const user = useSelector(selectCurrentUser)
  // Ahora usamos selector que ya desencripta
  const permisosData = useSelector(selectPermisos)
  
  // Verificamos entorno de producción desde variable de entorno
  const isProduction = import.meta.env.VITE_ENVIRONMENT === 'prod'
  
  const tienePermiso = (permisoRequerido, esRuta = false) => {
    // Si no estamos en producción o el usuario es superadmin, permitir todo acceso
    if (!isProduction || (user && user.isSuperAdmin)) {
      return true
    }
    
    // Verificamos si permisosData existe y es un string
    if (!permisosData || typeof permisosData !== 'string') {
      // Solo warn si se requiere un permiso específico pero no hay permisos cargados
      if (permisoRequerido) {
         console.warn('[tienePermiso] No hay permisos cargados o formato inválido')
      }
      return false
    }
    
    // Convertimos el string de permisos en array
    const permisosArray = permisosData.split(',').map(p => p.trim())
    
    // Si es una ruta y el permiso no contiene ":", verificar primero si tiene el permiso específico de "ver"
    if (esRuta && !permisoRequerido.includes(':')) {
      const permisoVer = `${permisoRequerido}:ver`
      
      // Verificar si el usuario tiene permiso de "ver" para esta ruta
      if (permisosArray.includes(permisoVer)) {
        return true
      }
    }
    
    // Si el permiso requerido no contiene ":", se trata como permiso total del módulo
    if (!permisoRequerido.includes(':')) {
      permisoRequerido = `${permisoRequerido}:*`
    }
    
    // Separar el permiso requerido en sus partes
    const partesPermiso = permisoRequerido.split(':')
    const modulo = partesPermiso[0]
    
    // Construir posibles wildcards solo si el permiso requerido tiene partes específicas
    const wildcards = []
    
    // Si el permiso ya viene con wildcard (ej: "academica:*"), no generamos más wildcards
    if (!permisoRequerido.endsWith(':*')) {
      // Agregamos wildcards solo si hay más de una parte en el permiso
      if (partesPermiso.length > 1) {
        wildcards.push(`${modulo}:*`)
        // Agregamos wildcards intermedios si hay más de dos partes
        for (let i = 1; i < partesPermiso.length - 1; i++) {
          wildcards.push(partesPermiso.slice(0, i + 1).join(':') + ':*')
        }
      }
    }

    const tieneAcceso = permisosArray.some(permisoUser => 
      permisoUser === permisoRequerido || wildcards.some(w => permisoUser === w)
    )

    return tieneAcceso
  }

  return {
    tienePermiso,
    permisos: permisosData,
    isSuperAdmin: user?.isSuperAdmin || false,
    isProduction
  }
}
