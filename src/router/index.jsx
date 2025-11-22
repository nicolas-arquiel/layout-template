import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Personas from '../pages/Personas'
import InscripcionAspirante from '../pages/Inscripciones/InscripcionAspirante'
import InscripcionCurso from '../pages/Inscripciones/InscripcionCurso'

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
        element: <Dashboard />,
      },
      {
        path: 'personas',
        element: <Personas />,
      },
      {
        path: 'inscripcion-aspirante',
        element: <InscripcionAspirante />,
      },
      {
        path: 'inscripcion-curso',
        element: <InscripcionCurso />,
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
