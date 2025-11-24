import { useMemo } from 'react'

/**
 * Hook para memoizar configuración de columnas de tabla
 * Previene re-renders innecesarios cuando las columnas no cambian
 *
 * @param {Array} config - Array de configuración de columnas
 * @returns {Array} - Array de columnas memoizadas con defaults aplicados
 */
export const useTablaColumns = (config = []) => {
  return useMemo(() => {
    return config.map((col) => ({
      name: col.name || '',
      selector: col.selector || null,
      cell: col.cell || null,
      flex: col.flex || '1',
      minWidth: col.minWidth || '100px',
      maxWidth: col.maxWidth || 'none',
      width: col.width || 'auto',
      center: col.center || false,
      omit: col.omit || false,
      sortable: col.sortable || false,
      ...col,
    }))
  }, [config])
}

export default useTablaColumns
