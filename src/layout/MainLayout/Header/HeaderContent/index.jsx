import { Box, useMediaQuery } from '@mui/material';

import Search from './Search';
import Profile from './Profile';
import MobileSection from './MobileSection';
import ThemeToggle from 'components/ThemeToggle';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Search />}
      <Box sx={{ flexGrow: 1 }} />
      {matchesXs && <MobileSection />}
      <ThemeToggle />
      <Profile />
    </>
  );
};

export default HeaderContent;
