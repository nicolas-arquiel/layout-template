
import React, { useState, useMemo } from 'react';

import { Trash2, Layout as LayoutIcon, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Button, Text, Heading, Flex, Card, Box } from '@radix-ui/themes';
import SidebarTree from './components/SidebarTree';
import ConfigurationZones from './components/ConfigurationZones';
import AnalyticalTable from './components/AnalyticalTable';
import {
  generarFilasJerarquicas,
  generarColumnasJerarquicas,
  obtenerColumnasFinales
} from './cube-utils';
import { cn } from '@utils/cn';

const AnalyticalCube = ({ 
  data = [], 
  dimensions = [], 
  measures = [], 
  title = "Cubo Analítico",
  onGetChildren = null, // Callback para cargar hijos bajo demanda
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
  
  // Procesamiento de datos (Calculado)
  const processedData = useMemo(() => { // Renamed cubeData to processedData
    // 1. Filtrar por Filtros Globales
    let dataFiltrada = data.filter(item => {
      // Agrupar filtros por dimensión
      const filtersByDim = cuboConfig.filtros.reduce((acc, f) => {
        if (!acc[f.dimension]) acc[f.dimension] = [];
        acc[f.dimension].push(f.value);
        return acc;
      }, {});

      // El item debe cumplir con todos los grupos de filtros (AND entre dimensiones, OR entre valores de la misma dim)
      return Object.entries(filtersByDim).every(([dimId, values]) => {
        const dim = dimensions.find(d => d.id === dimId);
        if (!dim) return true;
        return values.includes(item[dim.idCampo]);
      });
    });

    if (!dataFiltrada || dataFiltrada.length === 0 || cuboConfig.medidas.length === 0) return null;

    // Obtener definiciones completas de lo seleccionado
    const dimsRow = cuboConfig.filas.map(id => dimensions.find(d => d.id === id)).filter(Boolean);
    const dimsCol = cuboConfig.columnas.map(id => dimensions.find(d => d.id === id)).filter(Boolean);
    const meds = cuboConfig.medidas.map(id => measures.find(m => m.id === id)).filter(Boolean);

    // Generar Estructura
    let filasJerarquicas;
    
    // Si no hay dimensiones de fila, crear una fila de "Total" con todos los datos
    if (dimsRow.length === 0) {
      filasJerarquicas = [{
        id: 'total',
        nombre: 'Total',
        dimension: 'total',
        nivel: 0,
        items: dataFiltrada,
        totalesPorColumna: {}
      }];
    } else {
      filasJerarquicas = generarFilasJerarquicas(dataFiltrada, dimsRow);
    }
    
    const columnasJerarquicas = generarColumnasJerarquicas(dataFiltrada, dimsCol);
    const columnasFinales = obtenerColumnasFinales(columnasJerarquicas, meds);

    return {
      rows: filasJerarquicas,
      columnsFinal: columnasFinales,
      dimensionsRow: dimsRow,
      dimensionsCol: dimsCol,
      measures: meds,
      dataFiltrada: dataFiltrada // Agregamos los datos filtrados para el export
    };
  }, [data, dimensions, measures, cuboConfig]);

  // Extracted hierarchical rows for clarity in AnalyticalTable
  const hierarchicalData = processedData?.rows || [];

  const handleClear = () => {
    setCuboConfig({ medidas: [], filas: [], columnas: [], filtros: [] });
  };

  // Función para exportar con headers jerárquicos
  const exportToExcel = (dataToExport, config) => { // Renamed handleExport to exportToExcel and adjusted params
    if (!dataToExport) return;
    
    // Preparar estructura de datos para Excel con headers jerárquicos
    const numDimensionsCol = dataToExport.dimensionsCol.length;
    const numHeaderRows = numDimensionsCol + 1; // +1 para la fila de medidas
    
    // Crear array de arrays para el worksheet
    const wsData = [];
    
    // ===== GENERAR HEADERS JERÁRQUICOS =====
    
    // Generar filas de headers de columnas
    for (let level = 0; level < numDimensionsCol; level++) {
      const headerRow = [];
      
      // Primera celda: "Dimensiones" (con rowspan)
      if (level === 0) {
        headerRow.push('Dimensiones');
      } else {
        headerRow.push(''); // Celda vacía para merge posterior
      }
      
      // Agrupar columnas por path completo hasta este nivel
      const groupsAtLevel = {};
      const orderedGroups = [];
      const seenKeys = new Set();
      
      dataToExport.columnsFinal.forEach(col => {
        if (col.path[level]) {
          const pathKey = col.path.slice(0, level + 1).map(p => p.id).join('|');
          
          if (!groupsAtLevel[pathKey]) {
            groupsAtLevel[pathKey] = {
              nombre: col.path[level].nombre,
              count: 0
            };
          }
          groupsAtLevel[pathKey].count++;
          
          if (!seenKeys.has(pathKey)) {
            seenKeys.add(pathKey);
            orderedGroups.push(groupsAtLevel[pathKey]);
          }
        }
      });
      
      // Agregar headers de este nivel con repetición para colspan
      orderedGroups.forEach(group => {
        headerRow.push(group.nombre);
        // Agregar celdas vacías para simular colspan
        for (let i = 1; i < group.count; i++) {
          headerRow.push('');
        }
      });
      
      wsData.push(headerRow);
    }
    
    // Última fila de headers: medidas
    const measureRow = [''];
    dataToExport.columnsFinal.forEach(col => {
      measureRow.push(col.medida.nombre);
    });
    wsData.push(measureRow);
    
    // ===== GENERAR DATOS =====
    
    const flattenRow = (row, level = 0) => {
      const rowData = [];
      
      // Columna de dimensión con indentación
      const indent = '  '.repeat(level);
      rowData.push(`${indent}${row.nombre}`);
      
      // Valores de cada columna
      dataToExport.columnsFinal.forEach(col => {
        const items = row.items || [];
        const filteredItems = items.filter(item => {
          return col.path.every(p => {
            const dim = dataToExport.dimensionsCol.find(d => d.id === p.dimension);
            return item[dim.idCampo] === p.id;
          });
        });
        
        // Agregar valor
        const val = filteredItems.reduce((sum, item) => {
          const value = parseFloat(item[col.medida.campo]) || 0;
          return sum + value;
        }, 0);
        
        rowData.push(val);
      });
      
      wsData.push(rowData);
      
      // Procesar hijos recursivamente
      if (row.hijos && row.hijos.length > 0) {
        row.hijos.forEach(hijo => flattenRow(hijo, level + 1));
      }
    };
    
    // Procesar todas las filas
    dataToExport.rows.forEach(row => flattenRow(row, 0));
    
    // ===== CREAR WORKSHEET Y APLICAR MERGES =====
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // ===== APLICAR ESTILOS A HEADERS =====
    
    // Función para obtener la referencia de celda (ej: "A1", "B2")
    const getCellRef = (row, col) => {
      return XLSX.utils.encode_cell({ r: row, c: col });
    };
    
    // Estilo para headers (Note: XLSX styling requires Pro version or specific libraries, 
    // basic XLSX community edition only supports structure. We keep structure logic)
    
    // Aplicar merges para headers
    const merges = [];
    
    // Merge para "Dimensiones" (primera columna, todas las filas de header)
    merges.push({
      s: { r: 0, c: 0 }, // start
      e: { r: numHeaderRows - 1, c: 0 } // end
    });
    
    // Merges para headers de columnas jerárquicos
    for (let level = 0; level < numDimensionsCol; level++) {
      const headerRow = wsData[level];
      let colIdx = 1; // Empezar después de "Dimensiones"
      
      while (colIdx < headerRow.length) {
        const cellValue = headerRow[colIdx];
        
        if (cellValue !== '') {
          // Contar cuántas celdas vacías siguen (colspan)
          let colspan = 1;
          while (colIdx + colspan < headerRow.length && headerRow[colIdx + colspan] === '') {
            colspan++;
          }
          
          // Si hay colspan > 1, crear merge
          if (colspan > 1) {
            merges.push({
              s: { r: level, c: colIdx },
              e: { r: level, c: colIdx + colspan - 1 }
            });
          }
          
          colIdx += colspan;
        } else {
          colIdx++;
        }
      }
    }
    
    ws['!merges'] = merges;
    
    // Aplicar estilos (opcional - ancho de columnas)
    const colWidths = [{ wch: 30 }]; // Primera columna más ancha
    dataToExport.columnsFinal.forEach(() => {
      colWidths.push({ wch: 12 });
    });
    ws['!cols'] = colWidths;
    
    // Crear workbook y exportar
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cubo Analítico');
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fileName = `cubo_analitico_${timestamp}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
  };

  // Handler to catch drops outside of zones (removal)
  const handleGlobalDrop = (e) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;
      
      const data = JSON.parse(dataStr);
      
      // Only handle ZONE_ITEM drops (items dragged from a zone)
      if (data.type === 'ZONE_ITEM') {
        const { zoneId, index } = data;
        
        // Remove the item from the config
        setCuboConfig(prev => {
            const newList = [...prev[zoneId]];
            newList.splice(index, 1);
            return {
                ...prev,
                [zoneId]: newList
            };
        });
      }
    } catch (err) {
      // Ignore errors
    }
  };

  const handleGlobalDragOver = (e) => {
    e.preventDefault(); // allow drop
    e.dataTransfer.dropEffect = 'move'; // indicate move/remove possibility
  };

  return (
    <Card 
        className="flex flex-col md:flex-row h-[calc(100vh-120px)] overflow-hidden" 
        style={{ padding: 0, display: 'flex', flexDirection: 'row' }} // Reverted to Flex for stability
        onDrop={handleGlobalDrop}
        onDragOver={handleGlobalDragOver}
    >
      {/* Sidebar de Elementos */}
      <SidebarTree 
        dimensions={dimensions} 
        measures={measures} 
        onGetChildren={onGetChildren}
        expandedGroups={expandedGroups}
        setExpandedGroups={setExpandedGroups}
      />

      {/* Área Principal */}
      <Box className="flex-1 flex flex-col overflow-hidden bg-gray-50/30 dark:bg-gray-900/50">
        {/* Header de Configuración */}
        <Box p="4" className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
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
                    onClick={() => setCuboConfig({ filas: [], columnas: [], medidas: [], filtros: [] })}
                    disabled={cuboConfig.filas.length === 0 && cuboConfig.columnas.length === 0 && cuboConfig.medidas.length === 0 && cuboConfig.filtros.length === 0}
                >
                    <Trash2 size={14} />
                    Limpiar
                </Button>
                <Button 
                    variant="classic" 
                    onClick={() => exportToExcel(processedData, cuboConfig)}
                    disabled={!processedData} // Check if processedData is null
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
        <Box className="flex-1 p-5 overflow-hidden flex flex-col">
          {processedData ? (
            <AnalyticalTable 
              rows={hierarchicalData} 
              columnsFinal={processedData.columnsFinal}
              dimensionsRow={processedData.dimensionsRow}
              dimensionsCol={processedData.dimensionsCol}
              measures={cuboConfig.medidas.map(m => typeof m === 'object' ? m : measures.find(me => me.id === m))}
            />
          ) : (
            <Flex direction="column" align="center" justify="center" className="flex-1">
              <Box className="text-center opacity-75 max-w-sm p-6 bg-transparent">
                <Text size="8" className="mb-4 opacity-25 grayscale" style={{ display: 'block' }}>📊</Text>
                <Heading size="4" weight="bold" className="mb-2">Diseña tu Informe</Heading>
                <Text as="p" size="2" color="gray">
                  Arrastra dimensiones a filas/columnas y medidas para visualizar los resultados.
                </Text>
              </Box>
            </Flex>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default AnalyticalCube;
