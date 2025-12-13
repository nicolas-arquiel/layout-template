import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useSelector } from 'react-redux'
import { Tooltip } from '@radix-ui/themes'
import NavigationLink from './NavigationLink'


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
const GroupButton = React.forwardRef(({ item, isActive, isOpen, isLayoutCollapsed, isContentCollapsed, nested, ...props }, ref) => {
  const Icon = item.icon
  return (
    <button
      ref={ref}
      className={`flex items-center rounded-md min-h-[48px] cursor-pointer border-none outline-none transition-[width,translate,background-color] duration-200 ease-out !px-4 py-3 ${
        isActive
          ? 'text-[var(--accent-9)] bg-[color-mix(in_srgb,var(--accent-9),transparent_88%)]'
          : 'text-[var(--gray-11)] bg-transparent hover:bg-[var(--gray-3)]'
      } ${
        !isLayoutCollapsed && !isActive ? 'hover:translate-x-[5px]' : ''
      } ${
        isLayoutCollapsed
          ? 'w-[56px]'
          : `w-full text-left ${nested ? 'pl-10' : ''}`
      }`}
      {...props}
    >
      {/* Icon - ALWAYS VISIBLE - Mismo estilo que NavigationItem */}
      {Icon && (
        <span className="flex items-center justify-center transition-transform duration-300 flex-shrink-0 w-[24px] h-[24px]">
          <Icon size={nested ? 14 : 20} />
        </span>
      )}
      
      {/* Reveals from left to right */}
      <div className={`flex items-center whitespace-nowrap overflow-hidden transition-[width,margin] duration-300 ease-in-out ${isLayoutCollapsed ? "w-0 ml-0 border-none" : "w-auto flex-1 !ml-4"}`}>
          <div
            className="flex items-center justify-between gap-2 w-full transition-[clip-path] duration-150 ease-in-out"
            style={{
              clipPath: isContentCollapsed 
                ? 'inset(0 100% 0 0)' // Hidden: clipped from right
                : 'inset(0 0 0 0)'    // Visible: full reveal
            }}
          >
            <span className="flex-1 truncate text-[14px] font-medium">
              {item.title}
            </span>

            {/* Chevron - Siempre presente para mantener alineación */}
            <ChevronDown 
              width="16" 
              height="16" 
              className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} 
            />
          </div>
        </div>
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
const NavigationGroup = ({ item, forceExpanded = false, isOpen, onToggle, nested = false, collapsed }) => {
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

  // Both states use menuCollapsed directly for IMMEDIATE response
  // No delay - change to icons instantly when button is pressed
  const isLayoutCollapsed = menuCollapsed && !forceExpanded
  const isContentCollapsed = menuCollapsed && !forceExpanded

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
        isLayoutCollapsed={isLayoutCollapsed}
        isContentCollapsed={isContentCollapsed}
        nested={nested}
      />
    </Collapsible.Trigger>
  )

  return (
    <li className="list-none w-full">
      <Collapsible.Root
        open={isOpen}
        onOpenChange={handleToggle}
        className={`w-full ${isLayoutCollapsed ? "flex flex-col items-center" : ""}`}
      >
        {isLayoutCollapsed ? (
          <Tooltip content={item.title} side="right">
            <div className="outline-none w-full">
              {triggerButton}
            </div>
          </Tooltip>
        ) : (
          <div className="outline-none w-full">
            {triggerButton}
          </div>
        )}

        <Collapsible.Content
          className={`overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up ${isLayoutCollapsed ? "w-full flex flex-col items-center" : "w-full"}`}
        >
          <ul className={`w-full ${isLayoutCollapsed ? "flex flex-col items-center" : ""}`}>
            {item.children.map((child) => {
              // Recursive check: if child has children, render NavigationGroup
              if (child.children && child.children.length > 0) {
                return (
                  <NavigationGroup
                    key={child.id}
                    item={child}
                    forceExpanded={forceExpanded}
                    collapsed={collapsed}
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
                  collapsed={collapsed}
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
