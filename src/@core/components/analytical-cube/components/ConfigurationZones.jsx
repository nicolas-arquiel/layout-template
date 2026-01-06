import React, { useCallback, memo } from "react";
import { X, Filter, BarChart2, List, Grid, Circle } from "lucide-react";
import { Text, Flex, Badge, Box, Grid as RadixGrid } from '@radix-ui/themes';
import { cn } from "@utils/cn";

const ConfigurationZones = ({ cuboConfig, setCuboConfig, dimensionesDisponibles, medidasDisponibles }) => {
  const allItems = [...dimensionesDisponibles, ...medidasDisponibles];

  // Eliminar item de una zona
  const handleRemove = useCallback((zoneId, itemId) => {
    setCuboConfig(prev => ({
      ...prev,
      [zoneId]: prev[zoneId].filter(item => 
        (typeof item === 'string' ? item !== itemId : item.id !== itemId)
      )
    }));
  }, [setCuboConfig]);

  // Drag start desde dentro de una zona (para reordenar o mover)
  const handleZoneDragStart = useCallback((e, zoneId, index, item) => {
    e.stopPropagation();
    const dragData = {
      type: 'ZONE_ITEM',
      zoneId,
      index,
      item: typeof item === 'object' ? item : { id: item, tipo: 'dimension' }
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  // Drop en una zona
  const onDrop = useCallback((e, targetZoneId, targetIndex = -1) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;
      
      const data = JSON.parse(dataStr);

      // Case 1: Nuevo item desde Sidebar
      if (data.id && !data.type) { 
        const item = data;
        
        // Verificar si ya existe
        const exists = cuboConfig[targetZoneId].some(existing => 
          (typeof existing === 'string' ? existing === item.id : existing.id === item.id)
        );
        if (exists) return;

        // Reglas de validación
        if (targetZoneId === 'medidas' && item.tipo !== 'medida') return;
        if (item.isSpecific && targetZoneId !== 'filtros') return;

        setCuboConfig(prev => {
          const newList = [...prev[targetZoneId]];
          const insertIdx = targetIndex !== -1 ? targetIndex : newList.length;
          newList.splice(insertIdx, 0, item.isSpecific ? item : item.id);
          return { ...prev, [targetZoneId]: newList };
        });
        return;
      }

      // Case 2: Mover desde otra zona o reordenar
      if (data.type === 'ZONE_ITEM') {
        const { zoneId: sourceZoneId, index: sourceIndex, item } = data;

        setCuboConfig(prev => {
          const newSourceList = [...prev[sourceZoneId]];
          const [movedItem] = newSourceList.splice(sourceIndex, 1);
          
          // Si es la misma zona, trabajamos con la lista ya modificada
          if (sourceZoneId === targetZoneId) {
            const insertIdx = targetIndex !== -1 ? targetIndex : newSourceList.length;
            // Ajustar índice si movemos hacia abajo en la misma lista
            const adjustedIdx = targetIndex > sourceIndex ? insertIdx : insertIdx;
            newSourceList.splice(adjustedIdx, 0, movedItem);
            return { ...prev, [sourceZoneId]: newSourceList };
          }
          
          // Si es diferente zona, verificar que no exista
          const exists = prev[targetZoneId].some(existing => 
            (typeof existing === 'string' ? existing === item.id : existing.id === item.id)
          );
          if (exists) return prev;

          const newTargetList = [...prev[targetZoneId]];
          const insertIdx = targetIndex !== -1 ? targetIndex : newTargetList.length;
          newTargetList.splice(insertIdx, 0, movedItem);

          return {
            ...prev,
            [sourceZoneId]: newSourceList,
            [targetZoneId]: newTargetList
          };
        });
      }
    } catch (err) {
      console.error("Error en drop:", err);
    }
  }, [cuboConfig, setCuboConfig]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Renderizar icono del item
  const renderIcon = useCallback((item) => {
    if (item.icono) {
      if (typeof item.icono === 'object' && item.icono.$$typeof) {
        return item.icono;
      }
      if (typeof item.icono === 'string') {
        return <Text size="1">{item.icono}</Text>;
      }
    }
    return <Circle size={8} />;
  }, []);

  // Renderizar badge de item
  const renderBadge = useCallback((zoneId, itemOrId, index) => {
    const isObject = typeof itemOrId === 'object';
    const itemId = isObject ? itemOrId.id : itemOrId;
    const item = isObject ? itemOrId : allItems.find(i => i.id === itemId);
    
    if (!item) return null;

    const isMeasure = item.tipo === 'medida' || zoneId === 'medidas';

    return (
      <div 
        key={`${zoneId}-${itemId}`} 
        className="inline-block"
        draggable
        onDragStart={(e) => handleZoneDragStart(e, zoneId, index, isObject ? item : { id: itemId, ...item })}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, zoneId, index)}
      >
        <Badge 
          variant="solid" 
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 m-1",
            "cursor-grab active:cursor-grabbing",
            "shadow-sm text-white",
            isMeasure 
              ? "bg-emerald-500 hover:bg-emerald-600" 
              : "bg-violet-500 hover:bg-violet-600"
          )}
          title="Arrastra fuera para eliminar"
        >
          <span className="flex items-center opacity-80">
            {renderIcon(item)}
          </span>
          <Text size="1" weight="medium" className="truncate max-w-[100px]">
            {item.label || item.nombre}
          </Text>
          <X 
            size={12} 
            className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity ml-0.5 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(zoneId, itemId);
            }}
          />
        </Badge>
      </div>
    );
  }, [allItems, handleRemove, handleZoneDragStart, onDragOver, onDrop, renderIcon]);

  return (
    <Box width="100%">
      <RadixGrid columns={{ initial: '1', sm: '2', lg: '4' }} gap="3">
        <ConfigBox 
          id="medidas" 
          titulo="Medidas" 
          items={cuboConfig.medidas} 
          icono={<BarChart2 size={14} />}
          onDragOver={onDragOver}
          onDrop={onDrop}
          renderBadge={renderBadge}
        />
        <ConfigBox 
          id="filas" 
          titulo="Filas" 
          items={cuboConfig.filas} 
          icono={<List size={14} />}
          onDragOver={onDragOver}
          onDrop={onDrop}
          renderBadge={renderBadge}
        />
        <ConfigBox 
          id="columnas" 
          titulo="Columnas" 
          items={cuboConfig.columnas} 
          icono={<Grid size={14} />}
          onDragOver={onDragOver}
          onDrop={onDrop}
          renderBadge={renderBadge}
        />
        <ConfigBox 
          id="filtros" 
          titulo="Filtros" 
          items={cuboConfig.filtros} 
          icono={<Filter size={14} />}
          onDragOver={onDragOver}
          onDrop={onDrop}
          renderBadge={renderBadge}
        />
      </RadixGrid>
    </Box>
  );
};

