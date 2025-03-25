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
import { useGetEmployeeRevenueById } from 'src/api/employees/Queries';
import { useGetCustomerevenueById } from 'src/api/customers/Queries';
import { fShortenNumber } from 'src/utils/formatNumber';

export default function CustomerDetailsModal({ open, onClose, userDetails }) {
  const navIconsDualtonned = NavIconsDualtonned();
  console.log(userDetails);
  const [showToDates, setShowToDates] = useState(Array(userDetails.bookings.length).fill(false));
  const singleEmployeeRevenueQuery = useGetCustomerevenueById(userDetails?.id);
  // Function to toggle showToDates for a specific index
  const toggleToDate = (index) => {
    const updatedShowToDates = [...showToDates];
    updatedShowToDates[index] = !updatedShowToDates[index];
    setShowToDates(updatedShowToDates);
  };
  return (
    <Container>
      <Dialog maxWidth="lg" fullWidth={true} open={open} onClose={onClose}>
        <DialogTitle className="bg-[#59c5b9] text-white  rounded">
          Customer Detailed view
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Card className="p-3 shadow-xl border border-black border-dotted border-opacity-20">
                <Grid container spacing={3} sx={{ height: { xs: 'auto', md: 180 } }}>
                  <Grid className="flex justify-center items-center" item xs={12} md={3}>
                    <Avatar
                      style={{ width: '110px', height: '110px', cursor: 'pointer' }}
                      src={userDetails?.customerImage}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={5}
                    justify="center"
                    alignItems="center"
                    className="border-r border-dotted text-center md:text-left"
                  >
                    <div className="flex flex-col justify-around h-full">
                      <Typography className="text-2xl " variant="overline">
                        {' '}
                        <span className="text-xl"> {userDetails?.name}</span>
                      </Typography>
                      <Typography className="text-2xl mt-2" variant="overline">
                        Contact: {userDetails?.contactNumber}
                      </Typography>
                      <Typography className="text-lg mt-2" variant="subtitle1">
                        {userDetails?.email}
                      </Typography>
                      <Typography className="text-lg mt-2" variant="subtitle1">
                        Passport :{userDetails?.passportNumber}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} justify="center" alignItems="center">
                    <div className="flex flex-col justify-around h-full">
                      <Typography
                        style={{ letterSpacing: '3px' }}
                        className="text-lg uppercase "
                        variant=""
                      >
                        Address
                      </Typography>
                      <Typography className="text-2xl mt-2" variant="overline">
                        {userDetails?.address}
                      </Typography>
                      <Typography className="text-lg mt-2" variant="subtitle1">
                        {userDetails?.locality}
                      </Typography>
                      <Typography className="text-lg mt-2" variant="subtitle1">
                        {userDetails?.cityOrDistrict}, {userDetails.pincode}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} sx={{ height: { xs: 'auto', md: 180 } }}>
              <Card
                style={{
                  backgroundImage:
                    'url("https://t3.ftcdn.net/jpg/03/22/30/46/240_F_322304683_7ysRarFkmy2osfPKTOYQv7qTPofKelfb.jpg")',
                }}
                className="pt-2 shadow-xl bg-cover"
              >
                <Grid container sx={{ height: 170 }}>
                  <div className="flex flex-col justify-around h-full w-full text-center">
                    <Typography className="text-2xl font-extrabold text-white" variant="overline">
                      <span className="text-xl">Revenue Generated</span>
                    </Typography>
                    <Typography className="text-2xl mt-2 text-white" variant="overline">
                      <span className="text-2xl">
                        ₹ {fShortenNumber(singleEmployeeRevenueQuery?.data || 0)}
                      </span>
                    </Typography>
                  </div>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <div className="mt-5">
            <div>
              <Typography style={{ letterSpacing: '2px' }} className="text-2xl" variant="overline">
                {' '}
                <span className="text-xl">Bookings Made</span>
              </Typography>
              <p className="text-gray-400  mb-1">Total ({userDetails.bookings?.length})</p>
            </div>
          </div>

          <Grid container>
            {userDetails?.bookings?.length > 0 ? (
              <Grid item xs={12} md={12}>
                {userDetails?.bookings?.map((m, index) => (
                  <div key={index}>
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
                            <Typography className="text-xl  text-gray-400" variant="overline">
                              booking no #{index + 1}
                            </Typography>{' '}
                            <div className=" flex justify-center items-center gap-2  rounded-xl">
                              <div className="max-w-[200px] break-words ">
                                <p className="text-gray-500">From</p>
                                <p className="text-xl max-h-[50px] max-w-[150px] overflow-hidden">
                                  {m.pickupPoint}
                                </p>
                              </div>
                              <div className="border-b border-dotted border-[#59c5b9]  flex-1  justify-center h-7">
                                <Box component="span" sx={{ width: 10, height: 10, mr: 1 }}>
                                  {navIconsDualtonned[7]?.icon}
                                </Box>
                              </div>
                              <div className="max-w-[200px] break-words ">
                                <p className="text-gray-500">To</p>
                                <p className="text-xl max-h-[50px] max-w-[150px] overflow-hidden">
                                  {m.dropPoint}
                                </p>
                              </div>
                            </div>
                            <div className=" justify-center items-center">
                              <p className="text-gray-400 mt-5 mb-1">Duration of rent</p>
                              <div className="flex justify-center items-center mt-2">
                                <Typography className="text-xl" variant="overline">
                                  {' '}
                                  <span className="text-lg">[{m.fromDate}] </span>
                                </Typography>
                                <Typography className="text-xl" variant="overline">
                                  {' '}
                                  <span className="text-lg"> - [{m.toDate}]</span>
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
                          <div className="flex flex-col justify-around h-full items-center w-full">
                            <Typography
                              style={{ letterSpacing: '3px' }}
                              className="text-lg uppercase "
                              variant=""
                            >
                              Car selected
                            </Typography>
                            <div className="grid grid-cols-2 gap-5 p-3 w-full">
                              <Typography className="text-2xl mt-2 text-center" variant="overline">
                                {m.carSelected?.name}
                              </Typography>
                              <Typography className="text-2xl mt-2 text-center " variant="overline">
                                {m.carSelected?.manufacturingCompany}
                              </Typography>
                              <Typography className="text-2xl mt-2 text-center" variant="overline">
                                {m.carSelected?.vehicleNumber}
                              </Typography>
                              <Typography className="text-2xl mt-2 text-center" variant="overline">
                                Insurance :
                                <br />
                                {CustomformatDate(m.carSelected?.insurance)}
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
                              Booking made by
                            </Typography>
                            <div className="grid grid-cols-2 gap-5 p-3 w-full">
                              <Typography className="text-2xl mt-2" variant="overline">
                                {m.employee?.name}
                              </Typography>
                              <Typography className="text mt-2" variant="caption">
                                <p className="text-sm" style={{ wordWrap: 'break-word' }}>
                                  {m.employee?.email}
                                </p>
                              </Typography>
                              <Typography className="text-2xl mt-2" variant="overline">
                                role :
                                <br />
                                {m.employee?.role}
                              </Typography>
                              <Typography
                                className="text-2xl mt-2 flex justify-center items-center"
                                variant="overline"
                              >
                                Is blocked :
                                <br />
                                {m.employee?.isBlocked ? 'yes' : 'no'}
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
                            onClick={() => toggleToDate(index)}
                            className="text-2xl mt-2 flex justify-center cursor-pointer items-center h-full"
                            variant="overline"
                          >
                            {showToDates[index] ? 'Show Less' : 'Show More'}
                          </Typography>{' '}
                        </Grid>
                      </Grid>
                      {showToDates[index] && (
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
                                From date : <span className="text-lg">{m.fromDate}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                To date : <span className="text-lg">{m.fromDate}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Total amount : <span className="text-lg">₹{m.total}</span>
                              </Typography>

                              <Typography className="text-2xl" variant="subtitle2">
                                Discount given : <span className="text-lg">₹{m.discount}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Tax : <span className="text-lg">₹{m.tax}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Booking status : <span className="text-lg">{m.status}</span>
                              </Typography>
                            </div>
                          </Grid>
                          <Grid className="px-4 pt-4 pb-3" item xs={12} md={12}>
                            {m.driver && (
                              <>
                                <Typography className="text-lg uppercase mb-5 underline" variant="">
                                  Driver Details
                                </Typography>
                                <br />
                                <div className="mt-4 space-y-3">
                                  <Typography variant="subtitle1 mb-4">
                                    Name: {m?.driver?.driverName}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    Contact-: {m?.driver?.contactNumber}
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
                              {m.invoiceDetails.map((m, index) => (
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
                                <p className="w-[300px] px-2 py-1">₹ {m.subTotals}</p>
                              </div>
                              <div className="flex even:bg-gray-500">
                                <p
                                  style={{ wordWrap: 'break-word' }}
                                  className="w-[300px] border-r px-2 py-1 font-semibold"
                                >
                                  Advance
                                </p>
                                <p className="w-[300px] px-2 py-1">₹ -{m.advanceAmount}</p>
                              </div>
                              <div className="flex bg-gray-400">
                                <p
                                  style={{ wordWrap: 'break-word' }}
                                  className="w-[300px] border-r px-2 py-1 font-semibold"
                                >
                                  Total
                                </p>
                                <p className="w-[300px] px-2 py-1">₹ {m.total}</p>
                              </div>
                            </div>
                          </Grid>
                          {m.isKilometreUpdated && (
                            <Grid className="px-4 pt-2 pb-3 flex gap-2 " item xs={12} md={12}>
                              <Typography Z className="text-lg uppercase mb-5 underline" variant="">
                                Distance covered by car in this trip -
                              </Typography>
                              <Typography Z className="text-lg uppercase mb-5 " variant="">
                                [ {m.kilometreCovered} kms ]
                              </Typography>
                            </Grid>
                          )}
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
                              src={m.carSelected?.carImage?.url}
                            />
                            <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                              <Typography className="text-2xl" variant="subtitle2">
                                Name: <span className="text-lg">{m.carSelected.name}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Vehicle Number :
                                <span className="text-lg">{m.carSelected?.vehicleNumber}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Manufacturing Company :
                                <span className="text-lg">
                                  {m.carSelected.manufacturingCompany}
                                </span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                year Of Manufacturing :{' '}
                                <span className="text-lg">{m.carSelected.yearOfManufacturing}</span>
                              </Typography>

                              <Typography className="text-2xl" variant="subtitle2">
                                Fuel Type <span className="text-lg">{m.carSelected.fuelType}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Transmission :{' '}
                                <span className="text-lg">{m.carSelected.transmission}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Insurance :{' '}
                                <span className="text-lg">
                                  {CustomformatDate(m.carSelected.insurance)}
                                </span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                lastService :{' '}
                                <span className="text-lg">
                                  {CustomformatDate(m.carSelected.lastService)}
                                </span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                serviceInterval :{' '}
                                <span className="text-lg">{m.carSelected.serviceInterval} Kms</span>
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
                              src={m.employee?.employeeImage?.url}
                            />
                            <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                              <Typography className="text-2xl" variant="subtitle2">
                                Name:
                                <span className="text-lg">{m.employee?.name}</span>
                              </Typography>

                              <Typography className="text-2xl" variant="subtitle2">
                                Email :<span className="text-lg">{m.employee?.email}</span>
                              </Typography>

                              <Typography className="text-2xl" variant="subtitle2">
                                username : <span className="text-lg">{m.employee?.userName}</span>
                              </Typography>

                              <Typography className="text-2xl" variant="subtitle2">
                                Role : <span className="text-lg">{m.employee?.role}</span>
                              </Typography>
                              <Typography className="text-2xl" variant="subtitle2">
                                Blocked :{' '}
                                <span className="text-lg">
                                  {m.employee?.isBlocked ? 'yes' : 'no'}
                                </span>
                              </Typography>
                              <Typography className="text-2xl " variant="subtitle2">
                                Access Given :
                                {m.employee?.access?.map((m) => (
                                  <span className="text-md border-r pr-1 pl-1">{m.title}</span>
                                ))}
                              </Typography>
                            </div>
                          </Grid>

                          <Typography
                            onClick={() => toggleToDate(index)}
                            className="text-xl flex gap-2 cursor-pointer pt-4 justify-center items-center w-full  text-gray-400"
                            variant="overline"
                          >
                            <span>end-booking no #{index + 1}</span>
                            <span>{showToDates[index] ? 'Show Less' : 'Show More'}</span>
                          </Typography>
                        </>
                      )}
                    </Card>
                  </div>
                ))}
              </Grid>
            ) : (
              <Card className="p-3 shadow-xl border border-black border-dotted border-opacity-20 mb-4">
                No bookings found
              </Card>
            )}
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

CustomerDetailsModal.propTypes = {
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
