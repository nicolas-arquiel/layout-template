import React, { useState, useEffect } from 'react';
import { Flex, TextField, Select, IconButton, Button, Badge, Box } from '@radix-ui/themes';
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

    const [localValue, setLocalValue] = useState(globalFilter ?? '');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Sincronizar estado local si cambia desde fuera
    useEffect(() => {
        setLocalValue(globalFilter ?? '');
    }, [globalFilter]);

    const handleSearch = () => {
        console.log("localValue---> ", localValue);
        setGlobalFilter(localValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClear = () => {
        setLocalValue('');
        setGlobalFilter('');
    };

    const handleChange = (e) => {
        if (e.target.value === '') {
            handleClear();
        }
        setLocalValue(e.target.value);
    };

    const availableColumns = table
        .getAllLeafColumns()
        .filter((col) => col.id !== "select" && col.id !== "expand" && col.id !== "actions")
        .map((col) => ({
            id: col.id,
            name: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
        }));

    return (
        <Flex direction="column" gap="3" style={{ width: '100%' }}>
            {/* Selector de columna (fila completa en móvil) */}
            <Box style={{ width: isMobile ? '100%' : 'auto', display: isMobile ? 'block' : 'none' }}>
                <Select.Root value={searchColumn} onValueChange={setSearchColumn}>
                    <Select.Trigger style={{ width: '100%' }} placeholder="Buscar en..." />
                    <Select.Content>
                        <Select.Item value="all">Todas las columnas</Select.Item>
                        {availableColumns.map((col) => (
                            <Select.Item key={col.id} value={col.id}>
                                {col.name}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>
            </Box>

            <Flex gap="2" align="center" wrap="wrap" style={{ width: '100%' }}>
                {/* Selector de columna y búsqueda (desktop) */}
                <Flex align="center" gap="2" wrap="wrap" style={{ flex: 1, minWidth: isMobile ? '0' : '300px' }}>
                    {/* Selector solo visible en desktop */}
                    {!isMobile && (
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
                    )}

                    <div style={{ position: 'relative', minWidth: '300px', flex: isMobile ? 1 : 0 }}>
                        <TextField.Root
                            placeholder={searchPlaceholder}
                            value={localValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            style={{ width: '100%' }}
                        >
                            <TextField.Slot side="right">
                                <Flex gap="1" align="center">
                                    {localValue && (
                                        <IconButton
                                            variant="ghost"
                                            size="1"
                                            onClick={handleClear}
                                            style={{ color: 'var(--gray-10)', cursor: 'pointer' }}
                                        >
                                            <X size={14} />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        variant="ghost"
                                        size="1"
                                        onClick={handleSearch}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Search size={16} />
                                    </IconButton>
                                </Flex>
                            </TextField.Slot>
                        </TextField.Root>
                    </div>
                </Flex>

                {/* Contenedor de botones (Filtros y Columnas) */}
                <Flex
                    gap="2"
                    align="center"
                    style={{
                        width: isMobile ? '100%' : 'auto',
                        marginTop: isMobile ? '8px' : '0'
                    }}
                >
                    {/* Botón de filtros o Popover según el modo */}
                    {filterDisplayMode === 'popover' ? (
                        <Box style={{ flex: isMobile ? 2 : '0 0 auto' }}>
                            <TanStackAdvanceFilter
                                mode="popover"
                                data={data}
                                table={table}
                                {...advancedFilterState}
                            />
                        </Box>
                    ) : (
                        <Button
                            variant={showAdvancedFilters || advancedFilterState.hasActiveFilters ? "solid" : "outline"}
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            style={{ cursor: 'pointer', flex: isMobile ? 2 : '0 0 auto' }}
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
                        <Box style={{ flex: isMobile ? 1 : '0 0 auto' }}>
                            <TanStackColumnVisibility table={table} />
                        </Box>
                    )}
                </Flex>
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