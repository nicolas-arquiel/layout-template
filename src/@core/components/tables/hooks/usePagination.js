import { useState, useCallback } from "react";

function usePagination(setAsyncParams) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = useCallback(
    (page) => {
      setCurrentPage(page.selected);

      if (setAsyncParams) {
        setAsyncParams((prevState) => {
          const newParamsFilter = {
            ...prevState,
            pagination: {
              ...prevState.pagination,
              page: page.selected + 1,
            },
          };
          return newParamsFilter;
        });
      }
    },
    [setAsyncParams]
  );

  const resetCurrentPage = () => {
    setCurrentPage(0);
  };

  return { currentPage, handlePagination, resetCurrentPage };
}

export default usePagination;
