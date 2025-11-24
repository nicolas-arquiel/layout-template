import { Dialog, Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { Cross1Icon } from '@radix-ui/react-icons'

/**
 * Offcanvas - Panel lateral deslizante usando Dialog de Radix
 *
 * Similar al ThemePanel de Radix, con animaciones nativas suaves.
 * Soporta offcanvas anidados (nested) para UX avanzadas.
 *
 * @param {boolean} open - Estado de apertura
 * @param {function} onOpenChange - Callback cuando cambia el estado
 * @param {string} title - Título del offcanvas
 * @param {string} side - Lado desde donde aparece: 'right' | 'left' (default: 'right')
 * @param {string} width - Ancho del offcanvas (default: '400px')
 * @param {React.ReactNode} children - Contenido del offcanvas
 * @param {React.ReactNode} trigger - Elemento trigger opcional
 *
 * @example
 * // Uso básico
 * <Offcanvas open={isOpen} onOpenChange={setIsOpen} title="Configuración">
 *   <Text>Contenido aquí</Text>
 * </Offcanvas>
 *
 * @example
 * // Offcanvas anidado (nested)
 * <Offcanvas open={open1} onOpenChange={setOpen1} title="Panel 1">
 *   <Button onClick={() => setOpen2(true)}>Abrir Panel 2</Button>
 *
 *   <Offcanvas open={open2} onOpenChange={setOpen2} title="Panel 2">
 *     <Text>Panel anidado</Text>
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
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}

      <Dialog.Content
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
  )
}
