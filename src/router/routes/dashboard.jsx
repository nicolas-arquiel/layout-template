import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// Lazy load pages
const Dashboard = lazy(() => import('@/views/Dashboard'))
const DashboardCompleto = lazy(() => import('@/views/DashboardCompleto'))
const Personas = lazy(() => import('@/views/Personas'))
const InscripcionPersona = lazy(() => import('@/views/InscripcionPersona'))
const InscripcionAspirante = lazy(() => import('@/views/Inscripciones/InscripcionAspirante'))
const InscripcionCurso = lazy(() => import('@/views/Inscripciones/InscripcionCurso'))
const EjemploTablas = lazy(() => import('@/views/EjemploTablas'))
const Documentos = lazy(() => import('@/views/Documentos'))

// Skeletons
import DashboardSkeleton from '@/views/DashboardSkeleton'
import PersonasSkeleton from '@/views/Personas/PersonasSkeleton'
import InscripcionSkeleton from '@/views/Inscripciones/InscripcionSkeleton'
import DocumentosSkeleton from '@/views/DocumentosSkeleton'
import GenericSkeleton from '@/@core/components/skeletons/GenericSkeleton'

const dashboardRoutes = [
  {
    index: true,
    element: <Navigate to="/inicio" replace />,
  },
  {
    path: 'inicio',
    element: <DashboardCompleto />,
    meta: {
      publicRoute: true,
      restricted: true,
      skeleton: <DashboardSkeleton />,
    },
  },
  {
    path: 'dashboard-simple',
    element: <Dashboard />,
    meta: {
      publicRoute: true,
      restricted: true,
      skeleton: <DashboardSkeleton />,
    },
  },
  {
    path: 'personas',
    element: <Personas />,
    meta: {
      permiso: 'personas',
      skeleton: <PersonasSkeleton />,
    },
  },
  {
    path: 'inscripcion-persona',
    element: <InscripcionPersona />,
    meta: {
      permiso: 'inscripcion',
      skeleton: <InscripcionSkeleton />,
    },
  },
  {
    path: 'inscripcion-aspirante',
    element: <InscripcionAspirante />,
    meta: {
      permiso: 'inscripcion',
      skeleton: <InscripcionSkeleton />,
    },
  },
  {
    path: 'inscripcion-curso',
    element: <InscripcionCurso />,
    meta: {
      permiso: 'inscripcion',
      skeleton: <InscripcionSkeleton />,
    },
  },
  {
    path: 'ejemplo-tablas',
    element: <EjemploTablas />,
    meta: {
      publicRoute: true,
      restricted: true,
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'documentos',
    element: <Documentos />,
    meta: {
      publicRoute: true,
      restricted: true,
      skeleton: <DocumentosSkeleton />,
    },
  },
]

export default dashboardRoutes
