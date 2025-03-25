/* eslint-disable */

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React, { useState, useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import {
  Button,
  Dialog,
  Container,
  TextField,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';

import { useGetEvents } from 'src/api/calendar/Queries';
import { useEditEvent, useCreateEvent, useDeleteEvent } from 'src/api/calendar/Mutations';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { useGetAllBookings } from 'src/api/bookings/Queries';
import {
  CustomformatDate,
  formatSuffixDate,
  formatToMDY,
  formatToYMD,
} from 'src/components/format-changer/FormatChnager';
import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import dayjs from 'dayjs';
import { useGetAvailableCarsForCalender, useGetCarActivities } from 'src/api/cars/Queries';
import ItemLoading from 'src/components/custom-made/ItemLoading';

export default function Home() {
  const navIconsDualtonned = NavIconsDualtonned();
  const addEventMutation = useCreateEvent();
  const getAllEventsQuery = useGetAllBookings();
  const deleteEventMutation = useDeleteEvent();
  const editEventMutation = useEditEvent();
  const [clickedDate, setClickedDate] = useState('');
  const [dateForApi, setDateForApi] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  console.log(allEvents);
  const [showModal, setShowModal] = useState(false);
  const [showCarDetails, setShowCarDetails] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    id: 0,
  });
  // start: '2024-04-10T16:29',
  // end: '2024-04-14T16:29'

  const [showToDates, setShowToDates] = useState(false);

  // Function to toggle showToDates for a specific index
  const toggleToDate = () => {
    setShowToDates(!showToDates);
  };

  useEffect(() => {
    if (getAllEventsQuery.status === 'success') {
      console.log(getAllEventsQuery);
      const formattedEvents = getAllEventsQuery.data.map((event) => ({
        id: event._id,
        title: `${event.pickupPoint}-${event.dropPoint}`,
        start: formatToYMD(event.fromDate),
        fromDate: event.fromDate,
        toDate: event.toDate,
        end: formatToYMD(event.toDate),
        pickupPoint: event.pickupPoint,
        dropPoint: event.dropPoint,
        carSelected: event.carSelected,
        customerSelected: event.customerSelected,
        employee: event.employee,
        subTotals: event.subTotals,
        total: event.total,
        discount: event.discount,
        status: event.status,
        advanceAmount: event.advanceAmount,
        tax: event.tax,
        invoiceId: event.invoiceId,
        invoiceDetails: event.invoiceDetails,
        isDeleted: event.isDeleted,
        driver: event.driver,
      }));
      console.log(formattedEvents);
      setAllEvents(formattedEvents);
    }
  }, [getAllEventsQuery.status]);

  console.log(allEvents);

  const availableCarsQuery = useGetAvailableCarsForCalender(dateForApi);
  const carActivities = useGetCarActivities(dateForApi);
  console.log(carActivities);
  console.log(availableCarsQuery);
  function handleDateClick(arg) {
    function convertDate(dateStr) {
      const parts = dateStr.split('-');

      const year = parts[0];
      const month = parts[1];
      const day = parts[2];

      return `${day}-${month}-${year}`;
    }
    const inputDate = arg.dateStr;
    setDateForApi(inputDate);
    const convertedDate = convertDate(inputDate);
    console.log(convertedDate);
    setClickedDate(convertedDate);
    console.log(availableCarsQuery);

    setShowCarDetails(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      end: '',
      id: 0,
    });
  }

  const handleChange = (e) => {
    console.log(e);
    const { id, value } = e.target;
    console.log(id);
    console.log(value);
    if (id === 'start') {
      setNewEvent({
        ...newEvent,
        start: value,
      });
    } else if (id === 'end') {
      // Add one day to the end date
      console.log(value);
      const endDate = new Date(value);
      endDate.setDate(endDate.getDate() + 1);
      console.log(endDate);
      setNewEvent({
        ...newEvent,
        end: value,
      });
      console.log(newEvent);
    } else {
      setNewEvent({
        ...newEvent,
        title: value,
      });
    }
  };

  function handleSubmit(e, action) {
    e.preventDefault();
    const event = {
      id: newEvent.id,
      title: newEvent.title,
      startDate: newEvent.start,
      endDate: newEvent.end,
    };
    if (action === 'create') {
      addEventMutation.mutate(event, {
        onSuccess: (res) => {
          console.log(res);
          console.log(res.data);
          console.log(newEvent);
          const m = {
            title: res.data.title,
            start: res.data.startDate,
            end: res.data.endDate,
            id: res.data._id,
          };
          setAllEvents([...allEvents, m]);
          setShowModal(false);
          setNewEvent({
            title: '',
            start: '',
            end: '',
            id: 0,
          });
        },
      });
    } else if (action === 'save') {
      editEventMutation.mutate(event, {
        onSuccess: () => {
          const updatedEvents = allEvents.map((evt) => (evt.id === newEvent.id ? newEvent : evt));
          setAllEvents(updatedEvents);
          setShowModal(false);
        },
      });
    }
  }

  function handleEventClick(data) {
    console.log(data);
    const clickedEvent = allEvents.find((event) => event.id === data.event.id);
    if (clickedEvent) {
      console.log(clickedEvent);
      setNewEvent(clickedEvent);
    } else {
      setNewEvent({
        ...newEvent,
        start: data.date,
        id: new Date().getTime(),
      });
    }
    setShowModal(true);
  }

  function handleDeleteEvent() {
    deleteEventMutation.mutate(newEvent.id, {
      onSuccess: () => {
        setAllEvents(allEvents.filter((event) => event.id !== newEvent.id));
        setShowModal(false);
        setNewEvent({
          title: '',
          start: '',
          end: '',
          id: 0,
        });
      },
    });
  }
  const parseDateString = (dateString) => {
    // Split the date string into parts
    const parts = dateString.split(' ');
    const datePart = parts[0];
    const timePart = `${parts[1]} ${parts[2]}`; // Join time and AM/PM

    // Split the date part into day, month, and year
    const dateParts = datePart.split('-');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-based in JavaScript
    const year = parseInt(dateParts[2]);

    // Split the time part into hours and minutes
    const timeParts = timePart.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    // Adjust hours for PM if necessary
    if (parts[2] === 'PM' && hours !== 12) {
      hours += 12;
    }

    // Create a new Date object with the parsed values
    return new Date(year, month, day, hours, minutes);
  };
  // Get the current date
  const currentDate = new Date(dateForApi);
