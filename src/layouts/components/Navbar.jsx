import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, User, Settings, LogOut } from 'react-feather'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Avatar from '@radix-ui/react-avatar'
import * as Separator from '@radix-ui/react-separator'
import { handleMenuCollapsed, toggleMobileMenu, toggleSkin } from '../../store/layoutSlice'
import { clearAuth } from '../../store/authSlice'
import { cn } from '../../utils/cn'

/**
 * Componente Navbar principal
 * Incluye toggle del sidebar, dropdown de usuario, y toggle de tema
 *
 * @param {Object} props
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export default function Navbar({ className }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const skin = useSelector((state) => state.layout.skin)
  const user = useSelector((state) => state.auth.user)

  const handleToggleSidebar = () => {
    dispatch(handleMenuCollapsed(!menuCollapsed))
  }

  const handleToggleMobile = () => {
    dispatch(toggleMobileMenu())
  }

  const handleToggleTheme = () => {
    dispatch(toggleSkin())
  }

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/auth/login')
  }

  const getUserInitials = () => {
    if (!user || !user.nombre) return 'U'
    const names = user.nombre.split(' ')
    return names
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      {/* Left Section - Menu Toggle */}
      <div className="flex items-center gap-4">
        {/* Desktop Toggle */}
        <button
          onClick={handleToggleSidebar}
          className="hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:block"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={handleToggleMobile}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Mi App
          </h1>
        </div>
      </div>

      {/* Right Section - Theme Toggle & User Dropdown */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={handleToggleTheme}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {skin === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="User menu"
            >
              <Avatar.Root className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blue-600">
                <Avatar.Fallback className="text-sm font-medium text-white">
                  {getUserInitials()}
                </Avatar.Fallback>
              </Avatar.Root>

              {user && (
                <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 md:block">
                  {user.nombre || 'Usuario'}
                </span>
              )}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-50 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-900"
              align="end"
              sideOffset={5}
            >
              {/* User Info */}
              {user && (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.nombre || 'Usuario'}
                    </p>
                    {user.email && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <Separator.Root className="my-1 h-px bg-gray-200 dark:bg-gray-800" />
                </>
              )}

              {/* Menu Items */}
              <DropdownMenu.Item
                className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 outline-none transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onSelect={() => navigate('/perfil')}
              >
                <User size={16} />
                <span>Mi Perfil</span>
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 outline-none transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onSelect={() => navigate('/configuracion')}
              >
                <Settings size={16} />
                <span>Configuración</span>
              </DropdownMenu.Item>

              <Separator.Root className="my-1 h-px bg-gray-200 dark:bg-gray-800" />

              <DropdownMenu.Item
                className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-red-600 outline-none transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                onSelect={handleLogout}
              >
                <LogOut size={16} />
                <span>Cerrar Sesión</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  )
}
