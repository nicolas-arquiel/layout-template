import React from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Select from 'react-select';
import { Flex, TextField, IconButton } from '@radix-ui/themes';
import { selectThemeColors } from '@utils';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ChevronDown } from "react-feather";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
    marginRight: "-1px",
  }),
  container: (provided, state) => ({
    ...provided,
    width: '125px'
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
    fontSize: "0.857rem",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

const BigDataSearchInput = ({
  bigDataSearchKey,
  value,
  handleSearchChange,
  handleFilterClick,
  handleOptionChange,
  columns,
  valueOptions,
  resetSignal
}) => {
  const columnsWithFilterOptions = columns.filter(
    (column) => column.filterOptions
  );

  const selectorOptions = columnsWithFilterOptions.map((column) => ({
    value: column.filterOptions.value,
    label: column.filterOptions.label,
  }));

  const selectedOption = selectorOptions.find(
    (option) => option.value === valueOptions
  );

  return (
    <div key={resetSignal} className="d-flex align-items-center mx-2">
      <Flex style={{ flexWrap: 'nowrap' }}>
        <Select
          theme={selectThemeColors}
          classNamePrefix="select"
          options={selectorOptions}
          value={selectedOption}
          onChange={handleOptionChange}
          className="react-select d-none d-md-block"
          isClearable={false}
          placeholder={selectedOption ? selectedOption.label : "Filtrar por..."}
          isSearchable={false}
          styles={customStyles}
        />

        <div
          style={{ width: "31px", height: "30px", marginRight: "-1px" }}
          className="d-flex justify-content-center align-items-center cursor-pointer bg-light-secondary d-md-none"
        >
          <UncontrolledDropdown
            tag="li"
            className="dropdown-notification nav-item d-md-none me-25"
          >
            <DropdownToggle
              tag="a"
              className="nav-link d-md-none"
              href="/"
              onClick={(e) => e.preventDefault()}
            >
              <ChevronDown size={21} />
            </DropdownToggle>
            <DropdownMenu tag="ul">
              {selectorOptions.map((item) => (
                <DropdownItem
                  key={item.value}
                  onClick={() => handleOptionChange(item)}
                >
                  <span>{item.label}</span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <TextField.Root
          size="2"
          value={value}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFilterClick();
            }
          }}
          id={`big-data-search-input_${bigDataSearchKey}`}
          autoComplete="off"
          style={{
            height: '30px',
            borderRadius: 0,
            minWidth: '200px',
          }}
        />

        <IconButton
          size="2"
          onClick={handleFilterClick}
          style={{
            height: '30px',
            borderRadius: '0 var(--radius-2) var(--radius-2) 0',
            marginLeft: '-1px',
          }}
        >
          <MagnifyingGlassIcon width="16" height="16" />
        </IconButton>
      </Flex>
    </div>
  );
};

export default BigDataSearchInput;
