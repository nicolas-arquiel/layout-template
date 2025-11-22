import { Box, Text } from '@radix-ui/themes'

/**
 * Componente para headers de sección en la navegación con Radix UI
 * Muestra un título no interactivo que divide secciones del menú
 *
 * @param {Object} props
 * @param {string} props.title - Texto del header
 * @returns {JSX.Element}
 */
export default function NavigationHeader({ title }) {
  return (
    <Box asChild>
      <li>
        <Text
          size="1"
          weight="bold"
          style={{
            display: 'block',
            paddingLeft: 'var(--space-6)',
            paddingRight: 'var(--space-6)',
            paddingTop: 'var(--space-3)',
            paddingBottom: 'var(--space-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--gray-9)',
          }}
        >
          {title}
        </Text>
      </li>
    </Box>
  )
}
