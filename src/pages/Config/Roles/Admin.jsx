import { LockClosedIcon } from '@radix-ui/react-icons'
import PageTemplate from '../../../components/PageTemplate'

export default function ConfigRolesAdmin() {
  return (
    <PageTemplate
      icon={LockClosedIcon}
      title="Roles de Administradores"
      description="Configuración de permisos para administradores"
    />
  )
}
