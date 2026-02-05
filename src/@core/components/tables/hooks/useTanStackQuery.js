import { useState, useMemo, useCallback } from 'react';

/**
 * Hook para manejar el estado de TanStack Table y generar parámetros de consulta para el backend.
 * Ideal para integrar con RTK Query.
 * 
 * @param {Object} initialState - Estado inicial opcional
 * @returns {Object} { state, handlers, queryParams }
 */
export const useTanStackQuery = (initialState = {}) => {
    // 1. Estados de la tabla
    const [pagination, setPagination] = useState(initialState.pagination ?? {
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState(initialState.sorting ?? []);
    const [columnFilters, setColumnFilters] = useState(initialState.columnFilters ?? []);
    const [globalFilter, setGlobalFilter] = useState(initialState.globalFilter ?? '');
    const [searchColumn, setSearchColumn] = useState(initialState.searchColumn ?? 'all');

    // Estos estados generalmente no afectan la query (seleccion/expansion), pero los gestionamos aquí por conveniencia
    const [rowSelection, setRowSelection] = useState({});
    const [expanded, setExpanded] = useState({});

    // 2. Generar objeto de query para RTK Query
    const queryParams = useMemo(() => {
        // Reducir filtros de columna a objeto simple
        const filters = columnFilters.reduce((acc, filter) => {
            // Manejar rangos (arrays) o valores simples
            acc[filter.id] = filter.value;
            return acc;
        }, {});

        // Manejar búsqueda global / específica
        const searchParams = {};
        if (globalFilter) {
            if (searchColumn !== 'all') {
                // Si hay columna seleccionada, se convierte en un filtro específico
                // Si ya existe un filtro para esa columna, el globalFilter tiene precedencia 
                // o se debería combinar (depende de la lógica de negocio, aquí reemplazamos)
                searchParams[searchColumn] = globalFilter;
            } else {
                // Búsqueda global
                searchParams.q = globalFilter;
            }
        }

        // Formato de ordenamiento (ej: "created_at:desc")
        // Puede adaptarse según lo que espere el backend
        let sortParam = undefined;
        if (sorting.length > 0) {
            sortParam = sorting.map(s => `${s.id}:${s.desc ? 'desc' : 'asc'}`).join(',');
        }

        return {
            page: pagination.pageIndex + 1, // API suele ser 1-indexed
            limit: pagination.pageSize,
            sort: sortParam,
            ...filters,
            ...searchParams,
        };
    }, [pagination, sorting, columnFilters, globalFilter, searchColumn]);

    // 3. Handlers para TanStack Table (onXChange)
    // TanStack pasa una función updater o el valor directamente
    const onPaginationChange = useCallback((updater) => {
        setPagination(old => typeof updater === 'function' ? updater(old) : updater);
    }, []);

    const onSortingChange = useCallback((updater) => {
        setSorting(old => typeof updater === 'function' ? updater(old) : updater);
    }, []);

    const onColumnFiltersChange = useCallback((updater) => {
        setColumnFilters(old => typeof updater === 'function' ? updater(old) : updater);
    }, []);

    const onGlobalFilterChange = useCallback((updater) => {
        setGlobalFilter(old => typeof updater === 'function' ? updater(old) : updater);
    }, []);

    return {
        // Estado crudo para pasar a la tabla
        state: {
            pagination,
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
            expanded
        },
        // Estado extra que necesita nuestra implementación
        searchColumn,

        // Setters "inteligentes" compatibles con TanStack
        onPaginationChange,
        onSortingChange,
        onColumnFiltersChange,
        onGlobalFilterChange,
        onRowSelectionChange: setRowSelection,
        onExpandedChange: setExpanded,

        // Setter simple para searchColumn (no gestionado por TanStack core)
        setSearchColumn,

        // El objeto mágico para enviar al backend
        queryParams
    };
};
