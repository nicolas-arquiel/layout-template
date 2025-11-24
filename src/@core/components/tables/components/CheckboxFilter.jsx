import React from 'react';
import { Card, Flex, Text, Checkbox } from '@radix-ui/themes';

const CheckboxFilter = ({
  title,
  checked,
  onChange,
  label,
  name
}) => {
  return (
    <Card size="2" style={{ padding: 'var(--space-3)' }}>
      <Flex direction="column" gap="2">
        {title && (
          <Text size="2" weight="medium" mb="1">
            {title}
          </Text>
        )}
        <Flex asChild align="center" gap="2">
          <label>
            <Checkbox
              checked={checked}
              onCheckedChange={onChange}
              name={name}
            />
            <Text size="2">{label}</Text>
          </label>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CheckboxFilter;
