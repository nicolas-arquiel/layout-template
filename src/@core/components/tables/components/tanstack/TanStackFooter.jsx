import React from 'react';
import { Flex, Text, Button, IconButton, Select } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * Componente de pie de página para la tabla TanStack
 * Incluye información de paginación, controles de navegación y selector de filas por página
 */
const TanStackFooter = ({
    table,
    dataLength,
    rowsPerPageOptions = [5, 10, 20, 50],
    enablePagination = true
}) => {
    const selectedCount = table.getSelectedRowModel().rows.length;
    const { pageIndex, pageSize } = table.getState().pagination;

    return (
        <Flex justify="between" align="center" wrap="wrap" gap="4" mt="4">
            <Text size="2" color="gray">
                {selectedCount > 0 && <span>{selectedCount} fila(s) seleccionada(s). </span>}
                Mostrando {dataLength === 0 ? 0 : pageIndex * pageSize + 1} a{" "}
                {Math.min((pageIndex + 1) * pageSize, dataLength)} de {dataLength}
            </Text>

            <Flex align="center" gap="2">
                {enablePagination && (
                    <>
                        <IconButton
                            variant="outline"
                            size="1"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronsLeft size={16} />
                        </IconButton>

                        <IconButton
                            variant="outline"
                            size="1"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft size={16} />
                        </IconButton>

                        <Flex align="center" gap="2">
                            <Text size="2" color="gray">Página</Text>
                            <Text size="2" weight="medium">{pageIndex + 1}</Text>
                            <Text size="2" color="gray">de</Text>
                            <Text size="2" weight="medium">{table.getPageCount()}</Text>
                        </Flex>

                        <IconButton
                            variant="outline"
                            size="1"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight size={16} />
                        </IconButton>

                        <IconButton
                            variant="outline"
                            size="1"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight size={16} />
                        </IconButton>

                        <Flex align="center" gap="2" ml="4" pl="4" style={{ borderLeft: '1px solid var(--gray-6)' }}>
                            <Text size="2" color="gray">Filas por página:</Text>
                            <Select.Root
                                value={String(pageSize)}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value))
                                }}
                            >
                                <Select.Trigger variant="surface" />
                                <Select.Content>
                                    {rowsPerPageOptions.map((size) => (
                                        <Select.Item key={size} value={String(size)}>
                                            {size}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default TanStackFooter;
