// ===== EXPORTACIONES PRINCIPALES =====
// src/@core/components/tables/index.js

export { TableProvider, useTable } from './context/TableContext';

// Tablas
export { default as BasicTable } from './tables/BasicTable';
export { default as TableWithAsyncData } from './tables/TableWithAsyncData';
export { default as TableWithClientSideData } from './tables/TableWithClientSideData';
export { default as VirtualizedTableWithFilters } from './tables/VirtualizedTableWithFilters';

// Filtros autónomos
export { default as BigDataSearchFilter } from './filters/BigDataSearchFilter';
export { default as DateRangeFilter } from './filters/DateRangeFilter';
export { default as AdvancedFilter } from './filters/AdvancedFilter';
export { default as SelectFilter } from './filters/SelectFilter';
export { default as CheckboxFilter } from './filters/CheckboxFilter';
export { default as SearchFilter } from './filters/SearchFilter';
export { default as ExportFilter } from './filters/ExportFilter';

// Componentes UI
export * from './components';

// Hooks
export { useTableFilters } from './hooks/useTableFilters';
export { useTableData } from './hooks/useTableData';
export { default as usePagination } from './hooks/usePagination';
export { default as useDataFilter } from './hooks/useDataFilter';
export { default as useDataExport } from './hooks/useDataExport';
export { default as useFilterHandlers } from './hooks/useFilterHandlers';
export { useFilterOperators } from './hooks/useFilterOperators';

// Utils
export { objetoAQueryString } from './utils/queryStringUtils';

// Constants
export { FILTER_OPERATORS, evaluateFilter, evaluateByOperator } from './constants/filterConstants';
