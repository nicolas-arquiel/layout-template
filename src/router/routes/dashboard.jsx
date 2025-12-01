import { Navigate } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import DashboardCompleto from '@/pages/DashboardCompleto'
import Personas from '@/pages/Personas'
import InscripcionPersona from '@/pages/InscripcionPersona'
import InscripcionAspirante from '@/pages/Inscripciones/InscripcionAspirante'
import InscripcionCurso from '@/pages/Inscripciones/InscripcionCurso'
import EjemploTablas from '@/pages/EjemploTablas'
import Documentos from '@/pages/Documentos'

const dashboardRoutes = [
  {
    index: true,
    element: <Navigate to="/inicio" replace />,
  },
  {
    path: 'inicio',
    element: <DashboardCompleto />,
  },
  {
    path: 'dashboard-simple',
    element: <Dashboard />,
  },
  {
    path: 'personas',
    element: <Personas />,
  },
  {
    path: 'inscripcion-persona',
    element: <InscripcionPersona />,
  },
  {
    path: 'inscripcion-aspirante',
    element: <InscripcionAspirante />,
  },
  {
    path: 'inscripcion-curso',
    element: <InscripcionCurso />,
  },
  {
    path: 'ejemplo-tablas',
    element: <EjemploTablas />,
  },
  {
    path: 'documentos',
    element: <Documentos />,
  },
]

export default dashboardRoutes
