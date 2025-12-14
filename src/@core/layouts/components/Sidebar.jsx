import { VITE_APP_ABR_BASENAME } from '@config'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '@/store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '@/navigation/vertical'


/**
 * Sidebar - Navegación lateral completamente rediseñado
 * Simple, limpio, sin padding interno (el padding viene de MainLayout)
 */
const Sidebar = () => {
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
      if (window.innerWidth >= 1280 && mobileMenuOpen) {
        handleCloseMobile()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // En mobile, SIEMPRE mostrar expandido
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1280
  const effectiveCollapsed = isMobile ? false : menuCollapsed

  return (
    <div className="sidebar-container h-full flex flex-col overflow-hidden animate-in fade-in duration-300">
      {/* ========== HEADER ========== */}
      <div className={`flex-shrink-0 h-[80px] !px-4 py-4 flex items-center ${effectiveCollapsed ? "justify-center" : "justify-between"}`}>
        {/* Logo / App Name - Reveals from left to right */}
        <div className={`flex items-center gap-3 overflow-hidden transition-[width] duration-300 ease-in-out ${effectiveCollapsed ? "w-0" : "flex-1"}`}>
          <Heading
            size="5"
            className="text-[var(--accent-9)] font-extrabold truncate tracking-tight whitespace-nowrap transition-[clip-path] duration-150 ease-in-out"
            style={{
              clipPath: menuCollapsed 
                ? 'inset(0 100% 0 0)' // Hidden: clipped from right
                : 'inset(0 0 0 0)'    // Visible: full reveal
            }}
          >
            {VITE_APP_ABR_BASENAME || "Sistema"}
          </Heading>
        </div>

        {/* Toggle Button (Desktop) */}
        <div className="hidden xl:flex">
          <IconButton
            variant="ghost"
            onClick={handleToggleCollapse}
            size="2"
            className="text-[var(--gray-11)] hover:text-[var(--accent-9)] hover:bg-[var(--accent-3)] transition-colors"
          >
            {effectiveCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
        </div>

        {/* Close Button (Mobile) */}
        {!effectiveCollapsed && (
          <div className="block xl:hidden">
            <IconButton variant="ghost" onClick={handleCloseMobile} size="2">
              <X size={20} />
            </IconButton>
          </div>
        )}
      </div>

      {/* ========== NAVIGATION ========== */}
      <div className="flex-1 overflow-hidden !px-2">
        <ScrollArea
          className="h-full w-full sidebar-scroll"
          type="hover"
          scrollbars="vertical"
        >
          <div className="py-4 px-2">
            <nav>
              <NavigationItems items={navigation} forceExpanded={isMobile} />
            </nav>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default Sidebar
