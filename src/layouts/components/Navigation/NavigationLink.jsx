import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeMobileMenu } from '../../../store/layoutSlice'
import { cn } from '../../../utils/cn'

/**
 * Componente para links individuales en la navegación
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
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export default function NavigationLink({ item, nested = false, className }) {
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  const handleClick = () => {
    // Cerrar menú mobile al hacer click en un link
    dispatch(closeMobileMenu())
  }

  return (
    <li className={cn('nav-item', className)}>
      <NavLink
        to={item.navLink}
        onClick={handleClick}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
            {
              'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-r-4 border-blue-600':
                isActive,
              'text-gray-700 dark:text-gray-300': !isActive,
              'pl-14': nested && !menuCollapsed,
              'justify-center': menuCollapsed,
            }
          )
        }
      >
        {Icon && (
          <span className="flex-shrink-0">
            <Icon size={20} />
          </span>
        )}

        {!menuCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>

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
          </>
        )}
      </NavLink>
    </li>
  )
}
