import React, { useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useSelector, useDispatch } from 'react-redux'
import { Text, Badge } from '@radix-ui/themes'
import NavigationLink from './NavigationLink'
import { cn } from '../../../lib/utils'
import { closeMobileMenu } from '../../../store/layoutSlice'

/**
 * Check if any child route is active
 */
function hasActiveChild(children, currentPath) {
  return children.some((child) => {
    if (child.children) {
      return hasActiveChild(child.children, currentPath)
    }
    return child.navLink === currentPath
  })
}

/**
 * NavigationGroup - Grupos de menú con children
 * Usa NavigationMenu nativo en collapsed, Collapsible en expanded
 */
const NavigationGroup = ({ item, forceExpanded = false, onHoverChange }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  const isActive = hasActiveChild(item.children, location.pathname)
  const [collapsibleOpen, setCollapsibleOpen] = useState(isActive)

  // Considerar forceExpanded para determinar si está colapsado
  const isCollapsed = menuCollapsed && !forceExpanded

  const handleChildClick = () => {
    // Cerrar menú mobile al hacer click
    dispatch(closeMobileMenu())
  }

  // ========== MODE COLLAPSED: NavigationMenu con Hover ==========
  if (isCollapsed) {
    return (
      <NavigationMenu.Item
        value={item.id}
        className="list-none w-full my-1"
        onMouseEnter={() => onHoverChange && onHoverChange(item.id)}
        onMouseLeave={() => onHoverChange && onHoverChange('')}
      >
        {/* Trigger - Solo icono en modo collapsed */}
        <NavigationMenu.Trigger
          className={cn(
            "flex items-center justify-center mx-auto",
            "w-[48px] h-[48px] rounded-md",
            "transition-all duration-200",
            "cursor-pointer bg-transparent border-none",
            "outline-none focus:outline-none",
            // Active state - ESTILOS VUEXY
            isActive
              ? "text-[var(--accent-9)] bg-[color-mix(in_srgb,var(--accent-9),transparent_88%)]"
              : "text-[rgb(110,107,123)] hover:bg-[rgba(0,0,0,0.05)]"
          )}
        >
          {Icon && <Icon size={20} />}
        </NavigationMenu.Trigger>

        {/* Content - Aparece en el Viewport cuando está activo */}
        <NavigationMenu.Content
          className="NavigationMenuContent data-[motion]:animate-in data-[motion]:fade-in"
        >
          {/* Header del grupo - ESTILOS VUEXY */}
          <div className="px-4 py-3">
            <Text
              size="1"
              weight="bold"
              className="text-[var(--gray-9)] uppercase tracking-wide"
            >
              {item.title}
            </Text>
          </div>

          <div className="h-px bg-[var(--border-color)] mx-2" />

          {/* Children - ESTILOS VUEXY */}
          <div className="p-2 space-y-1">
            {item.children.map((child) => {
              const ChildIcon = child.icon
              const childIsActive = child.navLink === location.pathname

              return (
                <NavigationMenu.Link
                  key={child.id}
                  asChild
                  active={childIsActive}
                >
                  <NavLink
                    to={child.navLink}
                    onClick={handleChildClick}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md",
                      "transition-all duration-200",
                      "text-[15px] font-[Montserrat] font-medium",
                      "no-underline outline-none",
                      childIsActive
                        ? "text-white shadow-lg"
                        : "text-[rgb(110,107,123)] hover:bg-[var(--accent-3)] hover:text-[var(--accent-9)]"
                    )}
                    style={childIsActive ? {
                      backgroundImage: 'linear-gradient(118deg, var(--accent-9), color-mix(in srgb, var(--accent-9), transparent 30%))',
                      boxShadow: '0 0 10px 1px color-mix(in srgb, var(--accent-9), transparent 30%)'
                    } : {}}
                  >
                    {ChildIcon && <ChildIcon size={18} />}
                    <span>{child.title}</span>
                  </NavLink>
                </NavigationMenu.Link>
              )
            })}
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    )
  }

  // MODE EXPANDED: Usar Collapsible como antes - ESTILOS VUEXY INTACTOS
  return (
    <li className="list-none">
      <Collapsible.Root open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
        <Collapsible.Trigger asChild>
          <button
            className={cn(
              // Layout base
              'flex items-center rounded-md transition-all duration-300 ease-in-out',
              'min-h-[48px]',
              'cursor-pointer border-none text-left overflow-hidden',

              // Spacing & Sizing
              isCollapsed
                ? 'justify-center w-[48px] h-[48px] mx-auto mb-2 px-0'
                : 'w-full mx-2 mb-[5px] gap-3 px-4 py-3',

              // Typography
              'font-[Montserrat] text-[15px] tracking-[0.14px] font-semibold',

              // Active/Inactive
              isActive
                ? 'text-[var(--accent-9)]'
                : 'bg-transparent text-[rgb(110,107,123)] hover:bg-[rgba(0,0,0,0.05)] hover:translate-x-[5px]'
            )}
            style={isActive ? {
              backgroundColor: 'color-mix(in srgb, var(--accent-9), transparent 88%)'
            } : {}}
          >
            {/* Icon - ALWAYS VISIBLE */}
            {Icon && (
              <span className={cn(
                "flex items-center justify-center transition-all duration-300 flex-shrink-0",
                "w-[24px] h-[24px]"
              )}>
                <Icon size={20} />
              </span>
            )}

            {/* Text Container - Smooth transition */}
            <div
              className={cn(
                "flex items-center whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                isCollapsed ? "w-0 opacity-0 ml-0" : "w-auto opacity-100 flex-1 ml-3"
              )}
            >
              <Text size="2" weight="medium" className="truncate flex-1">
                {item.title}
              </Text>

              {item.badge && (
                <Badge size="1" variant="soft" className="ml-2">
                  {item.badge}
                </Badge>
              )}

              <span
                className={cn(
                  'flex-shrink-0 transition-transform duration-300 ease-out ml-2',
                  collapsibleOpen && 'rotate-180'
                )}
              >
                <ChevronDown size={16} />
              </span>
            </div>
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content
          className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
        >
          <ul className="py-1">
            {item.children.map((child) => (
              <NavigationLink key={child.id} item={child} nested forceExpanded={forceExpanded} />
            ))}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  )
}

export default NavigationGroup
