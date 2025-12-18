import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { DropdownMenu, Button, Flex, Text, Badge, IconButton } from '@radix-ui/themes'
import { Menu, ChevronRight } from 'lucide-react'
import { canViewMenuItem, canViewMenuGroup } from '@utils/permissions'
import { selectCurrentUser, selectPermisos } from '@/store/auth/authSlice'
import navigation from '@/navigation/vertical'
import { cn } from '@lib/utils'

/**
 * HorizontalNav - Navegación horizontal compacta
 * Muestra un dropdown con todo el menú + el item activo actual
 */
const HorizontalNav = () => {
  const permisos = useSelector(selectPermisos)
  const user = useSelector(selectCurrentUser)
  const location = useLocation()
  const navigate = useNavigate()

  const getBadgeColor = (color) => {
    switch (color) {
      case 'error': return 'red'
      case 'success': return 'green'
      case 'primary': return 'blue'
      case 'warning': return 'amber'
      default: return 'red'
    }
  }

  const isActiveLink = (path) => location.pathname === path
  
  // Encuentra el item activo actual (recursivo)
  const findActiveItem = (items) => {
    for (const item of items) {
      if (item.navLink && isActiveLink(item.navLink)) {
        return item
      }
      if (item.children) {
        const found = findActiveItem(item.children)
        if (found) return found
      }
    }
    return null
  }

  const activeItem = findActiveItem(navigation)

  // Renderiza un item del menú (recursivo)
  const renderMenuItem = (item, level = 0) => {
    // Skip headers
    if (item.header) return null

    // Check permissions
    if (item.children) {
      if (!canViewMenuGroup(item, permisos, user)) return null
    } else {
      if (!canViewMenuItem(item, permisos, user)) return null
    }

    const active = item.navLink && isActiveLink(item.navLink)

    // Si tiene hijos, usar SubMenu
    if (item.children && item.children.length > 0) {
      return (
        <DropdownMenu.Sub key={item.id}>
          <DropdownMenu.SubTrigger className="gap-2">
            {item.icon && <item.icon size={16} />}
            <Text size="2">{item.title}</Text>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent className="min-w-[200px]">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      )
    }

    // Item simple
    return (
      <DropdownMenu.Item
        key={item.id}
        onClick={() => navigate(item.navLink)}
        className={cn(
          "gap-2 cursor-pointer",
          active && "bg-[var(--accent-3)] text-[var(--accent-9)]"
        )}
      >
        {item.icon && <item.icon size={16} />}
        <Text size="2">{item.title}</Text>
        {item.badge && (
          <Badge color={getBadgeColor(item.badgeColor)} variant="soft" radius="full" className="ml-auto">
            {item.badge}
          </Badge>
        )}
      </DropdownMenu.Item>
    )
  }

  return (
    <Flex align="center" gap="3">
      {/* Dropdown con todo el menú */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            variant="ghost"
            size="2"
            className="text-[var(--gray-11)] hover:text-[var(--accent-9)] hover:bg-[var(--accent-3)] transition-colors"
          >
            <Menu size={20} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="min-w-[220px]">
          {navigation.map(item => renderMenuItem(item))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {/* Separador */}
      {activeItem && (
        <>
          <div 
            className="h-6 w-px flex-shrink-0" 
            style={{ backgroundColor: 'var(--gray-6)' }}
          />
          
          {/* Item activo */}
          <Flex align="center" gap="2">
            {activeItem.icon && <activeItem.icon size={18} className="text-[var(--accent-9)]" />}
            <Text size="3" weight="medium" className="text-[var(--gray-12)]">
              {activeItem.title}
            </Text>
            {activeItem.badge && (
              <Badge color={getBadgeColor(activeItem.badgeColor)} variant="soft" radius="full">
                {activeItem.badge}
              </Badge>
            )}
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default HorizontalNav
