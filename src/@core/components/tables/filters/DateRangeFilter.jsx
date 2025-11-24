import React from 'react';
import DateRangeInput from '../components/DateRangeInput';
import { useTable } from '../context/TableContext';

const DateRangeFilter = ({
  dataSearchField,
  onFilter,
  ...props
}) => {
  const tableContext = useTable();

  const [localState, setLocalState] = React.useState({
    range: "",
    dataSearchField: dataSearchField || ""
  });

  const isInProvider = !!tableContext;
  const currentState = isInProvider ? tableContext.filters.dateRange : localState;

  const handleDateFilter = (range) => {
    const filterData = { range, dataSearchField };

    if (isInProvider) {
      tableContext.setFilter('dateRange', filterData);
    } else {
      setLocalState(filterData);
    }

    if (onFilter) {
      onFilter(filterData);
    }
  };

  const handleClearDate = () => {
    const filterData = { range: "", dataSearchField: "" };

    if (isInProvider) {
      tableContext.setFilter('dateRange', filterData);
    } else {
      setLocalState(filterData);
      if (onFilter) {
        onFilter(filterData);
      }
    }
  };

  return (
    <DateRangeInput
      value={currentState.range}
      handleDateFilter={handleDateFilter}
      dataSearchField={dataSearchField}
      handleClearDate={handleClearDate}
      {...props}
    />
  );
};

export default DateRangeFilter;
