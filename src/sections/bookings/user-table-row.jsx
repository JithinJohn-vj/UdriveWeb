/* eslint-disable */
import { toast } from 'sonner';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { Avatar, Box, Button, Fade, Modal, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
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
// ----------------------------------------------------------------------
import { _invoice } from 'src/_mock/invoice';
import { toBookingEdit, toBookingInvoice } from 'src/paths/ShowMeTheWayFrontend';
import {
  useDeleteBooking,
  useChangeBookingStatus,
  useAddCarKilometers,
} from 'src/api/bookings/Mutations';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomModal from 'src/components/custom-made/CustomModal';
import { formatPhoneNumber } from 'src/components/format-changer/FormatChnager';
import {
  deleteBookingMessage,
  cancelBookingMessages,
  activateBookingMessages,
} from 'src/components/messages/CustomModalMessages';

import { AdvancePDF, InvoicePDF } from './invoice';
import BookingDetailsModal from './view/booking-details-modal';
import { styled } from '@mui/material/styles';

export default function UserTableRow({
  selected,
  invoiceId,
  pickupCost,
  deliveryCost,
  id,
  fromDate,
  toDate,
  totalDuration,
  discount,
  driver,
  invoiceGenerated,
  advancePaid,
  advanceAmount,
  payment,
  employee,
  tax,
  formdata,
  kmBeforeTrip,
  pickupPoint,
  filterOption,
  dropPoint,
  carSelected,
  customerSelected,
  subTotals,
  total,
  costPerDay,
  isKilometreUpdated,
  invoiceDetails,
  handleClick,
  costAfterMinimumKm,
  minimumKilometer,
  status: initialIsBlocked,
}) {
  const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(5),
  }));

  const ModalContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '95%',
    margin: 'auto',
  });

  console.log("customer",customerSelected)
  const addCarKilometers = useAddCarKilometers();
  console.log(formdata);
  console.log();
  console.log(carSelected);
  console.log(payment);
  console.log(initialIsBlocked);
  console.log(invoiceDetails);
  const deleteBookingMutation = useDeleteBooking();
  const bookingStatusMutation = useChangeBookingStatus();
  const router = useRouter();
  const [open, setOpen] = useState(null);
  const [kms, setKms] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditMenu = (ids) => {
    EditId.setState({ id: ids });
    console.log(ids);
    router.push(toBookingEdit);
    setOpen(null);
  };

  const handleMakeInvoice = (ids) => {
    EditId.setState({ id: ids });
    console.log(ids);
    router.push(toBookingInvoice);
    setOpen(null);
  };

  const handleDeleteBookings = (idd) => {
    deleteBookingMutation.mutate(idd);
    setOpen(null);
  };
  const [openPDF, setOpenPDF] = useState(false);

  const [isBlocked, setIsBlocked] = useState(initialIsBlocked);

  const handleActivateBooking = (idb) => {
    const data = {
      idb,
      status: 'activate',
    };

    bookingStatusMutation.mutate(data, {
      onSuccess: () => {
        setIsBlocked('activate');
        toast.success('Booking Activated');
        setOpen(null);
      },
    });
  };

  const handleCancelBooking = (idb) => {
    const data = {
      idb,
      status: 'cancelled',
    };

    bookingStatusMutation.mutate(data, {
      onSuccess: () => {
        setIsBlocked('cancelled');
        toast.success('Booking cancelled');
        setOpen(null);
      },
    });
  };

  const [showModal, setShowModal] = useState(false);

  const handleViewMore = () => {
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setKms(event.target.value);
  };

  const handleSubmit = (id) => {
    console.log(id);
    console.log(kms);
    const data = {
      kilometreCovered: kms,
      _id: id,
    };
    addCarKilometers.mutate(data);
  };
  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        {filterOption === 'ungenratedInvoices' && (
          <TableCell>
            <Button
              onClick={() => handleMakeInvoice(id)}
              className="whitespace-nowrap"
              variant="outlined"
            >
              Create Invoice
            </Button>
          </TableCell>
        )}
        <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography className="flex" variant="subtitle2" noWrap>
              <p className="w-10">From</p>
              {fromDate}
            </Typography>
            <Typography className="flex" variant="subtitle2" noWrap>
              <p className="w-10">To</p>
              {toDate}
            </Typography>
          </Stack>
        </TableCell>
        {filterOption === 'completed' && (
          <>
            <TableCell component="th" scope="row" padding="none">
              <Typography className="flex justify-center" variant="subtitle2" noWrap>
                <p>{carSelected.kmBeforeTrip} kms</p>
              </Typography>
            </TableCell>
          </>
        )}

        {filterOption === 'completed' && (
          <>
          
            {!isKilometreUpdated ? (
              <>
                <TableCell component="th" scope="row" padding="none">
                  <Typography className="flex p-2 py-3" variant="subtitle2" noWrap>
                    <TextField
                      type="number"
                      name="l"
                      label="Kms after trip"
                      onChange={handleInputChange}
                    />
                    <Button onClick={() => handleSubmit(id)} variant="contained" color="primary">
                      Submit
                    </Button>{' '}
                  </Typography>
                </TableCell>
               
              </>
            ) : (
              <>
                <TableCell component="th" scope="row" padding="none">
                  <Typography className="flex justify-center" variant="subtitle2" noWrap>
                    <Iconify icon="mdi:sucess-outline" />
                    <p>Kilometers updated</p>
                  </Typography>
                </TableCell>
              </>
            )}
             {invoiceGenerated ? (
                  <TableCell>Invoice generated</TableCell>
                ) : (
                  <TableCell>
                    <Button
                      onClick={() => handleMakeInvoice(id)}
                      className="whitespace-nowrap"
                      variant="outlined"
                    >
                      Create Invoice
                    </Button>
                  </TableCell>
                )}
          </>
        )}

        <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            <div className="flex gap-3 items-center">
              <div>
                <Avatar
                  alt={name}
                  src={
                    customerSelected?.customerImage?.url ? customerSelected?.customerImage?.url : ''
                  }
                />
              </div>
              <div className="flex flex-col">
                <Typography variant="subtitle1" noWrap>
                  {customerSelected?.name}
                </Typography>
                <Typography color="gray" variant="overline" noWrap>
                  {formatPhoneNumber(customerSelected?.contactNumber || 0)}
                </Typography>
                <Typography color=" " variant="subtitle2" noWrap>
                  {customerSelected?.email}
                </Typography>
              </div>
            </div>
            <Typography color="" variant="" noWrap />
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            <div className="flex gap-3 items-center">
              <div>
                <Avatar
                  sx={{ width: 70 }}
                  variant="square"
                  alt={name}
                  src={carSelected?.carImage?.url ? carSelected?.carImage?.url : ''}
                />
              </div>
              <div className="flex flex-col">
                <Typography variant="subtitle1" noWrap>
                  {carSelected?.name}
                </Typography>
                <Typography color="gray" variant="overline" noWrap>
                  {carSelected?.manufacturingCompany}
                </Typography>{' '}
                <Typography color="gray " variant="overline" noWrap>
                  {carSelected?.yearOfManufacturing}
                </Typography>
              </div>
            </div>
            <Typography color="" variant="" noWrap />
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="overline" noWrap>
            {dropPoint}
          </Typography>
        </TableCell>
        
        <TableCell>
          <Typography variant="overline" noWrap>
            {pickupPoint}
          </Typography>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            <div className="flex gap-3 items-center">
              <div className="flex flex-col">
                <Typography color="gray" variant="overline" noWrap>
                  {invoiceGenerated ? '' : 'Advance'}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  {invoiceGenerated ? total : advanceAmount}
                </Typography>
              </div>
            </div>
            <Typography color="" variant="" noWrap />
          </Stack>
        </TableCell>

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        <TableCell>
          <Label color={(isBlocked === 'cancelled' && 'error') || 'success'}>
            {' '}
            {isBlocked === 'cancelled' ? 'Cancelled' : 'Active'}
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
          sx: { width: 180 },
        }}
      >
        {/* <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="ic:round-share" sx={{ mr: 2 }} />
          Share
        </MenuItem> */}
        <MenuItem onClick={handleViewMore}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          view
        </MenuItem>
        {isBlocked === 'cancelled' ? (
          <MenuItem
            onClick={() =>
              CustomModal(
                () => handleActivateBooking(id),
                activateBookingMessages,
                setOpen(null),
                id
              )
            }
          >
            <Iconify icon="fluent-mdl2:activate-orders" sx={{ mr: 2 }} />
            Activate
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() =>
              CustomModal(() => handleCancelBooking(id), cancelBookingMessages, setOpen(null), id)
            }
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="fluent-mdl2:deactivate-orders" sx={{ mr: 2 }} />
            cancel
          </MenuItem>
        )}

        <PDFDownloadLink
          document={
            <AdvancePDF
              costAfterMinimumKm={costAfterMinimumKm}
              minimumKilometer={minimumKilometer}
              fromDate={fromDate}
              totalDuration={totalDuration}
              toDate={toDate}
              pickupCost={pickupCost}
              deliveryCost={deliveryCost}
              pickupPoint={pickupPoint}
              dropPoint={dropPoint}
              costPerDay={costPerDay}
              advanceValue={advanceAmount}
              amntStatus={payment}
              payment={payment}
              formdata={formdata}
              p={formdata}
              invoiceId={invoiceId}
              selectedCustomer={customerSelected}
              taxValue={tax}
              discountValue={discount}
              subtotal={subTotals}
              selectedCar={carSelected}
              grandTotal={total}
              listTotal={total}
              items={invoiceDetails}
              invoice={_invoice}
            />
          }
          fileName={`BOOKING-CONFIRMATION-${customerSelected?.name}`}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <MenuItem onClick={handleCloseMenu}>
              <Iconify icon="eva:download-fill" sx={{ mr: 2 }} />
              Advance Receipt
            </MenuItem>
          )}
        </PDFDownloadLink>
        <PDFDownloadLink
          document={
            <InvoicePDF
              advanceValue={advanceAmount}
              amntStatus={payment}
              payment={payment}
              formdata={formdata}
              p={formdata}
              invoiceId={invoiceId}
              selectedCustomer={customerSelected}
              taxValue={tax}
              discountValue={discount}
              carSelected={carSelected}
              subtotal={subTotals}
              grandTotal={total}
              listTotal={total}
              items={invoiceDetails}
              invoice={_invoice}
            />
          }
          fileName={`INVOICE-${customerSelected?.name}`}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <>
              {invoiceGenerated && (
                <MenuItem onClick={handleCloseMenu}>
                  <Iconify icon="eva:download-fill" sx={{ mr: 2 }} />
                  Invoice
                </MenuItem>
              )}
            </>
          )}
        </PDFDownloadLink>

        {/* <Button
          color="info"
          size="small"
          variant="contained"
          onClick={handleOpenPreview}
          endIcon={<Iconify icon="eva:eye-fill" />}
          sx={{ mx: 1 }}
        >
          Preview
        </Button>
        <Modal open={openPDF} onClose={handleClosePreview} closeAfterTransition>
          <Fade in={openPDF}>
            <ModalContainer>
              <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
                <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                  <AdvancePDF
                    advanceValue={advanceAmount}
                    amntStatus={payment}
                    payment={payment}
                    formdata={formdata}
                    p={formdata}
                    invoiceId={invoiceId}
                    selectedCustomer={customerSelected}
                    taxValue={tax}
                    discountValue={discount}
                    subtotal={subTotals}
                    grandTotal={total}
                    listTotal={total}
                    items={invoiceDetails}
                    invoice={_invoice}
                  />
                </PDFViewer>
              </Box>
            </ModalContainer>
          </Fade>
        </Modal> */}

        <MenuItem onClick={() => handleEditMenu(id)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() =>
            CustomModal(() => handleDeleteBookings(id), deleteBookingMessage, setOpen(null), id)
          }
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <BookingDetailsModal
        open={showModal}
        onClose={() => (setShowModal(false), setOpen(null))}
        userDetails={{
          invoiceId,
          id,
          advanceAmount,
          driver,
          advancePaid,
          fromDate,
          toDate,
          discount,
          tax,
          employee,
          pickupPoint,
          dropPoint,
          carSelected,
          customerSelected,
          subTotals,
          total,
          invoiceDetails,
          handleClick,
          status: initialIsBlocked,
        }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  invoiceId: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  filterOption: PropTypes.string,
  fromDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  pickupPoint: PropTypes.string.isRequired,
  dropPoint: PropTypes.string.isRequired,
  carSelected: PropTypes.object.isRequired,
  employee: PropTypes.object.isRequired,
  customerSelected: PropTypes.object.isRequired,
  subTotals: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  invoiceDetails: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};
