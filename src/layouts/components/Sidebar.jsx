import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, Menu } from 'react-feather'
import { Box, Flex, Heading, Text, IconButton, ScrollArea } from '@radix-ui/themes'
import { closeMobileMenu, handleMenuCollapsed } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'

/**
 * Componente Sidebar FULL HEIGHT con Radix UI
 * Incluye header propio con logo/nombre de la app
 * El nombre se oculta cuando está collapsed
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

  // Prevenir scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Overlay para mobile */}
      {mobileMenuOpen && (
        <Box
          display={{ initial: 'block', md: 'none' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={handleCloseMobile}
        />
      )}

      {/* ========== SIDEBAR HEADER ========== */}
      <Flex
        align="center"
        justify="between"
        p="4"
        style={{
          borderBottom: '1px solid var(--gray-6)',
          minHeight: '64px',
        }}
      >
        {/* Desktop: Toggle collapse button */}
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

          {/* App Name - Hidden when collapsed on desktop */}
          {!menuCollapsed && (
            <Heading
              size="5"
              style={{
                transition: 'opacity 300ms ease-in-out',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              Mi App
            </Heading>
          )}
        </Flex>
      </Flex>

      {/* ========== NAVIGATION ========== */}
      <Box style={{ flex: 1, overflow: 'hidden' }}>
        <ScrollArea style={{ height: '100%' }}>
          <Box py="3" asChild>
            <nav>
              <NavigationItems items={navigation} />
            </nav>
          </Box>
        </ScrollArea>
      </Box>

      {/* ========== SIDEBAR FOOTER (opcional) ========== */}
      {!menuCollapsed && (
        <Box
          style={{
            borderTop: '1px solid var(--gray-6)',
          }}
          p="4"
        >
          <Flex align="center" gap="3">
            <Flex
              align="center"
              justify="center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-3)',
                background: 'var(--accent-9)',
                color: 'white',
                flexShrink: 0,
              }}
            >
              <Text size="2" weight="bold" style={{ color: 'white' }}>
                MA
              </Text>
            </Flex>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text
                size="2"
                weight="medium"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                Mi Aplicación
              </Text>
              <Text size="1" color="gray" style={{ whiteSpace: 'nowrap' }}>
                v1.0.0
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  )
}
