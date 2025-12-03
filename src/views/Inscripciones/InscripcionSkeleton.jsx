import React from 'react'
import { Flex, Card, Skeleton, Grid } from '@radix-ui/themes'

/**
 * Skeleton para formularios de inscripción
 * Muestra campos de formulario organizados en secciones
 */
const InscripcionSkeleton = () => {
  return (
    <Flex direction="column" gap="4" style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <Flex direction="column" gap="2">
        <Skeleton width="300px" height="36px" />
        <Skeleton width="400px" height="20px" />
      </Flex>

      {/* Sección 1: Datos Personales */}
      <Card>
        <Flex direction="column" gap="4">
          <Skeleton width="180px" height="24px" />
          
          <Grid columns={{ initial: '1', sm: '2' }} gap="4">
            <Flex direction="column" gap="2">
              <Skeleton width="100px" height="16px" />
              <Skeleton width="100%" height="40px" />
            </Flex>
            <Flex direction="column" gap="2">
              <Skeleton width="100px" height="16px" />
              <Skeleton width="100%" height="40px" />
            </Flex>
          </Grid>

          <Grid columns={{ initial: '1', sm: '2' }} gap="4">
            <Flex direction="column" gap="2">
              <Skeleton width="100px" height="16px" />
              <Skeleton width="100%" height="40px" />
            </Flex>
            <Flex direction="column" gap="2">
              <Skeleton width="100px" height="16px" />
              <Skeleton width="100%" height="40px" />
            </Flex>
          </Grid>

          <Flex direction="column" gap="2">
            <Skeleton width="100px" height="16px" />
            <Skeleton width="100%" height="40px" />
          </Flex>
        </Flex>
      </Card>

      {/* Sección 2: Información Académica */}
      <Card>
        <Flex direction="column" gap="4">
          <Skeleton width="200px" height="24px" />
          
          <Grid columns={{ initial: '1', sm: '2' }} gap="4">
            <Flex direction="column" gap="2">
              <Skeleton width="120px" height="16px" />
              <Skeleton width="100%" height="40px" />
            </Flex>
            <Flex direction="column" gap="2">
              <Skeleton width="120px" height="16px" />
              <Skeleton width="100%" height="40px" />
            </Flex>
          </Grid>

          <Flex direction="column" gap="2">
            <Skeleton width="150px" height="16px" />
            <Skeleton width="100%" height="80px" />
          </Flex>
        </Flex>
      </Card>

      {/* Sección 3: Documentación */}
      <Card>
        <Flex direction="column" gap="4">
          <Skeleton width="150px" height="24px" />
          
          {[1, 2, 3].map((i) => (
            <Flex key={i} direction="column" gap="2">
              <Skeleton width="180px" height="16px" />
              <Skeleton width="100%" height="100px" style={{ borderRadius: 'var(--radius-3)', border: '2px dashed var(--gray-5)' }} />
            </Flex>
          ))}
        </Flex>
      </Card>

      {/* Botones */}
      <Flex gap="3" justify="end">
        <Skeleton width="100px" height="40px" />
        <Skeleton width="150px" height="40px" />
      </Flex>
    </Flex>
  )
}

export default InscripcionSkeleton
