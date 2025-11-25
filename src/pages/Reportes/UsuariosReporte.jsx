import { PersonIcon } from '@radix-ui/react-icons'
import { PageTemplate } from '@components'

export default function ReportesUsuarios() {
  return (
    <PageTemplate
      icon={PersonIcon}
      title="Reporte de Usuarios"
      description="Estadísticas y análisis de usuarios del sistema"
      badge="Analytics"
    />
  )
}
