import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import Dashboard from '../pages/Dashboard'
import DashboardCompleto from '../pages/DashboardCompleto'
import Login from '../pages/Login'
import Personas from '../pages/Personas'
import InscripcionPersona from '../pages/InscripcionPersona'
import InscripcionAspirante from '../pages/Inscripciones/InscripcionAspirante'
import InscripcionCurso from '../pages/Inscripciones/InscripcionCurso'

// Reportes
import ReportesVentas from '../pages/Reportes/Ventas'
import ReportesUsuarios from '../pages/Reportes/UsuariosReporte'
import ReportesInventario from '../pages/Reportes/Inventario'

// Documentos
import Documentos from '../pages/Documentos'

// Configuración
import ConfigGeneral from '../pages/Config/General'
import ConfigUsuariosLista from '../pages/Config/Usuarios/Lista'
import ConfigRolesAdmin from '../pages/Config/Roles/Admin'
import ConfigRolesUsuarios from '../pages/Config/Roles/UsuariosRoles'
import ConfigUsuariosGrupos from '../pages/Config/Usuarios/Grupos'
import ConfigSistemaDatabase from '../pages/Config/Sistema/Database'
import ConfigSistemaApi from '../pages/Config/Sistema/Api'

// Recursos
import RecursosArchivos from '../pages/Recursos/Archivos'
import RecursosPlantillas from '../pages/Recursos/Plantillas'

/**
 * Configuración de rutas de la aplicación
 * Utiliza React Router v6 con createBrowserRouter
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
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
      // Reportes
      {
        path: 'reportes/ventas',
        element: <ReportesVentas />,
      },
      {
        path: 'reportes/usuarios',
        element: <ReportesUsuarios />,
      },
      {
        path: 'reportes/inventario',
        element: <ReportesInventario />,
      },
      // Documentos
      {
        path: 'documentos',
        element: <Documentos />,
      },
      // Configuración
      {
        path: 'config/general',
        element: <ConfigGeneral />,
      },
      {
        path: 'config/usuarios/lista',
        element: <ConfigUsuariosLista />,
      },
      {
        path: 'config/roles/admin',
        element: <ConfigRolesAdmin />,
      },
      {
        path: 'config/roles/usuarios',
        element: <ConfigRolesUsuarios />,
      },
      {
        path: 'config/usuarios/grupos',
        element: <ConfigUsuariosGrupos />,
      },
      {
        path: 'config/sistema/database',
        element: <ConfigSistemaDatabase />,
      },
      {
        path: 'config/sistema/api',
        element: <ConfigSistemaApi />,
      },
      // Recursos
      {
        path: 'recursos/archivos',
        element: <RecursosArchivos />,
      },
      {
        path: 'recursos/plantillas',
        element: <RecursosPlantillas />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/inicio" replace />,
  },
])

export default router
