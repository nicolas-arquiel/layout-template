import { FileTextIcon } from '@radix-ui/react-icons'
import PageTemplate from '../components/PageTemplate'

export default function Documentos() {
  return (
    <PageTemplate
      icon={FileTextIcon}
      title="Documentos"
      description="Gestión de documentos y archivos del sistema"
    />
  )
}
