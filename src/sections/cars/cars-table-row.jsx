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
import { useDeleteCars, useResetServiceKms } from 'src/api/cars/Mutations';
import { toCarsEdit } from 'src/paths/ShowMeTheWayFrontend';

import Iconify from 'src/components/iconify';
import CustomModal from 'src/components/custom-made/CustomModal';
import { CustomformatDate, checkDaysLeft } from 'src/components/format-changer/FormatChnager';
import { deleteCarMessage } from 'src/components/messages/CustomModalMessages';

import CarsDetailsModal from './view/cars-details-modal';

// ----------------------------------------------------------------------

export default function CarsTableRow({
  id,
  selected,
  filterOption,
  name,
  serviceKilometre,
  bookings,
  transmission,
  service_interval,
  pollution,
  company,
  totalKmCovered,
  fuel,
  year,
  insurance,
  vehicleNumber,
  lastService,
  carImage,
  insurancePolicy,
  pollutionCertificate,
  rcBook,
  handleClick,
}) {
  console.log(pollution);
  const deleteCarMutation = useDeleteCars();
  const resetServiceKms = useResetServiceKms();
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
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
  const [showModal, setShowModal] = useState(false);

  const handleViewMore = () => {
    setShowModal(true);
  };
  const handleDownloadInsurance = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${insurancePolicy.replace('/upload/', '/upload/fl_attachment:insurance/')}`;
    downloadLink.download = 'insurance.jpg'; // You can customize the filename here
    downloadLink.click();
  };
  const handleDownloadPollution = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${pollutionCertificate.replace('/upload/', '/upload/fl_attachment:pollution/')}`;
    downloadLink.download = 'pollution.jpg'; // You can customize the filename here
    downloadLink.click();
  };
  const handleDownloadRc = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${rcBook.replace('/upload/', '/upload/fl_attachment:rc/')}`;
    downloadLink.download = 'rc.jpg'; // You can customize the filename here
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
                <Avatar sx={{ width: 70 }} variant="square" alt={name} src={carImage || ''} />
              </div>
              <div className="flex flex-col">
                <Typography className="" variant="overline" noWrap>
                  {name}
                </Typography>
                <Typography color="gray" variant="overline" noWrap>
                  {company}{' '}
                </Typography>{' '}
                <Typography color="gray " variant="overline" noWrap>
                  year: {year}
                </Typography>
              </div>
            </div>
            <Typography color="" variant="" noWrap />
          </Stack>
        </TableCell>
        <TableCell>
          <Typography variant="overline" noWrap>
            {vehicleNumber}{' '}
          </Typography>
        </TableCell>

        {filterOption != 'servicedue' && (
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
        )}

        {filterOption === 'all' || filterOption === 'servicedue' ? (
          <>
            {filterOption != 'servicedue' && (
              <TableCell>
                <Typography variant="overline" noWrap>
                  {totalKmCovered || 0} KMS
                </Typography>
              </TableCell>
            )}
            <TableCell>
              <Typography variant="overline" noWrap>
                Every {service_interval} kms
              </Typography>
            </TableCell>
            {filterOption != 'servicedue' && (
              <TableCell>
                <div className="w-full flex justify-center items-center">
                  {bookings?.length || 0}
                </div>
              </TableCell>
            )}
          </>
        ) : (
          <>
            {filterOption === 'onrun' ? (
              <>
                <TableCell>
                  <Typography variant="overline" noWrap>
                    {bookings?.fromDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="overline" noWrap>
                    {bookings?.toDate}
                  </Typography>{' '}
                </TableCell>
              </>
            ) : (
              <>
                {filterOption === 'onyard' && (
                  <TableCell>
                    <div className="w-full flex justify-center items-center">
                      {bookings?.length || 0}
                    </div>
                  </TableCell>
                )}
              </>
            )}
          </>
        )}
        {filterOption === 'servicedue' && (
          <TableCell className="text-center">
            <span className=" w-full flex justify-center items-center">{serviceKilometre} kms</span>
          </TableCell>
        )}
        {filterOption === 'servicedue' && (
          <>
            <TableCell className="text-center">
              <span className="w-full flex justify-center items-center">
                {serviceKilometre <= service_interval
                  ? `${service_interval - serviceKilometre} kms`
                  : 'Service overdue'}
              </span>
            </TableCell>
            <TableCell component="th" scope="row" padding="none">
              <Typography className="flex justify-center" variant="subtitle2" noWrap>
                <p
                  onClick={() => resetServiceKms.mutate(id)}
                  className="bg-red-100 border text-black cursor-pointer p-2"
                >
                  Mark as done
                </p>
              </Typography>
            </TableCell>
          </>
        )}

        {filterOption != 'servicedue' && (
          <>
            <TableCell>{CustomformatDate(lastService)}</TableCell>
            <TableCell>{CustomformatDate(insurance)}</TableCell>
            <TableCell>{CustomformatDate(pollution)}</TableCell>
          </>
        )}

        {filterOption === 'insurancedue' && (
          <TableCell>
            <div className="w-full flex justify-center items-center">
              {checkDaysLeft(insurance)}
            </div>
          </TableCell>
        )}
        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}
        {filterOption === 'pollutiondue' && (
          <>
            <TableCell className="text-center">
              <span className=" w-full flex justify-center items-center">
                {checkDaysLeft(pollution)}
              </span>
            </TableCell>
          </>
        )}
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
        {insurancePolicy && (
          <MenuItem onClick={handleDownloadInsurance}>
            <Iconify icon="ic:outline-download" sx={{ mr: 2 }} />
            Insurance
          </MenuItem>
        )}
        {pollutionCertificate && (
          <MenuItem onClick={handleDownloadPollution}>
            <Iconify icon="ic:outline-download" sx={{ mr: 2 }} />
            Pollution
          </MenuItem>
        )}
        {rcBook && (
          <MenuItem onClick={handleDownloadRc}>
            <Iconify icon="ic:outline-download" sx={{ mr: 2 }} />
            Rc Book
          </MenuItem>
        )}
        <MenuItem onClick={() => handleEditMenu(id)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {/* insurancePolicy
pollutionCertificate
rcBook */}

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
      <CarsDetailsModal
        open={showModal}
        onClose={() => (setShowModal(false), setOpen(null))}
        userDetails={{
          name,
          id,
          bookings,
          transmission,
          totalKmCovered,
          service_interval,
          company,
          fuel,
          vehicleNumber,
          year,
          insurance,
          lastService,
          carImage,
        }}
      />
    </>
  );
}

CarsTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  bookings: PropTypes.array.isRequired,
  transmission: PropTypes.string.isRequired,
  service_interval: PropTypes.number,
  totalKmCovered: PropTypes.number,
  serviceKilometre: PropTypes.number,
  company: PropTypes.string.isRequired,
  carImage: PropTypes.string,
  vehicleNumber: PropTypes.string,
  filterOption: PropTypes.string,
  fuel: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  insurance: PropTypes.string.isRequired,
  lastService: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
