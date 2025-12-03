import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'

// Route Guards
import PrivateRoute from '@/@core/components/routes/PrivateRoute'
import PublicRoute from '@/@core/components/routes/PublicRoute'

// Módulos de Rutas
import dashboardRoutes from './routes/dashboard'
import reportRoutes from './routes/reports'
import configRoutes from './routes/config'
import resourceRoutes from './routes/resources'
import authRoutes from './routes/auth'

// Misc Pages
import NotAuthorized from '@/pages/misc/NotAuthorized'
import Error from '@/pages/misc/Error'
import Maintenance from '@/pages/misc/Maintenance'
import ComingSoon from '@/pages/misc/ComingSoon'

/**
 * Función helper para envolver rutas con PrivateRoute o PublicRoute
 * según la metadata de cada ruta
 */
const wrapRouteWithGuard = (route) => {
  // Si la ruta no tiene element, no necesita wrapper (ej: Navigate)
  if (!route.element) {
    return route
  }

  const isPublic = route.meta?.publicRoute
  const RouteGuard = isPublic ? PublicRoute : PrivateRoute

  return {
    ...route,
    element: <RouteGuard route={route}>{route.element}</RouteGuard>,
  }
}

/**
 * Configuración de rutas de la aplicación
 * Utiliza React Router v6 con createBrowserRouter
 * 
 * Las rutas están modularizadas en src/router/routes/
 * para mejorar la escalabilidad y mantenibilidad.
 * 
 * Todas las rutas privadas (sin meta.publicRoute) requieren autenticación.
 * Las rutas con meta.permiso requieren permisos específicos.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      ...dashboardRoutes.map(wrapRouteWithGuard),
      ...reportRoutes.map(wrapRouteWithGuard),
      ...configRoutes.map(wrapRouteWithGuard),
      ...resourceRoutes.map(wrapRouteWithGuard),
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoutes.map(wrapRouteWithGuard),
  },
  // Misc Pages
  {
    path: '/not-authorized',
    element: <NotAuthorized />,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '/maintenance',
    element: <Maintenance />,
  },
  {
    path: '/coming-soon',
    element: <ComingSoon />,
  },
  {
    path: '*',
    element: <Navigate to="/inicio" replace />,
  },
])

export default router
