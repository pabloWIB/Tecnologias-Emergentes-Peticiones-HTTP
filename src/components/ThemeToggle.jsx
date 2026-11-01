import { IconButton, Tooltip } from '@mui/material';

import { useThemeMode } from 'themes/ThemeModeContext';

import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}>
      <IconButton
        aria-label={mode === 'dark' ? 'Theme: dark' : 'Theme: light'}
        onClick={toggleMode}
        color="secondary"
        sx={{ color: 'text.primary', ml: 0.75 }}
      >
        {mode === 'dark' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
      </IconButton>
    </Tooltip>
  );
}
