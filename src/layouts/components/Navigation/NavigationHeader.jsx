import { cn } from '../../../utils/cn'

/**
 * Componente para headers de sección en la navegación
 * Muestra un título no interactivo que divide secciones del menú
 *
 * @param {Object} props
 * @param {string} props.title - Texto del header
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export default function NavigationHeader({ title, className }) {
  return (
    <li className={cn('navigation-header', className)}>
      <span className="block px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {title}
      </span>
    </li>
  )
}
