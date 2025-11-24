import React from 'react';
import Select from 'react-select';
import { selectThemeColors } from '@utils';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "30px",
  }),
  container: (provided, state) => ({
    ...provided,
    width: '100%'
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
    fontSize: "1rem",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

const SelectFilterInput = ({
  handleSelectOption,
  options,
  selectorOptions,
  placeHolder,
  resetSignal
}) => {
  return (
    <div key={resetSignal} className="d-flex align-items-center mx-2 mb-50 w-100">
      <Select
        theme={selectThemeColors}
        classNamePrefix="select"
        options={options}
        value={selectorOptions.value}
        onChange={handleSelectOption}
        className="react-select"
        isClearable={false}
        placeholder={selectorOptions.fields ? selectorOptions.fields : placeHolder ?? "Filtrar por..."}
        isSearchable={true}
        noOptionsMessage={() => 'No se encontraron datos'}
        styles={customStyles}
      />
    </div>
  );
};

export default SelectFilterInput;
