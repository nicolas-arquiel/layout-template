import React from 'react';
import { Col } from 'reactstrap';
import DateRangeInput from '../components/DateRangeInput';
import { useTable } from '../context/TableContext';

const DateRangeFilter = ({
  dataSearchField,
  lg, md, sm, xs,
  align = "end",
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

  const content = (
    <DateRangeInput
      value={currentState.range}
      handleDateFilter={handleDateFilter}
      dataSearchField={dataSearchField}
      handleClearDate={handleClearDate}
      {...props}
    />
  );

  if (lg || md || sm || xs) {
    return (
      <Col
        lg={lg} md={md} sm={sm} xs={xs}
        className={`d-flex align-items-center justify-content-${align} mt-1`}
      >
        {content}
      </Col>
    );
  }

  return content;
};

export default DateRangeFilter;
