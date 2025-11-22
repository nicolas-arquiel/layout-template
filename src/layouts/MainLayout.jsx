import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import { useThemeConfig } from '../App'
import { cn } from '../lib/utils'

/**
 * Layout principal - CSS GRID CORRECTO
 * Sidebar AL LADO del contenido (NO encima)
 *
 * ESTRUCTURA GRID:
 * ┌──────────┬─────────────────┐
 * │ SIDEBAR  │ NAVBAR          │
 * │          ├─────────────────┤
 * │          │ CONTENT (Outlet)│
 * │          │                 │
 * │          ├─────────────────┤
 * │          │ FOOTER          │
 * └──────────┴─────────────────┘
 *
 * @returns {JSX.Element}
 */
export default function MainLayout() {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)
  const { themeConfig } = useThemeConfig()

  return (
    <div
      className={cn(
        'h-screen grid',
        // Grid columns: sidebar width cambia según collapsed
        menuCollapsed ? 'grid-cols-[80px_1fr]' : 'grid-cols-[270px_1fr]',
        // Mobile: stack vertical
        'max-md:grid-cols-1',
        'bg-[var(--bg-primary)]'
      )}
    >
      {/* ========== SIDEBAR - PRIMERA COLUMNA ========== */}
      <aside
        className={cn(
          'bg-[var(--sidebar-bg)] border-r border-[var(--border-color)]',
          'transition-all duration-300 ease-in-out',
          // Mobile: position fixed with overlay
          'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:w-[270px]',
          'max-md:transform',
          mobileMenuOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        )}
      >
        <Sidebar />
      </aside>

      {/* ========== MAIN AREA - SEGUNDA COLUMNA ========== */}
      <div className="grid grid-rows-[auto_1fr_auto] overflow-hidden">
        {/* NAVBAR */}
        <div
          className={cn(
            'h-16 bg-[var(--navbar-bg)] border-b border-[var(--border-color)]',
            'z-30',
            themeConfig.navbarSticky ? 'sticky top-0' : 'relative'
          )}
        >
          <Navbar />
        </div>

        {/* CONTENT AREA - Outlet está AL LADO del sidebar */}
        <main className="overflow-auto p-6">
          <Outlet />
        </main>

        {/* FOOTER */}
        {themeConfig.footerType !== 'hidden' && (
          <footer className="h-12 bg-[var(--sidebar-bg)] border-t border-[var(--border-color)] flex items-center justify-center px-6">
            <span className="text-xs text-[var(--gray-11)]">
              Sistema de gestión (UCU), Universidad de Concepción del Uruguay
            </span>
          </footer>
        )}
      </div>

      {/* Theme Customizer */}


      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden canvas-overlay" />
      )}
    </div>
  )
}
