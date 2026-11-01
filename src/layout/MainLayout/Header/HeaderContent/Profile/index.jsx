import { useRef, useState } from 'react';

import { Avatar, Box, Button, ButtonBase, ClickAwayListener, Paper, Popper, Stack, Typography } from '@mui/material';

import Transitions from 'components/@extended/Transitions';
import { useThemeMode } from 'themes/ThemeModeContext';

import avatarGroup from 'assets/images/users/avatar-group.png';
import { Moon, Sun } from 'lucide-react';

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon }
];

const Profile = () => {
  const { mode, setMode } = useThemeMode();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{ p: 0.25, borderRadius: 1, bgcolor: open ? 'grey.100' : 'transparent', '&:hover': { bgcolor: 'grey.100' } }}
        aria-label="Profile and theme"
        ref={anchorRef}
        aria-controls={open ? 'profile-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', p: 0.5 }}>
          <Avatar alt="" src={avatarGroup} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1" sx={{ display: { xs: 'none', md: 'block' } }}>
            Admin
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper placement="bottom-end" open={open} anchorEl={() => anchorRef.current} transition disablePortal sx={{ zIndex: 1300 }}>
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper id="profile-menu" sx={(theme) => ({ width: 260, boxShadow: theme.customShadows.z1, border: 1, borderColor: 'divider' })}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ p: 2.5 }}>
                  <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', mb: 2.5 }}>
                    <Avatar alt="" src={avatarGroup} sx={{ width: 36, height: 36 }} />
                    <Box>
                      <Typography variant="h6">Admin</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Administrator
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography id="theme-label" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Theme
                  </Typography>
                  <Stack direction="row" spacing={1} role="group" aria-labelledby="theme-label">
                    {THEME_OPTIONS.map(({ value, label, Icon }) => (
                      <Button
                        key={value}
                        fullWidth
                        size="small"
                        variant={mode === value ? 'contained' : 'outlined'}
                        color={mode === value ? 'primary' : 'secondary'}
                        aria-pressed={mode === value}
                        startIcon={<Icon size={16} aria-hidden="true" />}
                        onClick={() => setMode(value)}
                      >
                        {label}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
