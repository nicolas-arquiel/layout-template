import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box } from '@radix-ui/themes'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ThemeCustomizer from '../components/ThemeCustomizer/ThemeCustomizer'
import ResponsiveContainer from '../components/ui/ResponsiveContainer'
import { useThemeConfig } from '../App'
import { cn } from '../lib/utils'

/**
 * Layout principal - SOLO TAILWIND CLASSES
 * Sidebar fijo + Main area responsivo
 *
 * ESTRUCTURA:
 * ┌──────────────────────────────────────┐
 * │ SIDEBAR (fijo) │ NAVBAR              │
 * │                ├─────────────────────┤
 * │                │ CONTENT             │
 * │                │                     │
 * │                ├─────────────────────┤
 * │                │ FOOTER              │
 * └──────────────────────────────────────┘
 *
 * @returns {JSX.Element}
 */
export default function MainLayout() {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)
  const { themeConfig } = useThemeConfig()

  return (
    <div className="h-screen bg-[var(--bg-primary)]">
      {/* ========== SIDEBAR - FIJO IZQUIERDA ========== */}
      <div
        className={cn(
          'fixed left-0 top-0 h-screen z-40',
          'bg-[var(--sidebar-bg)] border-r border-[var(--border-color)]',
          'transition-all duration-300 ease-in-out',
          menuCollapsed ? 'w-20' : 'w-[270px]',
          // Mobile: slide from left
          'md:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar />
      </div>

      {/* ========== MAIN AREA - MARGIN LEFT ========== */}
      <ResponsiveContainer sidebarCollapsed={menuCollapsed}>
        <div className="h-screen flex flex-col">
          {/* NAVBAR - Solo en main area, SIN hamburger */}
          <div
            className={cn(
              'h-16 bg-[var(--navbar-bg)] border-b border-[var(--border-color)]',
              'z-30',
              themeConfig.navbarSticky ? 'sticky top-0' : 'relative'
            )}
          >
            <Navbar />
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>

          {/* FOOTER */}
          {themeConfig.footerType !== 'hidden' && (
            <div className="h-12 bg-[var(--sidebar-bg)] border-t border-[var(--border-color)] flex items-center justify-center px-6">
              <span className="text-xs text-[var(--gray-11)]">
                Sistema de gestión (UCU), Universidad de Concepción del Uruguay
              </span>
            </div>
          )}
        </div>
      </ResponsiveContainer>

      {/* Theme Customizer */}
      <ThemeCustomizer />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-35 md:hidden canvas-overlay" />
      )}
    </div>
  )
}
