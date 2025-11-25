import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { MixerHorizontalIcon, Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import {
  Button,
  Dialog,
  Flex,
  Box,
  IconButton,
  TextField
} from '@radix-ui/themes';
import SearchableSelect from './SearchableSelect';
import MultiSelect from './MultiSelect';
import { useFilterOperators } from '../hooks/useFilterOperators';

const AdvancedFilter = ({ columns, onFilter, isAsync, setAsyncParams, resetPagination = () => {}, resetSignal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getOperatorsByType } = useFilterOperators();

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      filters: [{ field: '', operator: '', value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'filters',
  });

  const onSubmit = (data) => {
    const filters = data.filters.filter((f) => {
      const column = columns.find(col => col.filterOptions?.value === f.field);
      if (column?.filterOptions?.type === 'boolean') {
        return f.field && f.operator;
      }
      return f.field && f.operator && f.value;
    });

    const processedFilters = filters.map(f => {
      const column = columns.find(col => col.filterOptions?.value === f.field);
      const type = column?.filterOptions?.type || 'text';

      if (type === 'date' && f.value) {
        try {
          const date = new Date(f.value);
          if (!isNaN(date.getTime())) {
            return {
              ...f,
              value: date.toISOString().split('T')[0]
            };
          }
        } catch (e) {
          console.error('Error al procesar fecha:', e);
        }
      }
      return f;
    });

    const filtersWithType = processedFilters.flatMap(f => {
      const column = columns.find(col => col.filterOptions?.value === f.field);
      const type = column?.filterOptions?.type || 'text';
      const isMulti = column?.filterOptions?.isMulti;

      if (type === 'boolean') {
        return [{
          field: f.field,
          operator: f.operator,
          value: f.operator,
          type
        }];
      }

      if (isMulti && Array.isArray(f.value)) {
        return f.value.map(value => ({
          field: f.field,
          operator: f.operator,
          value: value,
          type
        }));
      }

      return [{
        ...f,
        type
      }];
    });

    if (isAsync && setAsyncParams) {
      setAsyncParams((prevState) => ({
        ...prevState,
        advancedFilter: filtersWithType,
        pagination: {
          ...prevState.pagination,
          page: 1,
        }
      }));
    } else {
      onFilter(filtersWithType);
    }

    resetPagination();
    setIsOpen(false);
  };

  const filterOptions = columns
    .filter((col) => col.filterOptions)
    .map((col) => ({
      value: col.filterOptions.value,
      label: col.filterOptions.label
    }));

  const renderValueInput = (index, selectedField, field) => {
    const column = columns.find(col => col.filterOptions?.value === selectedField);
    const type = column?.filterOptions?.type || 'text';
    const options = column?.filterOptions?.options;
    const isMulti = column?.filterOptions?.isMulti;

    if (type === 'boolean') {
      return null;
    }

    if (type === 'date') {
      return (
        <TextField.Root
          {...field}
          type="date"
          placeholder="Seleccionar fecha"
          size="2"
          style={{ flex: 1 }}
        />
      );
    }

    if (options) {
      if (isMulti) {
        return (
          <MultiSelect
            options={options}
            value={field.value || []}
            onChange={(newValue) => field.onChange(newValue)}
            placeholder="Seleccionar múltiples..."
            style={{ flex: 1, minWidth: '250px' }}
          />
        );
      }

      return (
        <SearchableSelect
          options={options}
          value={field.value || ''}
          onChange={(newValue) => field.onChange(newValue)}
          placeholder="Seleccionar..."
          style={{ flex: 1 }}
        />
      );
    }

    return (
      <TextField.Root
        {...field}
        type={type}
        placeholder="Valor"
        size="2"
        style={{ flex: 1 }}
      />
    );
  };

  useEffect(() => {
    fields.forEach((f, index) => {
      const selectedField = watch(`filters.${index}.field`);
      const selectedOperator = watch(`filters.${index}.operator`);
      const column = columns.find(col => col.filterOptions?.value === selectedField);

      if (column?.filterOptions?.type === 'boolean' && selectedOperator) {
        setValue(`filters.${index}.value`, selectedOperator);
      }
    });
  }, [watch, fields, columns, setValue]);

  useEffect(() => {
    reset({ filters: [{ field: '', operator: '', value: '' }] });
    if (isAsync && setAsyncParams) {
      setAsyncParams((prevState) => ({
        ...prevState,
        advancedFilter: [],
        pagination: {
          ...prevState.pagination,
          page: 1,
        }
      }));
    } else {
      onFilter([]);
    }
    resetPagination();
    setIsOpen(false);
  }, [resetSignal]);

  return (
    <Box key={resetSignal}>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
          <Button variant="soft" size="2">
            <MixerHorizontalIcon width="16" height="16" />
            Filtro Avanzado
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: '750px', maxHeight: '80vh', overflowY: 'auto' }}>
          <Dialog.Title>Filtro Avanzado</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Agregue múltiples condiciones para filtrar los datos de la tabla.
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="2" mb="4">
              {fields.map((field, index) => {
                const selectedField = watch(`filters.${index}.field`);
                const column = columns.find(col => col.filterOptions?.value === selectedField);
                const fieldType = column?.filterOptions?.type || 'text';
                const operatorOptions = getOperatorsByType(fieldType);
                const showValueField = fieldType !== 'boolean';

                return (
                  <Flex key={field.id} gap="2" align="center" wrap="nowrap">
                    <Controller
                      name={`filters.${index}.field`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <SearchableSelect
                          options={filterOptions}
                          value={value || ''}
                          onChange={(newValue) => {
                            onChange(newValue);
                            setValue(`filters.${index}.operator`, '');
                            setValue(`filters.${index}.value`, '');
                          }}
                          placeholder="Filtrar por..."
                          searchable={false}
                          style={{ minWidth: '150px' }}
                        />
                      )}
                    />
                    <Controller
                      name={`filters.${index}.operator`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <SearchableSelect
                          options={operatorOptions}
                          value={value || ''}
                          onChange={(newValue) => {
                            onChange(newValue);
                            if (fieldType === 'boolean' && newValue) {
                              setValue(`filters.${index}.value`, newValue);
                            }
                          }}
                          placeholder={fieldType === 'boolean' ? "Seleccionar..." : "Operador..."}
                          searchable={false}
                          disabled={!selectedField}
                          style={{ minWidth: showValueField ? '180px' : '250px' }}
                        />
                      )}
                    />
                    {showValueField && (
                      <Controller
                        name={`filters.${index}.value`}
                        control={control}
                        render={({ field }) => renderValueInput(index, selectedField, field)}
                      />
                    )}
                    <IconButton
                      type="button"
                      variant="soft"
                      color="red"
                      size="2"
                      onClick={() => {
                        if (fields.length === 1) {
                          append({ field: '', operator: '', value: '' });
                        }
                        remove(index);
                      }}
                    >
                      <Cross2Icon width="14" height="14" />
                    </IconButton>
                  </Flex>
                );
              })}
            </Flex>

            <Flex gap="2" mb="4" align="center">
              <Button
                type="button"
                variant="soft"
                size="2"
                onClick={() => append({ field: '', operator: '', value: '' })}
              >
                <PlusIcon width="16" height="16" />
                Añadir filtro
              </Button>
            </Flex>

            <Flex gap="3" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" size="2" type="button">
                  Cerrar
                </Button>
              </Dialog.Close>
              <Button size="2" type="submit">
                Aplicar Filtros
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

export default AdvancedFilter;
