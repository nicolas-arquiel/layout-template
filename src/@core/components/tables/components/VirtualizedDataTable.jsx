import { FixedSizeList as List } from 'react-window'
import { Box, Flex, Text, Spinner } from '@radix-ui/themes'

/**
 * VirtualizedDataTable - Tabla virtualizada con react-window
 *
 * Renderiza solo las filas visibles para mejor performance con grandes datasets.
 * Integrado en el sistema de tablas de @core con estilos consistentes.
 *
 * @param {Array} data - Array de datos a mostrar
 * @param {Array} columns - Array de configuración de columnas (mismo formato que EnhancedDataTable)
 * @param {number} height - Altura de la tabla en px (default: 350)
 * @param {number} rowHeight - Altura de cada fila en px (default: 50)
 * @param {boolean} showHeader - Mostrar header (default: true)
 * @param {object} headerStyle - Estilos custom para header
 * @param {object} rowStyle - Estilos custom para filas
 * @param {object} containerStyle - Estilos custom para contenedor
 * @param {boolean} progressPending - Estado de carga (compatible con EnhancedDataTable)
 * @param {string} noDataMessage - Mensaje cuando no hay datos
 * @param {React.Component} loadingComponent - Componente custom de loading
 * @param {React.Component} noDataComponent - Componente custom de empty state
 * @param {function} onRowClick - Callback al hacer click en fila
 * @param {string} className - Clases CSS adicionales
 */
const VirtualizedDataTable = ({
  // Datos básicos
  data = [],
  columns = [],

  // Configuración de tabla
  height = 350,
  rowHeight = 50,
  showHeader = true,

  // Estilos
  headerStyle = {},
  rowStyle = {},
  containerStyle = {},

  // Estados y mensajes (compatible con EnhancedDataTable)
  progressPending = false,
  noDataMessage = 'No hay resultados para mostrar',
  loadingComponent = null,
  noDataComponent = null,

  // Interacciones
  onRowClick = null,
  
  // Otros
  className = '',
}) => {
  const visibleColumns = columns.filter((col) => !col.omit)

  const RenderRow = ({ index, style }) => {
    const row = data[index]
    const isClickable = !!onRowClick

    return (
      <div
        className={`tabla-virtualizada-row ${isClickable ? 'clickable' : ''}`}
        style={{
          ...style,
          ...rowStyle
        }}
        onClick={isClickable ? () => onRowClick(row, index) : undefined}
      >
        {visibleColumns.map((col, colIndex) => {
          // Soportar tanto selector como cell (compatible con EnhancedDataTable)
          const cellValue = col.selector
            ? (typeof col.selector === 'function'
                ? col.selector(row)
                : row[col.selector])
            : null

          const cellContent = col.cell
            ? col.cell(row, index, col, colIndex)
            : cellValue

          return (
            <div
              key={colIndex}
              className={`tabla-virtualizada-cell ${
                col.center ? 'center' : ''
              }`}
              style={{
                flex: col.flex,
                minWidth: col.minWidth,
                maxWidth: col.maxWidth,
                width: col.width
              }}
              title={col.cell ? '' : (cellValue || '').toString()}
            >
              {cellContent}
            </div>
          )
        })}
      </div>
    )
  }

  // Componente de header
  const renderHeader = () => {
    if (!showHeader) return null

    return (
      <Flex
        className="tabla-virtualizada-header"
        style={headerStyle}
      >
        {visibleColumns.map((col, index) => (
          <div
            key={index}
            className={`tabla-virtualizada-header-cell ${
              col.center ? 'center' : ''
            }`}
            style={{
              flex: col.flex,
              minWidth: col.minWidth,
              maxWidth: col.maxWidth,
              width: col.width
            }}
            title={col.name}
          >
            {col.name}
          </div>
        ))}
      </Flex>
    )
  }

  // Componente para cuando no hay datos
  const NoDataComponent = () => {
    if (noDataComponent) {
      return noDataComponent
    }

    // Si data es un array de skeletons (durante loading), no mostrar "No hay resultados"
    if (data && data.length > 0 && data[0]?.skeleton) {
      return null
    }

    return (
      <Box p="5" style={{ textAlign: 'center' }}>
        <Text size="2" color="gray">
          {noDataMessage}
        </Text>
      </Box>
    )
  }

  // Componente de loading
  const LoadingComponent = () => {
    if (loadingComponent) {
      return loadingComponent
    }

    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="3"
        p="5"
        style={{ textAlign: 'center' }}
      >
        <Spinner size="3" />
        <Text size="2" color="gray">
          Cargando datos...
        </Text>
      </Flex>
    )
  }

  return (
    <Box
      className={`tabla-virtualizada-container ${className}`}
      style={containerStyle}
    >
      {/* Header */}
      {renderHeader()}

      {/* Contenido */}
      {progressPending ? (
        <LoadingComponent />
      ) : data.length === 0 ? (
        <NoDataComponent />
      ) : (
        <div style={{ height, overflow: 'hidden' }}>
          <List
            height={height}
            itemCount={data.length}
            itemSize={rowHeight}
            width="100%"
          >
            {RenderRow}
          </List>
        </div>
      )}
    </Box>
  )
}

export default VirtualizedDataTable
