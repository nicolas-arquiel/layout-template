import { cn } from '../../utils/cn'

/**
 * Spacer component - Espaciado vertical entre elementos
 *
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} [size='md'] - Tamaño del espaciado
 * @param {string} [className] - Clases CSS adicionales
 * @returns {JSX.Element}
 *
 * @example
 * <Spacer size="lg" />
 */
export default function Spacer({ size = 'md', className }) {
  const sizeMap = {
    xs: 'h-2', // 0.5rem - 8px
    sm: 'h-4', // 1rem - 16px
    md: 'h-6', // 1.5rem - 24px
    lg: 'h-8', // 2rem - 32px
    xl: 'h-12', // 3rem - 48px
    '2xl': 'h-16', // 4rem - 64px
  }

  return <div className={cn(sizeMap[size], className)} aria-hidden="true" />
}
