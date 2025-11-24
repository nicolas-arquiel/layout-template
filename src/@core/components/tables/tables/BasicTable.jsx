import React, { useState, useEffect, useRef } from 'react';
import DataTable from "react-data-table-component";
import { Pagination } from '../components';
import { ChevronDown } from "react-feather";

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

  const CustomPagination = React.useMemo(() => {
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
    useExternalPagination,
    allCountData,
    data.length,
    paginationPerPage,
    currentPage,
    handlePagination
  ]);

  return (
    <div className={`react-dataTable react-dataTable-selectable-rows ${className}`}>
      <DataTable
        noHeader
        columns={columns}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        data={data}
        paginationComponent={CustomPagination}
        paginationDefaultPage={currentPage + 1}
        paginationPerPage={paginationPerPage}
        pagination={pagination}
        fixedHeader={fixedHeader}
        fixedHeaderScrollHeight={fixedHeaderScrollHeight}
        defaultSortFieldId={defaultSortFieldId}
        defaultSortAsc={defaultSortAsc}
        onSort={handleSort}
        customStyles={customStyles}
        {...props}
      />
    </div>
  );
};

export default BasicTable;
