import React from 'react';
import ExportarBtn from '../components/ExportarBtn';
import { useTable } from '../context/TableContext';

const ExportFilter = ({
  exportFormats,
  exportarDatos,
  customData,
  ...props
}) => {
  const tableContext = useTable();

  const dataToExport = tableContext ? tableContext.data : (customData || []);

  return (
    <ExportarBtn
      data={dataToExport}
      exportFormats={exportFormats}
      exportarDatos={exportarDatos}
      {...props}
    />
  );
};

export default ExportFilter;
