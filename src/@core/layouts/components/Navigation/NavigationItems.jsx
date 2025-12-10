import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import NavigationHeader from './NavigationHeader'
import NavigationLink from './NavigationLink'
import NavigationGroup from './NavigationGroup'
import { canViewMenuItem, canViewMenuGroup } from '@utils/permissions'
import { cn } from '@lib/utils'

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
const NavigationItems = ({ items = [], className, forceExpanded = false, collapsed }) => {
  const permisos = useSelector((state) => state.auth.permisos)
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const location = useLocation()

  // Estado para múltiples grupos abiertos (Set de IDs)
  const [openGroupIds, setOpenGroupIds] = useState(new Set())

  // Función helper para verificar si un grupo contiene la ruta activa
  const hasActiveChild = (children, currentPath) => {
    return children.some((child) => {
      if (child.children) {
        return hasActiveChild(child.children, currentPath)
      }
      return child.navLink === currentPath
    })
  }

  // Cerrar grupos que no contengan la ruta activa cuando cambia la ubicación
  useEffect(() => {
    setOpenGroupIds((prevIds) => {
      const newIds = new Set(prevIds)
      // Filtrar solo los grupos que contienen la ruta activa
      items.forEach((item) => {
        if (item.children && newIds.has(item.id)) {
          if (!hasActiveChild(item.children, location.pathname)) {
            newIds.delete(item.id)
          }
        }
      })
      return newIds
    })
  }, [location.pathname])

  /**
   * Renderiza un item individual según su tipo
   * @param {Object} item - Item de navegación
   * @returns {JSX.Element|null}
   */
  const renderItem = (item) => {
    // Headers de sección
    if (item.header) {
      return <NavigationHeader key={item.header} title={item.header} forceExpanded={forceExpanded} collapsed={collapsed} />
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
          collapsed={collapsed}
          isOpen={openGroupIds.has(item.id)}
          onToggle={() => {
            setOpenGroupIds((prevIds) => {
              const newIds = new Set(prevIds)
              if (newIds.has(item.id)) {
                newIds.delete(item.id)
              } else {
                newIds.add(item.id)
              }
              return newIds
            })
          }}
        />
      )
    }

    // Items individuales (links)
    // Verificar si el usuario puede ver el item
    if (!canViewMenuItem(item, permisos)) {
      return null
    }

    return <NavigationLink key={item.id} item={item} forceExpanded={forceExpanded} collapsed={collapsed} />
  }

  return (
    <ul className={cn('flex flex-col gap-1 py-2', className)}>
      {items.map((item) => renderItem(item))}
    </ul>
  )
}

export default NavigationItems
