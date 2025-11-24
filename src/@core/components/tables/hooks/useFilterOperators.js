import { FILTER_OPERATORS } from '../constants/filterConstants';

export const useFilterOperators = () => {
  const getOperatorsByType = (type = 'text') => {
    return FILTER_OPERATORS[type] || FILTER_OPERATORS.text;
  };

  return { getOperatorsByType };
};
