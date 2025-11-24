import React from 'react';
import AdvancedFilterComponent from '../components/AdvancedFilter';
import { useTable } from '../context/TableContext';

const AdvancedFilter = ({
  columns = [],
  onFilter,
  ...props
}) => {
  const tableContext = useTable();

  const [localState, setLocalState] = React.useState([]);

  const isInProvider = !!tableContext;
  const currentFilters = isInProvider ? tableContext.filters.advanced : localState;

  const handleFilter = (filters) => {
    if (isInProvider) {
      tableContext.setFilter('advanced', filters);
    } else {
      setLocalState(filters);
    }

    if (onFilter) {
      onFilter(filters);
    }
  };

  const resetSignal = isInProvider ? tableContext.resetSignal : 0;

  return (
    <AdvancedFilterComponent
      columns={columns}
      onFilter={handleFilter}
      resetSignal={resetSignal}
      {...props}
    />
  );
};

export default AdvancedFilter;
