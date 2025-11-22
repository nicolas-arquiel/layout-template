import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, Menu } from 'react-feather'
import { Box, Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'

/**
 * Componente Sidebar con header "UCU GESTIÓN"
 *
 * @returns {JSX.Element}
 */
export default function Sidebar() {
  const dispatch = useDispatch()
  const menuCollapsed = useSelector((state) => state.layout.menuCollapsed)
  const mobileMenuOpen = useSelector((state) => state.layout.mobileMenuOpen)

  const handleCloseMobile = () => {
    dispatch(closeMobileMenu())
  }

  const handleToggleCollapse = () => {
    dispatch(handleMenuCollapsed(!menuCollapsed))
  }

  // Cerrar menú mobile al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        handleCloseMobile()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  return (
    <Flex direction="column" style={{ height: '100%' }}>
      {/* ========== SIDEBAR HEADER ========== */}
      <Box
        p="4"
        style={{
          borderBottom: '1px solid var(--border-color)',
          minHeight: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Desktop: Toggle collapse button + App Name */}
        <Flex align="center" gap="3" style={{ width: '100%' }}>
          <Box display={{ initial: 'none', md: 'block' }}>
            <IconButton variant="ghost" onClick={handleToggleCollapse} size="2">
              <Menu size={18} />
            </IconButton>
          </Box>

          {/* Mobile: Close button */}
          <Box display={{ initial: 'block', md: 'none' }}>
            <IconButton variant="ghost" onClick={handleCloseMobile} size="2">
              <X size={18} />
            </IconButton>
          </Box>

          {/* App Name - UCU GESTIÓN */}
          {!menuCollapsed && (
            <Heading
              size="4"
              style={{
                color: 'var(--accent-9)',
                transition: 'opacity 300ms ease-in-out',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                fontWeight: 600,
              }}
            >
              UCU GESTIÓN
            </Heading>
          )}
        </Flex>
      </Box>

      {/* ========== NAVIGATION ========== */}
      <Box style={{ flex: 1, overflow: 'hidden' }}>
        <ScrollArea style={{ height: '100%' }}>
          <Box p="3" asChild>
            <nav>
              <NavigationItems items={navigation} />
            </nav>
          </Box>
        </ScrollArea>
      </Box>
    </Flex>
  )
}
