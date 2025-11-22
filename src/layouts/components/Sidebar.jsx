import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'react-feather'
import { closeMobileMenu } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'
import { cn } from '../../utils/cn'

/**
 * Componente Sidebar con navegación vertical
 * Responsive con overlay en mobile y colapsible en desktop
 *
 * @param {Object} props
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export default function Sidebar({ className }) {
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)

  const handleCloseMobile = () => {
    dispatch(closeMobileMenu())
  }

  // Cerrar menú mobile al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        handleCloseMobile()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // Prevenir scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Overlay para mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={handleCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900',
          // Mobile: Fixed overlay
          'fixed left-0 top-16 z-50 w-[280px]',
          {
            '-translate-x-full': !mobileMenuOpen,
            'translate-x-0': mobileMenuOpen,
          },
          // Desktop: Fixed in place, parte del flujo
          {
            'md:translate-x-0 md:w-[280px]': !menuCollapsed,
            'md:translate-x-0 md:w-[70px]': menuCollapsed,
          },
          className
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menú
          </h2>
          <button
            onClick={handleCloseMobile}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <NavigationItems items={navigation} />
        </nav>

        {/* Sidebar footer (opcional) */}
        {!menuCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="text-sm font-bold">MA</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Mi Aplicación
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  v1.0.0
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
