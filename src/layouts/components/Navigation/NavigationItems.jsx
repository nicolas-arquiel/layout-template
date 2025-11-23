import React from 'react'
import { useSelector } from 'react-redux'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
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

  const isCollapsed = menuCollapsed && !forceExpanded

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

      return <NavigationGroup key={item.id} item={item} forceExpanded={forceExpanded} />
    }

    // Links individuales
    if (item.navLink) {
      // Verificar si el usuario puede ver el item
      if (!canViewMenuItem(item, permisos)) {
        return null
      }

      return <NavigationLink key={item.id} item={item} forceExpanded={forceExpanded} />
    }

    return null
  }

  return (
    <NavigationMenu.Root orientation="vertical" className={cn('w-full relative', className)}>
      <NavigationMenu.List className="navigation-main w-full flex flex-col gap-0">
        {items.map((item) => renderItem(item))}
      </NavigationMenu.List>

      {/* Viewport para Content flotante cuando está collapsed - Patrón Radix */}
      {isCollapsed && (
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      )}
    </NavigationMenu.Root>
  )
}

export default NavigationItems
