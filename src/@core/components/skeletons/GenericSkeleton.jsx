import React from 'react'
import { Flex, Card, Skeleton } from '@radix-ui/themes'

/**
 * Skeleton genérico para páginas sin skeleton específico
 * Muestra un layout básico con cards y líneas
 */
const GenericSkeleton = () => {
  return (
    <Flex direction="column" gap="4" style={{ padding: '1.5rem' }}>
      {/* Header skeleton */}
      <Flex direction="column" gap="2">
        <Skeleton width="200px" height="32px" />
        <Skeleton width="300px" height="20px" />
      </Flex>

      {/* Content skeleton */}
      <Card>
        <Flex direction="column" gap="3">
          <Skeleton width="100%" height="24px" />
          <Skeleton width="90%" height="20px" />
          <Skeleton width="95%" height="20px" />
          <Skeleton width="85%" height="20px" />
        </Flex>
      </Card>

      <Card>
        <Flex direction="column" gap="3">
          <Skeleton width="100%" height="24px" />
          <Skeleton width="80%" height="20px" />
          <Skeleton width="90%" height="20px" />
        </Flex>
      </Card>
    </Flex>
  )
}

export default GenericSkeleton
