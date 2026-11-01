import { Box, Button, Typography } from '@mui/material';

import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react';

const ICONS = { bad: CircleAlert, good: CircleCheck, warning: TriangleAlert };
const COLORS = { bad: 'malTx', good: 'bienTx', warning: 'avisoTx' };

export default function InlineAlert({ type = 'bad', title, text = '', actionLabel = '', onAction }) {
  const Icon = ICONS[type];

  return (
    <Box
      role={type === 'bad' ? 'alert' : 'status'}
      sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, color: 'text.secondary', flexWrap: 'wrap' }}
    >
      <Box component="span" sx={{ color: (theme) => theme.palette.ux[COLORS[type]], display: 'flex', mt: '2px' }}>
        <Icon size={16} aria-hidden="true" />
      </Box>
      <Typography component="p" variant="body1" sx={{ m: 0, flex: 1, minWidth: 200 }}>
        <Box component="strong" sx={{ color: (theme) => theme.palette.ux[COLORS[type]], fontWeight: 600 }}>
          {title}
        </Box>
        {text && ` ${text}`}
      </Typography>
      {actionLabel && (
        <Button size="small" variant="outlined" color="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
