import { useState } from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import EditId from 'src/zustand/EditId';
import { useDeleteCars } from 'src/api/cars/Mutations';
import { toCarsEdit } from 'src/paths/ShowMeTheWayFrontend';

import Iconify from 'src/components/iconify';
import CustomModal from 'src/components/custom-made/CustomModal';
import { CustomformatDate } from 'src/components/format-changer/FormatChnager';
import { deleteCarMessage } from 'src/components/messages/CustomModalMessages';

// ----------------------------------------------------------------------

export default function CarsTableRow({
  id,
  selected,
  name,
  transmission,
  picture,
  service_interval,
  company,
  fuel,
  year,
  insurance,
  lastService,
  handleClick,
}) {
  const deleteCarMutation = useDeleteCars();
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleEditMenu = (ids) => {
    EditId.setState({ id: ids });
    console.log(ids);
    router.push(toCarsEdit);
    setOpen(null);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteCustomers = (idd) => {
    deleteCarMutation.mutate(idd);
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            <div className="flex gap-3 items-center">
              <div>
                <Avatar sx={{ width: 70 }} variant="square" alt={name} src={picture} />
              </div>
              <div className="flex flex-col">
                <Typography variant="subtitle1" noWrap>
                  {name}
                </Typography>
                <Typography color="gray" variant="overline" noWrap>
                  {company}{' '}
                </Typography>
                <Typography color="gray " variant="overline" noWrap>
                   {year}
                </Typography>
              </div>
            </div>
            <Typography color="" variant="" noWrap />
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            <Typography variant="subtitle1" noWrap>
              {transmission}
            </Typography>

            <Typography color="gray " variant="overline" noWrap>
              fuel: {fuel}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography variant="overline" noWrap>
            {service_interval}
          </Typography>
        </TableCell>

        <TableCell>{CustomformatDate(insurance)}</TableCell>
        <TableCell>{CustomformatDate(lastService)}</TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleEditMenu(id)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() =>
            CustomModal(() => handleDeleteCustomers(id), deleteCarMessage, setOpen(null), id)
          }
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

CarsTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  picture: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  transmission: PropTypes.string.isRequired,
  service_interval: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  fuel: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  insurance: PropTypes.instanceOf(Date).isRequired,
  lastService: PropTypes.instanceOf(Date).isRequired,
  handleClick: PropTypes.func.isRequired,
};
