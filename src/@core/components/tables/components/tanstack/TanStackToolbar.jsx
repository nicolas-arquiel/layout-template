import React from 'react';
import { Flex, TextField, Select, IconButton, Button, Badge } from '@radix-ui/themes';
import { Search, X, Filter, Columns } from 'lucide-react';
import TanStackColumnVisibility from './TanStackColumnVisibility';
import TanStackAdvanceFilter, { useAdvancedFilters } from './TanStackAdvanceFilter';
import TanStackInputSelect from './TanStackInputSelect';

/**
 * Barra de herramientas para la tabla TanStack
 * Incluye selector de columna de búsqueda, input de búsqueda, filtros avanzados y configuración de visibilidad de columnas
 * 
 * @param {Object} table - Instancia de TanStack Table
 * @param {string} globalFilter - Valor del filtro global
 * @param {Function} setGlobalFilter - Setter del filtro global
 * @param {string} searchColumn - Columna seleccionada para búsqueda
 * @param {Function} setSearchColumn - Setter de columna de búsqueda
 * @param {boolean} showAdvancedFilters - Mostrar/ocultar filtros avanzados (modo inline)
 * @param {Function} setShowAdvancedFilters - Toggle de filtros avanzados
 * @param {boolean} showColumnVisibility - Mostrar botón de visibilidad de columnas
 * @param {string} searchPlaceholder - Placeholder del input de búsqueda
 * @param {Array} data - Datos de la tabla (necesario para filtros avanzados)
 * @param {'inline' | 'popover'} filterDisplayMode - Modo de visualización de filtros
 * @param {Function} onFiltersChange - Callback cuando cambian los filtros aplicados
 */
const TanStackToolbar = ({
    table,
    globalFilter,
    setGlobalFilter,
    searchColumn,
    setSearchColumn,
    showAdvancedFilters,
    setShowAdvancedFilters,
    showColumnVisibility = true,
    searchPlaceholder = "Escribe para buscar...",
    data = [],
    filterDisplayMode = 'inline',
    onFiltersChange,
}) => {
    // Hook para manejar filtros avanzados
    const advancedFilterState = useAdvancedFilters({
        data,
        table,
        onFiltersChange,
    });

    const availableColumns = table
        .getAllLeafColumns()
        .filter((col) => col.id !== "select" && col.id !== "expand" && col.id !== "actions")
        .map((col) => ({
            id: col.id,
            name: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
        }));

    return (
        <Flex direction="column" gap="3" style={{ width: '100%' }}>
            <Flex gap="2" align="center" wrap="wrap" style={{ width: '100%' }}>
                {/* Selector de columna y búsqueda */}
                <Flex align="center" gap="2" style={{ flex: 1, minWidth: '300px' }}>
                    <Select.Root value={searchColumn} onValueChange={setSearchColumn}>
                        <Select.Trigger style={{ width: '180px' }} placeholder="Buscar en..." />
                        <Select.Content>
                            <Select.Item value="all">Todas las columnas</Select.Item>
                            {availableColumns.map((col) => (
                                <Select.Item key={col.id} value={col.id}>
                                    {col.name}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>

                    <div style={{ position: 'relative', flex: 1 }}>
                        <TextField.Root
                            placeholder={searchPlaceholder}
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            style={{ width: '100%', paddingRight: '2.5rem' }}
                        >
                            <TextField.Slot>
                                <Search size={16} />
                            </TextField.Slot>
                        </TextField.Root>
                        {globalFilter && (
                            <IconButton
                                variant="ghost"
                                size="1"
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--gray-10)'
                                }}
                                onClick={() => setGlobalFilter('')}
                            >
                                <X size={14} />
                            </IconButton>
                        )}
                    </div>
                </Flex>

                {/* Botón de filtros o Popover según el modo */}
                {filterDisplayMode === 'popover' ? (
                    <TanStackAdvanceFilter
                        mode="popover"
                        data={data}
                        table={table}
                        {...advancedFilterState}
                    />
                ) : (
                    <Button
                        variant={showAdvancedFilters || advancedFilterState.hasActiveFilters ? "solid" : "outline"}
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Filter size={16} />
                        Filtros
                        {advancedFilterState.hasActiveFilters && (
                            <Badge size="1" color="gray" variant="solid" ml="1">
                                {advancedFilterState.activeFilters.length}
                            </Badge>
                        )}
                    </Button>
                )}

                {showColumnVisibility && (
                    <TanStackColumnVisibility table={table} />
                )}
            </Flex>

            {/* Filtros avanzados en modo inline */}
            {filterDisplayMode === 'inline' && showAdvancedFilters && (
                <TanStackAdvanceFilter
                    mode="inline"
                    data={data}
                    table={table}
                    show={showAdvancedFilters}
                    {...advancedFilterState}
                />
            )}
        </Flex>
    );
};

export default TanStackToolbar;