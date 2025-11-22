import { Card, Box } from '@radix-ui/themes'
import { cn } from '../../lib/utils'

/**
 * NavbarCard - Contenedor estilizado para el navbar
 * Componente reutilizable con estilos de Tailwind
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del navbar
 * @param {string} [props.className] - Clases adicionales de Tailwind
 * @returns {JSX.Element}
 */
export default function NavbarCard({ children, className, ...props }) {
  return (
    <Card
      className={cn(
        'mt-6 mx-6 shadow-sm border-0 rounded-lg',
        className
      )}
      {...props}
    >
      <Box p="4">
        {children}
      </Box>
    </Card>
  )
}
