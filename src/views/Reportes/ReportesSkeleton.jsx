import React from 'react'
import { Flex, Card, Skeleton, Grid } from '@radix-ui/themes'

/**
 * Skeleton para página de reportes
 * Muestra filtros, gráficos y tablas de datos
 */
const ReportesSkeleton = () => {
  return (
    <Flex direction="column" gap="4" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <Flex justify="between" align="center">
        <Flex direction="column" gap="2">
          <Skeleton width="200px" height="32px" />
          <Skeleton width="350px" height="20px" />
        </Flex>
        <Skeleton width="150px" height="36px" />
      </Flex>

      {/* Filtros */}
      <Card>
        <Flex direction="column" gap="3">
          <Skeleton width="120px" height="20px" />
          <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="3">
            <Flex direction="column" gap="2">
              <Skeleton width="80px" height="16px" />
              <Skeleton width="100%" height="36px" />
            </Flex>
            <Flex direction="column" gap="2">
              <Skeleton width="80px" height="16px" />
              <Skeleton width="100%" height="36px" />
            </Flex>
            <Flex direction="column" gap="2">
              <Skeleton width="80px" height="16px" />
              <Skeleton width="100%" height="36px" />
            </Flex>
            <Flex direction="column" gap="2">
              <Skeleton width="80px" height="16px" />
              <Skeleton width="100%" height="36px" />
            </Flex>
          </Grid>
        </Flex>
      </Card>

      {/* Gráficos */}
      <Grid columns={{ initial: '1', md: '2' }} gap="4">
        <Card>
          <Flex direction="column" gap="3">
            <Skeleton width="180px" height="24px" />
            <Skeleton width="100%" height="300px" />
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" gap="3">
            <Skeleton width="180px" height="24px" />
            <Skeleton width="100%" height="300px" />
          </Flex>
        </Card>
      </Grid>

      {/* Tabla de datos */}
      <Card>
        <Flex direction="column" gap="3">
          <Skeleton width="150px" height="24px" />
          
          {/* Table Header */}
          <Flex gap="3" style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-5)' }}>
            <Skeleton width="20%" height="20px" />
            <Skeleton width="25%" height="20px" />
            <Skeleton width="20%" height="20px" />
            <Skeleton width="20%" height="20px" />
            <Skeleton width="15%" height="20px" />
          </Flex>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <Flex key={i} gap="3" align="center" style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-3)' }}>
              <Skeleton width="20%" height="18px" />
              <Skeleton width="25%" height="18px" />
              <Skeleton width="20%" height="18px" />
              <Skeleton width="20%" height="18px" />
              <Skeleton width="15%" height="18px" />
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  )
}

export default ReportesSkeleton
