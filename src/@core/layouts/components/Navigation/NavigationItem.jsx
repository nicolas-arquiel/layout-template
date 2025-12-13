import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@radix-ui/themes'

import { useSelector } from 'react-redux'

/**
 * NavigationItem - Reactstrap/Bootstrap style
 * Clean, well-spaced navigation items with proper active states
 */
const NavigationItem = ({ item, nested = false, showTooltip = false, forceExpanded = false, className, ...props }) => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  // Both states use menuCollapsed directly for IMMEDIATE response
  // No delay - change to icons instantly when button is pressed
  const isLayoutCollapsed = menuCollapsed && !forceExpanded
  const isContentCollapsed = menuCollapsed && !forceExpanded



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
        `flex items-center rounded-md min-h-[48px] transition-[width,translate,background-color] duration-200 ease-out text-[14px] tracking-[0.14px] font-medium !px-4 py-3 ${
          isActive
            ? 'text-white shadow-lg cursor-default'
            : 'text-[var(--gray-11)] hover:bg-[var(--gray-3)] hover:translate-x-[5px] cursor-pointer'
        } ${
          isLayoutCollapsed
            ? 'w-[56px]'
            : `w-full ${nested ? 'pl-10' : ''}`
        } ${className || ''}`
      }
      style={({ isActive }) => isActive ? {
        backgroundImage: 'linear-gradient(118deg, var(--accent-9), color-mix(in srgb, var(--accent-9), transparent 30%))',
        boxShadow: '0 0 10px 1px color-mix(in srgb, var(--accent-9), transparent 30%)'
      } : {}}
      {...props}
    >
      {/* Icon - ALWAYS VISIBLE */}
      {Icon && (
        <span className="flex items-center justify-center transition-transform duration-300 flex-shrink-0 w-[24px] h-[24px]">
          <Icon size={nested ? 14 : 20} />
        </span>
      )}

      {/* Text Container - Collapses smoothly */}
      {/* Opacity uses isContentCollapsed (immediate) for instant fade, width uses isLayoutCollapsed (delayed) for smooth shrink */}
      <div
        className={`flex items-center whitespace-nowrap overflow-hidden transition-[width,margin] duration-300 ease-in-out ${isLayoutCollapsed ? "w-0 ml-0 border-none" : "w-auto flex-1 !ml-4"}`}
      >
        <div
          className="flex items-center justify-between gap-2 w-full transition-[clip-path] duration-150 ease-in-out"
          style={{
            clipPath: isContentCollapsed 
              ? 'inset(0 100% 0 0)' // Hidden: clipped from right
              : 'inset(0 0 0 0)'    // Visible: full reveal
          }}
        >
          <span className="truncate flex-1 text-[14px] font-medium">
            {item.title}
          </span>

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
