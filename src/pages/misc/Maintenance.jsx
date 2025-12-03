import React from 'react'
import { Flex, Card, Heading, Text, Badge } from '@radix-ui/themes'
import { Wrench, Clock } from 'lucide-react'

/**
 * Página de mantenimiento
 * Se muestra cuando el sistema está en mantenimiento
 */
const Maintenance = () => {
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
              backgroundColor: 'var(--blue-3)',
            }}
          >
            <Wrench size={50} color="var(--blue-9)" />
          </Flex>

          {/* Badge */}
          <Badge size="2" color="blue" variant="soft">
            <Clock size={14} />
            En Mantenimiento
          </Badge>

          {/* Título */}
          <Heading size="6">
            Estamos mejorando el sistema
          </Heading>

          {/* Mensaje */}
          <Flex direction="column" gap="2">
            <Text size="3" color="gray">
              Actualmente estamos realizando tareas de mantenimiento para mejorar tu experiencia.
            </Text>
            <Text size="2" color="gray" style={{ marginTop: '0.5rem' }}>
              Estaremos de vuelta pronto. Gracias por tu paciencia.
            </Text>
          </Flex>

          {/* Información adicional */}
          <Card variant="surface" style={{ marginTop: '1rem', width: '100%' }}>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold">
                ¿Necesitas ayuda urgente?
              </Text>
              <Text size="2" color="gray">
                Contacta a soporte: <strong>soporte@ejemplo.com</strong>
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Maintenance
