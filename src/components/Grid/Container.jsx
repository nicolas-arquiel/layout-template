import { cn } from '../../utils/cn'

/**
 * Container component - Contenedor con max-width responsive
 * Replica el comportamiento de Bootstrap/Reactstrap Container
 *
 * @param {'sm'|'md'|'lg'|'xl'|'xxl'|'fluid'} size - Tamaño máximo del container
 * @param {string} [className] - Clases CSS adicionales
 * @param {React.ReactNode} children - Contenido del container
 * @param {Object} props - Props adicionales
 * @returns {JSX.Element}
 *
 * @example
 * <Container size="xl">
 *   <Row>
 *     <Col md={6}>Content</Col>
 *   </Row>
 * </Container>
 */
export default function Container({ size = 'xl', className, children, ...props }) {
  const classes = cn(
    'mx-auto px-4 w-full',
    {
      'max-w-screen-sm': size === 'sm', // 640px
      'max-w-screen-md': size === 'md', // 768px
      'max-w-screen-lg': size === 'lg', // 1024px
      'max-w-screen-xl': size === 'xl', // 1280px
      'max-w-screen-2xl': size === 'xxl', // 1536px
      'max-w-full': size === 'fluid',
    },
    className
  )

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
