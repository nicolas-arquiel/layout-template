import React, { useState, useMemo } from 'react';
import { Table, Box, Text, Checkbox, Flex } from '@radix-ui/themes';
import { ChevronUp, ChevronDown } from 'lucide-react';

/**
 * DataTable mejorado con Radix UI
 * Reemplaza react-data-table-component con funcionalidades avanzadas
 */
const EnhancedDataTable = ({
  columns = [],
  data = [],
  onRowClick,
  progressPending = false,
  noDataComponent,
  highlightOnHover = true,
  pointerOnHover = false,
  dense = false,
  selectableRows = false,
  onSelectedRowsChange,
  sortIcon,
  defaultSortFieldId,
  defaultSortAsc = true,
  onSort,
  className = "",
  ...props
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortField, setSortField] = useState(defaultSortFieldId);
  const [sortDirection, setSortDirection] = useState(defaultSortAsc ? 'asc' : 'desc');

  // Manejar selección de todas las filas
  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(data.map((row, idx) => row.id || idx));
      setSelectedRows(allIds);
      onSelectedRowsChange?.({ selectedRows: data });
    } else {
      setSelectedRows(new Set());
      onSelectedRowsChange?.({ selectedRows: [] });
    }
  };

  // Manejar selección de una fila
  const handleSelectRow = (row, rowId, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);

    const selectedData = data.filter((r, idx) =>
      newSelected.has(r.id !== undefined ? r.id : idx)
    );
    onSelectedRowsChange?.({ selectedRows: selectedData });
  };

  // Manejar sorting
  const handleSort = (column) => {
    if (!column.sortable) return;

    const field = column.id || column.selector;
    let newDirection = 'asc';

    if (sortField === field) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }

    setSortField(field);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(column, newDirection);
    }
  };

  // Aplicar sorting a los datos
  const sortedData = useMemo(() => {
    if (!sortField || onSort) {
      // Si hay callback onSort, no ordenamos aquí (ordenamiento externo)
      return data;
    }

    const column = columns.find(col => (col.id || col.selector) === sortField);
    if (!column || !column.sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = typeof column.selector === 'function'
        ? column.selector(a)
        : a[column.selector];
      const bValue = typeof column.selector === 'function'
        ? column.selector(b)
        : b[column.selector];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortField, sortDirection, columns, onSort]);

  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < data.length;

  if (progressPending) {
    return (
      <Box p="5" style={{ textAlign: 'center' }}>
        <Text>Cargando...</Text>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box p="5" style={{ textAlign: 'center' }}>
        {noDataComponent || <Text>No hay datos disponibles</Text>}
      </Box>
    );
  }

  return (
    <div className="enhanced-data-table">
      <Table.Root
        variant="surface"
        size={dense ? "1" : "2"}
        className="border-none"
        {...props}
      >
        <Table.Header>
          <Table.Row className="table-header">
            {selectableRows && (
              <Table.ColumnHeaderCell className="table-header w-10">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={handleSelectAll}
                />
              </Table.ColumnHeaderCell>
            )}
            {columns.map((column, index) => (
              <Table.ColumnHeaderCell
                key={column.id || column.selector || index}
                className={`table-header select-none ${column.sortable ? 'cursor-pointer' : ''}`}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  ...column.style
                }}
                onClick={() => column.sortable && handleSort(column)}
              >
                <Flex align="center" gap="1">
                  {column.name}
                  {column.sortable && (
                    <div className="ml-auto flex flex-col">
                      {sortField === (column.id || column.selector) ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )
                      ) : (
                        <ChevronDown size={14} opacity="0.3" />
                      )}
                    </div>
                  )}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedData.map((row, rowIndex) => {
            const rowId = row.id !== undefined ? row.id : rowIndex;
            const isSelected = selectedRows.has(rowId);

            return (
              <Table.Row
                key={rowId}
                onClick={() => onRowClick && onRowClick(row)}
                className={`
                  ${highlightOnHover ? 'highlight-on-hover' : ''}
                  ${isSelected ? 'selected' : ''}
                  ${onRowClick || pointerOnHover ? 'cursor-pointer' : ''}
                `}
                style={{
                  backgroundColor: isSelected ? 'var(--accent-2)' : undefined
                }}
              >
                {selectableRows && (
                  <Table.Cell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectRow(row, rowId, checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Table.Cell>
                )}
                {columns.map((column, colIndex) => {
                  const cellValue = column.selector
                    ? (typeof column.selector === 'function'
                        ? column.selector(row)
                        : row[column.selector])
                    : null;

                  const cellContent = column.cell
                    ? column.cell(row, rowIndex, column, colIndex)
                    : cellValue;

                  return (
                    <Table.Cell
                      key={column.id || column.selector || colIndex}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        ...column.style
                      }}
                    >
                      {cellContent}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default EnhancedDataTable;
