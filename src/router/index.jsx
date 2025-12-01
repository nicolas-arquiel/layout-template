import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'

// Módulos de Rutas
import dashboardRoutes from './routes/dashboard'
import reportRoutes from './routes/reports'
import configRoutes from './routes/config'
import resourceRoutes from './routes/resources'
import authRoutes from './routes/auth'

/**
 * Configuración de rutas de la aplicación
 * Utiliza React Router v6 con createBrowserRouter
 * 
 * Las rutas están modularizadas en src/router/routes/
 * para mejorar la escalabilidad y mantenibilidad.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...dashboardRoutes,
      ...reportRoutes,
      ...configRoutes,
      ...resourceRoutes,
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    path: '*',
    element: <Navigate to="/inicio" replace />,
  },
])

export default router
