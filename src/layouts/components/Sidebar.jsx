import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, X, Disc, Circle } from 'react-feather'
import { Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'
import { cn } from '../../lib/utils'

/**
 * Sidebar - SOLO TAILWIND CLASSES
 * Fijo a la izquierda con header UCU GESTIÓN
 * Con hover flyout cuando está colapsado (desktop)
 *
 * @returns {JSX.Element}
 */
const Sidebar = () => {
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)
  const [hoverExpanded, setHoverExpanded] = React.useState(false)

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

  // Determinar si se debe mostrar expandido (hover flyout)
  const shouldShowExpanded = menuCollapsed && hoverExpanded

  // En mobile, SIEMPRE mostrar expandido (ignorar menuCollapsed)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const effectiveCollapsed = isMobile ? false : menuCollapsed

  return (
    <div
      className={cn(
        // Base styles con transición
        "h-full flex flex-col bg-[var(--color-panel-solid)]",
        "transition-all duration-300 ease-in-out overflow-hidden",

        // Hover expanded (flyout absoluto)
        shouldShowExpanded && "absolute inset-y-0 left-0 w-[260px] z-50 menu-shadow",

        // Estados normales (NO hover)
        !shouldShowExpanded && [
          // Mobile: siempre expandido
          isMobile && "w-[260px]",

          // Desktop collapsed: 80px
          !isMobile && menuCollapsed && "w-[80px]",

          // Desktop expanded: 260px
          !isMobile && !menuCollapsed && "w-[260px]",
        ]
      )}
      onMouseEnter={() => effectiveCollapsed && setHoverExpanded(true)}
      onMouseLeave={() => setHoverExpanded(false)}
    >
      {/* ========== NAVBAR HEADER ========== */}
      <div className="navbar-header">
        <div className="h-[80px] px-6 py-4 flex items-center justify-between">
          {/* App Name & Logo Container */}
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            {/* Cuando está colapsado (sin hover), mostrar solo iniciales */}
            {effectiveCollapsed && !shouldShowExpanded ? (
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

          {/* Toggle Button (Desktop) - Solo mostrar cuando no está colapsado o está en hover */}
          <div className={cn(
            "hidden md:block ml-3 transition-opacity duration-300",
            effectiveCollapsed && !shouldShowExpanded && "opacity-0 pointer-events-none"
          )}>
            <IconButton
              variant="ghost"
              onClick={handleToggleCollapse}
              size="2"
              className="text-[var(--gray-11)] hover:text-[var(--accent-9)] hover:bg-[var(--accent-3)] transition-colors"
            >
              {/* Disc/Circle metaphor for pinned/unpinned */}
              {!effectiveCollapsed ? <Disc size={20} /> : <Circle size={20} />}
            </IconButton>
          </div>

          {/* Close Button (Mobile) - Solo en mobile */}
          <div className="block md:hidden ml-3">
            <IconButton variant="ghost" onClick={handleCloseMobile} size="2">
              <X size={20} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* ========== SHADOW BOTTOM (Vuexy style) ========== */}
      <div className="shadow-bottom"></div>

      {/* ========== SCROLLBAR CONTAINER ========== */}
      <div className="flex-1 overflow-hidden scrollbar-container main-menu-content">
        <ScrollArea className="h-full" type="auto">
          {/*
            IMPORTANTE: El padding debe ir en un div dentro del ScrollArea.
            ScrollArea de Radix tiene estructura: Root > Viewport > children
            El padding necesita estar en el children directo del Viewport
          */}
          <div className="p-4">
            <nav>
              <NavigationItems items={navigation} forceExpanded={shouldShowExpanded || isMobile} />
            </nav>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default Sidebar
