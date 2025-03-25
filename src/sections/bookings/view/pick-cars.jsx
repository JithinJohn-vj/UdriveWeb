/* eslint-disable */
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { cars } from 'src/_mock/user';
import { useGetCars } from 'src/api/cars/Queries';

import Scrollbar from 'src/components/scrollbar';
import { CustomGrid } from 'src/components/custom-made';
import NotFound from 'src/components/custom-made/NotFound';
import { RHFTextField, RHFDateTimePicker } from 'src/components/hook-form';

import TableNoData from '../pick-cars/table-no-data';
import UserTableRow from '../pick-cars/user-table-row';
import UserTableHead from '../pick-cars/user-table-head';
import TableEmptyRows from '../pick-cars/table-empty-rows';
import UserTableToolbar from '../pick-cars/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import ItemLoading from 'src/components/custom-made/ItemLoading';

// ----------------------------------------------------------------------

PickCars.propTypes = {
  onRowSelect: PropTypes.func.isRequired,
  selectedCar: PropTypes.object,
  editableData: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default function PickCars({ onRowSelect, selectedCar, editableData, isEdit,previousBooking }) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedItems, setSelectedItems] = useState([selectedCar?.name]);
  const [fromDatee, setFromDate] = useState(null);
  const [runOnce, setRunOnce] = useState(false);
  const [toDatee, setToDate] = useState(null);
  const [filterOnTop, setFilterOnTop] = useState(null);

  console.log(previousBooking)
  console.log(editableData);
  console.log(isEdit);
  useEffect(() => {
    if (isEdit && editableData) {
      setSelected(editableData?.carSelected?.name);
      if (!runOnce) {
        setFilterOnTop(editableData?.carSelected);
        onRowSelect(editableData.carSelected, fromDatee, toDatee);
      } else {
        onRowSelect(editableData.carSelected, fromDatee, toDatee);
        setFilterOnTop(editableData?.carSelected);
        setSelected([]);
      }
    } else {
      // setSelected([]);
      // onRowSelect(null);
      // setFilterOnTop(null);
    }
  }, [isEdit, editableData, fromDatee, toDatee]);
  console.log(filterOnTop);
  console.log(fromDatee);
  console.log(selected);
  console.log(selectedItems);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  useEffect(() => {
    // Update the selectedItems state whenever selectedCar changes
    setSelectedItems([selectedCar?.name]);
  }, [selectedCar]);
  const getCarsQuery = useGetCars();

  console.log(getCarsQuery);
  const handleClick = (event, name, row) => {
    console.log(row);
    let newSelected = [];
    console.log(name);
    const selectedIndex = selected.indexOf(name);
    if (selectedIndex === -1) {
      newSelected = [name];
    } else {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
      row = null;
    }
    console.log(row);
    onRowSelect(row, fromDatee, toDatee);
    console.log(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    console.log(event.target.value)
    setFilterName(event.target.value);
  };

  const [filter, setFilter] = useState([]);

  const handleFromDate = (date) => {
    setRunOnce(true);
    setToDate(null);
    setFilterOnTop(null);
    setFromDate(date);
    onRowSelect(null);
    filterAndShowItems(date, toDatee);
  };

  const handleToDate = (date) => {
    setRunOnce(true);
    setFilterOnTop(null);
    setFromDate(fromDatee);
    setToDate(date);
    onRowSelect(null);
    filterAndShowItems(fromDatee, date);
  };

  // const data = [
  //   {
  //     id: '5b2f912e-9098-4e28-83f0-f1776b928958',
  //     avatarUrl: '/assets/images/avatars/avatar_22.jpg',
  //     name: 'Audi F-150',
  //     company: 'Chrysler',
  //     fuel: 'Electric',
  //     date: new Date('2023-11-29T11:13:20.000Z'),
  //     bookings: [
  //       {
  //         fromDate: '22-04-2024 12:21 PM',
  //         toDate: '23-04-2024 03:21 PM',
  //       },
  //       {
  //         fromDate: '25-04-2024 12:21 PM',
  //         toDate: '28-04-2024 03:21 PM',
  //       },
  //     ],
  //     isVerified: true,
  //     status: 'banned',
  //     role: 'Full Stack Designer',
  //     year: '2030',
  //     transmission: 'Manual',
  //     service_interval: 'every month',
  //   },
  //   {
  //     id: 'f0697599-9ca6-46cd-bc80-e32c370ebd9a',
  //     avatarUrl: '/assets/images/avatars/avatar_21.jpg',
  //     name: 'BMW Camry',
  //     company: 'Audi',
  //     fuel: 'Hybrid',
  //     date: new Date('2025-03-15T16:50:46.000Z'),
  //     bookings: [
  //       {
  //         fromDate: '10-04-2024 12:21 PM',
  //         toDate: '14-04-2024 03:21 PM',
  //       },
  //       {
  //         fromDate: '16-04-2024 12:21 PM',
  //         toDate: '18-04-2024 03:21 PM',
  //       },
  //     ],
  //     isVerified: true,
  //     status: 'banned',
  //     role: 'Project Manager',
  //     year: '2013',
  //     transmission: 'Automatic',
  //     service_interval: 'every 6 months',
  //   },
  // ];

  const filterAndShowItems = (fromDate, toDate) => {
    console.log(fromDate);
    console.log(toDate);
    const filteredData = getCarsQuery.data.filter((car) => {
      // Check if the car has any bookings
      if (car.bookings && car.bookings.length > 0) {
        // Check each booking for its date range
        for (const booking of car.bookings) {
          const bookingFromDate = dayjs(booking.fromDate, 'DD-MM-YYYY hh:mm A');
          const bookingToDate = dayjs(booking.toDate, 'DD-MM-YYYY hh:mm A');
          // If the booking range overlaps with the selected date range, exclude this car
          if (
            (bookingFromDate.isBefore(toDate) || bookingFromDate.isSame(toDate)) &&
            (bookingToDate.isAfter(fromDate) || bookingToDate.isSame(fromDate))
          ) {
            return false; // Exclude this car
          }
        }
      }

      // If no bookings or none of the bookings overlap with the selected date range, include this car
      return true;
    });
    console.log(filteredData);
    setFilter(filteredData);
  };

  useEffect(() => {
    console.log(fromDatee);
    console.log(toDatee);
    if (getCarsQuery.status === 'success') {
      if (isEdit && editableData) {
        const to = dayjs(editableData.toDate, 'DD-MM-YYYY hh:mm A');
        const frm = dayjs(editableData.fromDate, 'DD-MM-YYYY hh:mm A');
        console.log(to);
        filterAndShowItems(frm, to);
      } else {
        filterAndShowItems(fromDatee, toDatee);
      }
    } else {
      console.log('first');
      setFilter([]);
    }
    // eslint-disable-next-line
  }, [isEdit, editableData, getCarsQuery.status === 'success']);

  const dataFiltered = applyFilter({
    inputData: getCarsQuery.isSuccess ? getCarsQuery.data : [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  console.log(dataFiltered)
  

  const notFound = !dataFiltered.length && !!filterName;
  console.log(filterOnTop);
  return (
    <>
       { isEdit && previousBooking &&
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[95%] mx-auto my-5 border-2">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Previous Booking Details</h2>
  <div className='grid md:grid-cols-2 lg:grid-cols-3 md:gap-6'>

<div className=''>
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-700">Trip Duration</h3>
    <p className="text-gray-600">
      {previousBooking?.fromDate}
    </p>
    <p className="text-gray-600">
    {previousBooking?.toDate}
    </p>
  </div>
  
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-700">Route</h3>
    <p className="text-gray-600">
      <span className="font-medium">Delivery Location : </span> {previousBooking?.dropPoint} <br />
      <span className="font-medium">Pickup Location:</span> {previousBooking?.pickupPoint} 
    </p>
  </div>

</div>
  
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-700">Vehicle Details</h3>
    <p className="text-gray-600">
      <span className="font-medium">Name:</span> {previousBooking?.carSelected?.name} <br />
      <span className="font-medium">Company:</span> {previousBooking?.carSelected?.manufacturingCompany} <br />
      <span className="font-medium">Year:</span> {previousBooking?.carSelected?.yearOfManufacturing} <br />
      <span className="font-medium">Fuel Type:</span> {previousBooking?.carSelected?.fuelType} <br />
      <span className="font-medium">Transmission:</span> {previousBooking?.carSelected?.transmission} <br />
      <span className="font-medium">Vehicle Number:</span> {previousBooking?.carSelected?.vehicleNumber}
    </p>
  </div>
  
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-700">Customer Details</h3>
    <p className="text-gray-600">
      <span className="font-medium">Name:</span> {previousBooking?.customerSelected?.name} <br />
      <span className="font-medium">Contact:</span> {previousBooking?.customerSelected?.contactNumber} <br />
      <span className="font-medium">Email:</span> {previousBooking?.customerSelected?.email} <br />
      <span className="font-medium">Location:</span> {previousBooking?.customerSelected?.cityOrDistrict}, {previousBooking?.customerSelected?.state}
    </p>
  </div>
  </div>

</div>
      }
      <CustomGrid layout={[12, 6]}>
        
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
      </CustomGrid>

      <CustomGrid layout={[12, 6]}>
        <RHFTextField name="dropPoint" label="Delivery Location" />
      </CustomGrid>

      <CustomGrid layout={[12, 6]}>
        <RHFTextField name="pickupPoint" label="Pickup Location" />
      </CustomGrid>
   




      <Container className=" p-3 rouned-xl mt-3">
        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={cars.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'transmission', label: 'Transmission' },
                    { id: 'serviceInterval', label: 'Service Interval' },
                    { id: 'lastServiceOn', label: 'Last Service' },
                    { id: 'insuranceDueDate', label: 'Insurance Due' },
                  ]}
                />
                {getCarsQuery.isLoading ? (
                  <ItemLoading />
                ) : (
                  <TableBody>
                    {dataFiltered.length === 0 && !filterOnTop ? (
                      <NotFound er1="No cars Found" er2="Try checking other dates instead" />
                    ) : (
                      <>
                        {filterOnTop && (
                          <>
                            <UserTableRow
                              key={filterOnTop._id}
                              id={filterOnTop._id}
                              name={filterOnTop.name}
                              company={filterOnTop.manufacturingCompany}
                              year={filterOnTop.vehicleNumber}
                              fuel={filterOnTop.fuelType}
                              transmission={filterOnTop.transmission}
                              insurance={filterOnTop.insurance}
                              lastService={filterOnTop.lastService}
                              service_interval={filterOnTop.serviceInterval}
                              selected={selected.indexOf(filterOnTop.name) !== -1}
                              handleClick={(event) =>
                                handleClick(event, filterOnTop.name, filterOnTop)
                              }
                            />
                          </>
                        )}
                        {dataFiltered
                          .filter((item) => item._id !== filterOnTop?._id)
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <UserTableRow
                              picture={row.carImage?.url}
                              key={row._id}
                              id={row._id}
                              name={row.name}
                              company={row.manufacturingCompany}
                              year={row.vehicleNumber}
                              fuel={row.fuelType}
                              transmission={row.transmission}
                              insurance={row.insurance}
                              lastService={row.lastService}
                              service_interval={row.serviceInterval}
                              selected={selected.indexOf(row.name) !== -1}
                              handleClick={(event) => handleClick(event, row.name, row)}
                            />
                          ))}
                      </>
                    )}

                    <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(page, rowsPerPage, filter?.length)}
                    />
                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={filter?.length ? filter?.length : 0}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
