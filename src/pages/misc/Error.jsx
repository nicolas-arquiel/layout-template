import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { Flex, Card, Heading, Text, Button, Code } from '@radix-ui/themes'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

/**
 * Página de error 404/500
 * Se muestra cuando ocurre un error en la aplicación o ruta no encontrada
 */
const Error = () => {
  const navigate = useNavigate()
  const error = useRouteError()

  const is404 = error?.status === 404 || !error
  const errorCode = error?.status || 404
  const errorMessage = error?.statusText || error?.message || 'Página no encontrada'

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: '100vh', padding: '2rem', backgroundColor: 'var(--gray-2)' }}
    >
      <Card size="4" style={{ maxWidth: '600px', width: '100%' }}>
        <Flex direction="column" align="center" gap="4" style={{ textAlign: 'center' }}>
          {/* Icono */}
          <Flex
            align="center"
            justify="center"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--amber-3)',
            }}
          >
            <AlertTriangle size={50} color="var(--amber-9)" />
          </Flex>

          {/* Código de error */}
          <Heading size="8" style={{ color: 'var(--amber-11)' }}>
            {errorCode}
          </Heading>

          {/* Título */}
          <Heading size="5">
            {is404 ? '¡Oops! Página no encontrada' : '¡Algo salió mal!'}
          </Heading>

          {/* Mensaje */}
          <Text size="3" color="gray">
            {is404
              ? 'La página que estás buscando no existe o ha sido movida.'
              : 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'}
          </Text>

          {/* Detalles del error (solo en desarrollo) */}
          {import.meta.env.DEV && error && (
            <Code size="2" variant="soft" color="red" style={{ maxWidth: '100%', wordBreak: 'break-word' }}>
              {errorMessage}
            </Code>
          )}

          {/* Botones */}
          <Flex gap="3" style={{ marginTop: '1rem' }}>
            <Button
              variant="soft"
              onClick={() => window.location.reload()}
              style={{ cursor: 'pointer' }}
            >
              <RefreshCw size={16} />
              Recargar
            </Button>
            <Button
              onClick={() => navigate('/inicio')}
              style={{ cursor: 'pointer' }}
            >
              <Home size={16} />
              Ir al Inicio
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Error
