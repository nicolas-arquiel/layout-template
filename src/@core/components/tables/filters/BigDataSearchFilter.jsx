import React from 'react';
import BigDataSearchInput from '../components/BigDataSearchInput';
import { useTable } from '../context/TableContext';

const BigDataSearchFilter = ({
  columns = [],
  onFilter,
  ...props
}) => {
  const tableContext = useTable();

  const [localState, setLocalState] = React.useState({
    fields: "",
    searchValue: "",
    target: ""
  });

  const isInProvider = !!tableContext;
  const currentState = isInProvider ? tableContext.filters.bigDataSearch : localState;

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    if (isInProvider) {
      tableContext.setFilter('bigDataSearch', {
        ...currentState,
        searchValue
      });
    } else {
      setLocalState(prev => ({ ...prev, searchValue }));
    }
  };

  const handleFilterClick = () => {
    const { searchValue, fields } = currentState;

    if (!fields || !searchValue) return;

    const filterData = {
      ...currentState,
      target: searchValue
    };

    if (isInProvider) {
      tableContext.setFilter('bigDataSearch', filterData);
    } else {
      setLocalState(filterData);
    }

    if (onFilter) {
      onFilter(filterData);
    }
  };

  const handleOptionChange = (selected) => {
    const newState = {
      ...currentState,
      fields: selected.value
    };

    if (isInProvider) {
      tableContext.setFilter('bigDataSearch', newState);
    } else {
      setLocalState(prev => ({ ...prev, fields: selected.value }));
    }
  };

  const resetSignal = isInProvider ? tableContext.resetSignal : 0;

  return (
    <BigDataSearchInput
      bigDataSearchKey={`bigdata-${resetSignal}`}
      value={currentState.searchValue}
      handleSearchChange={handleSearchChange}
      handleFilterClick={handleFilterClick}
      columns={columns}
      handleOptionChange={handleOptionChange}
      valueOptions={currentState.fields}
      resetSignal={resetSignal}
      {...props}
    />
  );
};

export default BigDataSearchFilter;
