import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@radix-ui/themes'
import { useSelector } from 'react-redux'

/**
 * NavigationItem - Refactored to match Vuexy reference (Flat structure)
 */
const NavigationItem = ({ item, nested = false, showTooltip = false, forceExpanded = false, className, ...props }) => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  // Both states use menuCollapsed directly for IMMEDIATE response
  const isLayoutCollapsed = menuCollapsed && !forceExpanded

  // Helper simple para cortar texto si es muy largo (Fallback de seguridad)
  const truncateText = (text, maxLength = 15) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const linkContent = (
    <NavLink
      to={item.navLink}
      onClick={(e) => {
        const currentPath = window.location.pathname
        if (currentPath === item.navLink) {
          e.preventDefault()
          return
        }
        if (item.onClick) {
          item.onClick(e)
        }
      }}
      className={({ isActive }) =>
        `flex items-center rounded-md transition-all duration-200 ease-in-out min-h-[45px] ${
          isActive
            ? 'text-white shadow-md bg-gradient-to-r from-[var(--accent-9)] to-[var(--accent-9)]/70 cursor-default'
            : `text-[var(--gray-11)] hover:bg-[var(--gray-3)] cursor-pointer ${!isLayoutCollapsed ? 'hover:translate-x-[5px]' : ''}`
        } ${
          isLayoutCollapsed
            ? 'justify-center px-2'
            : `px-4 ${nested ? 'pl-8' : ''}`
        } ${className || ''}`
      }
      style={({ isActive }) => isActive ? {
        boxShadow: '0 0 10px 1px color-mix(in srgb, var(--accent-9), transparent 30%)'
      } : {}}
      {...props}
    >
      {Icon && (
        <Icon 
          size={nested ? 14 : 20} 
          className={`flex-shrink-0 transition-all duration-200 ${isLayoutCollapsed ? '' : 'mr-3'}`}
        />
      )}

      {/* Text - Only render if not collapsed or if forced expanded */}
      {!isLayoutCollapsed && (
        <span className="truncate flex-1 text-[14px] font-medium leading-none min-w-0">
          {truncateText(item.title)}
        </span>
      )}
    </NavLink>
  )

  const content = (
    <div className="outline-none w-full mb-1">
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
