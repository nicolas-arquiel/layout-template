import React from 'react';
import { Col } from 'reactstrap';
import SelectFilterInput from '../components/SelectFilterInput';
import { useTable } from '../context/TableContext';

const SelectFilter = ({
  options,
  placeHolder,
  lg, md, sm, xs,
  align = "end",
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
      fields: selected.target,
      searchValue: selected.value,
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

  const content = (
    <SelectFilterInput
      handleSelectOption={handleSelectOption}
      options={options}
      selectorOptions={currentState}
      placeHolder={placeHolder}
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

export default SelectFilter;
