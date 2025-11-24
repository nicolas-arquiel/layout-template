import React from 'react';
import { useTable } from '../context/TableContext';

export const useTableData = () => {
  const tableContext = useTable();

  if (!tableContext) {
    console.warn('useTableData debe usarse dentro de un TableProvider');
    return {
      data: [],
      originalData: [],
      loading: false,
      setData: () => {},
      setOriginalData: () => {},
      setLoading: () => {}
    };
  }

  const {
    data,
    originalData,
    loading,
    setData,
    setOriginalData,
    setLoading
  } = tableContext;

  const refreshData = React.useCallback((newData) => {
    setLoading(true);
    setOriginalData(newData);
    setLoading(false);
  }, [setOriginalData, setLoading]);

  return {
    data,
    originalData,
    loading,
    setData,
    setOriginalData,
    setLoading,
    refreshData
  };
};
