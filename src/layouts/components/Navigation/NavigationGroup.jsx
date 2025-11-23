import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'react-feather'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector, useDispatch } from 'react-redux'
import { Badge } from '@radix-ui/themes'
import NavigationLink from './NavigationLink'
import { cn } from '../../../lib/utils'
import { handleMenuCollapsed } from '../../../store/layoutSlice'

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
          : 'w-full px-4 py-3 text-left', // Full width with padding in expanded
        isActive
          ? 'text-[var(--accent-9)] bg-[color-mix(in_srgb,var(--accent-9),transparent_88%)]'
          : 'text-[var(--gray-11)] bg-transparent hover:bg-[var(--gray-3)]',
        !isCollapsed && !isActive && 'hover:translate-x-[5px]'
      )}
      {...props}
    >
      {Icon && <Icon size={20} className={cn("flex-shrink-0", !isCollapsed && "mr-3")} />}
      
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate font-[Montserrat] text-[15px] font-medium">
            {item.title}
          </span>
          {item.badge && <Badge size="1" variant="soft" className="ml-2 mr-2">{item.badge}</Badge>}
          <ChevronDown size={16} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
        </>
      )}
    </button>
  )
})

/**
 * NavigationGroup - Grupos de menú con children
 * Behavior:
 * - Expanded: Standard Accordion
 * - Collapsed: Vertical Accordion (Icons only)
 */
const NavigationGroup = ({ item, forceExpanded = false }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  const isActive = hasActiveChild(item.children, location.pathname)
  const [collapsibleOpen, setCollapsibleOpen] = useState(isActive)

  // Sync collapsible state with active route
  useEffect(() => {
    if (isActive) {
      setCollapsibleOpen(true)
    }
  }, [isActive])

  const isCollapsed = menuCollapsed && !forceExpanded

  // Toggle handler for both modes
  const handleToggle = () => {
    setCollapsibleOpen(!collapsibleOpen)
  }

  return (
    <li className={cn("list-none", isCollapsed ? "w-full flex flex-col items-center" : "w-full")}>
      <Collapsible.Root 
        open={collapsibleOpen} 
        onOpenChange={setCollapsibleOpen}
        className={cn("w-full", isCollapsed && "flex flex-col items-center")}
      >
        <Collapsible.Trigger asChild>
          <GroupButton 
            item={item} 
            isActive={isActive} 
            isOpen={collapsibleOpen}
            isCollapsed={isCollapsed}
            onClick={handleToggle}
            title={isCollapsed ? item.title : undefined}
          />
        </Collapsible.Trigger>

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
