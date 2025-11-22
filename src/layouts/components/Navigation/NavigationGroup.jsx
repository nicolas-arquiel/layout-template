import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import { Text, Badge } from '@radix-ui/themes'
import NavigationLink from './NavigationLink'
import { cn } from '../../../lib/utils'

/**
 * Verifica si alguna ruta hija está activa
 * @param {Array} children - Array de items hijos
 * @param {string} currentPath - Ruta actual
 * @returns {boolean}
 */
function hasActiveChild(children, currentPath) {
  return children.some((child) => {
    if (child.children) {
      return hasActiveChild(child.children, currentPath)
    }
    return child.navLink === currentPath
  })
}

/**
 * NavigationGroup - SOLO TAILWIND CLASSES
 * Grupos colapsibles en la navegación con Radix UI
 *
 * @param {Object} props
 * @param {Object} props.item - Item de navegación con children
 * @returns {JSX.Element}
 */
export default function NavigationGroup({ item }) {
  const location = useLocation()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  // Determinar si el grupo debe estar abierto por defecto
  const isActive = hasActiveChild(item.children, location.pathname)
  const [open, setOpen] = useState(isActive)

  // Si el menú está colapsado, mostrar solo los hijos como links individuales con tooltips
  if (menuCollapsed) {
    return (
      <>
        {item.children.map((child) => (
          <NavigationLink key={child.id} item={child} />
        ))}
      </>
    )
  }

  const getBadgeColor = (color) => {
    switch (color) {
      case 'error':
        return 'red'
      case 'success':
        return 'green'
      case 'primary':
        return 'blue'
      case 'warning':
        return 'amber'
      default:
        return 'red'
    }
  }

  return (
    <li className="list-none">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <button
            className={cn(
              'flex w-full items-center gap-3 px-4 py-2 mb-1 rounded-md',
              'text-sm font-medium border-none cursor-pointer text-left',
              'transition-all duration-300 ease-in-out',
              isActive
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                : 'bg-transparent text-gray-600 dark:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            {Icon && (
              <span className="flex-shrink-0 flex items-center">
                <Icon size={20} />
              </span>
            )}

            <Text className="flex-1">{item.title}</Text>

            {item.badge && (
              <Badge color={getBadgeColor(item.badgeColor)} variant="soft">
                {item.badge}
              </Badge>
            )}

            <span
              className={cn(
                'flex-shrink-0 transition-transform duration-200',
                open && 'rotate-180'
              )}
            >
              <ChevronDown size={16} />
            </span>
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content className="overflow-hidden">
          <ul className="py-1">
            {item.children.map((child) => (
              <NavigationLink key={child.id} item={child} nested />
            ))}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  )
}
