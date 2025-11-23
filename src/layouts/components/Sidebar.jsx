import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, ChevronRight, ChevronLeft } from 'react-feather'
import { Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'
import { cn } from '../../lib/utils'

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
    <div className="h-full flex flex-col bg-[var(--color-panel-solid)] overflow-hidden">
      {/* ========== HEADER ========== */}
      <div className="flex-shrink-0 h-[80px] px-4 py-4 flex items-center justify-between border-b border-[var(--gray-4)]">
        {/* Logo / App Name */}
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          {effectiveCollapsed ? (
            <Heading
              size="5"
              className="text-[var(--accent-9)] font-extrabold tracking-tight"
            >
              {import.meta.env.VITE_APP_NAME?.split(' ').map(word => word[0]).join('').slice(0, 2) || 'MA'}
            </Heading>
          ) : (
            <Heading
              size="5"
              className="text-[var(--accent-9)] font-extrabold truncate tracking-tight whitespace-nowrap"
            >
              {import.meta.env.VITE_APP_NAME}
            </Heading>
          )}
        </div>

        {/* Toggle Button (Desktop) */}
        <div className="hidden md:flex ml-3">
          <IconButton
            variant="ghost"
            onClick={handleToggleCollapse}
            size="2"
            className="text-[var(--gray-11)] hover:text-[var(--accent-9)] hover:bg-[var(--accent-3)] transition-colors"
            title={effectiveCollapsed ? "Expandir sidebar" : "Contraer sidebar"}
          >
            {effectiveCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
        </div>

        {/* Close Button (Mobile) */}
        <div className="block md:hidden ml-3">
          <IconButton variant="ghost" onClick={handleCloseMobile} size="2">
            <X size={20} />
          </IconButton>
        </div>
      </div>

      {/* ========== NAVIGATION ========== */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full" type="auto">
          <div className="py-4 px-4">
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
