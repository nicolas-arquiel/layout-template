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
// Helper simple para cortar texto si es muy largo (Fallback de seguridad)
const truncateText = (text, maxLength = 15) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Shared Button Component for consistency
 * Refactored to Flat Structure
 */
const GroupButton = React.forwardRef(({ item, isActive, isOpen, isLayoutCollapsed, nested, ...props }, ref) => {
  const Icon = item.icon
  return (
    <button
      ref={ref}
      className={`flex items-center w-full rounded-md transition-all duration-200 ease-in-out min-h-[45px] relative cursor-pointer
        ${isActive
          ? 'text-[var(--accent-9)] bg-[var(--accent-3)]'
          : `text-[var(--gray-11)] hover:bg-[var(--gray-3)] ${!isLayoutCollapsed ? 'hover:translate-x-[5px]' : ''}`
        }
        ${isLayoutCollapsed 
          ? 'justify-center px-2' 
          : `px-4 ${nested ? 'pl-8' : ''}`
        }
      `}
      {...props}
    >
      {Icon && (
        <Icon 
          size={nested ? 14 : 20} 
          className={`flex-shrink-0 transition-all duration-200 ${isLayoutCollapsed ? '' : 'mr-3'}`} 
        />
      )}
      
      {!isLayoutCollapsed && (
        <>
          <span className="truncate flex-1 text-left text-[14px] font-medium leading-none min-w-0">
            {truncateText(item.title)}
          </span>
          <ChevronDown 
            size={16}
            className={`flex-shrink-0 transition-transform duration-200 ml-2 ${isOpen ? "rotate-180" : ""}`} 
          />
        </>
      )}
    </button>
  )
})

/**
 * NavigationGroup - Grupos de menú con children
 */
const NavigationGroup = ({ item, forceExpanded = false, isOpen, onToggle, nested = false, collapsed }) => {
  const location = useLocation()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)

  const isActive = hasActiveChild(item.children, location.pathname)

  // Estado para múltiples child groups abiertos (Set de IDs)
  const [openChildGroupIds, setOpenChildGroupIds] = useState(new Set())

  // Abrir automáticamente si contiene la ruta activa
  useEffect(() => {
    if (isActive && !isOpen && onToggle) {
      onToggle()
    }
  }, [isActive])

  // Cerrar child groups que no contengan la ruta activa cuando cambia la ubicación
  useEffect(() => {
    setOpenChildGroupIds((prevIds) => {
      const newIds = new Set(prevIds)
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

  const isLayoutCollapsed = menuCollapsed && !forceExpanded

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
        nested={nested}
      />
    </Collapsible.Trigger>
  )

  return (
    <li className="list-none w-full mb-1">
      <Collapsible.Root
        open={isOpen}
        onOpenChange={handleToggle}
        className="w-full"
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
          className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up w-full"
        >
          <ul className="w-full flex flex-col gap-1">
            {item.children.map((child) => {
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
