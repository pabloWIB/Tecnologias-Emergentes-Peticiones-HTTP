import { Stack, Typography } from '@mui/material';

import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';

const DrawerHeader = ({ open }) => {
  return (
    <DrawerHeaderStyled open={open}>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <Logo />
        <Typography variant="h5" sx={{ ml: -9 }}>
          T. Emergentes
        </Typography>
      </Stack>
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
