import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Flex, Text, Badge } from '@radix-ui/themes'
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

  return (
    <Box asChild>
      <li>
        <NavLink
          to={item.navLink}
          onClick={handleClick}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            paddingLeft: nested && !menuCollapsed ? 'var(--space-8)' : 'var(--space-6)',
            paddingRight: 'var(--space-6)',
            paddingTop: 'var(--space-3)',
            paddingBottom: 'var(--space-3)',
            fontSize: 'var(--font-size-2)',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'background-color 200ms',
            backgroundColor: isActive ? 'var(--accent-3)' : 'transparent',
            color: isActive ? 'var(--accent-11)' : 'var(--gray-12)',
            borderRight: isActive ? '4px solid var(--accent-9)' : 'none',
            justifyContent: menuCollapsed ? 'center' : 'flex-start',
          })}
        >
          {Icon && (
            <Box style={{ flexShrink: 0 }}>
              <Icon size={20} />
            </Box>
          )}

          {!menuCollapsed && (
            <Flex align="center" gap="2" style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>{item.title}</Text>

              {item.badge && (
                <Badge color={getBadgeColor(item.badgeColor)} variant="soft">
                  {item.badge}
                </Badge>
              )}
            </Flex>
          )}
        </NavLink>
      </li>
    </Box>
  )
}
