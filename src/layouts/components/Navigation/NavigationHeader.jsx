import React from 'react'
import { useSelector } from 'react-redux'
import { Text } from '@radix-ui/themes'

/**
 * NavigationHeader - SOLO TAILWIND CLASSES
 * Headers de sección en la navegación
 * Se oculta cuando el sidebar está colapsado
 *
 * @param {Object} props
 * @param {string} props.title - Texto del header
 * @returns {JSX.Element|null}
 */
const NavigationHeader = ({ title }) => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  // Ocultar headers cuando el menú está colapsado
  if (menuCollapsed) {
    return null
  }

  return (
    <li className="list-none">
      <Text
        size="1"
        weight="bold"
        className="block px-10 py-4 mt-2 uppercase tracking-wide text-[var(--gray-9)]"
      >
        {title}
      </Text>
    </li>
  )
}

export default NavigationHeader
