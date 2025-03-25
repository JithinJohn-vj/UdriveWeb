/* eslint-disable */
import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
import { useGetAllBookings, useGetBookingInvoiceNotGenerated } from 'src/api/bookings/Queries';
import { useDeleteMultipleBookings } from 'src/api/bookings/Mutations';

import Scrollbar from 'src/components/scrollbar';
import NotFound from 'src/components/custom-made/NotFound';
import ItemLoading from 'src/components/custom-made/ItemLoading';
import MultipleDeleteModal from 'src/components/custom-made/MutipleDeleteModal';
import { deleteMultipleBookingsMessage } from 'src/components/messages/CustomModalMessages';

import { TableHead, TableNoData, TableToolbar, TableEmptyRows } from 'src/sections/commons';

import { applyFilter } from '../utils';
import BookingTableRow from '../user-table-row';
import { emptyRows, getComparator } from '../../commons/utils';
import { Button, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { AdvancePDF } from '../invoice';

// ----------------------------------------------------------------------

export default function CustomersList() {
  const getAllBookingsQuery = useGetAllBookings();
  const deleteMultipleBookingMutation = useDeleteMultipleBookings();
  console.log(getAllBookingsQuery);
  const unGeneratedInvoiceBookings = useGetBookingInvoiceNotGenerated();
  console.log(unGeneratedInvoiceBookings);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterOption, setFilterOption] = useState('all'); // Assuming initial filter option is 'all'

  const handleChange = (event, newValue) => {
    // Set the filter option based on the selected tab
    switch (newValue) {
      case '1':
        setFilterOption('all');
        break;
      case '2':
        setFilterOption('upcoming');
        break;
      case '3':
        setFilterOption('ongoing');
        break;
      case '4':
        setFilterOption('ungenratedInvoices');
        break;
      case '5':
        setFilterOption('completed');
        break;
      default:
        setFilterOption('all');
    }
  };
  const applyFilterOption = (data) => {
    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      return new Date(year, month, day, hours, minutes, seconds);
    };

    const currentDateTime = getCurrentDateTime();

    switch (filterOption) {
      case 'upcoming':
        // Filter upcoming bookings
        const upcomingBookings = data.filter((booking) => {
          const fromDate = parseDate(booking.fromDate);
          return fromDate > currentDateTime;
        });

        // Sort upcoming bookings by fromDate
        upcomingBookings.sort((a, b) => {
          const fromDateA = parseDate(a.fromDate);
          const fromDateB = parseDate(b.fromDate);
          return fromDateA - fromDateB;
        });

        return upcomingBookings;

      case 'ongoing':
        return data.filter((booking) => {
          const fromDate = parseDate(booking.fromDate);
          const toDate = parseDate(booking.toDate);
          return fromDate <= currentDateTime && toDate >= currentDateTime;
        });

      case 'completed':
        return data.filter((booking) => {
          const toDate = parseDate(booking.toDate);
          return toDate < currentDateTime;
        });

      case 'ungenratedInvoices':
        return unGeneratedInvoiceBookings.data;

      case 'all':
        // Sort all bookings by fromDate
        const allBookings = [...data];
        allBookings.sort((a, b) => {
          const fromDateA = parseDate(a.fromDate);
          const fromDateB = parseDate(b.fromDate);
          return fromDateB - fromDateA;
        });

        return allBookings;
      default:
        return data;
    }
  };

  const parseDate = (dateString) => {
    // Split the date string into parts
    const parts = dateString.split(' ');
    const datePart = parts[0];
    const timePart = parts[1] + ' ' + parts[2]; // Join time and AM/PM

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

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      let newSelecteds;
      if (selected.length === getAllBookingsQuery?.data?.length) {
        setSelected([]);
      } else {
        if (getAllBookingsQuery.isSuccess) {
          newSelecteds = getAllBookingsQuery.data.map((n) => n._id);
        } else {
          newSelecteds = [];
        }
        setSelected(newSelecteds);
      }
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id);
    }
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
    console.log(event.target.value);
    setPage(0);
    setFilterName(event.target.value);
  };
  console.log(filterName);
  const dataFiltered = applyFilter({
    inputData: getAllBookingsQuery.isSuccess ? getAllBookingsQuery.data : [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDelete = (selectedItems) => {
    MultipleDeleteModal(
      () => deleteMultipleBookingMutation.mutate(selectedItems),
      deleteMultipleBookingsMessage,
      selectedItems
    );
    setSelected([]);
  };

  return (
    <Container>
      <Card>
        <TableToolbar
          selected={selected}
          filterName={filterName}
          onDelete={handleDelete}
          onFilterName={handleFilterByName}
        >
          {/* Filter buttons */}
        </TableToolbar>
        <TabContext value={filterOption}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="All"
              value="1"
              sx={{ backgroundColor: filterOption === 'all' ? '#59c5b9' : '' }}
            />
            <Tab
              label="Upcoming"
              value="2"
              sx={{ backgroundColor: filterOption === 'upcoming' ? '#59c5b9' : '' }}
            />
            <Tab
              label="Ongoing"
              value="3"
              sx={{ backgroundColor: filterOption === 'ongoing' ? '#59c5b9' : '' }}
            />
            <Tab
              label="Ungenrated Invoices"
              value="4"
              sx={{ backgroundColor: filterOption === 'ungenratedInvoices' ? '#59c5b9' : '' }}
            />

            <Tab
              label="Completed"
              value="5"
              sx={{ backgroundColor: filterOption === 'completed' ? '#59c5b9' : '' }}
            />
          </TabList>
        </TabContext>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              {filterOption === 'completed' ? (
                <TableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'bookingDate', label: 'Booking Date', minWidth: 150 },
                    { id: 'tripdetails', label: 'Kms before trip', minWidth: 200 },
                    { id: 'tripdils', label: 'Kms After trip', minWidth: 200 },
                    { id: 'invoice', label: 'Generate invoice', minWidth: 150 },
                    { id: 'userdetails', label: 'Customer Details', minWidth: 150 },
                    { id: 'location', label: 'Car details', minWidth: 150 },
                    { id: 'pickup', label: 'Pickup Point', minWidth: 150 },
                    { id: 'drop', label: 'Delivery Point', minWidth: 150 },
                    { id: 'amt', label: 'Amount', minWidth: 150 },
                    { id: 'status', label: 'Status', minWidth: 150 },
                    { id: '' },
                  ]}
                />
              ) : (
                <>
                  {filterOption === 'ungenratedInvoices' ? (
                    <TableHead
                      order={order}
                      orderBy={orderBy}
                      rowCount={users.length}
                      numSelected={selected.length}
                      onRequestSort={handleSort}
                      onSelectAllClick={handleSelectAllClick}
                      headLabel={[
                        { id: 'invoice', label: 'Generate invoice', minWidth: 150 },
                        { id: 'bookingate', label: 'Booking Date', minWidth: 150 },
                        { id: 'userdetails', label: 'Customer Details', minWidth: 150 },
                        { id: 'location', label: 'Car details', minWidth: 150 },
                        { id: 'pickup', label: 'Pickup Point', minWidth: 150 },
                        { id: 'drop', label: 'Delivery Point', minWidth: 150 },
                        { id: 'amt', label: 'Amount', minWidth: 150 },
                        { id: 'status', label: 'Status', minWidth: 150 },
                        { id: '' },
                      ]}
                    />
                  ) : (
                    <TableHead
                      order={order}
                      orderBy={orderBy}
                      rowCount={users.length}
                      numSelected={selected.length}
                      onRequestSort={handleSort}
                      onSelectAllClick={handleSelectAllClick}
                      headLabel={[
                        { id: 'bookingDate', label: 'Booking Date', minWidth: 150 },
                        { id: 'userdetails', label: 'Customer Details', minWidth: 150 },
                        { id: 'location', label: 'Car details', minWidth: 150 },
                        { id: 'drop', label: 'Delivery Point', minWidth: 150 },
                        { id: 'pickup', label: 'Pickup Point', minWidth: 150 },
                        { id: 'amt', label: 'Amount', minWidth: 150 },
                        { id: 'status', label: 'Status', minWidth: 150 },
                        { id: '' },
                      ]}
                    />
                  )}
                </>
              )}

              {getAllBookingsQuery.isLoading ? (
                <ItemLoading />
              ) : (
                <TableBody>
                  {applyFilterOption(dataFiltered).length === 0 && !filterName ? (
                    <NotFound
                      er1="No bookings Found"
                      er2="Create new Bookings to populate over here"
                    />
                  ) : (
                    applyFilterOption(dataFiltered)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <BookingTableRow
                          key={row._id}
                          filterOption={filterOption}
                          id={row._id}
                          payment={row.payment}
                          costAfterMinimumKm={row.costAfterMinimumKm}
                          minimumKilometer={row.minimumKilometer}
                          pickupCost={row.pickupCost}
                          deliveryCost={row.deliveryCost}
                          driver={row.driver}
                          costPerDay={row.costPerDay}
                          employee={row.employee}
                          advancePaid={row.advancePaid}
                          invoiceGenerated={row.invoiceGenerated}
                          advanceAmount={row.advanceAmount}
                          invoiceId={row.invoiceId}
                          fromDate={row.fromDate}
                          formdata={row.driver}
                          toDate={row.toDate}
                          kmBeforeTrip={row.kmBeforeTrip}
                          discount={row.discount}
                          tax={row.tax}
                          totalDuration={row.totalDuration}
                          pickupPoint={row.pickupPoint}
                          dropPoint={row.dropPoint}
                          carSelected={row.carSelected}
                          customerSelected={row.customerSelected}
                          subTotals={row.subTotals}
                          isKilometreUpdated={row.isKilometreUpdated}
                          total={row.total}
                          status={row.status}
                          invoiceDetails={row.invoiceDetails}
                          selected={selected.includes(row._id)}
                          handleClick={(event) => handleClick(event, row._id)}
                        />
                      ))
                  )}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
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
          count={getAllBookingsQuery?.data?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
