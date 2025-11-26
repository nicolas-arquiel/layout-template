import React from 'react';
import { Flex, Button, Text, Select } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

/**
 * Componente de paginación para TanStack Table
 * Controles completos de navegación y selector de tamaño de página
 */
const TanStackPagination = ({
    table,
    pageSizeOptions = [10, 20, 50, 100]
}) => {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageCount = table.getPageCount();

    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

    // Generar array de páginas a mostrar   
    const getPageNumbers = () => {
        const pages = [];
        const pageRangeDisplayed = 2;
        const maxVisible = pageRangeDisplayed * 2 + 1;

        if (pageCount <= maxVisible + 2) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(i);
            }
        } else {
            // Siempre mostrar la primera página
            pages.push(0);

            let startPage = Math.max(1, pageIndex - pageRangeDisplayed);
            let endPage = Math.min(pageCount - 2, pageIndex + pageRangeDisplayed);

            // Ajustar si estamos cerca del inicio
            if (pageIndex < pageRangeDisplayed + 2) {
                endPage = Math.min(pageCount - 2, maxVisible - 1);
                startPage = 1;
            }

            // Ajustar si estamos cerca del final
            if (pageIndex > pageCount - pageRangeDisplayed - 3) {
                startPage = Math.max(1, pageCount - maxVisible);
                endPage = pageCount - 2;
            }

            // Agregar "..." si es necesario
            if (startPage > 1) {
                pages.push('...');
            }

            // Agregar páginas del rango
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Agregar "..." si es necesario
            if (endPage < pageCount - 2) {
                pages.push('...');
            }

            // Siempre mostrar la última página
            pages.push(pageCount - 1);
        }

        return pages;
    };

    if (pageCount < 1) return null;

    return (
        <Flex direction="column" gap="3">
            {/* Row Count Info */}
            <Flex justify="between" align="center">
                <Text size="2" color="gray">
                    Mostrando {startRow} a {endRow} de {totalRows} registros
                </Text>
            </Flex>

            {/* Pagination Buttons with Page Size Selector */}
            <Flex justify="end" align="center" gap="2">
                {/* Page Size Selector */}
                <Flex gap="2" align="center">
                    <Text size="2" color="gray">Filas por página:</Text>
                    <Select.Root value={pageSize} onValueChange={(value) => table.setPageSize(Number(value))}>
                        <Select.Trigger color="indigo" variant="soft" />
                        <Select.Content>
                            <Select.Group>
                                {pageSizeOptions.map(size => (
                                    <Select.Item key={size} value={size}>
                                        {size}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Flex>
                {/* Navigation Buttons */}
                <Flex gap="1" align="center">
                    {/* First Page Button */}
                    <Button
                        size="1"
                        variant="ghost"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        style={{ minWidth: '32px' }}
                    >
                        <DoubleArrowLeftIcon />
                    </Button>

                    {/* Previous Page Button */}
                    <Button
                        size="1"
                        variant="ghost"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        style={{ minWidth: '32px' }}
                    >
                        <ChevronLeftIcon />
                    </Button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <Text key={`ellipsis-${index}`} size="1" mx="1">...</Text>
                        ) : (
                            <Button
                                key={page}
                                size="1"
                                variant={pageIndex === page ? "solid" : "ghost"}
                                onClick={() => table.setPageIndex(page)}
                                style={{ minWidth: '32px' }}
                            >
                                {page + 1}
                            </Button>
                        )
                    ))}

                    {/* Next Page Button */}
                    <Button
                        size="1"
                        variant="ghost"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        style={{ minWidth: '32px' }}
                    >
                        <ChevronRightIcon />
                    </Button>

                    {/* Last Page Button */}
                    <Button
                        size="1"
                        variant="ghost"
                        onClick={() => table.setPageIndex(pageCount - 1)}
                        disabled={!table.getCanNextPage()}
                        style={{ minWidth: '32px' }}
                    >
                        <DoubleArrowRightIcon />
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default TanStackPagination;
