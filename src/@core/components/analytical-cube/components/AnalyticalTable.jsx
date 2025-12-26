import React, { useMemo } from 'react';
import { Text, ScrollArea, Badge } from '@radix-ui/themes';
import { agregarDato } from '../cube-utils';
import { cn } from '@utils/cn';

const AnalyticalTable = ({ rows, columnsFinal, dimensionsRow, dimensionsCol, measures }) => {
  if (!rows || rows.length === 0) return null;

  // Determine if we should show the dimension column
  const showDimensionColumn = dimensionsRow.length > 0;
  const numDimensionsCol = dimensionsCol.length;

  const renderRow = (row, level = 0) => {
    const isParent = row.hijos && row.hijos.length > 0;
    
    // Hierarchy styling
    const isRoot = level === 0;
    const bgClass = isRoot 
        ? "bg-gray-50/50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-800" 
        : "bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900";

    // Calculate padding left based on level
    const paddingLeftClass = level === 0 ? 'pl-4' : 
                            level === 1 ? 'pl-9' : 
                            level === 2 ? 'pl-14' : 
                            level === 3 ? 'pl-[76px]' : 
                            `pl-[${(level * 20) + 16}px]`;

    return (
      <React.Fragment key={`${row.dimension}-${row.id}`}>
        <tr className={cn("group transition-colors", bgClass)}>
          {/* Hierarchical dimension column */}
          <td 
            className={cn(
              "sticky left-0 z-[2] align-middle border-r border-b border-gray-300 dark:border-gray-600 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]",
              paddingLeftClass,
              isRoot ? "font-medium text-gray-900 dark:text-gray-100 bg-gray-50/95 dark:bg-gray-900/95" : "text-gray-700 dark:text-gray-300 bg-white/95 dark:bg-gray-950/95"
            )}
          >
            <div className="flex items-center py-2 relative h-full">
               {/* Indentation guide line */}
               {level > 0 && (
                   <div 
                    className={cn(
                      "absolute top-0 bottom-0 border-l border-dashed border-gray-300 dark:border-gray-700",
                      level === 1 ? "left-[28px]" :
                      level === 2 ? "left-[48px]" :
                      level === 3 ? "left-[68px]" :
                      `left-[${(level * 20) + 8}px]`
                    )}
                   />
               )}
               
               {/* Hierarchy Marker */}
               <div className={cn(
                   "w-1.5 h-1.5 rounded-full mr-3 shrink-0",
                   isRoot ? "bg-primary-500" : "bg-gray-300 dark:bg-gray-600"
               )} />
               
               <Text size="2" weight={isRoot ? "medium" : "regular"} className="truncate">
                 {row.nombre}
               </Text>
            </div>
          </td>
          
          {/* Data columns */}
          {columnsFinal.map((col, idx) => {
            const items = row.items || [];
            const val = agregarDato(items.filter(item => {
              // Filter items matching the column path
              return col.path.every(p => item[dimensionsCol.find(d => d.id === p.dimension).idCampo] === p.id);
            }), col.medida);
            
            // Determine if this column is the start of a new measure group 
            const isFirstMeasure = idx === 0 || columnsFinal[idx-1].path.length !== col.path.length || 
                                   (col.path.length > 0 && columnsFinal[idx-1].path[columnsFinal[idx-1].path.length-1].id !== col.path[col.path.length-1].id);

            return (
              <td 
                key={col.id} 
                className={cn(
                    "text-right px-4 tabular-nums cursor-default border-b border-r border-gray-300 dark:border-gray-700",
                    isRoot ? "font-medium text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400",
                    isFirstMeasure ? "border-l border-gray-300 dark:border-gray-700" : ""
                )}
              >
                <Text size="2">{val.toLocaleString()}</Text>
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
    // If no column dimensions, just show measures
    if (numDimensionsCol === 0) {
      return (
        <thead>
          <tr className="h-10">
            <th 
              className="sticky left-0 top-0 z-[5] bg-gray-50 dark:bg-gray-900 p-3 text-left border-b border-r border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700 w-[280px]"
            >
              <Text size="1" weight="bold" className="uppercase tracking-wider">
                {showDimensionColumn ? 'Dimensiones' : 'Total'}
              </Text>
            </th>
            
            {columnsFinal.map(col => (
              <th 
                key={col.id} 
                className="sticky top-0 z-[3] bg-gray-50 dark:bg-gray-900 p-3 text-right border-b border-r border-t border-gray-300 dark:border-gray-700 min-w-[120px]"
              >
                <div className="flex items-center justify-end gap-1">
                   {/* Measure Color Indicator */}
                   <span className="w-1.5 h-1.5 rounded-sm bg-blue-500/50 mr-2"></span>
                  <Text size="1" weight="bold" className="uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      {col.medida.nombre}
                  </Text>
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
      const isFirstRow = level === 0;
      
      // Fixed dimension header (only in first row, spans all logic rows)
      if (isFirstRow) {
        headerCells.push(
          <th 
            key="dimension-header"
            rowSpan={numDimensionsCol + 1} // +1 for measures row
            className="sticky left-0 top-0 z-[5] bg-gray-50 dark:bg-gray-900 border-b border-r border-t border-gray-300 dark:border-gray-600 shadow-sm w-[280px] min-w-[280px]"
          >
            <div className="px-6 py-4 flex flex-col justify-between h-full">
                <Text size="1" weight="bold" color="gray" className="uppercase tracking-widest text-gray-700 dark:text-gray-300">
                    Dimensiones
                </Text>
            </div>
          </th>
        );
      }

      // Group columns respecting full hierarchy
      const groupsAtLevel = {};
      const orderedGroups = [];
      const seenKeys = new Set();
      
      columnsFinal.forEach(col => {
        if (col.path[level]) {
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

      columnsFinal.forEach((col) => {
        if (col.path[level]) {
          const pathKey = col.path.slice(0, level + 1).map(p => p.id).join('|');
          if (!seenKeys.has(pathKey)) {
            seenKeys.add(pathKey);
            orderedGroups.push(groupsAtLevel[pathKey]);
          }
        }
      });

      // Create headers for this level
      orderedGroups.forEach((group) => {
        // Calculate top position based on level
        const topClass = level === 0 ? 'top-0' : 
                        level === 1 ? 'top-10' : 
                        level === 2 ? 'top-20' : 
                        level === 3 ? 'top-[120px]' :
                        `top-[${level * 40}px]`;

        headerCells.push(
          <th 
            key={`${level}-${group.pathKey}`}
            colSpan={group.count}
            className={cn(
                "sticky z-[3] text-center p-0 border-r border-b border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 h-10",
                topClass
            )}
          >
             <div className="flex items-center justify-center h-full px-2">
                <Text size="1" weight="bold" className="uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {group.nombre}
                </Text>
             </div>
          </th>
        );
      });

      headerRows.push(
        <tr key={`header-level-${level}`} className="h-10">
          {headerCells}
        </tr>
      );
    }

    // Last row: measure headers
    const measureHeaders = [];
    
    // Calculate top position for measure headers
    const measureTopClass = numDimensionsCol === 0 ? 'top-0' :
                           numDimensionsCol === 1 ? 'top-10' :
                           numDimensionsCol === 2 ? 'top-20' :
                           numDimensionsCol === 3 ? 'top-[120px]' :
                           `top-[${numDimensionsCol * 40}px]`;
    
    columnsFinal.forEach((col, idx) => {
      // Add border-left if it's the start of a distinct group
      const isStartOfGroup = idx === 0 || 
        (col.path.length > 0 && columnsFinal[idx-1].path[col.path.length-1].id !== col.path[col.path.length-1].id);

      measureHeaders.push(
        <th 
          key={`measure-${col.id}`}
          className={cn(
              "sticky z-[3] text-right px-4 border-b border-t border-gray-300 dark:border-gray-700 border-r border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 h-10 min-w-[120px]",
              measureTopClass,
              isStartOfGroup ? "border-l border-l-gray-300 dark:border-l-gray-700" : ""
          )}
        >
           <Text size="1" weight="medium" className="uppercase tracking-wide text-gray-500 dark:text-gray-400 text-[10px]">
             {col.medida.nombre}
           </Text>
        </th>
      );
    });

    headerRows.push(
      <tr key="header-measures" className="h-10">
        {measureHeaders}
      </tr>
    );

    return <thead>{headerRows}</thead>;
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm">
      <ScrollArea 
        type="always" 
        scrollbars="both" 
        className="flex-1 w-full h-full"
      >
        <div className="min-w-max">
          <table className="w-full border-separate border-spacing-0 text-left">
            {renderColumnHeaders()}
            <tbody>
              {rows.map(row => renderRow(row))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AnalyticalTable;
