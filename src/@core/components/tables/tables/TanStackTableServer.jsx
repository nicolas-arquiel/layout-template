import React, { useEffect } from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel
} from '@tanstack/react-table';
import TableContainer from '../components/TableContainer';
import TableHeader from '../components/TableHeader';
import {
    TanStackTable,
    TanStackFooter,
    TanStackToolbar
} from '../components/tanstack';

/**
 * Componente de tabla TanStack para datos del servidor (RTK Query, etc.)
 * Delega el control del estado al hook useTanStackQuery o similar.
 * 
 * @param {Object} helpers - Objeto retornado por useTanStackQuery { state, queryParams, ...handlers }
 * @param {Array} data - Datos de la página actual
 * @param {number} rowCount - Cantidad total de registros en el servidor
 * @param {boolean} isLoading - Estado de carga
 */
const TanStackTableServer = ({
    data = [],
    columns = [],
    rowCount = 0,
    isLoading = false,
    helpers, // Retorno de useTanStackQuery
    title,
    titleComponent,
    titleIcon,
    iconThemeClass,
    showSearch = true,
    showPagination = true,
    showColumnVisibility = true,
    enableRowSelection = true,
    enableExpanding = false,
    pageSizeOptions = [10, 20, 50, 100],
    customClassCard = "",
    customClassCardBody = "",
    searchPlaceholder = "Buscar...",
    filterDisplayMode = "inline",
    onRowSelectionChange,
    ...props
}) => {
    // Extraer estado y handlers del helper
    const {
        state,
        onPaginationChange,
        onSortingChange,
        onColumnFiltersChange,
        onGlobalFilterChange,
        onRowSelectionChange: onRowSelectionChangeInternal,
        onExpandedChange,
        searchColumn,
        setSearchColumn
    } = helpers;

    // Configurar TanStack Table en modo manual (server-side)
    const table = useReactTable({
        data,
        columns,
        rowCount, // Necesario para paginación server-side
        state: state,

        // Modos manuales activados
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,

        // Handlers conectados a nuestro hook
        onPaginationChange,
        onSortingChange,
        onColumnFiltersChange,
        onGlobalFilterChange,
        onRowSelectionChange: onRowSelectionChangeInternal,
        onExpandedChange,

        // Modelos core
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),

        // Configuración extra
        enableRowSelection,
        enableExpanding,
        getRowCanExpand: () => true,

        // Lógica de filtro global (solo visual aquí, el filtro real lo hace el server)
        // Mantenemos la lógica de searchColumn para coherencia visual/UI
        getColumnCanGlobalFilter: (column) => {
            if (searchColumn !== 'all' && column.id !== searchColumn) {
                return false;
            }
            return true;
        },
    });

    // Notificar selección al padre si es necesario
    useEffect(() => {
        if (enableRowSelection && onRowSelectionChange) {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            onRowSelectionChange(selectedRows);
        }
    }, [state.rowSelection, enableRowSelection, onRowSelectionChange, table]);

    const selectedRowsCount = Object.keys(state.rowSelection).length;

    // Controles superiores
    const controls = (
        <Flex direction="column" gap="2" style={{ width: '100%' }}>
            <TanStackToolbar
                table={table}
                globalFilter={state.globalFilter}
                setGlobalFilter={onGlobalFilterChange}
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                // Filtros avanzados (el estado ya viene en helpers)
                // Nota: TanStackToolbar espera gestionar showAdvancedFilters internamente o por props
                // Aquí usamos props simples, o podríamos extender el hook para esto.
                // Por simplicidad, dejamos que el Toolbar maneje su UI toggle localmente si no se pasa
                showColumnVisibility={showColumnVisibility}
                searchPlaceholder={searchPlaceholder}
                data={data}
                filterDisplayMode={filterDisplayMode}
            />
            {enableRowSelection && selectedRowsCount > 0 && (
                <Badge size="2" color="blue" variant="soft" style={{ alignSelf: 'flex-start' }}>
                    <Text size="2" weight="medium">
                        {selectedRowsCount} seleccionados
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
                        isLoading={isLoading}
                        {...props}
                    />
                    <TanStackFooter
                        table={table}
                        dataLength={rowCount} // Usar el total del servidor
                        rowsPerPageOptions={pageSizeOptions}
                        enablePagination={showPagination}
                    />
                </Flex>
            }
        />
    );
};

export default TanStackTableServer;
