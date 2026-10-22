import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, ThemeConfig, THEME_CONFIGS } from '../types/theme';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  config: ThemeConfig;
  isTextbook: boolean;
  isKyoto: boolean;
  isModern: boolean;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('nihongo_theme_mode');
    if (saved && (saved === 'textbook' || saved === 'kyoto' || saved === 'modern')) {
      return saved as ThemeMode;
    }
    // Default to the requested textbook format!
    return 'textbook';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('nihongo_theme_mode', newTheme);
  };

  useEffect(() => {
    // Add font or root theme class to html/body
    const root = document.documentElement;
    root.classList.remove('theme-textbook', 'theme-kyoto', 'theme-modern', 'theme-midnight');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    config: THEME_CONFIGS[theme],
    isTextbook: theme === 'textbook',
    isKyoto: theme === 'kyoto',
    isModern: theme === 'modern',
    isDark: false,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
