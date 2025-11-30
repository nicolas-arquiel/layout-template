import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { DropdownMenu, Button, Flex, Text, Badge } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { canViewMenuItem, canViewMenuGroup } from '../../utils/permissions'
import navigation from '../../navigation/vertical'
import { cn } from '../../lib/utils'

/**
 * HorizontalNav - Navegación horizontal estilo "Popover" en cascada
 * Usa DropdownMenu para permitir submenús infinitos hacia el costado.
 */
const HorizontalNav = () => {
  const permisos = useSelector((state) => state.auth.permisos)
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
  
  // Verifica si un grupo tiene algún hijo activo (recursivo)
  const hasActiveChild = (item) => {
    if (item.navLink && isActiveLink(item.navLink)) return true
    if (item.children) {
      return item.children.some(child => hasActiveChild(child))
    }
    return false
  }

  // Renderiza un item final (sin hijos)
  const renderLeafItem = (item, isSubItem = false) => {
    if (!canViewMenuItem(item, permisos)) return null
    
    const active = isActiveLink(item.navLink)
    
    // Si es un item de primer nivel (en la barra)
    if (!isSubItem) {
      return (
        <Link key={item.id} to={item.navLink}>
          <Button 
            variant={active ? "soft" : "ghost"} 
            color={active ? "indigo" : "gray"}
            className={cn(
              "cursor-pointer font-medium transition-all",
              active ? "bg-[var(--accent-3)] text-[var(--accent-9)]" : "text-[var(--gray-11)] hover:text-[var(--gray-12)] hover:bg-[var(--gray-3)]"
            )}
          >
            {item.icon && <item.icon width="16" height="16" />}
            {item.title}
            {item.badge && (
              <Badge color={getBadgeColor(item.badgeColor)} variant="solid" radius="full">
                {item.badge}
              </Badge>
            )}
          </Button>
        </Link>
      )
    }

    // Si es un item dentro de un dropdown
    return (
      <DropdownMenu.Item 
        key={item.id} 
        onClick={() => navigate(item.navLink)}
        className={cn(
          "gap-2 cursor-pointer",
          active && "bg-[var(--accent-3)] text-[var(--accent-9)]"
        )}
      >
        {item.icon && <item.icon width="16" height="16" />}
        <Text size="2">{item.title}</Text>
        {item.badge && (
          <Badge color={getBadgeColor(item.badgeColor)} variant="soft" radius="full" className="ml-auto">
            {item.badge}
          </Badge>
        )}
      </DropdownMenu.Item>
    )
  }

  // Renderiza un grupo con submenús (recursivo)
  const renderGroup = (item, isSubItem = false) => {
    if (!canViewMenuGroup(item, permisos)) return null
    
    const active = hasActiveChild(item)

    // Contenido del Trigger (Botón o Item)
    const triggerContent = (
      <>
        {item.icon && <item.icon width="16" height="16" />}
        <Text size="2" weight="medium">{item.title}</Text>
        {item.badge && (
          <Badge color={getBadgeColor(item.badgeColor)} variant="soft" radius="full">
            {item.badge}
          </Badge>
        )}
        {isSubItem ? <ChevronRightIcon width="16" height="16" className="ml-auto text-[var(--gray-9)]" /> : <ChevronDownIcon width="16" height="16" className="text-[var(--gray-9)]" />}
      </>
    )

    // Renderizado de los hijos
    const childrenContent = item.children.map(child => {
      if (child.children && child.children.length > 0) {
        return renderGroup(child, true) // Recursión para sub-niveles
      }
      return renderLeafItem(child, true)
    })

    // Si es nivel superior (Barra de navegación)
    if (!isSubItem) {
      return (
        <DropdownMenu.Root key={item.id}>
          <DropdownMenu.Trigger>
            <Button 
              variant={active ? "soft" : "ghost"} 
              color={active ? "indigo" : "gray"}
              className={cn(
                "cursor-pointer font-medium gap-2 transition-all",
                active ? "bg-[var(--accent-3)] text-[var(--accent-9)]" : "text-[var(--gray-11)] hover:text-[var(--gray-12)] hover:bg-[var(--gray-3)]"
              )}
            >
              {triggerContent}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft" color="indigo" className="min-w-[200px]">
            {childrenContent}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )
    }

    // Si es sub-nivel (dentro del dropdown) -> SubMenu
    return (
      <DropdownMenu.Sub key={item.id}>
        <DropdownMenu.SubTrigger 
          className={cn(
            "gap-2 cursor-pointer",
            active && "text-[var(--accent-9)]"
          )}
        >
          {item.icon && <item.icon width="16" height="16" />}
          <Text size="2">{item.title}</Text>
        </DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent className="min-w-[200px]">
          {childrenContent}
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
    )
  }

  return (
    <Flex align="center" gap="1" wrap="wrap">
      {navigation.map(item => {
        // Skip headers
        if (item.header) return null
        
        // Groups
        if (item.children && item.children.length > 0) {
          return renderGroup(item)
        }
        
        // Single items
        return renderLeafItem(item)
      })}
    </Flex>
  )
}

export default HorizontalNav
