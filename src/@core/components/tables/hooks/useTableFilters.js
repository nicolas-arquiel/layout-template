import { useTable } from '../context/TableContext';

export const useTableFilters = () => {
  const tableContext = useTable();

  if (!tableContext) {
    console.warn('useTableFilters debe usarse dentro de un TableProvider');
    return {
      filters: {},
      hasActiveFilters: false,
      setFilter: () => {},
      resetFilters: () => {}
    };
  }

  const { filters, hasActiveFilters, setFilter, resetFilters } = tableContext;

  // Funciones de conveniencia
  const setBigDataSearch = (searchValue, fields) => {
    setFilter('bigDataSearch', {
      ...filters.bigDataSearch,
      searchValue,
      fields,
      target: searchValue
    });
  };

  const setDateRange = (range, dataSearchField) => {
    setFilter('dateRange', { range, dataSearchField });
  };

  const setAdvancedFilters = (advancedFilters) => {
    setFilter('advanced', advancedFilters);
  };

  const clearSpecificFilter = (filterType) => {
    const initialStates = {
      bigDataSearch: { fields: "", searchValue: "", target: "" },
      dateRange: { range: "", dataSearchField: "" },
      checkbox: { activeFilters: [], checkboxFilters: {} },
      select: { fields: '', searchValue: "", value: null },
      advanced: [],
      search: { fields: [], searchValue: "" }
    };

    setFilter(filterType, initialStates[filterType]);
  };

  return {
    filters,
    hasActiveFilters,
    setFilter,
    resetFilters,
    setBigDataSearch,
    setDateRange,
    setAdvancedFilters,
    clearSpecificFilter
  };
};
