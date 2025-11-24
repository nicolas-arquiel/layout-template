import { createContext, useContext, useState, useEffect } from 'react'
import { Dialog, Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { Cross1Icon } from '@radix-ui/react-icons'

/**
 * Context para rastrear el nivel de anidamiento de offcanvas
 */
const OffcanvasContext = createContext({ level: 0, setChildOpen: () => {} })

/**
 * Offcanvas - Panel lateral deslizante con animación slide desde la derecha
 *
 * Características:
 * - Animación slide-in desde la derecha (como Bootstrap offcanvas)
 * - Soporte para offcanvas anidados (nested)
 * - Cuando se abre un nested, el padre se empuja hacia la izquierda
 * - El padre queda parcialmente visible para poder volver
 * - Cada nivel tiene su propio z-index y overlay más oscuro
 *
 * @param {boolean} open - Estado de apertura
 * @param {function} onOpenChange - Callback cuando cambia el estado
 * @param {string} title - Título del offcanvas
 * @param {string} side - Lado: 'right' | 'left' (default: 'right')
 * @param {string} width - Ancho del offcanvas (default: '400px')
 * @param {React.ReactNode} children - Contenido del offcanvas
 * @param {React.ReactNode} trigger - Elemento trigger opcional
 *
 * @example
 * // Offcanvas simple
 * <Offcanvas open={isOpen} onOpenChange={setIsOpen} title="Configuración">
 *   <Text>Contenido aquí</Text>
 * </Offcanvas>
 *
 * @example
 * // Offcanvas anidado (el primero se empuja a la izquierda)
 * <Offcanvas open={open1} onOpenChange={setOpen1} title="Panel 1">
 *   <Button onClick={() => setOpen2(true)}>Abrir Panel 2</Button>
 *
 *   <Offcanvas open={open2} onOpenChange={setOpen2} title="Panel 2">
 *     <Text>Este panel empuja al Panel 1 hacia la izquierda</Text>
 *   </Offcanvas>
 * </Offcanvas>
 */
export default function Offcanvas({
  open,
  onOpenChange,
  title,
  side = 'right',
  width = '400px',
  children,
  trigger,
}) {
  // Obtener el nivel de anidamiento del contexto padre
  const parentContext = useContext(OffcanvasContext)
  const level = parentContext.level

  // Estado para rastrear si este offcanvas tiene un hijo abierto
  const [hasChildOpen, setHasChildOpen] = useState(false)

  // Notificar al padre cuando este offcanvas se abre/cierra
  useEffect(() => {
    if (level > 0 && parentContext.setChildOpen) {
      parentContext.setChildOpen(open)
    }
  }, [open, level, parentContext])

  return (
    <OffcanvasContext.Provider value={{ level: level + 1, setChildOpen: setHasChildOpen }}>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}

        <Dialog.Content
          className={`offcanvas-container level-${level} ${hasChildOpen ? 'has-nested-open' : ''}`}
          data-offcanvas-level={level}
          style={{
            position: 'fixed',
            top: 0,
            [side]: 0,
            bottom: 0,
            height: '100vh',
            maxWidth: width,
            width: '100%',
            margin: 0,
            borderRadius: 0,
            padding: 0,
            overflow: 'hidden',
            zIndex: 1000 + level,
          }}
        >
          {/* Header */}
          <Flex
            direction="column"
            style={{
              borderBottom: '1px solid var(--gray-5)',
              padding: 'var(--space-5)',
              paddingBottom: 'var(--space-4)',
            }}
          >
            <Flex align="center" justify="between" mb="2">
              <Heading size="5" weight="medium">
                {title}
              </Heading>
              <Dialog.Close>
                <IconButton variant="ghost" size="2" color="gray">
                  <Cross1Icon width="16" height="16" />
                </IconButton>
              </Dialog.Close>
            </Flex>
          </Flex>

          {/* Content con ScrollArea */}
          <ScrollArea
            style={{
              height: 'calc(100vh - 80px)',
              padding: 'var(--space-5)',
            }}
          >
            {children}
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Root>
    </OffcanvasContext.Provider>
  )
}
