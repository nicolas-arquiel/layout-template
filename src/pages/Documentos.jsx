import { FileText } from 'react-feather'
import PageTemplate from '../components/PageTemplate'

export default function Documentos() {
  return (
    <PageTemplate
      icon={FileText}
      title="Documentos"
      description="Gestión de documentos y archivos del sistema"
    />
  )
}
