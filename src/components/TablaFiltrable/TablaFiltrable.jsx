import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import {
  Box,
  Flex,
  Table,
  TextField,
  Button,
  Select,
  Text,
  IconButton,
  Badge,
} from '@radix-ui/themes'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
  Cross2Icon,
  CaretSortIcon,
  CaretUpIcon,
  CaretDownIcon,
} from '@radix-ui/react-icons'
import './TablaFiltrable.css'

/**
 * TablaFiltrable - Tabla avanzada con TanStack Table
 *
 * Incluye:
 * - Filtros por columna (frontend o backend)
 * - Sorting
 * - Paginación
 * - Búsqueda global
 * - Query builder para backend
 *
 * @param {Array} data - Datos de la tabla
 * @param {Array} columns - Definición de columnas (TanStack Table format)
 * @param {boolean} enableFilters - Habilitar filtros (default: true)
 * @param {boolean} enableSorting - Habilitar sorting (default: true)
 * @param {boolean} enablePagination - Habilitar paginación (default: true)
 * @param {boolean} enableGlobalFilter - Habilitar búsqueda global (default: true)
 * @param {boolean} manualFiltering - Filtros manejados por backend (default: false)
 * @param {boolean} manualSorting - Sorting manejado por backend (default: false)
 * @param {boolean} manualPagination - Paginación manejada por backend (default: false)
 * @param {number} pageSize - Tamaño de página inicial (default: 10)
 * @param {number} pageCount - Total de páginas (para backend)
 * @param {function} onFiltersChange - Callback cuando cambian filtros (backend)
 * @param {function} onSortingChange - Callback cuando cambia sorting (backend)
 * @param {function} onPaginationChange - Callback cuando cambia paginación (backend)
 * @param {function} onQueryChange - Callback con query completo para backend
 * @param {boolean} isLoading - Estado de carga
 * @param {string} emptyMessage - Mensaje cuando no hay datos
 */
