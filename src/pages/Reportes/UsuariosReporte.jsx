import { Users } from 'react-feather'
import PageTemplate from '../../components/PageTemplate'

export default function ReportesUsuarios() {
  return (
    <PageTemplate
      icon={Users}
      title="Reporte de Usuarios"
      description="Estadísticas y análisis de usuarios del sistema"
      badge="Analytics"
    />
  )
}
