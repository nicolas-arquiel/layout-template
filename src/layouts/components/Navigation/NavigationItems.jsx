import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import NavigationHeader from './NavigationHeader'
import NavigationLink from './NavigationLink'
import NavigationGroup from './NavigationGroup'
import { canViewMenuItem, canViewMenuGroup } from '../../../utils/permissions'
import { cn } from '../../../lib/utils'

/**
 * Componente principal que renderiza todos los items de navegación
 * Usa NavigationMenu nativo de Radix para sidebar vertical
 *
 * @param {Object} props
 * @param {Array} props.items - Array de items de navegación
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {boolean} [props.forceExpanded] - Fuerza la visualización expandida
 * @returns {JSX.Element}
 */
const NavigationItems = ({ items = [], className, forceExpanded = false }) => {
  const permisos = useSelector((state) => state.auth.permisos)
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  // Estado para accordion - solo un grupo abierto a la vez
  const [openGroupId, setOpenGroupId] = useState(null)

  /**
   * Renderiza un item individual según su tipo
   * @param {Object} item - Item de navegación
   * @returns {JSX.Element|null}
   */
  const renderItem = (item) => {
    // Headers de sección
    if (item.header) {
      return <NavigationHeader key={item.header} title={item.header} forceExpanded={forceExpanded} />
    }

    // Grupos con children
    if (item.children && item.children.length > 0) {
      // Verificar si el usuario puede ver el grupo
      if (!canViewMenuGroup(item, permisos)) {
        return null
      }

      return (
        <NavigationGroup
          key={item.id}
          item={item}
          forceExpanded={forceExpanded}
          isOpen={openGroupId === item.id}
          onToggle={() => setOpenGroupId(openGroupId === item.id ? null : item.id)}
        />
      )
    }

    // Items individuales (links)
    // Verificar si el usuario puede ver el item
    if (!canViewMenuItem(item, permisos)) {
      return null
    }

    return <NavigationLink key={item.id} item={item} forceExpanded={forceExpanded} />
  }

  return (
    <ul className={cn('flex flex-col gap-1 py-2', className)}>
      {items.map((item) => renderItem(item))}
    </ul>
  )
}

export default NavigationItems
