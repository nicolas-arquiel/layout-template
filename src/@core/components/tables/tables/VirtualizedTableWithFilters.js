import React, { useMemo } from 'react';
import TablaVirtualizada from '../../../components/TablaVirtualizada/TablaVirtualizada';
import { useTable } from '../context/TableContext';
import { TableContainer, TableHeader, DataCounter, ResetButton } from '../components';

/**
 * Tabla virtualizada con soporte para filtros del sistema de tablas
 * Integra TablaVirtualizada con TableProvider para usar todos los filtros disponibles
 */
const VirtualizedTableWithFilters = ({
  columns,
  title,
  titleIcon,
  iconThemeClass,
  showFilteredDataCount = true,
  showResetAllBtn = true,
  rowHeight = 50,
  overscanRowCount = 5,
  customClassCard = "",
  customClassCardBody = ""
}) => {
  const tableContext = useTable();

  // Si no hay context, advertir al usuario
  if (!tableContext) {
    console.warn('VirtualizedTableWithFilters debe usarse dentro de un TableProvider');
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        Error: VirtualizedTableWithFilters debe usarse dentro de un TableProvider
      </div>
    );
  }

  const { data, resetFilters, hasActiveFilters, resetSignal } = tableContext;

  const handleResetAll = React.useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  // Preparar header si hay título
  const header = useMemo(() => {
    if (!title) return null;
    return (
      <TableHeader
        title={title}
        titleIcon={titleIcon}
        iconThemeClass={iconThemeClass}
      />
    );
  }, [title, titleIcon, iconThemeClass]);

  // Preparar controles (contador y botón reset)
  const controls = useMemo(() => {
    return (
      <>
        {showFilteredDataCount && (
          <DataCounter
            totalCount={data.length}
            displayedCount={data.length}
            useExternalPagination={false}
          />
        )}
        {showResetAllBtn && hasActiveFilters && (
          <ResetButton
            onReset={handleResetAll}
            visible={hasActiveFilters}
          />
        )}
      </>
    );
  }, [showFilteredDataCount, showResetAllBtn, hasActiveFilters, data.length, handleResetAll]);

  return (
    <TableContainer
      header={header}
      controls={controls}
      customClassCard={customClassCard}
      customClassCardBody={customClassCardBody}
      table={
        <TablaVirtualizada
          key={resetSignal}
          data={data}
          columns={columns}
          rowHeight={rowHeight}
          overscanRowCount={overscanRowCount}
        />
      }
    />
  );
};

export default VirtualizedTableWithFilters;
