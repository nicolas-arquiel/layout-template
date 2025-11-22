import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, X } from 'react-feather'
import { Box, Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'

/**
 * Sidebar - Fijo a la izquierda con header UCU GESTIÓN
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
        style={{
          padding: '16px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Desktop: Menu toggle */}
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

        {/* App Name */}
        {!menuCollapsed && (
          <Heading
            size="4"
            style={{
              color: 'var(--accent-9)',
              fontWeight: 600,
              transition: 'opacity 300ms ease-in-out',
            }}
          >
            UCU GESTIÓN
          </Heading>
        )}
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
