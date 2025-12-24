import { lazy } from 'react'

// Lazy load pages
const FullScreenModalExamples = lazy(() => import('@/views/FullScreenModalExamples'))
const CountdownTest = lazy(() => import('@/views/CountdownTest'))
const AnalyticalCubeDemo = lazy(() => import('@/views/AnalyticalCubeDemo'))

// Skeleton
import GenericSkeleton from '@/@core/components/skeletons/GenericSkeleton'

const componentRoutes = [
  {
    path: 'componentes/fullscreen-modal',
    element: <FullScreenModalExamples />,
    meta: {
      publicRoute: true,
      restricted: true,
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'componentes/analytical-cube',
    element: <AnalyticalCubeDemo />,
    meta: {
      publicRoute: true,
      restricted: true,
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'componentes/countdown-test',
    element: <CountdownTest />,
    meta: {
      publicRoute: true,
      restricted: true,
      skeleton: <GenericSkeleton />,
    },
  },
]

export default componentRoutes
