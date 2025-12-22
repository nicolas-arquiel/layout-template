import React from 'react';
import { Box, Table, IconButton, Card, Flex, Text, Grid, ScrollArea, Inset, Separator, Strong } from '@radix-ui/themes';
import { flexRender } from '@tanstack/react-table';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronRight, ChevronDown } from 'lucide-react';
import TanStackSortHeader from './TanStackSortHeader';
import TanStackSelectCheckbox from './TanStackSelectCheckbox';
import TanStackSelectAllCheckbox from './TanStackSelectAllCheckbox';

const TanStackTable = ({
    table,
    enableRowSelection = false,
    enableExpanding = false,
    customStyles = {},
}) => {
    // Columnas visibles “de datos” (no incluye expand/select/actions)
    const leafCols = table.getVisibleLeafColumns();

    return (
        <Box
            style={{
                border: '1px solid var(--gray-6)',
                borderRadius: 'var(--radius-3)',
                overflow: 'hidden',
                ...customStyles,
            }}
        >
            {/* VISTA DE ESCRITORIO (MD en adelante) */}
            <Box display={{ initial: 'none', md: 'block' }}>
                <ScrollArea scrollbars="horizontal" style={{ width: "100%" }} type='auto'>
                    <Table.Root
                        variant="surface"
                        style={{
                            tableLayout: 'fixed', // clave para que el colgroup mande
                            width: '100%',
                        }}
                    >
                        <colgroup>
                            {enableExpanding && <col style={{ width: '50px' }} />}
                            {enableRowSelection && <col style={{ width: '50px' }} />}

                            {leafCols.map(col => (
                                <col
                                    key={col.id}
                                    style={{ width: col.columnDef.meta?.width ?? 'auto' }} // <-- '30%', '12%', etc
                                />
                            ))}
                        </colgroup>

                        <Table.Header>
                            {table.getHeaderGroups().map(headerGroup => (
                                <Table.Row key={headerGroup.id}>
                                    {/* Expanding */}
                                    {enableExpanding && <Table.ColumnHeaderCell />}

                                    {/* Row selection */}
                                    {enableRowSelection && (
                                        <Table.ColumnHeaderCell>
                                            <TanStackSelectAllCheckbox table={table} />
                                        </Table.ColumnHeaderCell>
                                    )}
                                    {/* Headers (sin width inline para no pisar el colgroup) */}
                                    {headerGroup.headers.map(header => (
                                        <Table.ColumnHeaderCell key={header.id}>
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
                                        colSpan={
                                            table.getVisibleFlatColumns().length +
                                            (enableRowSelection ? 1 : 0) +
                                            (enableExpanding ? 1 : 0)
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
                                            {/* Expanding cell */}
                                            {enableExpanding && (
                                                <Table.Cell>
                                                    <IconButton
                                                        variant="ghost"
                                                        size="1"
                                                        onClick={row.getToggleExpandedHandler()}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {row.getIsExpanded() ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                    </IconButton>
                                                </Table.Cell>
                                            )}

                                            {/* Row selection cell */}
                                            {enableRowSelection && (
                                                <Table.Cell>
                                                    <TanStackSelectCheckbox row={row} />
                                                </Table.Cell>
                                            )}

                                            {/* Data cells */}
                                            {row.getVisibleCells().map(cell => (
                                                <Table.Cell
                                                    key={cell.id}
                                                    style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                    title={typeof cell.getValue?.() === 'string' ? cell.getValue() : undefined}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Table.Cell>
                                            ))}
                                        </Table.Row>

                                        {/* Expanded row */}
                                        {enableExpanding && (
                                            <Table.Row className="expanded-row">
                                                <Table.Cell
                                                    colSpan={
                                                        row.getVisibleCells().length +
                                                        (enableRowSelection ? 1 : 0) +
                                                        (enableExpanding ? 1 : 0)
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
                                                                                    backgroundColor: 'var(--accent-9)',
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
                                                                                        <Text
                                                                                            size="2"
                                                                                            color="gray"
                                                                                            weight="medium"
                                                                                            style={{ textTransform: 'capitalize' }}
                                                                                        >
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
                </ScrollArea>
            </Box>

            {/* VISTA MÓVIL (hasta MD) */}
            <Box display={{ initial: 'block', md: 'none' }} p="3" style={{ backgroundColor: 'var(--gray-2)' }}>
                {table.getRowModel().rows.length === 0 ? (
                    <Card>
                        <Text align="center" color="gray">No se encontraron resultados</Text>
                    </Card>
                ) : (
                    <Flex direction="column" gap="3">
                        {table.getRowModel().rows.map(row => (
                            <Card key={row.id} size="2">
                                <Flex direction="column" gap="2">
                                    {/* Header de la card con selección y primera columna principal */}
                                    <Flex justify="between" align="center">
                                        <Flex align="center" gap="3">
                                            {enableRowSelection && <TanStackSelectCheckbox row={row} />}
                                            {/* Mostramos la primera columna visible como "título" de la card */}
                                            {row.getVisibleCells().slice(0, 1).map(cell => (
                                                <Strong key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Strong>
                                            ))}
                                        </Flex>
                                        {enableExpanding && (
                                            <IconButton
                                                variant="ghost"
                                                size="1"
                                                onClick={row.getToggleExpandedHandler()}
                                            >
                                                {row.getIsExpanded() ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </IconButton>
                                        )}
                                    </Flex>

                                    <Separator size="4" />

                                    {/* Resto de columnas como pares clave-valor (excluyendo actions) */}
                                    <Flex direction="column" gap="2">
                                        {row.getVisibleCells().slice(1).filter(cell => cell.column.id !== 'actions').map(cell => (
                                            <Flex key={cell.id} justify="between" align="center" gap="2">
                                                <Text size="2" color="gray" weight="medium">
                                                    {cell.column.columnDef.header}:
                                                </Text>
                                                <Text size="2" align="right">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Text>
                                            </Flex>
                                        ))}
                                    </Flex>

                                    {/* Acciones full width al final */}
                                    {row.getVisibleCells().find(cell => cell.column.id === 'actions') && (
                                        <Box mt="2" style={{ width: '100%' }}>
                                            <Separator size="4" mb="2" />
                                            <Flex justify="end" style={{ width: '100%' }}>
                                                {flexRender(
                                                    row.getVisibleCells().find(cell => cell.column.id === 'actions').column.columnDef.cell,
                                                    row.getVisibleCells().find(cell => cell.column.id === 'actions').getContext()
                                                )}
                                            </Flex>
                                        </Box>
                                    )}

                                    {/* Contenido expandido en móvil */}
                                    {enableExpanding && row.getIsExpanded() && (
                                        <>
                                            <Separator size="4" />
                                            <Box p="2" style={{ backgroundColor: 'var(--gray-3)', borderRadius: 'var(--radius-2)' }}>
                                                <Flex direction="column" gap="2">
                                                    <Text size="2" weight="bold" color="accent">Detalles adicionales:</Text>
                                                    {Object.entries(row.original).map(([key, value]) => (
                                                        <Flex key={key} justify="between" gap="2">
                                                            <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>{key}:</Text>
                                                            <Text size="1">{String(value)}</Text>
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            </Box>
                                        </>
                                    )}
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                )}
            </Box>
        </Box>
    );
};

export default TanStackTable;
