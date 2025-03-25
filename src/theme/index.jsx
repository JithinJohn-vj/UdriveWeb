import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { useThemeStore } from 'src/zustand/themeStore';

import { palette, darkpalette } from './palette'; // Import your light palette function

import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const { darkMode } = useThemeStore();

  const memoizedValue = useMemo(
    () => ({
      palette: darkMode ? darkpalette() : palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [darkMode]
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
