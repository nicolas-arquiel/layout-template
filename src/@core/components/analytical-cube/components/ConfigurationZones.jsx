import React, { useRef } from "react";
import { X, Filter, BarChart2, List, Grid } from "lucide-react";
import { Text, Flex, Badge, Box, Grid as RadixGrid } from '@radix-ui/themes';
import { cn } from "@utils/cn";

const ConfigurationZones = ({ cuboConfig, setCuboConfig, dimensionesDisponibles, medidasDisponibles }) => {
  const allItems = [...dimensionesDisponibles, ...medidasDisponibles];

  const handleRemove = (zoneId, itemId) => {
    setCuboConfig(prev => ({
      ...prev,
      [zoneId]: prev[zoneId].filter(item => (typeof item === 'string' ? item !== itemId : item.id !== itemId))
    }));
  };

  // Handle start of drag from WITHIN a zone (for reordering or removal)
  const handleZoneDragStart = (e, zoneId, index, item) => {
    e.stopPropagation(); // Prevent bubbling if needed
    const dragData = {
      type: 'ZONE_ITEM',
      zoneId,
      index,
      item: typeof item === 'object' ? item : { id: item, tipo: 'dimension' } // Fallback for string IDs
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (e, targetZoneId, targetIndex = -1) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;
      
      const data = JSON.parse(dataStr);

      // Case 1: Dragging from Sidebar (New Item)
      if (data.id && !data.type) { 
         const item = data;
         
         // Check existence
         const exists = cuboConfig[targetZoneId].some(existing => (typeof existing === 'string' ? existing === item.id : existing.id === item.id));
         if (exists) return;

         // Validation Rules
         if (targetZoneId === 'medidas' && item.tipo !== 'medida') return;
         if (targetZoneId !== 'medidas' && item.tipo === 'medida' && !item.isSpecific) {}
         if (item.isSpecific && targetZoneId !== 'filtros') return;

         setCuboConfig(prev => {
           const newList = [...prev[targetZoneId]];
           const insertIdx = targetIndex !== -1 ? targetIndex : newList.length;
           newList.splice(insertIdx, 0, item.isSpecific ? item : item.id);
           
           return {
             ...prev,
             [targetZoneId]: newList
           };
         });
         return;
      }

      // Case 2: Dragging from another Zone or reordering in same zone
      if (data.type === 'ZONE_ITEM') {
        const { zoneId: sourceZoneId, index: sourceIndex, item } = data;

        setCuboConfig(prev => {
           const newSourceList = [...prev[sourceZoneId]];
           // Remove from source
           const [movedItem] = newSourceList.splice(sourceIndex, 1);
           
           // If same zone, target list is the modified source list
           // If different zone, target list is a copy of that zone
           let newTargetList = sourceZoneId === targetZoneId ? newSourceList : [...prev[targetZoneId]];

           // If different zone, check existence
           if (sourceZoneId !== targetZoneId) {
                const exists = prev[targetZoneId].some(existing => (typeof existing === 'string' ? existing === item.id : existing.id === item.id));
                if (exists) return prev; // Do nothing if exists
           }

           // Calculate insert index
           // If same zone and moving down (targetIndex > sourceIndex), logic handles it because we removed first
           // targetIndex is based on the list state BEFORE removal if we passed it from the UI?
           // Actually, standard behavior is usually simpler. Let's rely on splice.
           
           // Valid targetIndex?
           const insertIdx = targetIndex !== -1 ? targetIndex : newTargetList.length;
           
           newTargetList.splice(insertIdx, 0, movedItem);

           return {
             ...prev,
             [sourceZoneId]: sourceZoneId === targetZoneId ? newTargetList : newSourceList,
             [targetZoneId]: sourceZoneId === targetZoneId ? newTargetList : newTargetList
           };
        });
      }

    } catch (err) {
      console.error("Error parsing drop data", err);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const renderBadge = (zoneId, itemOrId, index) => {
    const isObject = typeof itemOrId === 'object';
    const itemId = isObject ? itemOrId.id : itemOrId;
    const item = isObject ? itemOrId : allItems.find(i => i.id === itemId);
    
    if (!item) return null;

    return (
      <div 
        key={`${zoneId}-${itemId}`} 
        className="m-1 inline-block"
        draggable
        onDragStart={(e) => handleZoneDragStart(e, zoneId, index, isObject ? item : { id: itemId, ...item })}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, zoneId, index)}
      >
        <Badge 
          variant="solid" 
          className={cn(
            "flex items-center gap-2 px-2.5 py-1.5 cursor-grab active:cursor-grabbing transition-colors group/badge shadow-sm text-white",
            // Color logic based on type or zone
            (item.tipo === 'medida' || zoneId === 'medidas') 
                ? "bg-emerald-500 hover:bg-emerald-600" 
                : "bg-[#7367F0] hover:bg-[#5E50EE]" // Purple specific to reference
          )}
          title="Arrastra fuera para eliminar"
        >
          <Text size="1" weight="medium" className="truncate max-w-[120px]">
            {item.label || item.nombre}
          </Text>
          <X 
            size={14} 
            className="cursor-pointer text-white/70 hover:text-white transition-colors ml-1"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(zoneId, itemId);
            }}
          />
        </Badge>
      </div>
    );
  };

  const ConfigBox = ({ id, titulo, items, icono }) => (
    <Box 
      className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full min-h-[120px] shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
    >
      <Flex justify="between" align="center" mb="3" px="1">
        <Flex align="center" gap="2" className="text-gray-500 dark:text-gray-400">
          <span className="opacity-80 text-[#7367F0]">{icono}</span>
          <Text size="1" weight="bold" className="uppercase tracking-widest text-xs text-gray-500">
            {titulo}
          </Text>
        </Flex>
        <Badge variant="soft" color="gray" radius="full">
            {items.length}
        </Badge>
      </Flex>
      
      <Flex wrap="wrap" gap="2" align="center" style={{ minHeight: '50px' }}>
        {items.length === 0 ? (
          <Flex justify="center" align="center" width="100%" height="100%" py="2">
            <Text size="1" color="gray" style={{ fontStyle: 'italic' }}>
                Arrastra aquí
            </Text>
          </Flex>
        ) : (
          items.map((item, idx) => renderBadge(id, item, idx))
        )}
      </Flex>
    </Box>
  );

  return (
    <Box width="100%">
      <RadixGrid columns={{ initial: '1', md: '2', lg: '4' }} gap="4">
        <ConfigBox id="medidas" titulo="Medidas" items={cuboConfig.medidas} icono={<BarChart2 size={14} />} />
        <ConfigBox id="filas" titulo="Filas" items={cuboConfig.filas} icono={<List size={14} />} />
        <ConfigBox id="columnas" titulo="Columnas" items={cuboConfig.columnas} icono={<Grid size={14} />} />
        <ConfigBox id="filtros" titulo="Filtros" items={cuboConfig.filtros} icono={<Filter size={14} />} />
      </RadixGrid>
    </Box>
  );
};

export default ConfigurationZones;
