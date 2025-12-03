import { Lock } from 'lucide-react'
import { PageTemplate } from '@components'

export default function ConfigRolesUsuarios() {
  return (
    <PageTemplate
      icon={Lock}
      title="Roles de Usuarios"
      description="Configuración de permisos para usuarios estándar"
    />
  )
}
