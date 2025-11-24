import { GearIcon } from '@radix-ui/react-icons'
import PageTemplate from '../../components/PageTemplate'

export default function ConfigGeneral() {
  return (
    <PageTemplate
      icon={GearIcon}
      title="Configuración General"
      description="Parámetros generales del sistema"
    />
  )
}
