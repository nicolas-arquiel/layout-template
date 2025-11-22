import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Flex, Text } from '@radix-ui/themes'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ThemeCustomizer from '../components/ThemeCustomizer/ThemeCustomizer'
import { useThemeConfig } from '../App'

/**
 * Layout principal de la aplicación
 * ESTRUCTURA: Sidebar fijo a la izquierda (270px) + Main area con margin-left
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
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* ========== SIDEBAR - FIXED LEFT ========== */}
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
          zIndex: 1000,
          transition: 'width 300ms ease-in-out',
        }}
      >
        <Sidebar />
      </Box>

      {/* ========== MAIN AREA (Navbar + Content + Footer) ========== */}
      <Box
        style={{
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 300ms ease-in-out',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Navbar - Frame superior */}
        <Box
          style={{
            height: '72px',
            backgroundColor: 'var(--navbar-bg)',
            borderBottom: '1px solid var(--border-color)',
            position: themeConfig.navbarSticky ? 'sticky' : 'relative',
            top: 0,
            zIndex: 40,
          }}
        >
          <Navbar />
        </Box>

        {/* Content Area */}
        <Box
          style={{
            flex: 1,
            padding: '24px',
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        {themeConfig.footerType !== 'hidden' && (
          <Box
            style={{
              backgroundColor: 'var(--sidebar-bg)',
              borderTop: '1px solid var(--border-color)',
              padding: '12px 24px',
            }}
          >
            <Text size="1" color="gray">
              Sistema de gestión (UCU), Universidad de Concepción del Uruguay
            </Text>
          </Box>
        )}
      </Box>

      {/* Theme Customizer Canvas */}
      <ThemeCustomizer />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <Box
          onClick={() => {}}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}

      {/* CSS for responsive sidebar */}
      <style>{`
        /* Mobile: sidebar overlay */
        @media (max-width: 767px) {
          .sidebar-container {
            transform: ${mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform 300ms ease-in-out, width 300ms ease-in-out;
          }

          .main-area {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </Box>
  )
}
