import React from 'react';
import { Flex, Text, TextField } from '@radix-ui/themes';
import { Search } from 'lucide-react';

const SearchInput = ({
  searchKey,
  value,
  handleSearchChange,
  titleComponentSearch,
  title
}) => {
  return (
    <Flex
      align={{ initial: 'stretch', sm: 'center' }}
      direction={{ initial: 'column', sm: 'row' }}
      gap="2"
      className="w-100"
    >
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
          <Search size={16} />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};

export default SearchInput;
