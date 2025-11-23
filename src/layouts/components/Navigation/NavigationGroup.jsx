import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import { Text, Badge, Tooltip } from '@radix-ui/themes'
import NavigationLink from './NavigationLink'
import { cn } from '../../../lib/utils'

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
 * NavigationGroup - Collapsible menu groups
 */
const NavigationGroup = ({ item, forceExpanded = false }) => {
  const location = useLocation()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  const isActive = hasActiveChild(item.children, location.pathname)
  const [open, setOpen] = useState(isActive)

  // Considerar forceExpanded para determinar si está colapsado
  const isCollapsed = menuCollapsed && !forceExpanded

  // When collapsed, show ONLY parent icon (no children)
  if (isCollapsed) {
    return (
      <li className="list-none flex justify-center w-full my-1">
        <Tooltip content={item.title} side="right">
          <button
            className={cn(
              "flex items-center justify-center",
              "w-[48px] h-[48px] rounded-md",
              "transition-all duration-300 ease-in-out",
              "cursor-pointer",
              // Active state si algún child está activo
              isActive
                ? "text-[var(--accent-9)] bg-[color-mix(in_srgb,var(--accent-9),transparent_88%)]"
                : "text-[rgb(110,107,123)] hover:bg-[rgba(0,0,0,0.05)]"
            )}
            onClick={(e) => {
              e.preventDefault()
              // No hacer nada - el hover del sidebar mostrará el contenido
            }}
          >
            {Icon && (
              <span className="flex items-center justify-center w-[24px] h-[24px]">
                <Icon size={20} />
              </span>
            )}
          </button>
        </Tooltip>
      </li>
    )
  }

  return (
    <li className="list-none">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
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
                : 'w-full mx-2 mb-[5px] gap-3 px-4 py-3', // Reducir px de 6 a 4

              // Typography
              'font-[Montserrat] text-[15px] tracking-[0.14px] font-semibold',

              // Active/Inactive
              isActive
                ? 'text-[var(--accent-9)]' // Background handled via style
                : 'bg-transparent text-[rgb(110,107,123)] hover:bg-[rgba(0,0,0,0.05)] hover:translate-x-[5px]'
            )}
            style={isActive ? {
              backgroundColor: 'color-mix(in srgb, var(--accent-9), transparent 88%)' // Light background matching theme
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
                  open && 'rotate-180'
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
