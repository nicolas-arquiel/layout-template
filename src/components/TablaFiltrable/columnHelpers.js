import { createColumnHelper } from '@tanstack/react-table'
import { Badge, Button, Flex, Text } from '@radix-ui/themes'

/**
 * Helpers para crear columnas de TanStack Table
 * Proporciona builders comunes para tipos de columnas
 */

/**
 * Crea un helper de columnas tipado para un tipo de dato
 * @example
 * const helper = createTypedColumnHelper()
 * const columns = [
 *   helper.accessor('nombre', { header: 'Nombre' }),
 *   helper.display({ id: 'actions', cell: (info) => <Button>Editar</Button> })
 * ]
 */
export const createTypedColumnHelper = () => createColumnHelper()

/**
 * Templates de columnas comunes
 */
export const columnTemplates = {
  /**
   * Columna de texto simple
   */
  text: (accessorKey, header, options = {}) => ({
    accessorKey,
    header,
    cell: (info) => <Text size="2">{info.getValue()}</Text>,
    ...options,
  }),

  /**
   * Columna de ID numérico
   */
  id: (accessorKey = 'id', header = 'ID', options = {}) => ({
    accessorKey,
    header,
    cell: (info) => (
      <Text size="2" weight="medium">
        {info.getValue()}
      </Text>
    ),
    size: 80,
    enableSorting: true,
    ...options,
  }),

  /**
   * Columna de nombre completo
   */
  nombreCompleto: (
    apellidoKey,
    nombreKey,
    header = 'Nombre',
    options = {}
  ) => ({
    id: 'nombreCompleto',
    header,
    accessorFn: (row) => `${row[apellidoKey]}, ${row[nombreKey]}`,
    cell: (info) => (
      <Text size="2" style={{ fontWeight: 500 }}>
        {info.getValue()}
      </Text>
    ),
    enableSorting: true,
    enableColumnFilter: true,
    ...options,
  }),

  /**
   * Columna de fecha
   */
  fecha: (accessorKey, header, options = {}) => ({
    accessorKey,
    header,
    cell: (info) => {
      const fecha = info.getValue()
      if (!fecha) return '-'
      // Formatear fecha si es string
      try {
        const date = new Date(fecha)
        return (
          <Text size="2">
            {date.toLocaleDateString('es-AR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
        )
      } catch {
        return <Text size="2">{fecha}</Text>
      }
    },
    size: 110,
    enableSorting: true,
    ...options,
  }),

  /**
   * Columna de estado con badge
   */
  estado: (accessorKey, header = 'Estado', colorMap = {}, options = {}) => ({
    accessorKey,
    header,
    cell: (info) => {
      const estado = info.getValue()
      const color = colorMap[estado] || 'blue'
      return <Badge color={color}>{estado}</Badge>
    },
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
    ...options,
  }),

  /**
   * Columna booleana con badge Sí/No
   */
  boolean: (accessorKey, header, options = {}) => ({
    accessorKey,
    header,
    cell: (info) => {
      const value = info.getValue()
      return (
        <Badge color={value ? 'green' : 'gray'}>
          {value ? 'Sí' : 'No'}
        </Badge>
      )
    },
    size: 100,
    enableSorting: true,
    filterFn: 'equals',
    ...options,
  }),

  /**
   * Columna de acciones
   */
  acciones: (cellRenderer, header = 'Acciones', options = {}) => ({
    id: 'acciones',
    header,
    cell: cellRenderer,
    size: 150,
    enableSorting: false,
    enableColumnFilter: false,
    ...options,
  }),

  /**
   * Columna de número con formato
   */
  numero: (accessorKey, header, decimals = 0, options = {}) => ({
    accessorKey,
    header,
    cell: (info) => {
      const value = info.getValue()
      if (value == null) return '-'
      return (
        <Text size="2" style={{ textAlign: 'right', display: 'block' }}>
          {Number(value).toLocaleString('es-AR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </Text>
      )
    },
    size: 100,
    enableSorting: true,
    ...options,
  }),

  /**
   * Columna de moneda
   */
  moneda: (accessorKey, header, currency = 'ARS', options = {}) => ({
    accessorKey,
    header,
    cell: (info) => {
      const value = info.getValue()
      if (value == null) return '-'
      return (
        <Text size="2" style={{ textAlign: 'right', display: 'block' }}>
          {Number(value).toLocaleString('es-AR', {
            style: 'currency',
            currency,
          })}
        </Text>
      )
    },
    size: 120,
    enableSorting: true,
    ...options,
  }),
}

export default columnTemplates
