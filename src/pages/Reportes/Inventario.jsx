import { CubeIcon } from '@radix-ui/react-icons'
import PageTemplate from '../../components/PageTemplate'

export default function ReportesInventario() {
  return (
    <PageTemplate
      icon={CubeIcon}
      title="Reporte de Inventario"
      description="Control de stock y movimientos de inventario"
      badge="Almacén"
    />
  )
}
