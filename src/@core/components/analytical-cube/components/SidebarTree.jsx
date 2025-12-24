import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Search, Database } from 'lucide-react';
import { Text, Flex, TextField, ScrollArea, Box } from '@radix-ui/themes';
import { cn } from '@utils/cn';

const SidebarTreeItem = ({ item, level = 0, isGroup = false, onToggle, isExpanded, childrenOptions = [], isLoadingChildren = false }) => {
  const hasChildren = isGroup && item.expandable;

  const handleDragStart = (e) => {
    const dragData = {
      id: item.id,
      nombre: item.nombre || item.label,
      label: item.label || item.nombre,
      tipo: item.tipo,
      dimension: item.dimension || item.id,
      idCampo: item.idCampo,
      campo: item.campo,
      icono: item.icono,
      isSpecific: item.tipo === 'filtro',
      value: item.value
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  return (
    <Box className="select-none">
      <Flex 
        align="center"
        className={cn(
          "py-1.5 px-2 rounded cursor-grab transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
          level === 0 ? "font-semibold" : "font-normal"
        )}
        draggable
        onDragStart={handleDragStart}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
      >
        {hasChildren ? (
          <span 
            onClick={(e) => {
                e.stopPropagation();
                onToggle(item.id);
            }} 
            className="mr-1 flex items-center justify-center w-4 h-4 cursor-pointer hover:text-primary transition-colors"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        ) : (
          <span className="mr-1 w-4" />
        )}
        
        {item.icono && <Text size="1" className="mr-2 opacity-80">{item.icono}</Text>}
        <Text
             className="truncate flex-grow"
             size={level === 0 ? "1" : "2"}
             weight={level === 0 ? "medium" : "regular"}
             style={{ letterSpacing: level === 0 ? '0.05em' : 'normal', textTransform: level === 0 ? 'uppercase' : 'none' }}
             color={level === 0 ? 'gray' : undefined}
        >
          {item.nombre || item.label}
        </Text>
      </Flex>

      {isExpanded && hasChildren && (
        <div className="flex flex-col">
          {isLoadingChildren && <div className="pl-8 py-1 text-xs text-gray-400 italic">Cargando...</div>}
          {childrenOptions.map(opt => (
            <SidebarTreeItem 
              key={opt.value} 
              item={{ ...opt, tipo: 'filtro' }} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </Box>
  );
};

const SidebarTree = ({ 
  dimensions, 
  measures, 
  onGetChildren, 
  expandedGroups, 
  setExpandedGroups 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpand = (id) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
    if (!expandedGroups[id] && onGetChildren) {
      onGetChildren(id);
    }
  };

  const filteredDimensions = dimensions.filter(d => d.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMeasures = measures.filter(m => m.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <aside className="w-64 min-w-[16rem] flex flex-col bg-gray-50/50 dark:bg-gray-800/30 h-full">
      <Box p="4" className="flex justify-between items-center">
        <Flex align="center" gap="2">
          <Database size={18} className="text-primary" />
          <Text weight="medium" size="2">Elementos</Text>
        </Flex>
      </Box>
      
      <Box px="4" pb="2">
        <TextField.Root
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        >
            <TextField.Slot>
                <Search size={14} />
            </TextField.Slot>
        </TextField.Root>
      </Box>

      <ScrollArea className="p-3 flex-1">
        <Box mb="4">
          <Text size="1" weight="medium" color="gray" className="uppercase tracking-wider px-2 mb-2 block">Dimensiones</Text>
          <Flex direction="column" gap="1">
            {filteredDimensions.map((dim) => (
                <SidebarTreeItem 
                key={dim.id} 
                item={dim} 
                isGroup={true} 
                isExpanded={expandedGroups[dim.id]}
                onToggle={toggleExpand}
                childrenOptions={dim.options || []}
                isLoadingChildren={dim.loading}
                />
            ))}
          </Flex>
        </Box>

        <Box mb="2">
          <Text size="1" weight="medium" color="gray" className="uppercase tracking-wider px-2 mb-2 block">Medidas</Text>
          <Flex direction="column" gap="1">
            {filteredMeasures.map((med) => (
                <SidebarTreeItem key={med.id} item={med} isGroup={false} />
            ))}
          </Flex>
        </Box>
      </ScrollArea>
    </aside>
  );
};

export default SidebarTree;
