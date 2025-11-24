import React from 'react';
import { Col } from 'reactstrap';
import ExportarBtn from '../components/ExportarBtn';
import { useTable } from '../context/TableContext';

const ExportFilter = ({
  exportFormats,
  exportarDatos,
  lg, md, sm, xs,
  align = "end",
  customData,
  ...props
}) => {
  const tableContext = useTable();

  const dataToExport = tableContext ? tableContext.data : (customData || []);

  const content = (
    <ExportarBtn
      data={dataToExport}
      exportFormats={exportFormats}
      exportarDatos={exportarDatos}
      {...props}
    />
  );

  if (lg || md || sm || xs) {
    return (
      <Col
        lg={lg} md={md} sm={sm} xs={xs}
        className={`d-flex align-items-center justify-content-${align} mt-1`}
      >
        {content}
      </Col>
    );
  }

  return content;
};

export default ExportFilter;
