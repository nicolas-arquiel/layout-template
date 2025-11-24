import { FixedSizeList as List } from 'react-window'
import { Box, Flex, Text, Spinner } from '@radix-ui/themes'
import './TablaVirtualizada.css'

/**
 * TablaVirtualizada - Componente de tabla con virtualización usando react-window
 *
 * Renderiza solo las filas visibles para mejor performance con grandes datasets.
 * Migrado a Radix UI.
 *
 * @param {Array} data - Array de datos a mostrar
 * @param {Array} columns - Array de configuración de columnas
 * @param {number} height - Altura de la tabla en px (default: 350)
 * @param {number} rowHeight - Altura de cada fila en px (default: 50)
 * @param {boolean} showHeader - Mostrar header (default: true)
 * @param {object} headerStyle - Estilos custom para header
 * @param {object} rowStyle - Estilos custom para filas
 * @param {object} containerStyle - Estilos custom para contenedor
 * @param {boolean} isLoading - Estado de carga
 * @param {string} noDataMessage - Mensaje cuando no hay datos
 * @param {React.Component} loadingComponent - Componente custom de loading
 * @param {React.Component} emptyComponent - Componente custom de empty state
 * @param {function} onRowClick - Callback al hacer click en fila
 */
const TablaVirtualizada = ({
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

  // Estados y mensajes
  isLoading = false,
  noDataMessage = 'No hay resultados para mostrar',
  loadingComponent = null,
  emptyComponent = null,

  // Interacciones
  onRowClick = null,
}) => {
  const visibleColumns = columns.filter((col) => !col.omit)

  // Componente de fila
  const RenderRow = ({ index, style }) => {
    const row = data[index]
    const isClickable = !!onRowClick

    return (
      <div
        className={`tabla-virtualizada-row ${isClickable ? 'clickable' : ''}`}
        style={{
          ...style,
          ...rowStyle,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--gray-5)',
        }}
        onClick={isClickable ? () => onRowClick(row, index) : undefined}
      >
        {visibleColumns.map((col, colIndex) => (
          <div
            key={colIndex}
            className={`tabla-virtualizada-cell ${
              col.center ? 'center' : 'start'
            }`}
            style={{
              flex: col.flex || '1',
              minWidth: col.minWidth || '100px',
              maxWidth: col.maxWidth || 'none',
              width: col.width || 'auto',
              padding: '0.4rem 0.6rem',
              lineHeight: '1.2',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={col.cell ? '' : (col.selector?.(row) || '').toString()}
          >
            {col.cell ? col.cell(row, index) : col.selector?.(row)}
          </div>
        ))}
      </div>
    )
  }

  // Componente de header
  const renderHeader = () => {
    if (!showHeader) return null

    return (
      <Flex
        className="tabla-virtualizada-header"
        style={{
          backgroundColor: 'var(--gray-3)',
          borderBottom: '2px solid var(--gray-6)',
          fontWeight: 600,
          ...headerStyle,
        }}
      >
        {visibleColumns.map((col, index) => (
          <div
            key={index}
            className={`tabla-virtualizada-header-cell ${
              col.center ? 'center' : 'start'
            }`}
            style={{
              flex: col.flex || '1',
              minWidth: col.minWidth || '100px',
              maxWidth: col.maxWidth || 'none',
              width: col.width || 'auto',
              padding: '0.6rem 0.6rem',
              lineHeight: '1.2',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              borderRight:
                index < visibleColumns.length - 1
                  ? '1px solid var(--gray-5)'
                  : 'none',
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
    if (emptyComponent) {
      return emptyComponent
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
      className="tabla-virtualizada-container"
      style={{
        width: '100%',
        border: '1px solid var(--gray-5)',
        borderRadius: 'var(--radius-3)',
        overflow: 'hidden',
        ...containerStyle,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* Contenido */}
      {isLoading ? (
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

export default TablaVirtualizada
