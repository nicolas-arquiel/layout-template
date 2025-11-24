import { Badge, Text, Tooltip } from '@radix-ui/themes'

/**
 * Helper para crear columnas de tabla con configuraciones predefinidas
 * Migrado a Radix UI desde Bootstrap/Reactstrap
 */
export const createColumn = {
  // Columna de texto simple
  text: (name, selector, options = {}) => ({
    name,
    selector,
    ...options,
  }),

  // Columna de ID numérico
  id: (name = 'ID', selector, options = {}) => ({
    name,
    selector,
    center: true,
    flex: '0 0 80px',
    minWidth: '80px',
    ...options,
  }),

  // Columna de nombre completo con tooltip
  nombreCompleto: (
    name = 'Nombre',
    apellidoSelector,
    nombreSelector,
    options = {}
  ) => ({
    name,
    cell: (row, index) => {
      const nombreCompleto = `${apellidoSelector(row)}, ${nombreSelector(row)}`
      return (
        <Tooltip content={nombreCompleto}>
          <Text
            size="2"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              maxWidth: '100%',
            }}
          >
            {nombreCompleto}
          </Text>
        </Tooltip>
      )
    },
    flex: '1',
    minWidth: '200px',
    ...options,
  }),

  // Columna de documento/DNI
  documento: (name = 'DNI', selector, options = {}) => ({
    name,
    selector,
    center: true,
    flex: '0 0 120px',
    minWidth: '120px',
    ...options,
  }),

  // Columna de fecha
  fecha: (name, selector, options = {}) => ({
    name,
    selector,
    center: true,
    flex: '0 0 110px',
    minWidth: '110px',
    ...options,
  }),

  // Columna de estado con badge
  estado: (name = 'Estado', selector, options = {}) => ({
    name,
    cell: (row) => {
      const estado = selector(row)
      return <Badge color="blue">{estado}</Badge>
    },
    center: true,
    flex: '0 0 120px',
    minWidth: '120px',
    ...options,
  }),

  // Columna de acciones/botones
  acciones: (name = 'Acciones', cellRenderer, options = {}) => ({
    name,
    cell: cellRenderer,
    center: true,
    flex: '0 0 100px',
    minWidth: '100px',
    ignoreRowClick: true,
    ...options,
  }),
}

export default createColumn
