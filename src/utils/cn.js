import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility para combinar clases de Tailwind CSS de manera eficiente
 * Combina clsx para manejo condicional de clases y tailwind-merge para evitar conflictos
 *
 * @param {...(string|Object|Array)} inputs - Clases CSS o condiciones
 * @returns {string} String de clases combinadas y optimizadas
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-blue-500', { 'text-white': isActive })
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
