import { createTheme } from '@mui/material/styles';

import ThemeOption from './theme';
import { TOKENS } from './tokens';

const Palette = (mode) => {
  const t = TOKENS[mode];
  const paletteColor = ThemeOption(mode);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: t.texto,
        secondary: t.textoMedio,
        disabled: t.off
      },
      action: {
        hover: t.hover,
        disabled: t.off
      },
      divider: t.borde,
      background: {
        paper: t.panel,
        default: t.superficie
      },
      ux: t
    }
  });
};

export default Palette;
