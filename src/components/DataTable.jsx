import { Box, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import InlineAlert from './InlineAlert';

export default function DataTable({
  ariaLabel,
  columns,
  rows,
  getRowId,
  renderActions,
  status = 'ready',
  emptyText,
  errorText = '',
  onRetry
}) {
  const totalColumns = columns.length + (renderActions ? 1 : 0);

  if (status === 'error') {
    return (
      <Box sx={{ p: 2.5 }}>
        <InlineAlert type="bad" title={errorText} actionLabel={onRetry ? 'Retry' : ''} onAction={onRetry} />
      </Box>
    );
  }

  const isEmpty = status === 'empty' || (status === 'ready' && rows.length === 0);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {status === 'loading' && <LinearProgress aria-label="Loading" />}
      <Table aria-label={ariaLabel} sx={tableSx}>
        <TableHead>
          <TableRow>
            {columns.map(({ key, label, align = 'left' }) => (
              <TableCell key={key} align={align}>
                {label}
              </TableCell>
            ))}
            {renderActions && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {isEmpty && (
            <TableRow>
              <TableCell colSpan={totalColumns} align="center" className="data-table__empty" sx={{ py: 4, color: 'text.secondary' }}>
                {emptyText}
              </TableCell>
            </TableRow>
          )}
          {status === 'ready' &&
            rows.map((row) => (
              <TableRow key={getRowId(row)}>
                {columns.map(({ key, label, align = 'left' }, index) => (
                  <TableCell
                    key={key}
                    align={align}
                    data-label={label}
                    {...(index === 0 && { component: 'th', scope: 'row' })}
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {row[key] === '' || row[key] === undefined || row[key] === null ? '-' : row[key]}
                  </TableCell>
                ))}
                {renderActions && (
                  <TableCell align="right" data-label="Actions" className="data-table__actions">
                    {renderActions(row)}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}

const tableSx = (theme) => ({
  minWidth: 650,
  '& tbody tr:last-of-type td, & tbody tr:last-of-type th': { border: 0 },
  [theme.breakpoints.down('sm')]: {
    minWidth: 0,
    '& thead': { display: 'none' },
    '& tbody tr': {
      display: 'block',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '10px',
      mx: 1.5,
      my: 1.5,
      px: 2,
      py: 1
    },
    '& tbody td, & tbody th': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2,
      textAlign: 'right',
      border: 0,
      px: 0,
      py: 0.75
    },
    '& tbody td::before, & tbody th::before': {
      content: 'attr(data-label)',
      color: theme.palette.text.secondary,
      textAlign: 'left',
      flexShrink: 0
    },
    '& tbody td.data-table__empty': { display: 'block', textAlign: 'center' },
    '& tbody td.data-table__empty::before': { content: 'none' },
    '& tbody td.data-table__actions': {
      justifyContent: 'flex-end',
      borderTop: `1px solid ${theme.palette.divider}`,
      mt: 0.5,
      pt: 0.5
    },
    '& tbody td.data-table__actions::before': { content: 'none' }
  }
});
