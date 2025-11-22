import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, User, Settings, LogOut } from 'react-feather'
import { Box, Flex, Heading, Text, IconButton, Avatar, DropdownMenu, Separator } from '@radix-ui/themes'
import { handleMenuCollapsed, toggleMobileMenu } from '../../store/layoutSlice'
import { clearAuth } from '../../store/authSlice'
import { useTheme } from '../../context/ThemeContext'

/**
 * Componente Navbar principal con Radix UI Themes
 * Incluye toggle del sidebar, dropdown de usuario, y toggle de tema
 *
 * @returns {JSX.Element}
 */
export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const user = useSelector((state) => state.auth.user)
  const { appearance, toggleAppearance } = useTheme()

  const handleToggleSidebar = () => {
    dispatch(handleMenuCollapsed(!menuCollapsed))
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

  return (
    <Box
      asChild
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        borderBottom: '1px solid var(--gray-6)',
        height: '64px',
      }}
    >
      <nav>
        <Flex align="center" justify="between" gap="4" px="6" style={{ height: '100%' }}>
          {/* Left Section - Menu Toggle */}
          <Flex align="center" gap="4">
            {/* Desktop Toggle - Hidden on mobile */}
            <Box display={{ initial: 'none', md: 'block' }}>
              <IconButton
                variant="ghost"
                onClick={handleToggleSidebar}
                aria-label="Toggle sidebar"
              >
                <Menu size={20} />
              </IconButton>
            </Box>

            {/* Mobile Toggle - Visible only on mobile */}
            <Box display={{ initial: 'block', md: 'none' }}>
              <IconButton
                variant="ghost"
                onClick={handleToggleMobile}
                aria-label="Toggle mobile menu"
              >
                <Menu size={20} />
              </IconButton>
            </Box>

            <Heading size="5">Mi App</Heading>
          </Flex>

          {/* Right Section - Theme Toggle & User Dropdown */}
          <Flex align="center" gap="2">
            {/* Theme Toggle */}
            <IconButton
              variant="ghost"
              onClick={toggleAppearance}
              aria-label="Toggle theme"
            >
              {appearance === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>

            {/* User Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Flex asChild align="center" gap="2" style={{ cursor: 'pointer' }}>
                  <button style={{ border: 'none', background: 'none', padding: 0 }}>
                    <Avatar
                      size="2"
                      fallback={getUserInitials()}
                      color="blue"
                    />
                    {user && (
                      <Box display={{ initial: 'none', md: 'block' }}>
                        <Text size="2" weight="medium">
                          {user.nombre || 'Usuario'}
                        </Text>
                      </Box>
                    )}
                  </button>
                </Flex>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content align="end">
                {/* User Info */}
                {user && (
                  <>
                    <Box p="2">
                      <Text size="2" weight="medium">
                        {user.nombre || 'Usuario'}
                      </Text>
                      {user.email && (
                        <Text size="1" color="gray">
                          {user.email}
                        </Text>
                      )}
                    </Box>
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
      </nav>
    </Box>
  )
}
