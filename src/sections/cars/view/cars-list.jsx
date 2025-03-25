/* eslint-disable */
import { useState } from 'react';

import { Tab } from '@mui/material';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { TabList, TabContext } from '@mui/lab';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
import { useDeleteMultipleCars } from 'src/api/cars/Mutations';
import {
  useGetCars,
  useGetCarsInsuranceOverDue,
  useGetCarsOnRun,
  useGetCarsOnYard,
  useGetCarsPollutionOverDue,
  useGetCarsServiceDue,
  useGetCarsServiceOverDue,
} from 'src/api/cars/Queries';

import Scrollbar from 'src/components/scrollbar';
import NotFound from 'src/components/custom-made/NotFound';
import ItemLoading from 'src/components/custom-made/ItemLoading';
import MultipleDeleteModal from 'src/components/custom-made/MutipleDeleteModal';
import { deleteMultipleCarsMessage } from 'src/components/messages/CustomModalMessages';

import { TableHead, TableNoData, TableToolbar, TableEmptyRows } from 'src/sections/commons';

import CarsTableRow from '../cars-table-row';
import { emptyRows, applyFilter, getComparator } from '../../commons/utils';

// ----------------------------------------------------------------------

export default function CustomersList() {
  const getCarsQuery = useGetCars();
  const getPollutionOverDueCars = useGetCarsPollutionOverDue();
  const deleteMultipleCarsMutation = useDeleteMultipleCars();
  console.log(getCarsQuery);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterOption, setFilterOption] = useState('all'); // Assuming initial filter option is 'all'
  const getCarsOnYard = useGetCarsOnYard();
  const getCarsOnRun = useGetCarsOnRun();
  const getServiceDueCars = useGetCarsServiceDue();
  const getInsuranceOverdueCars = useGetCarsInsuranceOverDue();
  const getServiceOverDueCars = useGetCarsServiceOverDue();
  console.log(getPollutionOverDueCars);
  const handleChange = (event, newValue) => {
    // Set the filter option based on the selected tab
    switch (newValue) {
      case '1':
        setFilterOption('all');
        break;
      case '2':
        setFilterOption('onrun');
        break;
      case '3':
        setFilterOption('onyard');
        break;
      case '4':
        setFilterOption('insurancedue');
        break;
      case '5':
        setFilterOption('servicedue');
        break;
      case '6':
        setFilterOption('pollutiondue');
        break;
      default:
        setFilterOption('all');
    }
  };
  const applyFilterOption = (data) => {
    switch (filterOption) {
      case 'onrun':
        return getCarsOnRun?.data || [];
      case 'onyard':
        return getCarsOnYard?.data || [];
      case 'insurancedue':
        return getInsuranceOverdueCars?.data || [];
      case 'servicedue':
        return getServiceOverDueCars?.data || [];
      case 'pollutiondue':
        return getPollutionOverDueCars?.data || [];
      default:
        return data;
    }
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
      if (selected.length === getCarsQuery?.data?.length) {
        setSelected([]);
      } else {
        if (getCarsQuery.isSuccess) {
          newSelecteds = getCarsQuery.data.map((n) => n._id);
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
    inputData: getCarsQuery.isSuccess ? getCarsQuery.data : [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDelete = (selectedItems) => {
    console.log('Deleting items:', selectedItems);
    MultipleDeleteModal(
      () => deleteMultipleCarsMutation.mutate(selectedItems),
      deleteMultipleCarsMessage,
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
        />
        <TabContext value={filterOption}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="All"
              value="1"
              sx={{ backgroundColor: filterOption === 'all' ? '#59c5b9' : '' }}
            />
            <Tab
              label="On run"
              value="2"
              sx={{ backgroundColor: filterOption === 'onrun' ? '#59c5b9' : '' }}
            />
            <Tab
              label="On yard"
              value="3"
              sx={{ backgroundColor: filterOption === 'onyard' ? '#59c5b9' : '' }}
            />
            <Tab
              label="Insurance Due"
              value="4"
              sx={{ backgroundColor: filterOption === 'insurancedue' ? '#59c5b9' : '' }}
            />

            <Tab
              label="Service Due"
              value="5"
              sx={{ backgroundColor: filterOption === 'servicedue' ? '#59c5b9' : '' }}
            />
            <Tab
              label="Pollution Due"
              value="6"
              sx={{ backgroundColor: filterOption === 'pollutiondue' ? '#59c5b9' : '' }}
            />
          </TabList>
        </TabContext>
        <TableContainer>
          <Table>
            {filterOption === 'all' ? (
                <TableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name', minWidth: 150 },
                    { id: 'VehicleNumber', label: 'Vehicle Number', minWidth: 150 },
                    { id: 'transmission', label: 'Transmission', minWidth: 150 },
                    { id: 'kmscovered', label: 'Kilometers Covered', minWidth: 180 },
                    { id: 'serviceInterval', label: 'Service Interval', minWidth: 150 },
                    { id: 'timesBooked', label: 'Times Booked', minWidth: 150 },
                    { id: 'lastServiceOn', label: 'Last Service', minWidth: 150 },
                    { id: 'insuranceDueDate', label: 'Insurance Due', minWidth: 150 },
                    { id: 'pollutionDue', label: 'Pollution Due', minWidth: 150 },

                    { id: '' },
                  ]}
                />
              ) : filterOption === 'onrun' ? (
                <TableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name', minWidth: 150 },
                    { id: 'VehicleNumber', label: 'Vehicle Number', minWidth: 150 },
                    { id: 'transmission', label: 'Transmission', minWidth: 150 },
                    { id: 'bookedFrom', label: 'Booked From', minWidth: 150 },
                    { id: 'bookedTill', label: 'Booked Till', minWidth: 150 },
                    { id: 'lastServiceOn', label: 'Last Service', minWidth: 150 },
                    { id: 'insuranceDueDate', label: 'Insurance Due', minWidth: 150 },
                    { id: 'pollution', label: 'Pollution Due', minWidth: 150 },

                    { id: '' },
                  ]}
                />
              ) : (
                <>
                  {filterOption === 'onyard' && (
                    <TableHead
                      order={order}
                      orderBy={orderBy}
                      rowCount={users.length}
                      numSelected={selected.length}
                      onRequestSort={handleSort}
                      onSelectAllClick={handleSelectAllClick}
                      headLabel={[
                        { id: 'name', label: 'Name', minWidth: 150 },
                        { id: 'VehicleNumber', label: 'Vehicle Number', minWidth: 150 },

                        { id: 'transmission', label: 'Transmission', minWidth: 150 },
                        // { id: 'freeTill', label: 'Free Till' },
                        { id: 'timesBooked', label: 'Times Booked', minWidth: 150 },
                        { id: 'lastServiceOn', label: 'Last Service', minWidth: 150 },
                        { id: 'insuranceDueDate', label: 'Insurance Due', minWidth: 150 },
                        { id: 'pollutionDue', label: 'Pollution Due', minWidth: 150 },

                        { id: '' },
                      ]}
                    />
                  )}
                </>
              )}
              {filterOption === 'insurancedue' && (
                <TableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name', minWidth: 150 },
                    { id: 'VehicleNumber', label: 'Vehicle Number', minWidth: 150 },
                    { id: 'transmission', label: 'Transmission', minWidth: 150 },
                    { id: 'serviceInterval', label: 'last Service', minWidth: 150 },
                    { id: 'insuranceDueDate', label: 'Insurance Due', minWidth: 150 },
                    { id: 'insuranceTimeLeft', label: 'Time left to expire', minWidth: 150 },

                    { id: '' },
                  ]}
                />
              )}

              {filterOption === 'servicedue' && (
                <TableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name', minWidth: 150 },
                    { id: 'VehicleNumber', label: 'Vehicle Number', minWidth: 150 },
                    { id: 'serviceInterval', label: 'Service interval', minWidth: 150 },
                    { id: 'insuranceDueDate', label: 'KMS ran after service', minWidth: 150 },
                    { id: 'kmService', label: 'KMS left for service', minWidth: 150 },
                    { id: 'serviceDone', label: '', minWidth: 150 },

                    { id: '' },
                  ]}
                />
              )}

              {filterOption === 'pollutiondue' && (
                <TableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name', minWidth: 150 },
                    { id: 'VehicleNumber', label: 'Vehicle Number', minWidth: 150 },
                    { id: 'transmission', label: 'Transmission', minWidth: 150 },
                    { id: 'lastServiceOn', label: 'Last Service', minWidth: 150 },
                    { id: 'insuranceDueDate', label: 'Insurance Due', minWidth: 150 },
                    { id: 'pollutionDue', label: 'Pollution Due', minWidth: 150 },
                    { id: 'daysleft', label: 'Days Left', minWidth: 150 },
                    { id: '' },
                  ]}
                />
              )}

              {getCarsQuery.isLoading ? (
                <ItemLoading />
              ) : (
                <TableBody>
                  {applyFilterOption(dataFiltered.length) === 0 && !filterName ? (
                    <NotFound er1="No Cars Found" er2="Create new Cars to populate over here" />
                  ) : (
                    applyFilterOption(dataFiltered)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <CarsTableRow
                          key={row._id}
                          id={row._id}
                          filterOption={filterOption}
                          name={row.name}
                          insurancePolicy={row.insurancePolicy?.url}
                          pollutionCertificate={row.pollutionCertificate?.url}
                          pollution={row.pollution}
                          rcBook={row.rcBook?.url}
                          totalKmCovered={row.totalKmCovered}
                          vehicleNumber={row.vehicleNumber}
                          bookings={row.bookings}
                          company={row.manufacturingCompany}
                          year={row.yearOfManufacturing}
                          serviceKilometre={row.serviceKilometre}
                          fuel={row.fuelType}
                          transmission={row.transmission}
                          insurance={row.insurance}
                          lastService={row.lastService}
                          carImage={row.carImage?.url}
                          service_interval={row.serviceInterval}
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
        <TablePagination
          page={page}
          component="div"
          count={getCarsQuery?.data?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
