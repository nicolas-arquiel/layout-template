import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import { Text, Badge } from '@radix-ui/themes'
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
const NavigationGroup = ({ item }) => {
  const location = useLocation()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const Icon = item.icon

  const isActive = hasActiveChild(item.children, location.pathname)
  const [open, setOpen] = useState(isActive)

  // When collapsed, show children as individual items
  if (menuCollapsed) {
    return (
      <>
        {item.children.map((child) => (
          <NavigationLink key={child.id} item={child} />
        ))}
      </>
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
              menuCollapsed 
                ? 'justify-center w-[48px] h-[48px] mx-auto mb-2 px-0' 
                : 'w-[calc(100%-48px)] !mx-6 mb-[5px] gap-4 px-6 py-3',

              // Typography
              'font-[Montserrat] text-[15px] tracking-[0.14px] font-bold',

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
                menuCollapsed ? "w-0 opacity-0 ml-0" : "w-auto opacity-100 flex-1 ml-3"
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
                  'flex-shrink-0 transition-transform duration-200 ml-2',
                  open && 'rotate-180'
                )}
              >
                <ChevronDown size={16} />
              </span>
            </div>
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <ul className="py-1">
            {item.children.map((child) => (
              <NavigationLink key={child.id} item={child} nested />
            ))}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  )
}

export default NavigationGroup
