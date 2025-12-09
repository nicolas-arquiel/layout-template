import React from 'react';
import { Box, Table, IconButton, Card, Flex, Text, Grid } from '@radix-ui/themes';
import { flexRender } from '@tanstack/react-table';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronRight, ChevronDown } from 'lucide-react';
import TanStackSortHeader from './TanStackSortHeader';
import TanStackSelectCheckbox from './TanStackSelectCheckbox';
import TanStackSelectAllCheckbox from './TanStackSelectAllCheckbox';
import TanStackRowActions from './TanStackRowActions';

/**
 * Componente de tabla principal para TanStack Table
 * Renderiza la tabla con encabezados ordenables y cuerpo de datos
 * Soporta selección de filas mediante checkbox cuando enableRowSelection=true
 * Soporta filas colapsables cuando enableExpanding=true
 */
const TanStackTable = ({
    table,
    enableRowSelection = false,
    enableExpanding = false,
    enableRowActions = false,
    actions = [],
    customStyles = {}
}) => {
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
                            {/* Columna de expansión en el header */}
                            {enableExpanding && (
                                <Table.ColumnHeaderCell style={{ width: '50px' }} />
                            )}
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
                            {/* Columna de acciones en el header */}
                            {enableRowActions && (
                                <Table.ColumnHeaderCell style={{ width: '50px' }} />
                            )}
                        </Table.Row>
                    ))}
                </Table.Header>
                <Table.Body>
                    {table.getRowModel().rows.length === 0 ? (
                        <Table.Row>
                            <Table.Cell
                                colSpan={
                                    table.getVisibleFlatColumns().length +
                                    (enableRowSelection ? 1 : 0) +
                                    (enableExpanding ? 1 : 0) +
                                    (enableRowActions ? 1 : 0)
                                }
                                style={{ textAlign: 'center', padding: '2rem' }}
                            >
                                No se encontraron resultados
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <React.Fragment key={row.id}>
                                <Table.Row>
                                    {/* Columna de expansión en cada fila */}
                                    {enableExpanding && (
                                        <Table.Cell>
                                            <IconButton
                                                variant="ghost"
                                                size="1"
                                                onClick={row.getToggleExpandedHandler()}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {row.getIsExpanded() ? (
                                                    <ChevronDown size={16} />
                                                ) : (
                                                    <ChevronRight size={16} />
                                                )}
                                            </IconButton>
                                        </Table.Cell>
                                    )}
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
                                    {/* Columna de acciones en cada fila */}
                                    {enableRowActions && (
                                        <Table.Cell>
                                            <TanStackRowActions row={row} actions={actions} />
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                                {/* Fila de detalles expandible - Renderizada siempre si enableExpanding es true para permitir animación de cierre */}
                                {enableExpanding && (
                                    <Table.Row className="expanded-row">
                                        <Table.Cell
                                            colSpan={
                                                row.getVisibleCells().length +
                                                (enableRowSelection ? 1 : 0) +
                                                (enableExpanding ? 1 : 0) +
                                                (enableRowActions ? 1 : 0)
                                            }
                                            style={{ padding: 0, borderBottom: 'none' }}
                                        >
                                            <Collapsible.Root open={row.getIsExpanded()}>
                                                <Collapsible.Content className="collapsible-content">
                                                    <Box p="4" style={{ backgroundColor: 'var(--gray-2)' }}>
                                                        <Card size="2">
                                                            <Flex direction="column" gap="3">
                                                                <Flex align="center" gap="2">
                                                                    <Box
                                                                        style={{
                                                                            width: 8,
                                                                            height: 8,
                                                                            borderRadius: '50%',
                                                                            backgroundColor: 'var(--accent-9)'
                                                                        }}
                                                                    />
                                                                    <Text size="2" weight="bold" color="accent">
                                                                        Detalles expandidos
                                                                    </Text>
                                                                </Flex>
                                                                <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                                                                    {Object.entries(row.original).map(([key, value]) => (
                                                                        <Card key={key} variant="surface">
                                                                            <Flex justify="between" align="center" gap="2">
                                                                                <Text size="2" color="gray" weight="medium" style={{ textTransform: 'capitalize' }}>
                                                                                    {key}:
                                                                                </Text>
                                                                                <Text size="2" weight="medium">
                                                                                    {String(value)}
                                                                                </Text>
                                                                            </Flex>
                                                                        </Card>
                                                                    ))}
                                                                </Grid>
                                                            </Flex>
                                                        </Card>
                                                    </Box>
                                                </Collapsible.Content>
                                            </Collapsible.Root>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </Table.Body>
            </Table.Root>
        </Box>
    );
};

export default TanStackTable;
