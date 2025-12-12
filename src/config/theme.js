/**
 * Global Theme Configuration
 * Maps semantic names to Radix UI color scales.
 * 
 * Usage:
 * import { THEME } from '@src/config/theme';
 * <Button color={THEME.success}>Save</Button>
 */
export const THEME = {
  success: 'jade', // Overridden to MediumSeaGreen in variables.css
  danger: 'tomato',
  warning: 'orange',
  info: 'blue',
  primary: 'indigo', // Default primary
  secondary: 'gray',
};
