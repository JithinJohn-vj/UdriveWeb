/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Card, IconButton, Typography, Container, Grid, Avatar } from '@mui/material';
import Iconify from 'src/components/iconify';
import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import { CustomformatDate } from 'src/components/format-changer/FormatChnager';

export default function BookingDetailsModal({ open, onClose, userDetails }) {
  const navIconsDualtonned = NavIconsDualtonned();
  console.log(userDetails);
  const [showToDates, setShowToDates] = useState(false);

  // Function to toggle showToDates for a specific index
  const toggleToDate = () => {
    setShowToDates(!showToDates);
  };
  return (
    <Container>
      <Dialog maxWidth="lg" fullWidth={true} open={open} onClose={onClose}>
        <DialogTitle className="bg-[#59c5b9] text-white  rounded">
          Booking Detailed view
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 5,
            color: 'white',
          }}
        >
          <Iconify icon="fa:close" width="96" height="96" />
        </IconButton>
        <DialogContent className="">
          <Grid container>
            <Grid item xs={12} md={12}>
              <div>
                <Card className="p-3 shadow-xl border border-black border-dotted border-opacity-20 mb-4">
                  <Grid container sx={{ height: { xs: 'auto', md: 180 } }}>
                    <Grid
                      item
                      xs={12}
                      md={5}
                      justify="center"
                      alignItems="center"
                      className="border-r border-dotted text-center px-4 md:text-left"
                    >
                      <div className="flex flex-col mt-3">
                        <div className=" flex justify-center items-center gap-2  rounded-xl">
                          <div className="max-w-[200px] break-words ">
                            <p className="text-gray-500">Delivery</p>
                            <p className="text-xl max-h-[50px] max-w-[150px] overflow-hidden">
                              {userDetails.dropPoint}

                            </p>
                          </div>
                          <div className="border-b border-dotted border-[#59c5b9]  flex-1  justify-center h-7">
                            <Box component="span" sx={{ width: 10, height: 10, mr: 1 }}>
                              {navIconsDualtonned[7]?.icon}
                            </Box>
                          </div>
                          <div className="max-w-[200px] break-words ">
                            <p className="text-gray-500"> Pickup</p>
                            <p className="text-xl max-h-[50px] max-w-[150px] overflow-hidden">
                            {userDetails.pickupPoint}
                            </p>
                          </div>
                        </div>
                        <div className=" justify-center items-center">
                          <p className="text-gray-400 mt-5 mb-1">Duration of rent</p>
                          <div className="flex justify-center items-center mt-2">
                            <Typography className="text-xl" variant="overline">
                              {' '}
                              <span className="text-lg">[{userDetails.fromDate}] </span>
                            </Typography>
                            <Typography className="text-xl" variant="overline">
                              {' '}
                              <span className="text-lg"> - [{userDetails.toDate}]</span>
                            </Typography>{' '}
                          </div>
                        </div>{' '}
                      </div>
                    </Grid>
                    <Grid
                      className="border-r border-dotted text-center md:text-left"
                      item
                      xs={12}
                      md={3}
                      justify="center"
                      alignItems="center"
                    >
                      <div className="flex flex-col justify-around h-full items-center">
                        <Typography
                          style={{ letterSpacing: '3px' }}
                          className="text-lg uppercase "
                          variant=""
                        >
                          Car selected
                        </Typography>
                        <div className="grid grid-cols-2 gap-5 p-3 w-full">
                          <Typography className="text-2xl mt-2 text-center" variant="overline">
                            {userDetails.carSelected?.name}
                          </Typography>
                          <Typography className="text-2xl mt-2 text-center " variant="overline">
                            {userDetails.carSelected?.manufacturingCompany}
                          </Typography>
                          <Typography className="text-2xl mt-2 text-center" variant="overline">
                            {userDetails.carSelected?.vehicleNumber}
                          </Typography>
                          <Typography className="text-2xl mt-2 text-center" variant="overline">
                            Insurance :
                            <br />
                            {CustomformatDate(userDetails.carSelected?.insurance)}
                          </Typography>
                        </div>
                      </div>{' '}
                    </Grid>
                    <Grid
                      className="border-r border-dotted text-center md:text-left"
                      item
                      xs={12}
                      md={3}
                      justify="center"
                      alignItems="center"
                    >
                      <div className="flex flex-col justify-around h-full items-center">
                        <Typography
                          style={{ letterSpacing: '3px' }}
                          className="text-lg uppercase "
                          variant=""
                        >
                          customer selected
                        </Typography>
                        <div className="grid grid-cols-2 gap-5 p-3 w-full">
                          <Typography className="text-2xl mt-2" variant="overline">
                            {userDetails.customerSelected?.name}
                          </Typography>
                          <Typography className="text mt-2" variant="caption">
                            <p
                              className="text-sm"
                              style={{ maxWidth: '130px', wordWrap: 'break-word' }}
                            >
                              {userDetails.customerSelected?.email}
                            </p>
                          </Typography>
                          {/* <Typography className="text-2xl mt-2" variant="overline">
                            pincode :
                            <br />
                            {userDetails.customerSelected?.pincode}
                          </Typography> */}
                          <Typography
                            className="text-2xl mt-2 flex justify-center items-center"
                            variant="overline"
                          >
                            {userDetails.customerSelected?.contactNumber}
                          </Typography>
                        </div>
                      </div>{' '}
                    </Grid>
                    <Grid
                      minHeight={40}
                      borderRadius={1}
                      bgcolor="#59c5b9"
                      item
                      xs={12}
                      md={1}
                      justify="center"
                      alignItems="center"
                    >
                      <Typography
                        onClick={() => toggleToDate()}
                        className="text-2xl mt-2 flex justify-center cursor-pointer items-center h-full"
                        variant="overline"
                      >
                        {showToDates ? 'Show Less' : 'Show More'}
                      </Typography>{' '}
                    </Grid>
                  </Grid>
                  {showToDates && (
                    <>
                      <Grid
                        className="px-4 pt-2 border-t border-dotted border-gray-400"
                        item
                        xs={12}
                        md={12}
                      >
                        <Typography
                          style={{ letterSpacing: '3px' }}
                          className="text-lg uppercase mb-5 "
                          variant=""
                        >
                          Booking details
                        </Typography>
                        <div className="grid md:grid-cols-3 mt-2 space-y-2">
                          <Typography className="text-2xl" variant="subtitle2">
                            From date : <span className="text-lg">{userDetails.fromDate}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            To date : <span className="text-lg">{userDetails.toDate}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Total amount : <span className="text-lg">₹{userDetails.total}</span>
                          </Typography>

                          <Typography className="text-2xl" variant="subtitle2">
                            Discount given :{' '}
                            <span className="text-lg">₹{userDetails.discount}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Tax : <span className="text-lg">₹{userDetails.tax}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Booking status : <span className="text-lg">{userDetails.status}</span>
                          </Typography>
                        </div>
                      </Grid>
                      <Grid className="px-4 pt-4 pb-3" item xs={12} md={12}>
                        {userDetails.driver && (
                          <>
                            <Typography className="text-lg uppercase mb-5 underline" variant="">
                              Driver Details
                            </Typography>
                            <br />
                            <div className="mt-4 space-y-3">
                              <Typography variant="subtitle1 mb-4">
                                Name: {userDetails?.driver?.driverName}
                              </Typography>
                              <Typography variant="subtitle1">
                                Contact-: {userDetails?.driver?.contactNumber}
                              </Typography>
                            </div>
                          </>
                        )}
                      </Grid>

                      <Grid className="px-4 pt-2 pb-3" item xs={12} md={12}>
                        <Typography className="text-lg uppercase mb-5 underline" variant="">
                          Invoice items
                        </Typography>
                        <div className="flex flex-col border">
                          <div className="flex bg-gray-400">
                            <p className="w-[300px] border-r px-2 py-1 font-semibold">Item</p>
                            <p className="w-[300px] px-2 py-1 font-semibold">Amount</p>
                          </div>
                          {userDetails.invoiceDetails.map((m, index) => (
                            <div className="flex even:bg-gray-500" key={index}>
                              <p
                                style={{ wordWrap: 'break-word' }}
                                className="w-[300px] border-r px-2 py-1"
                              >
                                {m.name}
                              </p>
                              <p className="w-[300px] px-2 py-1">₹ {m.amount}</p>
                            </div>
                          ))}
                          <div className="flex bg-gray-500">
                            <p
                              style={{ wordWrap: 'break-word' }}
                              className="w-[300px] border-r px-2 py-1 font-semibold"
                            >
                              Subtotal
                            </p>
                            <p className="w-[300px] px-2 py-1">₹ {userDetails.subTotals}</p>
                          </div>
                          <div className="flex even:bg-gray-500">
                            <p
                              style={{ wordWrap: 'break-word' }}
                              className="w-[300px] border-r px-2 py-1 font-semibold"
                            >
                              Advance
                            </p>
                            <p className="w-[300px] px-2 py-1">₹ -{userDetails.advanceAmount}</p>
                          </div>
                          <div className="flex bg-gray-400">
                            <p
                              style={{ wordWrap: 'break-word' }}
                              className="w-[300px] border-r px-2 py-1 font-semibold"
                            >
                              Total
                            </p>
                            <p className="w-[300px] px-2 py-1">₹ {userDetails.total}</p>
                          </div>
                        </div>
                      </Grid>

                      <Grid
                        className="px-4 pt-2 border-t border-dotted border-gray-400"
                        item
                        xs={12}
                        md={12}
                      >
                        <Typography
                          style={{ letterSpacing: '3px' }}
                          className="text-lg uppercase mb-5 "
                          variant=""
                        >
                          Car details
                        </Typography>
                        <Avatar
                          variant="square"
                          className="md:mx-auto"
                          style={{ width: '300px', height: '150px', cursor: 'pointer' }}
                          src={userDetails.carSelected?.carImage?.url}
                        />
                        <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                          <Typography className="text-2xl" variant="subtitle2">
                            Name: <span className="text-lg">{userDetails.carSelected.name}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Vehicle Number :
                            <span className="text-lg">
                              {userDetails.carSelected?.vehicleNumber}
                            </span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Manufacturing Company :
                            <span className="text-lg">
                              {userDetails.carSelected.manufacturingCompany}
                            </span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            year Of Manufacturing :{' '}
                            <span className="text-lg">
                              {userDetails.carSelected?.yearOfManufacturing}
                            </span>
                          </Typography>

                          <Typography className="text-2xl" variant="subtitle2">
                            Fuel Type{' '}
                            <span className="text-lg">{userDetails.carSelected?.fuelType}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Transmission :{' '}
                            <span className="text-lg">{userDetails.carSelected.transmission}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Insurance :{' '}
                            <span className="text-lg">
                              {CustomformatDate(userDetails.carSelected?.insurance)}
                            </span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            lastService :{' '}
                            <span className="text-lg">
                              {CustomformatDate(userDetails.carSelected?.lastService)}
                            </span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            serviceInterval :{' '}
                            <span className="text-lg">
                              {userDetails.carSelected.serviceInterval} Kms
                            </span>
                          </Typography>
                        </div>
                      </Grid>
                      <Grid
                        className="px-4 pt-2 border-t border-dotted border-gray-400"
                        item
                        xs={12}
                        md={12}
                      >
                        <Typography
                          style={{ letterSpacing: '3px' }}
                          className="text-lg uppercase mb-5 "
                          variant=""
                        >
                          Customer details
                        </Typography>

                        <Avatar
                          className="md:mx-auto"
                          style={{ width: '110px', height: '110px', cursor: 'pointer' }}
                          src={userDetails?.customerSelected?.customerImage?.url}
                        />
                        <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                          <Typography className="text-2xl" variant="subtitle2">
                            Name:{' '}
                            <span className="text-lg">{userDetails.customerSelected.name}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Contact Number :{' '}
                            <span className="text-lg">
                              {userDetails.customerSelected.contactNumber}
                            </span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Email :{' '}
                            <span className="text-lg">{userDetails.customerSelected.email}</span>
                          </Typography>
{/* 
                          <Typography className="text-2xl" variant="subtitle2">
                            Passport Number :{' '}
                            <span className="text-lg">
                              {userDetails.customerSelected.passportNumber}
                            </span>
                          </Typography> */}
                          {/* <Typography className="text-2xl" variant="subtitle2">
                            Pincode :{' '}
                            <span className="text-lg">{userDetails.customerSelected.pincode}</span>
                          </Typography> */}
                          <Typography className="text-2xl" variant="subtitle2">
                            State :{' '}
                            <span className="text-lg">{userDetails.customerSelected.state}</span>
                          </Typography>
                          {/* <Typography
                            style={{ maxWidth: 'full', wordWrap: 'break-word' }}
                            className="text-2xl"
                            variant="subtitle2"
                          >
                            Address :{' '}
                            <span className="text-lg">{userDetails.customerSelected.address}</span>
                          </Typography> */}
                          <Typography className="text-2xl" variant="subtitle2">
                            Locality :{' '}
                            <span className="text-lg">{userDetails.customerSelected.locality}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            City/District :{' '}
                            <span className="text-lg">
                              {userDetails.customerSelected.cityOrDistrict}
                            </span>
                          </Typography>
                        </div>
                      </Grid>
                      <Grid
                        className="px-4 pt-2 border-t border-dotted border-gray-400"
                        item
                        xs={12}
                        md={12}
                      >
                        <Typography
                          style={{ letterSpacing: '3px' }}
                          className="text-lg uppercase mb-5 "
                          variant=""
                        >
                          Booking made By details
                        </Typography>

                        <Avatar
                          className="md:mx-auto"
                          style={{ width: '110px', height: '110px', cursor: 'pointer' }}
                          src={userDetails.employee?.employeeImage?.url}
                        />
                        <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                          <Typography className="text-2xl" variant="subtitle2">
                            Name:
                            <span className="text-lg">{userDetails.employee?.name}</span>
                          </Typography>

                          <Typography className="text-2xl" variant="subtitle2">
                            Email :<span className="text-lg">{userDetails.employee?.email}</span>
                          </Typography>

                          <Typography className="text-2xl" variant="subtitle2">
                            username :{' '}
                            <span className="text-lg">{userDetails.employee?.userName}</span>
                          </Typography>

                          <Typography className="text-2xl" variant="subtitle2">
                            Role : <span className="text-lg">{userDetails.employee?.role}</span>
                          </Typography>
                          <Typography className="text-2xl" variant="subtitle2">
                            Blocked :{' '}
                            <span className="text-lg">
                              {userDetails.employee?.isBlocked ? 'yes' : 'no'}
                            </span>
                          </Typography>
                          <Typography className="text-2xl " variant="subtitle2">
                            Access Given :
                            {userDetails.employee?.access?.map((m) => (
                              <span className="text-md border-r pr-1 pl-1">{m.title}</span>
                            ))}
                          </Typography>
                        </div>
                      </Grid>

                      <Typography
                        onClick={() => toggleToDate()}
                        className="text-xl flex gap-2 cursor-pointer pt-4 justify-center items-center w-full  text-gray-400"
                        variant="overline"
                      >
                        <span>end-booking no #</span>
                        <span>{showToDates ? 'Show Less' : 'Show More'}</span>
                      </Typography>
                    </>
                  )}
                </Card>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <div className="flex justify-between p-5 px-7">
          <div>
            <Button color="secondary"></Button>
          </div>
          <div>
            <Button color="primary"></Button>

            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </Container>
  );
}

BookingDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bookings: PropTypes.array.isRequired,
    employeeImage: PropTypes.string,
    access: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
