import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Flex } from '@radix-ui/themes'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ThemeCustomizer from '../components/ThemeCustomizer/ThemeCustomizer'
import { useThemeConfig } from '../App'

/**
 * Layout principal de la aplicación con Radix UI
 * ESTRUCTURA: Sidebar full-height AL LADO del contenido
 * Navbar es solo un frame superior dentro del main area
 *
 * @returns {JSX.Element}
 */
export default function MainLayout() {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)
  const { themeConfig } = useThemeConfig()

  return (
    <Flex style={{ height: '100vh', overflow: 'hidden' }}>
      {/* ========== SIDEBAR - FULL HEIGHT ========== */}
      <Box
        className="sidebar-container"
        style={{
          height: '100vh',
          borderRight: '1px solid var(--gray-6)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Sidebar />
      </Box>

      {/* ========== MAIN AREA (Navbar + Content + Footer) ========== */}
      <Flex
        direction="column"
        style={{
          flex: 1,
          minWidth: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Navbar - Solo frame superior */}
        <Navbar />

        {/* Content Area - Scrollable */}
        <Box
          style={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          <Box
            style={{
              padding: 'var(--space-6)',
              maxWidth: themeConfig.contentWidth === 'boxed' ? '1280px' : '100%',
              margin: themeConfig.contentWidth === 'boxed' ? '0 auto' : '0',
              width: '100%',
            }}
          >
            <Outlet />
          </Box>
        </Box>

        {/* Footer */}
        {themeConfig.footerType !== 'hidden' && <Footer />}
      </Flex>

      {/* Theme Customizer Canvas */}
      <ThemeCustomizer />

      {/* CSS for responsive sidebar */}
      <style>{`
        .sidebar-container {
          /* Desktop: parte del flujo normal con ancho configurable */
          width: ${menuCollapsed ? '70px' : `${themeConfig.sidebarWidth}px`};
          transition: width 300ms ease-in-out;
        }

        /* Mobile: fixed overlay */}
        @media (max-width: 767px) {
          .sidebar-container {
            position: fixed;
            top: 0;
            left: 0;
            width: ${themeConfig.sidebarWidth}px;
            height: 100vh;
            z-index: 50;
            transform: ${mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform 300ms ease-in-out;
            background: var(--color-background);
          }
        }
      `}</style>
    </Flex>
  )
}
