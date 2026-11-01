import { Snackbar } from '@mui/material';

export default function Toast({ message, onClose }) {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      message={message}
      slotProps={{
        content: {
          role: 'status',
          sx: (theme) => ({
            bgcolor: theme.palette.ux.toastBg,
            color: theme.palette.ux.toastTx,
            boxShadow: theme.palette.ux.sombraCapa,
            borderRadius: '10px',
            fontSize: '0.875rem'
          })
        }
      }}
    />
  );
}
