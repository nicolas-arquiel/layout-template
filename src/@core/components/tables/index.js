// ===== EXPORTACIONES PRINCIPALES =====
// src/@core/components/tables/index.js

export { TableProvider, useTable } from './context/TableContext';

// Tablas
export { default as BasicTable } from './tables/BasicTable';
export { default as TableWithAsyncData } from './tables/TableWithAsyncData';
export { default as TableWithClientSideData } from './tables/TableWithClientSideData';

// Filtros autónomos
export { default as BigDataSearchFilter } from './filters/BigDataSearchFilter';
export { default as DateRangeFilter } from './filters/DateRangeFilter';
export { default as AdvancedFilter } from './filters/AdvancedFilter';
export { default as SelectFilter } from './filters/SelectFilter';
export { default as CheckboxFilter } from './filters/CheckboxFilter';
export { default as SearchFilter } from './filters/SearchFilter';
export { default as ExportFilter } from './filters/ExportFilter';

// Hooks
export { useTableFilters } from './hooks/useTableFilters';
export { useTableData } from './hooks/useTableData';
