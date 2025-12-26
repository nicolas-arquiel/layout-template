import React, { useState, useMemo, useCallback } from 'react';
import { Trash2, Layout as LayoutIcon, Download, BarChart3 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Button, Text, Heading, Flex, Box } from '@radix-ui/themes';
import SidebarTree from './components/SidebarTree';
import ConfigurationZones from './components/ConfigurationZones';
import AnalyticalTable from './components/AnalyticalTable';
import {
  generarFilasJerarquicas,
  generarColumnasJerarquicas,
  obtenerColumnasFinales
} from './cube-utils';

const AnalyticalCube = ({ 
  data = [], 
  dimensions = [], 
  measures = [], 
  title = "Cubo Analítico",
  onGetChildren = null,
  initialConfig = {}
}) => {
  const [cuboConfig, setCuboConfig] = useState({
    filas: [],
    columnas: [],
    medidas: [],
    filtros: [],
    ...initialConfig
  });
  const [expandedGroups, setExpandedGroups] = useState({});
  
  // Procesamiento de datos optimizado con useMemo
  const processedData = useMemo(() => {
    // Early return si no hay datos o medidas
    if (!data?.length || !cuboConfig.medidas.length) return null;

    // 1. Filtrar por Filtros Globales
    const filtersByDim = cuboConfig.filtros.reduce((acc, f) => {
      if (!acc[f.dimension]) acc[f.dimension] = [];
      acc[f.dimension].push(f.value);
      return acc;
    }, {});

    const dataFiltrada = Object.keys(filtersByDim).length === 0 
      ? data 
      : data.filter(item => {
          return Object.entries(filtersByDim).every(([dimId, values]) => {
            const dim = dimensions.find(d => d.id === dimId);
            if (!dim) return true;
            return values.includes(item[dim.idCampo]);
          });
        });

    if (dataFiltrada.length === 0) return null;

    // Obtener definiciones completas
    const dimsRow = cuboConfig.filas.map(id => dimensions.find(d => d.id === id)).filter(Boolean);
    const dimsCol = cuboConfig.columnas.map(id => dimensions.find(d => d.id === id)).filter(Boolean);
    const meds = cuboConfig.medidas.map(id => measures.find(m => m.id === id)).filter(Boolean);

    // Generar Estructura de filas
    const filasJerarquicas = dimsRow.length === 0
      ? [{
          id: 'total',
          nombre: 'Total',
          dimension: 'total',
          nivel: 0,
          items: dataFiltrada,
          totalesPorColumna: {}
        }]
      : generarFilasJerarquicas(dataFiltrada, dimsRow);
    
    const columnasJerarquicas = generarColumnasJerarquicas(dataFiltrada, dimsCol);
    const columnasFinales = obtenerColumnasFinales(columnasJerarquicas, meds);

    return {
      rows: filasJerarquicas,
      columnsFinal: columnasFinales,
      dimensionsRow: dimsRow,
      dimensionsCol: dimsCol,
      measures: meds,
      dataFiltrada
    };
  }, [data, dimensions, measures, cuboConfig]);

  // Limpiar configuración
  const handleClear = useCallback(() => {
    setCuboConfig({ medidas: [], filas: [], columnas: [], filtros: [] });
  }, []);

  // Exportar a Excel
  const exportToExcel = useCallback(() => {
    if (!processedData) return;
    
    const { dimensionsCol, columnsFinal, rows } = processedData;
    const numDimensionsCol = dimensionsCol.length;
    const wsData = [];
    
    // Generar headers jerárquicos
    for (let level = 0; level < numDimensionsCol; level++) {
      const headerRow = [level === 0 ? 'Dimensiones' : ''];
      const groupsAtLevel = {};
      const orderedGroups = [];
      const seenKeys = new Set();
      
      columnsFinal.forEach(col => {
        if (col.path[level]) {
          const pathKey = col.path.slice(0, level + 1).map(p => p.id).join('|');
          if (!groupsAtLevel[pathKey]) {
            groupsAtLevel[pathKey] = { nombre: col.path[level].nombre, count: 0 };
          }
          groupsAtLevel[pathKey].count++;
          if (!seenKeys.has(pathKey)) {
            seenKeys.add(pathKey);
            orderedGroups.push(groupsAtLevel[pathKey]);
          }
        }
      });
      
      orderedGroups.forEach(group => {
        headerRow.push(group.nombre);
        for (let i = 1; i < group.count; i++) headerRow.push('');
      });
      
      wsData.push(headerRow);
    }
    
    // Fila de medidas
    const measureRow = [''];
    columnsFinal.forEach(col => measureRow.push(col.medida.nombre));
    wsData.push(measureRow);
    
    // Datos
    const flattenRow = (row, level = 0) => {
      const rowData = ['  '.repeat(level) + row.nombre];
      
      columnsFinal.forEach(col => {
        const items = row.items || [];
        const filteredItems = items.filter(item => 
          col.path.every(p => {
            const dim = dimensionsCol.find(d => d.id === p.dimension);
            return item[dim.idCampo] === p.id;
          })
        );
        
        const val = filteredItems.reduce((sum, item) => 
          sum + (parseFloat(item[col.medida.campo]) || 0), 0
        );
        rowData.push(val);
      });
      
      wsData.push(rowData);
      row.hijos?.forEach(hijo => flattenRow(hijo, level + 1));
    };
    
    rows.forEach(row => flattenRow(row, 0));
    
    // Crear worksheet con merges
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const numHeaderRows = numDimensionsCol + 1;
    const merges = [{ s: { r: 0, c: 0 }, e: { r: numHeaderRows - 1, c: 0 } }];
    
    for (let level = 0; level < numDimensionsCol; level++) {
      const headerRow = wsData[level];
      let colIdx = 1;
      
      while (colIdx < headerRow.length) {
        if (headerRow[colIdx] !== '') {
          let colspan = 1;
          while (colIdx + colspan < headerRow.length && headerRow[colIdx + colspan] === '') {
            colspan++;
          }
          if (colspan > 1) {
            merges.push({ s: { r: level, c: colIdx }, e: { r: level, c: colIdx + colspan - 1 } });
          }
          colIdx += colspan;
        } else {
          colIdx++;
        }
      }
    }
    
    ws['!merges'] = merges;
    ws['!cols'] = [{ wch: 30 }, ...columnsFinal.map(() => ({ wch: 12 }))];
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cubo Analítico');
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    XLSX.writeFile(wb, `cubo_analitico_${timestamp}.xlsx`);
  }, [processedData]);

  // Handler para drops globales (eliminar al arrastrar fuera)
  const handleGlobalDrop = useCallback((e) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;
      
      const dropData = JSON.parse(dataStr);
      
      if (dropData.type === 'ZONE_ITEM') {
        const { zoneId, index } = dropData;
        setCuboConfig(prev => {
          const newList = [...prev[zoneId]];
          newList.splice(index, 1);
          return { ...prev, [zoneId]: newList };
        });
      }
    } catch (err) {
      // Ignorar errores
    }
  }, []);

  const handleGlobalDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const isConfigEmpty = cuboConfig.filas.length === 0 && 
                        cuboConfig.columnas.length === 0 && 
                        cuboConfig.medidas.length === 0 && 
                        cuboConfig.filtros.length === 0;

  return (
    <div 
      className="flex flex-row h-full overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      onDrop={handleGlobalDrop}
      onDragOver={handleGlobalDragOver}
    >
      {/* Sidebar */}
      <SidebarTree 
        dimensions={dimensions} 
        measures={measures} 
        onGetChildren={onGetChildren}
        expandedGroups={expandedGroups}
        setExpandedGroups={setExpandedGroups}
      />

      {/* Área Principal */}
      <Box className="flex-1 flex flex-col overflow-hidden bg-gray-50/30 dark:bg-gray-900/50">
        {/* Header */}
        <Box p="4" className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <Flex justify="between" align="center" mb="4">
            <Flex align="center" gap="2">
              <Box className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <LayoutIcon size={18} />
              </Box>
              <Heading size="3" weight="medium">{title}</Heading>
            </Flex>
            <Flex gap="2">
              <Button 
                variant="soft" 
                color="gray"
                onClick={handleClear}
                disabled={isConfigEmpty}
              >
                <Trash2 size={14} />
                Limpiar
              </Button>
              <Button 
                variant="classic" 
                onClick={exportToExcel}
                disabled={!processedData}
              >
                <Download size={14} />
                Exportar
              </Button>
            </Flex>
          </Flex>

          <ConfigurationZones 
            cuboConfig={cuboConfig} 
            setCuboConfig={setCuboConfig}
            dimensionesDisponibles={dimensions} 
            medidasDisponibles={measures}
          />
        </Box>

        {/* Tabla de Resultados */}
        <Box className="flex-1 p-5 overflow-hidden flex flex-col min-h-0">
          {processedData ? (
            <AnalyticalTable 
              rows={processedData.rows} 
              columnsFinal={processedData.columnsFinal}
              dimensionsRow={processedData.dimensionsRow}
              dimensionsCol={processedData.dimensionsCol}
              measures={processedData.measures}
            />
          ) : (
            <Flex direction="column" align="center" justify="center" className="flex-1">
              <Box className="text-center opacity-75 max-w-sm p-6">
                <Box className="mb-4 opacity-25 flex justify-center">
                  <BarChart3 size={64} strokeWidth={1} />
                </Box>
                <Heading size="4" weight="bold" className="mb-2">Diseña tu Informe</Heading>
                <Text as="p" size="2" color="gray">
                  Arrastra dimensiones a filas/columnas y medidas para visualizar los resultados.
                </Text>
              </Box>
            </Flex>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AnalyticalCube;