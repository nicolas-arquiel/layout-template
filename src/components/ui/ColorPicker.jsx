import { Grid, Text, Button } from '@radix-ui/themes'
import { cn } from '../../lib/utils'

/**
 * ColorPicker - Selector de colores para theme customizer
 * USA SOLO CLASES DE TAILWIND - Sin estilos inline
 *
 * @param {Object} props
 * @param {string} props.selectedColor - Color actualmente seleccionado
 * @param {Function} props.onColorChange - Callback cuando cambia el color
 * @param {Array} props.colors - Array de objetos color {value, name, bgClass}
 * @param {string} [props.className] - Clases adicionales
 * @returns {JSX.Element}
 */
export default function ColorPicker({ selectedColor, onColorChange, colors, className, ...props }) {
  return (
    <Grid columns="5" gap="3" className={className} {...props}>
      {colors.map((color) => (
        <div key={color.value} className="text-center">
          <Button
            variant="ghost"
            className={cn(
              'w-12 h-12 rounded-xl mb-2 cursor-pointer',
              'transition-transform duration-200 hover:scale-110',
              color.bgClass,
              selectedColor === color.value && 'ring-4 ring-gray-300 dark:ring-gray-600 scale-110'
            )}
            onClick={() => onColorChange(color.value)}
          />
          <Text size="1" className="text-gray-600 dark:text-gray-400">
            {color.name}
          </Text>
        </div>
      ))}
    </Grid>
  )
}
