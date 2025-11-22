import { NavLink } from 'react-router-dom'
import { Flex, Text, Badge, Tooltip } from '@radix-ui/themes'
import { cn } from '../../lib/utils'
import { useSelector } from 'react-redux'

/**
 * NavigationItem - ALTURA CORRECTA + THEME VARS
 * Item de navegación con altura h-11, texto legible, theme provider vars
 *
 * @param {Object} props
 * @param {Object} props.item - Item de navegación (title, icon, navLink, badge, etc)
 * @param {boolean} [props.nested] - Si es un item anidado (sub-item)
 * @param {boolean} [props.showTooltip] - Mostrar tooltip cuando sidebar colapsado
 * @param {string} [props.className] - Clases adicionales
 * @returns {JSX.Element}
 */
export default function NavigationItem({ item, nested = false, showTooltip = false, className, ...props }) {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

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

  const linkContent = (
    <NavLink
      to={item.navLink}
      onClick={item.onClick}
      className={({ isActive }) =>
        cn(
          // ALTURA Y PADDING CORRECTOS
          'flex items-center gap-3 px-3 py-2 mb-1 rounded-md',
          'h-11', // ALTURA FIJA CORRECTA
          'text-sm font-medium no-underline',
          'transition-all duration-200 ease-in-out',
          // Nested padding
          nested && !menuCollapsed && 'pl-8',
          // Collapsed center alignment
          menuCollapsed && 'justify-center',
          // Active state - Theme provider vars
          isActive &&
            'bg-[var(--accent-9)] text-[var(--accent-9-contrast)] font-semibold shadow-lg',
          // Inactive state - Theme provider vars
          !isActive &&
            'text-[var(--gray-11)] hover:bg-[var(--gray-3)] hover:text-[var(--gray-12)]',
          className
        )
      }
      {...props}
    >
      {Icon && (
        <span className="flex-shrink-0 flex items-center">
          <Icon size={20} />
        </span>
      )}

      {!menuCollapsed && (
        <Flex align="center" gap="2" className="flex-1">
          {/* TEXTO LEGIBLE - Size 3 */}
          <Text size="3" weight="medium" className="flex-1">
            {item.title}
          </Text>

          {item.badge && (
            <Badge color={getBadgeColor(item.badgeColor)} variant="soft" size="1">
              {item.badge}
            </Badge>
          )}
        </Flex>
      )}
    </NavLink>
  )

  // Mostrar tooltip solo cuando collapsed
  if (menuCollapsed && showTooltip) {
    return (
      <li className="list-none">
        <Tooltip content={item.title} side="right" delayDuration={200}>
          {linkContent}
        </Tooltip>
      </li>
    )
  }

  return <li className="list-none">{linkContent}</li>
}
