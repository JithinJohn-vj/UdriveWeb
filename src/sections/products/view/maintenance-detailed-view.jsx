// ----------------------------------------------------------------------
/* eslint-disable */

import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Field, Formik, FieldArray } from 'formik';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Dialog,
  Avatar,
  TextField,
  Container,
  Typography,
  IconButton,
  DialogTitle,
  Breadcrumbs,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { fShortenNumber } from 'src/utils/formatNumber';

import { useGetCarssById } from 'src/api/cars/Queries';
import { useAddServiceDetails, useDeleteServiceDetails } from 'src/api/cars/Mutations';

import Iconify from 'src/components/iconify';
import CustomModal from 'src/components/custom-made/CustomModal';
import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import { CustomformatDate } from 'src/components/format-changer/FormatChnager';
import { deleteServiceMessage } from 'src/components/messages/CustomModalMessages';

const validationSchema = Yup.object({
  serviceDoneAt: Yup.string().required('kilometers is required'),
  date: Yup.date().required('Date is required').nullable(),
  description: Yup.string().required('Description is required'),
  worksDone: Yup.array().of(
    Yup.object({
      description: Yup.string().required('Description is required'),
      amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
    })
  ),
});

export default function MaintenanceDetailedView({ editId }) {
  const addServiceMutation = useAddServiceDetails();
  const [carData, setCarData] = useState(null); // State to store car data
  const [open, setOpen] = useState(false);
  const deleteServiceDetailed = useDeleteServiceDetails();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values, id) => {
    console.log(values);
    const data = {
      ...values,
      _id: editId,
    };
    addServiceMutation.mutate(data, {
      onSuccess: () => {
        singleCarQuery.refetch().then((response) => {
          setCarData(response.data);
        });
        handleClose();
      },
    });
    console.log(data);
  };

  const singleCarQuery = useGetCarssById(editId);

  useEffect(() => {
    if (singleCarQuery.data) {
      setCarData(singleCarQuery.data);
    }
  }, [singleCarQuery.data]);

  console.log(singleCarQuery);
  console.log(carData);
  const navIconsDualtonned = NavIconsDualtonned();
  const [showBookings, setShowBookings] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const [showToDates, setShowToDates] = useState(
    Array(singleCarQuery?.data?.bookings.length).fill(false)
  );

  // Function to toggle showToDates for a specific index
  const toggleToDate = (index) => {
    const updatedShowToDates = [...showToDates];
    updatedShowToDates[index] = !updatedShowToDates[index];
    setShowToDates(updatedShowToDates);
  };

  const handleDeleteServices = (id) => {
    const data = {
      carid: carData._id,
      serviceId: id,
    };
    deleteServiceDetailed.mutate(data, {
      onSuccess: () => {
        singleCarQuery.refetch().then((response) => {
          setCarData(response.data);
        });
      },
    });
    console.log(data);
  };
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box>
            <Typography variant="h4">Cars Maintenance</Typography>
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Typography
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                >
                  <Box component="span" sx={{ width: 17, height: 17, mr: 1 }}>
                    {navIconsDualtonned[3]?.icon}{' '}
                  </Box>
                  Cars{' '}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                  <Box component="span" sx={{ width: 17, height: 17, mr: 1 }}>
                    {navIconsDualtonned[3]?.submenu[2]?.icon}{' '}
                  </Box>
                  Maintenance{' '}
                </Typography>
              </Breadcrumbs>
            </div>
          </Box>
          <Link>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickOpen}
            >
              Service create
            </Button>
          </Link>
        </Stack>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                serviceDoneAt: '',
                date: dayjs().toDate(),
                description: '',
                worksDone: [{ description: '', amount: '' }],
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, setFieldValue }) => (
                <Form>
                  <Field name="serviceDoneAt">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Car current kilometer"
                        fullWidth
                        type="number"
                        margin="normal"
                        error={touched.serviceDoneAt && Boolean(errors.serviceDoneAt)}
                        helperText={touched.serviceDoneAt && errors.serviceDoneAt}
                      />
                    )}
                  </Field>
                  <div className="mt-5" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Field name="date">
                      {({ field }) => (
                        <DatePicker
                          format="DD-MM-YYYY"
                          {...field}
                          slotProps={{
                            textField: { fullWidth: true },

                            openPickerButton: {
                              color: 'primary',
                            },
                            inputAdornment: {
                              position: 'start',
                            },
                          }}
                          label="Select Date of service"
                          value={dayjs(field.value)}
                          onChange={(value) => setFieldValue('date', value ? value.toDate() : null)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              margin="normal"
                              error={touched.date && Boolean(errors.date)}
                              helperText={touched.date && errors.date}
                            />
                          )}
                        />
                      )}
                    </Field>
                  </LocalizationProvider>

                  <FieldArray name="worksDone">
                    {({ push, remove, form }) => (
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '10px',
                            padding: '5px',
                          }}
                        >
                          <Typography variant="h4">Works Done</Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            // startIcon={<Add />}
                            onClick={() => push({ description: '', amount: '' })}
                          >
                            Add Work
                          </Button>
                        </div>
                        {form.values.worksDone.map((work, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '-15px',
                            }}
                          >
                            <Field name={`worksDone.${index}.description`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  label={`Work Description `}
                                  fullWidth
                                  margin="normal"
                                  error={
                                    touched.worksDone?.[index]?.description &&
                                    Boolean(errors.worksDone?.[index]?.description)
                                  }
                                  helperText={
                                    touched.worksDone?.[index]?.description &&
                                    errors.worksDone?.[index]?.description
                                  }
                                />
                              )}
                            </Field>
                            <Field name={`worksDone.${index}.amount`}>
                              {({ field }) => (
                                <TextField
                                  {...field}
                                  label="Amount"
                                  fullWidth
                                  margin="normal"
                                  type="number"
                                  error={
                                    touched.worksDone?.[index]?.amount &&
                                    Boolean(errors.worksDone?.[index]?.amount)
                                  }
                                  helperText={
                                    touched.worksDone?.[index]?.amount &&
                                    errors.worksDone?.[index]?.amount
                                  }
                                  style={{ marginLeft: '10px' }}
                                />
                              )}
                            </Field>
                            <IconButton
                              aria-label="remove"
                              color="secondary"
                              onClick={() => remove(index)}
                            >
                              <Iconify
                                icon="material-symbols:delete-outline"
                                sx={{
                                  ml: 1,
                                  width: 20,
                                  height: 20,
                                  color: 'text.disabled',
                                }}
                              />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                  <div className="mt-3" />
                  <Field name="description">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                      />
                    )}
                  </Field>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </Container>
      <Container>
        <div>
          {carData ? (
            <>
              <div>
                <div className="lg:grid lg:grid-cols-3">
                  <img
                    className="w-full  rounded-3xl h-[200px] md:h-[300px] lg:h-[420px] md:col-span-2 "
                    src={carData?.carImage?.url}
                    alt="fe"
                  />
                  <Card
                    style={{
                      backgroundImage:
                        'url("https://t3.ftcdn.net/jpg/03/22/30/46/240_F_322304683_7ysRarFkmy2osfPKTOYQv7qTPofKelfb.jpg")',
                    }}
                    className="pt-2 shadow-xl bg-cover"
                  >
                    <div className="flex flex-col px-10 space-y-5 text-white">
                      <div className="uppercase font-bold text-2xl flex justify-center">
                        <span>
                          {carData.manufacturingCompany}-{carData.name}
                        </span>
                      </div>
                      <div className="w-full flex text-sm border-b p-2">
                        <span className="uppercase w-1/2">Year:{carData.yearOfManufacturing}</span>
                        <span className="uppercase w-1/2">FUEL:{carData.fuelType}</span>
                      </div>
                      <div className="w-full flex text-sm border-b p-2">
                        <span className="uppercase w-1/2">{carData.transmission}</span>
                        <span className="uppercase w-1/2">
                          KMS:{fShortenNumber(carData.totalKmCovered)}
                        </span>
                      </div>
                      <div className="w-full flex text-sm border-b p-2">
                        <span className="uppercase w-1/2">{carData.vehicleNumber}</span>
                        <span className="uppercase w-1/2">
                          Service:{fShortenNumber(carData.serviceInterval)}-Kms
                        </span>
                      </div>
                      <div className="w-full flex text-sm border-b p-2">
                        <span className="uppercase w-1/2">
                          Pollution <br />
                          {CustomformatDate(carData.pollution)}
                        </span>
                        <span className="uppercase w-1/2">
                          Insurance <br />
                          {CustomformatDate(carData.insurance)}
                        </span>
                      </div>
                      <div className="text-sm border-b p-2">
                        <span className="uppercase w-1/2">
                          Last service <br />
                          {CustomformatDate(carData.lastService)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Typography
                className="text-xl  pt-4 flex gap-1 items-center pb-4 text-gray-600"
                variant="h5"
              >
                Services Made({carData?.serviceHistory?.length})
                {!showServices ? (
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => setShowServices(!showServices)}
                      className="flex items-center cursor-pointer gap-1"
                    >
                      <Iconify
                        icon="bxs:down-arrow"
                        sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                      />
                      <span>view all</span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowServices(!showServices)}
                    className="flex items-center cursor-pointer gap-1"
                  >
                    <Iconify
                      icon="bxs:up-arrow"
                      sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                    />
                    <span>Hide all</span>
                  </div>
                )}
              </Typography>

              {showServices && carData?.serviceHistory?.length ? (
                <>
                  {carData?.serviceHistory.map((m, index) => (
                    <span>
                      <Card className="p-3 shadow-xl border border-black border-dotted border-opacity-20 mb-4">
                        <Grid container sx={{ height: { xs: 'auto', md: 180 } }}>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            justify="center"
                            alignItems="center"
                            className="border-r border-dotted text-center px-4 md:text-left"
                          >
                            <div className="flex flex-col mt-3">
                              <Typography className="text-xl  text-gray-400" variant="overline">
                                service no #{index + 1}
                              </Typography>{' '}
                              <div className=" flex justify-center items-center gap-2  rounded-xl">
                                <div className="max-w-[200px] break-words ">
                                  <p className="text-gray-500">Service done on</p>
                                  <p className="text-xl max-h-[50px] max-w-[150px] overflow-hidden">
                                    <span>{CustomformatDate(m.date)}</span>
                                  </p>
                                </div>
                              </div>
                              <div className=" justify-center items-center">
                                <p className="text-gray-400 mt-5 mb-1">Service done at</p>
                                {m.serviceDoneAt} kms
                              </div>{' '}
                            </div>
                          </Grid>

                          <Grid
                            className="border-r border-dotted text-center md:text-left"
                            item
                            xs={12}
                            md={5}
                            justify="center"
                            alignItems="center"
                          >
                            <div className="flex flex-col justify-around h-full items-center">
                              <Typography
                                style={{ letterSpacing: '3px' }}
                                className="text-lg uppercase "
                                variant=""
                              >
                                Description
                              </Typography>
                              <div
                                className="w-full"
                                style={{ maxWidth: '360px', wordWrap: 'break-word' }}
                              >
                                {m.description}{' '}
                              </div>
                            </div>{' '}
                          </Grid>

                          <Grid
                            minHeight={40}
                            borderRadius={1}
                            item
                            xs={12}
                            md={1}
                            justify="center"
                            alignItems="center"
                          >
                            <div className="flex h-full flex-col gap-1">
                              <h1
                                onClick={() =>
                                  CustomModal(
                                    () => handleDeleteServices(m._id),
                                    deleteServiceMessage,
                                    m._id
                                  )
                                }
                                title="Delete"
                                className=" h-[30%] flex justify-center rounded-xl cursor-pointer items-center bg-[#BDC4CB]"
                              >
                                {' '}
                                <Iconify
                                  icon="material-symbols-light:delete-outline"
                                  sx={{ ml: 1, width: 20, height: 20, color: 'red' }}
                                />
                              </h1>

                              <Typography
                                onClick={() => toggleToDate(index)}
                                className="text-2xl h-[70%] mt-2 bg-[#59c5b9] rounded-xl flex justify-center cursor-pointer items-center "
                                variant="overline"
                              >
                                <span>{showToDates[index] ? 'Show Less' : 'Show More'}</span>{' '}
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                        {showToDates[index] && (
                          <Grid className="px-4 pt-2 pb-3 " item xs={12} md={12}>
                            <Typography className="text-lg uppercase mb-5 underline" variant="">
                              Works done
                            </Typography>
                            {m.worksDone.map((p) => (
                              <div className="flex gap-5 space-y-2">
                                <p style={{ wordWrap: 'break-word' }} className="w-[300px] ">
                                  {p.description}
                                </p>
                                <p className="w-[300px]">₹ {p.amount}</p>
                              </div>
                            ))}

                            <div className="flex gap-5 text-xl border-t border-dashed">
                              <p style={{ wordWrap: 'break-word' }} className="w-[300px] ">
                                Total
                              </p>
                              <p className="w-[300px] ">₹ {m.totalAmount}</p>
                            </div>
                          </Grid>
                        )}
                      </Card>
                    </span>
                  ))}
                </>
              ) : (
                ''
              )}
              <Typography
                onClick={() => setShowBookings(!showBookings)}
                className="text-xl cursor-pointer pt-4 flex gap-1 items-center pb-4 text-gray-600"
                variant="h5"
              >
                Bookings({carData?.bookings?.length})
                {!showBookings ? (
                  <div className="flex items-center gap-1">
                    <Iconify
                      icon="bxs:down-arrow"
                      sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                    />
                    <span>view all</span>
                  </div>
                ) : (
                  <>
                    <Iconify
                      icon="bxs:up-arrow"
                      sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                    />
                    <span>Hide all</span>
                  </>
                )}
              </Typography>

              {showBookings && (
                <Grid container>
                  {carData?.bookings?.length > 0 ? (
                    <Grid item xs={12} md={12}>
                      {carData?.bookings?.map((m, index) => (
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
                                      {m.customerSelected?.name}
                                    </Typography>
                                    <Typography className="text mt-2" variant="caption">
                                      <p className="text-sm" style={{ wordWrap: 'break-word' }}>
                                        {m.customerSelected?.email}
                                      </p>
                                    </Typography>
                                    <Typography className="text-2xl mt-2" variant="overline">
                                      pincode :
                                      <br />
                                      {m.customerSelected?.pincode}
                                    </Typography>
                                    <Typography
                                      className="text-2xl mt-2 flex justify-center items-center"
                                      variant="overline"
                                    >
                                      {m.customerSelected?.contactNumber}
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
                                      Discount given :{' '}
                                      <span className="text-lg">₹{m.discount}</span>
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
                                      <Typography
                                        className="text-lg uppercase mb-5 underline"
                                        variant=""
                                      >
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
                                  <Typography
                                    className="text-lg uppercase mb-5 underline"
                                    variant=""
                                  >
                                    Invoice items
                                  </Typography>
                                  <div className="flex flex-col border">
                                    <div className="flex bg-gray-400">
                                      <p className="w-[300px] border-r px-2 py-1 font-semibold">
                                        Item
                                      </p>
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
                                    <Typography
                                      Z
                                      className="text-lg uppercase mb-5 underline"
                                      variant=""
                                    >
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
                                    Customer details
                                  </Typography>

                                  <Avatar
                                    className="md:mx-auto"
                                    style={{ width: '110px', height: '110px', cursor: 'pointer' }}
                                    src={m.customerSelected?.customerImage?.url}
                                  />
                                  <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                                    <Typography className="text-2xl" variant="subtitle2">
                                      Name:{' '}
                                      <span className="text-lg">{m.customerSelected.name}</span>
                                    </Typography>
                                    <Typography className="text-2xl" variant="subtitle2">
                                      Contact Number :{' '}
                                      <span className="text-lg">
                                        {m.customerSelected.contactNumber}
                                      </span>
                                    </Typography>
                                    <Typography className="text-2xl" variant="subtitle2">
                                      Email :{' '}
                                      <span className="text-lg">{m.customerSelected.email}</span>
                                    </Typography>

                                    <Typography className="text-2xl" variant="subtitle2">
                                      Passport Number :{' '}
                                      <span className="text-lg">
                                        {m.customerSelected.passportNumber}
                                      </span>
                                    </Typography>
                                    <Typography className="text-2xl" variant="subtitle2">
                                      Pincode :{' '}
                                      <span className="text-lg">{m.customerSelected.pincode}</span>
                                    </Typography>
                                    <Typography className="text-2xl" variant="subtitle2">
                                      State :{' '}
                                      <span className="text-lg">{m.customerSelected.state}</span>
                                    </Typography>
                                    <Typography
                                      style={{ maxWidth: 'full', wordWrap: 'break-word' }}
                                      className="text-2xl"
                                      variant="subtitle2"
                                    >
                                      Address :{' '}
                                      <span className="text-lg">{m.customerSelected.address}</span>
                                    </Typography>
                                    <Typography className="text-2xl" variant="subtitle2">
                                      Locality :{' '}
                                      <span className="text-lg">{m.customerSelected.locality}</span>
                                    </Typography>
                                    <Typography className="text-2xl" variant="subtitle2">
                                      City/District :{' '}
                                      <span className="text-lg">
                                        {m.customerSelected.cityOrDistrict}
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
                                      username :{' '}
                                      <span className="text-lg">{m.employee?.userName}</span>
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
                                        <span className="text-md border-r pr-1 pl-1">
                                          {m.title}
                                        </span>
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
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

// import {
//     Avatar,
//     Box,
//     Card,
//     Container,
//     Grid,
//     Typography,
//     IconButton,
//     Stack,
//     Breadcrumbs,
//   } from '@mui/material';
//   import { useState, useEffect } from 'react';
//   import { useGetCarssById } from 'src/api/cars/Queries';
//   import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
//   import { CustomformatDate } from 'src/components/format-changer/FormatChnager';
//   import Iconify from 'src/components/iconify';
//   import { fShortenNumber } from 'src/utils/formatNumber';
//   import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//   } from '@mui/material';
//   import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
//   import * as Yup from 'yup';
//   import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//   import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//   import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//   import dayjs from 'dayjs';
//   import { useAddServiceDetails } from 'src/api/cars/Mutations';

//   const validationSchema = Yup.object({
//     serviceDoneAt: Yup.string().required('kilometers is required'),
//     date: Yup.date().required('Date is required').nullable(),
//     description: Yup.string().required('Description is required'),
//     worksDone: Yup.array().of(
//       Yup.object({
//         description: Yup.string().required('Description is required'),
//         amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
//       })
//     ),
//   });

//   export default function MaintenanceDetailedView({ editId }) {
//     const addServiceMutation = useAddServiceDetails();
//     const [open, setOpen] = useState(false);
//     const [carData, setCarData] = useState(null); // State to store car data

//     const handleClickOpen = () => {
//       setOpen(true);
//     };

//     const handleClose = () => {
//       setOpen(false);
//     };

//     const handleSubmit = (values, id) => {
//       console.log(values);
//       const data = {
//         ...values,
//         _id: editId,
//       };
//       addServiceMutation.mutate(data, {
//         onSuccess: (newData) => {
//           setCarData((prev) => ({
//             ...prev,
//             serviceHistory: [...prev.serviceHistory, newData],
//           }));
//           handleClose();
//         },
//       });
//       console.log(data);
//     };

//     const singleCarQuery = useGetCarssById(editId);

//     useEffect(() => {
//       if (singleCarQuery.data) {
//         setCarData(singleCarQuery.data);
//       }
//     }, [singleCarQuery.data]);

//     const [showServices, setShowServices] = useState(false);

//     return (
//       <>
//         <Container>
//           <div>
//             {carData ? (
//               <>
//                 <div>
//                   <div className="lg:grid lg:grid-cols-3">
//                     <img
//                       className="w-full  rounded-3xl h-[200px] md:h-[300px] lg:h-[420px] md:col-span-2 "
//                       src={carData.carImage?.url}
//                       alt="fe"
//                     />
//                   </div>
//                 </div>

//                 <Typography
//                   className="text-xl  pt-4 flex gap-1 items-center pb-4 text-gray-600"
//                   variant="h5"
//                 >
//                   Services Made({carData.serviceHistory?.length})
//                   {!showServices ? (
//                     <>
//                       <div className="flex items-center gap-2">
//                         <div className="">
//                           <div>
//                             <span
//                               className="text-base flex items-center gap-1 cursor-pointer bg-blue-900 rounded-xl text-white  p-2 justify-center"
//                               onClick={handleClickOpen}
//                               style={{ cursor: 'pointer' }}
//                             >
//                               <Iconify
//                                 icon="gridicons:create"
//                                 sx={{ ml: 1, width: 20, height: 20, color: 'white' }}
//                               />
//                               Create New
//                             </span>
//                             <Dialog open={open} onClose={handleClose}>
//                               <DialogTitle>Create New</DialogTitle>
//                               <DialogContent>
//                                 <Formik
//                                   initialValues={{
//                                     serviceDoneAt: '',
//                                     date: dayjs().toDate(),
//                                     description: '',
//                                     worksDone: [{ description: '', amount: '' }],
//                                   }}
//                                   validationSchema={validationSchema}
//                                   onSubmit={handleSubmit}
//                                 >
//                                   {({ errors, touched, isSubmitting, setFieldValue }) => (
//                                     <Form>
//                                       <Field name="serviceDoneAt">
//                                         {({ field }) => (
//                                           <TextField
//                                             {...field}
//                                             label="Car current kilometer"
//                                             fullWidth
//                                             type="number"
//                                             margin="normal"
//                                             error={
//                                               touched.serviceDoneAt && Boolean(errors.serviceDoneAt)
//                                             }
//                                             helperText={touched.serviceDoneAt && errors.serviceDoneAt}
//                                           />
//                                         )}
//                                       </Field>
//                                       <div className="mt-5"></div>
//                                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                         <Field name="date">
//                                           {({ field }) => (
//                                             <DatePicker
//                                               format="DD-MM-YYYY"
//                                               {...field}
//                                               slotProps={{
//                                                 textField: { fullWidth: true },

//                                                 openPickerButton: {
//                                                   color: 'primary',
//                                                 },
//                                                 inputAdornment: {
//                                                   position: 'start',
//                                                 },
//                                               }}
//                                               label="Select Date of service"
//                                               value={dayjs(field.value)}
//                                               onChange={(value) =>
//                                                 setFieldValue('date', value ? value.toDate() : null)
//                                               }
//                                               renderInput={(params) => (
//                                                 <TextField
//                                                   {...params}
//                                                   fullWidth
//                                                   margin="normal"
//                                                   error={touched.date && Boolean(errors.date)}
//                                                   helperText={touched.date && errors.date}
//                                                 />
//                                               )}
//                                             />
//                                           )}
//                                         </Field>
//                                       </LocalizationProvider>

//                                       <FieldArray name="worksDone">
//                                         {({ push, remove, form }) => (
//                                           <div>
//                                             <div
//                                               style={{
//                                                 display: 'flex',
//                                                 justifyContent: 'space-between',
//                                                 alignItems: 'center',
//                                                 marginTop: '10px',
//                                                 padding: '5px',
//                                               }}
//                                             >
//                                               <Typography variant="h4">Works Done</Typography>
//                                               <Button
//                                                 variant="contained"
//                                                 color="primary"
//                                                 size="small"
//                                                 // startIcon={<Add />}
//                                                 onClick={() => push({ description: '', amount: '' })}
//                                               >
//                                                 Add Work
//                                               </Button>
//                                             </div>
//                                             {form.values.worksDone.map((work, index) => (
//                                               <div
//                                                 key={index}
//                                                 style={{
//                                                   display: 'flex',
//                                                   alignItems: 'center',
//                                                   marginBottom: '-15px',
//                                                 }}
//                                               >
//                                                 <Field name={`worksDone.${index}.description`}>
//                                                   {({ field }) => (
//                                                     <TextField
//                                                       {...field}
//                                                       label={`Work Description `}
//                                                       fullWidth
//                                                       margin="normal"
//                                                       error={
//                                                         touched.worksDone?.[index]?.description &&
//                                                         Boolean(
//                                                           errors.worksDone?.[index]?.description
//                                                         )
//                                                       }
//                                                       helperText={
//                                                         touched.worksDone?.[index]?.description &&
//                                                         errors.worksDone?.[index]?.description
//                                                       }
//                                                     />
//                                                   )}
//                                                 </Field>
//                                                 <Field name={`worksDone.${index}.amount`}>
//                                                   {({ field }) => (
//                                                     <TextField
//                                                       {...field}
//                                                       label={`Amount`}
//                                                       fullWidth
//                                                       margin="normal"
//                                                       type="number"
//                                                       error={
//                                                         touched.worksDone?.[index]?.amount &&
//                                                         Boolean(errors.worksDone?.[index]?.amount)
//                                                       }
//                                                       helperText={
//                                                         touched.worksDone?.[index]?.amount &&
//                                                         errors.worksDone?.[index]?.amount
//                                                       }
//                                                       style={{ marginLeft: '10px' }}
//                                                     />
//                                                   )}
//                                                 </Field>
//                                                 <IconButton
//                                                   aria-label="remove"
//                                                   color="secondary"
//                                                   onClick={() => remove(index)}
//                                                 >
//                                                   <Iconify
//                                                     icon="material-symbols:delete-outline"
//                                                     sx={{
//                                                       ml: 1,
//                                                       width: 20,
//                                                       height: 20,
//                                                       color: 'text.disabled',
//                                                     }}
//                                                   />
//                                                 </IconButton>
//                                               </div>
//                                             ))}
//                                           </div>
//                                         )}
//                                       </FieldArray>
//                                       <div className="mt-3"></div>
//                                       <Field name="description">
//                                         {({ field }) => (
//                                           <TextField
//                                             {...field}
//                                             label="Description"
//                                             fullWidth
//                                             margin="normal"
//                                             multiline
//                                             rows={4}
//                                             error={touched.description && Boolean(errors.description)}
//                                             helperText={touched.description && errors.description}
//                                           />
//                                         )}
//                                       </Field>
//                                       <DialogActions>
//                                         <Button onClick={handleClose} color="primary">
//                                           Cancel
//                                         </Button>
//                                         <Button type="submit" color="primary" disabled={isSubmitting}>
//                                           Submit
//                                         </Button>
//                                       </DialogActions>
//                                     </Form>
//                                   )}
//                                 </Formik>
//                               </DialogContent>
//                             </Dialog>
//                           </div>
//                         </div>
//                         <div
//                           onClick={() => setShowServices(!showServices)}
//                           className="flex items-center cursor-pointer gap-1"
//                         >
//                           <Iconify
//                             icon="bxs:down-arrow"
//                             sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
//                           />
//                           <span>view all</span>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div
//                         onClick={() => setShowServices(!showServices)}
//                         className="flex items-center cursor-pointer gap-1"
//                       >
//                         <Iconify
//                           icon="bxs:up-arrow"
//                           sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
//                         />
//                         <span>Hide all</span>
//                       </div>
//                     </>
//                   )}
//                 </Typography>
//               </>
//             ) : (
//               ''
//             )}
//           </div>
//         </Container>
//       </>
//     );
//   }
