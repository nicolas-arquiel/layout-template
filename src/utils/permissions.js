/**
 * Verifica si un usuario tiene un permiso específico
 * Soporta wildcards para permisos jerárquicos
 *
 * @param {string} requiredPermiso - Permiso requerido (ej: "inscripcion:aspirante:crear")
 * @param {Array<string>} userPermisos - Array de permisos del usuario
 * @returns {boolean} true si el usuario tiene el permiso
 *
 * @example
 * hasMenuPermission('inscripcion:aspirante:crear', ['inscripcion:*'])
 * // returns true
 *
 * hasMenuPermission('personas:editar', ['personas:ver', 'personas:editar'])
 * // returns true
 *
 * hasMenuPermission('admin:usuarios', ['*'])
 * // returns true
 */
export function hasMenuPermission(requiredPermiso, userPermisos = []) {
  // Si no hay permiso requerido, permitir acceso
  if (!requiredPermiso) {
    return true
  }

  // Si no hay permisos de usuario, denegar acceso
  if (!userPermisos || userPermisos.length === 0) {
    return false
  }

  // Si el usuario tiene permiso global (*), permitir todo
  if (userPermisos.includes('*')) {
    return true
  }

  // Verificar coincidencia exacta
  if (userPermisos.includes(requiredPermiso)) {
    return true
  }

  // Verificar wildcards jerárquicos
  const requiredParts = requiredPermiso.split(':')

  for (const userPermiso of userPermisos) {
    // Si el permiso del usuario termina en *, verificar prefijo
    if (userPermiso.endsWith(':*')) {
      const userPrefix = userPermiso.slice(0, -2) // Remover ':*'
      const userParts = userPrefix.split(':')

      // Verificar si el permiso requerido comienza con el prefijo del usuario
      let matches = true
      for (let i = 0; i < userParts.length; i++) {
        if (userParts[i] !== requiredParts[i]) {
          matches = false
          break
        }
      }

      if (matches) {
        return true
      }
    }
  }

  return false
}

/**
 * Verifica si un item de menú individual puede ser visto por el usuario
 *
 * @param {Object} item - Item de navegación
 * @param {Array<string>} userPermisos - Array de permisos del usuario
 * @returns {boolean} true si el usuario puede ver el item
 */
export function canViewMenuItem(item, userPermisos = []) {
  // Si el item no tiene permiso requerido, es visible para todos
  if (!item.permiso) {
    return true
  }

  return hasMenuPermission(item.permiso, userPermisos)
}

/**
 * Verifica si un grupo de menú puede ser visto por el usuario
 * Un grupo es visible si al menos uno de sus hijos es visible
 *
 * @param {Object} item - Item de navegación con children
 * @param {Array<string>} userPermisos - Array de permisos del usuario
 * @returns {boolean} true si el usuario puede ver el grupo
 */
export function canViewMenuGroup(item, userPermisos = []) {
  // Si no tiene hijos, tratarlo como item individual
  if (!item.children || item.children.length === 0) {
    return canViewMenuItem(item, userPermisos)
  }

  // Si el grupo tiene permiso propio, verificarlo primero
  if (item.permiso && !hasMenuPermission(item.permiso, userPermisos)) {
    return false
  }

  // Verificar si al menos un hijo es visible
  return item.children.some(child => {
    if (child.children) {
      return canViewMenuGroup(child, userPermisos)
    }
    return canViewMenuItem(child, userPermisos)
  })
}

/**
 * Filtra items de navegación basándose en permisos del usuario
 *
 * @param {Array<Object>} navItems - Array de items de navegación
 * @param {Array<string>} userPermisos - Array de permisos del usuario
 * @returns {Array<Object>} Items filtrados que el usuario puede ver
 */
export function filterNavigationByPermissions(navItems = [], userPermisos = []) {
  return navItems.filter(item => {
    // Headers siempre visibles
    if (item.header) {
      return true
    }

    // Items con children
    if (item.children) {
      return canViewMenuGroup(item, userPermisos)
    }

    // Items individuales
    return canViewMenuItem(item, userPermisos)
  })
}
