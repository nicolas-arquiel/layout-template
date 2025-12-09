import React, { useState, useMemo } from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel
} from '@tanstack/react-table';
import TableContainer from '../components/TableContainer';
import TableHeader from '../components/TableHeader';
import {
    TanStackTable,
    TanStackFooter,
    TanStackToolbar
} from '../components/tanstack';
import { smartFilterFn } from '../components/tanstack/TanStackAdvanceFilter';

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
 * // Con filtros avanzados en modo popover
 * <TanStackTableWithClientData
 *   data={data}
 *   columns={columns}
 *   title="Usuarios"
 *   filterDisplayMode="popover"
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
 * @param {boolean} enableExpanding - Habilita la funcionalidad de filas colapsables
 * @param {'inline' | 'popover'} filterDisplayMode - Modo de visualización de filtros avanzados
 * @param {function} onFiltersChange - Callback cuando cambian los filtros avanzados aplicados
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
    enableExpanding = false,
    onRowSelectionChange,
    initialPageSize = 10,
    pageSizeOptions = [10, 20, 50, 100],
    customClassCard = "",
    customClassCardBody = "",
    searchPlaceholder = "Buscar en todos los campos...",
    filterDisplayMode = "inline",
    onFiltersChange,
    ...props
}) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState({});
    const [expanded, setExpanded] = useState({});
    const [searchColumn, setSearchColumn] = useState('all');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [columnFilters, setColumnFilters] = useState([]);

    // Crear instancia de TanStack Table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        // Configurar función de filtrado inteligente
        filterFns: {
            smart: smartFilterFn,
        },
        defaultColumn: {
            filterFn: smartFilterFn,
        },
        state: {
            globalFilter,
            rowSelection,
            expanded,
            columnFilters,
        },
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onExpandedChange: setExpanded,
        onColumnFiltersChange: setColumnFilters,
        enableRowSelection: enableRowSelection,
        enableExpanding: enableExpanding,
        getRowCanExpand: () => true,
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
        <Flex direction="column" gap="2" style={{ width: '100%' }}>
            <TanStackToolbar
                table={table}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                showAdvancedFilters={showAdvancedFilters}
                setShowAdvancedFilters={setShowAdvancedFilters}
                showColumnVisibility={showColumnVisibility}
                searchPlaceholder={searchPlaceholder}
                data={data}
                filterDisplayMode={filterDisplayMode}
                onFiltersChange={onFiltersChange}
            />
            {/* Contador de registros seleccionados */}
            {enableRowSelection && selectedRowsCount > 0 && (
                <Badge size="2" color="blue" variant="soft" style={{ alignSelf: 'flex-start' }}>
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
                        enableExpanding={enableExpanding}
                    />
                    <TanStackFooter
                        table={table}
                        dataLength={data.length}
                        rowsPerPageOptions={pageSizeOptions}
                        enablePagination={showPagination}
                    />
                </Flex>
            }
        />
    );
};

export default TanStackTableWithClientData;