const TablaFiltrable = ({
  data = [],
  columns = [],
  enableFilters = true,
  enableSorting = true,
  enablePagination = true,
  enableGlobalFilter = true,
  manualFiltering = false,
  manualSorting = false,
  manualPagination = false,
  pageSize: initialPageSize = 10,
  pageCount: controlledPageCount,
  onFiltersChange,
  onSortingChange,
  onPaginationChange,
  onQueryChange,
  isLoading = false,
  emptyMessage = 'No hay datos para mostrar',
}) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === 'function' ? updater(columnFilters) : updater
      setColumnFilters(newFilters)
      if (manualFiltering && onFiltersChange) {
        onFiltersChange(newFilters)
      }
      if (onQueryChange) {
        buildAndSendQuery({
          filters: newFilters,
          sorting,
          pagination: table.getState().pagination,
        })
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)
      if (manualSorting && onSortingChange) {
        onSortingChange(newSorting)
      }
      if (onQueryChange) {
        buildAndSendQuery({
          filters: columnFilters,
          sorting: newSorting,
          pagination: table.getState().pagination,
        })
      }
    },
    onPaginationChange: (updater) => {
      const currentState = table.getState().pagination
      const newPagination =
        typeof updater === 'function' ? updater(currentState) : updater
      if (manualPagination && onPaginationChange) {
        onPaginationChange(newPagination)
      }
      if (onQueryChange) {
        buildAndSendQuery({
          filters: columnFilters,
          sorting,
          pagination: newPagination,
        })
      }
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
    enableFilters,
    enableSorting,
    enableGlobalFilter,
    manualFiltering,
    manualSorting,
    manualPagination,
    pageCount: controlledPageCount,
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  })

  // Construye query para enviar al backend
  const buildAndSendQuery = ({ filters, sorting, pagination }) => {
    const query = {
      // Filtros: { columnId: value }
      filters: filters.reduce((acc, filter) => {
        acc[filter.id] = filter.value
        return acc
      }, {}),
      // Sorting: { field: 'columnId', order: 'asc'|'desc' }
      sorting: sorting.map((sort) => ({
        field: sort.id,
        order: sort.desc ? 'desc' : 'asc',
      })),
      // Paginación: { page, pageSize, offset }
      pagination: {
        page: pagination.pageIndex + 1, // Backend suele usar 1-indexed
        pageSize: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize,
      },
    }

    if (onQueryChange) {
      onQueryChange(query)
    }
  }

  // Limpiar filtros
  const clearFilters = () => {
    table.resetColumnFilters()
    table.resetGlobalFilter()
  }

  const hasActiveFilters =
    columnFilters.length > 0 || globalFilter.length > 0

  return (
    <Box className="tabla-filtrable-container">
      {/* Barra de búsqueda y filtros */}
      {(enableGlobalFilter || hasActiveFilters) && (
        <Flex gap="3" mb="4" wrap="wrap" align="center">
          {enableGlobalFilter && (
            <Box style={{ flex: 1, minWidth: '250px' }}>
              <TextField.Root
                placeholder="Buscar en toda la tabla..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                size="2"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon width="16" height="16" />
                </TextField.Slot>
                {globalFilter && (
                  <TextField.Slot>
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={() => setGlobalFilter('')}
                    >
                      <Cross2Icon width="14" height="14" />
                    </IconButton>
                  </TextField.Slot>
                )}
              </TextField.Root>
            </Box>
          )}

          {hasActiveFilters && (
            <Flex gap="2" align="center">
              <Badge color="blue">
                {columnFilters.length + (globalFilter ? 1 : 0)} filtros activos
              </Badge>
              <Button size="1" variant="soft" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </Flex>
          )}
        </Flex>
      )}

      {/* Tabla */}
      <Box
        style={{
          border: '1px solid var(--gray-5)',
          borderRadius: 'var(--radius-3)',
          overflow: 'hidden',
        }}
      >
        <Table.Root variant="surface">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeaderCell
                    key={header.id}
                    className="tabla-filtrable-header-cell"
                  >
                    {header.isPlaceholder ? null : (
                      <Flex direction="column" gap="2">
                        {/* Header con sorting */}
                        <Flex
                          align="center"
                          gap="1"
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Text size="2" weight="bold">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Text>
                          {header.column.getCanSort() && (
                            <Box>
                              {{
                                asc: <CaretUpIcon width="14" height="14" />,
                                desc: <CaretDownIcon width="14" height="14" />,
                              }[header.column.getIsSorted()] ?? (
                                <CaretSortIcon width="14" height="14" />
                              )}
                            </Box>
                          )}
                        </Flex>

                        {/* Filtro por columna */}
                        {header.column.getCanFilter() && enableFilters && (
                          <Filter column={header.column} />
                        )}
                      </Flex>
                    )}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {isLoading ? (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  style={{ textAlign: 'center', padding: 'var(--space-5)' }}
                >
                  <Text size="2" color="gray">
                    Cargando...
                  </Text>
                </Table.Cell>
              </Table.Row>
            ) : table.getRowModel().rows.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  style={{ textAlign: 'center', padding: 'var(--space-5)' }}
                >
                  <Text size="2" color="gray">
                    {emptyMessage}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id} className="tabla-filtrable-row">
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Paginación */}
      {enablePagination && (
        <Flex justify="between" align="center" mt="4" wrap="wrap" gap="3">
          <Flex align="center" gap="2">
            <Text size="2" color="gray">
              Filas por página:
            </Text>
            <Select.Root
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
              size="1"
            >
              <Select.Trigger />
              <Select.Content>
                {[10, 20, 30, 50, 100].map((size) => (
                  <Select.Item key={size} value={String(size)}>
                    {size}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex align="center" gap="2">
            <Text size="2" color="gray">
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </Text>
          </Flex>

          <Flex gap="1">
            <IconButton
              variant="soft"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              size="2"
            >
              <DoubleArrowLeftIcon width="16" height="16" />
            </IconButton>
            <IconButton
              variant="soft"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="2"
            >
              <ChevronLeftIcon width="16" height="16" />
            </IconButton>
            <IconButton
              variant="soft"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="2"
            >
              <ChevronRightIcon width="16" height="16" />
            </IconButton>
            <IconButton
              variant="soft"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              size="2"
            >
              <DoubleArrowRightIcon width="16" height="16" />
            </IconButton>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

// Componente de filtro por columna
const Filter = ({ column }) => {
  const columnFilterValue = column.getFilterValue()

  return (
    <TextField.Root
      placeholder="Filtrar..."
      value={String(columnFilterValue ?? '')}
      onChange={(e) => column.setFilterValue(e.target.value)}
      size="1"
    >
      {columnFilterValue && (
        <TextField.Slot>
          <IconButton
            size="1"
            variant="ghost"
            onClick={() => column.setFilterValue('')}
          >
            <Cross2Icon width="12" height="12" />
          </IconButton>
        </TextField.Slot>
      )}
    </TextField.Root>
  )
}

export default TablaFiltrable
