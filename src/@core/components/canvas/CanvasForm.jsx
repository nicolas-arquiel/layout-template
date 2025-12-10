import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Dialog, Flex, Heading, IconButton, ScrollArea, Button } from '@radix-ui/themes'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import { transformData } from './CanvasUtils'

/**
 * CanvasForm - Offcanvas con formulario integrado usando react-hook-form
 *
 * Similar al CanvasForm original pero usando Radix UI.
 * Desliza desde la derecha, maneja formularios, botones configurables.
 *
 * @param {boolean} canvasOpen - Estado de apertura
 * @param {function} toggleCanvas - Función para abrir/cerrar
 * @param {React.Component} component - Componente del formulario a renderizar
 * @param {React.ReactNode} Children - Alternativa a component
 * @param {function} onSubmitCallback - Callback cuando se envía el formulario
 * @param {string} title - Título del canvas
 * @param {string} width - Ancho del canvas (default: '45%')
 * @param {boolean} shouldTransformData - Si debe transformar los datos con transformData (default: true)
 * @param {boolean} forceCloseButton - Backdrop static (no cierra al click fuera) (default: false)
 * @param {object} componentProps - Props adicionales para pasar al componente hijo
 * @param {any} id - ID para pasar al componente hijo
 * @param {boolean} showSendBtnProp - Mostrar/ocultar botón enviar
 * @param {boolean} backBtn - Mostrar botón regresar
 * @param {React.Component} IconBack - Icono personalizado para botón regresar
 * @param {string} textBack - Texto botón regresar (default: 'Regresar')
 * @param {boolean} sendBtn - Mostrar botón enviar
 * @param {React.Component} IconSend - Icono personalizado para botón enviar
 * @param {string} textSend - Texto botón enviar (default: 'Enviar')
 * @param {function} onClick - Callback adicional al hacer click en enviar
 * @param {object} contentStyle - Estilos personalizados para el contenedor de contenido
 * @param {string} bodyStyle - Clase CSS adicional para el body
 */
export default function CanvasForm({
  canvasOpen,
  toggleCanvas,
  component: Component,
  Children,
  onSubmitCallback,
  title = 'Formulario',
  width = '45%',
  shouldTransformData = true,
  forceCloseButton = false,
  componentProps = {},
  id,
  showSendBtnProp = true,
  backBtn = true,
  IconBack,
  textBack = 'Regresar',
  sendBtn = true,
  IconSend,
  textSend = 'Enviar',
  onClick,
  contentStyle = {},
  bodyStyle = '',
}) {
  const methods = useForm()
  const [showSendBtn, setShowSendBtn] = useState(showSendBtnProp)

  useEffect(() => {
    setShowSendBtn(showSendBtnProp)
  }, [showSendBtnProp])

  // Efecto para controlar el scroll del body
  useEffect(() => {
    const body = document.body

    // Solo guardamos los estilos que ya están definidos inline
    const originalStyles = {}
    for (let prop of body.style) {
      if (body.style[prop]) {
        originalStyles[prop] = body.style[prop]
      }
    }

    if (canvasOpen === true) {
      // Limpiamos todos los estilos
      for (let prop of body.style) {
        body.style[prop] = ''
      }
      // Solo aplicamos overflow hidden
      body.style.overflow = 'hidden'
    } else if (canvasOpen === false) {
      // Restauramos los estilos originales
      Object.entries(originalStyles).forEach(([prop, value]) => {
        body.style[prop] = value
      })
    }
  }, [canvasOpen])

  const onSubmit = (data) => {
    const submissionData = shouldTransformData ? transformData(data) : data
    onSubmitCallback(submissionData)
  }

  const renderChildren = () => {
    if (Component) {
      return (
        <Component
          id={id}
          control={methods.control}
          errors={methods.formState.errors}
          setShowSendBtn={setShowSendBtn}
          showSendBtn={showSendBtn}
          {...methods}
          {...componentProps}
        />
      )
    } else if (Children && Children.type) {
      return (
        <Children.type
          id={id}
          control={methods.control}
          errors={methods.formState.errors}
          setShowSendBtn={setShowSendBtn}
          showSendBtn={showSendBtn}
          {...methods}
          {...componentProps}
        />
      )
    }
    return null
  }

  return (
    <Dialog.Root
      open={canvasOpen}
      onOpenChange={forceCloseButton ? undefined : toggleCanvas}
    >
      <Dialog.Content
        className="canvas-form-container"
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

        {/* Body con formulario */}
        <Flex
          direction="column"
          className={bodyStyle}
          style={{
            height: 'calc(100vh - 80px)',
          }}
        >
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Contenido del formulario */}
              <ScrollArea
                style={{
                  flex: 1,
                  maxHeight: '90vh',
                  padding: 'var(--space-5)',
                  ...contentStyle,
                }}
              >
                {renderChildren()}
              </ScrollArea>

              {/* Botones de acción */}
              <Flex
                justify="between"
                align="center"
                p="5"
                style={{
                  borderTop: '1px solid var(--gray-5)',
                }}
              >
                {(backBtn || IconBack || textBack) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleCanvas}
                  >
                    {IconBack ? (
                      <IconBack size={14} />
                    ) : (
                      <ArrowLeft size={14} />
                    )}
                    {textBack}
                  </Button>
                )}

                {showSendBtn && (sendBtn || IconSend || textSend) && (
                  <Button
                    type="submit"
                    onClick={onClick}
                    style={{ marginLeft: 'auto' }}
                  >
                    {textSend}
                    {IconSend ? (
                      <IconSend size={14} />
                    ) : (
                      <ArrowRight size={14} />
                    )}
                  </Button>
                )}
              </Flex>
            </form>
          </FormProvider>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
