import { createContext, useContext } from 'react';

export const THEME_STORAGE_KEY = 'te_tema';

export const ThemeModeContext = createContext({ mode: 'light', toggleMode: () => {}, setMode: () => {} });

export const useThemeMode = () => useContext(ThemeModeContext);
