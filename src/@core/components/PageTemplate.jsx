import { Card, Flex, Heading, Text, Grid, Box, Badge } from '@radix-ui/themes'

/**
 * PageTemplate - Template reutilizable para páginas de ejemplo
 * NO usar Container de Radix, el MainLayout ya maneja el ancho
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icono de lucide-react
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción
 * @param {React.ReactNode} [props.children] - Contenido adicional
 * @param {string} [props.badge] - Badge opcional (ej: "En desarrollo")
 * @returns {JSX.Element}
 */
export default function PageTemplate({ icon: Icon, title, description, children, badge }) {
  return (
    <>
      {/* Header Card */}
      <Card mb="6">
        <Flex align="center" justify="between">
          <Flex align="center" gap="3">
            {Icon && <Icon size={32} color="var(--accent-9)" />}
            <Box>
              <Flex align="center" gap="3" mb="2">
                <Heading size="6" weight="medium">
                  {title}
                </Heading>
                {badge && (
                  <Badge color="blue" variant="soft">
                    {badge}
                  </Badge>
                )}
              </Flex>
              <Text size="3" color="gray">
                {description}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Card>

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
