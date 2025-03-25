import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function ItemLoading() {
  return (
    <TableRow>
      <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <CircularProgress />
        </Paper>
      </TableCell>
    </TableRow>
  );
}
