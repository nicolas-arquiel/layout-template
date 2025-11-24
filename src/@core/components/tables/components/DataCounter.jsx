import React from 'react';
import { Badge, Text } from '@radix-ui/themes';

const DataCounter = ({
  totalCount,
  displayedCount,
  useExternalPagination
}) => {
  const message = useExternalPagination
    ? `Se encontraron ${totalCount} datos (mostrando ${displayedCount})`
    : `Se encontraron ${totalCount} datos`;

  return (
    <Badge color="gray" size="2" variant="soft">
      <Text size="2">{message}</Text>
    </Badge>
  );
};

export default DataCounter;
