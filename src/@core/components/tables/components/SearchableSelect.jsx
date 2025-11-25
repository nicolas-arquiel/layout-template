import React, { useState, useRef, useEffect } from 'react';
import { Flex, Text, TextField, Box, ScrollArea } from '@radix-ui/themes';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';

/**
 * Select con búsqueda nativo con Radix UI
 * Reemplaza react-select (single)
 */
const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Seleccionar...",
  searchable = true,
  maxHeight = 200,
  disabled = false,
  noOptionsMessage = "No se encontraron datos",
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

  // Obtener label del valor seleccionado
  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setOpen(false);
    setSearchTerm('');
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
            padding: '0 8px',
            border: '1px solid var(--gray-7)',
            borderRadius: 'var(--radius-2)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: disabled ? 'var(--gray-2)' : 'var(--color-background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: disabled ? 0.6 : 1,
            ...props.style
          }}
          onClick={() => !disabled && setOpen(!open)}
        >
          <Text size="2" color={selectedOption ? undefined : "gray"}>
            {selectedOption?.label || placeholder}
          </Text>

          <ChevronDownIcon
            width="14"
            height="14"
            style={{
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              marginLeft: '8px'
            }}
          />
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
                  <Text size="2" color="gray">{noOptionsMessage}</Text>
                </Box>
              ) : (
                filteredOptions.map(option => (
                  <Box
                    key={option.value}
                    p="2"
                    style={{
                      borderRadius: 'var(--radius-2)',
                      cursor: 'pointer',
                      backgroundColor: option.value === value
                        ? 'var(--accent-3)'
                        : 'transparent',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      if (option.value !== value) {
                        e.currentTarget.style.backgroundColor = 'var(--gray-3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (option.value !== value) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option.value);
                    }}
                  >
                    <Text size="2" weight={option.value === value ? "medium" : "regular"}>
                      {option.label}
                    </Text>
                  </Box>
                ))
              )}
            </Flex>
          </ScrollArea>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default SearchableSelect;
