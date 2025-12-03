import React from 'react'
import { Flex, Card, Skeleton } from '@radix-ui/themes'

/**
 * Skeleton para lista de personas
 * Muestra una tabla con filas de datos
 */
const PersonasSkeleton = () => {
  return (
    <Flex direction="column" gap="4" style={{ padding: '1.5rem' }}>
      {/* Header con título y botón */}
      <Flex justify="between" align="center">
        <Flex direction="column" gap="2">
          <Skeleton width="200px" height="32px" />
          <Skeleton width="300px" height="20px" />
        </Flex>
        <Skeleton width="150px" height="36px" />
      </Flex>

      {/* Filtros */}
      <Card>
        <Flex gap="3" wrap="wrap">
          <Skeleton width="200px" height="36px" />
          <Skeleton width="150px" height="36px" />
          <Skeleton width="150px" height="36px" />
        </Flex>
      </Card>

      {/* Tabla */}
      <Card>
        <Flex direction="column" gap="2">
          {/* Table Header */}
          <Flex gap="3" style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-5)' }}>
            <Skeleton width="30%" height="20px" />
            <Skeleton width="25%" height="20px" />
            <Skeleton width="20%" height="20px" />
            <Skeleton width="15%" height="20px" />
            <Skeleton width="10%" height="20px" />
          </Flex>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Flex key={i} gap="3" align="center" style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-3)' }}>
              <Skeleton width="30%" height="18px" />
              <Skeleton width="25%" height="18px" />
              <Skeleton width="20%" height="18px" />
              <Skeleton width="15%" height="18px" />
              <Skeleton width="10%" height="18px" />
            </Flex>
          ))}
        </Flex>
      </Card>

      {/* Pagination */}
      <Flex justify="between" align="center">
        <Skeleton width="150px" height="20px" />
        <Flex gap="2">
          <Skeleton width="36px" height="36px" />
          <Skeleton width="36px" height="36px" />
          <Skeleton width="36px" height="36px" />
          <Skeleton width="36px" height="36px" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PersonasSkeleton
