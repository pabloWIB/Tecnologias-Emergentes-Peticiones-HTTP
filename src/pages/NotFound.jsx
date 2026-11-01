import { Button, Stack, Typography } from '@mui/material';

import MainCard from 'components/MainCard';

import { Link } from 'react-router';

export default function NotFound({
  title = 'Page not found',
  text = 'The page you are looking for does not exist.',
  backTo = '/',
  backLabel = 'Back to dashboard'
}) {
  return (
    <MainCard title={title}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography>{text}</Typography>
        <Button size="small" variant="contained" component={Link} to={backTo}>
          {backLabel}
        </Button>
      </Stack>
    </MainCard>
  );
}
