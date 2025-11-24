import { useState, useEffect } from 'react';
import { evaluateFilter } from '../constants/filterConstants';

function useDataFilter(data, paramsFilter) {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let filteredDataCopy = [...data];
    const filters = [
      {
        active: paramsFilter.checkboxFilter.activeFilters.length > 0,
        filter: (array) => {
          return array.filter((item) =>
            paramsFilter.checkboxFilter.activeFilters.some(
              (filter) => item[filter.field] == filter.value
            )
          );
        },
      },
      {
        active: paramsFilter.searchFilter.searchValue.length > 0,
        filter: (array) => {
          const searchValue = paramsFilter.searchFilter.searchValue.toLowerCase();
          return array.filter((item) =>
            paramsFilter.searchFilter.fields.some((field) => {
              const fieldValue = String(item[field]).toLowerCase();
              return fieldValue.includes(searchValue);
            })
          );
        },
      },
      {
        active: paramsFilter.rangeFilter.range.length == 2,
        filter: (array) => {
          if (!paramsFilter.rangeFilter.range || paramsFilter.rangeFilter.range.length !== 2) {
            return array;
          }

          const startDate = new Date(paramsFilter.rangeFilter.range[0]).toISOString().slice(0, 10);
          const endDate = new Date(paramsFilter.rangeFilter.range[1]).toISOString().slice(0, 10);

          return array.filter((item) => {
            const itemDate = new Date(item[paramsFilter.rangeFilter.dataSearchField]).toISOString().slice(0, 10);
            return itemDate >= startDate && itemDate <= endDate;
          });
        },
      },
      {
        active: paramsFilter.bigDataSearchFilter.target && paramsFilter.bigDataSearchFilter.fields,
        filter: (array) => {
          const searchValue = paramsFilter.bigDataSearchFilter.target.toLowerCase();
          const field = paramsFilter.bigDataSearchFilter.fields;
          return array.filter((item) => {
            const fieldValue = String(item[field]).toLowerCase();
            return fieldValue.includes(searchValue);
          });
        },
      },
      {
        active: paramsFilter.advancedFilter && paramsFilter.advancedFilter.length > 0,
        filter: (array) => {
          const advancedFilters = paramsFilter.advancedFilter;

          // Agrupar filtros por campo
          const groupedFilters = advancedFilters.reduce((acc, filter) => {
            if (!acc[filter.field]) {
              acc[filter.field] = [];
            }
            acc[filter.field].push({
              value: filter.value,
              operator: filter.operator,
              type: filter.type
            });
            return acc;
          }, {});

          return array.filter((item) => {
            return Object.entries(groupedFilters).every(([field, filters]) => {
              // Al menos uno de los filtros del mismo campo debe cumplirse
              return filters.some(filter =>
                evaluateFilter(
                  item[field],
                  filter.operator,
                  filter.value,
                  filter.type
                )
              );
            });
          });
        },
      },
    ];

    filters
      .reduce((prevPromise, currentFilter) => {
        return prevPromise.then((filteredData) => {
          if (currentFilter.active) {
            return currentFilter.filter(filteredData);
          } else {
            return filteredData;
          }
        });
      }, Promise.resolve(filteredDataCopy))
      .then((res) => {
        setFilteredData(res);
      });
  }, [data, paramsFilter]);

  return filteredData;
}

export default useDataFilter;
