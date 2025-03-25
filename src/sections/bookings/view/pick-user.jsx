import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { cars } from 'src/_mock/user';
import { useGetCustomers } from 'src/api/customers/Queries';

import Scrollbar from 'src/components/scrollbar';
import NotFound from 'src/components/custom-made/NotFound';
import ItemLoading from 'src/components/custom-made/ItemLoading';

import TableNoData from '../pick-user/table-no-data';
import UserTableRow from '../pick-user/user-table-row';
import UserTableHead from '../pick-user/user-table-head';
import TableEmptyRows from '../pick-user/table-empty-rows';
import UserTableToolbar from '../pick-user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../pick-user/utils';

// ----------------------------------------------------------------------
PickUser.propTypes = {
  onRowSelect: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.object,
  editableData: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default function PickUser({ onRowSelect, selectedCustomer, editableData, isEdit }) {
  console.log(editableData);
  console.log(isEdit);
  const [filterOnTop, setFilterOnTop] = useState(null);

  const [selectedItems, setSelectedItems] = useState([selectedCustomer?.name]);

  const getCustomersQuery = useGetCustomers();
  useEffect(() => {
    if (isEdit && editableData) {
      const foundCustomer = getCustomersQuery?.data?.find(
        (customer) => customer._id === editableData.customerSelected._id
      );
      console.log(foundCustomer);
      onRowSelect(editableData.customerSelected);
      setSelected(editableData?.customerSelected?.name);
      setFilterOnTop(foundCustomer);
    } else {
      setSelected([]);
      onRowSelect(null);
      setSelectedItems([]);
      setFilterOnTop(null);
    }
    // eslint-disable-next-line
  }, [isEdit, editableData, getCustomersQuery.status === 'success']);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  useEffect(() => {
    setSelectedItems([selectedCustomer?.name]);
  }, [selectedCustomer]);

  const handleClick = (event, name, row) => {
    console.log(row);
    let newSelected = [];
    const selectedIndex = selected.indexOf(name);
    if (selectedIndex === -1) {
      newSelected = [name];
    } else {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
      row = null;
    }
    console.log(row);
    onRowSelect(row);
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
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: getCustomersQuery.isSuccess ? getCustomersQuery.data : [],
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const notFound = !dataFiltered.length && !!filterName;

  return (
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
                  { id: 'name', label: 'Name', minWidth: 150 },
                  { id: 'passport', label: 'Passport Number', minWidth: 150 },
                  { id: 'location', label: 'Location', minWidth: 150 },
                  { id: 'bookings', label: 'Bookings Made', minWidth: 150 },
                  { id: 'status', label: 'Status', minWidth: 150 },
                  { id: '' },
                ]}
              />

              {getCustomersQuery.isLoading ? (
                <ItemLoading />
              ) : (
                <TableBody>
                  {dataFiltered.length === 0 && filterName === '' ? (
                    <NotFound er1="No Users Found" er2="" />
                  ) : (
                    <>
                      {filterOnTop && (
                        <UserTableRow
                          key={filterOnTop._id}
                          name={filterOnTop.name}
                          id={filterOnTop._id}
                          contactNumber={filterOnTop.contactNumber}
                          abroadNumber={filterOnTop.abroadNumber}
                          nativeNumber={filterOnTop.nativeNumber}
                          email={filterOnTop.email}
                          passportNumber={filterOnTop.passportNumber}
                          pincodae={filterOnTop.pincode}
                          state={filterOnTop.state}
                          address={filterOnTop.address}
                          locality={filterOnTop.locality}
                          cityOrDistrict={filterOnTop.cityOrDistrict}
                          bookings={filterOnTop.bookings}
                          selected={selectedItems.indexOf(filterOnTop.name) !== -1}
                          handleClick={(event) => handleClick(event, filterOnTop.name, filterOnTop)}
                        />
                      )}
                      {dataFiltered
                        .filter((item) => item._id !== filterOnTop?._id)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <UserTableRow
                            key={row._id}
                            name={row.name}
                            id={row._id}
                            contactNumber={row.contactNumber}
                            abroadNumber={row.abroadNumber}
                            nativeNumber={row.nativeNumber}
                            email={row.email}
                            picture={row.customerImage?.url}
                            passportNumber={row.passportNumber}
                            pincodae={row.pincode}
                            state={row.state}
                            address={row.address}
                            locality={row.locality}
                            cityOrDistrict={row.cityOrDistrict}
                            bookings={row.bookings}
                            selected={selectedItems.indexOf(row.name) !== -1}
                            handleClick={(event) => handleClick(event, row.name, row)}
                          />
                        ))}
                    </>
                  )}

                  <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage)} />
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={getCustomersQuery?.data?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
