import { useState } from 'react';

function useDataExport(data, columns) {
  const [exportFormat, setExportFormat] = useState('csv');

  const exportarDatos = (format) => {
    const columnsToShow = columns.filter((column) => column.selector !== undefined);

    if (columnsToShow.length === 0) return; // No hay columnas para exportar, salimos

    const headerRow = Object.fromEntries(
      columnsToShow.map((column) => [column.name, column.name])
    );

    const dataToExportFormatted = data.map((item) =>
      Object.fromEntries(
        columnsToShow.map((column) => [column.name, column.selector(item)])
      )
    );

    if (format === "csv") {
      const csvContent = [
        Object.keys(headerRow).join(","),
        ...dataToExportFormatted.map((item) =>
          Object.values(item)
            .map((value) => `"${value}"`)
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "export.csv");
      link.click();
    }
  };

  return { exportFormat, setExportFormat, exportarDatos };
}

export default useDataExport;
