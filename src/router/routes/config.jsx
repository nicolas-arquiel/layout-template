import { lazy } from 'react'

// Lazy load pages
const ConfigGeneral = lazy(() => import('@/views/Config/General'))
const ConfigUsuariosLista = lazy(() => import('@/views/Config/Usuarios/Lista'))
const ConfigRolesAdmin = lazy(() => import('@/views/Config/Roles/Admin'))
const ConfigRolesUsuarios = lazy(() => import('@/views/Config/Roles/UsuariosRoles'))
const ConfigUsuariosGrupos = lazy(() => import('@/views/Config/Usuarios/Grupos'))
const ConfigSistemaDatabase = lazy(() => import('@/views/Config/Sistema/Database'))
const ConfigSistemaApi = lazy(() => import('@/views/Config/Sistema/Api'))

// Skeleton
import GenericSkeleton from '@/@core/components/skeletons/GenericSkeleton'

const configRoutes = [
  {
    path: 'config/general',
    element: <ConfigGeneral />,
    meta: {
      permiso: 'configuracion',
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'config/usuarios/lista',
    element: <ConfigUsuariosLista />,
    meta: {
      permiso: 'configuracion:usuarios',
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'config/roles/admin',
    element: <ConfigRolesAdmin />,
    meta: {
      permiso: 'configuracion:roles',
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'config/roles/usuarios',
    element: <ConfigRolesUsuarios />,
    meta: {
      permiso: 'configuracion:roles',
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'config/usuarios/grupos',
    element: <ConfigUsuariosGrupos />,
    meta: {
      permiso: 'configuracion:usuarios',
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'config/sistema/database',
    element: <ConfigSistemaDatabase />,
    meta: {
      permiso: 'configuracion:sistema',
      skeleton: <GenericSkeleton />,
    },
  },
  {
    path: 'config/sistema/api',
    element: <ConfigSistemaApi />,
    meta: {
      permiso: 'configuracion:sistema',
      skeleton: <GenericSkeleton />,
    },
  },
]

export default configRoutes
