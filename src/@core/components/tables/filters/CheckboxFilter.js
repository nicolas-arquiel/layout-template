import React from 'react';
import CheckboxFilterComponent from '../components/CheckboxFilter';
import { useTable } from '../context/TableContext';

const CheckboxFilter = ({
  filter,
  onFilter,
  ...props
}) => {
  const tableContext = useTable();

  const [localState, setLocalState] = React.useState({
    activeFilters: [],
    checkboxFilters: {}
  });

  const isInProvider = !!tableContext;
  const currentState = isInProvider ? tableContext.filters.checkbox : localState;

  const handleCheckboxFilter = (field, value, checkboxFilters) => {
    const updatedFilters = { ...checkboxFilters };
    updatedFilters[value] = updatedFilters[value] ? null : { field, value };

    const activeFilters = Object.values(updatedFilters).filter(f => f !== null);

    const filterData = {
      activeFilters,
      checkboxFilters: updatedFilters
    };

    if (isInProvider) {
      tableContext.setFilter('checkbox', filterData);
    } else {
      setLocalState(filterData);
    }

    if (onFilter) {
      onFilter(filterData);
    }
  };

  return (
    <CheckboxFilterComponent
      checkboxFilters={currentState.checkboxFilters}
      handleCheckboxFilter={handleCheckboxFilter}
      checkboxFilter={filter}
      {...props}
    />
  );
};

export default CheckboxFilter;
