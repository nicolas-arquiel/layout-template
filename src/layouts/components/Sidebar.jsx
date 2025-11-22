import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, X } from 'react-feather'
import { Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'
import { cn } from '../../lib/utils'

/**
 * Sidebar - SOLO TAILWIND CLASSES
 * Fijo a la izquierda con header UCU GESTIÓN
 *
 * @returns {JSX.Element}
 */
export default function Sidebar() {
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)

  const handleCloseMobile = () => {
    dispatch(closeMobileMenu())
  }

  const handleToggleCollapse = () => {
    dispatch(handleMenuCollapsed(!menuCollapsed))
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

  return (
    <Flex direction="column" className="h-full">
      {/* ========== SIDEBAR HEADER ========== */}
      <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-3">
        {/* Desktop: Menu toggle */}
        <div className="hidden md:block">
          <IconButton variant="ghost" onClick={handleToggleCollapse} size="2">
            <Menu size={18} />
          </IconButton>
        </div>

        {/* Mobile: Close button */}
        <div className="block md:hidden">
          <IconButton variant="ghost" onClick={handleCloseMobile} size="2">
            <X size={18} />
          </IconButton>
        </div>

        {/* App Name */}
        {!menuCollapsed && (
          <Heading
            size="4"
            className={cn(
              'text-[var(--accent-9)] font-semibold',
              'transition-opacity duration-300 ease-in-out'
            )}
          >
            UCU GESTIÓN
          </Heading>
        )}
      </div>

      {/* ========== NAVIGATION ========== */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <nav className="p-3">
            <NavigationItems items={navigation} />
          </nav>
        </ScrollArea>
      </div>
    </Flex>
  )
}
