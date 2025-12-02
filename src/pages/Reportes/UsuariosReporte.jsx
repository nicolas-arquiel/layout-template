import { User } from 'lucide-react'
import { PageTemplate } from '@components'

export default function ReportesUsuarios() {
  return (
    <PageTemplate
      icon={User}
      title="Reporte de Usuarios"
      description="Estadísticas y análisis de usuarios del sistema"
      badge="Analytics"
    />
  )
}
