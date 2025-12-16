import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { THEME_SETTINGS_KEY } from '@src/config/storageKeys';

export const ThemeProvider = ({ children }) => {
  // Estado inicial cargado desde localStorage o valores por defecto
  const [themeSettings, setThemeSettings] = useState(() => {
    const saved = localStorage.getItem(THEME_SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
      appearance: 'inherit',
      accentColor: 'indigo',
      grayColor: 'slate',
      radius: 'medium',
      scaling: '100%',
      // Semantic Colors Defaults
      successColor: 'jade',
      warningColor: 'orange',
      dangerColor: 'tomato',
      infoColor: 'blue',
    };
  });

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(THEME_SETTINGS_KEY, JSON.stringify(themeSettings));
  }, [themeSettings]);

  const updateTheme = (key, value) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

  const value = React.useMemo(() => ({
    themeSettings,
    updateTheme,
    colors: {
      primary: themeSettings.accentColor,
      success: themeSettings.successColor,
      warning: themeSettings.warningColor,
      danger: themeSettings.dangerColor,
      info: themeSettings.infoColor,
      gray: themeSettings.grayColor,
    }
  }), [themeSettings]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
