import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/authSlice'
import { usePermisos } from '@/utils/hooks/usePermisos'
import NotAuthorized from '@/pages/misc/NotAuthorized'

/**
 * Componente para rutas públicas
 * 
 * Soporta dos tipos de rutas públicas:
 * - Públicas totales: Accesibles sin autenticación (ej: login, registro)
 * - Públicas restringidas: Requieren autenticación pero no permisos específicos (ej: perfil)
 * 
 * @param {React.ReactNode} children - Componente de la ruta
 * @param {Object} route - Objeto de configuración de la ruta
 * @param {Object} route.meta - Metadata de la ruta
 * @param {boolean} route.meta.restricted - Si true, requiere autenticación
 * @param {string} route.meta.permiso - Permiso opcional requerido
 * @param {React.ReactNode} route.meta.skeleton - Skeleton específico para esta ruta
 */
const PublicRoute = ({ children, route }) => {
  const user = useSelector(selectCurrentUser)
  const { tienePermiso } = usePermisos()

  // TODO: Implementar validación de token cuando exista conexión a API
  // useEffect(() => {
  //   const validateUserToken = async () => {
  //     if (user && route?.meta?.restricted) {
  //       try {
  //         const token = localStorage.getItem('access_token')
  //         const result = await validateToken(token).unwrap()
  //         if (!result.isValid) {
  //           localStorage.clear()
  //           return navigate('/auth/not-auth')
  //         }
  //         dispatch(refreshUserData({ currentData: result.currentData }))
  //       } catch (error) {
  //         console.error('[PublicRoute] Error validando token:', error)
  //         localStorage.clear()
  //       }
  //     }
  //   }
  //   validateUserToken()
  // }, [])

  // Verificaciones de ruta
  if (route?.meta) {
    const { restricted, permiso } = route.meta

    // Ruta restringida sin usuario
    if (!user && restricted) {
      return <Navigate to="/auth/login" replace />
    }

    // Si es super admin, permitir acceso sin verificar permisos
    if (user?.isSuperAdmin) {
      console.log('[PublicRoute] Usuario es admin - acceso permitido')
      const skeleton = route.meta.skeleton || null
      return <Suspense fallback={skeleton}>{children}</Suspense>
    }

    // Verificar permisos si la ruta los requiere
    if (permiso && user) {
      const esRuta = true
      const tieneAcceso = tienePermiso(permiso, esRuta)
      console.log('[PublicRoute] Verificando permiso:', { permiso, tieneAcceso })

      if (!tieneAcceso) {
        return <NotAuthorized permiso={permiso} />
      }
    }
  }

  const skeleton = route?.meta?.skeleton || null
  return <Suspense fallback={skeleton}>{children}</Suspense>
}

export default PublicRoute
