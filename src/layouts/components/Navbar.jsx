import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, User, Settings, LogOut } from 'react-feather'
import { Box, Flex, Heading, Text, IconButton, Avatar, DropdownMenu, Separator } from '@radix-ui/themes'
import { toggleMobileMenu } from '../../store/layoutSlice'
import { clearAuth } from '../../store/authSlice'
import { useThemeConfig } from '../../App'

/**
 * Componente Navbar principal con Radix UI Themes
 * Frame superior con breadcrumbs, theme toggle y user dropdown
 *
 * @returns {JSX.Element}
 */
export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  return (
    <Box
      style={{
        borderBottom: '1px solid var(--gray-6)',
        minHeight: '64px',
      }}
    >
      <Flex align="center" justify="between" gap="4" px="6" style={{ height: '64px' }}>
        {/* Left Section - Mobile menu toggle + Breadcrumbs */}
        <Flex align="center" gap="4">
          {/* Mobile Toggle - Visible only on mobile */}
          <Box display={{ initial: 'block', md: 'none' }}>
            <IconButton variant="ghost" onClick={handleToggleMobile} aria-label="Toggle mobile menu">
              <Menu size={20} />
            </IconButton>
          </Box>

          {/* Breadcrumbs placeholder */}
          <Heading size="4">Dashboard</Heading>
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
    </Box>
  )
}