console.log(currentDate)
  // Find the first booking greater than the current date

  return (
    <Container>
      <div className="grid grid-cols-10">
        <div className="col-span-10 ">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={allEvents}
            nowIndicator
            displayEventTime={false}
            editable
            droppable
            selectable
            selectMirror
            dateClick={handleDateClick}
            eventClick={(data) => handleEventClick(data)}
          />
        </div>
      </div>

      <Container>
        <Dialog
          maxWidth="lg"
          fullWidth={true}
          open={showModal}
          // onClick={() => setShowModal(!showModal)}
        >
          <DialogTitle className="bg-[#59c5b9] text-white  rounded">
            Booking Detailed view
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setShowModal(!showModal)}
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
                                {newEvent.pickupPoint}
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
                                {newEvent.dropPoint}
                              </p>
                            </div>
                          </div>
                          <div className=" justify-center items-center">
                            <p className="text-gray-400 mt-5 mb-1">Duration of rent</p>
                            <div className="flex justify-center items-center mt-2">
                              <Typography className="text-xl" variant="overline">
                                {' '}
                                <span className="text-lg">[{newEvent.fromDate}] </span>
                              </Typography>
                              <Typography className="text-xl" variant="overline">
                                {' '}
                                <span className="text-lg"> - [{newEvent.toDate}]</span>
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
                              {newEvent.carSelected?.name}
                            </Typography>
                            <Typography className="text-2xl mt-2 text-center " variant="overline">
                              {newEvent.carSelected?.manufacturingCompany}
                            </Typography>
                            <Typography className="text-2xl mt-2 text-center" variant="overline">
                              {newEvent.carSelected?.vehicleNumber}
                            </Typography>
                            <Typography className="text-2xl mt-2 text-center" variant="overline">
                              Insurance :
                              <br />
                              {CustomformatDate(newEvent.carSelected?.insurance)}
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
                              {newEvent.customerSelected?.name}
                            </Typography>
                            <Typography className="text mt-2" variant="caption">
                              <p
                                className="text-sm"
                                style={{ maxWidth: '130px', wordWrap: 'break-word' }}
                              >
                                {newEvent.customerSelected?.email}
                              </p>
                            </Typography>
                            <Typography className="text-2xl mt-2" variant="overline">
                              pincode :
                              <br />
                              {newEvent.customerSelected?.pincode}
                            </Typography>
                            <Typography
                              className="text-2xl mt-2 flex justify-center items-center"
                              variant="overline"
                            >
                              {newEvent.customerSelected?.contactNumber}
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
                              From date : <span className="text-lg">{newEvent.fromDate}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              To date : <span className="text-lg">{newEvent.fromDate}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Total amount : <span className="text-lg">₹{newEvent.total}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Discount given : <span className="text-lg">₹{newEvent.discount}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Tax : <span className="text-lg">₹{newEvent.tax}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Booking status : <span className="text-lg">{newEvent.status}</span>
                            </Typography>
                          </div>
                        </Grid>
                        <Grid className="px-4 pt-4 pb-3" item xs={12} md={12}>
                          {newEvent.driver && (
                            <>
                              <Typography className="text-lg uppercase mb-5 underline" variant="">
                                Driver Details
                              </Typography>
                              <br />
                              <div className="mt-4 space-y-3">
                                <Typography variant="subtitle1 mb-4">
                                  Name: {newEvent?.driver?.driverName}
                                </Typography>
                                <Typography variant="subtitle1">
                                  Contact-: {newEvent?.driver?.contactNumber}
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
                            {newEvent?.invoiceDetails.map((m, index) => (
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
                              <p className="w-[300px] px-2 py-1">₹ {newEvent.subTotals}</p>
                            </div>
                            <div className="flex even:bg-gray-500">
                              <p
                                style={{ wordWrap: 'break-word' }}
                                className="w-[300px] border-r px-2 py-1 font-semibold"
                              >
                                Advance
                              </p>
                              <p className="w-[300px] px-2 py-1">₹ -{newEvent.advanceAmount}</p>
                            </div>
                            <div className="flex bg-gray-400">
                              <p
                                style={{ wordWrap: 'break-word' }}
                                className="w-[300px] border-r px-2 py-1 font-semibold"
                              >
                                Total
                              </p>
                              <p className="w-[300px] px-2 py-1">₹ {newEvent.total}</p>
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
                            src={newEvent.carSelected?.carImage?.url}
                          />
                          <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                            <Typography className="text-2xl" variant="subtitle2">
                              Name: <span className="text-lg">{newEvent.carSelected.name}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Vehicle Number :
                              <span className="text-lg">{newEvent.carSelected?.vehicleNumber}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Manufacturing Company :
                              <span className="text-lg">
                                {newEvent.carSelected.manufacturingCompany}
                              </span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              year Of Manufacturing :{' '}
                              <span className="text-lg">
                                {newEvent.carSelected?.yearOfManufacturing}
                              </span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Fuel Type{' '}
                              <span className="text-lg">{newEvent.carSelected?.fuelType}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Transmission :{' '}
                              <span className="text-lg">{newEvent.carSelected.transmission}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Insurance :{' '}
                              <span className="text-lg">{newEvent.carSelected?.insurance}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              lastService :{' '}
                              <span className="text-lg">{newEvent.carSelected?.lastService}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              serviceInterval :{' '}
                              <span className="text-lg">
                                {newEvent.carSelected.serviceInterval}
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
                            src={newEvent?.customerSelected?.customerImage?.url}
                          />
                          <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                            <Typography className="text-2xl" variant="subtitle2">
                              Name:{' '}
                              <span className="text-lg">{newEvent.customerSelected.name}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Contact Number :{' '}
                              <span className="text-lg">
                                {newEvent.customerSelected.contactNumber}
                              </span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Email :{' '}
                              <span className="text-lg">{newEvent.customerSelected.email}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Passport Number :{' '}
                              <span className="text-lg">
                                {newEvent.customerSelected.passportNumber}
                              </span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Pincode :{' '}
                              <span className="text-lg">{newEvent.customerSelected.pincode}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              State :{' '}
                              <span className="text-lg">{newEvent.customerSelected.state}</span>
                            </Typography>
                            <Typography
                              style={{ maxWidth: 'full', wordWrap: 'break-word' }}
                              className="text-2xl"
                              variant="subtitle2"
                            >
                              Address :{' '}
                              <span className="text-lg">{newEvent.customerSelected.address}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Locality :{' '}
                              <span className="text-lg">{newEvent.customerSelected.locality}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              City/District :{' '}
                              <span className="text-lg">
                                {newEvent.customerSelected.cityOrDistrict}
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
                            src={newEvent.employee?.employeeImage?.url}
                          />
                          <div className="grid md:grid-cols-3 mt-2 space-y-2 pb-4">
                            <Typography className="text-2xl" variant="subtitle2">
                              Name:
                              <span className="text-lg">{newEvent.employee?.name}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Email :<span className="text-lg">{newEvent.employee?.email}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              username :{' '}
                              <span className="text-lg">{newEvent.employee?.userName}</span>
                            </Typography>

                            <Typography className="text-2xl" variant="subtitle2">
                              Role : <span className="text-lg">{newEvent.employee?.role}</span>
                            </Typography>
                            <Typography className="text-2xl" variant="subtitle2">
                              Blocked :{' '}
                              <span className="text-lg">
                                {newEvent.employee?.isBlocked ? 'yes' : 'no'}
                              </span>
                            </Typography>
                            <Typography className="text-2xl " variant="subtitle2">
                              Access Given :
                              {newEvent.employee?.access?.map((m) => (
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

              <Button onClick={() => setShowModal(!showModal)} color="primary">
                Close
              </Button>
            </div>
          </div>
        </Dialog>
      </Container>

      <Container>
        <Dialog
          maxWidth="lg"
          fullWidth={true}
          open={showCarDetails}
          // onClick={() => setShowModal(!showModal)}
        >
          <DialogTitle className="bg-[#59c5b9] text-white  rounded">
            Car availablity for {clickedDate}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setShowCarDetails(!showCarDetails)}
            sx={{
              position: 'absolute',
              right: 10,
              top: 5,
              color: 'white',
            }}
          >
            <Iconify icon="fa:close" width="96" height="96" />
          </IconButton>
          <div className=" text-2xl lg:w-[950px]   font-bold mx-auto p-1 ">Cars available</div>
          {availableCarsQuery?.data?.length > 0 ? (
            <>
              {availableCarsQuery?.data?.map((m) => {
                const nextBooking = m.bookings.find((booking) => {
                  const bookingDate = parseDateString(booking.fromDate);
                  // Check if booking date is greater than current date
                  if (bookingDate > currentDate) {
                    return true;
                  }
                  // If booking date is equal to current date, check time
                  if (bookingDate.getTime() === currentDate.getTime()) {
                    const bookingTime = bookingDate.getHours() * 60 + bookingDate.getMinutes();
                    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
                    // Return true if booking time is greater than current time
                    return bookingTime > currentTime;
                  }
                  return false;
                });

                return (
                  <div key={m.id}>
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 950,
                        bgcolor: 'background.paper',
                        margin: 'auto',
                        marginBottom: '3px',
                      }}
                    >
                      <div className="flex md:grid md:grid-cols-2  flex-col justify-center items-center mx-auto">
                        <div className="flex justify-center items-center gap-2">
                          <Avatar
                            style={{ width: 140, height: 80 }}
                            className=""
                            variant="square"
                            alt="Remy Sharp"
                            src={m.carImage?.url}
                          />
                          <div className="w-full text-xl font-bold">
                            {`${m.manufacturingCompany} - ${m.name}`}
                          </div>
                        </div>

                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <div className="md:flex justify-between items-center flex-1  gap-2 ml-1">
                            <ul className="border-r pr-2 ">
                              <li>Insurance-{CustomformatDate(m.insurance)}</li>
                              <li>Pollution-{CustomformatDate(m.pollution)}</li>
                            </ul>
                            <ul className="border-r pr-2">
                              <li>Year: {m.yearOfManufacturing}</li>
                              <li>Fuel: {m.fuelType}</li>
                            </ul>
                            <ul className="border-r pr-2">
                              <li>
                                {nextBooking ? (
                                  <>
                                    Free till
                                    <p className="font-bold text-sm">
                                      {formatSuffixDate(nextBooking.fromDate)}
                                    </p>
                                  </>
                                ) : (
                                  'No upcoming bookings'
                                )}
                              </li>
                            </ul>
                          </div>
                        </Typography>
                      </div>
                      <Divider variant="inset" component="li" />
                    </List>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {availableCarsQuery.isLoading ? (
                <div className="w-full flex justify-center items-center">
                  <ItemLoading />
                </div>
              ) : (
                <Typography variant="h6" sx={{ mt: 3, textAlign: 'center', width: '100%' }}>
                  No results found
                </Typography>
              )}
            </>
          )}

          <div className=" text-2xl lg:w-[950px]   font-bold mx-auto p-1 ">Delivery today</div>
          {carActivities?.data?.pickupCars.length > 0 ? (
            <>
              {carActivities?.data?.pickupCars?.map((m) => (
                <div>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 950,
                      bgcolor: 'background.paper',
                      margin: 'auto',
                    }}
                  >
                    <div className="flex md:grid md:grid-cols-2  flex-col justify-center items-center mx-auto">
                      <div className="flex justify-center items-center gap-2">
                        <Avatar
                          style={{ width: 140, height: 80 }}
                          className=""
                          variant="square"
                          alt="Remy Sharp"
                          src={m.car?.carImage?.url}
                        />
                        <div className="w-full text-xl font-bold">
                          {`${m.car?.manufacturingCompany} - ${m.car?.name}`}
                        </div>
                      </div>

                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <div className="md:flex justify-between items-center flex-1  gap-2 ml-1">
                          <ul className="border-r pr-2 ">
                            <li>Insurance-{CustomformatDate(m.car?.insurance)}</li>
                            <li>Pollution-{CustomformatDate(m.car?.pollution)}</li>
                          </ul>
                          <ul className="border-r pr-2">
                            <li>Year: {m.car?.yearOfManufacturing}</li>
                            <li>Fuel: {m.car?.fuelType}</li>
                          </ul>
                          <ul className="border-r pr-2">
                            <li>Pickup:{m.fromDate}</li>
                            <li>Drop:{m.toDate}</li>
                          </ul>
                        </div>
                      </Typography>
                    </div>
                    <Divider variant="inset" component="li" />
                  </List>
                </div>
              ))}
            </>
          ) : (
            <>
              {!carActivities?.data?.pickupCars?.length&&
                <Typography variant="h6" sx={{ mt: 3, mb: 3, textAlign: 'center', width: '100%' }}>
                  No results found
                </Typography>
              }
            </>
          )}

          <div className=" text-2xl lg:w-[950px]   font-bold mx-auto p-1 ">Pick up today</div>

          {carActivities?.data?.deliveryCars?.length > 0 ? (
            <>
              {carActivities?.data?.deliveryCars?.map((m) => (
                 <div>
                 <List
                   sx={{
                     width: '100%',
                     maxWidth: 950,
                     bgcolor: 'background.paper',
                     margin: 'auto',
                   }}
                 >
                   <div className="flex md:grid md:grid-cols-2  flex-col justify-center items-center mx-auto">
                     <div className="flex justify-center items-center gap-2">
                       <Avatar
                         style={{ width: 140, height: 80 }}
                         className=""
                         variant="square"
                         alt="Remy Sharp"
                         src={m.car?.carImage?.url}
                       />
                       <div className="w-full text-xl font-bold">
                         {`${m.car?.manufacturingCompany} - ${m.car?.name}`}
                       </div>
                     </div>

                     <Typography
                       sx={{ display: 'inline' }}
                       component="span"
                       variant="body2"
                       color="text.primary"
                     >
                       <div className="md:flex justify-between items-center flex-1  gap-2 ml-1">
                         <ul className="border-r pr-2 ">
                           <li>Insurance-{CustomformatDate(m.car?.insurance)}</li>
                           <li>Pollution-{CustomformatDate(m.car?.pollution)}</li>
                         </ul>
                         <ul className="border-r pr-2">
                           <li>Year: {m.car?.yearOfManufacturing}</li>
                           <li>Fuel: {m.car?.fuelType}</li>
                         </ul>
                         <ul className="border-r pr-2">
                           <li>Pickup:{m.fromDate}</li>
                           <li>Drop:{m.toDate}</li>
                         </ul>
                       </div>
                     </Typography>
                   </div>
                   <Divider variant="inset" component="li" />
                 </List>
               </div>
              ))}
            </>
          ) : (
            <>
             {!carActivities?.data?.deliveryCars?.length&&
                <Typography variant="h6" sx={{ mt: 3, mb: 3, textAlign: 'center', width: '100%' }}>
                  No results found
                </Typography>
              }
            </>
          )}

          <div className="flex justify-between p-5 px-7">
            <div>
              <Button color="secondary"></Button>
            </div>
            <div>
              <Button color="primary"></Button>

              <Button onClick={() => setShowCarDetails(!showCarDetails)} color="primary">
                Close
              </Button>
            </div>
          </div>
        </Dialog>
      </Container>
    </Container>
  );
}
