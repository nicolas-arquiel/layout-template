import { Shield } from 'react-feather'
import PageTemplate from '../../../components/PageTemplate'

export default function ConfigRolesAdmin() {
  return (
    <PageTemplate
      icon={Shield}
      title="Roles de Administradores"
      description="Configuración de permisos para administradores"
    />
  )
}
