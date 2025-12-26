import React, { useState, useCallback, memo } from 'react';
import { ChevronRight, ChevronDown, Search, Database, Circle } from 'lucide-react';
import { Text, Flex, TextField, ScrollArea, Box } from '@radix-ui/themes';
import { cn } from '@utils/cn';

// Memoizado para evitar re-renders innecesarios
const SidebarTreeItem = memo(({ 
  item, 
  level = 0, 
  isGroup = false, 
  onToggle, 
  isExpanded, 
  childrenOptions = [], 
  isLoadingChildren = false 
}) => {
  const hasChildren = isGroup && item.expandable;

  const handleDragStart = useCallback((e) => {
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
    e.dataTransfer.effectAllowed = 'copy';
  }, [item]);

  const handleToggleClick = useCallback((e) => {
    e.stopPropagation();
    onToggle?.(item.id);
  }, [item.id, onToggle]);

  // Renderizar icono
  const renderIcon = () => {
    if (item.icono) {
      // Si es un componente React
      if (typeof item.icono === 'object' && item.icono.$$typeof) {
        return item.icono;
      }
      // Si es string, mostrar como texto (compatibilidad)
      if (typeof item.icono === 'string') {
        return <Text size="1" className="opacity-80">{item.icono}</Text>;
      }
    }
    // Fallback: icono Circle
    return <Circle size={8} className="text-primary opacity-60" />;
  };

  // Calcular padding basado en nivel
  const getPaddingClass = () => {
    switch (level) {
      case 0: return 'pl-2';
      case 1: return 'pl-6';
      case 2: return 'pl-10';
      default: return `pl-[${(level * 16) + 8}px]`;
    }
  };

  return (
    <Box className="select-none">
      <Flex 
        align="center"
        className={cn(
          "py-1.5 px-2 rounded cursor-grab transition-colors",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "active:cursor-grabbing",
          getPaddingClass(),
          level === 0 && "font-medium"
        )}
        draggable
        onDragStart={handleDragStart}
      >
        {hasChildren ? (
          <span 
            onClick={handleToggleClick}
            className="mr-1.5 flex items-center justify-center w-4 h-4 cursor-pointer hover:text-primary transition-colors"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        ) : (
          <span className="mr-1.5 w-4" />
        )}
        
        <span className="mr-2 flex items-center">{renderIcon()}</span>
        
        <Text
          className="truncate flex-grow"
          size={level === 0 ? "2" : "2"}
          weight={level === 0 ? "medium" : "regular"}
          color={level > 0 ? 'gray' : undefined}
        >
          {item.nombre || item.label}
        </Text>
      </Flex>

      {isExpanded && hasChildren && (
        <div className="flex flex-col">
          {isLoadingChildren && (
            <div className="pl-10 py-1.5 text-xs text-gray-400 italic">
              Cargando...
            </div>
          )}
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
});

SidebarTreeItem.displayName = 'SidebarTreeItem';

const SidebarTree = ({ 
  dimensions, 
  measures, 
  onGetChildren, 
  expandedGroups, 
  setExpandedGroups 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpand = useCallback((id) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
    if (!expandedGroups[id] && onGetChildren) {
      onGetChildren(id);
    }
  }, [expandedGroups, onGetChildren, setExpandedGroups]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Filtrado memoizado
  const searchLower = searchTerm.toLowerCase();
  const filteredDimensions = searchTerm 
    ? dimensions.filter(d => d.nombre.toLowerCase().includes(searchLower))
    : dimensions;
  const filteredMeasures = searchTerm
    ? measures.filter(m => m.nombre.toLowerCase().includes(searchLower))
    : measures;

  return (
    <aside className="w-64 min-w-[16rem] flex-shrink-0 flex flex-col bg-gray-50/50 dark:bg-gray-800/30 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <Box p="4" className="flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
        <Flex align="center" gap="2">
          <Database size={18} className="text-primary" />
          <Text weight="medium" size="2">Elementos</Text>
        </Flex>
      </Box>
      
      {/* Search */}
      <Box px="4" py="3" className="flex-shrink-0">
        <TextField.Root
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          size="2"
        >
          <TextField.Slot>
            <Search size={14} className="text-gray-400" />
          </TextField.Slot>
        </TextField.Root>
      </Box>

      {/* Tree Content - ScrollArea fuera de los items */}
      <ScrollArea 
        type="auto" 
        scrollbars="vertical" 
        className="flex-1"
      >
        <Box p="3">
          {/* Dimensiones */}
          <Box mb="4">
            <Text 
              size="1" 
              weight="medium" 
              color="gray" 
              className="uppercase tracking-wider px-2 mb-2 block"
            >
              Dimensiones
            </Text>
            <Flex direction="column" gap="0">
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
              {filteredDimensions.length === 0 && (
                <Text size="1" color="gray" className="px-2 py-2 italic">
                  No hay dimensiones
                </Text>
              )}
            </Flex>
          </Box>

          {/* Medidas */}
          <Box>
            <Text 
              size="1" 
              weight="medium" 
              color="gray" 
              className="uppercase tracking-wider px-2 mb-2 block"
            >
              Medidas
            </Text>
            <Flex direction="column" gap="0">
              {filteredMeasures.map((med) => (
                <SidebarTreeItem 
                  key={med.id} 
                  item={med} 
                  isGroup={false} 
                />
              ))}
              {filteredMeasures.length === 0 && (
                <Text size="1" color="gray" className="px-2 py-2 italic">
                  No hay medidas
                </Text>
              )}
            </Flex>
          </Box>
        </Box>
      </ScrollArea>
    </aside>
  );
};

export default memo(SidebarTree);