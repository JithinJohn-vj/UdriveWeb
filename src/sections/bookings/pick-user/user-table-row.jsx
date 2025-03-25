import PropTypes from 'prop-types';

import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import { formatPhoneNumber } from 'src/components/format-changer/FormatChnager';

// ----------------------------------------------------------------------

export default function UserTableRow({
  name,
  contactNumber,
  email,
  bookings,
  passportNumber,
  locality,
  picture,
  selected,
  handleClick,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack alignItems="left" marginLeft={2} direction="column">
          <div className="flex gap-3 items-center">
            <div>
              <Avatar alt={name} src={picture} />
            </div>
            <div className="flex flex-col">
              <Typography variant="subtitle1" noWrap>
                {name}
              </Typography>
              <Typography color="gray" variant="overline" noWrap>
                {formatPhoneNumber(contactNumber)}
              </Typography>
              <Typography color=" " variant="subtitle2" noWrap>
                {email}
              </Typography>
            </div>
          </div>
          <Typography color="" variant="" noWrap />
        </Stack>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Stack alignItems="left" marginLeft={2} direction="column">
          <Typography color=" " variant="subtitle2" noWrap>
            {passportNumber}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="overline" noWrap>
          {locality}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <div className="ml-[-20px]">{bookings?.length}</div>
      </TableCell>

      <TableCell>
        <Label color={(bookings?.length > 0 && 'success') || 'error'}>
          {bookings.length > 0 ? 'Active' : 'inactive'}{' '}
        </Label>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bookings: PropTypes.array.isRequired,
  passportNumber: PropTypes.string.isRequired,
  locality: PropTypes.string.isRequired,
  picture: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
