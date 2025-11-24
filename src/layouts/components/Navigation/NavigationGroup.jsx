import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import { Badge, Tooltip } from '@radix-ui/themes'
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
 * Shared Button Component for consistency
 */
const GroupButton = React.forwardRef(({ item, isActive, isOpen, isCollapsed, ...props }, ref) => {
  const Icon = item.icon
  return (
    <button
      ref={ref}
      className={cn(
        'flex items-center rounded-md transition-all duration-300 ease-in-out',
        'min-h-[48px] cursor-pointer border-none outline-none',
        isCollapsed
          ? 'justify-center w-[48px] h-[48px] mx-auto my-1' // Centered square in collapsed
          : 'w-full !px-3 py-3 text-left', // Full width with internal padding in expanded (forced)
        isActive
          ? 'text-[var(--accent-9)] bg-[color-mix(in_srgb,var(--accent-9),transparent_88%)]'
          : 'text-[var(--gray-11)] bg-transparent hover:bg-[var(--gray-3)]',
        !isCollapsed && !isActive && 'hover:translate-x-[5px]'
      )}
      {...props}
    >
      {Icon && <Icon size={20} className={cn("flex-shrink-0", !isCollapsed && "!mr-4")} />}
      
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate font-[Montserrat] text-[15px] font-medium">
            {item.title}
          </span>
          {item.badge && <Badge size="1" variant="soft" className="ml-2 mr-2">{item.badge}</Badge>}
          <ChevronDownIcon width="16" height="16" className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
        </>
      )}
    </button>
  )
})

/**
 * NavigationGroup - Grupos de menú con children
 * Behavior:
 * - Expanded: Standard Accordion (solo un grupo abierto a la vez)
 * - Collapsed: Vertical Accordion (Icons only)
 */
const NavigationGroup = ({ item, forceExpanded = false, isOpen, onToggle }) => {
  const location = useLocation()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  const isActive = hasActiveChild(item.children, location.pathname)

  // Estado para accordion de children - solo un child group abierto a la vez
  const [openChildGroupId, setOpenChildGroupId] = useState(null)

  // Abrir automáticamente si contiene la ruta activa
  useEffect(() => {
    if (isActive && !isOpen && onToggle) {
      onToggle()
    }
  }, [isActive, isOpen, onToggle])

  const isCollapsed = menuCollapsed && !forceExpanded

  const triggerButton = (
    <Collapsible.Trigger asChild>
      <GroupButton
        item={item}
        isActive={isActive}
        isOpen={isOpen}
        isCollapsed={isCollapsed}
      />
    </Collapsible.Trigger>
  )

  return (
    <li className={cn("list-none", isCollapsed ? "w-full flex flex-col items-center" : "w-full")}>
      <Collapsible.Root
        open={isOpen}
        onOpenChange={onToggle}
        className={cn("w-full", isCollapsed && "flex flex-col items-center")}
      >
        {isCollapsed ? (
          <Tooltip content={item.title} side="right">
            <div className="outline-none w-full flex justify-center">
              {triggerButton}
            </div>
          </Tooltip>
        ) : (
          triggerButton
        )}

        <Collapsible.Content
          className={cn(
            "overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
            isCollapsed ? "w-full flex flex-col items-center" : "w-full"
          )}
        >
          <ul className={cn(
            "py-1 space-y-1 w-full", 
            isCollapsed && "flex flex-col items-center gap-1" // Ensure gap between icons
          )}>
            {item.children.map((child) => {
              // Recursive check: if child has children, render NavigationGroup
              if (child.children && child.children.length > 0) {
                return (
                  <NavigationGroup
                    key={child.id}
                    item={child}
                    forceExpanded={forceExpanded}
                    isOpen={openChildGroupId === child.id}
                    onToggle={() => setOpenChildGroupId(openChildGroupId === child.id ? null : child.id)}
                  />
                )
              }
              // Otherwise render Link
              return (
                <NavigationLink
                  key={child.id}
                  item={child}
                  nested
                  forceExpanded={forceExpanded}
                />
              )
            })}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  )
}

export default NavigationGroup
