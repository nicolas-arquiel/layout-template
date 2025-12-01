import React from 'react';
import { Box, Table } from '@radix-ui/themes';
import { flexRender } from '@tanstack/react-table';
import TanStackSortHeader from './TanStackSortHeader';
import TanStackSelectCheckbox from './TanStackSelectCheckbox';
import TanStackSelectAllCheckbox from './TanStackSelectAllCheckbox';

/**
 * Componente de tabla principal para TanStack Table
 * Renderiza la tabla con encabezados ordenables y cuerpo de datos
 * Soporta selección de filas mediante checkbox cuando enableRowSelection=true
 */
const TanStackTable = ({ table, enableRowSelection = false, customStyles = {} }) => {
    return (
        <Box
            style={{
                border: '1px solid var(--gray-6)',
                borderRadius: 'var(--radius-3)',
                overflow: 'hidden',
                ...customStyles
            }}
        >
            <Table.Root variant="surface">
                <Table.Header>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Table.Row key={headerGroup.id}>
                            {/* Columna de selección en el header */}
                            {enableRowSelection && (
                                <Table.ColumnHeaderCell style={{ width: '50px' }}>
                                    <TanStackSelectAllCheckbox table={table} />
                                </Table.ColumnHeaderCell>
                            )}
                            {headerGroup.headers.map(header => (
                                <Table.ColumnHeaderCell
                                    key={header.id}
                                    style={{
                                        width: header.getSize() !== 150 ? `${header.getSize()}px` : 'auto'
                                    }}
                                >
                                    {header.isPlaceholder ? null : (
                                        <TanStackSortHeader header={header} />
                                    )}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Header>
                <Table.Body>
                    {table.getRowModel().rows.length === 0 ? (
                        <Table.Row>
                            <Table.Cell
                                colSpan={table.getAllColumns().length + (enableRowSelection ? 1 : 0)}
                                style={{ textAlign: 'center', padding: '2rem' }}
                            >
                                No se encontraron resultados
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <Table.Row key={row.id}>
                                {/* Columna de selección en cada fila */}
                                {enableRowSelection && (
                                    <Table.Cell>
                                        <TanStackSelectCheckbox row={row} />
                                    </Table.Cell>
                                )}
                                {row.getVisibleCells().map(cell => (
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
    );
};

export default TanStackTable;
