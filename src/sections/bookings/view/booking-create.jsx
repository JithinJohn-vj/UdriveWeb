/* eslint-disable */

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import {
  Step,
  Card,
  Grid,
  Radio,
  Button,
  Stepper,
  Tooltip,
  StepLabel,
  TextField,
  Container,
  RadioGroup,
  Typography,
  IconButton,
  FormHelperText,
  FormControlLabel,
  Modal,
  Fade,
  Box,
} from '@mui/material'; // Import FormProvider

import dayjs from 'dayjs';
import { toast } from 'sonner';

import CircularProgress from '@mui/material/CircularProgress';

import EditId from 'src/zustand/EditId';
import { useGetBookingsById } from 'src/api/bookings/Queries';
import {
  useEditBooking,
  useCreateBooking,
  useAddBookingInvoiceAfterAdvance,
  useCheckBookedData,
} from 'src/api/bookings/Mutations';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import { formatToMDY } from 'src/components/format-changer/FormatChnager';
import { CustomGrid, CustomContainerGrid } from 'src/components/custom-made';

import PickCars from './pick-cars';
import PickUser from './pick-user';
import CheckoutSummary from '../CheckoutSummary';
import BookingCustomerCreate from './book-customer-create';
import { _invoice } from 'src/_mock/invoice';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { AdvancePDF } from '../invoice';
import { styled } from '@mui/material/styles';
import { is } from 'date-fns/locale';

