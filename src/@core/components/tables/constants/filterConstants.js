export const FILTER_OPERATORS = {
  number: [
    { value: 'eq', label: 'Igual a' },
    { value: 'gt', label: 'Mayor que' },
    { value: 'lt', label: 'Menor que' },
    { value: 'gte', label: 'Mayor o igual que' },
    { value: 'lte', label: 'Menor o igual que' },
    { value: 'neq', label: 'Diferente de' }
  ],
  date: [
    { value: 'eq', label: 'Igual a' },
    { value: 'gt', label: 'Después de' },
    { value: 'lt', label: 'Antes de' }
  ],
  boolean: [
    { value: 'true', label: 'Sí' },
    { value: 'false', label: 'No' }
  ],
  text: [
    { value: 'eq', label: 'Igual a' },
    { value: 'contains', label: 'Contiene' },
    { value: 'startsWith', label: 'Empieza con' },
    { value: 'endsWith', label: 'Termina con' },
    { value: 'neq', label: 'Diferente de' }
  ]
};

const normalizeDate = (dateStr) => {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    // Normalizar a UTC para evitar problemas con zonas horarias
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  } catch {
    return null;
  }
};

export const evaluateByOperator = {
  number: {
    eq: (value, filterValue) => Number(value) == Number(filterValue),
    gt: (value, filterValue) => Number(value) > Number(filterValue),
    lt: (value, filterValue) => Number(value) < Number(filterValue),
    gte: (value, filterValue) => Number(value) >= Number(filterValue),
    lte: (value, filterValue) => Number(value) <= Number(filterValue),
    neq: (value, filterValue) => Number(value) != Number(filterValue)
  },
  date: {
    eq: (value, filterValue) => {
      const normalizedValue = normalizeDate(value);
      const normalizedFilter = normalizeDate(filterValue);
      if (!normalizedValue || !normalizedFilter) return false;
      return normalizedValue.getTime() == normalizedFilter.getTime();
    },
    gt: (value, filterValue) => {
      const normalizedValue = normalizeDate(value);
      const normalizedFilter = normalizeDate(filterValue);
      if (!normalizedValue || !normalizedFilter) return false;
      return normalizedValue.getTime() > normalizedFilter.getTime();
    },
    lt: (value, filterValue) => {
      const normalizedValue = normalizeDate(value);
      const normalizedFilter = normalizeDate(filterValue);
      if (!normalizedValue || !normalizedFilter) return false;
      return normalizedValue.getTime() < normalizedFilter.getTime();
    }
  },
  boolean: {
    true: (value) => {
      const normalizedValue = String(value).toLowerCase();
      return normalizedValue == 'true' ||
             normalizedValue == '1' ||
             normalizedValue == 'si' ||
             normalizedValue == 'sí';
    },
    false: (value) => {
      const normalizedValue = String(value).toLowerCase();
      return normalizedValue == 'false' ||
             normalizedValue == '0' ||
             normalizedValue == 'no';
    }
  },
  text: {
    eq: (value, filterValue) => String(value).toLowerCase() == String(filterValue).toLowerCase(),
    contains: (value, filterValue) => String(value).toLowerCase().includes(String(filterValue).toLowerCase()),
    startsWith: (value, filterValue) => String(value).toLowerCase().startsWith(String(filterValue).toLowerCase()),
    endsWith: (value, filterValue) => String(value).toLowerCase().endsWith(String(filterValue).toLowerCase()),
    neq: (value, filterValue) => String(value).toLowerCase() != String(filterValue).toLowerCase()
  }
};

export const evaluateFilter = (value, operator, filterValue, type = 'text') => {
  if (!value || !operator || !filterValue) return false;

  const typeOperators = evaluateByOperator[type];
  if (!typeOperators) return false;

  const operatorFn = typeOperators[operator];
  if (!operatorFn) return false;

  return operatorFn(value, filterValue);
};
