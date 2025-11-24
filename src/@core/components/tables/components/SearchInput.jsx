import React from 'react';
import { Flex, Text, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchInput = ({
  searchKey,
  value,
  handleSearchChange,
  titleComponentSearch,
  title
}) => {
  return (
    <Flex align="center" gap="2" className="w-100">
      {(titleComponentSearch || title) && (
        <Text size="2" weight="medium">
          {titleComponentSearch || title || "Buscar"}
        </Text>
      )}
      <TextField.Root
        size="2"
        value={value}
        onChange={handleSearchChange}
        placeholder="Buscar..."
        id={`search-input_${searchKey}`}
        autoComplete="off"
        style={{ minWidth: '200px' }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon width="16" height="16" />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

export default SearchInput;
