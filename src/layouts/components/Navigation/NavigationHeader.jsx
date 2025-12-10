import React from 'react'
import { useSelector } from 'react-redux'
import { Text } from '@radix-ui/themes'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '@lib/utils'

/**
 * NavigationHeader - SOLO TAILWIND CLASSES
 * Headers de sección en la navegación
 * Se oculta cuando el sidebar está colapsado
 *
 * @param {Object} props
 * @param {string} props.title - Texto del header
 * @param {boolean} [props.forceExpanded] - Fuerza visualización expandida
 * @returns {JSX.Element|null}
 */
const NavigationHeader = ({ title, forceExpanded = false, collapsed }) => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  // Both states use menuCollapsed directly for IMMEDIATE response
  // No delay - change to icons instantly when button is pressed
  const isLayoutCollapsed = menuCollapsed && !forceExpanded
  const isContentCollapsed = menuCollapsed && !forceExpanded

  // Cuando está colapsado (layout), mostrar solo "..."
  if (isLayoutCollapsed) {
    return (
      <li className="navigation-header list-none">
        <div className="flex items-center justify-center pt-6 pb-2">
          <Text
            size="1"
            weight="bold"
            className="text-[var(--gray-9)]"
          >
            ⋯
          </Text>
        </div>
      </li>
    )
  }

  return (
    <li className="navigation-header list-none">
      <div className="flex items-center justify-between !px-3 pt-6 pb-2">
        <Text
          size="1"
          weight="bold"
          className={cn(
            "uppercase tracking-wide text-[var(--gray-9)] transition-opacity duration-300 ease-in-out",
            isContentCollapsed ? "opacity-0" : "opacity-100"
          )}
        >
          {title}
        </Text>
      </div>
    </li>
  )
}

export default NavigationHeader
