import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
NotFound.propTypes = {
  er1: PropTypes.string.isRequired,
  er2: PropTypes.node.isRequired,
};

export default function NotFound({ er1, er2 }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Not found
          </Typography>

          <Typography variant="body2">
            {er1}
            <br /> {er2}
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}
