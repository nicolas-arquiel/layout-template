import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { User, Settings, LogOut, Menu } from 'lucide-react'
import { Flex, Text, Avatar, DropdownMenu, Separator, IconButton } from '@radix-ui/themes'
import { clearAuth } from '@/store/authSlice'
import { toggleMobileMenu } from '@/store/layoutSlice'
import HorizontalNav from './HorizontalNav'
import { cn } from '@lib/utils'

/**
 * Navbar - SOLO TAILWIND CLASSES
 * User menu (theme toggle está en ThemePanel de Radix)
 *
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const menuLayout = useSelector((state) => state.layout.menuLayout)

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

  const handleToggleMobile = () => {
    dispatch(toggleMobileMenu())
  }

  return (
    <Flex align="center" justify="between" px="6" className="w-full h-full">
      {/* Left side - Menu dropdown (horizontal mode) or Hamburger (vertical mode) + Active item */}
      <Flex align="center" gap="3" className="flex-1">
        {/* Hamburger button - Solo visible en mobile cuando menuLayout es vertical */}
        {menuLayout !== 'horizontal' && (
          <div className="block xl:hidden">
            <IconButton
              variant="ghost"
              onClick={handleToggleMobile}
              size="2"
              className="text-[var(--gray-11)] hover:text-[var(--accent-9)] hover:bg-[var(--accent-3)] transition-colors"
            >
              <Menu size={20} />
            </IconButton>
          </div>
        )}

        {/* Horizontal mode: Menu dropdown + Active item */}
        {menuLayout === 'horizontal' ? (
          <>
            <HorizontalNav />
          </>
        ) : (
          <Text size="3" weight="medium" className="text-[var(--gray-12)]">
            {import.meta.env.VITE_APP_NAME}
          </Text>
        )}
      </Flex>

      {/* Right side - User menu */}
      <Flex align="center" gap="3">
        {/* User Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="border-none bg-transparent p-0 flex items-center gap-2 cursor-pointer">
              <Avatar size="2" fallback={getUserInitials()} color="blue" />
              {user && (
                <div className="hidden md:block">
                  <Text size="2" weight="medium">
                    {user.nombre || 'Usuario'}
                  </Text>
                </div>
              )}
            </button>
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

export default Navbar
