import { Heart } from 'react-feather'
import { cn } from '../../utils/cn'

/**
 * Componente Footer para el layout principal
 * Muestra información de copyright y créditos
 *
 * @param {Object} props
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export default function Footer({ className }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} Mi App. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <span>Hecho con</span>
          <Heart size={14} className="fill-red-500 text-red-500" />
          <span>usando React + Radix UI</span>
        </div>
      </div>
    </footer>
  )
}
