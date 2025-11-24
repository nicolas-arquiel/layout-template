// Utilidades generales de la aplicación

// Tema para react-select compatible con Radix UI
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'var(--accent-3)',
    primary50: 'var(--accent-4)',
    primary75: 'var(--accent-5)',
    primary: 'var(--accent-9)',
    danger: 'var(--red-9)',
    dangerLight: 'var(--red-3)',
    neutral0: 'var(--color-background)',
    neutral5: 'var(--gray-3)',
    neutral10: 'var(--gray-4)',
    neutral20: 'var(--gray-6)',
    neutral30: 'var(--gray-7)',
    neutral40: 'var(--gray-8)',
    neutral50: 'var(--gray-9)',
    neutral60: 'var(--gray-10)',
    neutral70: 'var(--gray-11)',
    neutral80: 'var(--gray-12)',
    neutral90: 'var(--gray-12)'
  }
});
