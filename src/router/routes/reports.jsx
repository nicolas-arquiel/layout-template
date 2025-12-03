import { lazy } from 'react'

// Lazy load pages
const ReportesVentas = lazy(() => import('@/views/Reportes/Ventas'))
const ReportesUsuarios = lazy(() => import('@/views/Reportes/UsuariosReporte'))
const ReportesInventario = lazy(() => import('@/views/Reportes/Inventario'))

// Skeleton
import ReportesSkeleton from '@/views/Reportes/ReportesSkeleton'

const reportRoutes = [
  {
    path: 'reportes/ventas',
    element: <ReportesVentas />,
    meta: {
      permiso: 'reportes',
      skeleton: <ReportesSkeleton />,
    },
  },
  {
    path: 'reportes/usuarios',
    element: <ReportesUsuarios />,
    meta: {
      permiso: 'reportes',
      skeleton: <ReportesSkeleton />,
    },
  },
  {
    path: 'reportes/inventario',
    element: <ReportesInventario />,
    meta: {
      permiso: 'reportes',
      skeleton: <ReportesSkeleton />,
    },
  },
]

export default reportRoutes
