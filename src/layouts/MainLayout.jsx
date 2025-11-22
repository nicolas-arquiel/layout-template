import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
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
const MainLayout = () => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* ========== SIDEBAR ========== */}
      <aside
        className={cn(
          'bg-[var(--sidebar-bg)] border-r border-[var(--border-color)]',
          'transition-[width] duration-300 ease-in-out', // Smooth width transition
          'flex-shrink-0',
          // Desktop width based on collapsed state
          menuCollapsed ? 'w-[80px]' : 'w-[260px]',
          // Mobile: fixed position
          'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:w-[260px]',
          'max-md:transform',
          mobileMenuOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        )}
      >
        <Sidebar />
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ease-in-out">
        {/* NAVBAR */}
        <div className="h-16 bg-[var(--navbar-bg)] border-b border-[var(--border-color)] z-30">
          <Navbar />
        </div>

        {/* CONTENT SCROLL AREA */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

        {/* FOOTER */}
        <footer className="h-12 bg-[var(--sidebar-bg)] border-t border-[var(--border-color)] flex items-center justify-center px-6">
          <span className="text-xs text-[var(--gray-11)]">
            Sistema de gestión (UCU), Universidad de Concepción del Uruguay
          </span>
        </footer>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden canvas-overlay" />
      )}
    </div>
  )
}

export default MainLayout
