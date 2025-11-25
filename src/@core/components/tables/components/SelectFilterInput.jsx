import React from 'react';
import { Box } from '@radix-ui/themes';
import SearchableSelect from './SearchableSelect';

const SelectFilterInput = ({
  handleSelectOption,
  options,
  selectorOptions,
  placeHolder,
  resetSignal
}) => {
  return (
    <Box key={resetSignal} style={{ width: '100%', marginBottom: '12px' }}>
      <SearchableSelect
        options={options}
        value={selectorOptions.value}
        onChange={(newValue) => {
          const selectedOpt = options.find(opt => opt.value === newValue);
          handleSelectOption(selectedOpt);
        }}
        placeholder={selectorOptions.fields ? selectorOptions.fields : placeHolder ?? "Filtrar por..."}
        searchable={true}
        noOptionsMessage="No se encontraron datos"
        style={{ width: '100%', minHeight: '30px' }}
      />
    </Box>
  );
};

export default SelectFilterInput;
