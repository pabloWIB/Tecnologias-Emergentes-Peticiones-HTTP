import { useMemo, useState } from 'react';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';
import { THEME_STORAGE_KEY, ThemeModeContext } from './ThemeModeContext';

const readMode = () => (document.documentElement.getAttribute('data-tema') === 'oscuro' ? 'dark' : 'light');

export default function ThemeCustomization({ children }) {
  const [mode, setModeState] = useState(readMode);

  const applyMode = (next, remember) => {
    const value = next === 'dark' ? 'oscuro' : 'claro';
    document.documentElement.setAttribute('data-tema', value);
    if (remember) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, value);
      } catch {}
      document.documentElement.setAttribute('data-tema-pref', value);
    }
    setModeState(next);
  };

  const modeContext = useMemo(
    () => ({
      mode,
      setMode: (next) => applyMode(next, true),
      toggleMode: () => applyMode(mode === 'dark' ? 'light' : 'dark', true)
    }),
    [mode]
  );

  const theme = useMemo(() => {
    const paletteTheme = Palette(mode);
    const themes = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536
        }
      },
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: paletteTheme.palette,
      customShadows: CustomShadows(mode),
      typography: Typography(`'Public Sans', sans-serif`)
    });
    themes.components = componentsOverride(themes);
    return themes;
  }, [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeModeContext value={modeContext}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext>
    </StyledEngineProvider>
  );
}
