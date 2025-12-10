import React from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Tooltip } from '@radix-ui/themes'
import { cn } from '@lib/utils'
import { useSelector } from 'react-redux'

/**
 * NavigationItem - Reactstrap/Bootstrap style
 * Clean, well-spaced navigation items with proper active states
 */
const NavigationItem = ({ item, nested = false, showTooltip = false, forceExpanded = false, className, collapsed, ...props }) => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  // Both states use menuCollapsed directly for IMMEDIATE response
  // No delay - change to icons instantly when button is pressed
  const isLayoutCollapsed = menuCollapsed && !forceExpanded
  const isContentCollapsed = menuCollapsed && !forceExpanded

  const getBadgeColor = (color) => {
    switch (color) {
      case 'error':
        return 'red'
      case 'success':
        return 'green'
      case 'primary':
        return 'blue'
      case 'warning':
        return 'amber'
      default:
        return 'red'
    }
  }

  const linkContent = (
    <NavLink
      to={item.navLink}
      onClick={(e) => {
        // Prevenir navegación si ya estamos en esta ruta
        const currentPath = window.location.pathname
        if (currentPath === item.navLink) {
          e.preventDefault()
          return
        }
        // Ejecutar el onClick original si existe
        if (item.onClick) {
          item.onClick(e)
        }
      }}
      className={({ isActive }) =>
        cn(
          // Layout base
          'flex items-center rounded-md',
          'min-h-[48px]',
          
          // Smooth transitions for width (collapse) and hover effects (translate, background)
          'transition-[width,translate,background-color] duration-200 ease-out',

          // Typography
          'font-[Montserrat] text-[14px] tracking-[0.14px] font-medium',

          // Active State - cambiar cursor si está activo
          isActive
            ? 'text-white shadow-lg cursor-default' // cursor-default para indicar que no se puede clickear
            : 'text-[rgb(110,107,123)] hover:bg-[rgba(0,0,0,0.05)] hover:translate-x-[5px] cursor-pointer',

          // Collapsed vs Expanded spacing & sizing
          // Same padding in both states - icon stays in place
          '!px-4 py-3',
          isLayoutCollapsed
            ? 'w-[56px]' // Fixed width when collapsed (just enough for icon + padding)
            : cn(
                'w-full', // Full width when expanded
                nested && 'pl-10' // Nested indentation only when expanded
              ),

          className
        )
      }
      style={({ isActive }) => isActive ? {
        backgroundImage: 'linear-gradient(118deg, var(--accent-9), color-mix(in srgb, var(--accent-9), transparent 30%))',
        boxShadow: '0 0 10px 1px color-mix(in srgb, var(--accent-9), transparent 30%)'
      } : {}}
      {...props}
    >
      {/* Icon - ALWAYS VISIBLE */}
      {Icon && (
        <span className={cn(
          "flex items-center justify-center transition-transform duration-300 flex-shrink-0",
          "w-[24px] h-[24px]"
        )}>
          <Icon size={nested ? 14 : 20} />
        </span>
      )}

      {/* Text Container - Collapses smoothly */}
      {/* Opacity uses isContentCollapsed (immediate) for instant fade, width uses isLayoutCollapsed (delayed) for smooth shrink */}
      <div
        className={cn(
          "flex items-center whitespace-nowrap overflow-hidden transition-[width,margin] duration-300 ease-in-out",
          isLayoutCollapsed ? "w-0 ml-0 border-none" : "w-auto flex-1 !ml-4"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-2 w-full transition-opacity duration-300 ease-in-out",
            isContentCollapsed ? "opacity-0" : "opacity-100"
          )}
        >
          <span className="truncate flex-1 font-[Montserrat] text-[14px] font-medium">
            {item.title}
          </span>
          {item.badge && (
            <Badge color={getBadgeColor(item.badgeColor)} variant="soft" size="1" className="flex-shrink-0">
              {item.badge}
            </Badge>
          )}
          {/* Chevron invisible para mantener alineación con grupos */}
          <span className="w-[16px] h-[16px] flex-shrink-0 opacity-0 pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </NavLink>
  )

  // Renderizar condicionalmente el Tooltip para evitar tooltips vacíos
  const content = (
    <div className="outline-none w-full">
      {linkContent}
    </div>
  )

  return (
    <li className="list-none w-full">
      {isLayoutCollapsed && showTooltip ? (
        <Tooltip content={item.title} side="right">
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </li>
  )
}

export default NavigationItem
