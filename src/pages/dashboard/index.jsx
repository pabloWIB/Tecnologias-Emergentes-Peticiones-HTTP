import { useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import StatCard from 'components/StatCard';
import InlineAlert from 'components/InlineAlert';
import ReactApexChart from 'components/third-party/ApexChart';
import { useDashboardData } from 'hooks/useDashboardData';
import { SUBJECTS } from 'utils/options';

const countBySubject = (people) => SUBJECTS.map(({ value }) => people.filter((person) => person.typeSubject === value).length);

const DashboardDefault = () => {
  const theme = useTheme();
  const { ux } = theme.palette;
  const { status, students, teachers, retry } = useDashboardData();

  const series = useMemo(
    () => [
      { name: 'Students', data: countBySubject(students) },
      { name: 'Teachers', data: countBySubject(teachers) }
    ],
    [students, teachers]
  );

  const options = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: false }, background: 'transparent', foreColor: ux.textoMedio, fontFamily: 'inherit' },
      theme: { mode: theme.palette.mode },
      colors: [ux.acento, ux.bienTx],
      fill: { type: 'solid', opacity: 1 },
      plotOptions: { bar: { columnWidth: '45%', borderRadius: 2 } },
      dataLabels: { enabled: false },
      states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
      xaxis: { categories: SUBJECTS.map(({ label }) => label), axisBorder: { color: ux.borde }, axisTicks: { color: ux.borde } },
      yaxis: { forceNiceScale: true, decimalsInFloat: 0 },
      grid: { borderColor: ux.borde },
      legend: { position: 'top', horizontalAlign: 'left', labels: { colors: ux.textoMedio } },
      tooltip: { theme: theme.palette.mode }
    }),
    [ux, theme.palette.mode]
  );

  const chartSummary = SUBJECTS.map(({ label }, index) => `${label}: ${series[0].data[index]} students, ${series[1].data[index]} teachers`).join('. ');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={{ xs: 12 }} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      {status === 'error' && (
        <Grid size={{ xs: 12 }}>
          <InlineAlert type="bad" title="The data could not be loaded." text="Try again." actionLabel="Retry" onAction={retry} />
        </Grid>
      )}

      {status === 'loading' && (
        <Grid size={{ xs: 12 }}>
          <LinearProgress aria-label="Loading" />
        </Grid>
      )}

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard label="Students" value={status === 'ready' ? students.length : '-'} linkTo="/students" linkLabel="See students" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard label="Teachers" value={status === 'ready' ? teachers.length : '-'} linkTo="/teachers" linkLabel="See teachers" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard label="Subjects" value={SUBJECTS.length} />
      </Grid>

      {status === 'ready' && (
        <Grid size={{ xs: 12 }}>
          <MainCard title="Students and teachers by subject">
            {students.length + teachers.length === 0 ? (
              <Typography color="text.secondary">There is nobody yet. Add a student or a teacher to see them here.</Typography>
            ) : (
              <Box role="img" aria-label={chartSummary}>
                <ReactApexChart key={theme.palette.mode} options={options} series={series} type="bar" height={320} />
              </Box>
            )}
          </MainCard>
        </Grid>
      )}
    </Grid>
  );
};

export default DashboardDefault;
