import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import { Box, Flex, Text, Badge, Tooltip } from '@radix-ui/themes'
import NavigationLink from './NavigationLink'

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
 * Componente para grupos colapsibles en la navegación con Radix UI
 * Utiliza Radix UI Collapsible para animaciones suaves
 *
 * @param {Object} props
 * @param {Object} props.item - Item de navegación con children
 * @param {string} props.item.title - Título del grupo
 * @param {React.Component} [props.item.icon] - Componente de icono
 * @param {Array} props.item.children - Items hijos
 * @param {string|number} [props.item.badge] - Texto del badge
 * @param {string} [props.item.badgeColor] - Color del badge
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
    <Box asChild>
      <li>
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger asChild>
            <button
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                gap: 'var(--space-3)',
                paddingLeft: 'var(--space-6)',
                paddingRight: 'var(--space-6)',
                paddingTop: 'var(--space-3)',
                paddingBottom: 'var(--space-3)',
                fontSize: 'var(--font-size-2)',
                fontWeight: '500',
                transition: 'background-color 200ms',
                backgroundColor: isActive ? 'var(--gray-3)' : 'transparent',
                color: 'var(--gray-12)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {Icon && (
                <Box style={{ flexShrink: 0 }}>
                  <Icon size={20} />
                </Box>
              )}

              <Text style={{ flex: 1 }}>{item.title}</Text>

              {item.badge && (
                <Badge color={getBadgeColor(item.badgeColor)} variant="soft">
                  {item.badge}
                </Badge>
              )}

              <Box
                style={{
                  flexShrink: 0,
                  transition: 'transform 200ms',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ChevronDown size={16} />
              </Box>
            </button>
          </Collapsible.Trigger>

          <Collapsible.Content
            style={{
              overflow: 'hidden',
            }}
          >
            <Box py="1" asChild>
              <ul>
                {item.children.map((child) => (
                  <NavigationLink key={child.id} item={child} nested />
                ))}
              </ul>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </li>
    </Box>
  )
}
