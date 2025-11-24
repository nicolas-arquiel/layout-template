import React from 'react';
import { Card, Flex } from '@radix-ui/themes';

const TableContainer = ({
  customClassCard = "",
  customClassCardBody = "",
  header,
  controls,
  table
}) => {
  return (
    <Card className={customClassCard} style={{ overflow: 'visible' }}>
      {header}

      <Flex direction="column" gap="3" className={customClassCardBody} p="4">
        {controls && (
          <Flex justify="end" align="center" gap="2" wrap="wrap">
            {controls}
          </Flex>
        )}

        {table}
      </Flex>
    </Card>
  );
};

export default TableContainer;
