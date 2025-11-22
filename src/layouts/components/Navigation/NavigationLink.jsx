import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Flex, Text, Badge, Tooltip } from '@radix-ui/themes'
import { closeMobileMenu } from '../../../store/layoutSlice'

/**
 * Componente para links individuales en la navegación con Radix UI
 * Utiliza NavLink de React Router para manejar estados activos
 *
 * @param {Object} props
 * @param {Object} props.item - Item de navegación
 * @param {string} props.item.title - Título del link
 * @param {string} props.item.navLink - Ruta del link
 * @param {React.Component} [props.item.icon] - Componente de icono
 * @param {string|number} [props.item.badge] - Texto del badge
 * @param {string} [props.item.badgeColor] - Color del badge
 * @param {boolean} [props.nested] - Si es un item anidado (hijo de un grupo)
 * @returns {JSX.Element}
 */
export default function NavigationLink({ item, nested = false }) {
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  const handleClick = () => {
    // Cerrar menú mobile al hacer click en un link
    dispatch(closeMobileMenu())
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

  const linkContent = (
    <NavLink
      to={item.navLink}
      onClick={handleClick}
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        paddingLeft: nested && !menuCollapsed ? 'var(--space-8)' : 'var(--space-4)',
        paddingRight: 'var(--space-4)',
        paddingTop: 'var(--space-2)',
        paddingBottom: 'var(--space-2)',
        marginBottom: '4px',
        fontSize: 'var(--font-size-2)',
        fontWeight: isActive ? '600' : '500',
        textDecoration: 'none',
        borderRadius: 'var(--radius-2)',
        transition: 'all 200ms ease-in-out',
        backgroundColor: isActive ? 'var(--accent-9)' : 'transparent',
        color: isActive ? 'white' : 'var(--gray-12)',
        justifyContent: menuCollapsed ? 'center' : 'flex-start',
      })}
    >
      {Icon && (
        <Box style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <Icon size={18} />
        </Box>
      )}

      {!menuCollapsed && (
        <Flex align="center" gap="2" style={{ flex: 1 }}>
          <Text size="2" style={{ flex: 1 }}>
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

  return (
    <Box asChild>
      <li style={{ listStyle: 'none' }}>
        {menuCollapsed ? (
          <Tooltip content={item.title} side="right" delayDuration={200}>
            {linkContent}
          </Tooltip>
        ) : (
          linkContent
        )}
      </li>
    </Box>
  )
}
