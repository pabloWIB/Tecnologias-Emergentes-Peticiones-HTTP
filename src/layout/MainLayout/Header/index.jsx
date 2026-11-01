import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';

import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const mainHeader = (
    <Toolbar>
      <IconButton
        disableRipple
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open ? 'true' : 'false'}
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? 'grey.200' : 'grey.100', ml: { xs: 0, lg: -2 } }}
      >
        {open ? <PanelLeftClose size={18} aria-hidden="true" /> : <PanelLeftOpen size={18} aria-hidden="true" />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Header;
