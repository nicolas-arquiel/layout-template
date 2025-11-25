import React, { useState, useRef, useEffect } from 'react';
import { Flex, Text, Badge, IconButton, TextField, Checkbox, Box, ScrollArea, Popover } from '@radix-ui/themes';
import { Cross2Icon, ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

/**
 * MultiSelect nativo con Radix UI
 * Reemplaza react-select con isMulti={true}
 */
const MultiSelect = ({
  options = [],
  value = [], // Array de valores seleccionados ['value1', 'value2']
  onChange,
  placeholder = "Seleccionar...",
  searchable = true,
  maxHeight = 200,
  disabled = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  // Filtrar opciones según búsqueda
  const filteredOptions = searchable && searchTerm
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Obtener labels de los valores seleccionados
  const selectedLabels = value
    .map(val => options.find(opt => opt.value === val))
    .filter(Boolean);

  const handleToggle = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];

    onChange?.(newValue);
  };

  const handleRemove = (optionValue, e) => {
    e.stopPropagation();
    onChange?.(value.filter(v => v !== optionValue));
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.([]);
  };

  // Focus en el input de búsqueda cuando se abre
  useEffect(() => {
    if (open && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
    if (!open) {
      setSearchTerm('');
    }
  }, [open, searchable]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Box
          style={{
            position: 'relative',
            minHeight: '30px',
            padding: selectedLabels.length > 0 ? '2px 4px' : '0 8px',
            border: '1px solid var(--gray-7)',
            borderRadius: 'var(--radius-2)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: disabled ? 'var(--gray-2)' : 'var(--color-background)',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '4px',
            opacity: disabled ? 0.6 : 1,
            ...props.style
          }}
          onClick={() => !disabled && setOpen(!open)}
        >
          {selectedLabels.length === 0 ? (
            <Text size="2" color="gray">{placeholder}</Text>
          ) : (
            <Flex wrap="wrap" gap="1" style={{ flex: 1 }}>
              {selectedLabels.map(opt => (
                <Badge key={opt.value} size="1" variant="soft">
                  <Flex align="center" gap="1">
                    {opt.label}
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={(e) => handleRemove(opt.value, e)}
                      style={{
                        width: '14px',
                        height: '14px',
                        padding: 0,
                        minWidth: '14px'
                      }}
                    >
                      <Cross2Icon width="10" height="10" />
                    </IconButton>
                  </Flex>
                </Badge>
              ))}
            </Flex>
          )}

          <Flex align="center" gap="1" style={{ marginLeft: 'auto' }}>
            {selectedLabels.length > 0 && (
              <IconButton
                size="1"
                variant="ghost"
                onClick={handleClear}
                style={{ width: '16px', height: '16px' }}
              >
                <Cross2Icon width="12" height="12" />
              </IconButton>
            )}
            <ChevronDownIcon
              width="14"
              height="14"
              style={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </Flex>
        </Box>
      </Popover.Trigger>

      <Popover.Content
        align="start"
        side="bottom"
        sideOffset={4}
        style={{
          width: 'var(--radix-popover-trigger-width)',
          maxWidth: '400px',
          backgroundColor: 'var(--color-panel-solid)',
          border: '1px solid var(--gray-7)',
          borderRadius: 'var(--radius-3)',
          padding: '4px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 9999
        }}
      >
        <Flex direction="column" gap="1">
          {searchable && (
            <Box p="2" pb="1">
              <TextField.Root
                ref={searchInputRef}
                size="1"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon width="14" height="14" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
          )}

          <ScrollArea style={{ maxHeight: `${maxHeight}px` }}>
            <Flex direction="column" gap="1" p="1">
              {filteredOptions.length === 0 ? (
                <Box p="2">
                  <Text size="2" color="gray">No se encontraron opciones</Text>
                </Box>
              ) : (
                filteredOptions.map(option => (
                  <Box
                    key={option.value}
                    p="2"
                    style={{
                      borderRadius: 'var(--radius-2)',
                      cursor: 'pointer',
                      backgroundColor: value.includes(option.value)
                        ? 'var(--accent-3)'
                        : 'transparent',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      if (!value.includes(option.value)) {
                        e.currentTarget.style.backgroundColor = 'var(--gray-3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!value.includes(option.value)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(option.value);
                    }}
                  >
                    <Flex align="center" gap="2">
                      <Checkbox
                        checked={value.includes(option.value)}
                        onCheckedChange={() => handleToggle(option.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Text size="2">{option.label}</Text>
                    </Flex>
                  </Box>
                ))
              )}
            </Flex>
          </ScrollArea>

          {selectedLabels.length > 0 && (
            <Box p="2" pt="1" style={{ borderTop: '1px solid var(--gray-5)' }}>
              <Text size="1" color="gray">
                {selectedLabels.length} seleccionado{selectedLabels.length !== 1 ? 's' : ''}
              </Text>
            </Box>
          )}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default MultiSelect;
