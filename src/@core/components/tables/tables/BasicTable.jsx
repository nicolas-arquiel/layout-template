import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@radix-ui/themes';
import { Pagination, EnhancedDataTable } from '../components';

const BasicTable = ({
  data = [],
  columns,
  allCountData,
  useExternalPagination = false,
  currentPage: externalCurrentPage = 0,
  onPageChange,
  paginationPerPage = 7,
  pagination = true,
  fixedHeader,
  fixedHeaderScrollHeight,
  defaultSortFieldId,
  defaultSortAsc,
  onSort,
  customStyles,
  className = "",
  ...props
}) => {
  const [localCurrentPage, setLocalCurrentPage] = useState(0);
  const lastExternalPageRef = useRef(externalCurrentPage);

  const currentPage = useExternalPagination ? externalCurrentPage : localCurrentPage;

  useEffect(() => {
    if (useExternalPagination &&
        externalCurrentPage !== lastExternalPageRef.current &&
        externalCurrentPage !== undefined) {

      setLocalCurrentPage(externalCurrentPage);
      lastExternalPageRef.current = externalCurrentPage;
    }
  }, [externalCurrentPage, useExternalPagination]);

  const handlePagination = React.useCallback((page) => {
    const newPageIndex = page.selected;

    if (useExternalPagination && onPageChange) {
      onPageChange(newPageIndex);
    } else {
      setLocalCurrentPage(newPageIndex);
    }
  }, [useExternalPagination, onPageChange]);

  const handleSort = React.useCallback((column, sortDirection) => {
    if (onSort) {
      onSort(column, sortDirection);
    }
  }, [onSort]);

  // Calcular datos paginados para paginación local
  const paginatedData = React.useMemo(() => {
    if (useExternalPagination || !pagination) {
      return data;
    }
    const start = currentPage * paginationPerPage;
    const end = start + paginationPerPage;
    return data.slice(start, end);
  }, [data, currentPage, paginationPerPage, useExternalPagination, pagination]);

  const CustomPagination = React.useMemo(() => {
    if (!pagination) return () => null;

    const totalItems = useExternalPagination && allCountData !== undefined
      ? allCountData
      : data.length;

    const pageCount = Math.ceil(totalItems / paginationPerPage);
    const safePage = Math.max(0, Math.min(currentPage, pageCount - 1));

    if (pageCount <= 1) return () => null;

    return () => (
      <Pagination
        pageCount={pageCount}
        forcePage={safePage}
        onPageChange={handlePagination}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        className="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      />
    );
  }, [
    pagination,
    useExternalPagination,
    allCountData,
    data.length,
    paginationPerPage,
    currentPage,
    handlePagination
  ]);

  return (
    <Box className={className}>
      <EnhancedDataTable
        columns={columns}
        data={paginatedData}
        defaultSortFieldId={defaultSortFieldId}
        defaultSortAsc={defaultSortAsc}
        onSort={handleSort}
        highlightOnHover={true}
        {...props}
      />
      {pagination && <CustomPagination />}
    </Box>
  );
};

export default BasicTable;
