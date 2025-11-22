import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box } from '@radix-ui/themes'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ThemeCustomizer from '../components/ThemeCustomizer/ThemeCustomizer'
import { useThemeConfig } from '../App'

/**
 * Layout principal - Sidebar fijo + Main area con margin-left
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

  const sidebarWidth = menuCollapsed ? 70 : 270

  return (
    <Box
      style={{
        height: '100vh',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* ========== SIDEBAR - FIJO IZQUIERDA ========== */}
      <Box
        className="sidebar-container"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: `${sidebarWidth}px`,
          height: '100vh',
          backgroundColor: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--border-color)',
          zIndex: 40,
          transition: 'width 300ms ease-in-out',
        }}
      >
        <Sidebar />
      </Box>

      {/* ========== MAIN AREA - MARGIN LEFT ========== */}
      <Box
        style={{
          marginLeft: `${sidebarWidth}px`,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 300ms ease-in-out',
        }}
      >
        {/* NAVBAR - Solo en main area, SIN hamburger */}
        <Box
          style={{
            height: '64px',
            backgroundColor: 'var(--navbar-bg)',
            borderBottom: '1px solid var(--border-color)',
            position: themeConfig.navbarSticky ? 'sticky' : 'relative',
            top: 0,
            zIndex: 30,
          }}
        >
          <Navbar />
        </Box>

        {/* CONTENT AREA */}
        <Box
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
          }}
        >
          <Outlet />
        </Box>

        {/* FOOTER */}
        {themeConfig.footerType !== 'hidden' && (
          <Box
            style={{
              height: '48px',
              backgroundColor: 'var(--sidebar-bg)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 24px',
            }}
          >
            <Box
              style={{
                fontSize: 'var(--font-size-1)',
                color: 'var(--gray-11)',
              }}
            >
              Sistema de gestión (UCU), Universidad de Concepción del Uruguay
            </Box>
          </Box>
        )}
      </Box>

      {/* Theme Customizer */}
      <ThemeCustomizer />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <Box
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 35,
          }}
        />
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 767px) {
          .sidebar-container {
            transform: ${mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
          }
        }
      `}</style>
    </Box>
  )
}
