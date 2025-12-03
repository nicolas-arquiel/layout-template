import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Flex, Card, Heading, Text, Button } from '@radix-ui/themes'
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react'

/**
 * Página de acceso denegado
 * Se muestra cuando el usuario no tiene permisos para acceder a una ruta
 * 
 * @param {string} permiso - Permiso requerido que no tiene el usuario
 */
const NotAuthorized = ({ permiso }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: '60vh', padding: '2rem' }}
    >
      <Card size="4" style={{ maxWidth: '600px', width: '100%' }}>
        <Flex direction="column" align="center" gap="4" style={{ textAlign: 'center' }}>
          {/* Icono */}
          <Flex
            align="center"
            justify="center"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--red-3)',
            }}
          >
            <ShieldAlert size={40} color="var(--red-9)" />
          </Flex>

          {/* Título */}
          <Heading size="6" style={{ color: 'var(--red-11)' }}>
            Acceso Denegado
          </Heading>

          {/* Mensaje */}
          <Flex direction="column" gap="2">
            <Text size="3" color="gray">
              No cuentas con los permisos necesarios para visualizar esta página.
            </Text>
            {permiso && (
              <Text size="2" color="gray" style={{ marginTop: '0.5rem' }}>
                Permiso requerido: <strong>{permiso}</strong>
              </Text>
            )}
            <Text size="2" color="gray" style={{ marginTop: '0.5rem' }}>
              Ruta solicitada: <strong>{location.pathname}</strong>
            </Text>
          </Flex>

          {/* Botones */}
          <Flex gap="3" style={{ marginTop: '1rem' }}>
            <Button
              variant="soft"
              onClick={() => navigate(-1)}
              style={{ cursor: 'pointer' }}
            >
              <ArrowLeft size={16} />
              Volver
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

export default NotAuthorized
