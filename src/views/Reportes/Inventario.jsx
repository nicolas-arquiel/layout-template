import { Box } from 'lucide-react'
import { PageTemplate } from '@components'

export default function ReportesInventario() {
  return (
    <PageTemplate
      icon={Box}
      title="Reporte de Inventario"
      description="Control de stock y movimientos de inventario"
      badge="Almacén"
    />
  )
}
