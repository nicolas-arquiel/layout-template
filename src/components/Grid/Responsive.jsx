import { cn } from '../../utils/cn'

/**
 * ShowAt component - Muestra contenido solo en el breakpoint especificado y superiores
 *
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'} breakpoint - Breakpoint mínimo donde mostrar
 * @param {React.ReactNode} children - Contenido a mostrar
 * @param {string} [className] - Clases CSS adicionales
 * @returns {JSX.Element}
 *
 * @example
 * <ShowAt breakpoint="md">
 *   <p>Solo visible en tablet y desktop</p>
 * </ShowAt>
 */
export function ShowAt({ breakpoint, children, className }) {
  const breakpointClasses = {
    sm: 'hidden sm:block',
    md: 'hidden md:block',
    lg: 'hidden lg:block',
    xl: 'hidden xl:block',
    '2xl': 'hidden 2xl:block',
  }

  return <div className={cn(breakpointClasses[breakpoint], className)}>{children}</div>
}

/**
 * HideAt component - Oculta contenido en el breakpoint especificado y superiores
 *
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'} breakpoint - Breakpoint donde empezar a ocultar
 * @param {React.ReactNode} children - Contenido a ocultar
 * @param {string} [className] - Clases CSS adicionales
 * @returns {JSX.Element}
 *
 * @example
 * <HideAt breakpoint="md">
 *   <p>Solo visible en mobile</p>
 * </HideAt>
 */
export function HideAt({ breakpoint, children, className }) {
  const breakpointClasses = {
    sm: 'sm:hidden',
    md: 'md:hidden',
    lg: 'lg:hidden',
    xl: 'xl:hidden',
    '2xl': '2xl:hidden',
  }

  return <div className={cn(breakpointClasses[breakpoint], className)}>{children}</div>
}

/**
 * OnlyAt component - Muestra contenido solo en un breakpoint específico
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} breakpoint - Breakpoint específico
 * @param {React.ReactNode} children - Contenido a mostrar
 * @param {string} [className] - Clases CSS adicionales
 * @returns {JSX.Element}
 *
 * @example
 * <OnlyAt breakpoint="md">
 *   <p>Solo visible en tablets</p>
 * </OnlyAt>
 */
export function OnlyAt({ breakpoint, children, className }) {
  const breakpointClasses = {
    xs: 'block sm:hidden',
    sm: 'hidden sm:block md:hidden',
    md: 'hidden md:block lg:hidden',
    lg: 'hidden lg:block xl:hidden',
    xl: 'hidden xl:block 2xl:hidden',
    '2xl': 'hidden 2xl:block',
  }

  return <div className={cn(breakpointClasses[breakpoint], className)}>{children}</div>
}
