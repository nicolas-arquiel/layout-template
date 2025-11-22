import { cn } from '../../utils/cn'

/**
 * Genera clases de ancho para un breakpoint específico
 * @param {number|'auto'|boolean} value - Valor del ancho (1-12 o 'auto')
 * @param {string} prefix - Prefijo del breakpoint ('', 'sm:', 'md:', etc.)
 * @returns {string|null}
 */
function getWidthClass(value, prefix = '') {
  if (!value) return null
  if (value === 'auto') return `${prefix}flex-auto`
  if (value === true) return `${prefix}flex-1` // Sin especificar número, distribución equitativa

  // Mapeo de números 1-12 a clases de Tailwind
  const widthMap = {
    1: `${prefix}w-1/12`,
    2: `${prefix}w-2/12`,
    3: `${prefix}w-3/12`,
    4: `${prefix}w-4/12`,
    5: `${prefix}w-5/12`,
    6: `${prefix}w-6/12`,
    7: `${prefix}w-7/12`,
    8: `${prefix}w-8/12`,
    9: `${prefix}w-9/12`,
    10: `${prefix}w-10/12`,
    11: `${prefix}w-11/12`,
    12: `${prefix}w-full`,
  }

  return widthMap[value] || null
}

/**
 * Genera clases de offset para un breakpoint específico
 * @param {number} value - Valor del offset (1-11)
 * @param {string} prefix - Prefijo del breakpoint ('', 'sm:', 'md:', etc.)
 * @returns {string|null}
 */
function getOffsetClass(value, prefix = '') {
  if (!value) return null

  const offsetMap = {
    1: `${prefix}ml-[8.333333%]`,
    2: `${prefix}ml-[16.666667%]`,
    3: `${prefix}ml-[25%]`,
    4: `${prefix}ml-[33.333333%]`,
    5: `${prefix}ml-[41.666667%]`,
    6: `${prefix}ml-[50%]`,
    7: `${prefix}ml-[58.333333%]`,
    8: `${prefix}ml-[66.666667%]`,
    9: `${prefix}ml-[75%]`,
    10: `${prefix}ml-[83.333333%]`,
    11: `${prefix}ml-[91.666667%]`,
  }

  return offsetMap[value] || null
}

/**
 * Col component - Columna responsive con sistema de 12 columnas
 * Replica el comportamiento de Bootstrap/Reactstrap Col
 *
 * Breakpoints (como Bootstrap):
 * - xs: 0px+ (sin prefijo)
 * - sm: 576px+
 * - md: 768px+
 * - lg: 992px+
 * - xl: 1200px+
 * - xxl: 1400px+
 *
 * @param {number|'auto'|boolean} [xs] - Ancho en extra small (0px+)
 * @param {number|'auto'|boolean} [sm] - Ancho en small (576px+)
 * @param {number|'auto'|boolean} [md] - Ancho en medium (768px+)
 * @param {number|'auto'|boolean} [lg] - Ancho en large (992px+)
 * @param {number|'auto'|boolean} [xl] - Ancho en extra large (1200px+)
 * @param {number|'auto'|boolean} [xxl] - Ancho en 2xl (1400px+)
 * @param {number} [offsetXs] - Offset en xs
 * @param {number} [offsetSm] - Offset en sm
 * @param {number} [offsetMd] - Offset en md
 * @param {number} [offsetLg] - Offset en lg
 * @param {number} [offsetXl] - Offset en xl
 * @param {number} [offsetXxl] - Offset en xxl
 * @param {string} [className] - Clases CSS adicionales
 * @param {React.ReactNode} children - Contenido de la columna
 * @param {Object} props - Props adicionales
 * @returns {JSX.Element}
 *
 * @example
 * // Columna de 6/12 en medium y superiores
 * <Col md={6}>Content</Col>
 *
 * @example
 * // Columna full width en móvil, mitad en tablet+
 * <Col xs={12} md={6}>Content</Col>
 *
 * @example
 * // Columna con offset
 * <Col md={6} offsetMd={3}>Centered with offset</Col>
 *
 * @example
 * // Auto width column
 * <Col md="auto">Auto width</Col>
 */
export default function Col({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  offsetXl,
  offsetXxl,
  className,
  children,
  ...props
}) {
  const classes = cn(
    'px-3', // Gutter por defecto (padding horizontal)
    'flex-shrink-0', // Evitar que las columnas se encojan

    // Width classes para cada breakpoint
    getWidthClass(xs, ''),
    getWidthClass(sm, 'sm:'),
    getWidthClass(md, 'md:'),
    getWidthClass(lg, 'lg:'),
    getWidthClass(xl, 'xl:'),
    getWidthClass(xxl, '2xl:'),

    // Offset classes para cada breakpoint
    getOffsetClass(offsetXs, ''),
    getOffsetClass(offsetSm, 'sm:'),
    getOffsetClass(offsetMd, 'md:'),
    getOffsetClass(offsetLg, 'lg:'),
    getOffsetClass(offsetXl, 'xl:'),
    getOffsetClass(offsetXxl, '2xl:'),

    // Default full width si no se especifica ningún breakpoint
    !xs && !sm && !md && !lg && !xl && !xxl && 'w-full',

    className
  )

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
