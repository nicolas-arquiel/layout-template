import React from 'react';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { DownloadIcon } from '@radix-ui/react-icons';

const ExportarBtn = ({
  onExportExcel,
  onExportPDF,
  onExportCSV,
  disabled = false,
  showExcel = true,
  showPDF = true,
  showCSV = true
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={disabled}>
        <Button variant="soft" size="2" disabled={disabled}>
          <DownloadIcon width="16" height="16" />
          Exportar
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {showExcel && onExportExcel && (
          <DropdownMenu.Item onClick={onExportExcel}>
            Exportar a Excel
          </DropdownMenu.Item>
        )}
        {showPDF && onExportPDF && (
          <DropdownMenu.Item onClick={onExportPDF}>
            Exportar a PDF
          </DropdownMenu.Item>
        )}
        {showCSV && onExportCSV && (
          <DropdownMenu.Item onClick={onExportCSV}>
            Exportar a CSV
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ExportarBtn;
