import React from 'react'
import { Flex, Card, Skeleton, Grid } from '@radix-ui/themes'

/**
 * Skeleton para página de documentos
 * Muestra una lista de archivos con iconos y detalles
 */
const DocumentosSkeleton = () => {
  return (
    <Flex direction="column" gap="4" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <Flex justify="between" align="center">
        <Flex direction="column" gap="2">
          <Skeleton width="200px" height="32px" />
          <Skeleton width="300px" height="20px" />
        </Flex>
        <Skeleton width="150px" height="36px" />
      </Flex>

      {/* Búsqueda y filtros */}
      <Flex gap="3">
        <Skeleton width="300px" height="40px" style={{ flex: 1 }} />
        <Skeleton width="120px" height="40px" />
        <Skeleton width="120px" height="40px" />
      </Flex>

      {/* Lista de documentos */}
      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <Flex gap="3" align="start">
              {/* Icono del archivo */}
              <Skeleton width="48px" height="48px" style={{ borderRadius: 'var(--radius-2)' }} />
              
              {/* Detalles */}
              <Flex direction="column" gap="2" style={{ flex: 1 }}>
                <Skeleton width="80%" height="20px" />
                <Skeleton width="60%" height="16px" />
                <Skeleton width="50%" height="14px" />
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>

      {/* Documentos recientes - Lista */}
      <Card>
        <Flex direction="column" gap="3">
          <Skeleton width="180px" height="24px" />
          
          {[1, 2, 3, 4].map((i) => (
            <Flex key={i} gap="3" align="center" style={{ padding: '0.75rem', borderBottom: i < 4 ? '1px solid var(--gray-3)' : 'none' }}>
              <Skeleton width="40px" height="40px" style={{ borderRadius: 'var(--radius-2)' }} />
              <Flex direction="column" gap="1" style={{ flex: 1 }}>
                <Skeleton width="70%" height="18px" />
                <Skeleton width="40%" height="14px" />
              </Flex>
              <Skeleton width="80px" height="32px" />
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  )
}

export default DocumentosSkeleton
