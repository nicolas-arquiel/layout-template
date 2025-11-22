import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, User, Settings, LogOut } from 'react-feather'
import { Flex, Text, IconButton, Avatar, DropdownMenu, Separator } from '@radix-ui/themes'
import { toggleMobileMenu } from '../../store/layoutSlice'
import { clearAuth } from '../../store/authSlice'
import { useThemeConfig } from '../../App'

/**
 * Componente Navbar con breadcrumbs
 *
 * @returns {JSX.Element}
 */
export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.auth.user)
  const { themeConfig, updateThemeConfig } = useThemeConfig()

  const toggleAppearance = () => {
    updateThemeConfig('appearance', themeConfig.appearance === 'light' ? 'dark' : 'light')
  }

  const handleToggleMobile = () => {
    dispatch(toggleMobileMenu())
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

  // Obtener título de página basado en ruta
  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('personas')) return 'Personas'
    if (path.includes('inscripcion-aspirante')) return 'Inscripción Aspirante'
    if (path.includes('inscripcion-curso')) return 'Inscripción Curso'
    if (path.includes('inicio')) return 'Inicio'
    return 'Dashboard'
  }

  return (
    <Flex align="center" justify="between" px="6" style={{ height: '100%' }}>
      {/* Left Section - Mobile menu toggle + Breadcrumbs */}
      <Flex align="center" gap="4">
        {/* Mobile Toggle */}
        <IconButton
          variant="ghost"
          onClick={handleToggleMobile}
          aria-label="Toggle mobile menu"
          display={{ initial: 'flex', md: 'none' }}
        >
          <Menu size={20} />
        </IconButton>

        {/* Breadcrumbs */}
        <Flex direction="column" gap="1">
          <Text size="5" weight="medium">
            {getPageTitle()}
          </Text>
          <Text size="2" color="gray">
            UCU Gestión › {getPageTitle()}
          </Text>
        </Flex>
      </Flex>

      {/* Right Section - Theme Toggle & User Dropdown */}
      <Flex align="center" gap="2">
        {/* Theme Toggle */}
        <IconButton variant="ghost" onClick={toggleAppearance} aria-label="Toggle theme">
          {themeConfig.appearance === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>

        {/* User Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Flex asChild align="center" gap="2" style={{ cursor: 'pointer' }}>
              <button
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Avatar size="2" fallback={getUserInitials()} color="blue" />
                {user && (
                  <Text
                    size="2"
                    weight="medium"
                    display={{ initial: 'none', md: 'block' }}
                  >
                    {user.nombre || 'Usuario'}
                  </Text>
                )}
              </button>
            </Flex>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content align="end">
            {/* User Info */}
            {user && (
              <>
                <Flex direction="column" p="2" gap="1">
                  <Text size="2" weight="medium">
                    {user.nombre || 'Usuario'}
                  </Text>
                  {user.email && (
                    <Text size="1" color="gray">
                      {user.email}
                    </Text>
                  )}
                </Flex>
                <Separator size="4" />
              </>
            )}

            {/* Menu Items */}
            <DropdownMenu.Item onSelect={() => navigate('/perfil')}>
              <Flex align="center" gap="2">
                <User size={16} />
                <Text>Mi Perfil</Text>
              </Flex>
            </DropdownMenu.Item>

            <DropdownMenu.Item onSelect={() => navigate('/configuracion')}>
              <Flex align="center" gap="2">
                <Settings size={16} />
                <Text>Configuración</Text>
              </Flex>
            </DropdownMenu.Item>

            <Separator size="4" />

            <DropdownMenu.Item onSelect={handleLogout} color="red">
              <Flex align="center" gap="2">
                <LogOut size={16} />
                <Text>Cerrar Sesión</Text>
              </Flex>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Flex>
  )
}
