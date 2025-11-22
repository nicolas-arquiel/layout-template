import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility para combinar clases de Tailwind CSS
 * Usa clsx para condicionales + tailwind-merge para evitar conflictos
 *
 * @param {...any} inputs - Clases a combinar
 * @returns {string} - String de clases combinadas
 *
 * @example
 * cn('bg-red-500', isActive && 'bg-blue-500') // 'bg-blue-500' si isActive
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
