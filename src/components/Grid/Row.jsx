import { cn } from '../../utils/cn'

/**
 * Row component - Contenedor flex para columnas
 * Replica el comportamiento de Bootstrap/Reactstrap Row
 *
 * @param {string} [className] - Clases CSS adicionales
 * @param {React.ReactNode} children - Columnas Col
 * @param {boolean} [noGutters=false] - Sin espaciado entre columnas
 * @param {'start'|'center'|'end'|'around'|'between'|'evenly'} [justify='start'] - Justificación horizontal
 * @param {'start'|'center'|'end'|'baseline'|'stretch'} [align='start'] - Alineación vertical
 * @param {Object} props - Props adicionales
 * @returns {JSX.Element}
 *
 * @example
 * <Row>
 *   <Col md={6}>Column 1</Col>
 *   <Col md={6}>Column 2</Col>
 * </Row>
 *
 * @example
 * <Row justify="center" align="center" noGutters>
 *   <Col>Centered content</Col>
 * </Row>
 */
export default function Row({
  className,
  children,
  noGutters = false,
  justify = 'start',
  align = 'start',
  ...props
}) {
  const classes = cn(
    'flex flex-wrap',
    !noGutters && '-mx-3', // Negative margin para compensar padding de Col
    {
      // Justify content
      'justify-start': justify === 'start',
      'justify-center': justify === 'center',
      'justify-end': justify === 'end',
      'justify-around': justify === 'around',
      'justify-between': justify === 'between',
      'justify-evenly': justify === 'evenly',
      // Align items
      'items-start': align === 'start',
      'items-center': align === 'center',
      'items-end': align === 'end',
      'items-baseline': align === 'baseline',
      'items-stretch': align === 'stretch',
    },
    className
  )

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
