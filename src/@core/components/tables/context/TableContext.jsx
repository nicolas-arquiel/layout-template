import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { objetoAQueryString } from '../utils/queryStringUtils';

const TableContext = createContext();

const initialState = {
  filters: {
    bigDataSearch: { fields: "", searchValue: "", target: "" },
    dateRange: { range: "", dataSearchField: "" },
    checkbox: { activeFilters: [], checkboxFilters: {} },
    select: { fields: '', searchValue: "", value: null },
    advanced: [],
    search: { fields: [], searchValue: "" }
  },
  pagination: { page: 1, perpage: 7 },
  sorting: { field: null, direction: 'asc' },
  data: [],
  originalData: [],
  loading: false,
  tableType: 'client',
  resetSignal: 0,
  hasActiveFilters: false,
  isInitialized: false
};

function tableReducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      const newFilters = { ...state.filters, [action.filterType]: action.payload };
      const hasActiveFilters = checkHasActiveFilters(newFilters);

      return {
        ...state,
        filters: newFilters,
        hasActiveFilters,
        pagination: { ...state.pagination, page: 1 }
      };

    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };

    case 'SET_SORTING':
      return { ...state, sorting: action.payload };

    case 'SET_DATA':
      return { ...state, data: action.payload };

    case 'SET_ORIGINAL_DATA':
      return { ...state, originalData: action.payload, data: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_INITIALIZED':
      return { ...state, isInitialized: true };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        hasActiveFilters: false,
        pagination: { ...state.pagination, page: 1 },
        resetSignal: state.resetSignal + 1,
        data: state.originalData
      };

    default:
      return state;
  }
}

function checkHasActiveFilters(filters) {
  return (
    (filters.bigDataSearch.target && filters.bigDataSearch.fields) ||
    (filters.dateRange.range && filters.dateRange.dataSearchField) ||
    filters.checkbox.activeFilters.length > 0 ||
    (filters.select.fields && filters.select.searchValue) ||
    filters.advanced.length > 0 ||
    (filters.search.searchValue && filters.search.fields.length > 0)
  );
}

