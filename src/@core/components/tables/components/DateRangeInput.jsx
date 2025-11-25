import React, { useState, useEffect } from 'react';
import { Flex, Text, IconButton } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

const DateRangeInput = ({
  value,
  handleDateFilter,
  handleClearDate,
  dataSearchField,
}) => {
  // Convertir el value de flatpickr (array de fechas o string) a formato date input
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      // Si viene como array de fechas (formato flatpickr)
      const start = value[0] instanceof Date ? value[0].toISOString().split('T')[0] : '';
      const end = value[1] instanceof Date ? value[1].toISOString().split('T')[0] : '';
      setStartDate(start);
      setEndDate(end);
    } else if (typeof value === 'string' && value) {
      // Si viene como string, intentar parsearlo
      const dates = value.split(' to ');
      if (dates.length === 2) {
        setStartDate(dates[0]);
        setEndDate(dates[1]);
      }
    } else if (!value) {
      setStartDate('');
      setEndDate('');
    }
  }, [value]);

  const handleStartChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    if (newStart && endDate) {
      const startDateObj = new Date(newStart);
      const endDateObj = new Date(endDate);
      handleDateFilter([startDateObj, endDateObj], dataSearchField);
    }
  };

  const handleEndChange = (e) => {
    const newEnd = e.target.value;
    setEndDate(newEnd);
    if (startDate && newEnd) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(newEnd);
      handleDateFilter([startDateObj, endDateObj], dataSearchField);
    }
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    handleClearDate();
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2" weight="medium">
        Fecha:
      </Text>
      <Flex
        align="center"
        gap="1"
        style={{
          borderRadius: 'var(--radius-2)',
          border: '1px solid var(--gray-7)',
          padding: '0 var(--space-2)',
          height: '32px',
        }}
      >
        <input
          type="date"
          value={startDate}
          onChange={handleStartChange}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: 'var(--font-size-2)',
            background: 'transparent',
            color: 'inherit',
            fontFamily: 'inherit',
          }}
        />
        <Text size="1" style={{ color: 'var(--gray-9)' }}>-</Text>
        <input
          type="date"
          value={endDate}
          onChange={handleEndChange}
          min={startDate}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: 'var(--font-size-2)',
            background: 'transparent',
            color: 'inherit',
            fontFamily: 'inherit',
          }}
        />
        <IconButton
          size="1"
          variant="soft"
          color="red"
          onClick={handleClear}
          style={{
            marginLeft: 'var(--space-1)',
          }}
        >
          <Cross2Icon width="14" height="14" />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default DateRangeInput;
