import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cross1Icon, ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons'
import { Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '@/store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '@/navigation/vertical'
import { cn } from '@lib/utils'

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
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        handleCloseMobile()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  // En mobile, SIEMPRE mostrar expandido
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const effectiveCollapsed = isMobile ? false : menuCollapsed

  return (
    <div className="sidebar-container h-full flex flex-col overflow-hidden animate-in fade-in duration-300">
      {/* ========== HEADER ========== */}
      <div className={cn(
        "flex-shrink-0 h-[80px] !px-4 py-4 flex items-center border-b border-[var(--gray-4)]",
        effectiveCollapsed ? "justify-center" : "justify-between"
      )}>
        {/* Logo / App Name - Solo mostrar cuando NO está colapsado */}
        {!effectiveCollapsed && (
          <div className="flex items-center gap-3 flex-1 overflow-hidden animate-in fade-in slide-in-from-left duration-200">
            <Heading
              size="5"
              className="text-[var(--accent-9)] font-extrabold truncate tracking-tight whitespace-nowrap"
            >
              {import.meta.env.VITE_APP_NAME}
            </Heading>
          </div>
        )}

        {/* Toggle Button (Desktop) */}
        <div className="hidden md:flex">
          <IconButton
            variant="ghost"
            onClick={handleToggleCollapse}
            size="2"
            className="text-[var(--gray-11)] hover:text-[var(--accent-9)] hover:bg-[var(--accent-3)] transition-colors"
          >
            {effectiveCollapsed ? <ChevronRightIcon width="20" height="20" /> : <ChevronLeftIcon width="20" height="20" />}
          </IconButton>
        </div>

        {/* Close Button (Mobile) */}
        {!effectiveCollapsed && (
          <div className="block md:hidden">
            <IconButton variant="ghost" onClick={handleCloseMobile} size="2">
              <Cross1Icon width="20" height="20" />
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
