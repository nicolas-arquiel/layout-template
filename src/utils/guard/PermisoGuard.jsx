import { usePermisos } from '@/utils/hooks/usePermisos'

/**
 * Componente guard para proteger contenido basado en permisos
 * 
 * @param {string} permiso - Permiso requerido
 * @param {React.ReactNode} children - Contenido a mostrar si tiene permiso
 * @param {React.ReactNode} fallback - Contenido a mostrar si no tiene permiso (null por defecto)
 * 
 * Ejemplo:
 * <PermisoGuard permiso="personas:editar">
 *   <Button>Editar</Button>
 * </PermisoGuard>
 */
export const PermisoGuard = ({ 
  permiso, 
  children, 
  fallback = null 
}) => {
  const { tienePermiso } = usePermisos()
  
  // Verificar si el permiso está definido
  if (!permiso) {
    console.warn('[PermisoGuard] No se proporcionó un permiso. Se denegará el acceso por defecto.')
    return fallback
  }
  
  const tieneAcceso = tienePermiso(permiso)
  
  if (!tieneAcceso) {
    return fallback
  }
  
  return children
}
