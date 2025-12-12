import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

const useCustomAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useCustomAlert must be used within an AlertProvider');
  }
  return context;
};

export default useCustomAlert;
