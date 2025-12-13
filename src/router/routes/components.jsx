import { lazy } from 'react'

// Lazy load pages
const FullScreenModalExamples = lazy(() => import('@/views/FullScreenModalExamples'))

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
]

export default componentRoutes
