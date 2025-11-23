import React from 'react'
import { cn } from '../../lib/utils'

/**
 * Container - Contenedor con padding y centrado al estilo Bootstrap
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del container
 * @param {boolean} [props.fluid] - Si es true, ocupa 100% del ancho
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const Container = ({ children, fluid = false, className, ...props }) => {
  return (
    <div
      className={cn(
        'container',
        fluid ? 'w-full' : 'max-w-[1440px]', // xxl breakpoint
        'px-8', // 2rem = gutter-x
        'mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Row - Fila del grid system al estilo Bootstrap
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Columnas (Col)
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const Row = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'row',
        'flex flex-wrap',
        '-mx-4', // Compensar el padding de las columnas (gutter-x / 2)
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Col - Columna del grid system al estilo Bootstrap
 * Soporta breakpoints: xs, sm, md, lg, xl, xxl
 *
 * Ejemplo de uso:
 * <Col xs={12} sm={6} md={4} lg={3}>Contenido</Col>
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la columna
 * @param {number|string} [props.xs] - Ancho en xs (1-12 o "auto")
 * @param {number|string} [props.sm] - Ancho en sm (1-12 o "auto")
 * @param {number|string} [props.md] - Ancho en md (1-12 o "auto")
 * @param {number|string} [props.lg] - Ancho en lg (1-12 o "auto")
 * @param {number|string} [props.xl] - Ancho en xl (1-12 o "auto")
 * @param {number|string} [props.xxl] - Ancho en xxl (1-12 o "auto")
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const Col = ({
  children,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  xxl,
  className,
  ...props
}) => {
  // Mapeo de números a porcentajes (grid de 12 columnas)
  const colWidthMap = {
    1: '8.333333%',
    2: '16.666667%',
    3: '25%',
    4: '33.333333%',
    5: '41.666667%',
    6: '50%',
    7: '58.333333%',
    8: '66.666667%',
    9: '75%',
    10: '83.333333%',
    11: '91.666667%',
    12: '100%',
    auto: 'auto'
  }

  // Generar ID único para esta columna (para las media queries)
  const colId = React.useId().replace(/:/g, '')

  // Construir los estilos CSS con media queries
  const buildResponsiveStyles = () => {
    let cssRules = `
      .col-${colId} {
        width: ${colWidthMap[xs]};
        flex: 0 0 ${colWidthMap[xs]};
        max-width: ${colWidthMap[xs]};
        padding-left: 1rem;
        padding-right: 1rem;
      }
    `

    // Breakpoint sm (576px)
    if (sm) {
      cssRules += `
        @media (min-width: 576px) {
          .col-${colId} {
            width: ${colWidthMap[sm]};
            flex: 0 0 ${colWidthMap[sm]};
            max-width: ${colWidthMap[sm]};
          }
        }
      `
    }

    // Breakpoint md (768px)
    if (md) {
      cssRules += `
        @media (min-width: 768px) {
          .col-${colId} {
            width: ${colWidthMap[md]};
            flex: 0 0 ${colWidthMap[md]};
            max-width: ${colWidthMap[md]};
          }
        }
      `
    }

    // Breakpoint lg (992px)
    if (lg) {
      cssRules += `
        @media (min-width: 992px) {
          .col-${colId} {
            width: ${colWidthMap[lg]};
            flex: 0 0 ${colWidthMap[lg]};
            max-width: ${colWidthMap[lg]};
          }
        }
      `
    }

    // Breakpoint xl (1200px)
    if (xl) {
      cssRules += `
        @media (min-width: 1200px) {
          .col-${colId} {
            width: ${colWidthMap[xl]};
            flex: 0 0 ${colWidthMap[xl]};
            max-width: ${colWidthMap[xl]};
          }
        }
      `
    }

    // Breakpoint xxl (1440px)
    if (xxl) {
      cssRules += `
        @media (min-width: 1440px) {
          .col-${colId} {
            width: ${colWidthMap[xxl]};
            flex: 0 0 ${colWidthMap[xxl]};
            max-width: ${colWidthMap[xxl]};
          }
        }
      `
    }

    return cssRules
  }

  return (
    <>
      <style>{buildResponsiveStyles()}</style>
      <div
        className={cn(
          `col-${colId}`,
          'flex-shrink-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

// Export default para compatibilidad
export default { Container, Row, Col }
