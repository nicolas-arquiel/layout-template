import React from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Select from 'react-select';
import { Flex, TextField, IconButton } from '@radix-ui/themes';
import { selectThemeColors } from '../../../../utils';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
    marginRight: "-1px",
    borderRadius: 'var(--radius-2) 0 0 var(--radius-2)',
    borderColor: 'var(--gray-7)',
  }),
  container: (provided, state) => ({
    ...provided,
    width: '150px'
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
    fontSize: "14px",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

const BigDataSearchInput = ({
  bigDataSearchKey,
  value,
  handleSearchChange,
  handleFilterClick,
  handleOptionChange,
  columns,
  valueOptions,
  resetSignal
}) => {
  // Filtrar las columnas que tienen opciones de filtro
  const columnsWithFilterOptions = columns.filter(
    (column) => column.filterOptions
  );

  // Mapear las opciones del selector
  const selectorOptions = columnsWithFilterOptions.map((column) => ({
    value: column.filterOptions.value,
    label: column.filterOptions.label,
  }));

  // Encontrar la opción seleccionada
  const selectedOption = selectorOptions.find(
    (option) => option.value === valueOptions
  );

  return (
    <Flex style={{ flexWrap: 'nowrap' }} align="center">
      <Select
        theme={selectThemeColors}
        classNamePrefix="select"
        options={selectorOptions}
        value={selectedOption}
        onChange={handleOptionChange}
        className="react-select"
        isClearable={false}
        placeholder={selectedOption ? selectedOption.label : "Filtrar por..."}
        isSearchable={false}
        styles={customStyles}
      />
      <TextField.Root
        size="2"
        value={value}
        onChange={handleSearchChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleFilterClick();
          }
        }}
        style={{
          flex: 1,
          borderRadius: '0',
          borderLeft: 'none',
          borderRight: 'none'
        }}
        placeholder="Buscar..."
      />
      <IconButton
        size="2"
        variant="soft"
        onClick={handleFilterClick}
        style={{
          borderRadius: '0 var(--radius-2) var(--radius-2) 0',
          height: '30px'
        }}
      >
        <MagnifyingGlassIcon width="16" height="16" />
      </IconButton>
    </Flex>
  );
};

export default BigDataSearchInput;
