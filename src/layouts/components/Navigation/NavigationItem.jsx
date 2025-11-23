import React from 'react'
import { NavLink } from 'react-router-dom'
import { Text, Badge, Tooltip } from '@radix-ui/themes'
import { cn } from '../../../lib/utils'
import { useSelector } from 'react-redux'

/**
 * NavigationItem - Reactstrap/Bootstrap style
 * Clean, well-spaced navigation items with proper active states
 */
const NavigationItem = ({ item, nested = false, showTooltip = false, className, ...props }) => {
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

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
      onClick={item.onClick}
      className={({ isActive }) =>
        cn(
          // Layout base
          'flex items-center rounded-md transition-all duration-300 ease-in-out',
          'min-h-[48px]',
          'cursor-pointer', // Removed overflow-hidden

          // Spacing & Sizing
          menuCollapsed
            ? 'justify-center w-[48px] h-[48px] mx-auto px-0'
            : 'w-full mx-2 mb-[5px] gap-4 px-6 py-3', // Vuexy style: full width with internal padding + horizontal margin

          // Typography
          'font-[Montserrat] text-[15px] tracking-[0.14px] font-bold',

          // Active State
          isActive
            ? 'text-white rounded-md' // Background and shadow handled via style
            : 'text-[rgb(110,107,123)] hover:bg-[rgba(0,0,0,0.05)] hover:translate-x-[5px]',

          // Nested indentation
          !menuCollapsed && nested && 'pl-10',

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
          "flex items-center justify-center transition-all duration-300 flex-shrink-0", // Prevent shrinking
          // Fixed width for icon container to ensure stability
          "w-[24px] h-[24px]"
        )}>
          <Icon size={20} />
        </span>
      )}

      {/* Text Container - Collapses smoothly */}
      <div
        className={cn(
          "flex items-center whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
          // When collapsed: width 0, opacity 0. When expanded: flex-1, opacity 100
          menuCollapsed ? "w-0 opacity-0 ml-0 border-none" : "w-auto opacity-100 flex-1 ml-3"
        )}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          <Text size="2" weight="medium" className="truncate">
            {item.title}
          </Text>
          {item.badge && (
            <Badge color={getBadgeColor(item.badgeColor)} variant="soft" size="1">
              {item.badge}
            </Badge>
          )}
        </div>
      </div>
    </NavLink>
  )

  // Tooltip when collapsed
  if (menuCollapsed && showTooltip) {
    return (
      <li className="list-none flex justify-center w-full my-1">
        <Tooltip content={item.title} side="right">
          {/* Wrapper div to ensure Tooltip trigger behaves correctly */}
          <div className="outline-none">
            {linkContent}
          </div>
        </Tooltip>
      </li>
    )
  }

  return <li className="list-none my-0.5">{linkContent}</li>
}

export default NavigationItem
