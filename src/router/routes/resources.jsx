import { lazy } from 'react'

// Lazy load pages
const RecursosArchivos = lazy(() => import('@/views/Recursos/Archivos'))
const RecursosPlantillas = lazy(() => import('@/views/Recursos/Plantillas'))

// Skeleton
import GenericSkeleton from '@/@core/components/skeletons/GenericSkeleton'

const resourceRoutes = [
  {
    path: 'recursos/archivos',
    element: <RecursosArchivos />,
    meta: {
      permiso: 'recursos',
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'recursos/plantillas',
    element: <RecursosPlantillas />,
    meta: {
      permiso: 'recursos',
      skeleton: <GenericSkeleton />,
    },
  },
]

export default resourceRoutes
