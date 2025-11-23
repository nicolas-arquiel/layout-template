import { Settings } from 'react-feather'
import PageTemplate from '../../components/PageTemplate'

export default function ConfigGeneral() {
  return (
    <PageTemplate
      icon={Settings}
      title="Configuración General"
      description="Parámetros generales del sistema"
    />
  )
}
