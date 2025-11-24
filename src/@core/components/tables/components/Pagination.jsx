import React from 'react';
import { Flex, Button, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

/**
 * Componente de paginación usando Radix UI
 * Reemplaza react-paginate manteniendo la misma API
 */
const Pagination = ({
  pageCount,
  forcePage = 0,
  onPageChange,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 2,
  className = ""
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pageCount && onPageChange) {
      onPageChange({ selected: newPage });
    }
  };

  // Generar array de páginas a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = pageRangeDisplayed * 2 + 1;

    if (pageCount <= maxVisible + 2) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar la primera página
      pages.push(0);

      let startPage = Math.max(1, forcePage - pageRangeDisplayed);
      let endPage = Math.min(pageCount - 2, forcePage + pageRangeDisplayed);

      // Ajustar si estamos cerca del inicio
      if (forcePage < pageRangeDisplayed + marginPagesDisplayed) {
        endPage = Math.min(pageCount - 2, maxVisible - 1);
        startPage = 1;
      }

      // Ajustar si estamos cerca del final
      if (forcePage > pageCount - pageRangeDisplayed - marginPagesDisplayed - 1) {
        startPage = Math.max(1, pageCount - maxVisible);
        endPage = pageCount - 2;
      }

      // Agregar "..." si es necesario
      if (startPage > 1) {
        pages.push('...');
      }

      // Agregar páginas del rango
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Agregar "..." si es necesario
      if (endPage < pageCount - 2) {
        pages.push('...');
      }

      // Siempre mostrar la última página
      pages.push(pageCount - 1);
    }

    return pages;
  };

  if (pageCount <= 1) return null;

  return (
    <Flex justify="end" align="center" p="2" gap="1" className={className}>
      <Button
        size="1"
        variant="ghost"
        onClick={() => handlePageChange(forcePage - 1)}
        disabled={forcePage === 0}
        style={{ minWidth: '32px' }}
      >
        <ChevronLeftIcon />
      </Button>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <Text key={`ellipsis-${index}`} size="1" mx="1">...</Text>
        ) : (
          <Button
            key={page}
            size="1"
            variant={forcePage === page ? "solid" : "ghost"}
            onClick={() => handlePageChange(page)}
            className={forcePage === page ? "active" : ""}
            style={{ minWidth: '32px' }}
          >
            {page + 1}
          </Button>
        )
      ))}

      <Button
        size="1"
        variant="ghost"
        onClick={() => handlePageChange(forcePage + 1)}
        disabled={forcePage === pageCount - 1}
        style={{ minWidth: '32px' }}
      >
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
