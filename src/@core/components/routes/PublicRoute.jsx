import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/auth/authSlice'
import { usePermisos } from '@hooks/usePermisos'
import NotAuthorized from '@/pages/misc/NotAuthorized'

/**
 * Componente para rutas públicas
 *
 * Soporta dos tipos de rutas públicas:
 * - Públicas totales: Accesibles sin autenticación (ej: login, registro)
 *   → Si el usuario ya está autenticado, lo redirige a /inicio
 * - Públicas restringidas: Requieren autenticación pero no permisos específicos (ej: perfil)
 *   → Si el usuario no está autenticado, lo redirige a /auth/login
 *
 * Flujo de decisión:
 * 1. Usuario autenticado + ruta NO restringida (login) → Redirigir a /inicio
 * 2. Usuario NO autenticado + ruta restringida → Redirigir a /auth/login
 * 3. Usuario admin → Acceso permitido sin verificar permisos
 * 4. Ruta con permiso requerido → Verificar permiso del usuario
 * 5. Caso default → Renderizar children
 *
 * @param {React.ReactNode} children - Componente de la ruta
 * @param {Object} route - Objeto de configuración de la ruta
 * @param {Object} route.meta - Metadata de la ruta
 * @param {boolean} route.meta.publicRoute - Indica que es ruta pública
 * @param {boolean} route.meta.restricted - Si true, requiere autenticación (ruta pública restringida)
 * @param {string} route.meta.permiso - Permiso opcional requerido para acceder
 * @param {React.ReactNode} route.meta.skeleton - Skeleton específico para esta ruta durante lazy loading
 *
 * @example
 * // Ruta pública total (login) - usuarios autenticados son redirigidos
 * { path: 'login', element: <Login />, meta: { publicRoute: true } }
 *
 * @example
 * // Ruta pública restringida (perfil) - requiere autenticación
 * { path: 'profile', element: <Profile />, meta: { publicRoute: true, restricted: true } }
 */
const PublicRoute = ({ children, route }) => {
  const user = useSelector(selectCurrentUser)
  const { tienePermiso } = usePermisos()

  // Extraer metadata de la ruta
  const isRestricted = route?.meta?.restricted ?? false
  const permiso = route?.meta?.permiso
  const skeleton = route?.meta?.skeleton ?? null

  // ─────────────────────────────────────────────────────────────────────────────
  // CASO 1: Usuario autenticado en ruta pública NO restringida (ej: login)
  // → No tiene sentido mostrar login si ya está logueado, redirigir a inicio
  // ─────────────────────────────────────────────────────────────────────────────
  if (user && !isRestricted) {
    console.log('[PublicRoute] Usuario autenticado en ruta pública → redirigiendo a /inicio')
    return <Navigate to="/inicio" replace />
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CASO 2: Usuario NO autenticado en ruta restringida
  // → Necesita autenticación, redirigir a login
  // ─────────────────────────────────────────────────────────────────────────────
  if (!user && isRestricted) {
    console.log('[PublicRoute] Ruta restringida sin usuario → redirigiendo a /login')
    return <Navigate to="/login" replace />
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CASO 3: Usuario es super admin en ruta restringida
  // → Acceso total sin verificar permisos específicos
  // ─────────────────────────────────────────────────────────────────────────────
  if (user?.isSuperAdmin) {
    console.log('[PublicRoute] Usuario es admin → acceso permitido')
    return <Suspense fallback={skeleton}>{children}</Suspense>
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CASO 4: Ruta requiere permiso específico
  // → Verificar si el usuario tiene el permiso necesario
  // ─────────────────────────────────────────────────────────────────────────────
  if (permiso && user) {
    const esRuta = true
    const tieneAcceso = tienePermiso(permiso, esRuta)
    console.log('[PublicRoute] Verificando permiso:', { permiso, tieneAcceso })

    if (!tieneAcceso) {
      return <NotAuthorized permiso={permiso} />
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CASO 5: Default - Renderizar el componente hijo
  // → Ruta pública sin restricciones para usuario no autenticado
  // ─────────────────────────────────────────────────────────────────────────────
  return <Suspense fallback={skeleton}>{children}</Suspense>
}

export default PublicRoute