const steps = ['Date and Car', 'Customer Details', 'Review and Submit'];
BookingCreate.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
export default function BookingCreate({ isEdit, isInvoice }) {
  const carAvailableForBooking = useCheckBookedData();
  console.log(isInvoice);
  console.log(isEdit);
  const editId = EditId((state) => state.id);
  console.log(editId);
  const newInputRef = useRef(null);
  const CreateBookingMutation = useCreateBooking();
  const CreateBookingInvoiceAfterAdvanceMutation = useAddBookingInvoiceAfterAdvance();
  const EditBookingMutation = useEditBooking();
  const singleBookingQuery = useGetBookingsById(editId);
  console.log(singleBookingQuery);
  const [editableData, setEditableData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [choice, setChoice] = useState('yes');
  const [advchoice, setAdvChoice] = useState('yes');
  const [amntStatus, setAmntStatus] = useState('paid');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [onCustomerCreationSucess, setOnCustomerCreationSucess] = useState(false);
  const [items, setItems] = useState([{ name: '', amount: '' }]);
  const [discount, setDiscount] = useState(0);
  const [invoiceId, setInvoiceId] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [advanceAmt, setAdvanceAmt] = useState(0);
  const [perDayCarCost, setPerDayCarCost] = useState(0);
  const [pickupCost, setPickupCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [minimumKilometer, setMinimumKm] = useState(0);
  const [costAfterMinimumKm, setCostAfterMinimumKm] = useState(0);

  const [formData, setFormData] = useState({
    driverName: '',
    contactNumber: '',
    driverNotes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
  };
  const handleAdvChoiceChange = (event) => {
    setAdvChoice(event.target.value);
  };

  const iVoiceIdRandom = Math.floor(10000000 + Math.random() * 90000000);
  const validationSchema = () => {
    if (activeStep === 0) {
      return Yup.object().shape({
        pickupPoint: Yup.string().required('Pickup-point is required'),
        dropPoint: Yup.string().required('Drop-point is required'),
        fromDate: Yup.date().required('Date is required'),
        toDate: Yup.date().required('Date is required'),
      });
    }
    if (activeStep === 1) {
      return Yup.object().shape({
        // firstName: Yup.string().required('First Name is required'),
        // lastName: Yup.string().required('Last Name is required'),
      });
    }
    if (activeStep === 2 && advchoice === 'yes') {
      return Yup.object().shape({
        // advanceAmnt: Yup.number().required('Amount is required'),
        // lastName: Yup.string().required('Last Name is required'),
      });
    }

    if (activeStep === 2 && advchoice === 'no') {
      return Yup.object().shape({
        // driverName: Yup.string().required('name is required'),
        // contactNumber: Yup.number().required('Contact Number is required'),
        // driverNotes: Yup.string().required('Notes is required'),
        // lastName: Yup.string().required('Last Name is required'),
      });
    }

    return Yup.object().shape({});
  };

  const defaultValue = {};
  const methods = useForm({
    defaultValues: defaultValue,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema()),
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if ((singleBookingQuery.status === 'success' && isEdit) || isInvoice) {
      if (singleBookingQuery.status === 'success' && isEdit) {
        console.log(singleBookingQuery.data);
        setEditableData(singleBookingQuery.data);
        setSelectedCar(singleBookingQuery?.data?.carSelected);
        setAdvChoice('no');
        setPerDayCarCost(singleBookingQuery?.data?.costPerDay);
        setPickupCost(singleBookingQuery?.data?.pickupCost);
        setDeliveryCost(singleBookingQuery?.data?.deliveryCost);
        setTotalDuration(singleBookingQuery?.data?.totalDuration);
        setMinimumKm(singleBookingQuery?.data?.minimumKilometer);
        setCostAfterMinimumKm(singleBookingQuery?.data?.costAfterMinimumKm);
        setFormData(singleBookingQuery?.data?.driver);
        const defaults = {
          // rcBook: singleBookingQuery?.data?.rcBook?.url || null,
          // insurancePolicy: singleBookingQuery?.data?.rcBook?.url || null,
          // pollutionCertificate: singleBookingQuery?.data?.pollutionCertificate?.url || null,
          _id: singleBookingQuery?.data?._id,
          name: singleBookingQuery?.data?.name,
          pickupPoint: singleBookingQuery?.data?.pickupPoint,
          dropPoint: singleBookingQuery?.data?.dropPoint,
          invoiceId: singleBookingQuery?.data?.invoiceId
            ? setInvoiceId(singleBookingQuery?.data?.invoiceId)
            : setInvoiceId(0),
          customerSelected: singleBookingQuery?.data?.customerSelected
            ? setChoice('no')
            : setChoice('yes'),
          invoiceDetails: singleBookingQuery?.data?.invoiceDetails
            ? setItems(singleBookingQuery?.data?.invoiceDetails)
            : '',
          discount: singleBookingQuery?.data?.discount
            ? setDiscount(singleBookingQuery?.data?.discount)
            : '',
          tax: singleBookingQuery?.data?.tax ? setTaxAmount(singleBookingQuery?.data?.tax) : '',
          advanceAmount: singleBookingQuery?.data?.advanceAmount
            ? setAdvanceAmt(singleBookingQuery?.data?.advanceAmount)
            : '',

          fromDate: dayjs(formatToMDY(singleBookingQuery?.data?.fromDate)),
          toDate: dayjs(formatToMDY(singleBookingQuery?.data?.toDate)),
        };
        reset(defaults);
      } else if (singleBookingQuery.status === 'success' && isInvoice) {
        setActiveStep(2);
        setAdvChoice('no');
        console.log(singleBookingQuery.data);
        setEditableData(singleBookingQuery.data);
        setSelectedCar(singleBookingQuery?.data?.carSelected);
        setSelectedCustomer(singleBookingQuery?.data?.customerSelected);
        const defaults = {
          _id: singleBookingQuery?.data?._id,
          name: singleBookingQuery?.data?.name,
          pickupPoint: singleBookingQuery?.data?.pickupPoint,
          dropPoint: singleBookingQuery?.data?.dropPoint,
          invoiceId: singleBookingQuery?.data?.invoiceId
            ? setInvoiceId(singleBookingQuery?.data?.invoiceId)
            : setInvoiceId(0),
          customerSelected: singleBookingQuery?.data?.customerSelected
            ? setChoice('no')
            : setChoice('yes'),
          invoiceDetails: singleBookingQuery?.data?.invoiceDetails
            ? setItems(singleBookingQuery?.data?.invoiceDetails)
            : '',
          discount: singleBookingQuery?.data?.discount
            ? setDiscount(singleBookingQuery?.data?.discount)
            : '',
          tax: singleBookingQuery?.data?.tax ? setTaxAmount(singleBookingQuery?.data?.tax) : '',
          advanceAmount: singleBookingQuery?.data?.advanceAmount
            ? setAdvanceAmt(singleBookingQuery?.data?.advanceAmount)
            : '',

          fromDate: dayjs(formatToMDY(singleBookingQuery?.data?.fromDate)),
          toDate: dayjs(formatToMDY(singleBookingQuery?.data?.toDate)),
        };
        reset(defaults);
      }
    } else {
      setInvoiceId(iVoiceIdRandom);
      setEditableData(null);
      setActiveStep(0);
      setItems([{ name: '', amount: '' }]);
      setDiscount(0);
      setTaxAmount(0);
      reset({
        name: '',
      });
    }
    console.log(editableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    singleBookingQuery?.status === 'success',
    reset,
    isEdit,
    isInvoice,
    editableData,
    window.location.pathname,
  ]);
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = async () => {
    const isValid = await handleSubmit(onSubmit)();
    if (selectedCar !== null && activeStep === 0) {
      const m = watch('fromDate');
      const p = watch('toDate');
      console.log('fromDate', m);
      console.log('toDate', p);
      console.log('selectedCar', selectedCar);
      console.log('bookingId', singleBookingQuery.data);

      const BookingFinderData = {
        fromDate: m.format('DD-MM-YYYY hh:mm A'),
        toDate: p.format('DD-MM-YYYY hh:mm A'),
        carId: selectedCar._id,
        bookingId: singleBookingQuery.data._id,
      };

      // carAvailableForBooking.mutate(BookingFinderData, {
      //   onSuccess: () => {
      //     setActiveStep((prevStep) => prevStep + 1);
      //     toast.success('Car is available');

      //     // setIsBookingAvailable(true);
      //   },
      //   onError: () => {
      //     toast.error('Car is already booked for the selected date');
      //     // setIsBookingAvailable(false);
      //   },
      // });

      if (isValid && activeStep !== steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else if (selectedCustomer !== null && activeStep === 1) {
      if (isValid && activeStep !== steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else if (selectedCar === null) {
      toast.error('Please select a car before proceeding.');
    } else if (selectedCustomer === null) {
      toast.error('please select a customer before proceeding');
    } else {
      console.log('first');
    }
  };

  console.log(selectedCustomer);
  console.log(selectedCar);
  const handleCustomerCreate = (row) => {
    console.log(row);
    setOnCustomerCreationSucess(true);
    // setSelectedRow(row);
  };

  const handleCustomerSelect = (row) => {
    console.log(row);
    setSelectedCustomer(row);
    // setSelectedRow(row);
  };

  const handleCarSelect = (row, from, to) => {
    let now = dayjs();

    console.log(from);
    console.log(now);
    if (from) {
      if (!from.isSame(now, 'minute')) {
        console.log('first');
        setFromDate(from);
        setToDate(to);
      }
    }
    console.log(to);
    console.log(row);
    setSelectedCar(row);
  };

  const handleDiscountChange = (newDiscount) => {
    setDiscount(newDiscount);
  };
  const handleTaxChange = (newDiscount) => {
    setTaxAmount(newDiscount);
  };
  const handleAdvanceChange = (newAdvance) => {
    setAdvanceAmt(newAdvance);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', amount: '' }]);
  };
  useEffect(() => {
    // Scroll to the newly added input when items change
    console.log('first');
    if (newInputRef.current) {
      newInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [items]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const subtotal = items && items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);

  const grandTotal = subtotal - discount + taxAmount;

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const onSubmit = (data) => {
    console.log(activeStep);
    if (activeStep === steps.length - 1) {
      if (isEdit) {
        const m = watch('fromDate');
        const p = watch('toDate');
        console.log(p);
        console.log(m);
        console.log(fromDate);
        const values = {
          _id: editableData._id,
          fromDate: m.format('DD-MM-YYYY hh:mm A'),
          toDate: p.format('DD-MM-YYYY hh:mm A'),
          pickupPoint: data.pickupPoint,
          dropPoint: data.dropPoint,
          carSelected: selectedCar,
          customerSelected: selectedCustomer,
          subTotals: subtotal,
          invoiceId,
          totalDuration,
          discount,
          minimumKilometer,
          costAfterMinimumKm,
          pickupCost,
          deliveryCost,
          tax: taxAmount,
          invoiceDetails: items,
          costPerDay: perDayCarCost,
          driver: formData,
          total: grandTotal - advanceAmt,
          payment: amntStatus,
          advanceAmount: advanceAmt,
        };
        EditBookingMutation.mutate(values);
        console.log(values);
        console.log(items);
      } else if (isInvoice) {
        const values = {
          _id: editableData._id,
          driver: formData,
          total: grandTotal - advanceAmt,
          payment: amntStatus,
          subTotals: subtotal,
          discount,
          advanceAmount: advanceAmt,
          tax: taxAmount,
          invoiceDetails: items,
        };
        console.log(values);
        CreateBookingInvoiceAfterAdvanceMutation.mutate(values);
      } else {
        const m = watch('fromDate');
        const p = watch('toDate');
        console.log('Submitting form');
        const values = {
          fromDate: m.format('DD-MM-YYYY hh:mm A'),
          toDate: p.format('DD-MM-YYYY hh:mm A'),
          pickupPoint: data.pickupPoint,
          dropPoint: data.dropPoint,
          pickupCost,
          deliveryCost,
          totalDuration,
          minimumKilometer,
          costAfterMinimumKm,
          carSelected: selectedCar,
          customerSelected: selectedCustomer,
          subTotals: subtotal,
          invoiceId,
          costPerDay: perDayCarCost,
          discount,
          tax: taxAmount,
          invoiceDetails: items,
          driver: formData,
          total: grandTotal - advanceAmt,
          payment: amntStatus,
          advanceAmount: advanceAmt,
        };
        CreateBookingMutation.mutate(values);
        console.log(values);
        console.log(items);
      }
    } else {
      console.log('first');
      if (selectedCar !== null && activeStep === 0) {
        const m = watch('fromDate');
        const p = watch('toDate');
        const BookingFinderData = {
          fromDate: m.format('DD-MM-YYYY hh:mm A'),
          toDate: p.format('DD-MM-YYYY hh:mm A'),
          carId: selectedCar._id,
        };
        const BookingFinderDataedit = {
          fromDate: m.format('DD-MM-YYYY hh:mm A'),
          toDate: p.format('DD-MM-YYYY hh:mm A'),
          carId: selectedCar._id,
          bookingId: singleBookingQuery?.data?._id||'',
        };
        if(isEdit){
          carAvailableForBooking.mutate(BookingFinderDataedit, {
            onSuccess: () => {
              setActiveStep((prevStep) => prevStep + 1);
              toast.success('Car is available');
              // setIsBookingAvailable(true);
            },
            onError: () => {
              toast.error('Selected Car is already booked');
              // setIsBookingAvailable(false);
            },
          });

        }else{
          carAvailableForBooking.mutate(BookingFinderData, {
            onSuccess: () => {
              setActiveStep((prevStep) => prevStep + 1);
              toast.success('Car is available');
              // setIsBookingAvailable(true);
            },
            onError: () => {
              toast.error('Selected Car is already booked');
              // setIsBookingAvailable(false);
            },
          });
        }
        
        
      } else if (selectedCustomer !== null && activeStep === 1) {
        console.log('first');
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        console.log('first');
      }
    }
    console.log('Form data:', data);
  };

  const ModalContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '95%',
    margin: 'auto',
  });

  const [openPDF, setOpenPDF] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };
  console.log(selectedCar);
  return (
    <Container>
      <FormProvider {...methods} handleSubmit={handleSubmit} errors={errors}>
        <CustomContainerGrid>
          <>
            <CustomGrid layout={[12]}>
              <Stepper className="mb-3" activeStep={activeStep} orientation="horizontal">
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CustomGrid>

            {activeStep === 0 && (
              <>
                {/* <CustomGrid layout={[12, 6]}>
                  <RHFDateTimePicker
                    name="fromDate"
                    label="From date"
                    onChange={(values) => handleFromDate(values)}
                  />
                </CustomGrid>
                <CustomGrid layout={[12, 6]}>
                  <RHFDateTimePicker
                    name="toDate"
                    label="To date"
                    onChange={(values) => handleToDate(values)}
                  />
                </CustomGrid> */}
                <PickCars
                  previousBooking={singleBookingQuery.data}
                  onRowSelect={handleCarSelect}
                  selectedCar={selectedCar}
                  isEdit={isEdit}
                  editableData={editableData}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                {!onCustomerCreationSucess ? (
                  <>
                    <CustomGrid layout={[12]}>
                      <Card className="p-4 mb-4 shadow-xl">
                        <Typography variant="h6" gutterBottom>
                          Choose an Option
                        </Typography>
                        <RadioGroup
                          aria-label="review-choice"
                          name="review-choice"
                          value={choice}
                          row
                          onChange={handleChoiceChange}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Create a new Customer"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="Pick an existing Customer from the list"
                          />
                        </RadioGroup>
                      </Card>
                    </CustomGrid>

                    {choice === 'yes' ? (
                      <BookingCustomerCreate onCustomerCreate={handleCustomerCreate} />
                    ) : (
                      <PickUser
                        isEdit={isEdit}
                        editableData={editableData}
                        onRowSelect={handleCustomerSelect}
                        selectedCustomer={selectedCustomer}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Typography paddingLeft={3} paddingTop={3} variant="h5" gutterBottom>
                      Pick a customer from the list
                    </Typography>
                    <PickUser
                      onRowSelect={handleCustomerSelect}
                      selectedCustomer={selectedCustomer}
                    />
                  </>
                )}
              </>
            )}
            {activeStep === 2 && (
              <>
                {!isInvoice && (
                  <CustomGrid layout={[12]}>
                    <Card className="p-4 mb-4 shadow-xl">
                      <Typography variant="h6" gutterBottom>
                        Choose Payment Option
                      </Typography>
                      <RadioGroup
                        aria-label="review-choice"
                        name="review-choice"
                        value={advchoice}
                        row
                        onChange={handleAdvChoiceChange}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Pay advance, invoice later"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="Pay in full, invoice now"
                        />
                      </RadioGroup>
                    </Card>
                  </CustomGrid>
                )}
                {advchoice === 'yes' ? (
                  <>
                    {/* <div className="w-full flex justify-end items-center">
                      <Button
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
                                  advanceValue={advanceAmt}
                                  selectedCar={selectedCar}
                                  costPerDay={perDayCarCost}

                                  // amntStatus={payment}
                                  // payment={payment}
                                  // formdata={formdata}
                                  // p={formdata}
                                  invoiceId={invoiceId}
                                  selectedCustomer={selectedCustomer}
                                  // taxValue={tax}
                                  discountValue={discount}
                                  // subtotal={subTotals}
                                  // grandTotal={total}
                                  // listTotal={total}
                                  // items={invoiceDetails}
                                  invoice={_invoice}
                                />
                              </PDFViewer>
                            </Box>
                          </ModalContainer>
                        </Fade>
                      </Modal>
                    </div> */}
                    {/* <PDFDownloadLink
                      document={
                        <AdvancePDF
                          fromDate={fromDate}
                          toDate={toDate}
                          pickupCost={pickupCost}
                          deliveryCost={deliveryCost}
                          // pickupPoint={pickupPoint}
                          // dropPoint={dropPoint}
                          // costPerDay={costPerDay}
                          advanceValue={advanceAmt}
                          // amntStatus={payment}
                          // payment={payment}
                          // formdata={formdata}
                          // p={formdata}
                          invoiceId={invoiceId}
                          selectedCustomer={selectedCustomer}
                          // taxValue={tax}
                          discountValue={discount}
                          // subtotal={subTotals}
                          selectedCar={selectedCar}
                          // grandTotal={total}
                          // listTotal={total}
                          // items={invoiceDetails}
                          invoice={_invoice}
                        />
                      }
                      fileName={`ADVANCE-INVOICE-${selectedCustomer?.name}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {({ loading }) => (
                        <div>
                          <Iconify icon="eva:download-fill" sx={{ mr: 2 }} />
                          Advance Receipt
                        </div>
                      )}
                    </PDFDownloadLink> */}

                    <CustomGrid layout={[12, 6]}>
                      <TextField
                        value={advanceAmt}
                        onChange={(e) => setAdvanceAmt(e.target.value)}
                        name="advanceAmnt"
                        fullWidth
                        label="Enter advance amount"
                      />
                    </CustomGrid>
                    <CustomGrid layout={[12, 6]}>
                      <TextField
                        value={perDayCarCost}
                        onChange={(e) => setPerDayCarCost(e.target.value)}
                        name="perDayCost"
                        fullWidth
                        label="Enter Rent per day"
                      />
                    </CustomGrid>

                    <CustomGrid layout={[12, 4]}>
                      <TextField
                        value={pickupCost}
                        onChange={(e) => setPickupCost(e.target.value)}
                        name="pickupCost"
                        fullWidth
                        label="Enter Pickup Cost"
                      />
                    </CustomGrid>
                    <CustomGrid layout={[12, 4]}>
                      <TextField
                        value={deliveryCost}
                        onChange={(e) => setDeliveryCost(e.target.value)}
                        name="deliveryCost"
                        fullWidth
                        label="Enter Delivery Cost"
                      />
                    </CustomGrid>
                    <CustomGrid layout={[12, 4]}>
                      <TextField
                        value={totalDuration}
                        onChange={(e) => setTotalDuration(e.target.value)}
                        name="totalDuration"
                        fullWidth
                        label="Enter Total Duration in days"
                      />
                    </CustomGrid>
                    <CustomGrid layout={[12, 6]}>
                      <TextField
                        value={minimumKilometer}
                        onChange={(e) => setMinimumKm(e.target.value)}
                        name="minimumKm"
                        fullWidth
                        label="Enter maximum km allowed per day"
                      />
                    </CustomGrid>
                    <CustomGrid layout={[12, 6]}>
                      <TextField
                        value={costAfterMinimumKm}
                        onChange={(e) => setCostAfterMinimumKm(e.target.value)}
                        name="costAfterMinKm"
                        fullWidth
                        label="Enter cost after maximum kilometer"
                      />
                    </CustomGrid>
                  </>
                ) : (
                  <Grid container spacing={2}>
                    {/* Left Side */}
                    <Grid item xs={12} sm={8} md={7}>
                      <Typography className="pb-4" variant="h5">
                        Driver Details
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name="driverName"
                            label="Enter Driver name"
                            value={formData.driverName}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            type="number"
                            name="contactNumber"
                            label="Enter contact number"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            multiline
                            rows={3}
                            name="driverNotes"
                            label="Enter Notes"
                            value={formData.driverNotes}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className="p-3">
                            <Typography variant="h6" gutterBottom>
                              Invoice amount status
                            </Typography>
                            <RadioGroup
                              aria-label="review-choice"
                              name="review-choice"
                              value={amntStatus}
                              row
                              onChange={(e) => setAmntStatus(e.target.value)}
                            >
                              <FormControlLabel value="paid" control={<Radio />} label="Paid" />
                              <FormControlLabel value="unpaid" control={<Radio />} label="Unpaid" />
                            </RadioGroup>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{
                          marginTop: '20px',
                          overflowY: 'auto',
                          maxHeight: '400px',
                        }}
                      >
                        <Typography variant="h5">Totalizer</Typography>
                        {items.map((item, index) => (
                          <Grid container spacing={2} key={index}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                type="text"
                                name="name"
                                value={item.name}
                                label="Name"
                                onChange={(e) => handleInputChange(index, e)}
                                fullWidth
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <div className="flex justify-center items-center gap-2">
                                <TextField
                                  type="number"
                                  name="amount"
                                  value={item.amount}
                                  label="Amount"
                                  onChange={(e) => handleInputChange(index, e)}
                                  fullWidth
                                  margin="normal"
                                />
                                <Tooltip onClick={() => handleRemoveItem(index)} title="Delete">
                                  <IconButton>
                                    <Iconify icon="eva:trash-2-fill" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </Grid>
                          </Grid>
                        ))}
                        <Button variant="contained" onClick={handleAddItem}>
                          Add
                        </Button>
                      </Grid>
                    </Grid>

                    {/* Right Side */}
                    <Grid item xs={12} sm={4} md={5}>
                      <div
                        style={{
                          top: 0,
                          minWidth: '300px',
                          maxHeight: '350px',
                          position: 'sticky',
                          zIndex: 5,
                        }}
                      >
                        <CheckoutSummary
                          invoiceId={invoiceId}
                          formData={formData}
                          subtotal={subtotal}
                          selectedCustomer={selectedCustomer}
                          discount={discount}
                          amntStatus={amntStatus}
                          taxAmount={taxAmount}
                          grandTotal={grandTotal}
                          advanceAmount={advanceAmt}
                          items={items}
                          onEditTax={handleTaxChange}
                          onEditDiscount={handleDiscountChange}
                          onEditAdvance={handleAdvanceChange}
                        />
                      </div>
                    </Grid>
                  </Grid>
                )}
              </>
            )}

            {/* {activeStep === 3 && <>
              <EcommerceInvoice/>
            </>} */}
            <br />
            <CustomGrid layout={[12, 6]}>
              <FormHelperText error>{errors.submit?.message}</FormHelperText>
              <div className="flex w-full mt-20 md:mt-0">
                {!isInvoice && (
                  <Button
                    variant="outlined"
                    style={{ width: '90px', marginRight: '5px' }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Button
                    disabled={CreateBookingMutation.isPending || EditBookingMutation.isPending}
                    variant="contained"
                    startIcon={
                      (CreateBookingMutation.isPending || EditBookingMutation.isPending) && (
                        <CircularProgress size={24} color="inherit" />
                      )
                    }
                    className="w-full bg-[#167C73] flex justify-center  uppercase items-center rounded-xl text-white"
                    style={{
                      height: '50px',
                      flex: 1,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {CreateBookingMutation.isPending || EditBookingMutation.isPending
                      ? 'Loading'
                      : isInvoice
                        ? 'Generate Invoice'
                        : `${!isEdit ? 'Create' : 'Update'} Booking`}
                  </Button>
                ) : (
                  <Button variant="contained" style={{ width: '10px' }} onClick={handleNext}>
                    Next
                  </Button>
                )}
              </div>
            </CustomGrid>
          </>
        </CustomContainerGrid>
      </FormProvider>
    </Container>
  );
}
