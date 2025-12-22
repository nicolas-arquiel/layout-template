import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Flex,
    Box,
    Text,
    Button,
    Select,
    TextField,
    IconButton,
    Popover,
    Dialog,
    Badge
} from '@radix-ui/themes';
import { Filter, Plus, Trash2, X, Calendar as CalendarIcon, Columns } from 'lucide-react';
import TanStackInputSelect from './TanStackInputSelect';

/**
 * Tipos de operadores disponibles según el tipo de columna
 */
const operators = {
    text: [
        { value: 'contains', label: 'Contiene' },
        { value: '=', label: 'Igual' },
        { value: '!=', label: 'Distinto' },
        { value: 'startsWith', label: 'Empieza con' },
        { value: 'endsWith', label: 'Termina con' },
    ],
    number: [
        { value: '=', label: '=' },
        { value: '!=', label: '!=' },
        { value: '>', label: '>' },
        { value: '<', label: '<' },
        { value: '>=', label: '>=' },
        { value: '<=', label: '<=' },
    ],
    date: [
        { value: '=', label: 'Igual' },
        { value: '!=', label: 'Distinto' },
        { value: '>', label: 'Después' },
        { value: '<', label: 'Antes' },
        { value: '>=', label: 'Desde' },
        { value: '<=', label: 'Hasta' },
        { value: 'between', label: 'Entre (Rango)' },
    ],
    boolean: [{ value: '=', label: 'Es' }],
};

/**
 * Detecta el tipo de columna basándose en los datos
 * @param {Array} data - Array de datos de la tabla
 * @param {string} columnId - ID de la columna
 * @returns {'text' | 'number' | 'date' | 'boolean'}
 */
const getColumnType = (data, columnId) => {
    const value = data.find((d) => d[columnId] != null)?.[columnId];
    if (typeof value === 'number') return 'number';
    if (value instanceof Date) return 'date';
    if (typeof value === 'string' && !isNaN(Date.parse(value)) && value.includes('-') && value.length >= 10) return 'date';
    if (typeof value === 'boolean') return 'boolean';
    return 'text';
};

/**
 * Función de filtrado inteligente para TanStack Table
 * Soporta múltiples operadores y tipos de datos
 */
export const smartFilterFn = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId);

    if (!filterValue) return true;

    const conditions = Array.isArray(filterValue) ? filterValue : [filterValue];

    return conditions.every(condition => {
        let operator = 'contains';
        let value = condition;

        if (typeof condition === 'object' && condition !== null) {
            operator = condition.operator || 'contains';
            value = condition.value;
        } else if (typeof condition === 'string') {
            const match = condition.match(/^(=|!=|<>|>=|<=|>|<|contains|startsWith|endsWith)\s*(.+)$/);
            if (match) {
                operator = match[1];
                value = match[2].trim();
            }
        }

        if (value === undefined || value === null || value === '') return true;

        // Manejo de Fechas (Rango)
        if (operator === 'between' && typeof value === 'object' && value.from) {
            const dateCell = new Date(cellValue);
            if (isNaN(dateCell.getTime())) return false;

            const from = new Date(value.from);
            const to = value.to ? new Date(value.to) : from;

            dateCell.setHours(0, 0, 0, 0);
            from.setHours(0, 0, 0, 0);
            if (value.to) to.setHours(0, 0, 0, 0);

            if (value.to) {
                return dateCell >= from && dateCell <= to;
            }
            return dateCell >= from;
        }

        // Manejo de Fechas (Operadores simples)
        if (cellValue instanceof Date || (typeof cellValue === 'string' && !isNaN(Date.parse(cellValue)) && cellValue.includes('-'))) {
            const dateCell = new Date(cellValue);
            const dateValue = new Date(value);
            dateCell.setHours(0, 0, 0, 0);
            dateValue.setHours(0, 0, 0, 0);

            if (!isNaN(dateCell.getTime()) && !isNaN(dateValue.getTime())) {
                switch (operator) {
                    case '=': return dateCell.getTime() === dateValue.getTime();
                    case '!=': return dateCell.getTime() !== dateValue.getTime();
                    case '>': return dateCell > dateValue;
                    case '<': return dateCell < dateValue;
                    case '>=': return dateCell >= dateValue;
                    case '<=': return dateCell <= dateValue;
                }
            }
        }

        // Manejo de números
        const numCell = Number(cellValue);
        const numValue = Number(value);
        const isNum = !isNaN(numCell) && !isNaN(numValue) && value !== '' && operator !== 'contains' && operator !== 'startsWith' && operator !== 'endsWith';

        if (isNum) {
            switch (operator) {
                case '=': return numCell === numValue;
                case '!=': return numCell !== numValue;
                case '>': return numCell > numValue;
                case '<': return numCell < numValue;
                case '>=': return numCell >= numValue;
                case '<=': return numCell <= numValue;
            }
        }

        // Manejo de strings
        const strCell = String(cellValue).toLowerCase();
        const strValue = String(value).toLowerCase();

        switch (operator) {
            case '=': return strCell === strValue;
            case '!=': return strCell !== strValue;
            case 'contains': return strCell.includes(strValue);
            case 'startsWith': return strCell.startsWith(strValue);
            case 'endsWith': return strCell.endsWith(strValue);
        }

        return true;
    });
};

