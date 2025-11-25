import { LockClosedIcon } from '@radix-ui/react-icons'
import { PageTemplate } from '@components'

export default function ConfigRolesUsuarios() {
  return (
    <PageTemplate
      icon={LockClosedIcon}
      title="Roles de Usuarios"
      description="Configuración de permisos para usuarios estándar"
    />
  )
}
