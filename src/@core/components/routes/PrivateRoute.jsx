import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/authSlice'
import { usePermisos } from '@/utils/hooks/usePermisos'
import NotAuthorized from '@/pages/misc/NotAuthorized'

/**
 * Componente para proteger rutas privadas
 * 
 * Verifica:
 * - Si el usuario está autenticado
 * - Si tiene los permisos requeridos (si se especifican en route.meta.permiso)
 * - Permite bypass para super admin
 * 
 * @param {React.ReactNode} children - Componente de la ruta
 * @param {Object} route - Objeto de configuración de la ruta
 * @param {Object} route.meta - Metadata de la ruta
 * @param {string} route.meta.permiso - Permiso requerido para acceder
 * @param {React.ReactNode} route.meta.skeleton - Skeleton específico para esta ruta
 */
const PrivateRoute = ({ children, route }) => {
  const user = useSelector(selectCurrentUser)
  const { tienePermiso } = usePermisos()

  // TODO: Implementar validación de token cuando exista conexión a API
  // useEffect(() => {
  //   const validateUserToken = async () => {
  //     if (user) {
  //       try {
  //         const token = localStorage.getItem('access_token')
  //         const result = await validateToken(token).unwrap()
  //         if (!result.isValid) {
  //           localStorage.clear()
  //           return navigate('/auth/not-auth')
  //         }
  //         dispatch(refreshUserData({ currentData: result.currentData }))
  //       } catch (error) {
  //         console.error('[PrivateRoute] Error validando token:', error)
  //         localStorage.clear()
  //       }
  //     }
  //   }
  //   validateUserToken()
  // }, [])

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  // Verificaciones de ruta
  if (route?.meta) {
    const { permiso } = route.meta

    // Si es super admin, permitir acceso sin verificar permisos
    if (user?.isSuperAdmin) {
      console.log('[PrivateRoute] Usuario es admin - acceso permitido')
      const skeleton = route.meta.skeleton || null
      return <Suspense fallback={skeleton}>{children}</Suspense>
    }

    // Verificar permisos si la ruta los requiere
    if (permiso) {
      const esRuta = true
      const tieneAcceso = tienePermiso(permiso, esRuta)
      console.log('[PrivateRoute] Verificando permiso:', { permiso, tieneAcceso })

      if (!tieneAcceso) {
        return <NotAuthorized permiso={permiso} />
      }
    }
  }

  const skeleton = route?.meta?.skeleton || null
  return <Suspense fallback={skeleton}>{children}</Suspense>
}

export default PrivateRoute
