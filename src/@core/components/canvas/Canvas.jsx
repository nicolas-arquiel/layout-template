import React, { useEffect } from 'react'
import { Dialog, Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { X } from 'lucide-react'

/**
 * Canvas - Offcanvas simple sin formulario
 *
 * Versión simple del canvas para contenido general (no formularios).
 * Desliza desde la derecha.
 *
 * @param {boolean} open - Estado de apertura
 * @param {function} onOpenChange - Función para abrir/cerrar
 * @param {string} title - Título del canvas
 * @param {string} width - Ancho del canvas (default: '45%')
 * @param {React.ReactNode} children - Contenido del canvas
 * @param {boolean} forceCloseButton - Backdrop static (no cierra al click fuera) (default: false)
 */
export default function Canvas({
  open,
  onOpenChange,
  title = 'Panel',
  width = '45%',
  children,
  forceCloseButton = false,
}) {
  // Efecto para controlar el scroll del body
  useEffect(() => {
    const body = document.body

    const originalStyles = {}
    for (let prop of body.style) {
      if (body.style[prop]) {
        originalStyles[prop] = body.style[prop]
      }
    }

    if (open === true) {
      for (let prop of body.style) {
        body.style[prop] = ''
      }
      body.style.overflow = 'hidden'
    } else if (open === false) {
      Object.entries(originalStyles).forEach(([prop, value]) => {
        body.style[prop] = value
      })
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={forceCloseButton ? undefined : onOpenChange}>
      <Dialog.Content
        className="canvas-container"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          height: '100vh',
          width: width,
          maxWidth: width,
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
            {!forceCloseButton && (
              <Dialog.Close>
                <IconButton variant="ghost" size="2" color="gray">
                  <X size={18} />
                </IconButton>
              </Dialog.Close>
            )}
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
