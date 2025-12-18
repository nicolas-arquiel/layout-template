import React from 'react'
import { useSelector } from 'react-redux'
import { Text } from '@radix-ui/themes'
import { MoreHorizontal } from 'lucide-react'


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
        <div className="flex items-center justify-center">
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
      <div className="flex items-center justify-between !px-3">
        <Text
          size="1"
          weight="bold"
          className="uppercase tracking-wide text-[var(--gray-9)] transition-[clip-path] duration-150 ease-in-out"
          style={{
            clipPath: isContentCollapsed 
              ? 'inset(0 100% 0 0)' // Hidden: clipped from right
              : 'inset(0 0 0 0)'    // Visible: full reveal
          }}
        >
          {title}
        </Text>
      </div>
    </li>
  )
}

export default NavigationHeader
