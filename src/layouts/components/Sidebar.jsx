import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, X, Disc, Circle } from 'react-feather'
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

  return (
    <Flex direction="column" className="h-full bg-[var(--sidebar-bg)] shadow-xl transition-all duration-300 ease-in-out">
      {/* ========== SIDEBAR HEADER ========== */}
      <div className="h-[80px] px-6 flex items-center justify-between">
        {/* App Name & Logo Container */}
        <div 
          className={cn(
            "flex items-center gap-3 overflow-hidden transition-all duration-300 ease-in-out",
            menuCollapsed ? "w-0 opacity-0" : "w-full opacity-100"
          )}
        >
          {/* Logo placeholder if needed */}
          {/* <img src="/logo.png" alt="logo" className="w-8 h-8" /> */}
          <Heading
            size="5"
            className="text-[var(--accent-9)] font-bold truncate tracking-tight whitespace-nowrap"
          >
            {import.meta.env.VITE_APP_NAME}
          </Heading>
        </div>

        {/* Toggle Button (Desktop) */}
        <div className="hidden md:block ml-auto">
          <IconButton 
            variant="ghost" 
            onClick={handleToggleCollapse} 
            size="2"
            className="text-[var(--gray-11)] hover:text-[var(--accent-9)] hover:bg-[var(--accent-3)] transition-colors"
          >
            {/* Disc/Circle metaphor for pinned/unpinned */}
            {!menuCollapsed ? <Disc size={20} /> : <Circle size={20} />}
          </IconButton>
        </div>

        {/* Close Button (Mobile) */}
        <div className="block md:hidden ml-auto">
          <IconButton variant="ghost" onClick={handleCloseMobile} size="2">
            <X size={20} />
          </IconButton>
        </div>
      </div>

      {/* ========== NAVIGATION ========== */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <nav className="py-2 space-y-1">
            <NavigationItems items={navigation} />
          </nav>
        </ScrollArea>
      </div>
    </Flex>
  )
}

export default Sidebar
