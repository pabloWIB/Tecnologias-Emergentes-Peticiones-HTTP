import { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ConfirmDelete({ open, itemName, busy = false, error = '', onConfirm, onCancel }) {
  const [step, setStep] = useState(1);

  const close = () => {
    if (busy) return;
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="confirm-delete-title"
      slotProps={{ transition: { onExited: () => setStep(1) } }}
    >
      <DialogTitle id="confirm-delete-title">{step === 1 ? `Delete «${itemName}»?` : 'Are you sure?'}</DialogTitle>
      <DialogContent>
        {step === 2 && <DialogContentText>It is deleted forever and cannot be recovered.</DialogContentText>}
        {error && (
          <DialogContentText role="alert" sx={{ mt: 2, color: (theme) => theme.palette.ux.malTx, fontWeight: 600 }}>
            {error}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {step === 1 ? (
          <>
            <Button onClick={close} color="secondary">
              Cancel
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setStep(2)} autoFocus>
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button onClick={close} color="secondary" disabled={busy} autoFocus>
              No, keep it
            </Button>
            <Button
              variant="contained"
              onClick={onConfirm}
              disabled={busy}
              sx={(theme) => ({
                bgcolor: theme.palette.ux.borrar,
                color: theme.palette.common.white,
                '&:hover': { bgcolor: theme.palette.ux.borrar, filter: 'brightness(0.92)' }
              })}
            >
              {busy ? 'Deleting...' : 'Yes, delete forever'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
