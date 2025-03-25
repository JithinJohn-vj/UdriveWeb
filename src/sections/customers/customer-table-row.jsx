/* eslint-disable */
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
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import EditId from 'src/zustand/EditId';
import { toCustomerEdit } from 'src/paths/ShowMeTheWayFrontend';
import { useDeleteCustomers } from 'src/api/customers/Mutations';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomModal from 'src/components/custom-made/CustomModal';
import { formatPhoneNumber } from 'src/components/format-changer/FormatChnager';
import { deleteCustomerMessage } from 'src/components/messages/CustomModalMessages';

import CustomerDetailsModal from './view/customer-details-modal';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  name,
  contactNumber,
  email,
  bookings,
  passportNumber,
  address,
  locality,
  cityOrDistrict,
  customerImage,
  selected,
  passportImage,
  pincode,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const deleteCustomerMutation = useDeleteCustomers();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteCustomers = (idd) => {
    deleteCustomerMutation.mutate(idd);
    setOpen(null);
  };
  const handleEditMenu = (ide) => {
    EditId.setState({ id: ide });
    console.log(ide);
    router.push(toCustomerEdit);
    setOpen(null);
  };

  const [showModal, setShowModal] = useState(false);

  const handleViewMore = () => {
    setShowModal(true);
  };

  const handleDownloadPassport = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${passportImage.replace('/upload/', '/upload/fl_attachment:passport/')}`;
    downloadLink.download = 'passport.jpg'; // You can customize the filename here
    downloadLink.click();
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
                <Avatar alt={name} src={customerImage || ''} />
              </div>
              <div className="flex flex-col">
                <Typography className="" variant="overline" noWrap>
                  {name}
                </Typography>
                <Typography color="gray" variant="overline" noWrap>
                  {formatPhoneNumber(contactNumber)}
                </Typography>{' '}
                <Typography color=" " variant="subtitle2" noWrap>
                  {email}
                </Typography>
              </div>
            </div>
            <Typography color="" variant="" noWrap />
          </Stack>
        </TableCell>

        {/* <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            <Typography variant="subtitle1" noWrap>
            </Typography>
            <Typography color=" " variant="subtitle2" noWrap>
              {passportNumber}
            </Typography>
          </Stack>
        </TableCell> */}
        <TableCell>
          <Typography variant="overline" noWrap>
            {locality}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <div className="ml-[-20px]">{bookings?.length}</div>
        </TableCell>

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        <TableCell>
          <Label color={(bookings?.length >= 1 && 'success') || 'error'}>
            {bookings.length >= 1 ? 'Active' : 'inactive'}{' '}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
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
        <MenuItem onClick={handleViewMore}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          view
        </MenuItem>
        {passportImage && (
          <MenuItem onClick={handleDownloadPassport}>
            <Iconify icon="ic:outline-download" sx={{ mr: 2 }} />
            Passport
          </MenuItem>
        )}
        <MenuItem onClick={() => handleEditMenu(id)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() =>
            CustomModal(() => handleDeleteCustomers(id), deleteCustomerMessage, setOpen(null), id)
          }
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <CustomerDetailsModal
        open={showModal}
        onClose={() => (setShowModal(false), setOpen(null))}
        userDetails={{
          id,
          name,
          contactNumber,
          email,
          bookings,
          pincode,
          passportNumber,
          locality,
          customerImage,
          address,
          cityOrDistrict,
        }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bookings: PropTypes.array.isRequired,
  passportImage: PropTypes.string.isRequired,
  passportNumber: PropTypes.string.isRequired,
  locality: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  customerImage: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
