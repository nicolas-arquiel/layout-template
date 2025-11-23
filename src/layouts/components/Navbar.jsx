import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { User, Settings, LogOut } from 'react-feather'
import { Flex, Text, Avatar, DropdownMenu, Separator } from '@radix-ui/themes'
import { clearAuth } from '../../store/authSlice'

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
    <Flex align="center" justify="between" px="6" className="h-full" >
      {/* Left side - Breadcrumbs or Title */}
      <Flex align="center" gap="3">
        <Text size="3" weight="medium" className="text-[var(--gray-12)]">
          {import.meta.env.VITE_APP_NAME}
        </Text>
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
