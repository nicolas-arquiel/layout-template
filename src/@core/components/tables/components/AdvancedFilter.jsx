import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { MixerHorizontalIcon, Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import Select from 'react-select';
import {
  Button,
  Dialog,
  Flex,
  Text,
  Box,
  IconButton
} from '@radix-ui/themes';
import { selectThemeColors } from '../../../../utils';
import { useFilterOperators } from '../hooks/useFilterOperators';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '30px',
    height: '30px',
    borderRadius: 'var(--radius-2)',
  }),
  container: (provided) => ({
    ...provided,
    width: '150px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '30px',
    padding: '0 6px',
    fontSize: '14px',
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const operatorStyles = {
  ...customStyles,
  container: (provided) => ({
    ...provided,
    width: '180px',
  }),
};

const valueSelectStyles = {
  ...customStyles,
  container: (provided) => ({
    ...provided,
    flex: 1,
  }),
};

const valueMultiSelectStyles = {
  ...valueSelectStyles,
  container: (provided) => ({
    ...provided,
    width: '300px',
    flex: '0 0 300px',
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: '30px',
    height: state.hasValue ? 'auto' : '30px',
    borderRadius: 'var(--radius-2)',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: state.hasValue ? 'auto' : '30px',
    minHeight: '30px',
    padding: '2px 6px',
    flexWrap: 'wrap',
  }),
  multiValue: (provided) => ({
    ...provided,
    maxWidth: '100%',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px'
  }),
};

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

  const toggle = () => setIsOpen(!isOpen);

  const onSubmit = (data) => {
    const filters = data.filters.filter((f) => {
      // Para campos booleanos, solo necesitamos field y operator
      const column = columns.find(col => col.filterOptions?.value === f.field);
      if (column?.filterOptions?.type === 'boolean') {
        return f.field && f.operator;
      }
      // Para el resto de campos, necesitamos los tres valores
      return f.field && f.operator && f.value;
    });

    // Procesamiento de filtros con manejo especial para fechas
    const processedFilters = filters.map(f => {
      const column = columns.find(col => col.filterOptions?.value === f.field);
      const type = column?.filterOptions?.type || 'text';

      if (type === 'date' && f.value) {
        // Asegurarse de que la fecha esté en formato ISO para el backend
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

      // Para campos booleanos, el operador ya contiene el valor (true/false)
      if (type === 'boolean') {
        return [{
          field: f.field,
          operator: f.operator,
          value: f.operator, // Usamos el operador como valor
          type
        }];
      }

      if (isMulti && f.value && f.value.includes(',')) {
        return f.value.split(',').map(value => ({
          field: f.field,
          operator: f.operator,
          value: value.trim(),
          type
        }));
      }

      return [{
        ...f,
        type
      }];
    });

    if (isAsync && setAsyncParams) {
      // Para modo asíncrono, actualizar asyncParams con advancedFilter
      setAsyncParams((prevState) => ({
        ...prevState,
        advancedFilter: filtersWithType,
        pagination: {
          ...prevState.pagination,
          page: 1, // Resetear a la primera página cuando se aplica un filtro
        }
      }));
    } else {
      // Para modo síncrono, usar el callback onFilter
      onFilter(filtersWithType);
    }

    resetPagination();
    setIsOpen(false); // Cerrar el dropdown después de aplicar el filtro
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

    // Si es booleano, no mostramos campo de valor
    if (type === 'boolean') {
      return null;
    }

    if (type === 'date') {
      return (
        <input
          {...field}
          type="date"
          placeholder="Seleccionar fecha"
          style={{
            height: '30px',
            padding: '0 8px',
            fontSize: '14px',
            border: '1px solid var(--gray-7)',
            borderRadius: 'var(--radius-2)',
            outline: 'none',
            flex: 1
          }}
          autoComplete='off'
        />
      );
    }

    if (options) {
      if (isMulti) {
        return (
          <div style={{
            display: 'flex',
            width: '300px',
            flex: '0 0 300px'
          }}>
            <Select
              theme={selectThemeColors}
              styles={valueMultiSelectStyles}
              className="react-select"
              classNamePrefix="select"
              options={options}
              isMulti={true}
              value={field.value ? field.value.split(',').map(val =>
                options.find(opt => opt.value === val)
              ).filter(Boolean) : []}
              onChange={(selectedOptions) => {
                const values = selectedOptions ? selectedOptions.map(opt => opt.value).join(',') : '';
                field.onChange(values);
              }}
              placeholder="Seleccionar múltiples..."
              isClearable={true}
              menuPlacement="auto"
              maxMenuHeight={200}
            />
          </div>
        );
      }

      return (
        <Select
          theme={selectThemeColors}
          styles={valueSelectStyles}
          className="react-select"
          classNamePrefix="select"
          options={options}
          value={options.find(opt => opt.value === field.value) || null}
          onChange={(option) => field.onChange(option ? option.value : '')}
          placeholder="Seleccionar..."
          isClearable={false}
        />
      );
    }

    return (
      <input
        {...field}
        type={type}
        placeholder="Valor"
        style={{
          height: '30px',
          padding: '0 8px',
          fontSize: '14px',
          border: '1px solid var(--gray-7)',
          borderRadius: 'var(--radius-2)',
          outline: 'none',
          flex: 1
        }}
        autoComplete='off'
      />
    );
  };

  // Efecto para establecer automáticamente el valor cuando se selecciona un operador booleano
  useEffect(() => {
    fields.forEach((f, index) => {
      const selectedField = watch(`filters.${index}.field`);
      const selectedOperator = watch(`filters.${index}.operator`);
      const column = columns.find(col => col.filterOptions?.value === selectedField);

      if (column?.filterOptions?.type === 'boolean' && selectedOperator) {
        // Para boolean, el valor es el mismo que el operador (true/false)
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

                // Determinar si el campo de valor debe ser visible
                const showValueField = fieldType !== 'boolean';

                return (
                  <Flex key={field.id} gap="2" align="center" wrap="nowrap">
                    <Controller
                      name={`filters.${index}.field`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          theme={selectThemeColors}
                          styles={customStyles}
                          className="react-select"
                          classNamePrefix="select"
                          options={filterOptions}
                          value={filterOptions.find(option => option.value === value) || null}
                          onChange={(option) => {
                            onChange(option ? option.value : '');
                            setValue(`filters.${index}.operator`, '');
                            setValue(`filters.${index}.value`, '');
                          }}
                          placeholder="Filtrar por..."
                          isClearable={false}
                          isSearchable={false}
                        />
                      )}
                    />
                    <Controller
                      name={`filters.${index}.operator`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          theme={selectThemeColors}
                          styles={{
                            ...operatorStyles,
                            container: (provided) => ({
                              ...provided,
                              width: showValueField ? '180px' : '300px'
                            }),
                          }}
                          className="react-select"
                          classNamePrefix="select"
                          options={operatorOptions}
                          value={operatorOptions.find(option => option.value === value) || null}
                          onChange={(option) => {
                            onChange(option ? option.value : '');
                            // Para boolean, establecer el valor automáticamente
                            if (fieldType === 'boolean' && option) {
                              setValue(`filters.${index}.value`, option.value);
                            }
                          }}
                          placeholder={fieldType === 'boolean' ? "Seleccionar..." : "Operador..."}
                          isClearable={false}
                          isSearchable={false}
                          isDisabled={!selectedField}
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
