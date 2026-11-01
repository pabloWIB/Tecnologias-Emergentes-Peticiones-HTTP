import { Button, Stack, Typography } from '@mui/material';

import MainCard from './MainCard';

import { Link } from 'react-router';

export default function StatCard({ label, value, linkTo = '', linkLabel = '' }) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="body1" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h3" sx={{ fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </Typography>
        {linkTo && (
          <Button component={Link} to={linkTo} size="small" sx={{ alignSelf: 'flex-start', px: 0, minWidth: 0 }}>
            {linkLabel}
          </Button>
        )}
      </Stack>
    </MainCard>
  );
}
