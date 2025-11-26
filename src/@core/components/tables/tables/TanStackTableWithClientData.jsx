import React, { useState, useMemo } from 'react';
import { Flex } from '@radix-ui/themes';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel
} from '@tanstack/react-table';
import TableContainer from '../components/TableContainer';
import TableHeader from '../components/TableHeader';
import {
    TanStackTable,
    TanStackPagination,
    TanStackSearchInput,
    TanStackColumnVisibility
} from '../components/tanstack';

/**
 * Componente de tabla con TanStack Table para datos del lado del cliente
 * Integra con los componentes existentes del sistema (TableContainer, TableHeader)
 * y usa los componentes específicos de TanStack para renderizado
 */
const TanStackTableWithClientData = ({
    data = [],
    columns = [],
    title,
    titleComponent,
    titleIcon,
    iconThemeClass,
    showSearch = true,
    showPagination = true,
    showColumnVisibility = true,
    initialPageSize = 10,
    pageSizeOptions = [10, 20, 50, 100],
    customClassCard = "",
    customClassCardBody = "",
    searchPlaceholder = "Buscar en todos los campos...",
    ...props
}) => {
    const [globalFilter, setGlobalFilter] = useState('');

    // Crear instancia de TanStack Table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageSize: initialPageSize,
            },
        },
    });

    // Controles superiores (búsqueda y visibilidad de columnas)
    const controls = (
        <Flex gap="2" align="center" style={{ width: '100%' }}>
            {showSearch && (
                <TanStackSearchInput
                    value={globalFilter}
                    onChange={setGlobalFilter}
                    resultCount={table.getFilteredRowModel().rows.length}
                    placeholder={searchPlaceholder}
                />
            )}
            {showColumnVisibility && (
                <TanStackColumnVisibility table={table} />
            )}
        </Flex>
    );

    return (
        <TableContainer
            customClassCard={customClassCard}
            customClassCardBody={customClassCardBody}
            header={
                <TableHeader
                    title={title}
                    titleComponent={titleComponent}
                    titleIcon={titleIcon}
                    iconThemeClass={iconThemeClass}
                />
            }
            controls={controls}
            table={
                <Flex direction="column" gap="3">
                    <TanStackTable table={table} />
                    {showPagination && (
                        <TanStackPagination
                            table={table}
                            pageSizeOptions={pageSizeOptions}
                        />
                    )}
                </Flex>
            }
        />
    );
};

export default TanStackTableWithClientData;
