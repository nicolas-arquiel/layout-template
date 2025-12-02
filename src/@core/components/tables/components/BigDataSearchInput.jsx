import React from 'react';
import { Search } from 'lucide-react';
import { Flex, TextField, IconButton } from '@radix-ui/themes';
import SearchableSelect from './SearchableSelect';

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

  return (
    <Flex style={{ flexWrap: 'nowrap' }} align="center">
      <SearchableSelect
        options={selectorOptions}
        value={valueOptions}
        onChange={(newValue) => {
          const selectedOpt = selectorOptions.find(opt => opt.value === newValue);
          handleOptionChange(selectedOpt);
        }}
        placeholder="Filtrar por..."
        searchable={false}
        style={{
          width: '150px',
          minHeight: '30px',
          borderRadius: 'var(--radius-2) 0 0 var(--radius-2)',
          marginRight: '-1px'
        }}
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
        <Search size={16} />
      </IconButton>
    </Flex>
  );
};

export default BigDataSearchInput;