// Componente ConfigBox memoizado
const ConfigBox = memo(({ id, titulo, items, icono, onDragOver, onDrop, renderBadge }) => (
  <Box 
    className={cn(
      "bg-white dark:bg-gray-800 rounded-lg p-3 h-full min-h-[100px]",
      "shadow-sm border border-gray-200 dark:border-gray-700",
      "flex flex-col transition-colors",
      "hover:border-primary/30"
    )}
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, id)}
  >
    <Flex justify="between" align="center" mb="2" px="1">
      <Flex align="center" gap="2" className="text-gray-500 dark:text-gray-400">
        <span className="text-primary opacity-80">{icono}</span>
        <Text size="1" weight="bold" className="uppercase tracking-widest text-gray-500">
          {titulo}
        </Text>
      </Flex>
      <Badge variant="soft" color="gray" radius="full" size="1">
        {items.length}
      </Badge>
    </Flex>
    
    <Flex wrap="wrap" align="start" className="flex-1 min-h-[48px]">
      {items.length === 0 ? (
        <Flex 
          justify="center" 
          align="center" 
          width="100%" 
          className="h-full py-3 border border-dashed border-gray-200 dark:border-gray-700 rounded-md"
        >
          <Text size="1" color="gray" className="italic">
            Arrastra aquí
          </Text>
        </Flex>
      ) : (
        items.map((item, idx) => renderBadge(id, item, idx))
      )}
    </Flex>
  </Box>
));

ConfigBox.displayName = 'ConfigBox';

export default memo(ConfigurationZones);