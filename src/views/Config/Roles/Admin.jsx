import { Lock } from 'lucide-react'
import { PageTemplate } from '@components'

export default function ConfigRolesAdmin() {
  return (
    <PageTemplate
      icon={Lock}
      title="Roles de Administradores"
      description="Configuración de permisos para administradores"
    />
  )
}
