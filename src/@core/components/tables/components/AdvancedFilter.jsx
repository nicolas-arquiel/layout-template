import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Flex,
  Text,
  IconButton,
  Badge,
  Box
} from '@radix-ui/themes';
import {
  MixerHorizontalIcon,
  PlusIcon,
  TrashIcon,
  Cross2Icon
} from '@radix-ui/react-icons';
import Select from 'react-select';
import { selectThemeColors } from '@utils';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '32px',
    fontSize: '14px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '32px',
  }),
};

const AdvancedFilter = ({
  columns,
  filters,
  onFiltersChange,
  onApply,
  onClear,
  operators = [
    { value: 'equals', label: 'Igual a' },
    { value: 'contains', label: 'Contiene' },
    { value: 'startsWith', label: 'Comienza con' },
    { value: 'endsWith', label: 'Termina con' },
    { value: 'gt', label: 'Mayor que' },
    { value: 'lt', label: 'Menor que' },
    { value: 'gte', label: 'Mayor o igual' },
    { value: 'lte', label: 'Menor o igual' },
    { value: 'notEquals', label: 'Diferente de' },
  ],
  activeFiltersCount = 0
}) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters || []);

  const handleAddFilter = () => {
    const newFilter = {
      id: Date.now(),
      field: '',
      operator: 'equals',
      value: ''
    };
    const updated = [...localFilters, newFilter];
    setLocalFilters(updated);
    if (onFiltersChange) onFiltersChange(updated);
  };

  const handleRemoveFilter = (filterId) => {
    const updated = localFilters.filter(f => f.id !== filterId);
    setLocalFilters(updated);
    if (onFiltersChange) onFiltersChange(updated);
  };

  const handleFilterChange = (filterId, field, value) => {
    const updated = localFilters.map(f =>
      f.id === filterId ? { ...f, [field]: value } : f
    );
    setLocalFilters(updated);
    if (onFiltersChange) onFiltersChange(updated);
  };

  const handleApply = () => {
    if (onApply) onApply(localFilters);
    setOpen(false);
  };

  const handleClear = () => {
    setLocalFilters([]);
    if (onClear) onClear();
    if (onFiltersChange) onFiltersChange([]);
  };

  const columnOptions = columns?.map(col => ({
    value: col.selector || col.id,
    label: col.name || col.header
  })) || [];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft" size="2">
          <MixerHorizontalIcon width="16" height="16" />
          Filtro Avanzado
          {activeFiltersCount > 0 && (
            <Badge color="blue" size="1" ml="1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: '650px' }}>
        <Dialog.Title>Filtro Avanzado</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Agregue múltiples condiciones para filtrar los datos de la tabla.
        </Dialog.Description>

        <Flex direction="column" gap="3" mb="4">
          {localFilters.length === 0 ? (
            <Box
              style={{
                padding: 'var(--space-4)',
                textAlign: 'center',
                color: 'var(--gray-11)',
                backgroundColor: 'var(--gray-3)',
                borderRadius: 'var(--radius-2)'
              }}
            >
              <Text size="2">No hay filtros activos. Haga clic en "Agregar filtro" para comenzar.</Text>
            </Box>
          ) : (
            localFilters.map((filter) => (
              <Flex key={filter.id} gap="2" align="center">
                <Box style={{ flex: '1', minWidth: '150px' }}>
                  <Select
                    theme={selectThemeColors}
                    options={columnOptions}
                    value={columnOptions.find(opt => opt.value === filter.field)}
                    onChange={(option) => handleFilterChange(filter.id, 'field', option?.value || '')}
                    placeholder="Seleccionar campo..."
                    isClearable={false}
                    styles={customStyles}
                  />
                </Box>

                <Box style={{ flex: '0 0 140px' }}>
                  <Select
                    theme={selectThemeColors}
                    options={operators}
                    value={operators.find(opt => opt.value === filter.operator)}
                    onChange={(option) => handleFilterChange(filter.id, 'operator', option?.value || 'equals')}
                    placeholder="Operador..."
                    isClearable={false}
                    isSearchable={false}
                    styles={customStyles}
                  />
                </Box>

                <Box style={{ flex: '1', minWidth: '120px' }}>
                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
                    placeholder="Valor..."
                    style={{
                      width: '100%',
                      height: '32px',
                      padding: '0 8px',
                      fontSize: '14px',
                      border: '1px solid var(--gray-7)',
                      borderRadius: 'var(--radius-2)',
                      outline: 'none',
                    }}
                  />
                </Box>

                <IconButton
                  size="2"
                  variant="soft"
                  color="red"
                  onClick={() => handleRemoveFilter(filter.id)}
                >
                  <TrashIcon width="14" height="14" />
                </IconButton>
              </Flex>
            ))
          )}
        </Flex>

        <Flex gap="2" mb="4">
          <Button
            variant="soft"
            size="2"
            onClick={handleAddFilter}
          >
            <PlusIcon width="16" height="16" />
            Agregar filtro
          </Button>

          {localFilters.length > 0 && (
            <Button
              variant="soft"
              color="red"
              size="2"
              onClick={handleClear}
            >
              <Cross2Icon width="16" height="16" />
              Limpiar todo
            </Button>
          )}
        </Flex>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" size="2">
              Cancelar
            </Button>
          </Dialog.Close>
          <Button size="2" onClick={handleApply}>
            Aplicar Filtros
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AdvancedFilter;
