/**
 * Utilidades para FullScreenModal
 * Maneja los colores del tema integrándose con Radix UI
 */

/**
 * Mapea colores semánticos a colores de Radix basándose en la configuración del tema
 *
 * @param {string} semanticColor - Color semántico (primary, success, danger, warning, info, secondary)
 * @param {object} themeSettings - Configuración del tema desde useTheme
 * @returns {string} - Nombre del color de Radix (ej: 'indigo', 'jade', 'tomato')
 */
export const getRadixColor = (semanticColor, themeSettings = {}) => {
  const colorMap = {
    primary: themeSettings.accentColor || 'indigo',
    success: themeSettings.successColor || 'jade',
    danger: themeSettings.dangerColor || 'tomato',
    warning: themeSettings.warningColor || 'orange',
    info: themeSettings.infoColor || 'blue',
    secondary: themeSettings.grayColor || 'gray',
  };

  return colorMap[semanticColor] || colorMap.primary;
};

/**
 * Genera clases de Tailwind y estilos CSS para el header/footer del modal
 * utilizando los colores de Radix UI
 *
 * @param {string} color - Color semántico (primary, success, danger, warning, info, secondary)
 * @param {object} themeSettings - Configuración del tema desde useTheme
 * @returns {object} - Objeto con clases CSS y estilos inline
 */
export const getColorClasses = (color, themeSettings = {}) => {
  const radixColor = getRadixColor(color, themeSettings);

  // Clases base de Tailwind para estructura
  const baseClasses = 'transition-colors duration-200';

  // Clases específicas usando los colores de Radix mediante CSS custom properties
  const headerClasses = `${baseClasses}`;
  const footerClasses = `${baseClasses}`;

  return {
    header: headerClasses,
    footer: footerClasses,
    // Estilos inline que usan las variables CSS de Radix
    headerStyle: {
      backgroundColor: `var(--${radixColor}-9)`,
      background: `linear-gradient(135deg, var(--${radixColor}-9) 0%, var(--${radixColor}-10) 100%)`,
    },
    footerStyle: {
      backgroundColor: `var(--${radixColor}-9)`,
      background: `linear-gradient(135deg, var(--${radixColor}-9) 0%, var(--${radixColor}-10) 100%)`,
    },
    radixColor, // Exponer el color de Radix por si se necesita
  };
};

/**
 * Genera clases de Tailwind compatibles con el color de Radix
 * (Equivalente a getBootstrapGradientClass del componente original)
 *
 * @param {string} color - Color semántico
 * @param {object} themeSettings - Configuración del tema
 * @returns {string} - Clases de Tailwind
 */
export const getGradientClass = (color, themeSettings = {}) => {
  const { header } = getColorClasses(color, themeSettings);
  return header;
};

/**
 * Obtiene el estilo de color sólido (sin gradiente)
 *
 * @param {string} color - Color semántico
 * @param {object} themeSettings - Configuración del tema
 * @returns {object} - Objeto con el estilo CSS
 */
export const getSolidColorStyle = (color, themeSettings = {}) => {
  const radixColor = getRadixColor(color, themeSettings);
  return {
    backgroundColor: `var(--${radixColor}-9)`,
    color: 'white',
  };
};

/**
 * Obtiene el estilo de color suave (soft variant)
 *
 * @param {string} color - Color semántico
 * @param {object} themeSettings - Configuración del tema
 * @returns {object} - Objeto con el estilo CSS
 */
export const getSoftColorStyle = (color, themeSettings = {}) => {
  const radixColor = getRadixColor(color, themeSettings);
  return {
    backgroundColor: `var(--${radixColor}-3)`,
    color: `var(--${radixColor}-11)`,
  };
};
