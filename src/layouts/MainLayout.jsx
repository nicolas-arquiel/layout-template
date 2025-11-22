import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ThemeCustomizer from '../components/ThemeCustomizer/ThemeCustomizer'
import { useTheme } from '../context/ThemeContext'
import { cn } from '../utils/cn'

/**
 * Layout principal de la aplicación
 * Incluye Navbar, Sidebar, área de contenido, Footer y Theme Customizer
 * Responsive completo con sidebar que empuja el contenido (no overlay)
 *
 * @returns {JSX.Element}
 */
export default function MainLayout() {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const { themeConfig } = useTheme()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      {/* Navbar - Fixed at top */}
      <Navbar />

      {/* Main layout container - Flex row for sidebar + content */}
      <div className="flex flex-1">
        {/* Sidebar - Fixed width, pushes content */}
        <Sidebar />

        {/* Main Content Area - Flex column with content + footer */}
        <main
          className={cn(
            'flex flex-1 flex-col transition-all duration-300 ease-in-out',
            // Mobile: Full width (sidebar is overlay)
            'w-full',
            // Desktop: Adjust for sidebar width
            {
              'md:ml-[280px]': !menuCollapsed, // Sidebar expandido
              'md:ml-[70px]': menuCollapsed, // Sidebar colapsado
            }
          )}
        >
          {/* Content Container */}
          <div
            className={cn('flex-1 p-6', {
              'mx-auto w-full': themeConfig.contentWidth === 'full',
              'container mx-auto': themeConfig.contentWidth === 'boxed',
            })}
          >
            {/* Outlet con animación de ruta */}
            <div
              className={cn('animate-fade-in', {
                'opacity-0 animate-[fade-in_0.3s_ease-in-out_forwards]':
                  themeConfig.routerTransition === 'fade',
                'translate-x-4 opacity-0 animate-[slide-in-left_0.3s_ease-in-out_forwards]':
                  themeConfig.routerTransition === 'slide',
              })}
            >
              <Outlet />
            </div>
          </div>

          {/* Footer */}
          {themeConfig.footerType !== 'hidden' && (
            <Footer
              className={cn({
                'sticky bottom-0': themeConfig.footerType === 'sticky',
              })}
            />
          )}
        </main>
      </div>

      {/* Theme Customizer (Floating button + Panel) */}
      <ThemeCustomizer />
    </div>
  )
}
