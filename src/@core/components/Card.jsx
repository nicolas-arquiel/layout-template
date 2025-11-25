import React from 'react'
import { cn } from '@lib/utils'

/**
 * Card - Componente de tarjeta al estilo Vuexy/Bootstrap
 * Con box-shadow suave, sin border, bordes redondeados
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la card
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'card',
        'relative flex flex-col min-w-0',
        'bg-white rounded-[0.428rem]',
        'mb-8', // 2rem = 8 in tailwind (since base is 14px, 2rem ≈ 32px ≈ 8*4px)
        'transition-all duration-300 ease-in-out',
        className
      )}
      style={{
        boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.1)',
        border: '0',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardHeader - Header de la card
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del header
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'card-header',
        'px-6 py-6', // 1.5rem padding
        'bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardBody - Cuerpo principal de la card
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del body
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const CardBody = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'card-body',
        'flex-1',
        'px-6 py-6', // 1.5rem padding (var(--bs-card-spacer-x/y))
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardFooter - Footer de la card
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del footer
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'card-footer',
        'px-6 py-6', // 1.5rem padding
        'bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardTitle - Título de la card (usado dentro de CardHeader)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Texto del título
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h4
      className={cn(
        'card-title',
        'text-lg font-semibold',
        'mb-0',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
}

/**
 * CardSubtitle - Subtítulo de la card (usado dentro de CardHeader)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Texto del subtítulo
 * @param {string} [props.className] - Clases CSS adicionales
 * @returns {JSX.Element}
 */
export const CardSubtitle = ({ children, className, ...props }) => {
  return (
    <h6
      className={cn(
        'card-subtitle',
        'text-sm text-gray-600',
        'mb-2',
        className
      )}
      {...props}
    >
      {children}
    </h6>
  )
}

// Export default para compatibilidad
export default Card
