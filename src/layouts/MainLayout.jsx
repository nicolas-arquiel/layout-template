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
 * Usa CSS Grid para layout donde sidebar está AL LADO del contenido (desktop)
 * En mobile, el sidebar es un overlay
 * Aplica configuración del Theme Customizer
 *
 * @returns {JSX.Element}
 */
export default function MainLayout() {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)
  const { themeConfig } = useThemeConfig()

  return (
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar - Sticky o normal según configuración */}
      <Navbar />

      {/* Main Layout Container */}
      <Box style={{ flex: 1, position: 'relative', display: 'flex' }}>
        {/* Sidebar - Mobile: fixed overlay, Desktop: parte del flujo */}
        <Box
          className="sidebar-container"
          style={{
            // Desktop behavior con ancho configurable
            '--sidebar-width-expanded': `${themeConfig.sidebarWidth}px`,
            '--sidebar-width-collapsed': '70px',
          }}
        >
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Flex direction="column" style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
          {/* Content Container */}
          <Box
            style={{
              flex: 1,
              padding: 'var(--space-6)',
              maxWidth: themeConfig.contentWidth === 'boxed' ? '1280px' : '100%',
              margin: themeConfig.contentWidth === 'boxed' ? '0 auto' : '0',
              width: '100%',
            }}
          >
            {/* Outlet */}
            <Box>
              <Outlet />
            </Box>
          </Box>

          {/* Footer */}
          {themeConfig.footerType !== 'hidden' && <Footer />}
        </Flex>
      </Box>

      {/* Theme Customizer (Floating button + Panel) */}
      <ThemeCustomizer />

      {/* CSS for responsive sidebar */}
      <style>{`
        .sidebar-container {
          /* Desktop: parte del flujo normal con ancho configurable */
          width: ${menuCollapsed ? '70px' : `${themeConfig.sidebarWidth}px`};
          transition: width 300ms ease;
        }

        /* Mobile: fixed overlay */}
        @media (max-width: 767px) {
          .sidebar-container {
            position: fixed;
            top: 64px;
            left: 0;
            width: ${themeConfig.sidebarWidth}px;
            height: calc(100vh - 64px);
            z-index: 50;
            transform: ${mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform 300ms ease;
          }
        }
      `}</style>
    </Box>
  )
}
