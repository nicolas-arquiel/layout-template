import React from 'react'
import { Flex, Card, Skeleton, Grid } from '@radix-ui/themes'

/**
 * Skeleton específico para Dashboard
 * Muestra cards de estadísticas y gráficos
 */
const DashboardSkeleton = () => {
  return (
    <Flex direction="column" gap="4" style={{ padding: '1.5rem' }}>
      {/* Header */}
      <Flex direction="column" gap="2">
        <Skeleton width="250px" height="36px" />
        <Skeleton width="350px" height="20px" />
      </Flex>

      {/* Stats Cards */}
      <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <Flex direction="column" gap="2">
              <Skeleton width="60px" height="16px" />
              <Skeleton width="100px" height="32px" />
              <Skeleton width="80px" height="14px" />
            </Flex>
          </Card>
        ))}
      </Grid>

      {/* Charts */}
      <Grid columns={{ initial: '1', md: '2' }} gap="4">
        <Card>
          <Flex direction="column" gap="3">
            <Skeleton width="150px" height="24px" />
            <Skeleton width="100%" height="250px" />
          </Flex>
        </Card>
        <Card>
          <Flex direction="column" gap="3">
            <Skeleton width="150px" height="24px" />
            <Skeleton width="100%" height="250px" />
          </Flex>
        </Card>
      </Grid>

      {/* Recent Activity */}
      <Card>
        <Flex direction="column" gap="3">
          <Skeleton width="180px" height="24px" />
          {[1, 2, 3, 4].map((i) => (
            <Flex key={i} gap="3" align="center">
              <Skeleton width="40px" height="40px" style={{ borderRadius: 'var(--radius-full)' }} />
              <Flex direction="column" gap="1" style={{ flex: 1 }}>
                <Skeleton width="60%" height="18px" />
                <Skeleton width="40%" height="14px" />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  )
}

export default DashboardSkeleton
