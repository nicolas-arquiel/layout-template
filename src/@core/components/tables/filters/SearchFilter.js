import React from 'react';
import { Col } from 'reactstrap';
import SearchInput from '../components/SearchInput';
import { useTable } from '../context/TableContext';

const SearchFilter = ({
  fields = [],
  title,
  titleComponentSearch,
  lg, md, sm, xs,
  align = "end",
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

  const content = (
    <SearchInput
      searchKey={`search-${resetSignal}`}
      value={currentState.searchValue}
      handleSearchChange={handleSearchChange}
      titleComponentSearch={titleComponentSearch}
      title={title}
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

export default SearchFilter;
