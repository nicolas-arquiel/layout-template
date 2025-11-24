import React from 'react';
import SearchInput from '../components/SearchInput';
import { useTable } from '../context/TableContext';

const SearchFilter = ({
  fields = [],
  title,
  titleComponentSearch,
  onFilter,
  ...props
}) => {
  const tableContext = useTable();

  const [localState, setLocalState] = React.useState({
    fields: fields,
    searchValue: ""
  });

  const isInProvider = !!tableContext;
  const currentState = isInProvider ? { ...tableContext.filters.search, fields } : localState;

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filterData = { fields, searchValue };

    if (isInProvider) {
      tableContext.setFilter('search', filterData);
    } else {
      setLocalState(filterData);
    }

    if (onFilter) {
      onFilter(filterData);
    }
  };

  const resetSignal = isInProvider ? tableContext.resetSignal : 0;

  return (
    <SearchInput
      searchKey={`search-${resetSignal}`}
      value={currentState.searchValue}
      handleSearchChange={handleSearchChange}
      titleComponentSearch={titleComponentSearch}
      title={title}
      {...props}
    />
  );
};

export default SearchFilter;
