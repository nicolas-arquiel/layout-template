import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HorizontalNav from './components/HorizontalNav'
import { cn } from '../lib/utils'
import { closeMobileMenu, handleMenuCollapsed } from '@src/store/layoutSlice'

/**
 * Layout principal - VUEXY EXACT REPLICATION
 * Valores exactos del SCSS de Vuexy:
 * - content-padding: 2rem (32px)
 * - navbar-height: 4.45rem (71px)
 * - floating-nav-margin: 1.3rem (21px)
 * - footer-height: 3.35rem (54px)
 *
 * @returns {JSX.Element}
 */
const MainLayout = () => {
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)
  const menuLayout = useSelector((state) => state.layout.menuLayout)

  // Ref to track previous window width to detect threshold crossing
  const prevWidthRef = React.useRef(window.innerWidth)

  // Handle responsive sidebar behavior
  React.useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth
      const prevWidth = prevWidthRef.current

      // Check if we crossed the 1200px threshold
      if (currWidth < 1200 && prevWidth >= 1200) {
        // Crossing down: Auto-collapse
        dispatch(handleMenuCollapsed(true))
      } else if (currWidth >= 1200 && prevWidth < 1200) {
        // Crossing up: Auto-expand
        dispatch(handleMenuCollapsed(false))
      }

      prevWidthRef.current = currWidth
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch])

  // Initial check on mount (optional, or rely on default state)
  React.useEffect(() => {
    if (window.innerWidth < 1200 && window.innerWidth >= 768) {
      dispatch(handleMenuCollapsed(true))
    }
  }, [dispatch])

  // Ref for main content to detect scrollbar
  const mainRef = React.useRef(null)

  // Detect scrollbar and set CSS variable
  React.useEffect(() => {
    const checkScrollbar = () => {
      if (mainRef.current) {
        const hasScrollbar = mainRef.current.scrollHeight > mainRef.current.clientHeight
        // Get exact scrollbar width (usually 8px from css, but better to measure or set standard)
        // Since we use custom scrollbar of 8px in utilities.css, we can use 8px or 0px
        const scrollbarWidth = hasScrollbar ? 8 : 0
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
      }
    }

    // Check on mount, resize, and mutation (content change)
    checkScrollbar()
    window.addEventListener('resize', checkScrollbar)

    // Observer for content changes
    const observer = new MutationObserver(checkScrollbar)
    if (mainRef.current) {
      observer.observe(mainRef.current, { childList: true, subtree: true, attributes: true })
    }

    return () => {
      window.removeEventListener('resize', checkScrollbar)
      observer.disconnect()
      document.documentElement.style.removeProperty('--scrollbar-width')
    }
  }, [mobileMenuOpen, menuCollapsed]) // Re-check when layout changes

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="flex h-screen overflow-hidden">
        {/* ========== SIDEBAR - Siempre renderizado, controlado por CSS ========== */}
        <aside
          className={cn(
            'transition-all duration-300 ease-in-out',
            'flex-shrink-0',
            'relative',
            'h-screen',
            'animate-in fade-in duration-200',
            // Desktop width - Oculto si es horizontal
            menuLayout === 'horizontal' ? 'hidden md:hidden' : (menuCollapsed ? 'w-[80px]' : 'w-[260px]'),
            // Mobile - Siempre disponible como drawer
            'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:block',
            'max-md:w-[260px]',
            'max-md:transform max-md:transition-transform max-md:duration-300',
            mobileMenuOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
          )}
        >
          <Sidebar />
        </aside>

        {/* ========== CONTENT AREA ========== */}
        <div className="flex-1 relative overflow-hidden">
          {/* NAVBAR - Absolute positioning for glass effect */}
          <div
            className="absolute top-0 left-0 w-full z-10 pointer-events-none"
            style={{
              paddingTop: 'var(--floating-nav-margin)',
              paddingRight: 'var(--scrollbar-width, 0px)'
            }}
          >
            <div className={cn(
              'mx-auto pointer-events-auto',
              menuLayout === 'horizontal' ? 'container-xxl-horizontal' : 'container-xxl'
            )}>
              <nav
                className={cn(
                  'navbar-container',
                  'rounded-lg',
                  'navbar-shadow',
                  'transition-all duration-300'
                )}
                style={{ height: 'var(--navbar-height)' }}
              >
                <Navbar />
              </nav>
            </div>
          </div>

          {/* CONTENT WRAPPER - Full height scrollable */}
          <main
            ref={mainRef}
            className="h-full w-full overflow-y-auto overflow-x-hidden"
            style={{
              paddingTop: 'calc(var(--floating-nav-margin) + var(--navbar-height) + var(--content-padding))'
            }}
          >
            <div className={cn(
              'mx-auto',
              menuLayout === 'horizontal' ? 'container-xxl-horizontal' : 'container-xxl'
            )}>
              {/* content-body - Outlet directo */}
              <div style={{ paddingBottom: 'var(--content-padding)' }}>
                <Outlet />
              </div>
            </div>

            {/* FOOTER - footer-height exacto */}
            <footer style={{ height: 'var(--footer-height)' }}>
              <div className={cn(
                'mx-auto h-full flex items-center',
                menuLayout === 'horizontal' ? 'container-xxl-horizontal' : 'container-xxl'
              )}>
                <span className="text-xs text-[var(--gray-11)]">
                  Sistema de gestión (UCU), Universidad de Concepción del Uruguay
                </span>
              </div>
            </footer>
          </main>
        </div>

        {/* Mobile Overlay con fade-in - Siempre disponible en mobile si está abierto */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in duration-300"
            onClick={() => dispatch(closeMobileMenu())}
          />
        )}
      </div>
    </div>
  )
}

export default MainLayout
