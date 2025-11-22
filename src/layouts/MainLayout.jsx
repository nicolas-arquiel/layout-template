import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { cn } from '../utils/cn'

/**
 * Layout principal de la aplicación
 * Incluye Navbar, Sidebar, área de contenido y Footer
 * Maneja el tema (dark/light mode) y el estado del sidebar
 *
 * @returns {JSX.Element}
 */
export default function MainLayout() {
  const skin = useSelector((state) => state.layout.skin)
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  // Aplicar clase dark al HTML según el tema
  useEffect(() => {
    if (skin === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [skin])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        className={cn(
          'min-h-[calc(100vh-4rem)] transition-all duration-300',
          // Ajustar padding según estado del sidebar en desktop
          {
            'md:pl-0': false, // El spacer dentro de Sidebar ya maneja el espacio
          }
        )}
      >
        <div className="flex min-h-[calc(100vh-4rem)] flex-col">
          {/* Content */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  )
}
