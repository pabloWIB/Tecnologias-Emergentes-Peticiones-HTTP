import { useState } from 'react';

import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';

import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import { Link } from 'react-router';

export default function StudentActions({ studentId, studentName, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const menuId = `student-menu-${studentId}`;

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

  return (
    <>
      <IconButton
        aria-label={`Actions for ${studentName}`}
        aria-controls={open ? menuId : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ color: 'text.secondary' }}
      >
        <EllipsisVertical size={18} aria-hidden="true" />
      </IconButton>
      <Menu id={menuId} anchorEl={anchorEl} open={open} onClose={handleClose} slotProps={{ paper: { sx: { minWidth: '20ch' } } }}>
        <MenuItem component={Link} to={`/students/edit/${studentId}`}>
          <ListItemIcon sx={{ color: 'text.secondary' }}>
            <Pencil size={16} aria-hidden="true" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon sx={(theme) => ({ color: theme.palette.ux.malTx })}>
            <Trash2 size={16} aria-hidden="true" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