/**
 * Formatea una fecha para mostrar
 * @param {Date|string} date - Fecha a formatear
 * @returns {string}
 */
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

/**
 * Formatea una fecha para input type="date"
 * @param {Date|string} date - Fecha a formatear
 * @returns {string}
 */
const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
};

/**
 * Componente de filtro individual
 */
const FilterRow = ({
    filter,
    availableColumns,
    data,
    onUpdate,
    onRemove
}) => {
    const colType = getColumnType(data, filter.columnId);
    const columnOperators = operators[colType] || operators.text;

    return (
        <Box
            p="3"
            style={{
                backgroundColor: 'var(--gray-2)',
                borderRadius: 'var(--radius-2)',
                border: '1px solid var(--gray-5)'
            }}
        >
            <Flex gap="2" align="end" wrap="wrap">
                {/* Selector de Columna */}
                <Box style={{ minWidth: '150px', flex: '1 1 150px' }}>
                    <Text as="label" size="1" color="gray" weight="medium" mb="1" style={{ display: 'block' }}>
                        Columna
                    </Text>
                    <TanStackInputSelect
                        placeholder="Seleccionar columna..."
                        options={availableColumns.map(col => ({ label: col.name, value: col.id }))}
                        value={filter.columnId}
                        onChange={(val) => onUpdate(filter.id, 'columnId', val)}
                        multiple={false}
                        style={{ width: '100%' }}
                    />
                </Box>

                {/* Selector de Operador */}
                <Box style={{ minWidth: '130px', flex: '1 1 130px' }}>
                    <Text as="label" size="1" color="gray" weight="medium" mb="1" style={{ display: 'block' }}>
                        Operador
                    </Text>
                    <Select.Root
                        value={filter.operator}
                        onValueChange={(val) => onUpdate(filter.id, 'operator', val)}
                    >
                        <Select.Trigger style={{ width: '100%' }} />
                        <Select.Content>
                            {columnOperators.map((op) => (
                                <Select.Item key={op.value} value={op.value}>
                                    {op.label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </Box>

                {/* Input de Valor */}
                <Box style={{ minWidth: '180px', flex: '2 1 180px' }}>
                    <Text as="label" size="1" color="gray" weight="medium" mb="1" style={{ display: 'block' }}>
                        Valor
                    </Text>
                    {colType === 'date' ? (
                        filter.operator === 'between' ? (
                            <Flex gap="2" align="center">
                                <TextField.Root
                                    type="date"
                                    value={formatDateForInput(filter.value?.from)}
                                    onChange={(e) => onUpdate(filter.id, 'value', {
                                        ...filter.value,
                                        from: e.target.value ? new Date(e.target.value) : null
                                    })}
                                    style={{ flex: 1 }}
                                />
                                <Text size="2" color="gray">-</Text>
                                <TextField.Root
                                    type="date"
                                    value={formatDateForInput(filter.value?.to)}
                                    onChange={(e) => onUpdate(filter.id, 'value', {
                                        ...filter.value,
                                        to: e.target.value ? new Date(e.target.value) : null
                                    })}
                                    style={{ flex: 1 }}
                                />
                            </Flex>
                        ) : (
                            <TextField.Root
                                type="date"
                                value={formatDateForInput(filter.value)}
                                onChange={(e) => onUpdate(filter.id, 'value', e.target.value ? new Date(e.target.value) : '')}
                                style={{ width: '100%' }}
                            />
                        )
                    ) : colType === 'boolean' ? (
                        <Select.Root
                            value={filter.value?.toString() || ''}
                            onValueChange={(val) => onUpdate(filter.id, 'value', val === 'true')}
                        >
                            <Select.Trigger style={{ width: '100%' }} placeholder="Seleccionar..." />
                            <Select.Content>
                                <Select.Item value="true">Sí</Select.Item>
                                <Select.Item value="false">No</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    ) : (
                        <TextField.Root
                            type={colType === 'number' ? 'number' : 'text'}
                            placeholder="Valor..."
                            value={filter.value || ''}
                            onChange={(e) => onUpdate(filter.id, 'value', e.target.value)}
                            style={{ width: '100%' }}
                        >
                            {filter.value && (
                                <TextField.Slot side="right">
                                    <IconButton
                                        variant="ghost"
                                        size="1"
                                        onClick={() => onUpdate(filter.id, 'value', '')}
                                    >
                                        <X size={12} />
                                    </IconButton>
                                </TextField.Slot>
                            )}
                        </TextField.Root>
                    )}
                </Box>

                {/* Botón eliminar */}
                <IconButton
                    color="red"
                    variant="soft"
                    onClick={() => onRemove(filter.id)}
                    style={{ flexShrink: 0 }}
                >
                    <Trash2 size={16} />
                </IconButton>
            </Flex>
        </Box>
    );
};

/**
 * Contenido principal del filtro avanzado
 */
const FilterContent = ({
    filters,
    availableColumns,
    data,
    onAddFilter,
    onUpdateFilter,
    onRemoveFilter,
    onClearFilters,
    onApplyFilters
}) => {
    return (
        <Box
            p="4"
            style={{
                backgroundColor: 'var(--gray-1)',
                borderRadius: 'var(--radius-3)',
                border: '1px solid var(--accent-6)',
                boxShadow: 'var(--shadow-3)'
            }}
        >
            {/* Header */}
            <Flex justify="between" align="center" mb="3">
                <Flex align="center" gap="2">
                    <Filter size={16} style={{ color: 'var(--accent-9)' }} />
                    <Text size="2" weight="bold">Filtros Avanzados</Text>
                </Flex>
                {filters.length > 0 && (
                    <Button
                        variant="ghost"
                        size="1"
                        color="red"
                        onClick={onClearFilters}
                    >
                        <X size={14} />
                        Limpiar
                    </Button>
                )}
            </Flex>

            {/* Lista de filtros */}
            <Flex direction="column" gap="2" mb="3">
                {filters.length === 0 ? (
                    <Box
                        p="4"
                        style={{
                            textAlign: 'center',
                            border: '2px dashed var(--gray-6)',
                            borderRadius: 'var(--radius-2)',
                            backgroundColor: 'var(--gray-2)'
                        }}
                    >
                        <Text size="2" color="gray">
                            No hay filtros configurados. Agrega uno para comenzar.
                        </Text>
                    </Box>
                ) : (
                    filters.map((filter) => (
                        <FilterRow
                            key={filter.id}
                            filter={filter}
                            availableColumns={availableColumns}
                            data={data}
                            onUpdate={onUpdateFilter}
                            onRemove={onRemoveFilter}
                        />
                    ))
                )}
            </Flex>

            {/* Acciones */}
            <Flex justify="between" align="center" pt="3" style={{ borderTop: '1px solid var(--gray-5)' }}>
                <Button variant="surface" onClick={onAddFilter}>
                    <Plus size={16} />
                    Agregar Filtro
                </Button>
                <Button onClick={onApplyFilters}>
                    Aplicar Filtros
                </Button>
            </Flex>
        </Box>
    );
};

/**
 * Hook para manejar el estado de los filtros avanzados
 * @param {Object} options
 * @param {Array} options.data - Datos de la tabla
 * @param {Object} options.table - Instancia de TanStack Table
 * @param {Function} options.onFiltersChange - Callback cuando cambian los filtros aplicados
 */
export const useAdvancedFilters = ({ data = [], table, onFiltersChange }) => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [draftFilters, setDraftFilters] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Columnas disponibles para filtrar
    const availableColumns = useMemo(() => {
        if (!table) return [];
        return table
            .getAllLeafColumns()
            .filter((col) => col.id !== 'select' && col.id !== 'expand' && col.id !== 'actions')
            .map((col) => ({
                id: col.id,
                name: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
            }));
    }, [table]);

    // Sincronizar filtros activos con la tabla
    useEffect(() => {
        if (!table) return;

        const newColumnFilters = activeFilters.reduce((acc, filter) => {
            const existing = acc.find((f) => f.id === filter.columnId);
            const condition = { operator: filter.operator, value: filter.value };

            if (existing) {
                if (Array.isArray(existing.value)) {
                    existing.value.push(condition);
                } else {
                    existing.value = [existing.value, condition];
                }
            } else {
                acc.push({ id: filter.columnId, value: condition });
            }
            return acc;
        }, []);

        table.setColumnFilters(newColumnFilters);
        onFiltersChange?.(activeFilters);
    }, [activeFilters, table, onFiltersChange]);

    // Sincronizar draft con active cuando se abre
    useEffect(() => {
        if (isOpen) {
            setDraftFilters([...activeFilters]);
        }
    }, [isOpen, activeFilters]);

    const addFilter = useCallback(() => {
        const firstColumn = availableColumns[0]?.id;
        if (!firstColumn) return;

        const colType = getColumnType(data, firstColumn);
        const defaultOperator = operators[colType][0].value;

        const newFilter = {
            id: Math.random().toString(36).substr(2, 9),
            columnId: firstColumn,
            operator: defaultOperator,
            value: '',
        };

        setDraftFilters(prev => [...prev, newFilter]);
    }, [availableColumns, data]);

    const removeFilter = useCallback((id) => {
        setDraftFilters(prev => prev.filter((f) => f.id !== id));
    }, []);

    const updateFilter = useCallback((id, field, value) => {
        setDraftFilters(prev => prev.map((f) => {
            if (f.id === id) {
                const newFilter = { ...f, [field]: value };

                // Si cambia la columna, resetear operador y valor
                if (field === 'columnId') {
                    const newColType = getColumnType(data, value);
                    newFilter.operator = operators[newColType][0].value;
                    newFilter.value = '';
                }

                return newFilter;
            }
            return f;
        }));
    }, [data]);

    const clearFilters = useCallback(() => {
        setDraftFilters([]);
    }, []);

    const applyFilters = useCallback(() => {
        setActiveFilters([...draftFilters]);
        setIsOpen(false);
    }, [draftFilters]);

    const clearActiveFilters = useCallback(() => {
        setActiveFilters([]);
        setDraftFilters([]);
    }, []);

    return {
        activeFilters,
        draftFilters,
        isOpen,
        setIsOpen,
        availableColumns,
        addFilter,
        removeFilter,
        updateFilter,
        clearFilters,
        applyFilters,
        clearActiveFilters,
        hasActiveFilters: activeFilters.length > 0,
    };
};

/**
 * Componente de Filtro Avanzado para TanStack Table
 * Puede usarse en modo inline o popover
 * 
 * @example
 * // Uso con hook
 * const filterState = useAdvancedFilters({ data, table });
 * 
 * <TanStackAdvanceFilter
 *   mode="popover"
 *   {...filterState}
 * />
 * 
 * @example
 * // Uso directo (mode inline)
 * <TanStackAdvanceFilter
 *   mode="inline"
 *   data={data}
 *   table={table}
 *   show={showFilters}
 * />
 */
const TanStackAdvanceFilter = ({
    mode = 'inline',
    data = [],
    table,
    // Props del hook (cuando se usa externamente)
    draftFilters = [],
    availableColumns = [],
    isOpen = false,
    setIsOpen,
    addFilter,
    updateFilter,
    removeFilter,
    clearFilters,
    applyFilters,
    hasActiveFilters = false,
    activeFilters = [],
    // Props para modo inline
    show = true,
}) => {
    // Si no se pasan las funciones del hook, usar estado interno
    const internalState = useAdvancedFilters({ data, table });

    const state = addFilter ? {
        draftFilters,
        availableColumns,
        isOpen,
        setIsOpen,
        addFilter,
        updateFilter,
        removeFilter,
        clearFilters,
        applyFilters,
        hasActiveFilters,
        activeFilters,
    } : internalState;

    // Detectar si es móvil (menos de 768px)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filterContent = (
        <FilterContent
            filters={state.draftFilters}
            availableColumns={state.availableColumns}
            data={data}
            onAddFilter={state.addFilter}
            onUpdateFilter={state.updateFilter}
            onRemoveFilter={state.removeFilter}
            onClearFilters={state.clearFilters}
            onApplyFilters={state.applyFilters}
        />
    );

    if (mode === 'popover') {
        const triggerButton = (
            <Button
                variant={state.hasActiveFilters ? 'solid' : 'outline'}
                style={{ cursor: 'pointer' }}
                onClick={() => state.setIsOpen(true)}
            >
                <Filter size={16} />
                Filtros
                {state.hasActiveFilters && (
                    <Badge size="1" color="gray" variant="solid" ml="1">
                        {state.activeFilters.length}
                    </Badge>
                )}
            </Button>
        );

        if (isMobile) {
            return (
                <Dialog.Root open={state.isOpen} onOpenChange={state.setIsOpen}>
                    <Dialog.Trigger>
                        {triggerButton}
                    </Dialog.Trigger>
                    <Dialog.Content style={{
                        width: '95vw',
                        maxWidth: '100vw',
                        height: '90vh',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Flex justify="between" align="center" mb="2">
                            <Dialog.Title>Filtros Avanzados</Dialog.Title>
                            <Dialog.Close>
                                <IconButton variant="ghost" color="gray">
                                    <X size={18} />
                                </IconButton>
                            </Dialog.Close>
                        </Flex>
                        <Box style={{ flex: 1, overflowY: 'auto' }}>
                            {filterContent}
                        </Box>
                    </Dialog.Content>
                </Dialog.Root>
            );
        }

        return (
            <Popover.Root open={state.isOpen} onOpenChange={state.setIsOpen}>
                <Popover.Trigger>
                    {triggerButton}
                </Popover.Trigger>
                <Popover.Content
                    side="bottom"
                    align="end"
                    style={{ width: '700px', maxWidth: '90vw' }}
                >
                    {filterContent}
                </Popover.Content>
            </Popover.Root>
        );
    }

    // Modo inline
    if (!show) return null;

    return filterContent;
};

export default TanStackAdvanceFilter;