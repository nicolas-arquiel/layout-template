import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { cn } from '../lib/utils'
import { closeMobileMenu } from '../store/layoutSlice'

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
            'animate-in fade-in duration-200', // Animación de entrada suave
            // Desktop width
            menuCollapsed ? 'w-[80px]' : 'w-[260px]',
            // Mobile
            'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40',
            'max-md:w-[260px]',
            'max-md:transform max-md:transition-transform max-md:duration-300',
            mobileMenuOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
          )}
        >
          <Sidebar />
        </aside>

        {/* ========== CONTENT AREA ========== */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* NAVBAR - floating-nav con margin exacto */}
          <div style={{ paddingTop: 'var(--floating-nav-margin)' }}>
            <div className="container-xxl mx-auto">
              <nav
                className={cn(
                  'bg-[var(--color-panel-solid)]',
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

          {/* CONTENT WRAPPER - content-padding exacto */}
          <main 
            className="flex-1 overflow-auto" 
            style={{ paddingTop: 'var(--content-padding)' }}
          >
            <div className="container-xxl mx-auto">
              {/* content-body - Outlet directo */}
              <div style={{ paddingBottom: 'var(--content-padding)' }}>
                <Outlet />
              </div>
            </div>
          </main>

          {/* FOOTER - footer-height exacto */}
          <footer style={{ height: 'var(--footer-height)' }}>
            <div className="container-xxl mx-auto h-full flex items-center">
              <span className="text-xs text-[var(--gray-11)]">
                Sistema de gestión (UCU), Universidad de Concepción del Uruguay
              </span>
            </div>
          </footer>
        </div>

        {/* Mobile Overlay con fade-in */}
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
