import { Navigate } from 'react-router-dom'
import Login from '@/pages/Login'

const authRoutes = [
  {
    index: true,
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]

export default authRoutes
