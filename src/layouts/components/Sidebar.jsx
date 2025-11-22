import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'react-feather'
import { Box, Flex, Heading, Text, IconButton } from '@radix-ui/themes'
import { closeMobileMenu } from '../../store/layoutSlice'
import NavigationItems from './Navigation/NavigationItems'
import navigation from '../../navigation/vertical'

/**
 * Componente Sidebar con navegación vertical usando Radix UI
 * Responsive con overlay en mobile y colapsible en desktop
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

      {/* Sidebar */}
      <Box
        asChild
        style={{
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          borderRight: '1px solid var(--gray-6)',
          position: 'relative',
        }}
      >
        <aside>
          {/* Mobile close button - solo visible en mobile */}
          <Box display={{ initial: 'block', md: 'none' }}>
            <Flex
              align="center"
              justify="between"
              px="4"
              py="3"
              style={{ borderBottom: '1px solid var(--gray-6)' }}
            >
              <Heading size="4">Menú</Heading>
              <IconButton
                variant="ghost"
                onClick={handleCloseMobile}
                aria-label="Close menu"
              >
                <X size={20} />
              </IconButton>
            </Flex>
          </Box>

          {/* Navigation */}
          <Box py="4" asChild>
            <nav>
              <NavigationItems items={navigation} />
            </nav>
          </Box>

          {/* Sidebar footer (opcional) - solo cuando no está colapsado */}
          {!menuCollapsed && (
            <Box
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
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
                  }}
                >
                  <Text size="2" weight="bold">
                    MA
                  </Text>
                </Flex>
                <Box style={{ flex: 1 }}>
                  <Text size="2" weight="medium">
                    Mi Aplicación
                  </Text>
                  <Text size="1" color="gray">
                    v1.0.0
                  </Text>
                </Box>
              </Flex>
            </Box>
          )}
        </aside>
      </Box>
    </>
  )
}
