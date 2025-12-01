import ConfigGeneral from '@/pages/Config/General'
import ConfigUsuariosLista from '@/pages/Config/Usuarios/Lista'
import ConfigRolesAdmin from '@/pages/Config/Roles/Admin'
import ConfigRolesUsuarios from '@/pages/Config/Roles/UsuariosRoles'
import ConfigUsuariosGrupos from '@/pages/Config/Usuarios/Grupos'
import ConfigSistemaDatabase from '@/pages/Config/Sistema/Database'
import ConfigSistemaApi from '@/pages/Config/Sistema/Api'

const configRoutes = [
  {
    path: 'config/general',
    element: <ConfigGeneral />,
  },
  {
    path: 'config/usuarios/lista',
    element: <ConfigUsuariosLista />,
  },
  {
    path: 'config/roles/admin',
    element: <ConfigRolesAdmin />,
  },
  {
    path: 'config/roles/usuarios',
    element: <ConfigRolesUsuarios />,
  },
  {
    path: 'config/usuarios/grupos',
    element: <ConfigUsuariosGrupos />,
  },
  {
    path: 'config/sistema/database',
    element: <ConfigSistemaDatabase />,
  },
  {
    path: 'config/sistema/api',
    element: <ConfigSistemaApi />,
  },
]

export default configRoutes
