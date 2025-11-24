import React from 'react';
import SelectFilterInput from '../components/SelectFilterInput';
import { useTable } from '../context/TableContext';

const SelectFilter = ({
  options = [],
  placeHolder,
  targetField,
  onFilter,
  ...props
}) => {
  const tableContext = useTable();

  const [localState, setLocalState] = React.useState({
    fields: '',
    searchValue: "",
    value: null
  });

  const isInProvider = !!tableContext;
  const currentState = isInProvider ? tableContext.filters.select : localState;

  const handleSelectOption = (selected) => {
    const filterData = {
      fields: targetField || selected?.value || '',
      searchValue: selected?.label || '',
      value: selected
    };

    if (isInProvider) {
      tableContext.setFilter('select', filterData);
    } else {
      setLocalState(filterData);
    }

    if (onFilter) {
      onFilter(filterData);
    }
  };

  const resetSignal = isInProvider ? tableContext.resetSignal : 0;

  return (
    <SelectFilterInput
      handleSelectOption={handleSelectOption}
      options={options}
      selectorOptions={currentState}
      placeHolder={placeHolder}
      resetSignal={resetSignal}
      {...props}
    />
  );
};

export default SelectFilter;
