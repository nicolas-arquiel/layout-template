import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// Lazy load pages
const Login = lazy(() => import('@/pages/authentication/Login'))
const Auth = lazy(() => import('@/pages/misc/Auth'))

const authRoutes = [
  {
    path: 'login',
    element: <Login />,
    meta: {
      publicRoute: true,
    },
  },
  {
    path: 'auth',
    element: <Auth />,
    meta: {
      publicRoute: true,
      restricted: true, // Requiere estar logueado
    },
  },
]

export default authRoutes
