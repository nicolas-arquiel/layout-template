import { Text, Grid, Card, Heading } from '@radix-ui/themes'
import { BreadCrumbs } from '@components'

/**
 * PageTemplate - Template reutilizable para páginas de ejemplo
 * NO usar Container de Radix, el MainLayout ya maneja el ancho
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icono de lucide-react (Deprecated in new design)
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción (Optional, rendered below breadcrumbs if needed)
 * @param {React.ReactNode} [props.children] - Contenido adicional
 * @param {string} [props.badge] - Badge opcional (ej: "En desarrollo")
 * @returns {JSX.Element}
 */
export default function PageTemplate({ icon: Icon, title, description, children, badge }) {
  return (
    <>
      <BreadCrumbs 
        title={title} 
        data={[{ title: 'Inicio', link: '/inicio' }, { title: title }]} 
      />
      
      {/* Optional: Show description if provided, maybe in a Callout or just Text */}
      {description && (
        <Text size="2" color="gray" mb="4" style={{ display: 'block' }}>
          {description}
        </Text>
      )}

      {/* Content */}
      {children || (
        <Grid columns={{ initial: '1', md: '2' }} gap="4">
          <Card>
            <Heading size="4" mb="3">
              Información
            </Heading>
            <Text size="2" color="gray">
              Esta es una página de ejemplo. Aquí puedes agregar el contenido específico de esta
              sección.
            </Text>
          </Card>

          <Card>
            <Heading size="4" mb="3">
              Funcionalidades
            </Heading>
            <Text size="2" color="gray">
              Esta sección está lista para ser personalizada con las funcionalidades específicas
              que necesites.
            </Text>
          </Card>
        </Grid>
      )}
    </>
  )
}