export function TableProvider({
  children,
  tableType = 'client',
  onAsyncParamsChange,
  initialLoad = true,
  defaultPaginationPerPage = 7,
  useQueryString = true
}) {
  const [state, dispatch] = useReducer(tableReducer, {
    ...initialState,
    tableType,
    pagination: { page: 1, perpage: defaultPaginationPerPage }
  });

  const lastParamsRef = useRef(null);
  const callbackRef = useRef(onAsyncParamsChange);

  useEffect(() => {
    callbackRef.current = onAsyncParamsChange;
  }, [onAsyncParamsChange]);

  // Función memoizada para construir parámetros
  const buildParams = useCallback(() => {
    const params = {
      pagination: {
        page: state.pagination.page,
        perpage: state.pagination.perpage
      }
    };

    const asyncFilters = buildAsyncFilters(state.filters);
    if (Object.keys(asyncFilters).length > 0) {
      Object.assign(params, asyncFilters);
    }

    if (state.sorting.field) {
      params.order = {
        field: state.sorting.field,
        order: state.sorting.direction.toUpperCase()
      };
    }

    return params;
  }, [state.pagination, state.filters, state.sorting]);

  const areParamsEqual = useCallback((params1, params2) => {
    return JSON.stringify(params1) === JSON.stringify(params2);
  }, []);

  // Efecto para consulta inicial
  useEffect(() => {
    if (tableType === 'async' && callbackRef.current && !state.isInitialized && initialLoad) {
      const initialParams = buildParams();

      // Convertir a queryString si está habilitado
      const paramsToSend = useQueryString ? objetoAQueryString(initialParams) : initialParams;

      console.log('🚀 Consulta inicial async:', paramsToSend);
      lastParamsRef.current = initialParams; // Guardar objeto original para comparación
      callbackRef.current(paramsToSend);
      dispatch({ type: 'SET_INITIALIZED' });
    }
  }, [tableType, state.isInitialized, initialLoad, buildParams, useQueryString]);

  // Efecto para cambios posteriores
  useEffect(() => {
    if (tableType === 'async' && callbackRef.current && state.isInitialized) {
      const newParams = buildParams();

      if (!areParamsEqual(newParams, lastParamsRef.current)) {
        // Convertir a queryString si está habilitado
        const paramsToSend = useQueryString ? objetoAQueryString(newParams) : newParams;

        console.log('🔄 Consulta por cambios:', paramsToSend);
        lastParamsRef.current = newParams; // Guardar objeto original
        callbackRef.current(paramsToSend);
      }
    }
  }, [
    tableType,
    state.isInitialized,
    buildParams,
    areParamsEqual,
    useQueryString,
    state.pagination.page,
    state.pagination.perpage,
    state.hasActiveFilters,
    state.sorting.field,
    state.sorting.direction,
    state.resetSignal
  ]);

  // Para tablas client, aplicar filtros automáticamente
  useEffect(() => {
    if (tableType === 'client' && state.originalData.length > 0) {
      const filteredData = state.hasActiveFilters
        ? applyClientFilters(state.originalData, state.filters)
        : state.originalData;

      if (JSON.stringify(filteredData) !== JSON.stringify(state.data)) {
        dispatch({ type: 'SET_DATA', payload: filteredData });
      }
    }
  }, [state.filters, state.originalData, tableType, state.hasActiveFilters]);

  const value = {
    ...state,
    dispatch,
    setFilter: useCallback((filterType, payload) => {
      dispatch({ type: 'SET_FILTER', filterType, payload });
    }, []),
    setPagination: useCallback((payload) => {
      dispatch({ type: 'SET_PAGINATION', payload });
    }, []),
    setSorting: useCallback((payload) => {
      dispatch({ type: 'SET_SORTING', payload });
    }, []),
    setData: useCallback((payload) => {
      dispatch({ type: 'SET_DATA', payload });
    }, []),
    setOriginalData: useCallback((payload) => {
      dispatch({ type: 'SET_ORIGINAL_DATA', payload });
    }, []),
    setLoading: useCallback((payload) => {
      dispatch({ type: 'SET_LOADING', payload });
    }, []),
    resetFilters: useCallback(() => {
      dispatch({ type: 'RESET_FILTERS' });
    }, [])
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export const useTable = () => {
  const context = useContext(TableContext);
  return context;
};

// Función para construir filtros async
function buildAsyncFilters(filters) {
  const result = {};

  if (filters.bigDataSearch.target && filters.bigDataSearch.fields) {
    result.likeSearch = {
      [filters.bigDataSearch.fields]: filters.bigDataSearch.target
    };
  }

  if (filters.checkbox.activeFilters.length > 0) {
    result.fixedSearch = filters.checkbox.activeFilters;
  }

  if (filters.dateRange.range && filters.dateRange.dataSearchField) {
    const [startDate, endDate] = filters.dateRange.range;
    result.dateFilter = {
      field: filters.dateRange.dataSearchField,
      min: new Date(startDate).toISOString().split("T")[0],
      max: new Date(endDate).toISOString().split("T")[0]
    };
  }

  if (filters.select.fields && filters.select.searchValue) {
    result.selectFilter = {
      fields: filters.select.fields,
      searchValue: filters.select.searchValue
    };
  }

  if (filters.advanced.length > 0) {
    result.advancedFilter = filters.advanced;
  }

  return result;
}

// Función de filtrado del lado cliente
function applyClientFilters(data, filters) {
  let filteredData = [...data];

  if (filters.bigDataSearch.target && filters.bigDataSearch.fields) {
    const searchValue = filters.bigDataSearch.target.toLowerCase();
    const field = filters.bigDataSearch.fields;
    filteredData = filteredData.filter(item =>
      item[field]?.toString().toLowerCase().includes(searchValue)
    );
  }

  if (filters.search.searchValue && filters.search.fields.length > 0) {
    const searchValue = filters.search.searchValue.toLowerCase();
    filteredData = filteredData.filter(item =>
      filters.search.fields.some(field =>
        item[field]?.toString().toLowerCase().includes(searchValue)
      )
    );
  }

  if (filters.checkbox.activeFilters.length > 0) {
    filteredData = filteredData.filter(item =>
      filters.checkbox.activeFilters.some(filter =>
        item[filter.field] === filter.value
      )
    );
  }

  if (filters.dateRange.range && filters.dateRange.dataSearchField) {
    const [startDate, endDate] = filters.dateRange.range;
    const field = filters.dateRange.dataSearchField;
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item[field]);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  }

  if (filters.select.fields && filters.select.searchValue) {
    const field = filters.select.fields;
    const value = filters.select.searchValue;
    filteredData = filteredData.filter(item => item[field] === value);
  }

  if (filters.advanced.length > 0) {
    filteredData = filteredData.filter(item => {
      return filters.advanced.every(filter => {
        const fieldValue = item[filter.field];
        return applyAdvancedFilter(fieldValue, filter);
      });
    });
  }

  return filteredData;
}

const applyAdvancedFilter = (fieldValue, filter) => {
  const { operator, value, type } = filter;

  if (type === 'boolean') {
    return fieldValue.toString() === value;
  }

  if (type === 'number') {
    const numValue = parseFloat(value);
    const numFieldValue = parseFloat(fieldValue);

    switch (operator) {
      case 'equals': return numFieldValue === numValue;
      case 'not_equals': return numFieldValue !== numValue;
      case 'greater_than': return numFieldValue > numValue;
      case 'less_than': return numFieldValue < numValue;
      case 'greater_equal': return numFieldValue >= numValue;
      case 'less_equal': return numFieldValue <= numValue;
      default: return true;
    }
  }

  if (type === 'date') {
    const dateValue = new Date(value);
    const dateFieldValue = new Date(fieldValue);

    switch (operator) {
      case 'equals': return dateFieldValue.toDateString() === dateValue.toDateString();
      case 'not_equals': return dateFieldValue.toDateString() !== dateValue.toDateString();
      case 'greater_than': return dateFieldValue > dateValue;
      case 'less_than': return dateFieldValue < dateValue;
      case 'greater_equal': return dateFieldValue >= dateValue;
      case 'less_equal': return dateFieldValue <= dateValue;
      default: return true;
    }
  }

  const stringValue = value.toLowerCase();
  const stringFieldValue = fieldValue?.toString().toLowerCase() || '';

  switch (operator) {
    case 'contains': return stringFieldValue.includes(stringValue);
    case 'not_contains': return !stringFieldValue.includes(stringValue);
    case 'equals': return stringFieldValue === stringValue;
    case 'not_equals': return stringFieldValue !== stringValue;
    case 'starts_with': return stringFieldValue.startsWith(stringValue);
    case 'ends_with': return stringFieldValue.endsWith(stringValue);
    default: return true;
  }
};
