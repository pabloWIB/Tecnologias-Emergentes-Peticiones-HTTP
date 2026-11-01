import { useRef, useState } from 'react';

import { Box, ClickAwayListener, IconButton, Paper, Popper } from '@mui/material';

import Search from './Search';
import Transitions from 'components/@extended/Transitions';

import { Search as SearchIcon, X } from 'lucide-react';

const MobileSection = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          ref={anchorRef}
          aria-label={open ? 'Close search' : 'Search'}
          aria-expanded={open ? 'true' : 'false'}
          aria-controls={open ? 'mobile-search' : undefined}
          onClick={() => setOpen(!open)}
          color="secondary"
          sx={{ color: 'text.primary' }}
        >
          {open ? <X size={18} aria-hidden="true" /> : <SearchIcon size={18} aria-hidden="true" />}
        </IconButton>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={() => anchorRef.current}
        transition
        disablePortal
        sx={{ width: '100%', zIndex: 1300 }}
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper id="mobile-search" sx={(theme) => ({ boxShadow: theme.customShadows.z1, p: 2, borderRadius: 0 })}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Search autoFocus onDone={() => setOpen(false)} />
                </Box>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default MobileSection;
