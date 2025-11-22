import { cn } from '../../lib/utils'

/**
 * ResponsiveContainer - Container responsivo que se ajusta al sidebar
 * USA SOLO CLASES DE TAILWIND - Sin estilos inline
 *
 * @param {Object} props
 * @param {boolean} props.sidebarCollapsed - Estado del sidebar
 * @param {React.ReactNode} props.children - Contenido
 * @param {string} [props.className] - Clases adicionales
 * @returns {JSX.Element}
 */
export default function ResponsiveContainer({ sidebarCollapsed, children, className, ...props }) {
  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out',
        sidebarCollapsed ? 'ml-20' : 'ml-[270px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
