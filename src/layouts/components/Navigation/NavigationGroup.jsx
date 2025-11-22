import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import NavigationLink from './NavigationLink'
import { cn } from '../../../utils/cn'

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
 * Componente para grupos colapsibles en la navegación
 * Utiliza Radix UI Collapsible para animaciones suaves
 *
 * @param {Object} props
 * @param {Object} props.item - Item de navegación con children
 * @param {string} props.item.title - Título del grupo
 * @param {React.Component} [props.item.icon] - Componente de icono
 * @param {Array} props.item.children - Items hijos
 * @param {string|number} [props.item.badge] - Texto del badge
 * @param {string} [props.item.badgeColor] - Color del badge
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export default function NavigationGroup({ item, className }) {
  const location = useLocation()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  // Determinar si el grupo debe estar abierto por defecto
  const isActive = hasActiveChild(item.children, location.pathname)
  const [open, setOpen] = useState(isActive)

  // Si el menú está colapsado, no mostrar el grupo
  if (menuCollapsed) {
    return null
  }

  return (
    <li className={cn('nav-item nav-group', className)}>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger
          className={cn(
            'flex w-full items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
            {
              'bg-gray-50 dark:bg-gray-800/50': isActive,
              'text-gray-700 dark:text-gray-300': !isActive,
            }
          )}
        >
          {Icon && (
            <span className="flex-shrink-0">
              <Icon size={20} />
            </span>
          )}

          <span className="flex-1 text-left">{item.title}</span>

          {item.badge && (
            <span
              className={cn(
                'inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full',
                {
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400':
                    item.badgeColor === 'error' || !item.badgeColor,
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400':
                    item.badgeColor === 'success',
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400':
                    item.badgeColor === 'primary',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400':
                    item.badgeColor === 'warning',
                }
              )}
            >
              {item.badge}
            </span>
          )}

          <ChevronDown
            size={16}
            className={cn(
              'flex-shrink-0 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </Collapsible.Trigger>

        <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=open]:animate-[collapsible-down_200ms_ease-out]">
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
