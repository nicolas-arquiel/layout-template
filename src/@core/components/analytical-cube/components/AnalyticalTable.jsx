import React, { useMemo, memo } from 'react';
import { Text, ScrollArea } from '@radix-ui/themes';
import { agregarDato } from '../cube-utils';
import { cn } from '@utils/cn';

const AnalyticalTable = ({ rows, columnsFinal, dimensionsRow, dimensionsCol, measures }) => {
  if (!rows || rows.length === 0) return null;

  const showDimensionColumn = dimensionsRow.length > 0;
  const numDimensionsCol = dimensionsCol.length;

  // Pre-calcular clases de padding para cada nivel
  const levelPaddingClasses = useMemo(() => [
    'pl-4',
    'pl-9', 
    'pl-14',
    'pl-20',
    'pl-26'
  ], []);

  // Pre-calcular clases de top para headers sticky
  const headerTopClasses = useMemo(() => [
    'top-0',
    'top-10',
    'top-20',
    'top-[120px]',
    'top-[160px]'
  ], []);

  // Renderizar fila de datos
  const renderRow = (row, level = 0) => {
    const isParent = row.hijos && row.hijos.length > 0;
    const isRoot = level === 0;
    
    const bgClass = isRoot 
      ? "bg-gray-50/80 dark:bg-gray-900/60" 
      : "bg-white dark:bg-gray-950";
    
    const hoverClass = "hover:bg-gray-100/80 dark:hover:bg-gray-800/50";
    const paddingClass = levelPaddingClasses[level] || `pl-[${(level * 20) + 16}px]`;

    return (
      <React.Fragment key={`${row.dimension}-${row.id}`}>
        <tr className={cn("transition-colors", bgClass, hoverClass)}>
          {/* Columna de dimensión sticky */}
          <td 
            className={cn(
              "sticky left-0 z-[2] align-middle",
              "border-r border-b border-gray-200 dark:border-gray-700",
              "shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)]",
              paddingClass,
              isRoot 
                ? "font-medium text-gray-900 dark:text-gray-100 bg-gray-50/95 dark:bg-gray-900/95" 
                : "text-gray-700 dark:text-gray-300 bg-white/95 dark:bg-gray-950/95"
            )}
          >
            <div className="flex items-center py-2.5 pr-4 min-w-[200px]">
              {/* Indicador de jerarquía */}
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mr-2.5 flex-shrink-0",
                isRoot ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
              )} />
              
              <Text 
                size="2" 
                weight={isRoot ? "medium" : "regular"} 
                className="truncate"
              >
                {row.nombre}
              </Text>
            </div>
          </td>
          
          {/* Columnas de datos */}
          {columnsFinal.map((col, idx) => {
            const items = row.items || [];
            
            // Filtrar y agregar datos
            const val = agregarDato(
              items.filter(item => 
                col.path.every(p => {
                  const dim = dimensionsCol.find(d => d.id === p.dimension);
                  return dim && item[dim.idCampo] === p.id;
                })
              ), 
              col.medida
            );
            
            // Determinar si es inicio de nuevo grupo de columnas
            const isFirstInGroup = idx === 0 || 
              (col.path.length > 0 && 
               columnsFinal[idx - 1]?.path?.[col.path.length - 1]?.id !== col.path[col.path.length - 1]?.id);

            return (
              <td 
                key={col.id} 
                className={cn(
                  "text-right px-4 py-2.5 tabular-nums",
                  "border-b border-gray-200 dark:border-gray-700",
                  isRoot 
                    ? "font-medium text-gray-900 dark:text-gray-100" 
                    : "text-gray-600 dark:text-gray-400",
                  isFirstInGroup && "border-l border-gray-200 dark:border-gray-700"
                )}
              >
                <Text size="2">{val.toLocaleString('es-AR')}</Text>
              </td>
            );
          })}
        </tr>
        
        {/* Renderizar hijos recursivamente */}
        {isParent && row.hijos.map(hijo => renderRow(hijo, level + 1))}
      </React.Fragment>
    );
  };

  // Renderizar headers de columnas
  const renderColumnHeaders = () => {
    // Sin dimensiones de columna - solo mostrar medidas
    if (numDimensionsCol === 0) {
      return (
        <thead>
          <tr className="h-11">
            <th 
              className={cn(
                "sticky left-0 top-0 z-[5]",
                "bg-gray-100 dark:bg-gray-900",
                "px-4 py-3 text-left",
                "border-b border-r border-gray-200 dark:border-gray-700",
                "min-w-[250px]"
              )}
            >
              <Text size="1" weight="bold" className="uppercase tracking-wider text-gray-600 dark:text-gray-400">
                {showDimensionColumn ? 'Dimensiones' : 'Total'}
              </Text>
            </th>
            
            {columnsFinal.map((col, idx) => (
              <th 
                key={col.id} 
                className={cn(
                  "sticky top-0 z-[3]",
                  "bg-gray-100 dark:bg-gray-900",
                  "px-4 py-3 text-right",
                  "border-b border-gray-200 dark:border-gray-700",
                  "min-w-[110px]",
                  idx > 0 && "border-l border-gray-200 dark:border-gray-700"
                )}
              >
                <Text size="1" weight="bold" className="uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  {col.medida.nombre}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
      );
    }

    // Con dimensiones de columna - headers jerárquicos
    const headerRows = [];

    // Filas de headers por nivel
    for (let level = 0; level < numDimensionsCol; level++) {
      const headerCells = [];
      const isFirstRow = level === 0;
      const topClass = headerTopClasses[level] || `top-[${level * 40}px]`;
      
      // Header de dimensiones (solo primera fila)
      if (isFirstRow) {
        headerCells.push(
          <th 
            key="dim-header"
            rowSpan={numDimensionsCol + 1}
            className={cn(
              "sticky left-0 top-0 z-[5]",
              "bg-gray-100 dark:bg-gray-900",
              "border-b border-r border-gray-200 dark:border-gray-700",
              "min-w-[250px] w-[250px]"
            )}
          >
            <div className="px-4 py-3">
              <Text size="1" weight="bold" className="uppercase tracking-widest text-gray-600 dark:text-gray-400">
                Dimensiones
              </Text>
            </div>
          </th>
        );
      }

      // Agrupar columnas por path
      const groupsAtLevel = {};
      const orderedGroups = [];
      const seenKeys = new Set();
      
      columnsFinal.forEach(col => {
        if (col.path[level]) {
          const pathKey = col.path.slice(0, level + 1).map(p => p.id).join('|');
          if (!groupsAtLevel[pathKey]) {
            groupsAtLevel[pathKey] = {
              nombre: col.path[level].nombre,
              pathKey,
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

      // Crear celdas de header para este nivel
      orderedGroups.forEach((group, idx) => {
        headerCells.push(
          <th 
            key={`${level}-${group.pathKey}`}
            colSpan={group.count}
            className={cn(
              "sticky z-[3] text-center",
              "bg-gray-100 dark:bg-gray-900",
              "border-b border-gray-200 dark:border-gray-700",
              "h-10 px-2",
              topClass,
              idx > 0 && "border-l border-gray-200 dark:border-gray-700"
            )}
          >
            <Text size="1" weight="bold" className="uppercase tracking-wider text-gray-600 dark:text-gray-400">
              {group.nombre}
            </Text>
          </th>
        );
      });

      headerRows.push(
        <tr key={`header-${level}`} className="h-10">
          {headerCells}
        </tr>
      );
    }

    // Fila de medidas
    const measureTopClass = headerTopClasses[numDimensionsCol] || `top-[${numDimensionsCol * 40}px]`;
    const measureCells = columnsFinal.map((col, idx) => {
      const isStartOfGroup = idx === 0 || 
        (col.path.length > 0 && 
         columnsFinal[idx - 1]?.path?.[col.path.length - 1]?.id !== col.path[col.path.length - 1]?.id);

      return (
        <th 
          key={`measure-${col.id}`}
          className={cn(
            "sticky z-[3] text-right px-4",
            "bg-gray-50 dark:bg-gray-900/80",
            "border-b border-gray-200 dark:border-gray-700",
            "h-10 min-w-[110px]",
            measureTopClass,
            isStartOfGroup && "border-l border-gray-200 dark:border-gray-700"
          )}
        >
          <Text size="1" weight="medium" className="uppercase tracking-wide text-gray-500 dark:text-gray-500">
            {col.medida.nombre}
          </Text>
        </th>
      );
    });

    headerRows.push(
      <tr key="header-measures" className="h-10">
        {measureCells}
      </tr>
    );

    return <thead>{headerRows}</thead>;
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* ScrollArea envuelve toda la tabla - scroll fuera de la tabla */}
      <ScrollArea 
        type="auto" 
        scrollbars="both" 
        className="flex-1"
      >
        <table className="w-full border-collapse text-left min-w-max">
          {renderColumnHeaders()}
          <tbody>
            {rows.map(row => renderRow(row))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
};

export default memo(AnalyticalTable);