import React from 'react';
import { Flex, Text, IconButton } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import 'flatpickr/dist/themes/material_blue.css';

const flatpickrOptions = {
  mode: "range",
  dateFormat: "m/d/Y",
  locale: Spanish,
};

const DateRangeInput = ({
  value,
  handleDateFilter,
  handleClearDate,
  dataSearchField,
}) => {
  const uniqueId = `date_${Math.random()}`;

  return (
    <Flex align="center" gap="2">
      <Text size="2" weight="medium">
        Fecha:
      </Text>
      <Flex
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-2)',
          border: '1px solid var(--gray-7)',
          overflow: 'hidden',
        }}
      >
        <Flatpickr
          id={uniqueId}
          value={value}
          options={flatpickrOptions}
          onChange={(date) => handleDateFilter(date, dataSearchField)}
          className="flatpickr-radix"
          style={{
            height: '32px',
            padding: '0 var(--space-2)',
            border: 'none',
            outline: 'none',
            fontSize: 'var(--font-size-2)',
            minWidth: '200px',
          }}
        />
        <IconButton
          size="1"
          variant="soft"
          color="red"
          onClick={handleClearDate}
          style={{
            borderRadius: 0,
            height: '32px',
          }}
        >
          <Cross2Icon width="14" height="14" />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default DateRangeInput;
