import { Package } from 'react-feather'
import PageTemplate from '../../components/PageTemplate'

export default function ReportesInventario() {
  return (
    <PageTemplate
      icon={Package}
      title="Reporte de Inventario"
      description="Control de stock y movimientos de inventario"
      badge="Almacén"
    />
  )
}
