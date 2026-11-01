import { Grid, Stack, Typography } from '@mui/material';

import MainCard from './MainCard';

export default function FormSection({ title, children }) {
  return (
    <MainCard>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>{children}</Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
