import { GREYS, TOKENS } from '../tokens';

const Theme = (mode) => {
  const t = TOKENS[mode];
  const grey = GREYS[mode];

  return {
    primary: {
      lighter: t.acentoTinte,
      100: t.acentoTinte,
      200: t.acentoTinte,
      light: t.acentoTexto,
      400: t.acentoTexto,
      main: t.acento,
      dark: t.acentoFuerte,
      700: t.acentoFuerte,
      darker: t.acentoFuerte,
      900: t.acentoFuerte,
      contrastText: t.sobreAcento
    },
    secondary: {
      lighter: grey[100],
      100: grey[100],
      200: grey[200],
      light: grey[300],
      400: grey[400],
      main: grey[500],
      600: grey[600],
      dark: grey[700],
      800: grey[800],
      darker: grey[900],
      A100: grey[0],
      A200: grey.A400,
      A300: grey.A700,
      contrastText: grey[0]
    },
    error: {
      lighter: t.acentoTinte,
      light: t.malTx,
      main: t.malTx,
      dark: t.borrar,
      darker: t.borrar,
      contrastText: '#ffffff'
    },
    warning: {
      lighter: grey[100],
      light: t.avisoTx,
      main: t.avisoTx,
      dark: t.avisoTx,
      darker: t.avisoTx,
      contrastText: grey[0]
    },
    info: {
      lighter: t.acentoTinte,
      light: t.acentoTexto,
      main: t.acentoTexto,
      dark: t.acentoFuerte,
      darker: t.acentoFuerte,
      contrastText: t.sobreAcento
    },
    success: {
      lighter: grey[100],
      light: t.bienTx,
      main: t.bienTx,
      dark: t.bienTx,
      darker: t.bienTx,
      contrastText: grey[0]
    },
    grey
  };
};

export default Theme;
