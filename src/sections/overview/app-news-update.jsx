/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import {
  Grid,
  Avatar,
  Dialog,
  Container,
  IconButton,
  DialogTitle,
  DialogContent,
  Input,
  TextField,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { toBookingInvoice, toBookingList } from 'src/paths/ShowMeTheWayFrontend';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import { CustomformatDate } from 'src/components/format-changer/FormatChnager';
import { RHFTextField } from 'src/components/hook-form';
import { useAddCarKilometers } from 'src/api/bookings/Mutations';
import EditId from 'src/zustand/EditId';

// ----------------------------------------------------------------------

export default function AppNewsUpdate({ title, subheader, api, list, ...other }) {
  const router = useRouter();
  console.log(list);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={2} sx={{ p: 3, pr: 0 }}>
          {list.length > 0 ? (
            <>
              {list?.slice(0, 4).map((news) => (
                <NewsItem key={news._id} news={news} api={api} />
              ))}
            </>
          ) : (
            <Card className="p-3 shadow-xl min-h-20 text-lg  flex justify-center items-center border border-black border-dotted border-opacity-20 mb-4">
              No Upcoming bookings found
            </Card>
          )}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          onClick={() => router.push(toBookingList)}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function NewsItem({ news, api }) {
  const addCarsKilometers = useAddCarKilometers();
  const router = useRouter();
  console.log(news);
  console.log(api);
  const {
    image,
    title,
    _id,
    isKilometreUpdated,
    vehicleNumber,
    description,
    postedAt,
    subTotals,
    driver,
    advanceAmount,
    invoiceGenerated,
    invoiceDetails,
    employee,
    pickupPoint,
    timeLeft,
    dropPoint,
    fromDate,
    toDate,
    carSelected,
    customerSelected,
    total,
    discount,
    tax,
    status,
  } = news;
  const navIconsDualtonned = NavIconsDualtonned();
  const [openModal, setOpenModal] = useState(false);
  const [kms, setKms] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [showToDates, setShowToDates] = useState(false);

  // Function to toggle showToDates for a specific index
  const toggleToDate = () => {
    setShowToDates(!showToDates);
  };
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setKms(event.target.value);
  };

  const [isKilometersUpdated, setIsKilometersUpdated] = useState({});

  // Function to handle form submission for updating kilometers
  const handleSubmit = (id) => {
    const data = {
      kilometreCovered: kms,
      _id: id,
    };
    // Call the mutation function with the updated kilometers
    addCarsKilometers.mutate(data);
    // Update the local state to indicate that kilometers have been updated for this item
    setIsKilometersUpdated({ ...isKilometersUpdated, [news._id]: true });
  };
  const handleMakeInvoice = (ids) => {
    EditId.setState({ id: ids });
    console.log(ids);
    router.push(toBookingInvoice);
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        className="border-b pb-1 border-dotted"
        spacing={3}
      >
        <Typography
          onClick={handleOpenModal}
          className="flex  cursor-pointer p-3 justify-center items-center text-xl"
          variant="caption"
          sx={{ pr: 3, color: 'text.secondary', minWidth: 100 }}
        >
          <Iconify color="#59c5b9" icon="fa:eye" width="96" height="96" />
        </Typography>
        <div className="flex flex-col  ">
          <div className=" flex justify-center items-center gap-2  rounded-xl">
            <div className="break-words ">
              <Typography
                noWrap
                className="text-xl max-w-[180px] flex justify-center items-center min-w-[150px] overflow-hidden"
              >
                {pickupPoint}
              </Typography>
              <Typography
                noWrap
                className="text-xl max-w-[180px] flex justify-center items-center min-w-[150px] overflow-hidden"
              >
                {fromDate}
              </Typography>
            </div>
            <div className="border-b border-dotted border-[#59c5b9] max-w-[180px] min-w-[150px]   flex-1   justify-center h-7">
              <Box
                className="flex justify-center items-center w-full mx-auto"
                component="img"
                alt={title}
                src={carSelected.carImage?.url}
                sx={{ width: 80, height: 48, marginTop: -2, borderRadius: 1.5, flexShrink: 0 }}
              />
            </div>
            <div className="break-words ">
              <Typography
                noWrap
                className="text-xl max-w-[180px] flex justify-center items-center min-w-[150px] overflow-hidden"
              >
                {dropPoint}
              </Typography>
              <Typography
                noWrap
                className="text-xl max-w-[180px] flex justify-center items-center min-w-[150px] overflow-hidden"
              >
                {toDate}
              </Typography>
            </div>
          </div>
        </div>

        {/* <Box className="flex justify-center" sx={{ minWidth: 100, flexGrow: 1 }}> */}

        <Box className="flex justify-center" sx={{ minWidth: 180 }}>
          <div className="flex gap-2 items-center">
            <Avatar src={customerSelected.customerImage?.url} />

            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 180 }} noWrap>
              {customerSelected.name}
            </Typography>
          </div>
        </Box>

        {api === 'getCarsWithUnupdatedKms' ? (
          <>
            {isKilometersUpdated[news._id] ? (
              <Typography className="flex justify-center" variant="subtitle2" noWrap>
                <Iconify icon="mdi:sucess-outline" />
                <p>Kilometers updated</p>
              </Typography>
            ) : (
              <div className="flex flex-col">
                <div className="-mb-2">
                  <p>Previous kilometer :{carSelected.totalKmCovered}</p>
                </div>
                <div>
                  <Typography className="flex  p-2 py-3" variant="subtitle2" noWrap>
                    <TextField
                      type="number"
                      name="kms"
                      label="Kms after trip"
                      onChange={handleInputChange}
                    />
                    <Button onClick={() => handleSubmit(_id)} variant="contained" color="primary">
                      Submit
                    </Button>
                  </Typography>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <Typography
              className="flex justify-center items-center gap-2"
              variant="caption"
              sx={{ color: 'text.secondary', flexGrow: 1 }}
            >
              {invoiceGenerated ? (
                <Typography
                  className="flex justify-center whitespace-nowrap items-center gap-2"
                  variant="caption"
                  sx={{ pr: 3, color: 'text.secondary', flexGrow: 1 }}
                >
                  <div className="text-lg">
                    <Iconify color="#59c5b9" icon="hugeicons:tick-04" width="96" height="96" />
                  </div>
                  Invoice Generated
                </Typography>
              ) : (
                <Button
                  onClick={() => handleMakeInvoice(_id)}
                  className="whitespace-nowrap"
                  variant="outlined"
                >
                  Generate Invoice
                </Button>
              )}
            </Typography>
            {!api === 'bookinginvoice2d' && (
              <Typography
                className="flex justify-center items-center gap-2"
                variant="caption"
                sx={{ pr: 3, color: 'text.secondary', flexGrow: 1 }}
              >
                <div className="text-lg">
                  <Iconify color="#59c5b9" icon="carbon:time" width="96" height="96" />
                </div>
                {timeLeft} left
              </Typography>
            )}
          </>
        )}
      </Stack>
      <Container>
        <Dialog maxWidth="lg" fullWidth open={openModal} onClose={handleCloseModal}>
          <DialogTitle className="bg-[#59c5b9] text-white  rounded">
            Booking Detailed view
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
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
                              <p className="text-gray-500">From</p>
                              <p className="text-xl max-h-[50px] max-w-[150px] overflow-hidden">
                                {pickupPoint}
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
                                {dropPoint}
                              </p>
                            </div>
                          </div>
                          <div className=" justify-center items-center">
                            <p className="text-gray-400 mt-5 mb-1">Duration of rent</p>
                            <div className="flex justify-center items-center mt-2">
                              <Typography className="text-xl" variant="overline">
                                {' '}
                                <span className="text-lg">[{fromDate}] </span>
                              </Typography>
                              <Typography className="text-xl" variant="overline">
                                {' '}
                                <span className="text-lg"> - [{toDate}]</span>
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
                              {carSelected?.name}
                            </Typography>
                            <Typography className="text-2xl mt-2 text-center " variant="overline">
                              {carSelected?.manufacturingCompany}
                            </Typography>
                            <Typography className="text-2xl mt-2 text-center" variant="overline">
                              {carSelected?.vehicleNumber}
                            </Typography>
                            <Typography className="text-2xl mt-2 text-center" variant="overline">
                              Insurance :
                              <br />
                              {CustomformatDate(carSelected?.insurance)}
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
                              {customerSelected?.name}
                            </Typography>
                            <Typography className="text mt-2" variant="caption">
                              <p
                                className="text-sm"
                                style={{ maxWidth: '130px', wordWrap: 'break-word' }}
                              >
                                {customerSelected?.email}
                              </p>
                            </Typography>
                            <Typography className="text-2xl mt-2" variant="overline">
                              pincode :
                              <br />
                              {customerSelected?.pincode}
                            </Typography>
                            <Typography
                              className="text-2xl mt-2 flex justify-center items-center"
                              variant="overline"
                            >
                              {customerSelected?.contactNumber}
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
                              From date : <span className="text-lg">{fromDate}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              To date : <span className="text-lg">{fromDate}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Total amount : <span className="text-lg">₹{total}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Discount given : <span className="text-lg">₹{discount}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Tax : <span className="text-lg">₹{tax}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Booking status : <span className="text-lg">{status}</span>
                            </Typography>
                          </div>
                        </Grid>
                        <Grid className="px-4 pt-4 pb-3" item xs={12} md={12}>
                            {driver && (
                              <>
                                <Typography className="text-lg uppercase mb-5 underline" variant="">
                                  Driver Details
                                </Typography>
                                <br />
                                <div className="mt-4 space-y-3">
                                  <Typography variant="subtitle1 mb-4">
                                    Name: {driver?.driverName}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    Contact-: {driver?.contactNumber}
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
                              {invoiceDetails.map((m, index) => (
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
                                <p className="w-[300px] px-2 py-1">₹ {subTotals}</p>
                              </div>
                              <div className="flex even:bg-gray-500">
                                <p
                                  style={{ wordWrap: 'break-word' }}
                                  className="w-[300px] border-r px-2 py-1 font-semibold"
                                >
                                  Advance
                                </p>
                                <p className="w-[300px] px-2 py-1">₹ -{advanceAmount}</p>
                              </div>
                              <div className="flex bg-gray-400">
                                <p
                                  style={{ wordWrap: 'break-word' }}
                                  className="w-[300px] border-r px-2 py-1 font-semibold"
                                >
                                  Total
                                </p>
                                <p className="w-[300px] px-2 py-1">₹ {total}</p>
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
                            src={carSelected?.carImage?.url}
                          />
                          <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                            <Typography className="text-2xl" variant="subtitle2">
                              Name: <span className="text-lg">{carSelected.name}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Manufacturing Company :
                              <span className="text-lg">{carSelected.manufacturingCompany}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              year Of Manufacturing :{' '}
                              <span className="text-lg">{carSelected?.yearOfManufacturing}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Fuel Type <span className="text-lg">{carSelected?.fuelType}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Transmission :{' '}
                              <span className="text-lg">{carSelected.transmission}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Insurance : <span className="text-lg">{carSelected?.insurance}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              lastService :{' '}
                              <span className="text-lg">{carSelected?.lastService}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              serviceInterval :{' '}
                              <span className="text-lg">{carSelected.serviceInterval}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Car deleted :
                              <span className="text-lg">
                                {carSelected?.isDeleted ? 'YES' : 'NO'}
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
                            src={customerSelected?.customerImage?.url}
                          />
                          <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                            <Typography className="text-2xl" variant="subtitle2">
                              Name: <span className="text-lg">{customerSelected.name}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Contact Number :{' '}
                              <span className="text-lg">{customerSelected.contactNumber}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Email : <span className="text-lg">{customerSelected.email}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Passport Number :{' '}
                              <span className="text-lg">{customerSelected.passportNumber}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Pincode : <span className="text-lg">{customerSelected.pincode}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              State : <span className="text-lg">{customerSelected.state}</span>
                            </Typography>
                            <Typography
                              style={{ maxWidth: 'full', wordWrap: 'break-word' }}
                              className="text-2xl"
                              variant="subtitle2"
                            >
                              Address : <span className="text-lg">{customerSelected.address}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Locality :{' '}
                              <span className="text-lg">{customerSelected.locality}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              City/District :{' '}
                              <span className="text-lg">{customerSelected.cityOrDistrict}</span>
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
                            src={employee?.employeeImage?.url}
                          />
                          <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                            <Typography className="text-2xl" variant="subtitle2">
                              Name:
                              <span className="text-lg">{employee?.name}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Email :<span className="text-lg">{employee?.email}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              username : <span className="text-lg">{employee?.userName}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Role : <span className="text-lg">{employee?.role}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Blocked :{' '}
                              <span className="text-lg">{employee?.isBlocked ? 'yes' : 'no'}</span>
                            </Typography>
                            <Typography className="text-2xl " variant="subtitle2">
                              Access Given :
                              {employee?.access?.map((m) => (
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
              <Button color="secondary" />
            </div>
            <div>
              <Button color="primary" />

              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
            </div>
          </div>
        </Dialog>
      </Container>
    </>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
  }),
};
