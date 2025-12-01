import React, { useState, useMemo } from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';
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
 * 
 * @example
 * // Uso básico
 * import { TanStackTableWithClientData } from '@core/components/tables';
 * import { createColumnHelper } from '@tanstack/react-table';
 * 
 * const columnHelper = createColumnHelper();
 * const columns = [
 *   columnHelper.accessor('id', {
 *     header: 'ID',
 *     cell: info => info.getValue(),
 *   }),
 *   // ... más columnas
 * ];
 * 
 * <TanStackTableWithClientData
 *   data={data}
 *   columns={columns}
 *   title="Usuarios"
 *   titleIcon={Users}
 *   showSearch={true}
 *   showPagination={true}
 * />
 * 
 * @example
 * // Con selección de filas
 * const [selectedRows, setSelectedRows] = useState([]);
 * 
 * <TanStackTableWithClientData
 *   data={data}
 *   columns={columns}
 *   title="Usuarios"
 *   enableRowSelection={true}
 *   onRowSelectionChange={(rows) => {
 *     setSelectedRows(rows);
 *     console.log('Filas seleccionadas:', rows);
 *   }}
 * />
 * 
 * @param {boolean} enableRowSelection - Habilita la selección de filas con checkboxes
 * @param {function} onRowSelectionChange - Callback que recibe las filas seleccionadas cuando cambia la selección
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
    enableRowSelection = true,
    onRowSelectionChange,
    initialPageSize = 10,
    pageSizeOptions = [10, 20, 50, 100],
    customClassCard = "",
    customClassCardBody = "",
    searchPlaceholder = "Buscar en todos los campos...",
    ...props
}) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState({});

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
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: enableRowSelection,
        initialState: {
            pagination: {
                pageSize: initialPageSize,
            },
        },
    });

    // Notificar al padre cuando cambia la selección
    React.useEffect(() => {
        if (enableRowSelection && onRowSelectionChange) {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            onRowSelectionChange(selectedRows);
        }
    }, [rowSelection, enableRowSelection, onRowSelectionChange, table]);

    // Obtener cantidad de filas seleccionadas
    const selectedRowsCount = table.getSelectedRowModel().rows.length;

    // Controles superiores (búsqueda, visibilidad de columnas y contador de selección)
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
            {/* Contador de registros seleccionados */}
            {enableRowSelection && selectedRowsCount > 0 && (
                <Badge size="2" color="blue" variant="soft">
                    <Text size="2" weight="medium">
                        {selectedRowsCount} {selectedRowsCount === 1 ? 'registro seleccionado' : 'registros seleccionados'}
                    </Text>
                </Badge>
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
                    <TanStackTable
                        table={table}
                        enableRowSelection={enableRowSelection}
                    />
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
