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
const NavigationHeader = ({ title, forceExpanded = false }) => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  // Considerar forceExpanded para determinar si está colapsado
  const isCollapsed = menuCollapsed && !forceExpanded

  // Cuando está colapsado, mostrar solo "..."
  if (isCollapsed) {
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
          className="uppercase tracking-wide text-[var(--gray-9)]"
        >
          {title}
        </Text>
      </div>
    </li>
  )
}

export default NavigationHeader
