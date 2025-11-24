import React, { useEffect, useRef } from 'react';
import BasicTable from './BasicTable';
import TableContainer from '../components/TableContainer';
import TableHeader from '../components/TableHeader';
import DataCounter from '../components/DataCounter';
import ResetButton from '../components/ResetButton';
import { useTable } from '../context/TableContext';

const TableWithClientSideData = ({
  data = [],
  title,
  titleComponent,
  titleIcon,
  iconThemeClass,
  showFilteredDataCount = false,
  showResetAllBtn = false,
  customClassCard = "",
  customClassCardBody = "",
  progressComponent,
  ...props
}) => {
  const tableContext = useTable();
  const lastDataRef = useRef(null);

  useEffect(() => {
    if (tableContext && data !== lastDataRef.current) {
      tableContext.setOriginalData(data);
      lastDataRef.current = data;
    }
  }, [data, tableContext]);

  if (!tableContext) {
    return (
      <TableContainer
        customClassCard={customClassCard}
        customClassCardBody={customClassCardBody}
        header={
          <TableHeader
            title={title}
            titleComponent={titleComponent}
            titleIcon={titleIcon}
            iconThemeClass={iconThemeClass}
          />
        }
        table={
          <BasicTable
            data={data}
            useExternalPagination={false}
            {...props}
          />
        }
      />
    );
  }

  const handlePageChange = React.useCallback((pageIndex) => {
    tableContext.setPagination({ page: pageIndex + 1 });
  }, [tableContext]);

  const handleSort = React.useCallback((column, sortDirection) => {
    tableContext.setSorting({
      field: column.sortField,
      direction: sortDirection
    });
  }, [tableContext]);

  const handleResetAll = React.useCallback(() => {
    tableContext.resetFilters();
  }, [tableContext]);

  const currentPageIndex = Math.max(0, tableContext.pagination.page - 1);

  const controls = (
    <>
      {showFilteredDataCount && (
        <DataCounter
          totalCount={tableContext.data.length}
          displayedCount={tableContext.data.length}
          useExternalPagination={false}
        />
      )}

      <ResetButton
        onReset={handleResetAll}
        visible={showResetAllBtn && tableContext.hasActiveFilters}
      />
    </>
  );

  return (
    <TableContainer
      customClassCard={customClassCard}
      customClassCardBody={customClassCardBody}
      header={
        <TableHeader
          title={title}
          titleComponent={titleComponent}
          titleIcon={titleIcon}
          iconThemeClass={iconThemeClass}
        />
      }
      controls={controls}
      table={
        <BasicTable
          data={tableContext.data}
          useExternalPagination={true}
          currentPage={currentPageIndex}
          onPageChange={handlePageChange}
          onSort={handleSort}
          progressComponent={tableContext.loading ? progressComponent : undefined}
          {...props}
        />
      }
    />
  );
};

export default TableWithClientSideData;
