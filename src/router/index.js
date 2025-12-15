import { createElement } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/@core/layouts/MainLayout'
import AuthLayout from '@/@core/layouts/AuthLayout'

// Route Guards
import PrivateRoute from '@/@core/components/routes/PrivateRoute'
import PublicRoute from '@/@core/components/routes/PublicRoute'

// Módulos de Rutas
import dashboardRoutes from './routes/dashboard'
import reportRoutes from './routes/reports'
import configRoutes from './routes/config'
import resourceRoutes from './routes/resources'
import componentRoutes from './routes/components'
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
    element: createElement(RouteGuard, { route }, route.element),
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
    element: createElement(MainLayout),
    errorElement: createElement(Error),
    children: [
      ...dashboardRoutes.map(wrapRouteWithGuard),
      ...reportRoutes.map(wrapRouteWithGuard),
      ...configRoutes.map(wrapRouteWithGuard),
      ...resourceRoutes.map(wrapRouteWithGuard),
      ...componentRoutes.map(wrapRouteWithGuard),
    ],
  },
  {
    element: createElement(AuthLayout),
    children: [
      ...authRoutes.map(wrapRouteWithGuard),
      {
        path: '/not-authorized',
        element: createElement(NotAuthorized),
      },
      {
        path: '/error',
        element: createElement(Error),
      },
      {
        path: '/maintenance',
        element: createElement(Maintenance),
      },
      {
        path: '/coming-soon',
        element: createElement(ComingSoon),
      },
      {
        path: '*',
        element: createElement(Error),
      },
    ],
  },
])

export default router
