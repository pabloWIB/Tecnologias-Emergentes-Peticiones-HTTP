export default function Armazon(theme) {
  const { ux } = theme.palette;
  const phone = theme.breakpoints.down('sm');

  return {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: `2px solid ${ux.acentoTexto}`,
            outlineOffset: 2
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          [phone]: { minHeight: 44 }
        },
        textPrimary: { color: ux.acentoTexto },
        outlinedPrimary: { color: ux.acentoTexto, borderColor: ux.acentoTexto }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: { color: ux.acentoTexto }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          [phone]: { minWidth: 44, minHeight: 44 }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          [phone]: { fontSize: 16 }
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: { backgroundColor: 'transparent', padding: 0 }
      }
    }
  };
}
