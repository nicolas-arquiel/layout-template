import React, { useMemo } from 'react';
import { Text, ScrollArea } from '@radix-ui/themes';
import { agregarDato } from '../cube-utils';
import { cn } from '@utils/cn';

const AnalyticalTable = ({ rows, columnsFinal, dimensionsRow, dimensionsCol, measures }) => {
  if (!rows || rows.length === 0) return null;

  // Determine if we should show the dimension column
  const showDimensionColumn = dimensionsRow.length > 0;

  const renderRow = (row, level = 0) => {
    const isParent = row.hijos && row.hijos.length > 0;
    
    // Left border helps visualize hierarchy
    const borderColors = ['border-primary/50', 'border-gray-300', 'border-gray-200', 'border-gray-100'];
    const borderColorClass = borderColors[level] || 'border-gray-50';

    return (
      <React.Fragment key={`${row.dimension}-${row.id}`}>
        <tr className={cn(
            "group",
            level === 0 ? "bg-gray-50 dark:bg-gray-900/40" : "bg-white dark:bg-gray-900"
        )}>
          {/* Hierarchical dimension column */}
          <td 
            className={cn(
              "sticky left-0 z-[30] align-middle",
              level === 0 ? "text-gray-900 dark:text-gray-100 text-[0.8rem] font-medium bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800" : "text-gray-800 dark:text-gray-200 text-xs bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800"
            )}
            style={{ 
              paddingLeft: `${(level * 24) + 16}px`,
              borderLeft: level > 0 ? `2px solid transparent` : 'none', 
              boxShadow: level === 0 ? 'inset 4px 0 0 0 rgba(var(--primary-rgb), 0.1)' : 'none'
            }}
          >
            <div className="flex items-center py-2.5">
               {/* Marker for hierarchy */}
               {level > 0 && <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 inline-block"></span>}
               <Text size="1" weight={level === 0 ? "medium" : "regular"}>
                 {row.nombre}
               </Text>
            </div>
          </td>
          
          {/* Data columns */}
          {columnsFinal.map(col => {
            const items = row.items || [];
            const val = agregarDato(items.filter(item => {
              // Filter items matching the column path
              return col.path.every(p => item[dimensionsCol.find(d => d.id === p.dimension).idCampo] === p.id);
            }), col.medida);
            
            return (
              <td 
                key={col.id} 
                className={cn(
                    "text-right py-2.5 px-4 text-xs tabular-nums cursor-default",
                    level === 0 ? "text-gray-900 dark:text-gray-100 font-medium" : "text-gray-800 dark:text-gray-200"
                )}
              >
                <Text size="1">{val.toLocaleString()}</Text>
              </td>
            );
          })}
        </tr>
        {isParent && row.hijos.map(hijo => renderRow(hijo, level + 1))}
      </React.Fragment>
    );
  };

  // Render hierarchical column headers
  const renderColumnHeaders = () => {
    const numDimensionsCol = dimensionsCol.length;
    
    // If no column dimensions, just show measures
    if (numDimensionsCol === 0) {
      return (
        <thead>
          <tr>
            <th 
              className="sticky left-0 top-0 z-10 min-w-[280px] bg-white dark:bg-gray-900 p-3 text-xs font-semibold uppercase tracking-wider text-left border-b border-gray-100 dark:border-gray-800 text-gray-400"
            >
              <Text size="1" weight="medium" color="gray" className="uppercase tracking-wider">
                {showDimensionColumn ? 'Dimensiones' : 'Total'}
              </Text>
            </th>
            
            {columnsFinal.map(col => (
              <th key={col.id} className="sticky top-0 z-[8] min-w-[120px] bg-white dark:bg-gray-900 p-3 text-right text-[0.7rem] font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-end gap-1">
                  <Text size="1" weight="medium">{col.medida.nombre}</Text>
                </div>
              </th>
            ))}
          </tr>
        </thead>
      );
    }

    // With column dimensions - build hierarchical headers
    const headerRows = [];

    // Generate header rows per column level
    for (let level = 0; level < numDimensionsCol; level++) {
      const headerCells = [];
      
      // Fixed dimension header (only in first row)
      if (level === 0) {
        headerCells.push(
          <th 
            key="dimension-header"
            rowSpan={numDimensionsCol + 1}
            className="sticky left-0 top-0 z-[100] min-w-[250px] bg-white dark:bg-gray-900 p-4 pb-4 text-xs font-semibold uppercase tracking-wider text-left border-b border-r border-gray-200 dark:border-gray-800 text-gray-500 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)]"
          >
            <Text size="1" weight="medium" color="gray" className="uppercase tracking-wider">
                Dimensiones
            </Text>
          </th>
        );
      }

      // Group columns respecting full hierarchy
      const groupsAtLevel = {};
      
      columnsFinal.forEach(col => {
        if (col.path[level]) {
          // Create unique key based on full path up to this level
          const pathKey = col.path.slice(0, level + 1).map(p => p.id).join('|');
          
          if (!groupsAtLevel[pathKey]) {
            groupsAtLevel[pathKey] = {
              nombre: col.path[level].nombre,
              pathKey: pathKey,
              count: 0
            };
          }
          groupsAtLevel[pathKey].count++;
        }
      });

      // Order groups by appearance in columnsFinal
      const orderedGroups = [];
      const seenKeys = new Set();
      
      columnsFinal.forEach(col => {
        if (col.path[level]) {
          const pathKey = col.path.slice(0, level + 1).map(p => p.id).join('|');
          if (!seenKeys.has(pathKey)) {
            seenKeys.add(pathKey);
            orderedGroups.push(groupsAtLevel[pathKey]);
          }
        }
      });

      // Create headers for this level
      orderedGroups.forEach((group, idx) => {
        headerCells.push(
          <th 
            key={`${level}-${group.pathKey}`}
            colSpan={group.count}
            className={cn(
                "sticky top-0 z-[90] text-center bg-white dark:bg-gray-900 p-2 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 border-r border-b border-gray-200 dark:border-gray-800 last:border-r-0 uppercase tracking-wider"
            )}
            style={{ top: `${level * 40}px` }} 
          >
            <Text size="1" weight="medium">{group.nombre}</Text>
          </th>
        );
      });

      headerRows.push(
        <tr key={`header-level-${level}`} className="">
          {headerCells}
        </tr>
      );
    }

    // Last row: measure headers
    const measureHeaders = [];
    
    columnsFinal.forEach(col => {
      measureHeaders.push(
        <th 
          key={col.id}
          className="sticky top-0 z-[90] text-right bg-white dark:bg-gray-800/50 p-2 px-4 text-[0.65rem] font-medium text-gray-600 uppercase tracking-widest border-b border-gray-200 dark:border-gray-800 shadow-sm"
          style={{ top: `${numDimensionsCol * 40}px` }}
        >
          <Text size="1" weight="medium" className="uppercase tracking-widest">{col.medida.nombre}</Text>
        </th>
      );
    });

    headerRows.push(
      <tr key="header-measures" className="">
        {measureHeaders}
      </tr>
    );

    return <thead>{headerRows}</thead>;
  };

  return (
    <ScrollArea 
      type="always" 
      scrollbars="both" 
      className="w-full h-full bg-white dark:bg-gray-900 rounded-xl relative shadow-sm border border-gray-200 dark:border-gray-800"
      style={{ maxHeight: '100%' }}
    >
      <table className="w-full border-collapse border-spacing-0 text-left">
        {renderColumnHeaders()}
        <tbody>
          {rows.map(row => renderRow(row))}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default AnalyticalTable;
