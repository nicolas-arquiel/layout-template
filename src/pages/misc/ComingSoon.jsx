import React from 'react'
import { Flex, Card, Heading, Text, Badge } from '@radix-ui/themes'
import { Rocket, Sparkles } from 'lucide-react'

/**
 * Página "Próximamente"
 * Se muestra para funcionalidades en desarrollo
 */
const ComingSoon = () => {
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
              backgroundColor: 'var(--purple-3)',
              position: 'relative',
            }}
          >
            <Rocket size={50} color="var(--purple-9)" />
            <Sparkles
              size={20}
              color="var(--purple-9)"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            />
          </Flex>

          {/* Badge */}
          <Badge size="2" color="purple" variant="soft">
            <Sparkles size={14} />
            Próximamente
          </Badge>

          {/* Título */}
          <Heading size="6">
            ¡Algo increíble está en camino!
          </Heading>

          {/* Mensaje */}
          <Flex direction="column" gap="2">
            <Text size="3" color="gray">
              Estamos trabajando en esta funcionalidad para ofrecerte la mejor experiencia posible.
            </Text>
            <Text size="2" color="gray" style={{ marginTop: '0.5rem' }}>
              Mantente atento a las próximas actualizaciones.
            </Text>
          </Flex>

          {/* Información adicional */}
          <Card variant="surface" style={{ marginTop: '1rem', width: '100%' }}>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold">
                ¿Tienes sugerencias?
              </Text>
              <Text size="2" color="gray">
                Nos encantaría escuchar tus ideas: <strong>feedback@ejemplo.com</strong>
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Flex>
  )
}

export default ComingSoon
