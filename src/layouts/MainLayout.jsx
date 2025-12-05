import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ErrorBoundary } from '@components'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Box, ScrollArea } from '@radix-ui/themes'
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

  // Handle responsive sidebar behavior - REMOVED auto-collapse logic

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="flex h-screen overflow-hidden">
        {/* ========== SIDEBAR ========== */}
        <aside
          className={cn(
            'transition-all duration-300 ease-in-out',
            'flex-shrink-0',
            'relative',
            'h-screen',
            'animate-in fade-in duration-200',
            menuLayout === 'horizontal' ? 'hidden xl:hidden' : (menuCollapsed ? 'w-[80px]' : 'w-[260px]'),
            'max-xl:fixed max-xl:inset-y-0 max-xl:left-0 max-xl:z-40 max-xl:block',
            'max-xl:w-[260px]',
            'max-xl:transform max-xl:transition-transform max-xl:duration-300',
            mobileMenuOpen ? 'max-xl:translate-x-0' : 'max-xl:-translate-x-full'
          )}
        >
          <Sidebar />
        </aside>

        {/* ========== CONTENT AREA ========== */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* NAVBAR - Absolute positioning for glass effect */}
          <div
            className="absolute top-0 left-0 w-full z-10 pointer-events-none"
            style={{
              paddingTop: 'var(--floating-nav-margin)',
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

          {/* CONTENT WRAPPER - ScrollArea */}
          <ScrollArea type="hover" scrollbars="vertical" style={{ height: '100%' }}>
            <main
              className="w-full"
              style={{
                paddingTop: 'calc(var(--floating-nav-margin) + var(--navbar-height) + var(--content-padding))'
              }}
            >
              <div className={cn(
                'mx-auto',
                menuLayout === 'horizontal' ? 'container-xxl-horizontal' : 'container-xxl'
              )}>
                {/* content-body */}
                <div style={{ 
                  paddingBottom: 'var(--content-padding)',
                  minHeight: '100vh' 
                }}>
                  <ErrorBoundary>
                    <Outlet />
                  </ErrorBoundary>
                </div>
              </div>


            </main>
          </ScrollArea>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 xl:hidden animate-in fade-in duration-300"
            onClick={() => dispatch(closeMobileMenu())}
          />
        )}
      </div>
    </div>
  )
}

export default MainLayout
