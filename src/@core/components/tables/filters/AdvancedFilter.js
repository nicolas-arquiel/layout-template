import React from 'react';
import { Col } from 'reactstrap';
import AdvancedFilterComponent from '../components/AdvancedFilter';
import { useTable } from '../context/TableContext';

const AdvancedFilter = ({
  lg, md, sm, xs,
  align = "end",
  columns,
  onFilter,
  ...props
}) => {
  const tableContext = useTable();
  const isInProvider = !!tableContext;

  const [localState, setLocalState] = React.useState([]);

  const handleAdvancedFilter = (filters) => {
    if (isInProvider) {
      tableContext.setFilter('advanced', filters);
    } else {
      setLocalState(filters);
    }

    if (onFilter) {
      onFilter(filters);
    }
  };

  const setAsyncParams = (isInProvider && tableContext.tableType === 'async') ? (updateFn) => {
    if (typeof updateFn === 'function') {
      const mockState = {
        pagination: tableContext.pagination,
        advancedFilter: tableContext.filters.advanced
      };
      const newState = updateFn(mockState);
      if (newState.advancedFilter) {
        handleAdvancedFilter(newState.advancedFilter);
      }
    }
  } : undefined;

  const resetSignal = isInProvider ? tableContext.resetSignal : 0;

  const content = (
    <AdvancedFilterComponent
      columns={columns}
      onFilter={handleAdvancedFilter}
      isAsync={isInProvider ? tableContext.tableType === 'async' : false}
      setAsyncParams={setAsyncParams}
      resetSignal={resetSignal}
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

export default AdvancedFilter;
