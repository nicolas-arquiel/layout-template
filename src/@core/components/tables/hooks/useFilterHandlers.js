import { useState, useCallback } from "react";

const useFilterHandlers = (setAsyncParams, resetPagination = () => {}) => {
  const [paramsFilter, setParamsFilter] = useState({
    searchFilter: {
      fields: [],
      searchValue: "",
    },
    bigDataSearchFilter: {
      fields: "",
      searchValue: "",
      target: "",
    },
    rangeFilter: {
      range: "",
      dataSearchField: "",
    },
    checkboxFilter: {
      activeFilters: [],
      checkboxFilters: {},
    },
    selectFilter: {
      fields: '',
      searchValue: "",
    },
    advancedFilter: []
  });

  const handleClearDate = () => {
    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        rangeFilter: {
          range: "",
          dataSearchField: "",
        },
      };
      return newParamsFilter;
    });

    if (setAsyncParams) {
      setAsyncParams((prevState) => {
        const { dateFilter, ...newState } = prevState;
        return newState;
      });
    }
    resetPagination();
  };

  const handleCheckboxFilter = (field, value, checkboxFilters) => {
    const updatedCheckboxFilters = { ...checkboxFilters };
    updatedCheckboxFilters[value] = updatedCheckboxFilters[value]
      ? null
      : { field, value };

    const activeFilters = Object.values(updatedCheckboxFilters).filter(
      (filter) => filter !== null
    );

    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        checkboxFilter: {
          ...prevState.checkboxFilter,
          activeFilters: activeFilters,
          checkboxFilters: updatedCheckboxFilters,
        },
      };
      return newParamsFilter;
    });

    if (setAsyncParams) {
      if (!activeFilters.length) {
        setAsyncParams((prevState) => {
          const { fixedSearch, ...newState } = prevState;
          return newState;
        });
      } else {
        setAsyncParams((prevState) => {
          const newParamsFilter = {
            ...prevState,
            fixedSearch: activeFilters,
          };
          return newParamsFilter;
        });
      }
    }
    resetPagination();
  };

  const handleFilter = (e, fields) => {
    const value = e.target.value.toLowerCase();

    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        searchFilter: {
          ...prevState.searchFilter,
          searchValue: value,
          fields: fields,
        },
      };
      return newParamsFilter;
    });
    resetPagination();
  };

  const handleBigDataFilter = useCallback((e, fields) => {
    const value = e.target.value.toLowerCase();

    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        bigDataSearchFilter: {
          ...prevState.bigDataSearchFilter,
          searchValue: value,
          fields: fields,
        },
      };
      return newParamsFilter;
    });
  }, []);

  //filtrado desde el cliente
  const handleBigDataFilterClient = useCallback((searchValue, field) => {
    setParamsFilter((prevState) => ({
      ...prevState,
      bigDataSearchFilter: {
        ...prevState.bigDataSearchFilter,
        searchValue: searchValue,
        fields: field,
        target: searchValue, // Esto activará el filtro en useDataFilter
      },
    }));

    resetPagination();
  }, [resetPagination]);

  const handleFilterClick = () => {
    const { searchValue, fields } = paramsFilter.bigDataSearchFilter;
    const { activeFilters } = paramsFilter.checkboxFilter;

    const fieldCheck = activeFilters.some((filter) => filter.field === fields);

    if (setAsyncParams) {
      if (fieldCheck) {
        setAsyncParams((prevState) => {
          const { likeSearch, ...newState } = prevState;
          return newState;
        });
        alert(
          "No se puede realizar el filtrado porque hay un filtro activo con el mismo campo del buscador."
        );
        return;
      }

      if (!fields) {
        return;
      }

      if (!searchValue) {
        setAsyncParams((prevState) => {
          const { likeSearch, ...newState } = prevState;
          return newState;
        });
      } else {
        setAsyncParams((prevState) => {
          const newParamsFilter = {
            ...prevState,
            likeSearch: {
              [fields]: searchValue,
            },
          };
          return newParamsFilter;
        });
      }
    }
    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        bigDataSearchFilter: {
          ...prevState.bigDataSearchFilter,
          target: searchValue,
        },
      };
      return newParamsFilter;
    });
    resetPagination();
  };

  const handleDateFilter = (range, dataSearchField) => {
    if (!range || range.length !== 2) {
      return;
    }

    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        rangeFilter: {
          range: range,
          dataSearchField: dataSearchField,
        },
      };
      return newParamsFilter;
    });

    const startDate = new Date(range[0]).toISOString().split("T")[0];
    const endDate = new Date(range[1]).toISOString().split("T")[0];

    if (setAsyncParams) {
      setAsyncParams((prevState) => {
        const newParamsFilter = {
          ...prevState,
          dateFilter: {
            field: dataSearchField,
            min: startDate,
            max: endDate,
          },
        };
        return newParamsFilter;
      });
    }
    resetPagination();
  };

  const handleOptionChange = (selected) => {
    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        bigDataSearchFilter: {
          ...prevState.bigDataSearchFilter,
          fields: selected.value,
        },
      };
      return newParamsFilter;
    });
  };

  const handleSelectOption = (selected) => {
    if (setAsyncParams) {
      setAsyncParams((prevState) => {
        const newParamsFilter = {
          ...prevState,
          selectFilter: {
            fields: selected.target,
            searchValue: selected.value
          },
        };
        return newParamsFilter;
      });
    }

    setParamsFilter((prevState) => {
      const newParamsFilter = {
        ...prevState,
        selectFilter: {
          fields: selected.value,
          searchValue: selected.labelvalue
        },
      };
      return newParamsFilter;
    });
    resetPagination();
  };

  const handleSort = async (column, sortDirection) => {
    if (setAsyncParams) {
      setAsyncParams((prevState) => {
        const newParamsFilter = {
          ...prevState,
          order: {
            field: column.sortField,
            order: sortDirection,
          },
        };
        return newParamsFilter;
      });
    }
  };

  return {
    paramsFilter,
    setParamsFilter,
    handleClearDate,
    handleCheckboxFilter,
    handleFilter,
    handleBigDataFilter,
    handleBigDataFilterClient,
    handleFilterClick,
    handleDateFilter,
    handleOptionChange,
    handleSort,
    handleSelectOption,
  };
};

export default useFilterHandlers;
