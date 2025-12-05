import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import { Badge, Tooltip } from '@radix-ui/themes'
import NavigationLink from './NavigationLink'
import { cn } from '@lib/utils'

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
const GroupButton = React.forwardRef(({ item, isActive, isOpen, isCollapsed, nested, ...props }, ref) => {
  const Icon = item.icon
  return (
    <button
      ref={ref}
      className={cn(
        'flex items-center rounded-md transition-transform duration-300 ease-in-out',
        'min-h-[48px] cursor-pointer border-none outline-none',
        isCollapsed
          ? 'justify-center w-[48px] h-[48px] mx-auto my-1' // Centered square in collapsed
          : 'w-full !px-3 py-3 text-left', // Full width with internal padding in expanded (forced)
        isActive
          ? 'text-[var(--accent-9)] bg-[color-mix(in_srgb,var(--accent-9),transparent_88%)]'
          : 'text-[var(--gray-11)] bg-transparent hover:bg-[var(--gray-3)]',
        !isCollapsed && !isActive && 'hover:translate-x-[5px]',
        // Nested indentation (only when expanded)
        !isCollapsed && nested && 'pl-10'
      )}
      {...props}
    >
      {/* Icon - ALWAYS VISIBLE - Mismo estilo que NavigationItem */}
      {Icon && (
        <span className={cn(
          "flex items-center justify-center transition-all duration-300 flex-shrink-0",
          "w-[24px] h-[24px]"
        )}>
          <Icon size={nested ? 14 : 20} />
        </span>
      )}
      
      {/* Text Container - Mismo estilo que NavigationItem */}
      {!isCollapsed && (
        <div className={cn(
          "flex items-center whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
          "w-auto opacity-100 flex-1 !ml-4"
        )}>
          <div className="flex items-center justify-between gap-2 w-full">
            <span className="flex-1 truncate font-[Montserrat] text-[14px] font-medium">
              {item.title}
            </span>
            {/* Badge - Mismo estilo que NavigationItem */}
            {item.badge && (
              <Badge size="1" variant="soft" className="flex-shrink-0">
                {item.badge}
              </Badge>
            )}
            {/* Chevron - Siempre presente para mantener alineación */}
            <ChevronDown 
              width="16" 
              height="16" 
              className={cn(
                "transition-transform duration-300 flex-shrink-0",
                isOpen && "rotate-180"
              )} 
            />
          </div>
        </div>
      )}
    </button>
  )
})

/**
 * NavigationGroup - Grupos de menú con children
 * Behavior:
 * - Expanded: Permite múltiples grupos abiertos, solo cierra al cambiar de item activo
 * - Collapsed: Vertical Accordion (Icons only)
 * - Permite cerrar un grupo aunque tenga un hijo activo
 * - Soporta anidamiento recursivo con la misma lógica
 */
const NavigationGroup = ({ item, forceExpanded = false, isOpen, onToggle, nested = false }) => {
  const location = useLocation()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  const isActive = hasActiveChild(item.children, location.pathname)

  // Estado para múltiples child groups abiertos (Set de IDs) - igual que NavigationItems
  const [openChildGroupIds, setOpenChildGroupIds] = useState(new Set())

  // Abrir automáticamente si contiene la ruta activa (solo la primera vez)
  useEffect(() => {
    if (isActive && !isOpen && onToggle) {
      onToggle()
    }
  }, [isActive])

  // Cerrar child groups que no contengan la ruta activa cuando cambia la ubicación
  useEffect(() => {
    setOpenChildGroupIds((prevIds) => {
      const newIds = new Set(prevIds)
      // Filtrar solo los child groups que contienen la ruta activa
      item.children.forEach((child) => {
        if (child.children && newIds.has(child.id)) {
          if (!hasActiveChild(child.children, location.pathname)) {
            newIds.delete(child.id)
          }
        }
      })
      return newIds
    })
  }, [location.pathname])

  const isCollapsed = menuCollapsed && !forceExpanded

  // Handler personalizado para el toggle que permite cerrar aunque tenga hijo activo
  const handleToggle = () => {
    if (onToggle) {
      onToggle()
    }
  }

  const triggerButton = (
    <Collapsible.Trigger asChild>
      <GroupButton
        item={item}
        isActive={isActive}
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        nested={nested}
      />
    </Collapsible.Trigger>
  )

  return (
    <li className={cn("list-none", isCollapsed ? "w-full flex flex-col items-center" : "w-full")}>
      <Collapsible.Root
        open={isOpen}
        onOpenChange={handleToggle}
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
                    isOpen={openChildGroupIds.has(child.id)}
                    nested={true}
                    onToggle={() => {
                      setOpenChildGroupIds((prevIds) => {
                        const newIds = new Set(prevIds)
                        if (newIds.has(child.id)) {
                          newIds.delete(child.id)
                        } else {
                          newIds.add(child.id)
                        }
                        return newIds
                      })
                    }}
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
